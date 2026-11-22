/**
 * GLASYAN Swappable Assets Configuration
 * Single source of truth for all brand and store assets.
 * When real bottle shots and official logos are ready,
 * replace the references here without touching section animation code.
 */

export interface ProductItem {
  id: string;
  handle: string;
  name: string;
  tagline: string;
  category: "Shampoo" | "Conditioner" | "Serum" | "Styling" | "Cosmetics" | "Treatment" | "Gift sets";
  price: number;
  rating: number;
  reviewsCount: number;
  volume: string;
  description: string;
  benefits: string[];
  ritual: string;
  fullIngredients: string[];
  keyIngredientKey: string;
  image: {
    type: "placeholder" | "image";
    src?: string;
    alt: string;
  };
}

export interface CollectionItem {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  description: string;
  productCount: number;
  highlightColor: string;
}

export interface IngredientItem {
  id: string;
  name: string;
  scientificName: string;
  origin: string;
  description: string;
  keyBenefit: string;
  image: string;
  archShape: "circle" | "arch" | "rounded-tall" | "squircle" | "pill";
  parallaxSpeed: number;
}

export const assets = {
  logo: {
    svg: "/brand/logo-placeholder.svg",
    alt: "Glasyan — Pure Alpine Hair Essence",
  },
  heroProduct: {
    type: "3d" as "3d" | "placeholder" | "image" | "sequence" | "video",
    src: undefined,
    alt: "Glasyan Grand Glacial Elixir 3D Vessel",
  },
  collections: [
    {
      id: "c1",
      handle: "shampoo",
      title: "Glacial Clarifying Shampoos",
      subtitle: "Pure Alpine Runoff",
      description: "Infused with pristine alpine runoff and cold-pressed bio-surfactants to gently purify hair fibers without stripping vital moisture.",
      productCount: 2,
      highlightColor: "#008C95",
    },
    {
      id: "c2",
      handle: "conditioner",
      title: "Marine Silk Conditioners",
      subtitle: "Biomimetic Keratin Seal",
      description: "Formulated with hydrolyzed sea kelp and conchiolin pearl peptides to instantly seal cuticle scales for mirror-finish reflection.",
      productCount: 2,
      highlightColor: "#7FC4C9",
    },
    {
      id: "c3",
      handle: "serum",
      title: "Active Scalp & Root Serums",
      subtitle: "Microcirculation & Density",
      description: "Supercharged botanical infusions designed to invigorate the follicular root microbiome and promote resilient density.",
      productCount: 2,
      highlightColor: "#005A61",
    },
    {
      id: "c4",
      handle: "cosmetics",
      title: "Lustre & Thermal Cosmetics",
      subtitle: "Organic Botanical Glosses",
      description: "Weightless multi-correctional elixirs and protective finishing oils offering 450°F thermal resistance and celestial shine.",
      productCount: 2,
      highlightColor: "#C8B58F",
    },
    {
      id: "c5",
      handle: "gift-sets",
      title: "The Grand Discovery Rituals",
      subtitle: "Complete 4-Stage Ceremonies",
      description: "Curated collectors' sets encased in tactile frosted packaging, providing the complete restorative Glasyan ritual.",
      productCount: 1,
      highlightColor: "#0A2E32",
    },
  ] as CollectionItem[],

  products: [
    {
      id: "prod-1",
      handle: "glacier-hydration-shampoo",
      name: "Glacier Hydration Shampoo",
      tagline: "Cellular hydration for moisture-deprived strands",
      category: "Shampoo",
      price: 48,
      rating: 4.9,
      reviewsCount: 142,
      volume: "250 ml / 8.4 fl oz",
      description: "An ultra-refined, micro-foaming shampoo powered by pristine Swiss glacier runoff. Gently cleanses the scalp matrix while infusing hair shafts with bio-available trace minerals.",
      benefits: [
        "Weightless moisture retention without silicones",
        "Restores scalp acid-mantle to optimal pH 5.2",
        "Thermal and hard-water mineral protection",
      ],
      ritual: "Massage into damp scalp until a creamy, low-density foam arises. Inhale the wild alpine mint and cedar accords. Rinse thoroughly with cool water.",
      fullIngredients: ["Glacial Water", "Sodium Cocoyl Isethionate", "Hydrolyzed Pearl", "Aloe Barbadensis Leaf Juice", "Organic Peppermint Hydrosol", "Vegetable Glycerin"],
      keyIngredientKey: "glacier-water",
      image: { type: "placeholder", alt: "Glasyan Glacier Hydration Shampoo" },
    },
    {
      id: "prod-2",
      handle: "marine-silk-conditioner",
      name: "Marine Silk Conditioner",
      tagline: "Biomimetic cuticle smoothing with pearl amino acids",
      category: "Conditioner",
      price: 52,
      rating: 4.8,
      reviewsCount: 98,
      volume: "250 ml / 8.4 fl oz",
      description: "A velvety conditioning cream that reconstructs split protein chains. Infused with ocean conchiolin to deliver high-slip detangling and liquid-silk drape.",
      benefits: [
        "Seals cuticle scales for mirror-like light reflectivity",
        "Reduces mechanical breakage by up to 88%",
        "Eliminates humidity-induced static and frizz",
      ],
      ritual: "Work through mid-lengths to ends using a wide-tooth comb. Allow the marine nutrients to absorb for three contemplative minutes before rinsing.",
      fullIngredients: ["Glacial Water", "Cetearyl Alcohol", "Hydrolyzed Conchiolin Protein", "Behentrimonium Chloride", "Atlantic Sea Kelp Extract", "Argania Spinosa Kernel Oil"],
      keyIngredientKey: "pearl",
      image: { type: "placeholder", alt: "Glasyan Marine Silk Conditioner" },
    },
    {
      id: "prod-3",
      handle: "pearl-peptide-scalp-serum",
      name: "Pearl Peptide Scalp Serum",
      tagline: "Cellular root revitalizer for lush fullness",
      category: "Serum",
      price: 74,
      rating: 5.0,
      reviewsCount: 215,
      volume: "60 ml / 2.0 fl oz",
      description: "An intensive restorative leave-in treatment featuring concentrated bio-peptides and micronized pearl minerals. Targets follicular dormancy for visibly thicker density.",
      benefits: [
        "Stimulates root anchor points and dermal papilla vitality",
        "Calms irritation, flakiness, and oxidative stress",
        "Non-greasy, fast-absorbing micro-emulsion",
      ],
      ritual: "Section dry or towel-damp hair. Dispense one full pipette across the crown and temples. Perform gentle circular acupressure for 60 seconds.",
      fullIngredients: ["Organic Rose Damascena Flower Water", "Glacial Mineral Filtrate", "Copper Tripeptide-1", "Hydrolyzed Pearl Protein", "Niacinamide", "Caffeine"],
      keyIngredientKey: "pearl",
      image: { type: "placeholder", alt: "Glasyan Pearl Peptide Scalp Serum" },
    },
    {
      id: "prod-4",
      handle: "ocean-mist-mineral-spray",
      name: "Ocean Mist Mineral Texture Spray",
      tagline: "Weightless sea-salt lift with mineral hydration",
      category: "Styling",
      price: 38,
      rating: 4.7,
      reviewsCount: 86,
      volume: "150 ml / 5.1 fl oz",
      description: "Crafted with Atlantic sea kelp and solar-evaporated mineral salts. Delivers effortless, undone coastal texture without crunch or dryness.",
      benefits: [
        "Adds touchable volume, matte separation, and grip",
        "Infused with botanical humectants to prevent dehydration",
        "Protects against solar UV degradation",
      ],
      ritual: "Mist evenly across towel-dried hair from roots to ends. Scrunch with hands and air dry, or diffuse for heightened wave formation.",
      fullIngredients: ["Aqua (Alpine Glacial)", "Sea Salt Extract", "Laminaria Digitata (Kelp) Extract", "Panthenol (Pro-Vitamin B5)", "Magnesium Sulfate", "Rosa Damascena Extract"],
      keyIngredientKey: "sea-kelp",
      image: { type: "placeholder", alt: "Glasyan Ocean Mist Mineral Spray" },
    },
    {
      id: "prod-5",
      handle: "rose-hydrosol-glossing-elixir",
      name: "Rose Hydrosol Glossing Elixir",
      tagline: "Lustrous mirror shine & delicate botanical aroma",
      category: "Cosmetics",
      price: 64,
      rating: 4.9,
      reviewsCount: 178,
      volume: "100 ml / 3.4 fl oz",
      description: "Steam-distilled Bulgarian rose petals suspended in a bio-fermented lipid matrix. Instantly eliminates flyaways while enveloping the hair in subtle, intoxicating floral notes.",
      benefits: [
        "Reflects natural and ambient light with diamond brilliance",
        "Balances scalp and strand micro-flora pH",
        "Protects hair cuticles from pollution particles",
      ],
      ritual: "Warm two drops between palms. Smooth lightly over dry, finished styles, focusing on surface halos and delicate ends.",
      fullIngredients: ["Rosa Damascena Flower Hydrosol", "Isoamyl Laurate", "Argania Spinosa Kernel Oil", "Tocopherol (Vitamin E)", "Fragrance (100% Natural Essential Oils)"],
      keyIngredientKey: "rose",
      image: { type: "placeholder", alt: "Glasyan Rose Hydrosol Glossing Elixir" },
    },
    {
      id: "prod-6",
      handle: "kelp-restorative-hair-masque",
      name: "Kelp Infused Restorative Masque",
      tagline: "Intensive biomimetic lipid repair for damaged hair",
      category: "Treatment",
      price: 68,
      rating: 4.9,
      reviewsCount: 312,
      volume: "200 ml / 6.7 fl oz",
      description: "A decadent, nutrient-dense treatment butter loaded with Atlantic kelp mucilage and golden argan lipids. Resuscitates chemically processed or heat-compromised tresses.",
      benefits: [
        "Restores structural tensile strength and elasticity",
        "Penetrates cortex to replenish depleted lipid reserves",
        "Noticeably softer and smoother from first application",
      ],
      ritual: "After shampooing, apply generously from roots to tips. Encase in a warm towel for 10 minutes to activate thermo-lipids. Rinse cold.",
      fullIngredients: ["Alpine Glacial Water", "Laminaria Saccharina Extract", "Argania Spinosa Kernel Oil", "Shea Butter Ethyl Esters", "Hydrolyzed Wheat Protein", "Ceramide NP"],
      keyIngredientKey: "sea-kelp",
      image: { type: "placeholder", alt: "Glasyan Kelp Restorative Masque" },
    },
    {
      id: "prod-7",
      handle: "argan-radiance-finishing-oil",
      name: "Argan Radiance Finishing Oil",
      tagline: "Velvet thermal protection and split-end repair",
      category: "Cosmetics",
      price: 58,
      rating: 4.8,
      reviewsCount: 114,
      volume: "50 ml / 1.7 fl oz",
      description: "First cold-pressed Moroccan argan oil enriched with micronized quartz crystals and squalane. Shields up to 450°F heat while nourishing brittle tips.",
      benefits: [
        "Superior heat shielding for blowouts and flat irons",
        "Seals split ends seamlessly with zero greasiness",
        "Deep antioxidant defense against environmental fading",
      ],
      ritual: "Apply 1-2 pumps onto damp lengths prior to blow-drying, or smooth onto dry ends anytime for an instant gloss infusion.",
      fullIngredients: ["Organic Argania Spinosa Kernel Oil", "Plant-Derived Squalane", "Simmondsia Chinensis (Jojoba) Seed Oil", "Bisabolol", "Helianthus Annuus Seed Oil"],
      keyIngredientKey: "argan-oil",
      image: { type: "placeholder", alt: "Glasyan Argan Radiance Finishing Oil" },
    },
    {
      id: "prod-8",
      handle: "grand-discovery-ritual-set",
      name: "Glasyan Discovery Grand Ritual Set",
      tagline: "The complete 4-step restorative hair alchemy",
      category: "Gift sets",
      price: 195,
      rating: 5.0,
      reviewsCount: 420,
      volume: "Full Regimen Box",
      description: "The quintessential Glasyan initiation. Encased in a custom frosted keepsake box, this ritual includes the Glacier Shampoo, Marine Conditioner, Pearl Serum, and Finishing Oil.",
      benefits: [
        "Comprehensive 360-degree hair transformation protocol",
        "Includes limited-edition Glasyan handmade acetate wide-comb",
        "Presented in bespoke FSC-certified luxury packaging",
      ],
      ritual: "Embark on the ritual weekly: Cleanse with Glacial Shampoo, condition with Marine Silk, fortify roots with Pearl Serum, and seal with Argan Radiance.",
      fullIngredients: ["Curated selection of all Glasyan hero formulas in generous full-sized editions."],
      keyIngredientKey: "glacier-water",
      image: { type: "placeholder", alt: "Glasyan Discovery Grand Ritual Set" },
    },
  ] as ProductItem[],

  ingredients: [
    {
      id: "glacier-water",
      name: "Alpine Glacier Water",
      scientificName: "Aqua Glacialis Purissima",
      origin: "Valais Alps, 3,200m Elevation",
      description: "Naturally filtered through millennia of quartz and granite strata. Pristine low-deuterium molecular geometry delivers uncompromised hydration at the cellular cortex level.",
      keyBenefit: "Deep Intracellular Hydration & Low Surface Tension",
      image: "/ingredients/glacier-water.jpg",
      archShape: "arch",
      parallaxSpeed: 0.9,
    },
    {
      id: "pearl",
      name: "Hydrolyzed Pearl Protein",
      scientificName: "Conchiolin Peptidis",
      origin: "South Sea Archipelago",
      description: "Conchiolin, the rare fibrous protein that forms mother-of-pearl, contains 17 bio-identical amino acids that integrate directly into the hair's damaged keratin framework.",
      keyBenefit: "Keratin Fiber Reconstruction & Prismatic Iridescence",
      image: "/ingredients/pearl-protein.jpg",
      archShape: "circle",
      parallaxSpeed: 1.25,
    },
    {
      id: "sea-kelp",
      name: "North Atlantic Sea Kelp",
      scientificName: "Laminaria Saccharina",
      origin: "Sub-Arctic Coastal Seabeds",
      description: "Sustainably harvested from icy polar currents. Packed with fucoidan and alginic polysaccharides that form a breathable moisture matrix around each delicate cuticle.",
      keyBenefit: "Elastic Tensile Strength & Environmental Defense",
      image: "/ingredients/sea-kelp.jpg",
      archShape: "rounded-tall",
      parallaxSpeed: 0.85,
    },
    {
      id: "rose",
      name: "Damask Rose Hydrosol",
      scientificName: "Rosa Damascena Flos",
      origin: "Valley of Roses, Bulgaria",
      description: "Pure steam distillation capture of organic morning blossoms. Calms follicular micro-inflammation, resets scalp pH, and imparts a whisper of timeless luxury.",
      keyBenefit: "Scalp Microbiome Balancing & Anti-Inflammatory Soothing",
      image: "/ingredients/rose-hydrosol.jpg",
      archShape: "arch",
      parallaxSpeed: 1.15,
    },
    {
      id: "argan-oil",
      name: "Cold-Pressed Argan Oil",
      scientificName: "Argania Spinosa Spinosa",
      origin: "Sous Valley Biosphere, Morocco",
      description: "Hand-harvested and cold-pressed within hours of harvest to preserve delicate tocopherols, squalene, and omega fatty acids that seal moisture without weight.",
      keyBenefit: "Lipid Shielding, 450°F Heat Defense & Velvet Texture",
      image: "/ingredients/argan-oil.jpg",
      archShape: "circle",
      parallaxSpeed: 1.35,
    },
  ] as IngredientItem[],
};
