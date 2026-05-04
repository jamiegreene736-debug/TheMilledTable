import React, { useMemo, useState } from "react";
import Admin from "./Admin.jsx";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Flame,
  Leaf,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Scale,
  ShoppingBag,
  Sparkles,
  Sprout,
  X,
} from "lucide-react";
import Blog from "./Blog.jsx";
import heroImage from "./assets/mill-hero.png";
import breadFlourImage from "./assets/products/bread-flour.jpg";
import customBlendImage from "./assets/products/custom-blend-builder.jpg";
import durumSemolinaImage from "./assets/products/durum-semolina.jpg";
import einkornFlourImage from "./assets/products/einkorn-flour.jpg";
import pastaBlendImage from "./assets/products/pasta-blend.jpg";
import pastryFlourImage from "./assets/products/pastry-flour.jpg";
import ryeFlourImage from "./assets/products/rye-flour.jpg";

const shopifyDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || "";

const products = [
  {
    id: "bread",
    name: "Stone-Milled Bread Flour",
    grain: "Hard red spring wheat",
    use: "Bread",
    price: 14,
    weight: "2 lb bag",
    badge: "High gluten",
    flavor: "Creamy wheat, toasted crust, open crumb",
    color: "#b88f4d",
    image: breadFlourImage,
    variantId: import.meta.env.VITE_SHOPIFY_BREAD_VARIANT_ID,
  },
  {
    id: "semolina",
    name: "Fresh Durum Semolina",
    grain: "Organic durum wheat",
    use: "Pasta",
    price: 16,
    weight: "2 lb bag",
    badge: "Pasta cut",
    flavor: "Golden color, firm bite, nutty finish",
    color: "#d9a93a",
    image: durumSemolinaImage,
    variantId: import.meta.env.VITE_SHOPIFY_SEMOLINA_VARIANT_ID,
  },
  {
    id: "einkorn",
    name: "Heritage Einkorn Flour",
    grain: "Ancient einkorn",
    use: "Pastry",
    price: 18,
    weight: "1.5 lb bag",
    badge: "Ancient grain",
    flavor: "Delicate sweetness, soft crumb, buttery aroma",
    color: "#c17442",
    image: einkornFlourImage,
    variantId: import.meta.env.VITE_SHOPIFY_EINKORN_VARIANT_ID,
  },
  {
    id: "rye",
    name: "Whole Rye Flour",
    grain: "Organic rye berries",
    use: "Bread",
    price: 13,
    weight: "2 lb bag",
    badge: "Whole grain",
    flavor: "Earthy, malty, deep color",
    color: "#6f6149",
    image: ryeFlourImage,
    variantId: import.meta.env.VITE_SHOPIFY_RYE_VARIANT_ID,
  },
  {
    id: "pasta",
    name: "Pasta Table Blend",
    grain: "Durum and hard white wheat",
    use: "Pasta",
    price: 15,
    weight: "2 lb bag",
    badge: "Silky dough",
    flavor: "Smooth sheet, sturdy noodle, warm grain",
    color: "#d1b45f",
    image: pastaBlendImage,
    variantId: import.meta.env.VITE_SHOPIFY_PASTA_VARIANT_ID,
  },
  {
    id: "pastry",
    name: "Soft Wheat Pastry Flour",
    grain: "Organic soft white wheat",
    use: "Pastry",
    price: 12,
    weight: "2 lb bag",
    badge: "Low protein",
    flavor: "Tender cakes, biscuits, and laminated dough",
    color: "#d7c191",
    image: pastryFlourImage,
    variantId: import.meta.env.VITE_SHOPIFY_PASTRY_VARIANT_ID,
  },
];

const categories = ["All", "Bread", "Pasta", "Pastry"];

const promises = [
  "Organic grain lots selected for flavor and clean growing practices",
  "A no-glyphosate-desiccation sourcing standard",
  "Proper milling in smaller batches for aroma, nutrition, and dough feel",
  "Flours chosen by use case: pasta, bread, pastry, pizza, and daily baking",
];

