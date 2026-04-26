import React, { useState, useEffect } from "react";
import "./admin.css";

const CATEGORIES = ["Bread", "Milling", "Standards", "Baking", "Ingredients", "Grains", "Cooking"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

// ── API helpers ───────────────────────────────────────────────────────────────

async function apiLogin(password) {
  const r = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!r.ok) throw new Error("Wrong password");
  return r.json();
}

async function apiVerify(token) {
  const r = await fetch("/api/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  const { ok } = await r.json();
  return ok;
}

function headers(token) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

async function apiPosts() {
  return fetch("/api/posts").then((r) => r.json());
}

async function apiCreate(token, post) {
  const r = await fetch("/api/posts", { method: "POST", headers: headers(token), body: JSON.stringify(post) });
  if (!r.ok) throw new Error((await r.json()).error || "Save failed");
  return r.json();
}

async function apiUpdate(token, slug, post) {
  const r = await fetch(`/api/posts/${slug}`, { method: "PUT", headers: headers(token), body: JSON.stringify(post) });
  if (!r.ok) throw new Error((await r.json()).error || "Save failed");
  return r.json();
}

async function apiDelete(token, slug) {
  await fetch(`/api/posts/${slug}`, { method: "DELETE", headers: headers(token) });
}

// ── Data conversion (form state ↔ post model) ─────────────────────────────────

function toSlug(s) {
  return s.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

// Flatten complex arrays into editable strings for the form
function postToForm(post) {
  if (post.type === "recipe") {
    return {
      ...post,
      ingredients: (post.ingredients || []).map((g) => ({
        section: g.section || "",
        items: (g.items || []).join("\n"),
      })),
      steps: (post.steps || []).map((s) => ({ heading: s.heading || "", body: s.body || "" })),
      notes: post.notes || "",
    };
  }
  return {
    ...post,
    sections: (post.sections || []).map((s) => ({
      heading: s.heading || "",
      paragraphs: (s.paragraphs || []).join("\n\n"),
      list: (s.list || []).join("\n"),
    })),
  };
}

// Rebuild the structured arrays from form strings before saving
function formToPost(form) {
  if (form.type === "recipe") {
    return {
      ...form,
      ingredients: form.ingredients.map((g) => ({
        section: g.section,
        items: g.items.split("\n").map((s) => s.trim()).filter(Boolean),
      })),
      steps: form.steps,
      notes: form.notes || undefined,
    };
  }
  return {
    ...form,
    sections: form.sections.map((s) => {
      const sec = {};
      if (s.heading.trim()) sec.heading = s.heading.trim();
      if (s.paragraphs.trim())
        sec.paragraphs = s.paragraphs.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
      if (s.list.trim())
        sec.list = s.list.split("\n").map((l) => l.trim()).filter(Boolean);
      return sec;
    }),
  };
}

const BLANK_ARTICLE = {
  type: "article", slug: "", title: "", excerpt: "", date: "", readTime: "",
  category: "Bread", imageKey: "",
  sections: [{ heading: "", paragraphs: "", list: "" }],
};

const BLANK_RECIPE = {
  type: "recipe", slug: "", title: "", excerpt: "", readTime: "", yield: "",
  difficulty: "Beginner", category: "Bread", imageKey: "",
  ingredients: [{ section: "", items: "" }],
  steps: [{ heading: "", body: "" }],
  notes: "",
};

// ── Login screen ──────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const { token } = await apiLogin(pw);
      onLogin(token);
    } catch {
      setErr("Incorrect password");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="acms-login">
      <div className="acms-login-card">
        <div className="acms-login-logo">TMT</div>
        <h1>The Milled Table</h1>
        <p>Content Manager</p>
        <form onSubmit={submit}>
          <input
            type="password"
            placeholder="Admin password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoFocus
          />
          {err && <p className="acms-error">{err}</p>}
          <button type="submit" disabled={busy || !pw}>
            {busy ? "Logging in…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Post list ─────────────────────────────────────────────────────────────────

function PostList({ posts, onNew, onEdit, onDelete }) {
  const recipes = posts.filter((p) => p.type === "recipe");
  const articles = posts.filter((p) => p.type === "article");

  return (
    <div className="acms-list">
      <div className="acms-list-toolbar">
        <h2>Posts &amp; Recipes <span className="acms-count">{posts.length}</span></h2>
        <button className="acms-btn-primary" onClick={onNew}>+ New post</button>
      </div>

      {posts.length === 0 ? (
        <p className="acms-empty">No posts yet. Create your first one.</p>
      ) : (
        <>
          {recipes.length > 0 && (
            <PostTable label="Recipes" rows={recipes} onEdit={onEdit} onDelete={onDelete} />
          )}
          {articles.length > 0 && (
            <PostTable label="Articles" rows={articles} onEdit={onEdit} onDelete={onDelete} />
          )}
        </>
      )}
    </div>
  );
}

function PostTable({ label, rows, onEdit, onDelete }) {
  return (
    <div className="acms-table-section">
      <h3 className="acms-table-label">{label}</h3>
      <table className="acms-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date / Time</th>
            {label === "Recipes" && <th>Difficulty</th>}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.slug}>
              <td className="acms-title-cell">
                <span className="acms-post-title">{p.title}</span>
                <span className="acms-post-slug">/{p.slug}</span>
              </td>
              <td>{p.category}</td>
              <td className="acms-meta-cell">{p.date || p.readTime}</td>
              {label === "Recipes" && <td>{p.difficulty}</td>}
              <td className="acms-actions">
                <button className="acms-btn-sm" onClick={() => onEdit(p)}>Edit</button>
                <button className="acms-btn-sm acms-btn-danger" onClick={() => onDelete(p.slug)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Post editor ───────────────────────────────────────────────────────────────

function PostEditor({ initial, token, onSave, onCancel }) {
  const isNew = !initial?.slug;
  const [form, setForm] = useState(() =>
    isNew
      ? { ...(initial?.type === "recipe" ? BLANK_RECIPE : BLANK_ARTICLE) }
      : postToForm(initial)
  );
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  function set(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function switchType(type) {
    setForm((f) => ({
      ...(type === "recipe" ? { ...BLANK_RECIPE } : { ...BLANK_ARTICLE }),
      slug: f.slug,
      title: f.title,
      excerpt: f.excerpt,
      category: f.category,
      imageKey: f.imageKey,
      type,
    }));
  }

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const post = formToPost(form);
      if (isNew) {
        await apiCreate(token, post);
      } else {
        await apiUpdate(token, initial.slug, post);
      }
      onSave();
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  // ── Section helpers (articles) ──
  const addSection = () => set("sections", [...form.sections, { heading: "", paragraphs: "", list: "" }]);
  const removeSection = (i) => set("sections", form.sections.filter((_, j) => j !== i));
  const setSection = (i, k, v) => set("sections", form.sections.map((s, j) => j === i ? { ...s, [k]: v } : s));

  // ── Ingredient helpers (recipes) ──
  const addGroup = () => set("ingredients", [...form.ingredients, { section: "", items: "" }]);
  const removeGroup = (i) => set("ingredients", form.ingredients.filter((_, j) => j !== i));
  const setGroup = (i, k, v) => set("ingredients", form.ingredients.map((g, j) => j === i ? { ...g, [k]: v } : g));

  // ── Step helpers (recipes) ──
  const addStep = () => set("steps", [...form.steps, { heading: "", body: "" }]);
  const removeStep = (i) => set("steps", form.steps.filter((_, j) => j !== i));
  const setStep = (i, k, v) => set("steps", form.steps.map((s, j) => j === i ? { ...s, [k]: v } : s));

  return (
    <div className="acms-editor">
      <div className="acms-editor-header">
        <button className="acms-back" type="button" onClick={onCancel}>← All posts</button>
        <h2>{isNew ? "New post" : `Editing: ${initial.title}`}</h2>
      </div>

      <form onSubmit={save} className="acms-form">
        {/* Type */}
        <div className="acms-field">
          <label>Type</label>
          <div className="acms-radio-group">
            <label><input type="radio" checked={form.type === "article"} onChange={() => switchType("article")} /> Article</label>
            <label><input type="radio" checked={form.type === "recipe"} onChange={() => switchType("recipe")} /> Recipe</label>
          </div>
        </div>

        {/* Title + slug */}
        <div className="acms-field">
          <label>Title *</label>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} required />
        </div>

        <div className="acms-field">
          <label>Slug *</label>
          <div className="acms-slug-row">
            <input
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              required
              pattern="[a-z0-9\-]+"
              title="Lowercase letters, numbers, and hyphens only"
            />
            <button type="button" className="acms-btn-sm" onClick={() => set("slug", toSlug(form.title))}>
              Generate
            </button>
          </div>
          <span className="acms-hint">Used in the URL — lowercase, hyphens only</span>
        </div>

        {/* Excerpt */}
        <div className="acms-field">
          <label>Excerpt / summary *</label>
          <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={3} required />
        </div>

        {/* Category + read time */}
        <div className="acms-row">
          <div className="acms-field">
            <label>Category</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="acms-field">
            <label>Read / cook time</label>
            <input
              value={form.readTime}
              onChange={(e) => set("readTime", e.target.value)}
              placeholder={form.type === "recipe" ? "14 hr total · 45 min active" : "6 min read"}
            />
          </div>
        </div>

        {/* Image */}
        <div className="acms-field">
          <label>Image</label>
          <input
            value={form.imageKey}
            onChange={(e) => set("imageKey", e.target.value)}
            placeholder="Asset key (e.g. sourdough-loaf) or a full https:// image URL"
          />
          <span className="acms-hint">
            Existing asset keys: sourdough-loaf, einkorn-bread, rye-bread, stone-mill, glyphosate-spray, sourdough-starter, artisan-bread, einkorn-grain, seasonal-produce
          </span>
        </div>

        {/* ── Article fields ── */}
        {form.type === "article" && (
          <>
            <div className="acms-field">
              <label>Publish date</label>
              <input value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="April 22, 2026" />
            </div>

            <div className="acms-section-header">
              <h3>Content sections</h3>
              <button type="button" className="acms-btn-sm" onClick={addSection}>+ Add section</button>
            </div>

            {form.sections.map((sec, i) => (
              <div key={i} className="acms-block">
                <div className="acms-block-title">
                  <span>Section {i + 1}</span>
                  {form.sections.length > 1 && (
                    <button type="button" className="acms-btn-sm acms-btn-danger" onClick={() => removeSection(i)}>Remove</button>
                  )}
                </div>
                <div className="acms-field">
                  <label>Heading (optional — leave blank for intro sections)</label>
                  <input value={sec.heading} onChange={(e) => setSection(i, "heading", e.target.value)} />
                </div>
                <div className="acms-field">
                  <label>Paragraphs</label>
                  <textarea
                    value={sec.paragraphs}
                    onChange={(e) => setSection(i, "paragraphs", e.target.value)}
                    rows={7}
                    placeholder="Write your paragraph here.&#10;&#10;Separate multiple paragraphs with a blank line."
                  />
                  <span className="acms-hint">Blank line between paragraphs = new &lt;p&gt;</span>
                </div>
                <div className="acms-field">
                  <label>Bullet list (optional — one item per line)</label>
                  <textarea
                    value={sec.list}
                    onChange={(e) => setSection(i, "list", e.target.value)}
                    rows={4}
                    placeholder="First bullet point&#10;Second bullet point&#10;Third bullet point"
                  />
                </div>
              </div>
            ))}
          </>
        )}

        {/* ── Recipe fields ── */}
        {form.type === "recipe" && (
          <>
            <div className="acms-row">
              <div className="acms-field">
                <label>Yield</label>
                <input value={form.yield} onChange={(e) => set("yield", e.target.value)} placeholder="1 large loaf (900g)" />
              </div>
              <div className="acms-field">
                <label>Difficulty</label>
                <select value={form.difficulty} onChange={(e) => set("difficulty", e.target.value)}>
                  {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {/* Ingredients */}
            <div className="acms-section-header">
              <h3>Ingredients</h3>
              <button type="button" className="acms-btn-sm" onClick={addGroup}>+ Add group</button>
            </div>
            {form.ingredients.map((g, i) => (
              <div key={i} className="acms-block">
                <div className="acms-block-title">
                  <span>Ingredient group {i + 1}</span>
                  {form.ingredients.length > 1 && (
                    <button type="button" className="acms-btn-sm acms-btn-danger" onClick={() => removeGroup(i)}>Remove</button>
                  )}
                </div>
                <div className="acms-field">
                  <label>Group name (e.g. "Main dough", "Soaker")</label>
                  <input value={g.section} onChange={(e) => setGroup(i, "section", e.target.value)} required />
                </div>
                <div className="acms-field">
                  <label>Ingredients (one per line)</label>
                  <textarea
                    value={g.items}
                    onChange={(e) => setGroup(i, "items", e.target.value)}
                    rows={5}
                    placeholder="360g stone-milled bread flour&#10;340g filtered water, divided&#10;10g fine sea salt"
                    required
                  />
                </div>
              </div>
            ))}

            {/* Steps */}
            <div className="acms-section-header">
              <h3>Method steps</h3>
              <button type="button" className="acms-btn-sm" onClick={addStep}>+ Add step</button>
            </div>
            {form.steps.map((step, i) => (
              <div key={i} className="acms-block">
                <div className="acms-block-title">
                  <span>Step {i + 1}</span>
                  {form.steps.length > 1 && (
                    <button type="button" className="acms-btn-sm acms-btn-danger" onClick={() => removeStep(i)}>Remove</button>
                  )}
                </div>
                <div className="acms-field">
                  <label>Step heading</label>
                  <input value={step.heading} onChange={(e) => setStep(i, "heading", e.target.value)} required />
                </div>
                <div className="acms-field">
                  <label>Instructions</label>
                  <textarea value={step.body} onChange={(e) => setStep(i, "body", e.target.value)} rows={5} required />
                </div>
              </div>
            ))}

            {/* Notes */}
            <div className="acms-field">
              <label>Baker's notes (optional)</label>
              <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={3} />
            </div>
          </>
        )}

        {err && <p className="acms-error">{err}</p>}

        <div className="acms-form-footer">
          <button type="button" className="acms-btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="submit" className="acms-btn-primary" disabled={busy}>
            {busy ? "Saving…" : isNew ? "Create post" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Root admin app ────────────────────────────────────────────────────────────

export default function Admin() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(true);
  const [view, setView] = useState("list"); // 'list' | 'edit'
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // Re-validate stored token on mount
  useEffect(() => {
    const stored = localStorage.getItem("tmt-admin-token");
    if (!stored) { setChecking(false); return; }
    apiVerify(stored).then((ok) => {
      if (ok) { setToken(stored); setVerified(true); }
      else localStorage.removeItem("tmt-admin-token");
      setChecking(false);
    });
  }, []);

  // Load posts when logged in
  useEffect(() => {
    if (!verified) return;
    setLoadingPosts(true);
    apiPosts().then((data) => { setPosts(data); setLoadingPosts(false); });
  }, [verified]);

  function handleLogin(t) {
    localStorage.setItem("tmt-admin-token", t);
    setToken(t);
    setVerified(true);
  }

  function logout() {
    localStorage.removeItem("tmt-admin-token");
    setToken("");
    setVerified(false);
    setView("list");
  }

  async function handleDelete(slug) {
    if (!confirm(`Delete this post? This cannot be undone.`)) return;
    await apiDelete(token, slug);
    setPosts((ps) => ps.filter((p) => p.slug !== slug));
  }

  function handleEdit(post) {
    setEditing(post);
    setView("edit");
  }

  function handleNew() {
    setEditing({ type: "article" });
    setView("edit");
  }

  async function handleSave() {
    const data = await apiPosts();
    setPosts(data);
    setView("list");
    setEditing(null);
  }

  if (checking) {
    return <div className="acms-splash">Checking session…</div>;
  }

  if (!verified) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="acms">
      <header className="acms-header">
        <div className="acms-header-brand">
          <span className="acms-logo-pill">TMT</span>
          <span>Content Manager</span>
        </div>
        <nav className="acms-header-nav">
          <a href="/" target="_blank" rel="noopener noreferrer">↗ View site</a>
          <button className="acms-btn-sm acms-btn-ghost" onClick={logout}>Log out</button>
        </nav>
      </header>

      <main className="acms-main">
        {loadingPosts ? (
          <p className="acms-loading">Loading posts…</p>
        ) : view === "list" ? (
          <PostList posts={posts} onNew={handleNew} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <PostEditor
            initial={editing}
            token={token}
            onSave={handleSave}
            onCancel={() => { setView("list"); setEditing(null); }}
          />
        )}
      </main>
    </div>
  );
}
