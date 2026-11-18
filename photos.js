/* Photo for each drink, keyed by recipe slug.
   src: Unsplash CDN URL without query (sizes are added in app.js).
   match: 'exact' = that drink; 'stand-in' = a similar-looking drink. */
window.PHOTOS = {
  "sea-salt-latte": {
    "src": "https://images.unsplash.com/photo-1738704772924-42239b1b36cf",
    "page": "https://unsplash.com/photos/qvuoYgFoqJY",
    "author": "Kyrie Isaac",
    "license": "Unsplash",
    "alt": "Tall glass of iced coffee with a thick white foam cap and caramel streaks on a dark wooden table",
    "match": "stand-in"
  },
  "iced-spanish-latte": {
    "src": "https://images.unsplash.com/photo-1671759545218-831c32bfe92d",
    "page": "https://unsplash.com/photos/ZwnAW9dFAuI",
    "author": "Caramel",
    "license": "Unsplash",
    "alt": "Layered iced latte in a tall glass, milk below and espresso on top, on a wooden table",
    "match": "stand-in"
  },
  "brown-sugar-latte": {
    "src": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5",
    "page": "https://unsplash.com/photos/vZOZJH_xkUk",
    "author": "Nathan Dumlao",
    "license": "Unsplash",
    "alt": "Close-up of a glass-can iced latte, caramel-brown coffee swirling into milk over ice",
    "match": "stand-in"
  },
  "honey-hush-latte": {
    "src": "https://images.unsplash.com/photo-1764298490445-6add12301888",
    "page": "https://unsplash.com/photos/nIZl9PuwMXk",
    "author": "Winston Chen",
    "license": "Unsplash",
    "alt": "Layered iced latte, milk below and espresso on top, with a straw on a wooden table",
    "match": "stand-in"
  },
  "mocha": {
    "src": "https://images.unsplash.com/photo-1767065702358-ec76bad61390",
    "page": "https://unsplash.com/photos/XLyWd3HsWNc",
    "author": "Diego Arenas de Rodrigo",
    "license": "Unsplash",
    "alt": "Stemmed glass of mocha with chocolate syrup drizzled inside and whipped cream, on a wooden board against a plain wall",
    "match": "exact"
  },
  "cappuccino": {
    "src": "https://images.unsplash.com/photo-1621135177072-57c9b6242e7a",
    "page": "https://unsplash.com/photos/_hnL_961xTk",
    "author": "Caleb",
    "license": "Unsplash",
    "alt": "Cappuccino with rosetta foam art in a white cup and saucer on a wooden table",
    "match": "exact"
  },
  "americano": {
    "src": "https://images.unsplash.com/photo-1731681963953-b959cb773c1a",
    "page": "https://unsplash.com/photos/USdAfJdfPtk",
    "author": "Monaz Hastam",
    "license": "Unsplash",
    "alt": "Short glass of iced black coffee on a plain white background",
    "match": "exact"
  },
  "brown-sugar-cream-latte": {
    "src": "https://images.unsplash.com/photo-1662047102608-a6f2e492411f",
    "page": "https://unsplash.com/photos/1EV6hDgDpFM",
    "author": "Keith Brian de Leon",
    "license": "Unsplash",
    "alt": "Glass-can iced latte with tan cream and caramel streaks and a gold straw on a wooden coaster",
    "match": "stand-in"
  },
  "orange-mocha": {
    "src": "https://images.unsplash.com/photo-1590080876209-c70d0f0bf6a3",
    "page": "https://unsplash.com/photos/AOoNx98hdm8",
    "author": "American Heritage Chocolate",
    "license": "Unsplash",
    "alt": "Mug of hot chocolate topped with cream and chocolate shavings, curls of orange peel and star anise beside it",
    "match": "stand-in"
  },
  "chocolate-shaken-espresso": {
    "src": "https://images.unsplash.com/photo-1515316416554-1af1fbca57a2",
    "page": "https://unsplash.com/photos/fF8F-ak1F6M",
    "author": "Dimaz Fakhruddin",
    "license": "Unsplash",
    "alt": "Crystal glass of iced chocolate coffee with straws on a wooden table against a white wall",
    "match": "stand-in"
  },
  "banana-latte": {
    "src": "https://images.unsplash.com/photo-1685967836529-b0e8d6938227",
    "page": "https://unsplash.com/photos/JfWhrxbmF-U",
    "author": "Elena Leya",
    "license": "Unsplash",
    "alt": "Glass of creamy banana milk drink with a straw beside halved bananas on a dark surface",
    "match": "stand-in"
  },
  "whipped-honey-latte": {
    "src": "https://images.unsplash.com/photo-1695924357230-13730b3c35e3",
    "page": "https://unsplash.com/photos/jGcyXExO2gc",
    "author": "Alexandra Tran",
    "license": "Unsplash",
    "alt": "Glass of coffee under a thick cream foam topped with caramel shards, honey dipper on the plate",
    "match": "stand-in"
  },
  "ube-latte": {
    "src": "https://images.unsplash.com/photo-1582570653002-8d512b39147a",
    "page": "https://unsplash.com/photos/RP7y32Tq9pQ",
    "author": "Coffeefy Workafe",
    "license": "Unsplash",
    "alt": "Purple latte with heart latte art",
    "match": "stand-in"
  },
  "choco-banana-latte": {
    "src": "https://images.unsplash.com/photo-1661529548674-8dae0330fe04",
    "page": "https://unsplash.com/photos/BpcTCHoruSo",
    "author": "Theo Crazzolara",
    "license": "Unsplash",
    "alt": "Glass of iced chocolate drink with a frothy top and chocolate pieces beside it, dark background",
    "match": "stand-in"
  },
  "vanilla-brulee-latte": {
    "src": "https://images.unsplash.com/photo-1653122025505-eb23942cf527",
    "page": "https://unsplash.com/photos/lQprr4e4cRE",
    "author": "kimia kazemi",
    "license": "Unsplash",
    "alt": "Iced latte in a patterned glass topped with a golden caramelized crumb crust, on a wooden board",
    "match": "stand-in"
  },
  "langka-coconut-latte": {
    "src": "https://images.unsplash.com/photo-1588413335672-87b35888b55d",
    "page": "https://unsplash.com/photos/V_ZxHUAxFmA",
    "author": "Tijana Drndarski",
    "license": "Unsplash",
    "alt": "Iced milk drink topped with whipped coffee in a tall glass, halved coconuts beside it on a white wooden table",
    "match": "stand-in"
  },
  "sunrise-latte": {
    "src": "https://images.unsplash.com/photo-1777699813253-4ab51a3e1b2c",
    "page": "https://unsplash.com/photos/MxI8cxWUgxU",
    "author": "光术 山影",
    "license": "Unsplash",
    "alt": "Iced coffee with a dried orange slice on top",
    "match": "stand-in"
  },
  "cinnamon-crunch-latte": {
    "src": "https://images.unsplash.com/photo-1578899952107-9c390f1af1b7",
    "page": "https://unsplash.com/photos/WoJTrgm-Mkw",
    "author": "Fauzan",
    "license": "Unsplash",
    "alt": "Glass of milky coffee with a spice-dusted top on a wooden coaster with a spoon, cafe background",
    "match": "stand-in"
  },
  "tiramisu-latte": {
    "src": "https://images.unsplash.com/photo-1793092915555-626f039fc95e",
    "page": "https://unsplash.com/photos/1f9d2TCybeQ",
    "author": "Meri Schuurmans",
    "license": "Unsplash",
    "alt": "Glass of layered coffee with a thick pale foam heavily dusted with cocoa powder",
    "match": "stand-in"
  },
  "burnt-milk-latte": {
    "src": "https://images.unsplash.com/photo-1761673930163-8d3d6d73cd7a",
    "page": "https://unsplash.com/photos/LPDn9x-F6GM",
    "author": "Hannah Reid",
    "license": "Unsplash",
    "alt": "Tan iced latte in a tall ribbed glass with spice dusted on top, on a marble surface",
    "match": "stand-in"
  },
  "smores-mocha": {
    "src": "https://images.unsplash.com/photo-1557772747-77ffbcf6b117",
    "page": "https://unsplash.com/photos/Jmo7NgH0Q10",
    "author": "Daria Rudyk",
    "license": "Unsplash",
    "alt": "Chocolate drink topped with marshmallows in a glass",
    "match": "stand-in"
  },
  "espresso-cream-crown": {
    "src": "https://images.unsplash.com/photo-1559496417-e7f25cb247f3",
    "page": "https://unsplash.com/photos/IhqDpFz7I8Q",
    "author": "Jarek Ceborski",
    "license": "Unsplash",
    "alt": "Small glass of dark espresso capped with a pale layer of cream foam, in soft window light on a white table",
    "match": "stand-in"
  },
  "peanut-butter-latte": {
    "src": "https://images.unsplash.com/photo-1585494156145-1c60a4fe952b",
    "page": "https://unsplash.com/photos/op3-8qlNq-o",
    "author": "Mayur",
    "license": "Unsplash",
    "alt": "Glass of milk topped with a thick tan whipped layer on dark stone against a white background",
    "match": "stand-in"
  },
  "jasmine-latte": {
    "src": "https://images.unsplash.com/photo-1594358652876-6d66e6e5e621",
    "page": "https://unsplash.com/photos/s8-cmAeUGh0",
    "author": "lynying Ju",
    "license": "Unsplash",
    "alt": "Stemmed glass of iced milk coffee topped with cream and a green leaf garnish on a woven tray",
    "match": "stand-in"
  },
  "breakfast-latte": {
    "src": "https://images.unsplash.com/photo-1555411093-41f7864ed3a2",
    "page": "https://unsplash.com/photos/_rdD-rNBuIA",
    "author": "Pratiksha Mohanty",
    "license": "Unsplash",
    "alt": "Tall frappe glass of creamy coffee with a frothy top scattered with crunchy crumbs, dark background",
    "match": "stand-in"
  },
  "holos-latte": {
    "src": "https://images.unsplash.com/photo-1562447457-579fc34967fb",
    "page": "https://unsplash.com/photos/02O1bXB_fgk",
    "author": "Empreinte",
    "license": "Unsplash",
    "alt": "Milk being poured into a glass of iced dark brew on a wooden coaster, light background with linen",
    "match": "stand-in"
  },
  "iced-date-cortado": {
    "src": "https://images.unsplash.com/photo-1641659736749-8bbae305e475",
    "page": "https://unsplash.com/photos/AM5WbYLL3E4",
    "author": "Aneta Voborilova",
    "license": "Unsplash",
    "alt": "Small textured glass of layered iced coffee and milk on a white background",
    "match": "stand-in"
  },
  "salted-honey-shaken": {
    "src": "https://images.unsplash.com/photo-1642647391072-6a2416f048e5",
    "page": "https://unsplash.com/photos/rzX8bOle9xs",
    "author": "pariwat pannium",
    "license": "Unsplash",
    "alt": "Double-walled glass of iced espresso and milk over ice on a dark counter",
    "match": "stand-in"
  },
  "brown-sugar-shaken": {
    "src": "https://images.unsplash.com/photo-1527156231393-7023794f363c",
    "page": "https://unsplash.com/photos/_tSgUmeYMm8",
    "author": "Eiliv Aceron",
    "license": "Unsplash",
    "alt": "Tall highball glass of layered iced coffee, milk below and espresso above",
    "match": "stand-in"
  },
  "black-sesame-shaken": {
    "src": "https://images.unsplash.com/photo-1643114453626-97ae781657b6",
    "page": "https://unsplash.com/photos/UX-CgIzQSQQ",
    "author": "engin akyurt",
    "license": "Unsplash",
    "alt": "Glass mug of pale grey milky drink on a plain white background",
    "match": "stand-in"
  },
  "campfire-shaken": {
    "src": "https://images.unsplash.com/photo-1702564696095-ba5110856bf2",
    "page": "https://unsplash.com/photos/lNucH3OumtI",
    "author": "Melody Zimmerman",
    "license": "Unsplash",
    "alt": "Glass drink topped with chocolate drizzle and marshmallows with a long spoon, dark background",
    "match": "stand-in"
  },
  "honey-lemon-tonic": {
    "src": "https://images.unsplash.com/photo-1753700281029-b3d15df20ec4",
    "page": "https://unsplash.com/photos/1YHJLJKPxD0",
    "author": "Marco Weitzenboeck",
    "license": "Unsplash",
    "alt": "Ribbed glass of iced espresso tonic, dark coffee floating over clear sparkling tonic, plain light background",
    "match": "stand-in"
  },
  "pineapple-tonic": {
    "src": "https://images.unsplash.com/photo-1689797423542-ea5e69178784",
    "page": "https://unsplash.com/photos/PXDxKz3uPqY",
    "author": "Felix Cha",
    "license": "Unsplash",
    "alt": "Layered espresso over golden juice in a glass with a mint garnish, by a window",
    "match": "stand-in"
  },
  "coconut-cloud": {
    "src": "https://images.unsplash.com/photo-1687803799209-998b907f0ef4",
    "page": "https://unsplash.com/photos/82iNgM2chCY",
    "author": "Fadia Peerun",
    "license": "Unsplash",
    "alt": "Glass of iced coffee with a tall cloud of foam spilling over the rim",
    "match": "stand-in"
  },
  "hibiscus-ginger-espresso": {
    "src": "https://images.unsplash.com/photo-1654922704274-cd34f165c5e7",
    "page": "https://unsplash.com/photos/kOoMCheZesE",
    "author": "Eiliv Aceron",
    "license": "Unsplash",
    "alt": "Glass of deep red iced hibiscus drink with a dried orange slice and rosemary sprig on a white background",
    "match": "stand-in"
  },
  "espresso-martini-mocktail": {
    "src": "https://images.unsplash.com/photo-1607687633950-c745bdb4da70",
    "page": "https://unsplash.com/photos/sui13fYo_NM",
    "author": "Kike Salazar N",
    "license": "Unsplash",
    "alt": "Espresso martini in a martini glass with a pale foam top and coffee dust, on a dark wooden bar",
    "match": "exact"
  },
  "cocoa-dalgona": {
    "src": "https://images.unsplash.com/photo-1687467110633-8e90cecd042b",
    "page": "https://unsplash.com/photos/nHAqWml1T70",
    "author": "Imad 786",
    "license": "Unsplash",
    "alt": "Dalgona whipped coffee over milk in a glass on a wooden dish with coffee beans, white background",
    "match": "exact"
  },
  "vietnamese-egg-coffee": {
    "src": "https://images.unsplash.com/photo-1751569543716-70c5fb9a8298",
    "page": "https://unsplash.com/photos/cf7poNG2RyU",
    "author": "Cédrina Laberge",
    "license": "Unsplash",
    "alt": "Vietnamese egg coffee with a golden custardy foam top in a ceramic cup and saucer",
    "match": "exact"
  },
  "vietnamese-salt-coffee": {
    "src": "https://images.unsplash.com/photo-1595609093453-ae6849030ce5",
    "page": "https://unsplash.com/photos/f5H7CisZYhQ",
    "author": "ABHISHEK HAJARE",
    "license": "Unsplash",
    "alt": "Glass of dark coffee topped with a thick layer of light whipped cream foam, dark background",
    "match": "stand-in"
  },
  "dirty-hojicha-latte": {
    "src": "https://images.unsplash.com/photo-1561882468-9110e03e0f78",
    "page": "https://unsplash.com/photos/hmLY7GiNFyE",
    "author": "Jeanie de Klerk",
    "license": "Unsplash",
    "alt": "Glass mug of milky brown latte with foam art on a black saucer, wooden table",
    "match": "stand-in"
  },
  "mont-blanc": {
    "src": "https://images.unsplash.com/photo-1789305577934-87366eea7089",
    "page": "https://unsplash.com/photos/ZD5lqf5ZOQ0",
    "author": "fishy fishy",
    "license": "Unsplash",
    "alt": "Tall glass of iced coffee topped with thick cream and dusted spice",
    "match": "stand-in"
  },
  "espresso": {
    "src": "https://images.unsplash.com/photo-1508088405209-fbd63b6a4f50",
    "page": "https://unsplash.com/photos/l59fmhtprIE",
    "author": "Nathan Dumlao",
    "license": "Unsplash",
    "alt": "Single espresso with crema in a small white cup and saucer with a spoon, light background",
    "match": "exact"
  },
  "flat-white": {
    "src": "https://images.unsplash.com/photo-1485808191679-5f86510681a2",
    "page": "https://unsplash.com/photos/jn-HaGWe4yw",
    "author": "Jeremy Yap",
    "license": "Unsplash",
    "alt": "Small white cup of flat white with heart latte art on a pale blue saucer",
    "match": "exact"
  },
  "cortado": {
    "src": "https://images.unsplash.com/photo-1519532059956-a63a37af5deb",
    "page": "https://unsplash.com/photos/eSzClaMXNkk",
    "author": "Ben Moreland",
    "license": "Unsplash",
    "alt": "Small Gibraltar glass of cortado with latte art on a wooden table",
    "match": "exact"
  },
  "espresso-macchiato": {
    "src": "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d",
    "page": "https://unsplash.com/photos/dAYJfrtVjh0",
    "author": "Nathan Dumlao",
    "license": "Unsplash",
    "alt": "Small white espresso cup with milky crema and a black spoon on a saucer, dark background",
    "match": "stand-in"
  },
  "iced-caramel-macchiato": {
    "src": "https://images.unsplash.com/photo-1579888071069-c107a6f79d82",
    "page": "https://unsplash.com/photos/1e5V69AQjgA",
    "author": "Kari Shea",
    "license": "Unsplash",
    "alt": "Small glass of layered iced coffee topped with cream and caramel drizzle on a wooden table",
    "match": "stand-in"
  },
  "affogato": {
    "src": "https://images.unsplash.com/photo-1696522692156-7340b681c3bb",
    "page": "https://unsplash.com/photos/5BDt4xhQqK4",
    "author": "Imad 786",
    "license": "Unsplash",
    "alt": "Affogato in a glass on a wooden tray with coffee beans",
    "match": "exact"
  },
  "cold-brew": {
    "src": "https://images.unsplash.com/photo-1605206319326-527391db8e36",
    "page": "https://unsplash.com/photos/Dr-qBohLjkw",
    "author": "Welcome",
    "license": "Unsplash",
    "alt": "Tall glass of dark cold coffee standing on a pile of coffee beans, white background",
    "match": "exact"
  },
  "pour-over": {
    "src": "https://images.unsplash.com/photo-1545665613-29394cee622b",
    "page": "https://unsplash.com/photos/G163WX71GFE",
    "author": "Julien Labelle",
    "license": "Unsplash",
    "alt": "Gooseneck kettle pouring into a V60 dripper over a glass carafe against a white brick wall",
    "match": "exact"
  },
  "french-press": {
    "src": "https://images.unsplash.com/photo-1708127368781-cd5f069a90a5",
    "page": "https://unsplash.com/photos/U8Kq-UbCkOY",
    "author": "Hrushi Chavhan",
    "license": "Unsplash",
    "alt": "Glass French press of brewed coffee on a pale wooden table against a white brick wall",
    "match": "exact"
  },
  "kapeng-barako": {
    "src": "https://images.unsplash.com/photo-1671187013461-5712c498d808",
    "page": "https://unsplash.com/photos/R7wgD_g8zpU",
    "author": "Behnam Norouzi",
    "license": "Unsplash",
    "alt": "Cream enamel camp mug filled with black coffee on a felt coaster, white background",
    "match": "stand-in"
  },
  "coconut-coffee": {
    "src": "https://images.unsplash.com/photo-1558722141-76ef6ca013be",
    "page": "https://unsplash.com/photos/MgKZonm06ho",
    "author": "K8",
    "license": "Unsplash",
    "alt": "Iced coffee in a glass topped with a white slushy cream",
    "match": "stand-in"
  },
  "biscoff-latte": {
    "src": "https://images.unsplash.com/photo-1568046562322-0bbc869368ba",
    "page": "https://unsplash.com/photos/5R-W-P7De5A",
    "author": "Joshua Hill",
    "license": "Unsplash",
    "alt": "Top-down latte with heart latte art and a spiced biscuit on the saucer, white background",
    "match": "stand-in"
  },
  "einspanner": {
    "src": "https://images.unsplash.com/photo-1477588993959-f93989518546",
    "page": "https://unsplash.com/photos/pU4GpDUSeDs",
    "author": "freestocks",
    "license": "Unsplash",
    "alt": "Glass of coffee crowned with a thick whipped cream top on a saucer, wooden table",
    "match": "exact"
  },
  "dirty-chai": {
    "src": "https://images.unsplash.com/photo-1555251415-4716d9d0b8af",
    "page": "https://unsplash.com/photos/eNfR6MUyjBI",
    "author": "Mae Mu",
    "license": "Unsplash",
    "alt": "Top-down view of a white mug of spiced chai latte with a star anise and a cinnamon stick on marble",
    "match": "stand-in"
  },
  "shakerato": {
    "src": "https://images.unsplash.com/photo-1663908672815-fd62829ad3f7",
    "page": "https://unsplash.com/photos/6fTdGLSaIlU",
    "author": "Nick Fewings",
    "license": "Unsplash",
    "alt": "Cut-crystal martini glass of chilled shaken coffee with a thick pale foam top and coffee beans",
    "match": "stand-in"
  }
};
