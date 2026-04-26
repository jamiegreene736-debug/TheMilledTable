import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  ChefHat,
  Clock,
  ListOrdered,
  Tag,
  UtensilsCrossed,
} from "lucide-react";
import { blogPosts as staticPosts } from "./blogData.js";
import sourdoughLoafImg    from "./assets/blog/sourdough-loaf.jpg";
import einkornBreadImg     from "./assets/blog/einkorn-bread.jpg";
import ryeBreadImg         from "./assets/blog/rye-bread.jpg";
import stoneMillImg        from "./assets/blog/stone-mill.jpg";
import glyphosateSprayImg  from "./assets/blog/glyphosate-spray.jpg";
import sourdoughStarterImg from "./assets/blog/sourdough-starter.jpg";
import artisanBreadImg     from "./assets/blog/artisan-bread.jpg";
import einkornGrainImg     from "./assets/blog/einkorn-grain.jpg";
import seasonalProduceImg  from "./assets/blog/seasonal-produce.jpg";

const builtInImages = {
  "sourdough-loaf":    sourdoughLoafImg,
  "einkorn-bread":     einkornBreadImg,
  "rye-bread":         ryeBreadImg,
  "stone-mill":        stoneMillImg,
  "glyphosate-spray":  glyphosateSprayImg,
  "sourdough-starter": sourdoughStarterImg,
  "artisan-bread":     artisanBreadImg,
  "einkorn-grain":     einkornGrainImg,
  "seasonal-produce":  seasonalProduceImg,
};

function getImage(key) {
  if (!key) return null;
  if (key.startsWith("http") || key.startsWith("/")) return key;
  return builtInImages[key] || null;
}

function isVideo(src) {
  return src && /\.(mp4|mov|webm)(\?|$)/i.test(src);
}

