export type Category = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  category: string;
  badge: string;
  sold: number;
  stock: number;
  price: number;
  description: string;
  image: string;
};

export const categories: Category[] = [
  { id: 1, name: "Semua Produk", slug: "all", count: 8 },
  { id: 2, name: "Perkopian", slug: "perkopian", count: 3 },
  { id: 3, name: "AI Tools", slug: "ai-tools", count: 2 },
  { id: 4, name: "Voucher", slug: "voucher", count: 1 },
  { id: 5, name: "Akun Premium", slug: "akun-premium", count: 2 },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Akun Kopi Kenangan",
    slug: "akun-kopi-kenangan",
    category: "perkopian",
    badge: "Terlaris",
    sold: 26017,
    stock: 183,
    price: 1500,
    description: "Akun digital siap pakai untuk kebutuhan promo dan akses tertentu.",
    image: "/products/kopi-kenangan.png",
  },
  {
    id: 2,
    name: "Akun Fore Coffee",
    slug: "akun-fore-coffee",
    category: "perkopian",
    badge: "Terlaris",
    sold: 3696,
    stock: 105,
    price: 1500,
    description: "Akun siap pakai dengan proses cepat dan detail dikirim otomatis.",
    image: "/products/fore.png",
  },
  {
    id: 3,
    name: "AI Redeem Link 3 Bulan",
    slug: "ai-redeem-link-3-bulan",
    category: "ai-tools",
    badge: "Voucher",
    sold: 134,
    stock: 1804,
    price: 10000,
    description: "Link redeem untuk aktivasi layanan AI tertentu selama 3 bulan.",
    image: "/products/ai-redeem.png",
  },
  {
    id: 4,
    name: "Premium Invite 25 Hari",
    slug: "premium-invite-25-hari",
    category: "ai-tools",
    badge: "AI",
    sold: 121,
    stock: 1,
    price: 10000,
    description: "Invite akses premium dengan masa aktif terbatas.",
    image: "/products/invite.png",
  },
  {
    id: 5,
    name: "Spotify Premium 3 Bulan",
    slug: "spotify-premium-3-bulan",
    category: "voucher",
    badge: "Voucher",
    sold: 75,
    stock: 111,
    price: 1000,
    description: "Voucher digital siap kirim untuk aktivasi layanan premium.",
    image: "/products/spotify.png",
  },
  {
    id: 6,
    name: "CapCut Pro 7 Hari",
    slug: "capcut-pro-7-hari",
    category: "akun-premium",
    badge: "Populer",
    sold: 17,
    stock: 0,
    price: 1000,
    description: "Akses akun premium dengan durasi 7 hari.",
    image: "/products/capcut.png",
  },
  {
    id: 7,
    name: "Canva Pro Head",
    slug: "canva-pro-head",
    category: "akun-premium",
    badge: "Account",
    sold: 5,
    stock: 0,
    price: 5000,
    description: "Akses akun Canva premium untuk kebutuhan desain.",
    image: "/products/canva.png",
  },
  {
    id: 8,
    name: "Tomoro Coffee Account",
    slug: "tomoro-coffee-account",
    category: "perkopian",
    badge: "Terlaris",
    sold: 237,
    stock: 0,
    price: 1500,
    description: "Akun promo kopi dengan stok terbatas.",
    image: "/products/tomoro.png",
  },
];

export const totalSold = products.reduce((sum, item) => sum + item.sold, 0);