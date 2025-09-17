export interface NavigationItem {
  name: string;
  href: string;
  subcategories?: NavigationItem[];
}

export const navigationMenuItems: NavigationItem[] = [
  {
    name: "Living Room",
    href: "/category/living-room",
    subcategories: [
      { name: "Sofas", href: "/category/living-room/sofas" },
      { name: "Coffee Tables", href: "/category/living-room/coffee-tables" },
      { name: "TV Stands", href: "/category/living-room/tv-stands" },
      { name: "Armchairs", href: "/category/living-room/armchairs" },
      { name: "Bookshelves", href: "/category/living-room/bookshelves" },
      { name: "Side Tables", href: "/category/living-room/side-tables" },
      { name: "Ottomans", href: "/category/living-room/ottomans" },
      { name: "Room Dividers", href: "/category/living-room/room-dividers" },
    ]
  },
  {
    name: "Bedroom",
    href: "/category/bedroom",
    subcategories: [
      { name: "Beds", href: "/category/bedroom/beds" },
      { name: "Mattresses", href: "/category/bedroom/mattresses" },
      { name: "Wardrobes", href: "/category/bedroom/wardrobes" },
      { name: "Dressers", href: "/category/bedroom/dressers" },
      { name: "Nightstands", href: "/category/bedroom/nightstands" },
      { name: "Bed Frames", href: "/category/bedroom/bed-frames" },
      { name: "Vanity Tables", href: "/category/bedroom/vanity-tables" },
      { name: "Bedroom Sets", href: "/category/bedroom/bedroom-sets" },
    ]
  },
  {
    name: "Kitchen",
    href: "/category/kitchen",
    subcategories: [
      { name: "Dining Tables", href: "/category/kitchen/dining-tables" },
      { name: "Dining Chairs", href: "/category/kitchen/dining-chairs" },
      { name: "Kitchen Islands", href: "/category/kitchen/kitchen-islands" },
      { name: "Bar Stools", href: "/category/kitchen/bar-stools" },
      { name: "Kitchen Cabinets", href: "/category/kitchen/kitchen-cabinets" },
      { name: "Pantry Storage", href: "/category/kitchen/pantry-storage" },
      { name: "Kitchen Carts", href: "/category/kitchen/kitchen-carts" },
      { name: "Dining Sets", href: "/category/kitchen/dining-sets" },
    ]
  },
  {
    name: "Storage",
    href: "/category/storage",
    subcategories: [
      { name: "Shelving Units", href: "/category/storage/shelving-units" },
      { name: "Storage Boxes", href: "/category/storage/storage-boxes" },
      { name: "Cabinets", href: "/category/storage/cabinets" },
      { name: "Closet Systems", href: "/category/storage/closet-systems" },
      { name: "Toy Storage", href: "/category/storage/toy-storage" },
      { name: "Shoe Storage", href: "/category/storage/shoe-storage" },
      { name: "Garage Storage", href: "/category/storage/garage-storage" },
      { name: "Laundry Storage", href: "/category/storage/laundry-storage" },
    ]
  },
  {
    name: "Office",
    href: "/category/office",
    subcategories: [
      { name: "Desks", href: "/category/office/desks" },
      { name: "Office Chairs", href: "/category/office/office-chairs" },
      { name: "Filing Cabinets", href: "/category/office/filing-cabinets" },
      { name: "Bookcases", href: "/category/office/bookcases" },
      { name: "Desk Accessories", href: "/category/office/desk-accessories" },
      { name: "Standing Desks", href: "/category/office/standing-desks" },
      { name: "Office Storage", href: "/category/office/office-storage" },
      { name: "Conference Tables", href: "/category/office/conference-tables" },
    ]
  },
  {
    name: "Bathroom",
    href: "/category/bathroom",
    subcategories: [
      { name: "Vanities", href: "/category/bathroom/vanities" },
      { name: "Medicine Cabinets", href: "/category/bathroom/medicine-cabinets" },
      { name: "Bathroom Storage", href: "/category/bathroom/bathroom-storage" },
      { name: "Shower Caddies", href: "/category/bathroom/shower-caddies" },
      { name: "Towel Racks", href: "/category/bathroom/towel-racks" },
      { name: "Bathroom Stools", href: "/category/bathroom/bathroom-stools" },
      { name: "Linen Cabinets", href: "/category/bathroom/linen-cabinets" },
      { name: "Over-Toilet Storage", href: "/category/bathroom/over-toilet-storage" },
    ]
  },
  {
    name: "Kids",
    href: "/category/kids",
    subcategories: [
      { name: "Kids Beds", href: "/category/kids/kids-beds" },
      { name: "Bunk Beds", href: "/category/kids/bunk-beds" },
      { name: "Kids Desks", href: "/category/kids/kids-desks" },
      { name: "Toy Chests", href: "/category/kids/toy-chests" },
      { name: "Kids Chairs", href: "/category/kids/kids-chairs" },
      { name: "Play Tables", href: "/category/kids/play-tables" },
      { name: "Nursery Furniture", href: "/category/kids/nursery-furniture" },
      { name: "Teen Furniture", href: "/category/kids/teen-furniture" },
    ]
  },
  {
    name: "Outdoor",
    href: "/category/outdoor",
    subcategories: [
      { name: "Patio Sets", href: "/category/outdoor/patio-sets" },
      { name: "Outdoor Chairs", href: "/category/outdoor/outdoor-chairs" },
      { name: "Garden Benches", href: "/category/outdoor/garden-benches" },
      { name: "Outdoor Tables", href: "/category/outdoor/outdoor-tables" },
      { name: "Fire Pits", href: "/category/outdoor/fire-pits" },
      { name: "Gazebos", href: "/category/outdoor/gazebos" },
      { name: "Outdoor Storage", href: "/category/outdoor/outdoor-storage" },
      { name: "Hammocks", href: "/category/outdoor/hammocks" },
    ]
  }
];