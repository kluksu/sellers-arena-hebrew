import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import emailjs from "emailjs-com";
import { el } from "date-fns/locale";
import { element } from "prop-types";

export const whiteLableStores = {
  "localhost:3000": 6,
  "sapakim.netlify.app": 6,
};
// Example POST method implementation:
// https://supplierzz.herokuapp.com
// export let domain = "https://supplierzz.westeurope.cloudapp.azure.com";
// export let domain = "https://supplierzz.herokuapp.com";
export let domain = "https://supplierzz-integration.herokuapp.com";
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
export function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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
export function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
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
    "עיצוב ונוי": [
      ,
      "מתלים ומדפים",
      "שונות",
      "צמחים מלאכותיים",
      "עציצים וסלסלאות",
    ],
  },
  {
    "לגינה ולבית": [
      "סוקולנטים וקקטוסים",
      "צמחי תבלין",
      "ציוד",
      "זרעים ופקעות",
      "עצי פרי",
      "צמחי בית",
      "צמחי חוץ",
    ],
  },
  // {
  //   "לתינוק ולילד": [
  //     "בגדי ילדים",
  //     "בגדי תינוקות",
  //     "ציוד לתינוקת",
  //     "מוצרי היגיינה",
  //     "מצעים",
  //     "משחקי התפתחות",
  //     "מוצרים לרכב",
  //     "ריהוט"

  //   ],
  // },
];
export const subcategoriesAndPics = {
  pants:
    "https://cdn.pixabay.com/photo/2015/02/09/14/07/funny-629675_960_720.jpg",
  "מתלים ומדפים":
    "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  שונות:
    "https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "עציצים וסלסלאות":
    "https://images.pexels.com/photos/2949111/pexels-photo-2949111.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "צמחי חוץ":
    "https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "צמחי בית":
    "https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "עצי פרי":
    "https://images.pexels.com/photos/129574/pexels-photo-129574.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "זרעים ופקעות":
    "https://images.pexels.com/photos/938699/pexels-photo-938699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  ציוד: "https://images.pexels.com/photos/7782296/pexels-photo-7782296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "צמחי תבלין":
    "https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "סוקולנטים וקקטוסים":
    "https://images.pexels.com/photos/1284879/pexels-photo-1284879.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "לגינה ולבית":
    "https://images.pexels.com/photos/413707/pexels-photo-413707.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",

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
  <img src="data:image/png;base64,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"></img>
);
export const logo = (
  <img
    className="logo"
    src="data:image/png;base64,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"
  ></img>
);
