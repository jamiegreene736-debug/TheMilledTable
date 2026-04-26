import express from 'express';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import multer from 'multer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'localdev';
const SECRET = process.env.JWT_SECRET || 'tmt-dev-secret-change-in-prod';
const DATA_DIR = join(__dirname, 'data');
const DATA_FILE = join(DATA_DIR, 'blogData.json');
const UPLOAD_DIR = join(__dirname, 'uploads');

mkdirSync(DATA_DIR, { recursive: true });
mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (_req, file, cb) => {
    const ext = extname(file.originalname).toLowerCase();
    const base = basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .slice(0, 48);
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB
  fileFilter: (_req, file, cb) => {
    const ok = /^(image\/(jpeg|png|webp|gif|avif)|video\/(mp4|quicktime|webm))$/.test(file.mimetype);
    cb(ok ? null : new Error('Unsupported file type'), ok);
  },
});

// Stateless HMAC token — valid as long as password + secret don't change
function makeToken() {
  return crypto.createHmac('sha256', SECRET).update(ADMIN_PASSWORD).digest('hex');
}

function auth(req, res, next) {
  const bearer = req.headers.authorization?.slice(7);
  if (bearer !== makeToken()) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

function read() {
  if (!existsSync(DATA_FILE)) return [];
  try { return JSON.parse(readFileSync(DATA_FILE, 'utf8')); }
  catch { return []; }
}

function write(posts) {
  writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), 'utf8');
}

app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(UPLOAD_DIR));
app.use(express.static(join(__dirname, 'dist')));

// ── Auth ──────────────────────────────────────────────────────────────────────

app.post('/api/auth/login', (req, res) => {
  if (req.body?.password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password' });
  }
  res.json({ token: makeToken() });
});

// Called on page load so the UI can re-validate a stored token without the password
app.post('/api/auth/verify', (req, res) => {
  res.json({ ok: req.body?.token === makeToken() });
});

// ── Posts ─────────────────────────────────────────────────────────────────────

app.get('/api/posts', (_req, res) => res.json(read()));

app.post('/api/posts', auth, (req, res) => {
  const posts = read();
  const post = req.body;
  if (!post?.slug) return res.status(400).json({ error: 'slug required' });
  if (posts.some(p => p.slug === post.slug)) {
    return res.status(409).json({ error: 'Slug already exists' });
  }
  posts.push(post);
  write(posts);
  res.status(201).json(post);
});

app.put('/api/posts/:slug', auth, (req, res) => {
  const posts = read();
  const i = posts.findIndex(p => p.slug === req.params.slug);
  if (i === -1) return res.status(404).json({ error: 'Not found' });
  posts[i] = req.body;
  write(posts);
  res.json(req.body);
});

app.delete('/api/posts/:slug', auth, (req, res) => {
  write(read().filter(p => p.slug !== req.params.slug));
  res.json({ ok: true });
});

// ── Reorder ───────────────────────────────────────────────────────────────────

app.put('/api/posts-order', auth, (req, res) => {
  const { slugs } = req.body;
  if (!Array.isArray(slugs)) return res.status(400).json({ error: 'slugs array required' });
  const posts = read();
  const ordered = slugs.map(s => posts.find(p => p.slug === s)).filter(Boolean);
  write(ordered);
  res.json({ ok: true });
});

// ── File upload ───────────────────────────────────────────────────────────────

app.post('/api/upload', auth, (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    }
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) return res.status(400).json({ error: 'No file received' });
    res.json({
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  });
});

// ── List uploaded files ───────────────────────────────────────────────────────

app.get('/api/uploads', auth, (_req, res) => {
  try {
    const files = readdirSync(UPLOAD_DIR)
      .map((name) => {
        const stat = statSync(join(UPLOAD_DIR, name));
        return { filename: name, url: `/uploads/${name}`, size: stat.size, mtime: stat.mtime };
      })
      .sort((a, b) => new Date(b.mtime) - new Date(a.mtime));
    res.json(files);
  } catch {
    res.json([]);
  }
});

// ── SPA fallback ──────────────────────────────────────────────────────────────

app.get('*', (_req, res) => {
  const index = join(__dirname, 'dist', 'index.html');
  if (existsSync(index)) return res.sendFile(index);
  res.status(503).send('Run "npm run build" first, then restart the server.');
});

app.listen(PORT, () => {
  console.log(`The Milled Table CMS → http://localhost:${PORT}`);
  console.log(`Admin panel → http://localhost:${PORT}/admin`);
  if (ADMIN_PASSWORD === 'localdev') {
    console.warn('⚠  ADMIN_PASSWORD not set — using insecure default');
  }
});