const processSteps = [
  {
    title: "Import",
    body: "Organic grains arrive as whole berries, chosen by harvest, protein, and flavor.",
  },
  {
    title: "Mill",
    body: "A dedicated miller stone mills the grain slowly so flour stays fragrant and alive.",
  },
  {
    title: "Bake",
    body: "You get flour matched to the table: pasta, bread, pastry, pizza, and more.",
  },
];

const MAX_BLEND_WEIGHT = 5;
const BLEND_STEP = 0.25;
const CUSTOM_BLEND_BASE_FEE = 4;

const blendFlours = [
  {
    id: "bread",
    name: "Bread Flour",
    grain: "Hard red spring wheat",
    role: "Structure, chew, open crumb",
    pricePerLb: 5.5,
    color: "#c19a56",
  },
  {
    id: "whole-wheat",
    name: "Whole Wheat",
    grain: "Whole hard wheat berry",
    role: "Wheat aroma, minerals, color",
    pricePerLb: 5.75,
    color: "#a76d39",
  },
  {
    id: "rye",
    name: "Whole Rye",
    grain: "Organic rye berries",
    role: "Earthy depth, fermentation energy",
    pricePerLb: 5,
    color: "#6f6046",
  },
  {
    id: "einkorn",
    name: "Einkorn",
    grain: "Ancient einkorn",
    role: "Butter sweetness, tender crumb",
    pricePerLb: 8.5,
    color: "#d0a45b",
  },
  {
    id: "spelt",
    name: "Spelt",
    grain: "Organic spelt",
    role: "Nutty aroma, extensible dough",
    pricePerLb: 7.25,
    color: "#b88445",
  },
  {
    id: "durum",
    name: "Durum Semolina",
    grain: "Organic durum wheat",
    role: "Golden color, pasta bite",
    pricePerLb: 7,
    color: "#d8aa35",
  },
  {
    id: "soft-wheat",
    name: "Soft Wheat",
    grain: "Soft white wheat",
    role: "Tender pastry, biscuits, cakes",
    pricePerLb: 5.25,
    color: "#dcc68e",
  },
  {
    id: "buckwheat",
    name: "Buckwheat",
    grain: "Organic buckwheat groats",
    role: "Toasty flavor, gluten-free grain note",
    pricePerLb: 7.75,
    color: "#806246",
  },
  {
    id: "oat",
    name: "Oat Flour",
    grain: "Organic oats",
    role: "Softness, sweetness, browning",
    pricePerLb: 6.25,
    color: "#c9b98d",
  },
  {
    id: "khorasan",
    name: "Khorasan",
    grain: "Ancient khorasan wheat",
    role: "Golden dough, buttery grain",
    pricePerLb: 8,
    color: "#c8923f",
  },
];

const blendTemplates = [
  {
    id: "country-sourdough",
    name: "Country Sourdough",
    use: "Open crumb bread",
    note: "Bread flour backbone with whole wheat and rye for flavor and fermentation.",
    weights: { bread: 1.75, "whole-wheat": 0.5, rye: 0.25 },
  },
  {
    id: "pizza-focaccia",
    name: "Pizza & Focaccia",
    use: "Crisp-chewy crust",
    note: "Strong wheat with a little semolina and whole grain for color and bite.",
    weights: { bread: 2, durum: 0.35, "whole-wheat": 0.15 },
  },
  {
    id: "fresh-pasta",
    name: "Fresh Pasta",
    use: "Sheets and noodles",
    note: "Durum semolina plus hard wheat for a golden dough that rolls cleanly.",
    weights: { durum: 1.5, bread: 0.75, "soft-wheat": 0.25 },
  },
  {
    id: "tender-pastry",
    name: "Tender Pastry",
    use: "Biscuits, crusts, cookies",
    note: "Soft wheat keeps it delicate; oat flour adds sweetness and browning.",
    weights: { "soft-wheat": 1.75, oat: 0.5, einkorn: 0.25 },
  },
  {
    id: "ancient-grain",
    name: "Ancient Grain Table",
    use: "Flavor-forward loaves",
    note: "Einkorn, spelt, and khorasan make an aromatic heritage blend.",
    weights: { einkorn: 0.85, spelt: 0.85, khorasan: 0.8 },
  },
  {
    id: "dark-rye",
    name: "Dark Rye Builder",
    use: "Rye pans and seeded loaves",
    note: "Mostly rye with enough bread flour to help structure and lift.",
    weights: { rye: 2.1, bread: 0.4 },
  },
];