function MediaEl({ src, alt, className }) {
  if (!src) return null;
  if (isVideo(src)) {
    return (
      <video
        src={src}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }
  return <img src={src} alt={alt} />;
}

const categoryColors = {
  Bread:       { bg: "#f5ead5", color: "#7a4e1a" },
  Milling:     { bg: "#e8f0e0", color: "#3d5c28" },
  Standards:   { bg: "#e0ead8", color: "#355225" },
  Baking:      { bg: "#f0e8d4", color: "#7a4e1a" },
  Ingredients: { bg: "#f0e8d8", color: "#6b4420" },
  Grains:      { bg: "#ede3d0", color: "#5c3d18" },
  Cooking:     { bg: "#e5dfd4", color: "#4d3920" },
};

const difficultyColors = {
  Beginner:     { bg: "#e4f0e0", color: "#2e5c22" },
  Intermediate: { bg: "#f5ead5", color: "#7a4e1a" },
  Advanced:     { bg: "#f5dfd5", color: "#7a2e1a" },
};

function CategoryBadge({ category }) {
  const s = categoryColors[category] || { bg: "#ede8e0", color: "#4d3920" };
  return (
    <span className="blog-category" style={{ background: s.bg, color: s.color }}>
      <Tag size={11} />
      {category}
    </span>
  );
}

function DifficultyBadge({ difficulty }) {
  const s = difficultyColors[difficulty] || { bg: "#ede8e0", color: "#4d3920" };
  return (
    <span className="blog-category" style={{ background: s.bg, color: s.color }}>
      <ChefHat size={11} />
      {difficulty}
    </span>
  );
}

function RecipeCard({ post, onSelect }) {
  const img = getImage(post.imageKey);
  return (
    <article className="blog-card recipe-card" onClick={() => onSelect(post.slug)}>
      {img && <div className="blog-card-img"><MediaEl src={img} alt={post.title} /></div>}
      <div className="blog-card-body">
        <div className="blog-card-header">
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            <CategoryBadge category={post.category} />
            <DifficultyBadge difficulty={post.difficulty} />
          </div>
        </div>
        <h3>{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <div className="recipe-card-meta">
          <span><Clock size={13} />{post.readTime}</span>
          <span><UtensilsCrossed size={13} />{post.yield}</span>
        </div>
        <button className="blog-read-more" type="button">
          View recipe
          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}

function ArticleCard({ post, onSelect }) {
  const img = getImage(post.imageKey);
  return (
    <article className="blog-card" onClick={() => onSelect(post.slug)}>
      {img && <div className="blog-card-img"><MediaEl src={img} alt={post.title} /></div>}
      <div className="blog-card-body">
        <div className="blog-card-header">
          <CategoryBadge category={post.category} />
          <div className="blog-card-meta">
            <span><Calendar size={13} />{post.date}</span>
            <span><Clock size={13} />{post.readTime}</span>
          </div>
        </div>
        <h3>{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <button className="blog-read-more" type="button">
          Read article
          <ArrowRight size={15} />
        </button>
      </div>
    </article>
  );
}

function RecipeView({ post, onBack }) {
  const img = getImage(post.imageKey);
  return (
    <article className="blog-post-view">
      <div className="blog-post-nav">
        <button className="blog-back-btn" type="button" onClick={onBack}>
          <ArrowLeft size={16} />
          All recipes
        </button>
      </div>

      {img && <div className="blog-post-hero"><MediaEl src={img} alt={post.title} /></div>}

      <header className="blog-post-header">
        <div className="blog-post-header-meta">
          <CategoryBadge category={post.category} />
          <DifficultyBadge difficulty={post.difficulty} />
        </div>
        <h1 className="blog-post-title">{post.title}</h1>
        <p className="blog-post-lede">{post.excerpt}</p>
        <div className="recipe-stats">
          <div className="recipe-stat">
            <Clock size={18} />
            <div>
              <strong>Time</strong>
              <span>{post.readTime}</span>
            </div>
          </div>
          <div className="recipe-stat">
            <UtensilsCrossed size={18} />
            <div>
              <strong>Yield</strong>
              <span>{post.yield}</span>
            </div>
          </div>
          <div className="recipe-stat">
            <ChefHat size={18} />
            <div>
              <strong>Level</strong>
              <span>{post.difficulty}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="recipe-layout">
        <aside className="recipe-ingredients">
          <h2 className="recipe-section-title">
            <UtensilsCrossed size={16} />
            Ingredients
          </h2>
          {post.ingredients.map((group) => (
            <div key={group.section} className="ingredient-group">
              <h3>{group.section}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <div className="recipe-method">
          <h2 className="recipe-section-title">
            <ListOrdered size={16} />
            Method
          </h2>
          {post.steps.map((step, i) => (
            <div key={i} className="recipe-step">
              <div className="step-number">{String(i + 1).padStart(2, "0")}</div>
              <div className="step-body">
                <h3>{step.heading}</h3>
                <p>{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {post.notes && (
        <div className="recipe-notes">
          <strong>Baker's notes</strong>
          <p>{post.notes}</p>
        </div>
      )}

      <div className="blog-post-footer">
        <p>
          Questions about flour choices for this recipe?{" "}
          <a href="mailto:hello@themilledtable.com">hello@themilledtable.com</a>
        </p>
      </div>
    </article>
  );
}

function ArticleView({ post, onBack }) {
  const img = getImage(post.imageKey);
  return (
    <article className="blog-post-view">
      <div className="blog-post-nav">
        <button className="blog-back-btn" type="button" onClick={onBack}>
          <ArrowLeft size={16} />
          All articles
        </button>
      </div>

      {img && <div className="blog-post-hero"><MediaEl src={img} alt={post.title} /></div>}

      <header className="blog-post-header">
        <div className="blog-post-header-meta">
          <CategoryBadge category={post.category} />
          <span className="blog-post-date"><Calendar size={13} />{post.date}</span>
          <span className="blog-post-read"><Clock size={13} />{post.readTime}</span>
        </div>
        <h1 className="blog-post-title">{post.title}</h1>
        <p className="blog-post-lede">{post.excerpt}</p>
      </header>

      <div className="blog-post-body">
        {post.sections.map((section, i) => (
          <section key={i} className="blog-post-section">
            {section.heading && <h2>{section.heading}</h2>}
            {section.paragraphs &&
              section.paragraphs.map((para, j) => <p key={j}>{para}</p>)}
            {section.list && (
              <ul className="blog-post-list">
                {section.list.map((item, k) => <li key={k}>{item}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="blog-post-footer">
        <p>
          Questions about our grain sourcing or milling process?{" "}
          <a href="mailto:hello@themilledtable.com">hello@themilledtable.com</a>
        </p>
      </div>
    </article>
  );
}

const TABS = ["All", "Recipes", "Articles"];

export default function Blog({ onClose }) {
  const [activePost, setActivePost] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState("All");
  const [blogPosts, setBlogPosts] = React.useState(staticPosts);

  // Fetch live posts from the CMS API; silently fall back to static data
  React.useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => { if (Array.isArray(data) && data.length) setBlogPosts(data); })
      .catch(() => {});
  }, []);

  const recipes  = blogPosts.filter((p) => p.type === "recipe");
  const articles = blogPosts.filter((p) => p.type === "article");
  const visiblePosts =
    activeTab === "Recipes"  ? recipes :
    activeTab === "Articles" ? articles :
    blogPosts;

  const selectedPost = blogPosts.find((p) => p.slug === activePost);

  function handleSelectPost(slug) {
    setActivePost(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setActivePost(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="blog-shell">
      <div className="blog-top-bar">
        <button className="blog-close-btn" type="button" onClick={onClose}>
          <ArrowLeft size={16} />
          Back to shop
        </button>
        {!selectedPost && (
          <div className="blog-top-bar-title">
            <BookOpen size={18} />
            <span>Organic Recipes & Blog</span>
          </div>
        )}
      </div>

      {selectedPost ? (
        selectedPost.type === "recipe"
          ? <RecipeView post={selectedPost} onBack={handleBack} />
          : <ArticleView post={selectedPost} onBack={handleBack} />
      ) : (
        <div className="blog-index">
          <header className="blog-index-header">
            <p className="section-kicker">
              <BookOpen size={14} />
              Organic Recipes & Blog
            </p>
            <h1 className="blog-index-title">
              Organic cooking, clean grain,
              <span> and the table it all leads to.</span>
            </h1>
            <p className="blog-index-sub">
              Recipes using our stone-milled flours, alongside honest writing about organic
              sourcing, fresh milling, and whole-grain cooking. No preservatives, no
              glyphosate, no mystery ingredients.
            </p>
          </header>

          <div className="blog-tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`blog-tab ${activeTab === tab ? "active" : ""}`}
                type="button"
                onClick={() => setActiveTab(tab)}
              >
                {tab === "Recipes" && <ChefHat size={14} />}
                {tab === "Articles" && <BookOpen size={14} />}
                {tab}
                <span className="blog-tab-count">
                  {tab === "All" ? blogPosts.length : tab === "Recipes" ? recipes.length : articles.length}
                </span>
              </button>
            ))}
          </div>

          <div className="blog-grid">
            {visiblePosts.map((post) =>
              post.type === "recipe" ? (
                <RecipeCard key={post.slug} post={post} onSelect={handleSelectPost} />
              ) : (
                <ArticleCard key={post.slug} post={post} onSelect={handleSelectPost} />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
