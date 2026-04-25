import React, { useMemo, useState } from "react";
import {
  ArrowRight,
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
  Wheat,
  X,
} from "lucide-react";
import heroImage from "./assets/mill-hero.png";

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

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function normalizeShopifyDomain(value) {
  if (!value) return "";
  return value.startsWith("http") ? value.replace(/\/$/, "") : `https://${value.replace(/\/$/, "")}`;
}

function buildShopifyCartUrl(cart) {
  const lines = cart
    .map((item) => {
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

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const visibleProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter((product) => product.use === activeCategory);
  }, [activeCategory]);

  const cartItems = useMemo(
    () =>
      cart.map((item) => ({
        ...item,
        product: products.find((product) => product.id === item.id),
      })),
    [cart],
  );

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const checkoutUrl = buildShopifyCartUrl(cart);

  function addToCart(productId) {
    setCart((items) => {
      const current = items.find((item) => item.id === productId);
      if (current) {
        return items.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...items, { id: productId, quantity: 1 }];
    });
    setCartOpen(true);
    setNotice("Added to basket");
    window.setTimeout(() => setNotice(""), 1600);
  }

  function updateQuantity(productId, direction) {
    setCart((items) =>
      items
        .map((item) =>
          item.id === productId
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

  return (
    <div className="site-shell">
      <header className="site-header" data-open={menuOpen}>
        <a className="brand-mark" href="#top" aria-label="The Milled Table home">
          <span className="brand-symbol">
            <Wheat size={22} strokeWidth={1.9} />
          </span>
          <span>
            <strong>The Milled Table</strong>
            <small>Organic grain, fresh flour</small>
          </span>
        </a>

        <button className="icon-button menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
          <span className="sr-only">Menu</span>
        </button>

        <nav className="site-nav" aria-label="Main navigation">
          <a href="#flours" onClick={() => setMenuOpen(false)}>
            Flours
          </a>
          <a href="#milling" onClick={() => setMenuOpen(false)}>
            Milling
          </a>
          <a href="#standards" onClick={() => setMenuOpen(false)}>
            Standards
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>

        <button className="cart-button" type="button" onClick={() => setCartOpen(true)}>
          <ShoppingBag size={18} />
          <span>Basket</span>
          <strong>{itemCount}</strong>
        </button>
      </header>

      <main id="top">
        <section className="hero-section" aria-label="The Milled Table">
          <img className="hero-image" src={heroImage} alt="" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">
              <Sprout size={16} />
              Organic grain, properly milled
            </p>
            <h1>The Milled Table</h1>
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
                <div className="grain-visual" style={{ "--grain": product.color }}>
                  <span />
                  <span />
                  <span />
                </div>
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
          <div className="use-panel">
            <div>
              <p className="section-kicker">For Bread</p>
              <h2>Strength, aroma, and a crust worth waiting for.</h2>
            </div>
            <p>
              Hard wheat flours are milled for sourdough, enriched dough, focaccia, pizza, and
              everyday loaves where protein and flavor both matter.
            </p>
          </div>
          <div className="use-panel accent">
            <div>
              <p className="section-kicker">For Pasta</p>
              <h2>Golden semolina and blends for dough that holds its shape.</h2>
            </div>
            <p>
              Durum and pasta-focused blends bring structure to extruded shapes, fresh sheets,
              gnocchi, and hand-cut noodles.
            </p>
          </div>
        </section>

        <section className="newsletter-section" id="contact">
          <div>
            <p className="section-kicker">Mill Notes</p>
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
              cartItems.map(({ product, quantity }) => (
                <div className="cart-line" key={product.id}>
                  <div>
                    <strong>{product.name}</strong>
                    <span>
                      {product.weight} · {formatCurrency(product.price)}
                    </span>
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
              <p className="checkout-note">Checkout activates when Shopify variant IDs are added.</p>
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

export default App;