function formatCurrency(value) {
  const hasCents = Math.round(value * 100) % 100 !== 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: hasCents ? 2 : 0,
  }).format(value);
}

function normalizeShopifyDomain(value) {
  if (!value) return "";
  return value.startsWith("http") ? value.replace(/\/$/, "") : `https://${value.replace(/\/$/, "")}`;
}

function buildShopifyCartUrl(cart) {
  const lines = cart
    .map((item) => {
      if (item.type === "blend") return null;
      const product = products.find((entry) => entry.id === item.id);
      if (!product?.variantId) return null;
      return `${product.variantId}:${item.quantity}`;
    })
    .filter(Boolean);

  if (!shopifyDomain || lines.length === 0) return "";

  const params = new URLSearchParams({
    utm_source: "themilledtable",
    utm_medium: "site",
    utm_campaign: "fresh_milled_launch",
  });

  return `${normalizeShopifyDomain(shopifyDomain)}/cart/${lines.join(",")}?${params.toString()}`;
}

function LogoMark({ variant = "dark" }) {
  return (
    <span className={`logo-mark logo-mark--${variant}`} aria-label="The Milled Table">
      <span className="logo-the">The</span>
      <span className="logo-milled">Milled</span>
      <span className="logo-table">Table</span>
    </span>
  );
}

function roundToStep(value) {
  return Math.round(value / BLEND_STEP) * BLEND_STEP;
}

function formatPounds(value) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(2).replace(/0$/, "");
}

function getBlendComponents(weights) {
  return Object.entries(weights)
    .filter(([, weight]) => weight > 0)
    .map(([id, weight]) => ({
      flour: blendFlours.find((flour) => flour.id === id),
      weight,
    }))
    .filter((entry) => entry.flour);
}

function calculateBlendPrice(weights) {
  const flourTotal = getBlendComponents(weights).reduce(
    (total, { flour, weight }) => total + flour.pricePerLb * weight,
    0,
  );

  return Math.round((CUSTOM_BLEND_BASE_FEE + flourTotal) * 100) / 100;
}

function blendSummary(weights) {
  return getBlendComponents(weights)
    .map(({ flour, weight }) => `${flour.name} ${formatPounds(weight)} lb`)
    .join(" · ");
}

