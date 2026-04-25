# The Milled Table

Fresh storefront for `www.themilledtable.com`, built with Vite, React, and a Shopify-ready cart flow.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The `public/CNAME` file is set to `www.themilledtable.com` for GitHub Pages style deployments.

## Shopify Checkout

The basket builds a Shopify cart permalink when a store domain and product variant IDs are available. Copy `.env.example` to `.env.local`, then fill in the Shopify store URL and each variant ID:

```bash
cp .env.example .env.local
```

```env
VITE_SHOPIFY_STORE_DOMAIN=https://your-shop-name.myshopify.com
VITE_SHOPIFY_BREAD_VARIANT_ID=1234567890
VITE_SHOPIFY_SEMOLINA_VARIANT_ID=1234567891
```

Shopify’s official cart permalink format is:

```text
https://{shop}.myshopify.com/cart/{variant_id}:{quantity},{variant_id}:{quantity}
```

Reference: https://shopify.dev/docs/apps/build/checkout/create-cart-permalinks

## Content Notes

The site uses careful language around glyphosate: it states a no-glyphosate-desiccation sourcing standard rather than making an unsupported absolute lab claim.
