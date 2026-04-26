import React from "react";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "./blogData.js";

const categoryColors = {
  Milling: { bg: "#e8f0e0", color: "#3d5c28" },
  Standards: { bg: "#e0ead8", color: "#355225" },
  Baking: { bg: "#f5ead5", color: "#7a4e1a" },
  Ingredients: { bg: "#f0e8d8", color: "#6b4420" },
  Grains: { bg: "#ede3d0", color: "#5c3d18" },
  Cooking: { bg: "#e5dfd4", color: "#4d3920" },
};

function CategoryBadge({ category }) {
  const style = categoryColors[category] || { bg: "#ede8e0", color: "#4d3920" };
  return (
    <span className="blog-category" style={{ background: style.bg, color: style.color }}>
      <Tag size={11} />
      {category}
    </span>
  );
}

function PostCard({ post, onSelect }) {
  return (
    <article className="blog-card" onClick={() => onSelect(post.slug)}>
      <div className="blog-card-header">
        <CategoryBadge category={post.category} />
        <div className="blog-card-meta">
          <span>
            <Calendar size={13} />
            {post.date}
          </span>
          <span>
            <Clock size={13} />
            {post.readTime}
          </span>
        </div>
      </div>
      <h3>{post.title}</h3>
      <p className="blog-excerpt">{post.excerpt}</p>
      <button className="blog-read-more" type="button">
        Read article
        <ArrowRight size={15} />
      </button>
    </article>
  );
}

function PostView({ post, onBack }) {
  return (
    <article className="blog-post-view">
      <div className="blog-post-nav">
        <button className="blog-back-btn" type="button" onClick={onBack}>
          <ArrowLeft size={16} />
          All articles
        </button>
      </div>

      <header className="blog-post-header">
        <div className="blog-post-header-meta">
          <CategoryBadge category={post.category} />
          <span className="blog-post-date">
            <Calendar size={13} />
            {post.date}
          </span>
          <span className="blog-post-read">
            <Clock size={13} />
            {post.readTime}
          </span>
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
                {section.list.map((item, k) => (
                  <li key={k}>{item}</li>
                ))}
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

export default function Blog({ onClose }) {
  const [activePost, setActivePost] = React.useState(null);

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
            <span>The Mill Notes</span>
          </div>
        )}
      </div>

      {selectedPost ? (
        <PostView post={selectedPost} onBack={handleBack} />
      ) : (
        <div className="blog-index">
          <header className="blog-index-header">
            <p className="section-kicker">
              <BookOpen size={14} />
              Mill Notes
            </p>
            <h1 className="blog-index-title">
              Organic cooking, clean grain,
              <span> and the table it all leads to.</span>
            </h1>
            <p className="blog-index-sub">
              Recipes, sourcing deep-dives, milling notes, and honest writing about what it
              means to cook without shortcuts. No preservatives, no glyphosate, no mystery
              ingredients.
            </p>
          </header>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <PostCard key={post.slug} post={post} onSelect={handleSelectPost} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