function BlendBuilder({ onAddBlend }) {
  const [blendName, setBlendName] = useState("Custom Table Blend");
  const [weights, setWeights] = useState(blendTemplates[0].weights);

  const components = getBlendComponents(weights);
  const totalWeight = components.reduce((total, { weight }) => total + weight, 0);
  const remainingWeight = Math.max(0, MAX_BLEND_WEIGHT - totalWeight);
  const price = totalWeight > 0 ? calculateBlendPrice(weights) : 0;
  const pricePerPound = totalWeight > 0 ? price / totalWeight : 0;
  const activeTemplate = blendTemplates.find((template) => {
    const ids = new Set([...Object.keys(template.weights), ...Object.keys(weights)]);
    return [...ids].every((id) => (template.weights[id] || 0) === (weights[id] || 0));
  });

  function setTemplate(template) {
    setWeights(template.weights);
    setBlendName(template.name);
  }

  function updateWeight(flourId, nextValue) {
    setWeights((current) => {
      const currentWeight = current[flourId] || 0;
      const otherWeight = Object.entries(current)
        .filter(([id]) => id !== flourId)
        .reduce((total, [, weight]) => total + weight, 0);
      const maxForFlour = MAX_BLEND_WEIGHT - otherWeight;
      const safeWeight = Math.min(Math.max(0, roundToStep(nextValue)), maxForFlour);
      const next = { ...current, [flourId]: safeWeight };

      if (safeWeight === 0 && currentWeight !== 0) {
        delete next[flourId];
      }

      return next;
    });
  }

  function resetBlend() {
    setWeights({});
    setBlendName("Custom Table Blend");
  }

  function addBlend() {
    if (totalWeight <= 0 || totalWeight > MAX_BLEND_WEIGHT) return;

    onAddBlend({
      key: `blend:${Date.now()}`,
      type: "blend",
      name: blendName.trim() || "Custom Table Blend",
      weight: totalWeight,
      price,
      components: components.map(({ flour, weight }) => ({
        id: flour.id,
        name: flour.name,
        weight,
      })),
      quantity: 1,
    });
  }

  return (
    <section className="blend-section" id="blend-builder">
      <div className="blend-visual">
        <img src={customBlendImage} alt="Custom flour blend bowls and grains" />
        <div className="blend-visual-panel">
          <span>Up to {MAX_BLEND_WEIGHT} lb</span>
          <strong>{formatPounds(totalWeight)} lb selected</strong>
          <em>{formatCurrency(price)} estimated</em>
        </div>
      </div>

      <div className="blend-workbench">
        <div className="blend-heading">
          <p className="section-kicker">
            <Sparkles size={14} />
            Custom Flour Builder
          </p>
          <h2>Build a flour blend for exactly what you are making.</h2>
          <p>
            Pick any combination of our organic flours up to five pounds total. The price updates as
            you build, and the blend goes into the basket as a Shopify-ready custom line for the next
            checkout integration step.
          </p>
        </div>

        <div className="blend-summary-card">
          <label className="blend-name-label">
            Blend name
            <input value={blendName} onChange={(event) => setBlendName(event.target.value)} />
          </label>
          <div className="blend-meters">
            <div>
              <span>Total</span>
              <strong>{formatPounds(totalWeight)} / {MAX_BLEND_WEIGHT} lb</strong>
            </div>
            <div>
              <span>Remaining</span>
              <strong>{formatPounds(remainingWeight)} lb</strong>
            </div>
            <div>
              <span>Price</span>
              <strong>{formatCurrency(price)}</strong>
            </div>
          </div>
          <div className="blend-progress" aria-label={`${formatPounds(totalWeight)} pounds selected`}>
            <span style={{ width: `${Math.min(100, (totalWeight / MAX_BLEND_WEIGHT) * 100)}%` }} />
          </div>
          <p className="blend-price-note">
            Includes a {formatCurrency(CUSTOM_BLEND_BASE_FEE)} custom milling and bagging fee
            {totalWeight > 0 ? ` · ${formatCurrency(pricePerPound)} per lb blended` : ""}.
          </p>
        </div>

        <div className="template-grid" aria-label="Blend templates">
          {blendTemplates.map((template) => {
            const templateComponents = getBlendComponents(template.weights);
            const templateWeight = templateComponents.reduce((total, { weight }) => total + weight, 0);

            return (
              <button
                className={activeTemplate?.id === template.id ? "template-card active" : "template-card"}
                key={template.id}
                type="button"
                onClick={() => setTemplate(template)}
              >
                <span className="template-use">
                  {template.use}
                  <small>
                    {templateComponents.length} flour{templateComponents.length === 1 ? "" : "s"}
                  </small>
                </span>
                <strong>{template.name}</strong>
                <div className="template-mix-bar" aria-hidden="true">
                  {templateComponents.map(({ flour, weight }) => (
                    <i
                      key={flour.id}
                      style={{
                        "--mix-color": flour.color,
                        width: `${(weight / templateWeight) * 100}%`,
                      }}
                    />
                  ))}
                </div>
                <div className="template-flour-list" aria-label={`${template.name} flour mix`}>
                  {templateComponents.map(({ flour, weight }) => (
                    <span
                      className="template-flour-chip"
                      key={flour.id}
                      style={{ "--mix-color": flour.color }}
                    >
                      <i aria-hidden="true" />
                      {flour.name}
                      <b>{formatPounds(weight)} lb</b>
                    </span>
                  ))}
                </div>
                <em>{template.note}</em>
              </button>
            );
          })}
        </div>

        <div className="flour-control-grid">
          {blendFlours.map((flour) => {
            const weight = weights[flour.id] || 0;
            const maxForFlour = Math.min(MAX_BLEND_WEIGHT, weight + remainingWeight);
            const percent = totalWeight > 0 ? (weight / totalWeight) * 100 : 0;

            return (
              <article className="flour-control" key={flour.id} style={{ "--flour-color": flour.color }}>
                <div className="flour-control-top">
                  <span className="flour-swatch" />
                  <div>
                    <h3>{flour.name}</h3>
                    <p>{flour.grain}</p>
                  </div>
                  <strong>{formatCurrency(flour.pricePerLb)}/lb</strong>
                </div>
                <p className="flour-role">{flour.role}</p>
                <div className="flour-range-row">
                  <button type="button" onClick={() => updateWeight(flour.id, weight - BLEND_STEP)}>
                    <Minus size={14} />
                  </button>
                  <input
                    aria-label={`${flour.name} pounds`}
                    max={maxForFlour}
                    min="0"
                    step={BLEND_STEP}
                    type="range"
                    value={weight}
                    onChange={(event) => updateWeight(flour.id, Number(event.target.value))}
                  />
                  <button type="button" onClick={() => updateWeight(flour.id, weight + BLEND_STEP)}>
                    <Plus size={14} />
                  </button>
                </div>
                <div className="flour-control-bottom">
                  <span>{formatPounds(weight)} lb</span>
                  <span>{Math.round(percent)}%</span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="blend-actions">
          <button className="secondary-blend-action" type="button" onClick={resetBlend}>
            Reset blend
          </button>
          <button className="primary-blend-action" type="button" onClick={addBlend} disabled={totalWeight <= 0}>
            Add custom blend
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Store() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [showBlog, setShowBlog] = useState(false);

  const visibleProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((product) => product.use === activeCategory);
  }, [activeCategory]);

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => {
          if (item.type === "blend") {
            return {
              ...item,
              product: {
                id: item.key,
                name: item.name,
                price: item.price,
                weight: `${formatPounds(item.weight)} lb custom blend`,
              },
              detail: item.components
                .map((component) => `${component.name} ${formatPounds(component.weight)} lb`)
                .join(" · "),
            };
          }

          return {
            ...item,
            product: products.find((product) => product.id === item.id),
          };
        })
        .filter((item) => item.product),
    [cart],
  );

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const checkoutUrl = buildShopifyCartUrl(cart);

  function addToCart(productId) {
    setCart((items) => {
      const current = items.find((item) => item.type !== "blend" && item.id === productId);
      if (current) {
        return items.map((item) =>
          item.type !== "blend" && item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...items, { id: productId, type: "product", quantity: 1 }];
    });
    setCartOpen(true);
    setNotice("Added to basket");
    window.setTimeout(() => setNotice(""), 1600);
  }

  function addBlendToCart(blend) {
    setCart((items) => [...items, blend]);
    setCartOpen(true);
    setNotice("Custom blend added to basket");
    window.setTimeout(() => setNotice(""), 1800);
  }

  function updateQuantity(itemKey, direction) {
    setCart((items) =>
      items
        .map((item) =>
          (item.key || item.id) === itemKey
            ? { ...item, quantity: Math.max(0, item.quantity + direction) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function handleCheckout(event) {
    if (checkoutUrl) return;
    event.preventDefault();
    setNotice("Add Shopify store domain and variant IDs to enable checkout");
    window.setTimeout(() => setNotice(""), 2400);
  }

  if (showBlog) {
    return (
      <div className="site-shell">
        <Blog onClose={() => { setShowBlog(false); window.scrollTo({ top: 0 }); }} />
      </div>
    );
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <button className="icon-button menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">
          <Menu size={22} />
        </button>

        <a className="brand-mark" href="#top" aria-label="Milled Table home">
          <LogoMark variant="dark" />
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          <a href="#flours">Flours</a>
          <a href="#blend-builder">Custom Blend</a>
          <a href="#milling">Milling</a>
          <a href="#standards">Standards</a>
          <button
            className="site-nav-blog-btn"
            type="button"
            onClick={() => { setShowBlog(true); window.scrollTo({ top: 0 }); }}
          >
            <BookOpen size={14} />
            Recipes & Blog
          </button>
          <a href="#contact">Contact</a>
        </nav>

        <button className="cart-button" type="button" onClick={() => setCartOpen(true)}>
          <ShoppingBag size={18} />
          <span className="cart-label">Basket</span>
          <strong>{itemCount}</strong>
        </button>
      </header>

      {/* Mobile full-screen menu overlay */}
      <div className="mobile-menu" data-open={menuOpen} aria-hidden={!menuOpen}>
        <div className="mobile-menu-top">
          <LogoMark variant="light" />
          <button className="mobile-menu-close" type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={26} />
          </button>
        </div>
        <nav className="mobile-menu-nav">
          <a href="#flours" onClick={() => setMenuOpen(false)}>Flours</a>
          <a href="#blend-builder" onClick={() => setMenuOpen(false)}>Custom Blend</a>
          <a href="#milling" onClick={() => setMenuOpen(false)}>Milling</a>
          <a href="#standards" onClick={() => setMenuOpen(false)}>Standards</a>
          <button
            type="button"
            onClick={() => { setMenuOpen(false); setShowBlog(true); window.scrollTo({ top: 0 }); }}
          >
            <BookOpen size={18} />
            Recipes & Blog
          </button>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <div className="mobile-menu-footer">
          <a href="mailto:hello@themilledtable.com">hello@themilledtable.com</a>
          <span>· Organic grain, properly milled ·</span>
        </div>
      </div>

      <main id="top">
        <section className="hero-section" aria-label="The Milled Table">
          <img className="hero-image" src={heroImage} alt="" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">
              <Sprout size={16} />
              Organic grain, properly milled
            </p>
            <h1>
              The Milled
              <span>Table</span>
            </h1>
            <p className="hero-copy">
              Fresh flour for bread, pasta, pastry, and daily baking, stone milled from organic
              whole grains selected for clean growing practices and deep flavor.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#flours">
                Shop flours
                <ArrowRight size={18} />
              </a>
              <a className="secondary-action" href="#standards">
                Our standard
                <ChevronRight size={17} />
              </a>
            </div>
          </div>
          <div className="hero-proof" aria-label="Milling standards">
            <span>
              <Leaf size={17} />
              Organic grain
            </span>
            <span>
              <Scale size={17} />
              Small batches
            </span>
            <span>
              <PackageCheck size={17} />
              Table-ready flour
            </span>
          </div>
        </section>

        <section className="intro-band" id="standards">
          <div className="section-kicker">The Standard</div>
          <div className="intro-grid">
            <h2>Flour should taste like the field it came from, not the warehouse it sat in.</h2>
            <div className="intro-copy">
              <p>
                The Milled Table is built around whole organic grains, transparent lots, and
                milling close to when you bake. Our sourcing avoids glyphosate desiccation and
                keeps the emphasis where it belongs: grain variety, harvest quality, and the feel
                of the dough in your hands.
              </p>
              <ul className="promise-list">
                {promises.map((promise) => (
                  <li key={promise}>
                    <Check size={17} />
                    {promise}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="product-section" id="flours">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Fresh Flour Drops</p>
              <h2>Choose by what you are making.</h2>
            </div>
            <div className="category-tabs" aria-label="Filter flour by use">
              {categories.map((category) => (
                <button
                  className={activeCategory === category ? "active" : ""}
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <img className="product-photo" src={product.image} alt={`${product.name} grains and flour`} />
                <div className="product-card-body">
                  <div className="product-meta">
                    <span>{product.badge}</span>
                    <span>{product.weight}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <p className="grain-name">{product.grain}</p>
                  <p>{product.flavor}</p>
                </div>
                <div className="product-footer">
                  <strong>{formatCurrency(product.price)}</strong>
                  <button type="button" onClick={() => addToCart(product.id)}>
                    <Plus size={17} />
                    Add
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <BlendBuilder onAddBlend={addBlendToCart} />

        <div className="photo-strip" aria-hidden="true">
          {[breadFlourImage, ryeFlourImage, einkornFlourImage, durumSemolinaImage, pastryFlourImage, pastaBlendImage].map((img, i) => (
            <img key={i} src={img} alt="" className="strip-photo" />
          ))}
        </div>

        <section className="milling-section" id="milling">
          <div className="milling-copy">
            <p className="section-kicker">Proper Milling</p>
            <h2>Whole berries in. Living flour out.</h2>
            <p>
              Milling is not just grinding. It is a choice of stone, speed, temperature, sift, and
              timing. We keep the germ and aroma in the conversation so every bag has a real job at
              the table.
            </p>
          </div>
          <div className="process-track">
            {processSteps.map((step, index) => (
              <article className="process-step" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="use-section">
          <div className="use-panel" style={{ backgroundImage: `url(${breadFlourImage})` }}>
            <div className="use-panel-scrim" />
            <div className="use-panel-inner">
              <div>
                <p className="section-kicker">For Bread</p>
                <h2>Strength, aroma, and a crust worth waiting for.</h2>
              </div>
              <p>
                Hard wheat flours are milled for sourdough, enriched dough, focaccia, pizza, and
                everyday loaves where protein and flavor both matter.
              </p>
              <a className="use-panel-cta" href="#flours">Shop bread flours <ArrowRight size={15} /></a>
            </div>
          </div>
          <div className="use-panel accent" style={{ backgroundImage: `url(${durumSemolinaImage})` }}>
            <div className="use-panel-scrim" />
            <div className="use-panel-inner">
              <div>
                <p className="section-kicker">For Pasta</p>
                <h2>Golden semolina and blends for dough that holds its shape.</h2>
              </div>
              <p>
                Durum and pasta-focused blends bring structure to extruded shapes, fresh sheets,
                gnocchi, and hand-cut noodles.
              </p>
              <a className="use-panel-cta" href="#flours">Shop pasta flours <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="blog-teaser-section">
          <div className="blog-teaser-copy">
            <p className="section-kicker">
              <BookOpen size={14} />
              Organic Recipes & Blog
            </p>
            <h2>Writing about grain, the way it should be grown, and what to do with it.</h2>
            <p>
              No preservatives. No glyphosate desiccation. No mystery additives. Our blog
              covers organic sourcing, fresh milling, sourdough technique, ancient grains,
              and seasonal whole-grain cooking — honest writing for people who care about
              what goes on the table.
            </p>
            <button
              className="primary-action blog-teaser-btn"
              type="button"
              onClick={() => { setShowBlog(true); window.scrollTo({ top: 0 }); }}
            >
              Recipes & Blog
              <ArrowRight size={17} />
            </button>
          </div>
          <div className="blog-teaser-topics">
            {[
              { label: "Why we mill our own flour", sub: "Fresh vs. shelf — the real difference" },
              { label: "Glyphosate in wheat", sub: "What pre-harvest desiccation means for your bread" },
              { label: "Sourdough from scratch", sub: "Building a starter with whole-grain flour" },
              { label: "Baking without preservatives", sub: "Storage, shelf life, and trust" },
              { label: "Einkorn: the ancient grain", sub: "10,000 years of flavor, unchanged" },
              { label: "Seasonal grain cooking", sub: "Eating by the harvest calendar" },
            ].map((topic) => (
              <button
                key={topic.label}
                className="blog-topic-chip"
                type="button"
                onClick={() => { setShowBlog(true); window.scrollTo({ top: 0 }); }}
              >
                <strong>{topic.label}</strong>
                <span>{topic.sub}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="newsletter-section" id="contact">
          <div>
            <p className="section-kicker">Stay Connected</p>
            <h2>Fresh drops, lot notes, and wholesale milling updates.</h2>
          </div>
          <form
            className="signup-form"
            action="mailto:hello@themilledtable.com"
            method="post"
            encType="text/plain"
          >
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required />
            <button type="submit">
              <Sparkles size={17} />
              Join list
            </button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>The Milled Table</strong>
          <p>Organic grains, proper milling, fresh flour.</p>
        </div>
        <div className="footer-links">
          <a href="mailto:hello@themilledtable.com">hello@themilledtable.com</a>
          <a href="https://www.themilledtable.com">www.themilledtable.com</a>
        </div>
      </footer>

      <aside className="cart-drawer" data-open={cartOpen} aria-hidden={!cartOpen}>
        <div className="drawer-panel" role="dialog" aria-modal="true" aria-label="Basket">
          <div className="drawer-header">
            <div>
              <p className="section-kicker">Basket</p>
              <h2>Fresh flour order</h2>
            </div>
            <button className="icon-button" type="button" onClick={() => setCartOpen(false)}>
              <X size={20} />
              <span className="sr-only">Close basket</span>
            </button>
          </div>

          <div className="drawer-items">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <Flame size={22} />
                <p>Your basket is ready for a fresh milling drop.</p>
              </div>
            ) : (
              cartItems.map(({ product, quantity, detail }) => (
                <div className="cart-line" key={product.id}>
                  <div>
                    <strong>{product.name}</strong>
                    <span>
                      {product.weight} · {formatCurrency(product.price)}
                    </span>
                    {detail && <em>{detail}</em>}
                  </div>
                  <div className="quantity-controls">
                    <button type="button" onClick={() => updateQuantity(product.id, -1)}>
                      <Minus size={15} />
                    </button>
                    <span>{quantity}</span>
                    <button type="button" onClick={() => updateQuantity(product.id, 1)}>
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="drawer-footer">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </div>
            <a
              className={`checkout-button ${checkoutUrl ? "" : "disabled"}`}
              href={checkoutUrl || "#flours"}
              onClick={handleCheckout}
            >
              Checkout with Shopify
              <ArrowRight size={18} />
            </a>
            {!checkoutUrl && (
              <p className="checkout-note">
                Checkout activates when Shopify variant IDs are added. Custom blends are priced here
                and ready to map to a Shopify custom product in the next step.
              </p>
            )}
          </div>
        </div>
        <button className="drawer-backdrop" type="button" onClick={() => setCartOpen(false)}>
          <span className="sr-only">Close basket</span>
        </button>
      </aside>

      <div className="toast" data-visible={Boolean(notice)} aria-live="polite">
        {notice}
      </div>
    </div>
  );
}

export default function App() {
  if (window.location.pathname === "/admin") return <Admin />;
  return <Store />;
}
