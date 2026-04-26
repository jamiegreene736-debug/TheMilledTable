import express from 'express';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'localdev';
const SECRET = process.env.JWT_SECRET || 'tmt-dev-secret-change-in-prod';
const DATA_DIR = join(__dirname, 'data');
const DATA_FILE = join(DATA_DIR, 'blogData.json');

mkdirSync(DATA_DIR, { recursive: true });

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
