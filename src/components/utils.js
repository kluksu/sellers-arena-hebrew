import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import emailjs from "emailjs-com";
import { el } from "date-fns/locale";
import { element } from "prop-types";

// Example POST method implementation:
//https://supplierzz.herokuapp.com
export let domain = "https://supplierzz.westeurope.cloudapp.azure.com";
// export let domain = "https://supplierzz.herokuapp.com";
export async function postData(URL = "", data = {}, token) {
  // Default options are marked with *
  const response = await fetch(URL, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: "Bearer" + `${token}`,

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
} ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Example POST method implementation:
export async function getData(URL = "", data = {}, token) {
  // Default options are marked with *
  const response = await fetch(URL, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: "Bearer" + `${token}`,

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
export function isInViewport(elementid) {
  let element = document.getElementById(elementid);
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
export const isOverflown = (elementID, XYBoth) => {
  let element = document.getElementById(elementID);

  if (XYBoth === "x" && element) {
    return element.scrollWidth > element.clientWidth;
  } else if (XYBoth === "y") {
    return element.scrollHeight > element.clientHeight;
  } else if (XYBoth === "both") {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }
};
export const handleChange = (event) => {
  this.setState({ [event.target.name]: event.target.value });
};
export function scrolled(e, element, func1, func2) {
  element = document.getElementById(`${element}`);
  if (element.offsetWidth - element.scrollLeft + 10 >= element.scrollLeft) {
    func1();
  } else if (element.scrollLeft == 0) {
    func2();
  }
}
export const takeMeHome = () => {
  window.location.assign("/#/");
};
export const getContacts = (id, accessToken) => {
  return getData(
    `${domain}/my-accounts/${id}/contacts/`,
    "",
    ` ${accessToken}`
  );
};
export const getPublicAccountID = (id, accessToken) => {
  return getData(`${domain}/public-accounts/${id}/`, "", ` ${accessToken}`);
};
export const scrollToHeighest = (IDarr) => {
  if (IDarr !== []) {
    let highest = -10000000;
    let highestName = "";
    IDarr.forEach((id) => {
      if (id !== null) {
        let element = document.getElementById(id);
        let elementHeight = window.screenTop - element.offsetTop;
        highestName = elementHeight > highest ? element : highestName;

        highest = elementHeight > highest ? elementHeight : highest;
      }
    });

    if (highestName !== "") {
      highestName.scrollIntoView({ block: "center" });
    }
  }
};
export function deepEqualUtils(x, y) {
  if (x === y) {
    return true;
  } else if (
    typeof x == "object" &&
    x != null &&
    typeof y == "object" &&
    y != null
  ) {
    if (Object.keys(x).length != Object.keys(y).length) return false;

    for (var prop in x) {
      if (y.hasOwnProperty(prop)) {
        if (!deepEqualUtils(x[prop], y[prop])) return false;
      } else return false;
    }

    return true;
  } else return false;
}
export function handleKeyDown(event, refreshCallback) {
  if (event.key === "Enter") {
    event.preventDefault();

    refreshCallback();
  }
}
export function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
export async function postFormData(URL = "", data = {}, token) {
  // Default options are marked with *
  const response = await fetch(URL, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer" + `${token}`,

      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: data, // body data type must match "Content-Type" header
  });
  return response.json();
}
export const sendEmailToMe = (
  name,
  email,
  phone,
  message,
  subject,
  template,
  captchaResponse,
  buyerName,
  orderLInk,
  sellerEmail
) => {
  // template_1iam9bt

  // template_bnhobxj
  let templateParams = {
    name: name,
    subject: subject,
    email: email,
    phone: phone,
    message: message,
    buyerName: buyerName,
    orderLInk: orderLInk,
    sellerEmail: sellerEmail,
    "g-recaptcha-response": captchaResponse,
  };

  return emailjs.send(
    "default_service",
    template,
    templateParams,
    "user_luCcUIntINSgugJfQeWCK"
  );
};

export const delivered = "fill";
export const categoriesList = [
  "Agriculture",
  "Apparel",
  "Beauty & Personal Care",
  "Chemicals",
  "Construction & Real Estate",
  "Consumer Electronics",
  "Electrical Equipment & Supplies",
  "Electronic Components",
  "Accessories & Telecommunications",
  "Energy",
  "Environment",
  "Fabrication",
  "Fashion",
  "Accessories",
  "Food & Beverages",
  "Furniture",
  "Gifts & Crafts",
  "Health & Medical",
  "Home & Garden",
  "Home Appliances",
  "Lights & Lighting",
  "Luggage Bags & Cases",
  "Machinery",
  "Minerals & Metallurgy",
  "Office & School Supplies",
  "Packaging & Printing",
  "Promotional Products",
  "Rubber & Plastics",
  "Security & Protection",
  "Shoes",
  "Sports & Entertainment",
  "Textiles & Leather",
  "Jewelry",
  "Eyewear",
  "Tools & Hardware",
  "Toys & Hobbies",
  "Vehicles & Accessories",
];
export const categoriesAndSubCategories = [
  {
    "צעצועים ומשחקים": [
      "לגו ומשחקי הרכבה",
      "משחקי קופסא",
      "משחקי חשיבה ",
      "בובות ודמויות",
      "משחקי התפתחות ופעוטות",
      "בתי בובות",
      "מטוסים, מכוניות ותנועה",
    ],
  },
  {
    "עיצוב ונוי": ["צמחים מלאכותיים", "עציצים וסלסלאות"],
  },
];
export const subcategoriesAndPics = {
  "לגו ומשחקי הרכבה":
    "https://images.pexels.com/photos/3852577/pexels-photo-3852577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "משחקי קופסא":
    "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "משחקי חשיבה":
    "https://images.pexels.com/photos/10327189/pexels-photo-10327189.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "בובות ודמויות":
    "https://images.pexels.com/photos/1364562/pexels-photo-1364562.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "משחקי התפתחות ופעוטות":
    "https://images.pexels.com/photos/3944891/pexels-photo-3944891.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "בתי בובות":
    "https://images.pexels.com/photos/8293720/pexels-photo-8293720.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "מטוסים, מכוניות ותנועה":
    "https://images.pexels.com/photos/9397849/pexels-photo-9397849.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "כל החנות":
    "https://images.pexels.com/photos/1727684/pexels-photo-1727684.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "צמחים מלאכותיים":
    "https://cdn.pixabay.com/photo/2021/07/13/15/42/flowers-6463878_960_720.jpg",
};

export const englishCategoriesAndSubCategories = [
  {
    Baby: [
      "Baby Shoes",
      "Baby Boys' Clothing",
      "Feeding",
      "Baby Toys",
      "Safety",
      "Baby Girls' Clothing",
      "Baby Furniture",
      "Baby Care",
      "Baby Bedding",
      "Pregnancy & Maternity",
      "Activity & Gear",
      "Baby Food",
    ],
  },
  {
    "Food & Beverage": [
      "Escargot",
      "Frog",
      "Alcoholic Beverage",
      "Baby Food",
      "Baked Goods",
      "Bean Products",
      "Canned Food",
      "Coffee",
      "Confectionery",
      "Dairy",
      "Drinking Water",
      "Egg & Egg Products",
      "Food Ingredients",
      "Fruit Products",
      "Grain Products",
      "Honey Products",
      "Instant Food",
      "Meat & Poultry",
      "Other Food & Beverage",
      "Seafood",
      "Seasonings & Condiments",
      " Snack Food",
      "Soft Drinks",
      "Tea",
      "Vegetable Products",
    ],
  },
  {
    "Pet Products": [
      "Pet Toys",
      "Pet Training Products",
      "Aquariums & Accessories",
      "Pet Bowls & Feeders",
      "Pet Cleaning & Grooming Products",
      "Pet Food",
      "Pet Tracker",
      "Other Pet Products",
      "Pet Apparel & Accessories",
      "Pet Beds & Accessories",
      "Pet Cages, Carriers & Houses",
      "Pet Caskets & Urns",
      "Pet Collars & Leashes",
      "Pet Health Care & Supplements",
      "Pet Travel & Outdoors",
    ],
  },
  {
    "Garden Supplies": [
      "BBQ",
      "Garden Buildings",
      "Garden Landscaping & Decking",
      "Garden Ornaments & Water Features",
      "Garden Pots & Planters",
      "Other Garden Supplies",
      "Outdoor Heaters",
      "Shade",
      "Watering & Irrigation",
      "Pest Control",
    ],
  },
  {
    "Home Textiles": [
      "Table Linens",
      "Bedding",
      "Towel & Table Linens",
      "Curtain,Carpet & Cushion",
      "Other Home Textile",
    ],
  },
  {
    "Kitchen & Tabletop": [
      "Bakeware",
      "Barware",
      "Kitchen Tools & Gadgets",
      "Cookware",
      "Kitchen Knives & Accessories",
      "Disposable Tableware",
      "Dinnerware",
      "Drinkware",
      "Table Decoration & Accessories",
      "Other Tableware",
      "Flatware",
    ],
  },
  {
    Agriculture: [
      "Hemp",
      "Agricultural Waste",
      "Animal Products",
      "Beans",
      "Cocoa Beans",
      "Coffee Beans",
      "Farm Machinery & Equipment",
      "Feed",
      "Fresh Seafood",
      "Fruit",
      "Grain",
      "Herbal Cigars & Cigarettes",
      "Mushrooms & Truffles",
      "Nuts & Kernels",
      "Ornamental Plants",
      "Other Agriculture Products",
      "Plant & Animal Oil",
      "Plant Seeds & Bulbs",
      "Timber Raw Materials",
      "Vanilla Beans",
      "Vegetables",
    ],
  },
  {
    Apparel: [
      "Apparel Design Services",
      "Apparel Processing Services",
      "Apparel Stock",
      "Boy's Clothing",
      "Costumes",
      "Ethnic Clothing",
      "Garment Accessories",
      "Girls' Clothing",
      "Infant & Toddlers Clothing",
      "Mannequins",
      "Maternity Clothing",
      "Men's Clothing",
      "Organic Cotton Clothing",
      "Other Apparel",
      "Plus Size Clothing",
      "Sewing Supplies",
      "Sportswear",
      "Stage & Dance Wear",
      "Tag Guns",
      "Uniforms",
      "Used Clothes",
      "Wedding Apparel & Accessories",
      "Women's Clothing",
    ],
  },
  {
    "Vehicles & Accessories": [
      "Tricycles",
      "New Energy Vehicles",
      "Bus Parts & Accessories",
      "Containers",
      "Emergency Vehicles",
      "ATVs & UTVs",
      "Bus",
      "Other Vehicles",
      "Trucks",
      "New Energy Vehicle Parts & Accessories",
      "Auto Parts & Accessories",
      "Motorcycles & Scooters",
      "Truck Parts & Accessories",
      "Motorcycle Parts & Accessories",
      "Other Vehicle Parts & Accessories",
      "Golf Carts",
      "Marine Parts & Accessories",
      "Trains",
      "Trailers",
      "Automobiles",
    ],
  },
  {
    "Beauty & Personal Care": [
      "False Eyelashes & Tools",
      "Maternity Care",
      "Personal Hygiene Products",
      "Baby Care",
      "Bath Supplies",
      "Beauty Equipment",
      "Body Art",
      "Breast Care",
      "Feminine Hygiene",
      "Fragrance & Deodorant",
      "Hair Care",
      "Hair Extensions & Wigs",
      "Hair Salon Equipment",
      "Makeup",
      "Makeup Tools",
      "Men Care",
      "Nail Supplies",
      "Oral Hygiene",
      "Other Beauty & Personal Care Products",
      "Sanitary Paper",
      "Shaving & Hair Removal",
      "Skin Care",
      "Skin Care Tool",
    ],
  },
  {
    Chemicals: [
      "Adhesives & Sealants",
      "Admixture&Additives",
      "Agrochemicals",
      "Basic Organic Chemicals",
      "Biological Chemical Products",
      "Catalysts & Chemical Auxiliary Agents",
      "Chemical Reagent Products",
      "Chemical Waste",
      "Custom Chemical Services",
      "Daily Chemical Raw Materials",
      "Flavour & Fragrance",
      "Inorganic Chemicals",
      "Non-Explosive Demolition Agents",
      "Organic Intermediates",
      "Other Chemicals",
      "Paints & Coatings",
      "Pigment & Dyestuff",
      "Polymer",
      "Surface Treatment Chemicals",
    ],
  },
  {
    "Construction & Real Estate": [
      "Door，Window & Accessories",
      "Aluminum Composite Panels",
      "Balustrades & Handrails",
      "Bathroom",
      "Boards",
      "Building Glass",
      "Ceilings",
      "Corner Guards",
      "Countertops,Vanity Tops & Table Tops",
      "Curtain Walls & Accessories",
      "Decorative Films",
      "Earthwork Products",
      "Elevators & Elevator Parts",
      "Escalators & Escalator Parts",
      "Faucets, Mixers & Taps",
      "Fiberglass Wall Meshes",
      "Fireplaces,Stoves",
      "Fireproofing Materials",
      "Floor Heating Systems & Parts",
      "Flooring & Accessories",
      "Formwork",
      "HVAC Systems & Parts",
      "Heat Insulation Materials",
      "Kitchen",
      "Ladders & Scaffoldings",
      "Landscaping Stone",
      "Masonry Materials",
      "Metal Building Materials",
      "Mosaics",
      "Mouldings",
      "Multifunctional Materials",
      "Other Construction & Real Estate",
      "Plastic Building Materials",
      "Quarry Stone & Slabs",
      "Real Estate",
      "Soundproofing Materials",
      "Stairs & Stair Parts",
      "Stone Carvings and Sculptures",
      "Sunrooms & Glass Houses",
      "Tiles & Accessories",
      "Timber",
      "Tombstones and Monuments",
      "Wallpapers/Wall Coating",
      "Waterproofing Materials",
    ],
  },
  {
    "Consumer Electronics": [
      "Mobile Phone & Accessories",
      "Blockchain Miners",
      "Earphones & Accessories",
      "Commonly Used Accessories & Parts",
      "Chargers,Batteries & Power Supplies",
      "Accessories & Parts",
      "Electronic Cigarettes",
      "Camera, Photo & Accessories",
      "Electronic Publications",
      "Smart Electronics",
      "Home Audio, Video & Accessories",
      "Other Consumer Electronics",
      "Portable Audio, Video & Accessories",
      "Video Game & Accessories",
      "Wearable Gadgets",
      "Computer Hardware & Software",
      "Mobile Phone Parts",
      "Presentation Equipment",
    ],
  },
  {
    "Electrical Equipment & Supplies": [
      "Industrial Controls",
      "Electrical Supplies",
      "Batteries",
      "Connectors & Terminals",
      "Generators",
      "Power Supplies",
      "Professional Audio, Video & Lighting",
      "Switches",
      "Wires, Cables & Cable Assemblies",
      "Wiring Accessories",
      "Solar Energy Products",
      "Electrical Instruments",
      "Motors",
    ],
  },
  {
    "Electronic Components & Supplies": [
      "Crystals, Oscillators and Resonators",
      "Displays, Signage and Optoelectronics",
      "Development Systems, and IoT Products",
      "Wireless & IoT",
      "Telecommunications",
      "Connectors and Accessories",
      "Microcontrollers, Standard and Specialty",
      "Power Supplies and Circuit Protection",
      "Amplifiers and Comparators",
      "Sensors",
      "Development Systems",
      "Connectors",
      "Active Components",
      "EL Products",
      "Electronic Accessories & Supplies",
      "Electronic Data Systems",
      "Electronic Signs",
      "Electronics Production Machinery",
      "Electronics Stocks",
      "Optoelectronic Displays",
      "Other Electronic Components",
      "Passive Components",
      "Antennas for Communications",
      "Telephones & Accessories",
      "PCB & PCBA",
    ],
  },
  {
    Energy: [
      "Biodiesel",
      "Biogas",
      "Charcoal",
      "Coal",
      "Coal Gas",
      "Coke Fuel",
      "Crude Oil",
      "Electricity Generation",
      "Industrial Fuel",
      "Natural Gas",
      "Other Energy Related Products",
      "Petrochemical Products",
      "Wood Pellets",
    ],
  },
  {
    "Fashion Accessories": [
      "Belt Accessories",
      "Belts",
      "Fashion Accessories Design Services",
      "Fashion Accessories Processing Services",
      "Gloves & Mittens",
      "Scarf, Hat & Glove Sets",
      "Ear Muffs",
      "Hair Accessories",
      "Hats & Caps",
      "Other Headwear",
      "Scarves & Shawls",
      "Ties & Accessories",
    ],
  },
  {
    Furniture: [
      "Modern Furniture",
      "Upholstered Furniture",
      "Kitchen Furniture",
      "Furniture Accessories",
      "Antique Furniture",
      "Baby Furniture",
      "Bamboo Furniture",
      "Children Furniture",
      "Commercial Furniture",
      "Folding Furniture",
      "Furniture Accessories",
      "Furniture Hardware",
      "Furniture Parts",
      "Glass Furniture",
      "Home Furniture",
      "Inflatable Furniture",
      "Metal Furniture",
      "Other Furniture",
      "Outdoor Furniture",
      "Plastic Furniture",
      "Rattan / Wicker Furniture",
      "Wood Furniture",
      "Dining Room Furniture",
      "Bedroom Furniture",
    ],
  },
  {
    "Gifts & Crafts": [
      "Crafts",
      "Business & Promotional Gifts",
      "Candles",
      "Paintings",
      "Incense & Incense Burners" < "Lanyard",
      "Candle Holders",
      "Frame",
      "Key Chains",
      "Stickers",
      "Promotional & Business Gifts",
      "Money Boxes",
      "Music Box",
      "Photo Albums",
      "Decorative Flowers, Wreaths and Plants",
      "Candles & Fragrance",
      "Art & Collectible",
      "Arts & Crafts Stocks",
      "Festive & Party Supplies",
      "Flags, Banners & Accessories",
      "Gift Sets",
      "Holiday Gifts",
      "Key Chains",
      "Sculptures",
      "Souvenirs",
      "Wedding Decorations & Gifts",
      "Decorative Flowers & Wreaths",
    ],
  },
  {
    "Health & Medical": [
      "Sex Products",
      "Animal & Veterinary",
      "Extract",
      "Health Care Products",
      "Herbal Medicines",
      "Medical Devices",
      "Medicines",
      "Medical Consumable",
      "Pharmaceuticals",
    ],
  },
  {
    "Home & Garden": [
      "Household Scales New",
      "Bathroom Products",
      "Home Decor",
      "Home Storage & Organization",
      "Household Cleaning Tools & Accessories",
      "Household Sundries",
      "Baby Supplies & Products",
      "Rain Gear",
    ],
  },
  {
    "Home Appliances": [
      "Ultraviolet Sterilizers",
      "Personal Care & Beauty Appliances",
      "Air Conditioning Appliances",
      "Cleaning Appliances",
      "Hand Dryers",
      "Home Appliance Parts",
      "Home Appliances Stocks",
      "Home Heaters",
      "Kitchen Appliances",
      "Laundry Appliances",
      "Other Home Appliances",
      "Refrigerators & Freezers",
      "Water Heaters",
      "Water Treatment Appliances",
      "Wet Towel Dispensers",
      "Ultrasonic Cleaners",
    ],
  },
  {
    "Lights & Lighting": [
      "Holiday Lighting",
      "Indoor Lighting",
      "LED Lighting",
      "Lighting Accessories",
      "Lighting Bulbs & Tubes",
      "Other Lights & Lighting Products",
      "Outdoor Lighting",
      "Professional Lighting",
      "Commercial & Industrial Lighting",
      "LED Landscape Lamps",
    ],
  },
  {
    "Luggage, Bags & Cases": [
      "Bag & Luggage Making Materials",
      "Bag Parts & Accessories",
      "Business Bags & Cases",
      "Digital Gear & Camera Bags",
      "Handbags & Messenger Bags",
      "Luggage & Travel Bags",
      "Luggage Cart",
      "Other Luggage, Bags & Cases",
      "Special Purpose Bags & Cases",
      "Sports & Leisure Bags",
      "Wallets & Holders",
    ],
  },
  {
    Machinery: [
      "Environmental Machinery",
      "Machinery Accessories",
      "Commercial Machinery",
      "Air-Compressors & Parts",
      "Electric Equipment Making Machinery",
      "Tobacco & Cigarette Machinery",
      "Agriculture Machinery & Equipment",
      "Apparel & Textile Machinery",
      "Building Material Machinery",
      "Chemical Machinery & Equipment",
      "Electronic Products Machinery",
      "Energy & Mineral Equipment",
      "Engineering & Construction Machinery",
      "Food & Beverage Machinery",
      "General Industrial Equipment",
      "Home Product Making Machinery",
      "Industry Laser Equipment",
      "Machine Tool Equipment",
      "Metal & Metallurgy Machinery",
      "Other Machinery & Industry Equipment",
      "Packaging Machine",
      "Paper Production Machinery",
      "Pharmaceutical Machinery",
      "Plastic & Rubber Machinery",
      "Printing Machine",
      "Refrigeration & Heat Exchange Equipment",
      "Used Machinery & Equipment",
      "Woodworking Machinery",
      "Welding Equipment",
      "Material Handling Equipment",
      "Cleaning Equipments",
    ],
  },
  {
    "Minerals & Metallurgy": [
      "Aluminum",
      "Barbed Wire",
      "Billets",
      "Carbon",
      "Carbon Fiber",
      "Cast & Forged",
      "Cemented Carbide",
      "Ceramic Fiber Products",
      "Ceramics",
      "Copper",
      "Copper Forged",
      "Fiber Products",
      "Fiber Sheet",
      "Fiberglass Products",
      "Glass",
      "Graphite Products",
      "Ingots",
      "Iron",
      "Lead",
      "Lime",
      "Magnetic Materials",
      "Metal Scrap",
      "Metal Slabs",
      "Mineral Wool",
      "Molybdenum",
      "Nickel",
      "Non-Metallic Mineral Deposit",
      "Ore",
      "Other Metals & Metal Products",
      "Other Non-Metallic Minerals & Products",
      "Pig Iron",
      "Quartz Products",
      "Rare Earth & Products",
      "Rare Earth Magnets",
      "Refractory",
      "Steel",
      "Titanium",
      "Tungsten",
      "Wire Mesh",
      "Zinc",
    ],
  },
  {
    "Office & School Supplies": [
      "Art Supplies",
      "Badge Holder & Accessories",
      "Board",
      "Board Eraser",
      "Book Cover",
      "Books",
      "Calculator",
      "Calendar",
      "Clipboard",
      "Correction Supplies",
      "Desk Organizer",
      "Drafting Supplies",
      "Easels",
      "Educational Supplies",
      "Filing Products",
      "Letter Pad / Paper",
      "Magazines",
      "Map",
      "Notebooks & Writing Pads",
      "Office Adhesives & Tapes",
      "Office Binding Supplies",
      "Office Cutting Supplies",
      "Office Equipment",
      "Office Paper",
      "Other Office & School Supplies",
      "Paper Envelopes",
      "Pencil Cases & Bags",
      "Pencil Sharpeners",
      "Printer Supplies",
      "Stamps",
      "Stationery Set",
      "Stencils",
      "Writing Accessories",
      "Writing Instruments",
      "Yellow Pages",
    ],
  },
  {
    "Packaging & Printing": [
      "Glass Packaging",
      "Biodegradable Packaging",
      "Metal Packaging",
      "Adhesive Tape",
      "Agricultural Packaging",
      "Apparel Packaging",
      "Blister Cards",
      "Bottles",
      "Cans",
      "Chemical Packaging",
      "Composite Packaging Materials",
      "Cosmetics Packaging",
      "Electronics Packaging",
      "Food Packaging",
      "Gift Packaging",
      "Handles",
      "Hot Stamping Foil",
      "Jars",
      "Lids, Bottle Caps, Closures",
      "Media Packaging",
      "Metallized Film",
      "Other Packaging Applications",
      "Other Packaging Materials",
      "Packaging Auxiliary Materials",
      "Packaging Bags",
      "Packaging Boxes",
      "Packaging Labels",
      "Packaging Rope",
      "Packaging Trays",
      "Packaging Tubes",
      "Paper & Paperboard",
      "Paper Packaging",
      "Pharmaceutical Packaging",
      "Plastic Packaging",
      "Printing Materials",
      "Printing Services",
      "Protective Packaging",
      "Pulp",
      "Shrink Film",
      "Strapping",
      "Stretch Film",
      "Tobacco Packaging",
      "Transport Packaging",
    ],
  },
  {
    "Rubber & Plastics": [
      "Plastic Processing Service",
      "Plastic Products",
      "Plastic Projects",
      "Plastic Raw Materials",
      "Plastic Stocks",
      "Recycled Plastic",
      "Recycled Rubber",
      "Rubber Processing Service",
      "Rubber Products",
      "Rubber Projects",
      "Rubber Raw Materials",
      "Rubber Stocks",
    ],
  },
  {
    "Security & Protection": [
      "Locks & Keys",
      "Personal Protective Equipment",
      "Other Security & Protection Products",
      "Access Control Systems & Products",
      "CCTV Products",
      "Firefighting Supplies",
      "Police & Military Supplies",
      "Roadway Safety",
      "Water Safety Products",
      "Alarm",
    ],
  },
  {
    "Service Equipment": [
      "Advertising Equipment",
      "Cargo & Storage Equipment",
      "Commercial Laundry Equipment",
      "Financial Equipment",
      "Funeral Supplies",
      "Other Service Equipment",
      "Restaurant & Hotel Supplies",
      "Store & Supermarket Supplies",
      "Trade Show Equipment",
      "Vending Machines",
      "Wedding Supplies",
    ],
  },
  {
    "Shoes & Accessories": [
      "Boys' Shoes",
      "Babies' Shoe",
      "Girls' Shoes",
      "Outdoor Shoes",
      "Children's Shoes",
      "Dance Shoes",
      "Genuine Leather Shoes",
      "Men's Shoes",
      "Other Shoes",
      "Shoe Materials",
      "Shoe Parts & Accessories",
      "Shoe Repairing Equipment",
      "Shoes Design Services",
      "Shoes Processing Services",
      "Shoes Stock",
      "Special Purpose Shoes",
      "Sports Shoes",
      "Used Shoes",
      "Women's Shoes",
    ],
  },
  {
    "Sports & Entertainment": [
      "Boats & Ships",
      "Cycling",
      "Sports Shoes",
      "RVs & Camper",
      "RV Parts & Accessories",
      "RVs & Campers",
      "Aircraft",
      "Amusement Park",
      "Artificial Grass & Sports Flooring",
      "Fitness & Body Building",
      "Gambling",
      "Golf",
      "Indoor Sports",
      "Musical Instruments",
      "Other Sports & Entertainment Products",
      "Outdoor Sports",
      "Sports Gloves",
      "Sports Safety",
      "Sports Souvenirs",
      "Team Sports",
      "Tennis",
      "Water Sports",
      "Winter Sports",
    ],
  },
  {
    "Textiles & Leather Products": [
      "Functional Fabric",
      "Apparel Fabric",
      "Hometextile Fabric",
      "Down & Feather",
      "Fabric",
      "Fiber",
      "Fur",
      "Grey Fabric",
      "Leather",
      "Leather Product",
      "Textile Accessories",
      "Textile Processing",
      "Thread",
      "Yarn",
      "Other Textiles & Leather Products",
    ],
  },
  {
    "Timepieces, Jewelry, Eyewear": [
      "Jewelry Accessories",
      "Watch Accessories & Parts",
      "Eyewear",
      "Jewelry",
      "Watches",
      "Eyewear Accessories",
    ],
  },
  {
    "Tools & Hardware": [
      "Machining",
      "Welding & Abrasives",
      "Tool Storage",
      "Hydraulic Tools",
      "Pneumatic Tools",
      "Hardware",
      "Test Instruments",
      "Plumbing",
      "Bearing Accessories",
      "Hand Tools",
      "Material Handling Tools",
      "Other Tools",
      "Power Tools",
      "Thread Tools",
      "Tool Sets",
      "Pumps & Parts",
      "Measuring & Gauging Tools",
      "Fasteners",
      "Ventilation Fans",
      "Bearings",
      "Power Transmission",
    ],
  },
  {
    "Toys & Hobbies": [
      "Action Figure",
      "Baby Toys",
      "Balloons",
      "Candy Toys",
      "Classic Toys",
      "Dolls",
      "Educational Toys",
      "Electronic Toys",
      "Glass Marbles",
      "Inflatable Toys",
      "Light-Up Toys",
      "Noise Maker",
      "Other Toys & Hobbies",
      "Outdoor Toys & Structures",
      "Plastic Toys",
      "Pretend Play & Preschool",
      "Solar Toys",
      "Toy Accessories",
      "Toy Animal",
      "Toy Guns",
      "Toy Parts",
      "Toy Robots",
      "Toy Vehicle",
      "Wind Up Toys",
      "Wooden Toys",
    ],
  },
];
export const logoWithText = (
  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZwAAABvCAYAAADYMHY6AAAAAXNSR0IArs4c6QAAIABJREFUeF7svQt4VPW59v1bc56ch5CQc0g4GUAQPFAiisaiNWyqDfVEqrU7lt3usO225Ov7+Zm3/bpf3O56wbbtB1vrNtXaHbTaxFNJPZF6wCBqiQcgAoGQhCRDDmQScpjjWt/1XzOTTJIJhENakLWuy8vWzKxZ617/te71PM/93I+kVFypoG0aAhoCGgIaAhoCk4yApBHOJCOs7V5DQENAQ0BDQEVAIxxtIWgIaAhoCGgI/E0Q0AjnbwKz9iMaAhoCGgIaAhch4UiEFq1G/j9tQWgIaAhoCGgITBYCFxnhSAz6zHT2mXF7JaZEuok1u9BJvsnCV9uvhoCGgIaAhkAAgYuKcDyKmTf/KvFMZQut9n5W3ZhJ4U0W0m1OGBH3qOWtMP9NWzcaAhoCGgIaAmeKwEVFOMdOWNn8fCdV79jxeX0kTovjJ/dO44bLdUiKP8pRkHB6DfhkCYvBh0GnRT9nuri072kIaAhoCIQicFERzvFBK2Uv9/DqdjtOp4cZ2VO5/654cucqECCcQSWal9/3ceSYzC1X67kkxYUOr7ZqNAQ0BDQENATOEoGvMOEIOYA/LRYUBiiSgb1HLbxU3cuxThc3LZvC8gUyMWbXEIxNPTZ+9T9t7D3Qy7q7p/P1RTJmvfj7yH2dJe7a1zUENAQ0BC46BL6yhDPgMdPjMmM1elRhgISskoYi6fFiRkaPAReKz4vbIyPLYDJK6Axmdu430NFrYMlsNylxbjr7jPS7DEyNchNpEvvSzBkuujtFO2ENAQ2Bs0bgq0k4kp53vjDw8vtuci818Q9LDSjeQQZckkosFhNEmMHj03G4w8xfv3Th6HGTMzOKhVky8ZEuDDpBUOAiit+83M/OT0/wT7clcHWOF6POc9bAazvQENAQ0BC42BD4ihKOjs+OWHj/C4W5WQay00y888kAb3/QwYk+N5dfGs8NX4uhsdXFS2+20nCkG59PJiLSworl6XznGxFkJ4rajQ+PZOWlHQp76l1867oILs1wYZC0ms7FdqNo56shoCFw9gh8pQhHVGvcXh1eH+gNRnQGI30uPX94s4cXth2l+3i/iphOJzEtIRqn24vDMYiiDKfIzCYj994xk5VXW0mMdmI2+PBixasYMUmD6BHRjZZSO/ulp+1BQ0BD4GJD4CtEOBLH+018ekhH0zEv01P0XJIO9Ud9/LbyGLu/6JzwtZ0yJYqFl07j5qujuCzbR4xVxqSX0Un+NJu2aQhoCGgIaAicPgIXPOGIqMYn63H6TPx5l5unK1pps/eQmBjDpXOnocgyn++109HRd1roSJLE9Mwp5F6VytwZFuZleEmNc2LUaem00wJS+7CGgIaAhkAAgQuacETRX0Q1RzpMHO2E7TvaqPmo5ZxfXJGCW3H9dNbeGk12ojugeDvnP6PtUENAQ0BD4CuNwAVLOLKi44DdynNv9vFOTSsDA258Ph+yb3LSXjGxkZT+czbXLVAw6dxf6UWhnZyGgIaAhsBkIHDBEs7xAQtb3xxk66vNDPQLL7TJ3aKjrTz0zzO4/jIFsyaLnlywtb1rCGgIfCURuEAJR6KuWccTFd28u9N+RhdGkkAngfi38BAQm9CeCcGaLJxuRgnRUlNt/Ph7mSyb68Ws1yKcMwJd+5KGgIbARY3ABUs4B1oNPFnZrdZtQmXN411NQSwmg7/p02KUsAaaP80GCaPOTzpen8SgW+HEoEKPEwZcCt5Ahs5kNLDi+iy+c3MEM5PcGDVTz4v6xtFOXkNAQ+D0EbhACQe6B808/7aT8peb6esbm1ITBKLX+wkm0gKxkRIpUyF7mkR6vI6p0RLRZgmrXsIkohxFwuOR6BuAjh6FvS0+aptkGrtl+pwKPgWMRj3fvCmT7+ZHkhbvQafa5WibhoCGgIaAhsBEELggCUdBR79byKC9PP1SG60t3UPnKiIZsxFioyA1AWamSczNlJidJjE1SodFBwZJUgkGnwRe8W9AllAC/KGg4BqQONoOb+3zUn3Qi/2EjNAjREaZ+dd/nMPNVypEmYZNPycCtvYZDQENAQ2BixmBC45whDqtq99EzV546e129tZ14PH41FqMyQhT42B2Jlw1T2LBDImUKRJWo4QY6qkIggn8o5LLaMIRxGNQkCK9iB5PucdIZ7uOlz/zsG2fh/Z+Wa3tLLkygwfuimV2qhblXMw3j3buGgIaAqeHwAVFOD5FT5vDyLYaNy+/1UZbW496tgYD2GLgkmy4ZjEsmScxzSappCFIxecBl1Oivx8GByW8Hn+UE2WUiDRKGEUFR0Q4KhkBFh+6KW5wS8jHzLTZdTy508V7DV4GPQoxsRH8X/dlq6MLrEatEfT0lpz2aQ0BDYGLFYELhnAE2bQ4zFS+M8grbxylu7tfLfRbrZCdDtddBddcAWkJYJT85CFmqg0OQOsx2N8I+49AczucGIBoK8xN1XFlto6ZiToi9DoUWaTY/HI1KdqLNMWN0m3Ed8zEm3t8PP2Ji6M9siptu+e2Wdx9o5Gp0Zpz9MV682jnrSGgIXB6CFwQhCNqNoJs/lg9yEuvN9PTM6hKmmOiFRbPV1h1AyzO8SvPgikzEdUcd0jU1im8/ZHCpwehp2+k3NlsgMXZOu5camBhuh6TpPMTjiAeSUGX4AK9gtxi4WAj/PoDJ5+2+dRazvXLZ/DAHRFkTHWP1VCf3jXQPq0hoCGgIXBRIHABEI7E8QETr+zwUP5qK50dveh0MHWKwjVLFFZ93V+z8Uc1fsLxuiVa2mD7LnjzQ4XGNlSSEJteLzTQYi6OjCIrCNK5+TI9a5YaSYvTDxOO2FeEP7Umd5g41qxnywcudjR6cXoVcnJS+Nn3p3BJmpchtcFFsWS0k9QQ0BDQEDgzBM57wnH5TLzzmcRvXmjlcEOXKg5IiFdYsVzhlm8oZCaBLqA4E4Tj80gcbZV4ebvCmzuh0+EPQEwmA/E2C0mJViwWPU1H+7C3D6hzcGYk6li3wshVWQZVXKBGOEJkIEYZTHWjDOg53mLg8R1O/nLYy4BHIS0tnkfuT+LS6bJQI5wZ+tq3NAQ0BDQELiIEzmvCEam0w+1mnnq5lz9vb1AvS2yMQt41Cnd9SyErTUQ0w2k08dzv7JJ45W14aTu0HxfBjERMjJl5c2xce0UcV8yLJDrSyNZtHbz0xlF6e53EWiX+ZYWRFfMMQwIClXB8ErporxrAdLXp+a/3XbwTEA6kp0/lkX+Zxvzp4oNaP85FdM9op6ohoCFwhgic14Qz6DXx548UHn+umY72XkwmuHKxzHfvUFiQo6AXsoEQwhF1mw/+KvHbCth3yI+IzWblhquTKbghjlnJbgwIWxqJF97x8fRL7bTZe4kyS3z/egMrFxiJ0PsVa0HCETUcSaeowoPN77nZ2eTB5YNLclL4f7WU2hkuO+1rGgIaAhcjAucx4Ug0dZn47Wt9vPLGETUvlpaiUHi7j1U3itpLiIw50FvT2wPPbZP4QxWc6IfISDM3XZtE4c0xZE/zjBgr8OK7Ck+/dIzWtl6iLBL/dL2RmxcYiBBqhBDCEcGL0wOfNfn47ccuvuzwiwaWX5PNA3dEMj1BEJg2AfRivHm0c9YQ0BA4PQTOW8JRJD27vtTxn//TyYEDxzAa4ZpcmbXf9TEzM+AMEOybCRBOcws8Uynx+vvg9sDcnGn88PYEls31iTFtI5DZut3L717u4Fj7CSLNULTcyM2XGokyCMIB2Ssx6ISuEwr1HTJv7fdQ2+qj361gMOr57m2zWXODnvgobeT06S057dMaAhoCFysC5y3hyJKJP3/o5t9/00R/v5PYWIWCb8p8906ZKKu/bjPUqBkgnMZmP+G8+YGfcBZflsIPvh3PlbPE0LSRUcirH+ooq7DT2OTAqIels/Qsm2UgIcJvcTPghDaHwv5jPuqOybSfkPEESjWzZkzlR3cnc9VsLya9Jhi4WG8e7bw1BDQETg+B85ZwPFhVKfQvntivWtckJircfafMHd+S0QnuCEM4XV2w9TWJijehfxCmTInk299IYvX1ESTEeNGFRDn7WqN4/A/H2PlJG16v7O/rsUrqP4Jwegdl+t0MuUULWI0mAynTorjjH9LJX6IQZ9Wim9NbbtqnNQQ0BC5mBM5bwnELwnnfw6O/OYDH4yVpmsI9a2Ruu0UesqwZHeF43fD2BxJPV0KDOmlaIj0tlvzrprF8kYmMBJkIk0ivyTjlCF5538nz29poOnpClUePt4kR0/FTIpgzI5YVV0/l2gUScVaXNmr6Yr5ztHPXENAQOG0EzlvC8WJmW42HR35zCKfTwxSbwh2rZb5zu6w2a4aLcIQsWvTgCNHA6x9Azwk/HrExFi6bP5VrL49ifraBpCkSURYZx4CB13cO8s7HDlqPDdI/4MOjDsCRMBklLGY9sTEmEqcYWJgTx7LLIslKcGHSa3Y2p73StC9oCGgIXPQInLeEo0gG3vlU5tGn7bS1ObBaYEWeTNHdPlITw4sGBOEIl4G9ByQq31b48HM/6YgJnjqdjri4COZfEs/iuRHMSdeRkaQnJtpM0zGZfYed2Ds99A3Iau9OdKSOKTE6pqdFMDNNj83qwqCIcQRaz81Ff9doAGgIaAicEQLnLeEg6fjyqJEnKnt594MmVXo8Z5bCvWtkli9V1Cmdo1NqQWsbj0ti/2F4owZ2faHQ1gmukKDEajWRkRbDZXPjuHSmiVlpOpKmmjCbJFXyLCFh1PvQ40Kn7lSTPZ/R6tK+pCGgIaAhEILA+Us4gGPQzEvveSh7oZG+vkEirHDdMpnv3CarDtF64XMzymkgaN4pZM1t7bDrc4WP9kL9UWFzo+B0+yMetcIjScTGRnDZvCksvUyk24xkJipEmkb27GgrRkNAQ0BDQEPg7BE4rwlHxsCnDUYef6GTj2tb1HEEwrRzxXUBH7UU0AsMgkPVRpCP38zTNegnni/qFb44BPUtCq2dCicGhw09BfGIdNulc6dy9WVRXDFHR/pUTfJ89svr/NyDo32A3fX91DYNUOfQkTPfRuGSKJKM5+fxakelIfBVQeC8JhzhpdY1GMkL25387sWDuJzuIfNO4ad247WofmqRJpDUAWqh5DPW9qaz2z8X54vDCvubFZo7Fbr7FNVJQBh8ik1IqZddmUD+shjVmFNEO6NTauK4HIMmfLKOGKsbk05Lu034hvD4aGh34/SBs99NXbuXuLQY8mYYsUx4J2fyQRn7oW42v9zCwzUuSIplzaUmnF90UGkHUm1suD2FoiURGvGcCbwXwHfsDT1UN3nVN81uh5O6dh9OJJJm2yhaEkNW5PBJONv7qKpz4URmsN9NbZNHXbNxabEULotlUbzuAjjj8+8Qz0vCES5p/W4DLZ0Sh9oUduw+wbsf2unvcwZSYWIWDlw2V2H51xQWzJFIsoFJhDuqLc3YptCgN5pwkx4chKPtsOeIzJ5Ghf0tMnaRbgsQj+i3WbwgidUrprAkB6xmCR0KesmDpPgY8EXy6gdeOh0yN3/NyPQEF3rVZlrbToaAo66V/NIWdob5UFZuChtWTaVgtvncE4/PR+27zRRu6SAuP5PSPBt5WYLgfOysrCe3vDdwRFFs2DCbh3LUuFnbvkoI+HxUP/8lN+wysmaOCateIileR+3zdqrEeUbGsP7uZIpzBfHINFQfYXGZi7wlVmx6iIs34viklTLVQ9jKmjuTKcmzacRzmmvkvCIcETkMeAw0HpP49ICXv9YNUFfvoL29D6937APdaICUaWIIG1w+D2alSyTawGoU46VHRjhDZpwh6Te32+8o/XmDzEf1MnuaZY71Koif0ul1zL8kgeuXxBEVocegU5gz3aR6sg3I0Tz85FEOH3VS8r00rprlwajTRk2fau0Jwln9vI/1P0wlP0kHHhdbH99D4btB5Z+ONQ/Mp2zZuSQdmYZdLaze0kfe2umULrUixh4Ft9EkmFeYQ0VBFHGnOhnt7xcWAirh1LPJmkp58Pr29lL6b/t52G9EDwRfOCSVcFbXxVKxNp4skWods1ahoHgB5Xnncq1eWJCeydGeN4TjVQy095r4qM7DXz7qofaL45w4MYgSyHWJoWvCLdpsVoi0gsWM6q8mNkmRiIuG7DSYmQHTp0lMs4kx0hImaZh8/Kq2QAQknnHif3slvB5o6VT44Esff6nzUd8uq9GO+i4TYUH2yYjmz2uWplJ0Swxp00zs+NSJo09m2aV6kuNc6DS59CnXn0o4L+vYeH8Si0T64m9xE/f28fAvD7NvyUy23BQxTCQitdfUz8593Wx+pn046lqYzu71geM75RlpH7hgENAI57y4VOcB4UgMeg3sP6rnrY8GeW9XJy2tPepETrEJkpkyRSE1RSE1GaYlKEyNg+hIMBv9RptCGNDTK+HoQU2XSQqqA3TyVMiaJpFsk4gQnx2HcIJKt55++Kjexyu1Xva2+HCOClqioiysWpHGgllW5mRZSbF5MesG1TSbtp0agb8H4Tj2tJBfLlNakk5+vP8Y7XV2ih9rprIr3DHHsnnjTIqztBz9qa/oBfQJjXDOi4v1dyYciT63iU8O6njp7S4+3H0Ml9OjCgNEJJM4TWHObIX5c/09OOnJEBcDZvEsUEUCw2kzxSvhdEJHh8SBwxKfH1Boa5eIiYCcTIl5mRJpNgmrUYckajwhEY5KOIH9iX28U+flDx97VJfo0Y43oocnLs7KTctTuOsGA9NitPEEE13Jf3vCkamrPkJhaGqkf4BNv9xLye7xj7pg7XzKb7Ke+1rSRIHSPnfuETgDwln8jIu8K0QNR6bhsy6qR72gaCm1079Mf0fCkTjhMlFTp+MPr3fx+RfCRNOHSJ3FxyssvEzma1+TWbhAJjkR1c5GrcuE1GbGa/z0uiSOdULNp/DWhwpdDpiTLrFsvo7Ls3XER0lqGi6YUgslHLzQ3QfPf+zmT5976R4I3/SZkmLjJ0VpLM3xYdZPsH4j0jhtg9Q1uXBEmsmJ15McbyUpRB0zoUso9nO0n9oWD04MZKWaiIsxqfub0Obz0WD3K8WErtzZ2EPZu+1s+cQFWTaKl8RScM0U8pJOsT+nh7qWQeraPBBnJcemJznRTNw48uKJEE5OXjrrc4xYI43kZEaSk6Q/iwe/j9rXDlHcNY3Ku2NRT8fRQ8lPD7BJ9doLbEk2HlppI3emlSyLhC3RStIoyZyz30WD3aWeq9OnIynNQnK0iZzECWKOjKPdRZvQveh10NtHeXUnZdW92PVRFNwUy+pr4s9eNOGTsdudNLQP0hDQQsQlR5CTZCYr5jSjtsD6UFEKoy4EHVlzYlh6qnUSxLnfxc4DfUPHhcXIojlR5MSd5nEFjqeuvo/a9sC9pzeQlRXFotRx1stpEY4e+x47RY82U9V/kheTk9ZwAtfh6CANbgNZySaSYsxkTVjddvbrxSHWQLubui4/RhZxjyabT2PNTuhpclof+rsRzoDXxK79Rp5+qY09e9vVFJpIn2VmyVx7nY+862WypotBawHlmdfvLCAaOmUP6JQgaYTpw1H80Y/DAe98pFDxF4UmO2QkSuRfoSNvgZ6E6AB5eQNRUjBiCvzOX4/4+K93Xew/Jof1GdDrddyUl8H3b4khM8F90hqOs6uPyrfsrH+xG6HAHb3l5Kaw/qaprM4xjyhoj/6c0zFA5bajFFf24Aizn7j5CZSsSAwv7RW1jEfrKK0Ltz6iKL43iYKZeho+buO+V8STSk/+Lemsv3Es8dgbuil7uYXSHYNhdmYkPz+JouviyR8ldT414URRsNyKzeemZkcP4lCzlqSw4dZECmafjmxaqIwOk72lWz2+RQVzqL4zxo9tbx9lL3ey84RMW30XVcLE4iTn6mjqoayqlZK3+tR9JeXEktXUw87gg2hGPA+tTGSd6OMZrev2eKgq38/K18LhBPm3ZFK0OAJLSxelT7ZTK873TNV6Qon3SQdbXm6m7IBQXUVRsFBPXY0fR7HlLEmieMVUCheMFE7g81BdZWdrk4/Bdgdb9wzbcuTlZ7I+LxreP8zKVwaGrrcl1YqzRZzXqHXidFG9u48Gpw/H0UHqTvhf2CxGmd1vdLETK/nLooiTXVTV9KrrOCs3lQ23JlAwWhrv81H3uYPabpnuLie17YHUtVGi+0A7lQ2waEk8iy0y+97t9tfhZiSw8fZpFC0afY6nIxrQ01BzhNxNHWHvV/8JxfJQSRYbFo16uxLn/347D//eTnU4spqdwIaVU1lzRRRZk7JeZOwHutm8rY2H1fvTSF5uFOzvHo7QxJr9xlSKhCJvcnsRxjwfJo1whOJMloyqo7JOGWl26ZH17G0289TLDj7Y2agKAywWyJnn4x9u9bHsGh9TbSKiAUVENCJdNiDR1irReESiv08iJhIyRE0nHkxitoAqhQ6Qj05CMknILonOFoXK7Qovv69wvBdmJEusWa7n2nk6Ig26QF0nJEUnXgZkic5ehV9ud/H+Ia94uQu7xcRY+N/r5nDtfC8mg7ixZCQ1VxfcZOyfiTelFhqWpFK6wkbeTOtQn4fTMUh1TTsbyvxF65y8TMoKp7J0zBufTEOtnXUbW2i4IpUN37CRmxXyFu50sbOmnfVb7Op+LFekUvG9JL8SLLh19VDy2DEsq1IoTNZjiTTg2NXA4jLYuGEG6wNSYFHzyPtZq/rwU7dl09n3wwRyxML0edhZ1Uj+M73kFqSzPjeGxRnDJOmw91Lxehv3veZ/tV60Yjpb7owfOp/xCcdM0Q+ms+G6kObL3gG2VjZS+Jp40BtZUySK/lEnJeRQ3IXKaOUuCxtvt5EVFy76k6mtqmdxWc/Q15Jumkltkc0fCYmH3c5Wih6z48xLp3RFLLkZIZirD8MutlQ0skU80WckUv7DNNZkhUQ8QhTxZD0VGWmULjRhMRmwdHZQ+DM7WT+4hC0rAiKG9m7W/ayeLe2BQ0lMpOLnmRQIz8CJbM5BKl9oYvW7EuvvTFJ7SnJihr8oXlSqqlspLve/8MTlplJeGLI+1OM8yGbjVIrmGElOtGLr6qL4MfvwOgDyi+ZRkR+hRpxOexfrHjpMWfDNJy6B8oczWGM8wbpHDlGTGMfiODM5aRJ11S2UNUSx/v5MSnMjhiPg3kEqq5pZ/aK4Bv5rvGlFyBpQRSX7KW6PID/NSFaqFWu9ndIdLvJvm8nGVTZygtkBj4faGjvFv/bfA4tumk7ZnQksCuJwmhGOIJzV71ooCwpcnINs+fUe1u0K4mqm+MEcNl8xTDhOezelm+vZ5Etg461TKciJGI4qnR5qP+tiY3kzW0V0PTuR8rXneL3EC/n/UYq29JB1WyoleXEsDY3AnR527mpnw5OtVIlIOzWBzT9MpSjndF7mJrIgx//MpBCOV9Zx9LiJTw96SZmq5/JZMnr8pCOIqKXbyO+qnLz2VhPOQRcmM8xb4OP2Qi+5V/tUQYAgGVXKLEsMnJD44nMdb76lZ89eif5+iI2GhfMUbrwGcrLBKIUQjiShmyI6ZyR8bQqffq7w2z8pfLJf9NLA8kt1fOc6PbOm6dDJgnTGEs6AU+G3H7j50x4vvc7xvdRKf3QpNyzW09KhEBmhIzXOOTSUzf5ZC4W/dJBzbxYblkWM87D0k1Lhv7VQLQCan8K24mTyE4fJwlFnp/CxLrLuyWbDKFlv6EO27t0m8n4deCtbnMr2HySRFwzhBeH8uoucoukUZahFMGqrDlPSmUB5YSDdJB4kTe2sfqDR35ugHk8qNT9JYanFx86qBvKrYMMDWRTPHi+VJCOOY+WvO1DVprOTqPhRKgVJOsISzpMHKUvOoOKWQAQSulYdvZT+Yj8Pizd2jBTdP4fNyydSW/H3UYyQtY65B05GOAEp9aZe8u73Y24Z73QdfWwq209JjXjRiGHDT7NZvzBwA6sP8sPULMpmc65ZPQIVg0rY8C8pLA0+DPv7ePiR0OjTxlOPZQeu0ylucJ//uhTWWtm4NlnFOewmIqC3G8h9shu1my0riYoS/3VR1YKjjtPZYGdlSbN/TQa2iRLOiHUW2Pe22ZmUrfCT1YjN56HqxXpWvuiPIPPvzaE8P/BiMea4/Gu2+KiN8u8F5MojdibTUNPMyk3talSXtHw61WuDL0unG+E0UrjTSllxov9lawzhGClan8NTgesqyKbkPxuoW5jFU6tt40YOKin9qp5NYk3rY9n48yw1haxuZ7leVna3UVg2SH5RJsXBNRhmMdj3tFL4s8DzZvSaPcVyO9s/Twrh9Ln0VH2kp+yPR7l8vo3S+xKIkPyvQgMeE9s/1fGrZxro7DyBwQAzZsvc+V0PK77hI0J9kx4mHLdLYu8XOrY+p6dmp15VoQW32Bi46VqFO1ZC+rSAkXNAiSbZdEhxOpR2hc56hd+/LvPqDoW+QUibKnHfCj3XzdNjlsITjssFf/jEzR8/9dDZNz7h/Oi++XxtQYRah0pJjuHby7xMiXAjCkeljzXTkDeDsrxTPCTVh8Yhcp/xv22rN0pRgv/trb+PTb8+Qs3C6ZQF3/BFnr7DRbdPR3JSSBquq4d1Pz3AlkDeblHBbKruDJDJGMIBe0Mv+0yR5CUSqAn5sOhclG1pptLfY4uw5t72s0xyu+wUPt5H/g9PRjaB76g3Th2F1YHIdnE6Nf+SRE7LKFm0iBL29OFMiw7fQOfzUPnfe1n9VmA/SYlU/CydghAyDn8DnIRwAvUre+cA1dUiLSgcwP1bMMKJ6+qm5NEWnKtmTIjgHIfaKfxJgKTj43nqwUyKRKQT7kHe1Ud1u5G82UYcdie7GwdxmmB31WEe/ix4JBNvQHW2dFH0qy4W3zeD9YGXABE51+wbwI6RRXNDaiSi7+SRIIFDUl421UXx5OgnkXDU2pUHbGbi8NHQJZOcYBxB4M72bkp+Xh9YtxE8VDrbn6oKh5/DRZvRqLoC2MV+Y8wjU5nOQcoe38d9O/yZhvx7cij/B9FXNYmEI47z6Xo26lOouMfm79s5ySbuTpRVAAAgAElEQVReRAv+rdWfAsxIpOJ/pY9P/BNdL6VpxL3VRM0V2cPPGxFV1fVS16sjaWYMeamBtyaPh8pn61hdFVj7GYlsezB9xEvu2RLLeN+fFMIZcOvYsc/In97rZc50C/+4Kgqr1IeIcw63m3j8j71Uv9egptISkxRW3+Xh23d5sNmCTgF+whEpso5jOl58Qc8LL+o5cUJSDTeFik0YcIqx0dPT4N5vK9x49UhfNYQ7gAC4HwYPybz6F4X/eVOmrQssJrjnej0FSwzECslbmAhHEM4Lf/Xwx1o3HSchnKVXpXH7yhT2ftnNtMQIVizyEWd1svO1eorq4yhfm+jvOfGJtFg7pc83s1W8+s9PorwohTUZ/kWgPjhKD7NVzUaZKV4/h425Zhy1zRS8rGPDA6nkiW7E/gHKnqnnvmr/YhlBKs4BNm0KUWDFJ1D+bxmsEW+xYQhH/V17DxvKDvDweKotvY2n/iMF/nSYrWkjIxG1NvVuN9VtPizxkRSuiGepiKhEHvu1I9zwfLCDX8+a4hw2JXdTGNqHE1iVjpZeKkStwRRB4bKQ7u1gd3hlsHZgpPgn89i85FSmZ4FOcaEymq/HmZFE+W2BCEqQ8s8PsCVUNDCCcGJo+NMhCuvjqPhB4NoJnByiDtdJ+R43yTnxFOfHh6RrPFQ9s5+VVf63oZM9yNUP9A+y9cUjgXRhuFtz4uepqvD2xFLxQ/8bv7Opg6INR9gaVFQF3qKLkz1Uvd/Oxmc6Qpweonjo57PZMMc7eRGOenoiim+naFOgCB8S9ap/FlFOCH7kZrJPRBZhiNC/ZrvZ8Hg9D+8R/29UVIlMw7tHmPvrLn8kl5hA+c8yWJOgnEbjp6jhTDzCUTMZ5R6Kfhy410Qk29DNxspmv41SZCwb7s9k/RWBJtH+Abb8ei/rPvFfe1FjrLozhiR5LPFPdL384N4Emmq8FJdk+uX/vX1seqKOkqEUoJE1P5jNllwjdbUdqsWT+hwKbPn3zqNiVZgI9Bwzz6QQjkhlnXCZae4yEBuhMDXGS0uXnuZ2hf2Nbv7wWhPHj/djtsCSa7z883o3s2fJfgVaUIUWEAfU1up54r8M/HW3TiWbtJRoEhMiaWjs4Xj3gDonp+AmhXsLIFZ9sAfUZyKtlirSCxK+Iwrbdyj8dpusmneK7Vtf03P3cgPJQrkThnAGnfD7D9288rmH7sHxIxyLxcS6781h2QID8dEykQYXuhMOSjeJN+SZbAzkeB17Wlk9FMYGrmLudPYVB0J+9c1sD/ftCPxNNCD+azxtL+9n5SsSawoSWL0wAupaWD30IAdCGxXHhP0RPPTzS9gwXx+ecNTfrOO+HSfrI4ri/xTHsrPKScED0ylSMQW6ein99f7ATe//T0nL0tk010fFq61+f7LQbdl0duV5eLAqpPFT3JiH2in6eSOVgQJr1k0z2f69wFviGMKBiUqWHYc6KH36iFpfGSEaOBXh3GmmfEsjDXnZbF7iT4OpN++WOkoCDwjxn7JWzGR7UfBtVqZhRxOLH+sIiDkieOins9kwVx7zIBe1oZ1/OkTus8O1o3D3dMEP5lO+4tSRcXVlPQ+TTEWBn1DtnzST94h9SCjg37dalAr76MgTD5pv6KmarJSaulZ6KNlwgE2qQMO/ZeXPpOYeW6CeKeTrh5kbEHmIjv/xiNAf9YREz2Jns1PY/mAqeYEUpeOQndU/GU4Hqg/TfDM1E3YaOA3CuVJH5bMH2BKT6XeoEKrP9h5KHz3AppAHuiC+ip9nBKJzoZ6sZ/EzgRcy8VK3MZuiZM8Zr5f8m6fQdTySx0XNyeKvsRU9GHyBHcZdvLOGExyNqNWGXSnn5j9OCuGEHprbJwQCJv64/QSHmgbp7XXS2tatOj+nZsgUft/Dt273qGo0VeYcQjiDfRJvvK7niScMtLdLiB6Y/OtTuHLhVP74Riuf7G5VFabXfQ2+f4dCdupI807dNB2SWUJuUfigRuGpP8nsa1RUo84Vl+n43vUGsqbqwxJOb7/C//eOi+37vUOuA+Eg1+v1FN01g7vydNgi/WG8WPCFT7koeiBQ+BUPzhcPcEMgTz20n9Qktv1bOvliFYx5uAYaEJM97KzpZMPzrVSFaVQcShmIZ0qYPPNQRBAmwgnvbRZD8T1TWBQt9udm52f9GJJ1vNcVQ0Uwn41M3VuHmfuEXwU2oS0nlTe/Bf/xZgjhiDdboeJ6JSRPmpNKzYMpLFVfHgL+V0MRzsjC9Sl/1+Oi6rnDbNCnqm+QqkptDOEYKbgznaKFVrLizGT1d1H45ACrfzT8tmr/pJHcR9r9NangJh4Sos4SIODRDzn1rXW1meqykTWcsb/vJ4T8VSkUiGhXpPwO9FKXnELZLacQSajrqp6H9alDDzs1uny/k60fdVG2ezhdGBarhYk8dVsKhTNlKieRcOy1zeRtGEWC8QlUbAg+gMcSZd49OVTkG8cS4WixgnpiVh766Rw2LPRHvmMetuLF7gdTaHt5otY2p0E4812UPtoCd872v9iJxuJw60XY5jwym4cCaU/7rkYWPdoeUMHpWHP/fMpyGXMdJrpear06Ojwx/GZdoko4quiltouymm7K3vWrAcfd4mN5qDCNknHrzKe80yb8gXNKOCKycXpNDLp1xEV40CH6WIz84R0o27ofj2e4X0XY0lx5tZd/fcjFzFmKX5E2inC6OiT++KKB3z+rZ2BAIj3NRtG3k1mcE8FTL3Xz6uuH1PTaFZfC929XuOySkYQjxUlIFh1Kh59wyrbJ7D3iJ5y8S3X84w0GZiSEJ5yGdpnHtrvY3ewbmp8TDtXExGhK/jGTa+f7sBj9b5FjwnER5n/Ww06PUdXAi/VgEQ+3EX0RY4vYBcXzKQ/Wf8SDpLqNdWUd/rfX2QlsXD1K/nmywmYY0UDDjiPMfSyQelCPPIqHSmeOlHqKh9pzB3jYkEpFMC3lcVFZJmorIW/NC5PYuAiqX7OPJEbR43K7UE5FYWs4tbUNWSls/2ngbfVsCUc15zxE6WASFeMSTgwbN85ifcBZQDwsCqrNbAm8KaqkN+ZlwUhSpJl1Dw4bfTpbOih84AiVQUiE2OKBeBrKRxLOGFFGaJ0hVJgQ2gMz7u3sTx+t/iSK8qGXgdAP+3tB9h3uo2pnO5tqAsSeI4gmidXzA/W/yRQNBFJc2b8e/bYUy+bHZlKsClj8YooRxq5CHXlfDLXPjsKvoZ3VJSGiFvXbeooemMfmoAff6JcKofr7WRpx28894WzO7KVocz8rQ15QhJS+6ihq7436kmMZ2681+nzV+uF3Iqh++szWi/NQO6t/M0BhSFovdCU4uwapOzpA9SddbKzq8ROdkHavFQ7pYSTaE6aQ0/vgOSQciT6Xgff3GWlsGeDm3AgypwzS1Wfg92/J/O4PXw75oqmPtmiFlas9/OghN1aTP+IfTTjH2iS2lht4/jk9Ho/EpfOmUbwmhRmpOn77ai/PVR5UCWfBJX7CuerSUYQTIQn5GooD/vKBn3AOHvWnx/Iv1/Pd6wxkTBmbUpO98Hadl6drPDQeH3+k9JQpEaz6ehp3fd3MtNjg0LZAd/sBGxVDKZeJXJTRaQVYemcOVWqYLmPf00lpWSNlkYlsvi2Rwvn+PgPR3OW0BaTWp0s4Ib0q6hEuDviIhUqJVHKppyw1azjHO+Z3Qm54VaLdyeZaL4uXJVC4eNju/9R9OCLX8vcknMAD/LPhmoioL1SW1bH6jeFoIScvhbz2Xiy3zmRjoA9jDOEkJbLtfyfhqBj9wByl/oqMp/zR6f462xlsasF9YwvOFdlszBtPCSl27FfeFT4qZMNWin4Q8vnJJpzR62xGLEv7FVb/aOaQ0GEM4Yi1WGyjbjRhj1bP6aPIn+7BsmLWcApyNOGIaHRTJlnvHZ6geefEI5yN07opfNrD+pJ0f411gtvoiJgrMtm9Lpa6MQQ7wfUi0uNPHqIsJpmyO+P9yrpxNkdTFyUbD1PWAktXZVN2W/ywvHyCx3+mHzunhNPZb+K3r0t89oWdB+7N4PLp/bQ5DPz2tQFe+nMDvhCfmKmJCnfd5+Z7/+xWrWbCEU6HXeK55ww8t1WPyyUxe+ZU/umOZBbMMvP0q71srTxwUsJRU9eShLcPtr2n8OzrMkc7wKCHu67Vc0eugfiIsYRzvE/hmQ88vLHPy4mTSKKvzc2g+A4bs6a50Q2NJ/BLN4uOxlMV7OkQRVO7i2738AyYETM5fDJtDV1UjcjZQM6q2VTfHc2g6nbcw+J7MtiQF+PPe6t9IB1sqpYp+n5AYnuWhGNZns2+QPF5aEEFekm25YSqXwbY8thw0VOkNIrvTydX2G9PtbIo1Rq2m/lCIJwx104taNexMqjoAfIK0sk50ENy4cyhFMmYB0hMPOX/lgyvHhkhix4jNw6oAIM+b2dyIzsOtFO0sZHaOSmsXxpNbppZdXwY04iqpjAPDDVwFtybQ5mQIIcpVp8zWbQgutGEEx9Bjt5I8YPDEc6YtJt48XhwKvbnT0HYmFmUBIvvmjMU4YzpESKGjY9ms+jDSSAcWxern1d4aP1wDcnZ5aKhXwaPJ+BMIWbqeKhrcuPwwaCjl62j050ilVwSJiIeTbAnWS/Orl42PbGf0u54Ntwkev4sJMWHc5jw1xxzH/O3UAhVbFVRgl/cNMnbOSQccHoMfN5opLV9kKWXWrEYvLz+sUL5K0dpbj2BEpztLE4yVebef3Zzx72e4Z6bUSm1XofEq6/o+W2ZAYdDjIO2cuuKFK7PTaTyzQ5efb1eJZwrF/gjnIVzRg1gE8GMT6KvF17YrvDiO7La/Jlkk/jHr+tZsUCPRXjphIgGhIvBznofz9R4+NLuG+OlFrweBoOedd+by7eulom1hja2hpHkjhYETPCixq2Yyc4bvfyfX7aTfOdMNuT6VS6Ohi42bj3Cw7vlkRHBZBCOeEj9vp4t8ZmUrwo0KqoktJfC6mD+KILiwhjqyu0hfRsRFOTbRti1XAiEozaMfhZNxVCz69iUWt5NiVjqfRT8aFhEMSZvL9I4pUk4Xz7FA/McEE4weln96MhGTWJiKC5IYv2K2KG+EJFGHRY3BOTXMydTpRaGcMT6D1VQhku7TfQBrN5LVtaXzhmONsek3WLZvCmLnA/OPeFsTu5m9ZOuYXUYowQBE7zXyUhi+/+TiP2Fs1svzqYu1v3iMGUjRDtm8lclU7oqoCJV++0CKeDA8RUUzaM80NQ70UM+k8+dU8IRB6BIBrW5U7hj1ttN/MfTnez+9OiYY0uYplC41s13/8k91O0/OqXmccGHO/U88biBujq/Si17eiw5s6dy8HAP+w92qN5ry5fA2tsVZqSPJByRGhsYgL0H/YTz0ZeKOrzz2vk6CpfrmZ00tvGztUvhf3a62V7nCxvdiDEFUZEWFs6PZ+23E8hJdWGQRnqpCaVQwVtGfx1gnOK3H5AYHvrBVLJO9FFV47fq8G968nKnsGiBjW8OHuMHR2z+B6CIbEYrfmanUPNgqr+JUBDblj3cVxPcT0hzWrgazqg3z7ARTqAwXepLHi68C9HAG4eZ++RI0UBWXraq3LL1Oql5t5mVATVd0K4lz9c1UhYdZjzB3zel5i9eF1Tp2fSvw42Z4YreQvpcE5yVEq7OM9E39LMlnP5Bqt5oY115F3GLo2jY3TeqQDxSYj1axaZG0XdaxogbxqqcAoXt5f6XnpM5DYxuMB5bK4S45dOpCa7pcPiNl1Ib3ZgslvooDMeQ/ySm1DZn97HuVz0sXTf88jGeLU7BndmsjnFRs7vT71sY2LIWxpM3I5b134wKU7MalVIbb714fNTuslNa1kpNaiw5dT1jBh2GqjXHXF9B8KLBO8Sh4kwI5VTfOeeEE/xBHwa+aLLw081NNDV2jjmO6FiFVbd7uP//dvv90sLUcEQfTluLjj/8Qc9LLxno6wODQYeYyOnzyrjdXpVwrr4cvlcgBqQJO0G/DY4YVdDWDvsb4KO9sLdBoW8AZqZIrLlOzzVz9UQI24Gg47QsqX//86de/viJh+Zuv7hg9JacHMOKqxNZfpWNGIuXhFgfMWaRUhuu9Tgb2inc0sfqkuHcvKOhg+JHQvojhJXH2tls+bo/7y5qAEU/OcLWYMPl/EQ2r05g6ocNvJCWNfT24TjQSv6Dw1MzR8hL1cmWwtrC78vl3yIouieN9Yuh7KmRTgOjUx1hCUe8fdY0s3qHmbLi4TkxqvRz4wE2HQreNYmU35/OGlEEFt5czx/ghhB1mehsf+UOPb96++TzcP7ehKO++T3WozoMDI0ocA6ytfwwhVWBfqCMRMpL0lkzJBEfK/uNW57N7vui2Dm6CHwaKZJT3bxiTZU8dkSt6z11j1Cb6agVDcQjJNcxbNgwMzDF1F+jGlHAFw/2+21jagfqNfxTIyufFc4ERgoKs9iYPxwpTZxw/DLhDb8+wMNDPn4xbPh5Ng/ND/RTCacF4fOn9tX4t6QVM6m9Z2wRXajwtj57kMI3gspGPQVFl1AmZh2p6u8wykdB/qVJsO3ciwaemu/h4V820pY/e9jmJoyMftFN2ZTfE6itjHYsj4vloXtSKFlipGqUqnFCKVjxe/99gJJdkawvTqck1wJ72ijYEGguDWBasHYe5TcFrIlGR4FnWUs81VoN/n3SCEeMiW7oMPHLrd28VxMiwA/8sjDqFD04QqWWNUNBlEBGRziChIJOA4J0anbq6OsXgurhTaTUkhNg8TxIT0K1rhkYhK5uaG1HNe3sCrQ8CPPOlVfpWHFZwLwzMIBN/R03fHxIprzGw56j8rj+aZctSOHH9ySrU0Ar3+ogIz2WGxe5iYsIiXKcorHrMDVXjHQZcNr7qNo3QINHz6KcOPICTZ/qzf1i/SjZtJniH2Vx5RdNvDo7e0RBtOQXgQf9whS2rU32N3oZQ6xwRvUhQCybf5ZAQ0X3CGubiRFOQGa6sYvFa4e72cUVcPYOUls3QJvFyqKZEUMz4UUT67qfH6YsRJgkyOzDPBc/fu38JhzUa1dP5cxsKkJlyUKu3DJIg1PPXOFjF+w9HeUSEVyZah/NdbpTy43PIsIRgoF1j9pJunvmkCRYTa8d6GHnUS+DAQfl3Ixhq53Kp/ePEEAEi9VCTVch6nSBCGboDvP4cOr0WEQ9oldHVkBleTqEo+5LOEXv6aPBZyRnTtQIZwkRQeZvCOPbtkI/ViYs9iXql3W91HZBUlYUQ+cXjLzE2gv60gnvOEH+a+NoqJgEwlliUMeUF3cnUhHsH1PPd5Dq2j5qeyErI4q8nKCZqBBvNLPyUb/9TnAbT0Y/IcJRU/aH1DU7lPYWqXd7L9X7/Y4ktuQI8mYPH4NoGJ67JeQGFTXHR85cvPJ3JxzRcNnvNrBjr47fVbZSd/D4CJWaIAq1D+c+N7fe7hVO5WEJR5DQYL/Eni90vPYnHR9+pKO7WxohVVangRpBjJwW+/X5UMdECxW2iFIihTFopsQNl+n42iU6EqNHjicQEz/3NMm8+KGXXYd84t4YdxPOAj8ujEcymHnm1W6ys2zcelU/UyJH1XF2NLGyAkr/13A/R/idBny7Ruffc1LY/uMk+PMBSkUfSVCSrD7pPTQ4BNEascguKl/rIfnriUPh8JgUkOh5WB9LzdYzIxzRbFf57EFK+qexLehNNR5CIhp45iCFb4WCqGNN8dyxTgPnYUpNfWDvaOKGMi/rHzyVjc84185i46lHwjfyTegBMtG7V6SiKutZJ7zFgo4W435XOF20UTjqrTcnXwhTotgXbCANXWch+2rY1ch9n0TxVCCNeNqEM85xqdHPYwcCfnnBD8Wy8dEZrM8YW1s6KTRi7T17KCT6EZ/2r72y5abJafzMNfvrIb/oJOe+US0FYQ5WrbE8MpIQxQvheOc7sfUSWIcv+ih5IGM48h4P85YuSn5xeKTbxoWeUhPnKvpyxNhoYdT53Mv1IwhH/F2Ydl6+xMfa+91cutCnpsNCGz+D5p0i7eXslzh8SGLnLh1/3S3R2CzSZhIut59UQjcRA4k+n9goSEuQuDRb4so5EnNSJKItIwewiTpRXZPMSx/72HlQplfMv9FJZKTFIoaOHmvvU1N3YhOuAnfeMp01K0xER+iob5GIjdaTHDuIUTeqk1vYVzz5JevaEyhfmzLSRTh4sGretZWSx0KL7f4/BsNfxyeN5L+AOrFyjIeYeLt+u5GCJ7uYK2zkr4kiy+il9t2WkbYpM1LYXhxF1W/PJKXmPx5HQztFP2ukYdkoF94Q4IXVTfmLjdz31rCNvfrnrCTVqym3fYJ9OKVJzO130+32UFN1ZMjGR+wq1EDy1M/lkX04FoeLuqM9bPxlY8BCSOxhZB+Ouk9x7Z74knWH49i8Lj28m66onVQfo+SZQF9UyMEsvXMOVaLzfyLqr7OIcMRPOrv8qc2qzOmU3xnPonCzZYRU/X07xU+EplrFt80U/2SO6qigCjoeHyB/bSbF80e6BzsOdFDyqyNUzBGRgqjRuWho6aF0Q/OwyWuIW/TIGg7Ya+1s7o6hZPlI2bZq//L7+hAPOT+IScuzqV47jsebvZtN78OaVSMNMoX1UHlFM/dV+U1AhzbhVfZgOgXxIdY2t0RhcbpoaOpl0+YjIQX2YQ+7Eb10iLlPfZQ/G7TTEXsPqY+q7hH15L4AD92fQckVo0YjqAcjY6/rYoNwvwimoQMHmbQim5qieLKYgKfdeOtFpBrFi97RWCrWBpqIR98gqndhFxvKGv2O1aFr9rY5I19qT31zndEnJi2lFjya4/0Gtr7t46mt+8MeYJxN4Yabvdxxt4esbJGIC8ynCXGL9g9KE+lZiR6HREODxOHDEi1tEp2dEr0nUKd9Cmdpswl1ymd8rERyPEyfJqljpm0RUmDfw6MMhBHoF0cUtn3iY1e9j57AczJ7uo2Cm5KIjjSw87M+9h/qRaeXWDQ3jluvi2BOsgej3gfC+FNlu/DWN6qD7MZ6tjTA0mWi0c5CsknUOGS6HQNUv9NOZRhPr5ybstl2T7xfWRR8+HVOYePKKeSJ9IhIbzQOULOrnU0hxcdxV4DI03/PStl/HqImPo7krrESbPHd8DWc4F5DnXgjWFMQT16yHqtex6DPh73eweY3Ag1lIw7Eyvr1s1SFnVM09z1yHNsVUSTrYbC3j62fhJ8VM965nD7h1JNbHvR0C7fXMIQT8OsKXrukxQmsWxRJUqQO3B4aDvVR9Vb3COv+oT1fkU7ND5NYKnoyVDXffta3RZBrHaAyXOf/WRKO+F1hD1T8741sdVgpyJ9CXpYRm7gu6rH2UvnW8EycUATilmVSHYyMxOye5/yS6Zxc0ecVQZJOPKC62bRj1EM8HIzjEs6wSm1pXiqFwgq/383Oz8dxQoi0sflnWRTPGMf8NFAD270wkZIlESTho25/D+Xv9oaZXWOm6P5ZfgPWME3EY08jlHBOMQ8nlHDEjvoHKXtmP/dVexBzqYqviFQbu634JdE7a9sp2z1yTIv6+7NT2FYi0uJB1+6zWC+OXh7esp/S3SOfN4M+GcfRfqp2dIyZWqoeQ2oC5SITE6xJnhGVTOxLk0w4Eh0nDDzzuofyP6oe82M2dcJngsL1K7zcepuXWTP9IwRCxxMECSdY4xHSZSEMEHNx+k5IDPRJuJ0g+8Col4g0SUSaIcIkYdFL6NXpnoGUXWBujpgC+uGXMm9/KrO3WbhIKyptpCbHcMfKZG5eaiY6QqLpmEzLMZcqTsgSUx7jvBh1E5zwKR5c7b1s+f1hSmrCLLYweFiWpLNtbdKIJrKxRdeTXFzVYXrk34W8enehhdpXmykaZ3jbqQlHfMI/l6dkcwuVJ/XKCP6+mTVrs9ny9YDHVEs3JZvr2RJ+KfgtXvLi6K4Wg7rCb6dHOOBo6maLGBb37njEFp5wxK8L3Df9voHSCV67uCXpVBQlDo+ECIg4irf45x2F3c4B4aik09TNxmfGRgvj/WzcklQq7k0iL9R52+misuIIqytPRtDj7HEChHPKR5I+lg0PZrF+0fjjHcL1B4Xf79gZSvZDXapppWqoGXYbJhw1Wt/WSskr4YcdjohwgvsSc4leDs73OeXZQlI8T/04kyJBrmI7F+uld4AykWUYHemNdzhJ8WoUXxwckTCBwz6bj0wu4Ug6GjsM/OL3vdR8OFY4EDxwUXeZEq+Qe62Pm/K9XDpfIcoaMoAtEOGMEBWoxBGIhgKGnUMD2ML8TRCOmBba1w+HWhR21Sl8sE/mSLuCyJgJyfX0jDi+eUMiN3/NFOIc4G8e9Qcx45t4nvQiqE2axymvOc7D1ePczEk21t+aSPE140zhO0kKx//bVoqKMngoL4bkfjH22ekv8qZZyEkdNSTtTfvwjSQmQ6pz28U0y8QxaY9w56UO9KrpoKyinapxiEdMMS1dFWZSpxiU9XGX6qQb6lYrbHUKVsRQeGsyBdEeqms6qTwgRmhDXGIEOfGSOpo5OSuO/KDY4jRWvqOhh7LqLnb367DqhbWQhUUizNIbWLzQxqLxusTVNISDyh3tlFaP86afk8CGb4wzaVUcY+8gVTuGB+2pUxiXxZFlAktiNMWrTt4ZPuHTDGBb9nYrWz4Lb9bpnwo7laIrwkwoVX9Ixn6oh/J3OthS1TPSP068EOQnkRfpoa4rcC9Em1iUZsRmMrNoUQw5zrFzl8Y0fo45ISP5t6Sy/sZ48kIdFybogDB6dznLUij9RiIFYQeLiYmYPZS908Vup0Fd9+j1ZGVYSIo0MHd+rN/xPLA5hNDn/U62HZWxiuyEUU9OpoU4i46smXHDlv9D3xD4naDiwy7KKrvCR8FYWXNbMutW2Eb81tAuznq9yDTUdbO1+iRrNjGW4vwEiq6JDZ+GnfCiO70PTjrhNBwz8u+/6+XjTxpPemTimS7sbi7JkdWJn1/7mkxmut8VQFKnfo4SFZwG4QiiEUPbDh9VqD0ItQdlDrYoOPrV7BZiXDAAhGsAABdCSURBVPTMbBvf+noieZcbSYh2q5NKJ2Nzivy3Q8bpdFPX5iUu0UqWzUjWqBkh4/62mC3f0MfONjeDqt+WjuTECBaHTgCdjAMfZ5+OrkHaehXa2gexewxkpZpIspnJOtWcenEeXV5s8ebhCZB/w+M+o59yeqhrF2auHtq6ITneiCUm3DTRM9r7Of3S0Drrd9Pm1pNs0xM3xr/vVD857JAhiu+2cO4Fo3cxoX6v6dTcHoXFLQq5hvHX/kQIJzWRipIkctT7VUdy8nm0nsQab3PjVP/twhlpJiveSNbf8hgDx+A4T9bs5BIOEo5BA6/tlHj+tWaOdfSh1+lUE085xHUgdM2KYn9Cosy8eTKXX64wN0chLdkf8ehEaizoJn0KwpE9kih/0HUcjrTAvgbYd0ThSJvC8RN+FZvYoqLMXL4wgZuXxXLVHAlbpHfSyOZUt7f2dw2BCx6BCRFOGAulcCc+QcIRAwLPxhrogsf8AjqBSSYc8Ck6OnqNalTR1uGis0fhnQ87aG0bP08soh2TSSEhAaZPV8iarpCZppCaDInxEG31t51IKgGBIoa1eSTcLug9IdHRKdF2DFra4agdmo9BW5e/8TNo52Y0GpieaeOay20sv9zK7FQfVoOos5xh2uwCuujaoWoITBoCgnAeO4ZtVRoFyZIayde808y6oUbNU4lTQo4s4ONXkZFG6UKTWviv+7yd4me7hgUC56gGNml4aDsegcCkE474NWF141UMuL06jjkkXtzez2tvNatRji3OSm+vi0Gnh+hosyr6cjiGZbViBHVEhCJsoZgSB7HRCtGREGFFVaTpRBnHK+Fy+uszJ/r8/zhOwIl+GHAO9+OIYxHps5SkKK5YGE/uwggWZOuZGu1FP8qeRlsnGgIaAmeAwEkG3AX3dnI15CjCeXwPhe+eJL2tEc4ZXKS/31f+BoQjoUiqbTOS4sHj09PYaWDPIQ8+WSE2ykB3nz/6mBIj4XQr7K4b4PO6bjo6+/B6xhY/9Xp/k6cgI3XctAxer59YxP8evUnC/yzKQnpqLAsvieay2SYuydCRZPNhFvJmLar5+61A7Ze/WgiIUep1XWx5rYVNn4RXZk6YcIT6rqWH8tftrKsaJyOiEc4FtX4mnXAGvQYOtUfgcnlZlO1Gp3j9EQ/CWkBEKAoeWY9XljDpZbW20toF+xu97DnkYs/BfhqaHAz0u5HDsUk4uMV4aUnCbDGQmhLLnKwo5kw3MzPNQFayjqkxCkZJ3AyTIwy4oFaAdrAaApOBQIB4tu7qp80SUAQK4YHNTE6qdcgiZ6I/rRLPOw5qnQZyMvyDzawWMzlpZrJCVJgT3Z/2ub8PApNOOH0uI39tjKa/z803LheEI6QpJ98EIYnR1F0ndGrtpaXDh3Bxbm5z0dXtpG9AViMht1vB61MQDs5mk0SERUdUhI74KRZSp5lJtsG0KRJJ8XriYxQiTT70Q3NrTnUU2t81BDQENAQ0BM4lApNOOF5Zx/F+E16vTLLtdBVgIh3nr//0O3U4Tnj9ZOP114PcXkn1TVO91AxgNvqwGn1EWnXERhuIsvjU0QGSIiIZTQxwLheOti8NAQ0BDYHTRWDSCcd/QEGH53Px0PfXhEQUpCiSSiNi75IknNtkJNVS4Fz8zulCqX1eQ0BDQENAQ+BkCPyNCEe7CBoCGgIaAhoCFzsCGuFc7CtAO38NAQ0BDYG/EQIa4fyNgNZ+RkNAQ0BD4GJHQCOci30FaOevIaAhoCHwN0LgIiUciUGfhc5eHV4Z4qMhyuRSu4O0TUNAQ0BDQENgchC46AhHkYzUH7Ow/aMB9hxw4PHIpCZHct1VNhbP8BJlFIb4msptcpabtlcNAQ2BixmBi45w7H2xPFvlYOcnrUxLHMRiUjjaZiIyIoa7b0ll2TwfFv14A5ou5qWinbuGgIaAhsDZIXBxEY6k4729Fn7zYivJCXZuvVmYh8KnX8ArbxjInp7F91dFMCNJc40+u2WlfVtDQENAQ2AsAhcV4bgVK1vfdvNa9VFWrXDwzW8oREZAeyc88YyOIy1JrLtzGkvm+LR6jna3aAhoCGgInGMELirCae+L4L9eOM7hoy3ce6ebpVcoquP04CD8/kUdb7wTyV0rM1l1tZ4oU3in23OMv7Y7DQENAQ2BiwaBc0w4ErLOhE8xIoxmxIwZvTDrVMLPVz8dlIWdjSyJfRsQhjZ6PAEj0IkW+CU+a4rgNy/aiYlu5bt3yMyYrqjjDcRogz9vlyivMHHj1VncfoMZW8SZEY4iGfBJJmRFr1ruGCQXkqyl6E7nWmuf1RDQEPhqInBOCEdGT9dAJJ8fdNF8zEOHQ8bp8hEfZ2TRHDNXzZHRK4FCvKRjwGvlsF1H49E+9HqJ6WmRZCfJmOgfg7KMgVaHidoDXnXfx3t86HWQmWLmiksMzEz2olP85CBI6YTbyuFWhRb7ACaTnux0K+nxXkw6D398z8fzf7az4tpuVv+DTGyM/+fE4DYR4fylJpq7V2Vy8xIdVoPf1brfF8XhNmi1D6gjFuLirOqog6mRgyrpBTcXUXzZpFDf7KKt08fxXh9GcW6pRm68ysIU64A2uvqreQ9pZ6UhoCEwQQTOinCEgabDFcH2v/p498MOjtpPoChezGZZNdN0u/VMiYvmrn9I4vqFCgMuPbvr9bxV08XhphP09g4iSRK2uAgW5tj4xrJY5iQ70eNGloz0uCzsPuBl2186aWh2oNN5MRoUZAU8HgMzp0/hthuncPlMmRMuAzv3Kbz3cTdHmk/Q1+dSxxZMsVlZsmgqSxfZ+PO7dj7+vImiNS7ylimIQW7C5/Ovn0n89+91RERm8k8FcczNlDneb+azQ/DB7m4OHu6h94QTn0/GbDaSnCRk1AnkLdYRG6nwRaORNz5w8MWXx+nrc2I0yRgMiupk7XQaWJ6bwb35ZuIjnBrpTHBhah/TENAQ+OohcMaEI8jm+ICF/3nTzfb3m4iMGGTxAg9ZGQpTbGDQQ/0R2PaWmczUJO69bTrv7urg/Y/a8Xj6mJXtYXqajE+Gg4f1HG40Mz1jKt+6cRpzMgx8uMfF7j0ODjX1INHL5Qs8XDJLUaMStwc+2yOx668WLpmVytLFU9mz38FHn3aImETdd3qyjMstUXdQh73dSnR0FMe7nWSm9fL9u31cmuNPxXUdh/IKHX96Q8fMmRkUfjMZWfbx1o5jHDjci9c7yCUz3WSkyZiM0OWAPXUGTvRFcOPyDHX2zvb3W7C3O5g9w0XObJmUJP8YbKcLXn1dR31jFKXr5nJVdh9G3dmnF796y1A7Iw0BDYGLAYEzJpx+t4GXP9BT/sr/396ZAFlVnXn8d+59a+9003Q3DXTT3YA2sgtBREAQIwgJEqOMK5jR4JhxxlGrJpVxpmqqUqmMU9ZMKpWYKjMOGoISQ3CDKCYgKoiiyCZLd7P1xtILvXe/5d6p7xyaJpqp0JQpFM6p6uqq++4999z/e+/83//7/t85lYws6WDJLT5FQ32iEbP9s+RGqusUP3/W4eNdEQry02hv76CspIt5sz1NHuIQE4VRd0Kx8R3Flu1hHDeLARkhjp9sIeD2MDg/zsxrkzrBn5ZqiEwUTv1x+M0rDpu2RAgG5LoYo0f1cMOMJGUlPqlRs930sVrFH99RbN7q0tAEi+YluevbHvmDzOubtyqe/bXD/kpFNBomNzusN3ULBLoYUx5n/GiPq66AAQNkozeIxeDwUcVzqyUkmILvu6REOrnl5jhTr4bsLJ9wGB32k/7Xrnf431Uu3102hQUT2ogG7WoGl8MXyz6jRcAi8HkELohwRN3UNYd49Kk6gu4pHnkwyRVlEJRdo30zKbe2wZ79il+udKg4pMjOUsyanmTh1z2GD5PtYfsGI0n76jp4eb3D2vUBHQqbMCbBgrkeQwZDXq5PRvqfDj6egFd/r/jFcw6hoGLuTI+vzzakFwn3nSvnHTkGz6922PWpYslij4U3GrLr6IS3tygOHZWwHsg+be9/pKipg5vm+Nw4y9f3lrEK2ZzN18TMWH/1G4e2dp/77vD0+TkDzHkSSuvsgsZm+PVvhRRDfP+hicwsbyfsWsKxX0SLgEXg8kTggghHTAL761NZ/sQObpgZ57GHPK1qpEkCftN7Dpu3wpFqRV29IhKBm2Z7LLnFKAuxIn+2CUG9tkHxzPOODpvd/W2P+XN9HcYStSR/5zYhttfeVKxe6zBtis83bvLIy/3zfTefNoSz76Dijls9fb4oECGGtnbzPxQyiuT1DRKCk/H6jCozeZ4/1z7Zo3jqZ44O7/3Lox7lI40Ckra/QrHuLcWBSqXV0JgxRTx6ZzZDs7twkN1HbbMIWAQsApcfAhdEOEkC7KnN4O+e2KZDVP/wgJgEDHg9Mdi1V7HyJYcPPjYHx1/l8/f3JxlV1qcUejfl7L2upRVeeUPx7CpHT97/+F2fsuEmz9LdDYdrooiPbXRZO5DUKkom9YNVikXzPUqHmzCWNOn7XIISwln3lqPHJqplyODPW6mlv92fKj2GSeN8Zl9nQnj/XztYBT/+iYsoqCce8xhxZqxyvoTutFpb59DeFeHHj5czeUSPdsrZZhGwCFgELlcELohwJKR2uCGFB/7tAKXD2nj8ex5Dh4CjzGQv4aQduxVPr3A4eUqxeIHH0ts9rXQSSTjVACdOKkqH+6SnGeglef/SKxJSc5g7y+Nv7/bISEObCg5WKt5536WkWDFnRkLX4ZxqhE3vKq1MJJQmeZNkQuzL5v6FBZztW9SThOwkkT84/09VkIxXQl+btyje2OhoRbPsbzwmju1zsQmBiBISBSWhOGk7ROH83NHPsnypp11v8ixCdKKU5PiKFxzefDvAY8snMHdcJ5GANQxcrl80+9wWAYsAXBDhJDyHncfSeOK/D9Ha0sTXJnl8c57P2PIzRgCgqdkQyMb3FMvv9Zg5zddqYN8BUTIOmelwz+0eWZnmbag/gVFFO5QOp82bY1YBEGJZ85ok6CXM5nPlSF+v5XywErZ/ohhZClePFws2bN+peOttxYgSn5vnGkebNJn8JUw2KNeQRm8TYqg4bJxk721TnGxQXH+tx313epQUGfKoqVesfllpMrttkUfREEOqr28w+an6E4qiIT4LbvSYNc2n4AyhyTlCuj98ymXiuFIevjVMdqoQzvkWqtqPp0XAImARuLQQ6CfhyD4yYTbvS+HFV45QefgU0XBC/+ofWSqTrs+UiaZ6X1TGxneVruD/3nfElWZIRXIpkv9YfLPPN+eb3I9MzpLvWfGi0krnwaU+5aN8fVwS/es2KEaW+ZqEUqJSgwOb31ccqFDcMNPX9xZjgvQtCX8xBoji6M0V7a8wtTblo2DcVb5WYtJEtQj5vbxeUV2rtGngWws97WIryDNL3rzwO1FdiulTfO66zRyXPJWYFd74o8TwjKlg0EC47hqP+TcY84BgUFcP//ofLhkZRfzgvgHkp0vxq83hXFpfIfs0FgGLwPki0C/C6Yk7bNgZ4WcrD5GIdTDr2jjXT/cJhyR85TMwh7N5D3GAbdikeHOT4vGHPIYXGeeaqBL5f81kXysOmftFaUhC/7nVioHZ8OAyT/cjdSy7PhV1orQtWl6TiVxCYC+sMcn9ZXcYNSILcAqpSH+Txvvk5vRBsO0jxZ59iq9NMkQmOR1pco+m0+Y6MSB8esDRLrpewqmtFxWjaGhU2vAguR0J3UmO6qe/dLRJQM4XEhIizB7gk53VF7KrroUf/NAhP7+Y79+byaB0Wb3AKpzz/XDa8ywCFoFLC4F+EI6iuSvCk6va2bu3iu/clWTCmD4SkMm3N1EvykTIYMWLjk7Ei6lg8gSjWCRxL0pCJm5pco1MwR/vUqxdp7h2ilEyclzyNx0dhpAyMkyOSMJy27YrnlnpEI34PHCPx4Qxxmkmfct14mzr7VvGJbU2kksSksvN8fnDZkXFYcX0qT6jR/l6LbUPd4hCMvbo++70dZ1QrEdqhAwpCjlGo9DYCKvWKMJh05+sxyaE2/v8vRjI2EXh/dfTkpMazf3zfTJTbA7n0vr62KexCFgE+oNAvwinqSvKj1a0UHX4EP/8cJKx5XzONiyTtyTuJVT1+puOzq3Mmu6xZLHP4Dzz616sxMeq4UCVQ0GeIa0tH5oizXtv8ygp7nuEc91sQioVh2TCl9yQo4s7b5rjaZWRN9CQjaiiA1WKmlrF0EKTyN+6XWmiuf46X5Od5F42nMn1yJ44Y0f7VB1R/M9KxdFqxTfm+boGqFeByWik2FSU1u/WKZ3vkeJVyVuJqjvXESfj7epGO/RW/dah+nga//5IOVcPt6sM9OeDac+1CFgELj0E+kE40BV3WbslwNMr9zP2yh5uXehTXGTsw4m4hKcU+yvhD29L5X6Q3NxsUiIOFVUnGJjtkZ+HVgOnT8OJU9DZrbQacQOiSnzmzPC45zZjPBBVI5O8WJ1lQhf1IoaDNa87fLI3SmFBjl6C5kh1AzlZCVOD45oQ2clGRU+3qa0xhZg+0yb7zJ3l69dlhYLKIxFcxyMtJaZDYpJzqjsuNmeXaDRJybCkzhtlZZixSMhO3HLV9Y5WXfmDPBbN85gySYpDzb0ljCh1R1s+VGzaokh6GdzzrWLmXe2THolrd51tFgGLgEXgckWgX4Tj+4pTHRFWb3Z49fcHCbrtWp1IqKm3iLK5RSbsTGZeU8iC6REckmzd5/DO9maamju0wgiFAhQWpFNanE51bRvvbq0mN7ud++82bjYhCVFJEmaTyV5WDthfpfh4p6K1PY0ZU4eyaFYavufx7h6fbTubaTrdpWNz0UiQ4mGZFAxKoaklRktrjNq6FhobGkiJ9BCLK5xABgvnDKOwIJVtO09TdbRNr24wdcJAriyJ8sm+Nj7a00jz6Q4S8QTKEft1iOwBacyYPJDMjBDrN9ZQU3uSrIy4XgVBiFHUleSHOnsilA4v4PZ5A5lY0kN6KKYXM7XNImARsAhczgj0i3B0aAmHlq4Qu48E2Lq7i8pjnTQ2dxENBxicn8qoojATRwUpy4+TFklqC1p33KGjW9GdDOP5iqCbIOLGtLrZe9jjJy82k5N5XNfzyEoEQl5iLnjmVw5HjimUI924FA3NYeHsfK4bq8hN69F6oTum6Ohx6UmG9B48QSdOJBAn6EoOyNd5oFOtIT6qUByqi5MShnEjgowv8UkLJ+jsgc54UOeH0iIJwgGf7hg0d4ZoaHNp7/JwXEVmqkNOapzMaBzXUdQ0BXl/X5LdFd0cq2snHpftGFL0dghjR4QZU+yRl5kg6Catsrmcv2H22S0CFoGzCPSbcORKmdjjSUcTSXcioIs5ZcIWi3PYjRMJegQcoYNzf9VLQMn4kU1oycdXDtsPwJPPnWDMFY3803JPh8HEdixW6FVrowwdks/UiYMoLXQpzo2RndpDNPjZSfzzfZ/7Hid9RU/CJZZ0cZSvCzCDrneWCKSQ1Yyrz7Isx4SsJKwnoxYF5Ki+azxfnt2hKx4glnC0ISLg+oTdJJFgklCg71z7ebMIWAQsAhaBCyz87AOud4Ez+d9LLucfOpLdMbftgydX1DJ5XDMP3+/pBUCP1ShdpV91NIdliwuZdmVS74MjJHYuKfT/Dewd7/mP8S/fQ/r8bL9fZP9/eQT2DIuARcAi8FVA4IIUzhf3YIo9Rx3+c2Uryqth6RIxFvh8uMPhpVdDjLtiMI/clUtWuO2Lu6XtySJgEbAIWAQuCgIXmXCgtTvMax84PL+mioDTpqv2W9sd8vMGsfSWwcwsl10ybf3KRfl02JtaBCwCFoEvEIGLTjgSJDvdGeaDCpf3dnbT2ZWguDDMtKuCjB4aJ+xKdb5tFgGLgEXAIvBVR+CiE44A2GtC6EkGjYvNSRByE2eMB191iO34LQIWAYuARUAQ+FIQTt9b8ddI6ts32iJgEbAIWAS+DAh8yQjnywCJHYNFwCJgEbAI/DUQ+D83TskkS3LocAAAAABJRU5ErkJggg=="></img>
);
export const logo = (
  <img src="data:image/png;base64,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"></img>
);
