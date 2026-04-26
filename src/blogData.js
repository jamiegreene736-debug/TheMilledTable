export const blogPosts = [
  // ─── RECIPES ────────────────────────────────────────────────
  {
    slug: "whole-wheat-sourdough-country-loaf",
    type: "recipe",
    imageKey: "bread-flour",
    title: "Whole Wheat Sourdough Country Loaf",
    date: "April 22, 2026",
    category: "Bread",
    readTime: "14 hr total · 45 min active",
    yield: "1 large loaf (approx. 900g)",
    difficulty: "Intermediate",
    excerpt:
      "An open-crumb country loaf made with 80% stone-milled bread flour and 20% whole rye. Long cold fermentation does the work overnight — you shape it in the morning and bake before lunch.",
    ingredients: [
      {
        section: "Levain (build night before)",
        items: [
          "20g active sourdough starter",
          "40g stone-milled whole wheat flour",
          "40g filtered water, room temperature",
        ],
      },
      {
        section: "Main dough",
        items: [
          "360g stone-milled bread flour (hard red spring wheat)",
          "90g stone-milled whole rye flour",
          "340g filtered water, divided (320g + 20g)",
          "90g ripe levain (from above)",
          "10g fine sea salt (no iodine)",
        ],
      },
    ],
    steps: [
      {
        heading: "Build the levain",
        body: "The night before baking, mix 20g starter, 40g whole wheat flour, and 40g water in a small jar. Cover and leave at room temperature (21–24°C) for 10–12 hours until it has peaked and is just beginning to recede. It should be bubbly throughout, smell like ripe yogurt, and pass the float test.",
      },
      {
        heading: "Autolyse",
        body: "In a large bowl, combine 360g bread flour, 90g rye flour, and 320g water. Mix until no dry flour remains. Cover and rest for 45 minutes. This rest allows the flour to fully hydrate and begins gluten development without any effort.",
      },
      {
        heading: "Add levain and salt",
        body: "Add 90g ripe levain to the autolysed dough. Squeeze and fold until incorporated — about 3 minutes. Rest 30 minutes. Dissolve 10g salt in the remaining 20g water, add to the dough, and work in thoroughly with the same squeezing motion.",
      },
      {
        heading: "Bulk fermentation with folds",
        body: "Over the next 4–5 hours at room temperature, perform 4 sets of stretch-and-folds spaced 45 minutes apart. For each set: wet your hand, grab the dough from one side, stretch it up as high as it will go without tearing, then fold it over the centre. Rotate the bowl 90° and repeat four times around the bowl. After the final fold, leave the dough undisturbed until it has grown 50–75% and shows bubbles throughout.",
      },
      {
        heading: "Pre-shape",
        body: "Turn the dough onto an unfloured surface. Using a bench scraper, gently fold the edges in and drag the dough toward you to build surface tension. A tight, round skin should form. Rest uncovered for 25 minutes.",
      },
      {
        heading: "Final shape",
        body: "Lightly flour the top of the dough. Flip it over onto a lightly floured surface. Fold the bottom third up, the sides in, then roll toward you firmly. Place seam-side up in a floured banneton or a bowl lined with a well-floured cloth.",
      },
      {
        heading: "Cold proof",
        body: "Cover loosely and refrigerate for 10–14 hours (overnight). The cold retard develops flavor and makes scoring easier. You can bake directly from the fridge — no need to bring it to room temperature.",
      },
      {
        heading: "Bake",
        body: "Place a Dutch oven in your oven and preheat to 250°C (480°F) for at least 45 minutes. Turn the cold dough onto a piece of parchment. Score the top swiftly with a lame or sharp razor at a 30–45° angle. Lower into the Dutch oven using the parchment. Bake covered for 20 minutes, then uncover and continue baking for 22–26 minutes until the crust is a deep mahogany and the internal temperature reads 98–99°C. Cool on a wire rack for at least 1 hour before cutting.",
      },
    ],
    notes:
      "If you don't have a Dutch oven, bake on a preheated baking stone with a tray of boiling water on the rack below to generate steam for the first 15 minutes. The crust won't be quite as blistered but the crumb will be identical.",
  },
  {
    slug: "einkorn-honey-oat-sandwich-loaf",
    type: "recipe",
    imageKey: "einkorn-flour",
    title: "Einkorn, Honey & Oat Sandwich Loaf",
    date: "April 15, 2026",
    category: "Bread",
    readTime: "4 hr total · 30 min active",
    yield: "1 standard loaf tin (900g / 2 lb)",
    difficulty: "Beginner",
    excerpt:
      "A soft, golden sandwich loaf using heritage einkorn flour and raw honey. No commercial yeast — the starter does all the lifting. Slices cleanly, toasts beautifully, and stays tender for three days.",
    ingredients: [
      {
        section: "Dough",
        items: [
          "300g heritage einkorn flour (sifted)",
          "100g stone-milled whole wheat bread flour",
          "260g whole milk, warmed to 38°C",
          "80g active sourdough starter (100% hydration)",
          "30g raw honey (local, unfiltered)",
          "30g unsalted organic butter, softened",
          "8g fine sea salt",
        ],
      },
      {
        section: "Pan prep & finish",
        items: [
          "Soft butter for greasing the tin",
          "25g rolled oats (for topping)",
          "1 tbsp whole milk (for brushing)",
        ],
      },
    ],
    steps: [
      {
        heading: "Mix the dough",
        body: "Warm the milk to 38°C (just warm to the touch — hot milk kills the starter). Whisk in the honey and starter until smooth. Add both flours and the salt, mixing until a shaggy dough forms. It will feel stickier than modern wheat dough — this is normal for einkorn. Turn out and knead gently for 3–4 minutes until the dough comes together. Add the softened butter in small pieces and knead until fully incorporated. The dough will be smooth but won't pass a traditional windowpane test; einkorn gluten is weaker.",
      },
      {
        heading: "Bulk rise",
        body: "Place dough in a lightly oiled bowl, cover, and ferment at room temperature (22–24°C) until doubled — about 3–4 hours depending on starter activity. Einkorn ferments faster than modern wheat, so check at 2.5 hours. It's ready when it looks puffy and jiggly, and a poke with a floured finger springs back slowly.",
      },
      {
        heading: "Shape",
        body: "Grease your loaf tin generously. Gently press the dough into a rough rectangle on a lightly floured surface. Fold the long sides in to the centre, then roll from one short end into a tight log. Place seam-side down in the tin.",
      },
      {
        heading: "Second rise",
        body: "Cover loosely and proof at room temperature for 45–90 minutes until the dough has crowned about 2cm above the rim of the tin. It should jiggle gently when you tap the tin. Don't let it overproof — einkorn can go from perfect to collapsing quickly.",
      },
      {
        heading: "Bake",
        body: "Preheat oven to 190°C (375°F). Brush the top of the loaf gently with milk and scatter rolled oats evenly over the surface, pressing lightly to adhere. Bake for 35–40 minutes until deep golden brown and the internal temperature reads 96–97°C. Turn out immediately and cool completely on a rack before slicing — the crumb needs time to set.",
      },
    ],
    notes:
      "Raw honey gives better flavor than refined, and its mild antibacterial properties help the crumb stay fresh. Substitute maple syrup for a slightly earthier sweetness. If your starter is not very active, add an extra tablespoon and extend the bulk rise by 30–45 minutes.",
  },
  {
    slug: "dark-rye-and-seed-bread",
    type: "recipe",
    imageKey: "rye-flour",
    title: "Dark Rye & Seed Bread",
    date: "April 8, 2026",
    category: "Bread",
    readTime: "20 hr total · 30 min active",
    yield: "1 small Pullman-style loaf (700g)",
    difficulty: "Beginner",
    excerpt:
      "A dense, moist Scandinavian-style rye loaf packed with sunflower, pumpkin, and sesame seeds. No shaping skill required — it goes straight into the tin and bakes long and slow. Keeps for a week and gets better on day two.",
    ingredients: [
      {
        section: "Soaker (night before)",
        items: [
          "100g whole rye berries (or coarse rye flakes)",
          "50g sunflower seeds",
          "50g pumpkin seeds",
          "25g sesame seeds",
          "200g boiling water",
        ],
      },
      {
        section: "Dough",
        items: [
          "350g stone-milled whole rye flour",
          "150g stone-milled bread flour",
          "350g warm water (40°C)",
          "120g active rye sourdough starter (or whole wheat starter)",
          "30g blackstrap molasses",
          "12g fine sea salt",
          "All of the soaker from above",
        ],
      },
    ],
    steps: [
      {
        heading: "Make the soaker",
        body: "The evening before baking, combine rye berries (or flakes), sunflower seeds, pumpkin seeds, and sesame seeds in a bowl. Pour over 200g boiling water, stir, cover tightly, and leave at room temperature overnight. The seeds will absorb nearly all the water by morning.",
      },
      {
        heading: "Mix the dough",
        body: "In a large bowl, stir together the rye flour, bread flour, warm water, starter, and molasses until a thick, porridge-like batter forms — rye dough is not kneadable in the traditional sense. Add the salt and stir vigorously for 2 minutes. Fold in the entire soaker. The dough will be very dense and sticky.",
      },
      {
        heading: "Pan and proof",
        body: "Grease a small loaf tin thoroughly with butter and dust with rye flour or line with parchment. Scrape the dough in and smooth the top with a wet spatula. It will fill the tin about two-thirds. Cover loosely with oiled plastic wrap or a damp cloth. Proof at room temperature for 4–6 hours until the dough has risen just above the rim and small cracks appear on the surface.",
      },
      {
        heading: "Bake",
        body: "Preheat your oven to 200°C (390°F). Bake for 20 minutes at this temperature, then reduce to 170°C (340°F) and continue baking for 50–60 minutes. The bread is done when the internal temperature reads 98°C and it sounds hollow when tapped from the bottom. Turn out and cool completely on a rack — at least 2 hours. The crumb is still gummy when hot.",
      },
      {
        heading: "Rest before slicing",
        body: "Wrap the cooled loaf in a clean cloth and rest for at least 12 hours before cutting. This resting period allows the moisture to redistribute evenly and the crumb to firm up. Slice thin with a serrated knife. Store wrapped in cloth at room temperature for up to 7 days, or freeze sliced.",
      },
    ],
    notes:
      "Blackstrap molasses adds deep color and a faint bittersweet note that complements the rye. Substitute dark honey or omit entirely for a more neutral flavor. Rye bread is extremely tolerant of overproofing — if it looks a little sunken after baking, it still tastes fine and will improve by the next day.",
  },

  // ─── ARTICLES ───────────────────────────────────────────────
  {
    slug: "why-we-mill-our-own-flour",
    type: "article",
    imageKey: "hero",
    title: "Why We Mill Our Own Flour",
    date: "April 18, 2026",
    category: "Milling",
    readTime: "6 min read",
    excerpt:
      "Fresh-milled flour is alive in a way that bag flour simply isn't. The moment grain hits stone, a clock starts. Here's what changes — and why it matters at your table.",
    sections: [
      {
        paragraphs: [
          "Pick up a bag of supermarket flour and check the best-by date. Most are stamped a year or more out. That longevity is not a sign of quality — it's a sign of what's been removed. Industrial milling strips the germ and most of the bran so that the remaining endosperm can sit on a shelf indefinitely without going rancid. The cost is everything that made the wheat interesting in the first place.",
          "We mill our own flour because freshness isn't a marketing word — it's a measurable, sensory reality. Flour milled from whole berries within days of your bake smells of the field, toasted grain, and something faintly sweet that disappears as oxidation sets in. That aroma is also nutrition: the volatile compounds, oils, and enzymes that oxidize away are the same ones your body uses.",
        ],
      },
      {
        heading: "What Industrial Milling Removes",
        paragraphs: [
          "A wheat berry has three parts: the starchy endosperm (about 83% by weight), the fibrous bran layers (about 14%), and the germ (about 3%). Industrial roller mills are engineered to separate these cleanly and efficiently. The germ — rich in vitamin E, B vitamins, healthy fats, and flavor — is pulled out early because the oils it contains would shorten the flour's shelf life. The bran is sifted away to produce white flour. What remains is nearly pure starch with modest protein.",
          "The result bakes predictably because it has been standardized down to chemistry. But it has lost the complexity that comes from a whole grain. Stone milling, by contrast, crushes the whole berry slowly. The germ oils coat the flour particles. The bran is sifted to your preference, not removed entirely. The heat generated is low enough that volatile aromatics survive intact.",
        ],
        list: [
          "Vitamin E: largely lost in germ extraction",
          "B vitamins (thiamine, riboflavin, niacin, folate): reduced significantly in refining",
          "Dietary fiber: stripped with the bran",
          "Antioxidants: concentrated in the bran and germ",
          "Phytonutrients and flavor compounds: volatile, oxidize within weeks of milling",
        ],
      },
      {
        heading: "The Stone Mill Difference",
        paragraphs: [
          "Stone mills grind grain between two slow-turning granite faces. The friction is gentle and distributed. Flour never gets hot enough to damage the delicate oils in the germ. The whole berry moves through together so that when you open a fresh bag, you smell the wheat — not just a neutral powder.",
          "Speed matters too. Fast roller mills generate heat through friction and shear. Even if a processor keeps germ and bran in the flour, aggressive milling at high speed degrades the aromatic compounds that make fresh flour taste like grain. Our mill is set to turn slowly and cool, prioritizing flavor over throughput.",
          "The practical difference in your kitchen is real. A sourdough made with freshly milled bread flour produces a starter that activates faster (because wild yeast lives on the bran), a dough that develops more complex aromas during fermentation, and a crust with deeper color. It's not subtle once you've baked side-by-side.",
        ],
      },
      {
        heading: "How to Use Fresh-Milled Flour",
        paragraphs: [
          "Fresh flour behaves slightly differently from aged flour. It absorbs water a little more eagerly and ferments more actively. A sourdough that took 8 hours with commercial flour may be ready in 6. Reduce proofing time by 15–20% on your first bake and adjust from there. For pastry and cakes, fresh whole-grain flours benefit from a 20-minute rest after mixing to allow the bran particles to fully hydrate.",
          "Store fresh-milled flour in an airtight container in the freezer if you won't use it within two weeks. The germ oils are what make it nutritious — and what can go rancid at room temperature in warm weather. Cold storage simply slows that clock without damaging anything.",
        ],
      },
    ],
  },
  {
    slug: "glyphosate-in-wheat-what-bakers-should-know",
    type: "article",
    imageKey: "bread-flour",
    title: "Glyphosate in Wheat: What Every Baker Should Know",
    date: "April 10, 2026",
    category: "Standards",
    readTime: "7 min read",
    excerpt:
      "Most people think glyphosate is a weed killer. In conventional wheat farming, it's also used as a harvest aid — sprayed directly on grain before it's harvested. Here's what that means for your flour.",
    sections: [
      {
        paragraphs: [
          "Glyphosate is the active ingredient in Roundup and the most widely used herbicide on earth. If you asked most people why it ends up in bread flour, they'd assume contamination — drift from a neighboring field, maybe, or runoff through irrigation water. The reality is more direct, and more unsettling.",
          "In conventional wheat production, particularly in the northern United States, Canada, and the UK, glyphosate is routinely applied to wheat fields in the week or two before harvest. This is called pre-harvest desiccation. The herbicide kills the plant on a controlled schedule, drying the stalks and grain simultaneously so the crop can be harvested earlier and more uniformly. It is not a weed-control step. It is applied to the crop itself, at its most mature stage, directly before the grain goes to the combine.",
        ],
      },
      {
        heading: "Why Desiccation Creates Higher Residues",
        paragraphs: [
          "When glyphosate is used as a desiccant rather than an early-season herbicide, the residue levels in the harvested grain are substantially higher. Early-season applications have weeks or months for rainfall and plant metabolism to reduce residues. Pre-harvest applications do not. The grain is sprayed, dried, and harvested — often within 7 to 14 days.",
          "Independent testing in the U.S. and Canada has found glyphosate in the majority of conventional flour samples at measurable concentrations. The question of what those concentrations mean for long-term human health is genuinely contested in the scientific literature. What is not contested is that the practice introduces residues that would not otherwise be present, and that organic and non-desiccated grain avoids the problem entirely at the source.",
        ],
      },
      {
        heading: "Our Sourcing Standard",
        paragraphs: [
          "The Milled Table sources grain lots under a no-glyphosate-desiccation standard. We do not make an absolute claim about every molecule in every bag — no one can honestly do that given shared infrastructure, transportation, and storage in the broader grain supply chain. What we commit to is verified sourcing from farms and coops that do not use glyphosate as a pre-harvest desiccant.",
          "The simplest path to that standard is organic certification. Certified organic grain cannot be treated with any synthetic herbicide, including glyphosate, at any growth stage. Most of our lots are certified organic. Where they are not, we source from growers who follow equivalent pre-harvest practices and provide documentation.",
          "We chose careful language deliberately. 'No-glyphosate-desiccation' describes the specific practice we're avoiding and is something we can actually verify through sourcing relationships and certification records. Broader absolute claims like 'zero residues' or 'guaranteed glyphosate-free' cannot be truthfully verified given the realities of modern grain handling.",
        ],
      },
      {
        heading: "What You Can Do",
        paragraphs: [
          "Choose organic-certified flour whenever you can. That certification carries legal weight and is audited. Look for stone-milled whole-grain flour from traceable sources — suppliers who can tell you where the grain was grown and how it was handled.",
          "If you bake regularly, milling from whole berries is the most direct way to control what goes into your bread. Organic whole grain berries are widely available, store for years in cool conditions, and give you complete visibility into the inputs. The flour you mill at home is as clean as the grain you buy.",
        ],
      },
    ],
  },
  {
    slug: "sourdough-starter-from-scratch-with-whole-grain-flour",
    type: "article",
    imageKey: "rye-flour",
    title: "Building a Sourdough Starter with Whole-Grain Flour",
    date: "April 3, 2026",
    category: "Baking",
    readTime: "8 min read",
    excerpt:
      "Wild yeast doesn't live in the air. It lives on the bran of freshly milled grain. A whole-grain starter built on clean organic flour is more active, more complex, and more yours than anything from a packet.",
    sections: [
      {
        paragraphs: [
          "Sourdough starter mythology tends toward the mystical — the old-world baker with a 200-year culture, the traveler who carried their starter across the ocean, the friend who swears theirs came from San Francisco. The biology is more democratic. Wild yeast and lactic acid bacteria are everywhere that grain is. A healthy starter is not a rare artifact. It's what flour and water become when you give them time.",
          "That said, flour quality changes everything. A starter made from fresh-milled organic whole wheat flour will establish itself faster, ferment more actively, and produce more nuanced acid and aroma than one made from bleached all-purpose from a supermarket shelf. The reason is physical: wild yeast colonize the outer layers of grain. Strip those layers away, as industrial milling does, and you remove most of the yeast population. Whole-grain flour, especially fresh-milled, is teeming with microbial life.",
        ],
      },
      {
        heading: "What You Need",
        list: [
          "50g organic whole wheat or rye flour (stone-milled, freshly milled if possible)",
          "50g filtered or room-temperature water (chlorinated tap water slows fermentation)",
          "A clean glass jar with a loose-fitting lid or cloth cover",
          "A kitchen scale — volume measurements are too imprecise for starter management",
          "A warm spot: 24–28°C (75–82°F) is ideal. A turned-off oven with the light on works well.",
        ],
      },
      {
        heading: "Day-by-Day",
        paragraphs: [
          "Day 1: Mix 50g flour and 50g water in your jar. Stir vigorously for 60 seconds to incorporate oxygen. Cover loosely and set in a warm spot. You'll see nothing interesting today.",
          "Day 2: Check for small bubbles near the surface or sides of the jar. They may be faint. This is bacterial activity warming up — not yet yeast-driven. Discard all but 50g of the mixture. Feed with 50g flour and 50g water. Stir well.",
          "Day 3–4: Activity should increase. The mixture may smell unpleasant — acetone, nail polish, or sour garbage are common at this stage as early microbial populations compete. This is normal. Discard and feed at the same time each day: keep 50g, add 50g flour and 50g water.",
          "Day 5–6: The mix should now smell more pleasantly sour — yogurt, green apple, or mildly tangy. Bubble activity should peak a few hours after each feeding and then subside.",
          "Day 7: Your starter is ready when it reliably doubles or triples in volume within 4–6 hours of a feeding, smells yeasty and pleasantly tangy, and passes the float test: a small spoonful dropped in water floats when the starter is at peak activity.",
          "If your starter stalls at day 4 or 5, try switching entirely to rye flour for two feedings. Rye is the most yeast-dense grain available and will jumpstart a sluggish culture reliably.",
        ],
      },
      {
        heading: "Maintaining Your Starter",
        paragraphs: [
          "A starter you bake with weekly lives at room temperature and is fed daily or every other day. One you bake with less often lives in the refrigerator, where it can go 1–2 weeks between feedings. Cold fermentation slows activity but does not kill the culture. Bring it back to room temperature and feed it once before baking.",
          "Use your discard. Every feeding produces starter you're not using for bread. It's not waste — it goes into pancakes, crackers, waffles, pizza dough, and flatbreads. It's slightly less active than peak starter but perfectly good for anything that doesn't rely on strong oven spring.",
          "Whole-grain and fresh-milled flours are best for maintenance. Commercial white flour will keep a starter alive but tends to produce a blander ferment over time. We feed our house starter with a mix of stone-milled whole wheat and a small percentage of rye, changed by season depending on what we're milling.",
        ],
      },
    ],
  },
  {
    slug: "baking-without-preservatives",
    type: "article",
    imageKey: "pastry-flour",
    title: "Baking Without Preservatives: Shelf Life, Storage, and Trust",
    date: "March 27, 2026",
    category: "Ingredients",
    readTime: "5 min read",
    excerpt:
      "Commercial bread lasts weeks on a countertop because it contains ingredients designed to prevent the mold and staling that clean bread cannot. Here's how to bake without them — and how to live with the results.",
    sections: [
      {
        paragraphs: [
          "A loaf of standard supermarket sandwich bread typically contains calcium propionate (E282), sorbic acid (E200), or both. These are antifungal agents approved for food use that extend mold-free shelf life from a few days to several weeks. Some formulations add sodium stearoyl lactylate and monoglycerides — emulsifiers that keep bread soft for longer by slowing retrogradation of the starch.",
          "These additives are legal, widely studied, and for most people present no meaningful health concern at typical consumption levels. But if your goal is to eat bread made from grain, water, salt, and a living starter — and nothing else — they are not necessary. They are a workaround for an industrial supply chain that cannot move food from oven to consumer in a day.",
        ],
      },
      {
        heading: "What Happens Without Preservatives",
        paragraphs: [
          "A clean, preservative-free sourdough loaf — made with organic whole-grain flour, water, salt, and starter — will stay fresh at room temperature for 3 to 4 days. It will stale, but staling is different from spoilage. Stale bread has lost moisture and undergone starch retrogradation. It can be refreshed in a 180°C oven for 8–10 minutes. Mold, which typically requires 5–7 days to appear on clean sourdough (the acidity of lactic acid fermentation has significant natural antifungal properties), means the bread should be discarded.",
          "Sourdough's natural acids — primarily lactic and acetic acid — are themselves mild preservatives. A properly acidified sourdough made with a healthy, active starter will outperform most yeast-leavened preservative-free breads on shelf life simply because the pH is lower. This is not an accident. It's why sourdough was the default leavening method before commercial yeast existed.",
        ],
      },
      {
        heading: "Storage That Works",
        list: [
          "Room temperature, cut side down on a wooden board or in a bread box: 3–4 days for sourdough, 1–2 days for enriched doughs",
          "Paper bag or linen cloth: preserves crust, allows some moisture loss — good for crusty country loaves",
          "Plastic bag or beeswax wrap: slows staling by trapping moisture — better for softer sandwich loaves but softens the crust",
          "Freezer, sliced before freezing: up to 3 months — individual slices can go directly from freezer to toaster",
          "Fresh-milled flour: store in an airtight container in the freezer if you won't use it within 10–14 days at room temperature.",
        ],
      },
      {
        heading: "The Practical Trade",
        paragraphs: [
          "Baking without preservatives means baking on a different schedule than you might be used to. You bake, you eat, you freeze what you won't finish. It means planning ahead rather than reaching for a loaf that has been sitting on the counter for two weeks. Most people who shift to preservative-free baking describe this as a feature rather than a burden — bread becomes an event, not an afterthought.",
          "It also changes what you pay attention to in ingredients. Without the insurance of preservatives, quality matters more at every step: grain that is clean, water that isn't chlorinated, salt that is pure, a starter that is healthy and active. The whole system becomes legible in a way that commercial baking is not.",
        ],
      },
    ],
  },
  {
    slug: "einkorn-the-ancient-grain-that-changes-baking",
    type: "article",
    imageKey: "einkorn-flour",
    title: "Einkorn: The Ancient Grain That Changes Baking",
    date: "March 20, 2026",
    category: "Grains",
    readTime: "6 min read",
    excerpt:
      "Einkorn wheat has been grown for over 10,000 years. It has two sets of chromosomes to modern wheat's six. Its gluten behaves differently, its flavor is richer, and its story is worth knowing.",
    sections: [
      {
        paragraphs: [
          "Modern bread wheat (Triticum aestivum) is a hexaploid — it carries six sets of chromosomes, the result of two natural hybridization events in the distant past that gave it exceptional baking properties and yield. This genetic complexity is part of why modern wheat produces dough that is so extensible, elastic, and reliably trapping. It's also part of why the protein structure of modern wheat is unlike anything humans ate for most of agricultural history.",
          "Einkorn (Triticum monococcum) is a diploid — just two sets of chromosomes, unchanged from the wild grain domesticated in the Fertile Crescent around 8000 BCE. It was the wheat of Neolithic farmers, Roman soldiers, and medieval peasants before higher-yielding varieties displaced it in the 20th century. It nearly disappeared. Today it's grown on small farms in France, Italy, and increasingly by heritage grain producers in North America.",
        ],
      },
      {
        heading: "How Einkorn Is Different",
        paragraphs: [
          "Einkorn gluten is structurally different from modern wheat gluten. It is lower in gliadin-to-glutenin ratio, which means the dough is more extensible but less elastic — it stretches easily but doesn't spring back the same way. For bread bakers accustomed to modern high-gluten flour, einkorn dough feels slack and unfamiliar. It won't hold the same gas bubble structure. But for pastry, pasta, flatbreads, and pancakes, einkorn's tender gluten produces results that are richer and more fragrant than anything modern wheat delivers.",
          "The flavor profile is distinct: nutty, buttery, with a gentle sweetness that doesn't require added sugar to express itself. Einkorn pancakes are golden and rich without any adjustments. Einkorn pasta is more tender than semolina-based versions while still holding its shape.",
        ],
      },
      {
        heading: "Digestibility",
        paragraphs: [
          "There is genuine scientific interest in whether einkorn's different gluten structure makes it more digestible for people with non-celiac gluten sensitivity. The clinical literature is preliminary and not yet conclusive. Einkorn is not safe for people with celiac disease — it contains gluten proteins and will trigger an autoimmune response. But some people who experience discomfort with modern wheat tolerate einkorn well.",
          "What is not in dispute: einkorn is higher in protein than most modern wheat varieties (around 17–18% vs 10–12% for typical bread flour), higher in lutein, and significantly higher in total antioxidant activity. Whether you're baking for flavor or for nutrition, these differences are real.",
        ],
      },
      {
        heading: "Baking with Einkorn",
        paragraphs: [
          "Start by replacing 20–30% of your regular flour with einkorn in existing recipes. This is the easiest entry point — you'll notice a flavor improvement without needing to rethink your technique. The dough will be slightly more extensible; reduce your water by 5% and handle the dough more gently.",
          "For 100% einkorn baking, use cold fermentation. Mix the dough, let it bulk ferment at room temperature for 3 hours, then refrigerate overnight. The cold slows fermentation while allowing full hydration of the bran particles, producing a more cohesive dough than you'd get with a short room-temperature rise. Bake in a Dutch oven for best oven spring.",
        ],
      },
    ],
  },
  {
    slug: "seasonal-organic-cooking-eating-by-the-harvest",
    type: "article",
    imageKey: "pasta-blend",
    title: "Seasonal Organic Cooking: Eating by the Harvest",
    date: "March 14, 2026",
    category: "Cooking",
    readTime: "5 min read",
    excerpt:
      "Organic cooking is at its most honest when it follows the calendar. Here's how seasonal grain cookery connects your kitchen directly to the source of what you're eating.",
    sections: [
      {
        paragraphs: [
          "Organic certification answers the question of what chemicals were and weren't used. It doesn't answer the question of freshness, which is why certification alone isn't the whole story. Grain harvested last autumn and stone milled this week is categorically different from grain from two seasons ago that's been sitting in a commodity silo. The fresh lot tastes like grain. The old one tastes like flour.",
          "We buy in lots and keep them transparent for this reason. When you order from us, you're ordering flour from a specific harvest, from a specific farm or co-op, milled in a specific run. The date matters. The place matters. That traceability is the difference between buying organic as a label and buying organic as a practice.",
        ],
      },
      {
        heading: "Matching Grain to Season",
        paragraphs: [
          "Spring and summer are the right time for lighter flours: einkorn for pancakes and pasta, soft white wheat for pastry, semolina for cold pasta salads and grain bowls. The warmer months suit open crumb sourdoughs and flatbreads that move quickly from pan to plate.",
          "Autumn and winter want rye. Dark and malty, rye flour comes alive in the cold months — slow sourdoughs with long cold ferments, dense seeded loaves that pair with aged cheese and smoked fish, honey-sweetened pumpernickel that stores for weeks and gets better with age.",
          "Winter is also the time for porridge: whole cracked wheat berries simmered with oats, dried fruit, and a handful of salt. The best porridge grain is coarse-cracked hard wheat or rye — stone-cracked, not flaked, so it retains the germ and has chew. Simmer for 30 minutes, low and slow, and serve with honey and cream.",
        ],
      },
      {
        heading: "Cooking Without Shortcuts",
        paragraphs: [
          "Preservative-free cooking means accepting that food is perishable. That's not a limitation — it's the correct relationship with food. A loaf baked on Sunday is at its best on Monday. By Thursday it's toast. By the following Sunday it's breadcrumbs for the freezer. Everything has a best moment, and paying attention to it is the practice of cooking.",
          "The same principle applies to oils, dairy, and produce. Organic unrefined oils go rancid faster than refined ones. Fresh-ground nut flours turn within a week at room temperature. Unpasteurized cheeses are alive and changing daily. None of this is a flaw. It's the flavor.",
          "At the Milled Table, we believe the kitchen is most honest when it stays close to whole ingredients, clean sourcing, and the rhythms of what's actually in season. That's what milling your own flour is about. It's not nostalgia. It's choosing to work with food that has a story worth knowing.",
        ],
      },
    ],
  },
];
