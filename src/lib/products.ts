export const WHATSAPP_NUMBER = "918847381404";

export function buildWhatsAppOrderLink(product: any) {
  const msg = `Hello, I would like to order:%0A%0AProduct: ${product.name}%0AProduct Code: ${product.sku}%0APrice: ₹${product.price}%0A%0APlease share availability and further details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}

export function buildWhatsAppChatLink() {
  const msg = "Hello! I'd like to know more about your products.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const img = (seed: string) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=800&q=80`;

export const PRODUCTS = [
  {
    id: 1, sku: "EW-RB-001", name: "Wayfarer Classic", brand: "Ray-Ban", price: 4999, mrp: 6500,
    rating: 4.6, reviews: 128, category: "Eyeglasses", gender: "Unisex",
    frameShape: "Rectangle", frameMaterial: "Acetate", color: "Black",
    colors: ["#111111", "#7a4a2a", "#1e3a5f"], inStock: true,
    image: img("photo-1572635196237-14b3f281503f"),
    gallery: [img("photo-1572635196237-14b3f281503f"), img("photo-1577803645773-f96470509666"), img("photo-1511499767150-a48a237f0083")],
    description: "Iconic full-rim acetate frames with premium polarized lenses.",
    specs: { Dimensions: "52-18-145", Weight: "28g", Warranty: "1 Year" },
    lens: "Polarized UV400, Anti-glare coating",
  },
  {
    id: 2, sku: "EW-OK-014", name: "Holbrook Sport", brand: "Oakley", price: 7499, mrp: 8999,
    rating: 4.8, reviews: 96, category: "Sunglasses", gender: "Men",
    frameShape: "Square", frameMaterial: "Metal", color: "Gunmetal",
    colors: ["#3b3b3b", "#0c2340"], inStock: true,
    image: img("photo-1511499767150-a48a237f0083"),
    gallery: [img("photo-1511499767150-a48a237f0083"), img("photo-1473496169904-658ba7c44d8a")],
    description: "Lightweight sport sunglasses with impact-resistant Prizm lenses.",
    specs: { Dimensions: "55-18-140", Weight: "24g", Warranty: "2 Years" },
    lens: "Prizm Polarized, 100% UVA/UVB",
  },
  {
    id: 3, sku: "EW-VG-007", name: "Cat-Eye Charm", brand: "Vogue", price: 3299, mrp: 4500,
    rating: 4.4, reviews: 73, category: "Eyeglasses", gender: "Women",
    frameShape: "Cat-Eye", frameMaterial: "Acetate", color: "Tortoise",
    colors: ["#7a4a2a", "#c9a84c", "#e0a8c0"], inStock: true,
    image: img("photo-1574258495973-f010dfbb5371"),
    gallery: [img("photo-1574258495973-f010dfbb5371"), img("photo-1583394838336-acd977736f90")],
    description: "Feminine cat-eye silhouette with hand-polished acetate.",
    specs: { Dimensions: "53-17-140", Weight: "22g", Warranty: "1 Year" },
    lens: "Blue-light filter, Anti-reflective",
  },
  {
    id: 4, sku: "EW-TT-022", name: "Titan Aviator Pro", brand: "Titan", price: 2799, mrp: 3500,
    rating: 4.3, reviews: 211, category: "Sunglasses", gender: "Men",
    frameShape: "Aviator", frameMaterial: "Metal", color: "Gold",
    colors: ["#c9a84c", "#3b3b3b"], inStock: true,
    image: img("photo-1556306535-0f09a537f0a3"),
    gallery: [img("photo-1556306535-0f09a537f0a3"), img("photo-1577803645773-f96470509666")],
    description: "Timeless aviator with gradient glass lenses.",
    specs: { Dimensions: "58-14-140", Weight: "30g", Warranty: "1 Year" },
    lens: "Gradient UV400 protection",
  },
  {
    id: 5, sku: "EW-FB-031", name: "Round Retro", brand: "Fastrack", price: 1899, mrp: 2499,
    rating: 4.1, reviews: 154, category: "Eyeglasses", gender: "Unisex",
    frameShape: "Round", frameMaterial: "Metal", color: "Silver",
    colors: ["#b5b5b5", "#111111"], inStock: true,
    image: img("photo-1591076482161-42ce6da69f67"),
    gallery: [img("photo-1591076482161-42ce6da69f67")],
    description: "Minimal round metal frames with adjustable nose pads.",
    specs: { Dimensions: "50-20-145", Weight: "18g", Warranty: "6 Months" },
    lens: "Anti-glare, UV protection",
  },
  {
    id: 6, sku: "EW-CL-002", name: "Daily Soft Contacts", brand: "Acuvue", price: 999, mrp: 1299,
    rating: 4.7, reviews: 340, category: "Contact Lenses", gender: "Unisex",
    frameShape: "—", frameMaterial: "Hydrogel", color: "Clear",
    colors: ["#f5f5f5"], inStock: true,
    image: img("photo-1609902726285-00668009f004"),
    gallery: [img("photo-1609902726285-00668009f004")],
    description: "Daily-use soft contact lenses with 14-hour comfort.",
    specs: { Pack: "30 lenses", Type: "Daily disposable", Warranty: "—" },
    lens: "Hydrogel, 58% water content",
  },
  {
    id: 7, sku: "EW-KD-009", name: "Kids Flex Frame", brand: "IGreen", price: 2199, mrp: 2799,
    rating: 4.5, reviews: 64, category: "Kids", gender: "Kids",
    frameShape: "Rectangle", frameMaterial: "TR-90", color: "Blue",
    colors: ["#1e3a5f", "#e85d3a"], inStock: false,
    image: img("photo-1614715838608-dd527c4e1233"),
    gallery: [img("photo-1614715838608-dd527c4e1233")],
    description: "Flexible, near-unbreakable frames designed for kids.",
    specs: { Dimensions: "45-15-125", Weight: "14g", Warranty: "1 Year" },
    lens: "Blue-light filter, Impact-resistant",
  },
  {
    id: 8, sku: "EW-RB-045", name: "Clubmaster Edge", brand: "Ray-Ban", price: 5899, mrp: 7200,
    rating: 4.7, reviews: 88, category: "Sunglasses", gender: "Unisex",
    frameShape: "Browline", frameMaterial: "Acetate", color: "Brown",
    colors: ["#7a4a2a", "#111111"], inStock: true,
    image: img("photo-1577803645773-f96470509666"),
    gallery: [img("photo-1577803645773-f96470509666"), img("photo-1572635196237-14b3f281503f")],
    description: "Bold browline silhouette with metal accents.",
    specs: { Dimensions: "51-21-145", Weight: "26g", Warranty: "1 Year" },
    lens: "Polarized, UV400",
  },
];

export const FILTERS = {
  Category: ["Eyeglasses", "Sunglasses", "Contact Lenses", "Kids"],
  Brand: ["Ray-Ban", "Oakley", "Vogue", "Titan", "Fastrack", "Acuvue", "IGreen"],
  Gender: ["Men", "Women", "Unisex", "Kids"],
  "Frame Shape": ["Rectangle", "Square", "Round", "Aviator", "Cat-Eye", "Browline"],
  "Frame Material": ["Acetate", "Metal", "TR-90", "Hydrogel"],
};
