/* ------------------------------------------------------------------
   Kape — recipe data
   ------------------------------------------------------------------
   How to edit:
   • Each drink is one object in RECIPES. Order here = order on the site.
   • col:    'menu' (house menu) | 'try' (must try) | 'classic'
   • serve:  ['iced'], ['hot'] or both
   • style:  one of STYLES below (used for the filter chips)
   • parts:  groups of ingredients. Each item is [amount, ingredient, note?]
       - Amounts that start with a number scale with the servings stepper:
         '30 g', '2 shots', '25–35 g', '0.5'
       - Start with '~' when the video gave no amount and this is our
         suggestion: '~150 g'
       - Words don't scale: 'Pinch', 'Dash', 'Lots', 'To taste'
       - batch: true on a group stops it scaling (it makes several drinks)
   • steps:  a string, or [text, seconds] to give the step a timer
   • source: { by: 'flair' | 'house' | 'classic', url?, note? }
   ------------------------------------------------------------------ */

window.SITE = { name: 'Kape' };

window.STYLES = ['Cream top', 'Frothed', 'Shaken', 'Milk', 'Refresher', 'Tea', 'Black', 'Brewed', 'Dessert'];

const SHOT = 'Pull a double shot (18 g in, 36 g out)';
const TT = 'https://www.tiktok.com/@flairshotscafe/video/';

window.RECIPES = [
  /* =========================== HOUSE MENU ===========================
     The opening menu. Cups: 300 ml for hot drinks, 380 ml for iced.
     Drinks served both ways have `builds: { hot, iced }`, each with its
     own cup, ingredients and method. The site shows a Hot / Iced switch.
     ------------------------------------------------------------------ */
  {
    slug: 'espresso', name: 'Espresso', col: 'menu', serve: ['hot'], style: 'Black',
    shots: 2, time: 2, needs: ['Scale'],
    desc: 'A straight double shot: 18 g of coffee in, 36 g out, in 25 to 30 seconds. Every other drink on the menu starts from this shot, so dial it in before you open.',
    builds: {
      hot: {
        cup: 'Espresso cup',
        parts: [{ title: 'Shot', items: [['18 g', 'Fine-ground coffee'], ['36 g', 'Espresso out', '1 : 2 ratio']] }],
        steps: [
          'Weigh the coffee into the basket, level it and tamp evenly.',
          ['Put the cup on a scale. Start the shot and the timer together.', 28],
          'Stop at 36 g and check the time.',
          'Under 25 seconds and sour: grind finer. Over 30 seconds and bitter: grind coarser.',
        ],
      },
    },
    notes: ['A double shot is only about 40 ml, so serve it in a small espresso cup rather than the 300 ml cup.', 'Water at 93–96 °C. Taste straight shots while dialing in, not lattes.'],
    source: { by: 'classic', note: 'Targets from La Marzocco, Clive Coffee and Origin Coffee.' },
  },
  {
    slug: 'americano', name: 'Americano', col: 'menu', serve: ['hot', 'iced'], style: 'Black',
    shots: 2, time: 2, needs: [],
    desc: 'A double shot lengthened with water. Unsweetened by default, with brown sugar syrup free on request.',
    builds: {
      hot: {
        cup: '300 ml cup',
        parts: [{ title: 'Cup', items: [['220 g', 'Hot water', 'about 90 °C'], ['2 shots', 'Espresso']] }],
        steps: [
          'Pour the hot water into the 300 ml cup first.',
          [SHOT + ' on top of the water so the crema stays.', 28],
          'It should sit about 1 cm below the rim.',
        ],
      },
      iced: {
        cup: '380 ml cup',
        parts: [{ title: 'Cup', items: [['100 g', 'Ice'], ['200 g', 'Cold water'], ['2 shots', 'Espresso']] }],
        steps: [
          'Fill the 380 ml cup with the ice and cold water.',
          [SHOT + ' and pour it over the top.', 28],
        ],
      },
    },
    notes: ['Offer brown sugar syrup on request (15 g).'],
    source: { by: 'classic' },
  },
  {
    slug: 'cappuccino', name: 'Cappuccino', col: 'menu', serve: ['hot'], style: 'Milk',
    shots: 2, time: 3, needs: ['Steam wand'],
    desc: 'A double shot under milk steamed with a deeper, airier foam than a latte. Hot only.',
    builds: {
      hot: {
        cup: '300 ml cup',
        parts: [{ title: 'Cup', items: [['2 shots', 'Espresso'], ['160 g', 'Milk', 'cold from the fridge'], ['10 g', 'Brown sugar syrup', 'optional']] }],
        steps: [
          'If sweetening, put the syrup in the 300 ml cup.',
          [SHOT + ' into the cup.', 28],
          'Purge the steam wand. Stretch the milk for 4 to 6 seconds so it grows by about half.',
          'Keep steaming to 55–65 °C. Tap and swirl the jug until the milk looks glossy.',
          'Pour into the centre of the shot and finish with a dome of foam, about 1 cm below the rim.',
        ],
      },
    },
    notes: ['There’s no Flair Shots cappuccino, so this is the standard café spec, sized for the 300 ml cup.'],
    source: { by: 'classic' },
  },
  {
    slug: 'mocha', name: 'Mocha', col: 'menu', serve: ['hot', 'iced'], style: 'Milk',
    shots: 2, time: 3, needs: [],
    desc: 'House chocolate sauce and brown sugar syrup stirred into a double shot, then topped with steamed milk or poured over iced milk.',
    builds: {
      hot: {
        cup: '300 ml cup',
        parts: [
          { title: 'Cup', items: [['25 g', 'Chocolate sauce', 'see Batch syrups'], ['15 g', 'Brown sugar syrup'], ['2 shots', 'Espresso']] },
          { title: 'Milk', items: [['170 g', 'Milk', 'steamed']] },
        ],
        steps: [
          'Put the chocolate sauce and brown sugar syrup in the 300 ml cup.',
          [SHOT + ' onto them and stir until smooth.', 28],
          'Steam the milk with a little air to 55–65 °C.',
          'Pour it in. Finish with a chocolate drizzle if you like.',
        ],
      },
      iced: {
        cup: '380 ml cup',
        parts: [
          { title: 'Coffee', items: [['25 g', 'Chocolate sauce', 'see Batch syrups'], ['15 g', 'Brown sugar syrup'], ['2 shots', 'Espresso']] },
          { title: 'Cup', items: [['100 g', 'Ice'], ['180 g', 'Milk']] },
        ],
        steps: [
          'Put the chocolate sauce and brown sugar syrup in a small jug.',
          [SHOT + ' onto them and stir until smooth.', 28],
          'Fill the 380 ml cup with the ice and milk.',
          'Pour the mocha on top.',
        ],
      },
    },
    notes: ['A darker chocolate makes it less sweet.'],
    source: { by: 'flair', note: 'His method with our chocolate sauce.' },
  },
  {
    slug: 'latte', name: 'Latte', col: 'menu', serve: ['hot', 'iced'], style: 'Milk',
    shots: 2, time: 3, needs: ['Steam wand', 'Frother'],
    desc: 'The house latte, sweetened with brown sugar syrup. For iced, the syrup and a pinch of salt are frothed into the shot first, so it pours over the milk with a creamy head.',
    builds: {
      hot: {
        cup: '300 ml cup',
        parts: [{ title: 'Cup', items: [['20 g', 'Brown sugar syrup'], ['2 shots', 'Espresso'], ['190 g', 'Milk', 'steamed']] }],
        steps: [
          'Put the brown sugar syrup in the 300 ml cup.',
          [SHOT + ' onto it and stir.', 28],
          'Steam the milk with 2 to 3 seconds of air to 55–65 °C, for a thin, glossy foam.',
          'Pour in and finish with latte art, about 1 cm below the rim.',
        ],
      },
      iced: {
        cup: '380 ml cup',
        parts: [
          { title: 'Coffee', items: [['30 g', 'Brown sugar syrup'], ['Pinch', 'Salt'], ['2 shots', 'Espresso']] },
          { title: 'Cup', items: [['100 g', 'Ice'], ['180 g', 'Milk']] },
        ],
        steps: [
          'Put the brown sugar syrup and salt in a small jug.',
          [SHOT + ' straight onto them.', 28],
          'Froth until thick and foamy.',
          'Fill the 380 ml cup with the ice and milk, then pour the espresso on top.',
        ],
      },
    },
    notes: ['Brown sugar syrup is 1 : 1. See Batch syrups in Basics.'],
    source: { by: 'flair', note: 'Iced uses his frothed-shot method with our brown sugar syrup.' },
  },
  {
    slug: 'spanish-latte', name: 'Spanish Latte', col: 'menu', serve: ['hot', 'iced'], style: 'Cream top',
    shots: 2, time: 4, needs: ['Steam wand', 'Frother'],
    desc: 'Espresso whipped with condensed milk. Iced, it goes over cold milk under a salted cream foam; hot, it’s a sweet, creamy latte.',
    builds: {
      hot: {
        cup: '300 ml cup',
        parts: [{ title: 'Cup', items: [['30 g', 'Condensed milk'], ['2 shots', 'Espresso'], ['180 g', 'Milk', 'steamed']] }],
        steps: [
          'Put the condensed milk in the 300 ml cup.',
          [SHOT + ' onto it and stir until smooth.', 28],
          'Steam the milk with a little air to 55–65 °C.',
          'Pour it in, about 1 cm below the rim.',
        ],
      },
      iced: {
        cup: '380 ml cup',
        parts: [
          { title: 'Espresso mix', items: [['2 shots', 'Espresso'], ['30 g', 'Condensed milk']] },
          { title: 'Cold foam', items: [['35 g', 'Sea salt foam base', 'from the batch']] },
          { title: 'Cup', items: [['100 g', 'Ice'], ['140 g', 'Milk']] },
        ],
        steps: [
          [SHOT + ' onto the condensed milk and mix until smooth and creamy.', 28],
          'Froth 35 g of the sea salt foam base until thick but still pourable.',
          'Fill the 380 ml cup with the ice and milk.',
          'Pour in the espresso mix, then top with the cold foam.',
        ],
      },
    },
    notes: [
      'The cold foam is the same base as the Sea Salt Latte, so there’s only one foam to prep. His own foam is 15 g condensed milk, 20 g all-purpose cream and a pinch of salt, which is nearly the same ratio.',
      'His original uses 4 shots. The menu version uses 2.',
    ],
    source: { by: 'flair', url: TT + '7683442526837067028' },
  },
  {
    slug: 'sea-salt-latte', name: 'Sea Salt Latte', col: 'menu', serve: ['iced', 'hot'], style: 'Cream top',
    shots: 2, time: 3, needs: ['Frother'],
    desc: 'A latte under a thick cream foam made with condensed milk and a pinch of salt. The salt rounds out the sweetness, so the foam tastes close to salted caramel. Best iced.',
    builds: {
      hot: {
        cup: '300 ml cup',
        parts: [
          { title: 'Foam', items: [['50 g', 'Sea salt foam base', 'from the batch']] },
          { title: 'Cup', items: [['2 shots', 'Espresso'], ['150 g', 'Milk', 'steamed']] },
        ],
        steps: [
          [SHOT + ' into the 300 ml cup.', 28],
          'Steam the milk with very little air to 55–60 °C and pour it in. Slightly cooler milk holds the foam longer.',
          'Shake the foam base, then froth 50 g until thick but still pourable.',
          'Pour the foam slowly over the top.',
        ],
      },
      iced: {
        cup: '380 ml cup',
        parts: [
          { title: 'Foam', items: [['50 g', 'Sea salt foam base', 'from the batch']] },
          { title: 'Cup', items: [['100 g', 'Ice'], ['140 ml', 'Milk'], ['2 shots', 'Espresso']] },
        ],
        steps: [
          'Shake the foam base, then froth 50 g in a jug until thick but still pourable.',
          'Fill the 380 ml cup with the ice and pour in the milk.',
          [SHOT + ' and pour it over the milk.', 28],
          'Pour the foam slowly over the top so it floats. Leave about 2 cm for it.',
        ],
      },
    },
    defaultBuild: 'iced',
    notes: [
      'No batch made? Froth 30 g all-purpose cream, 20 g condensed milk and a pinch of salt instead.',
      'After the first one, check the fill line. If the foam spills over, drop the milk by 10 ml; if the cup looks short, add 10 ml.',
      'Cream must outweigh milk in the foam, or it sinks.',
    ],
    source: { by: 'flair', url: TT + '7518350400894848277', note: 'From his caption; the video has music only.' },
  },

  /* =========================== MUST TRY =========================== */
  {
    slug: 'honey-hush-latte', name: 'Honey Hush Latte', col: 'try', serve: ['iced'], style: 'Frothed',
    shots: 2, time: 3, needs: ['Frother'],
    desc: 'Honey, vanilla and a pinch of salt frothed into a double shot and layered over oat milk. Softer and more floral than the brown sugar latte.',
    parts: [
      { title: 'Coffee', items: [['15 g', 'Honey'], ['6 g', 'Vanilla syrup'], ['Pinch', 'Salt'], ['2 shots', 'Espresso']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['100 g', 'Oat milk']] },
    ],
    steps: [
      'Add the honey, vanilla syrup and salt to a cup.',
      [SHOT + ' onto it, then froth until thick.', 28],
      'Fill a serving glass with ice and pour in the oat milk.',
      'Top with the honey espresso.',
    ],
    notes: ['Taste side by side with the menu Latte.'],
    source: { by: 'flair', url: TT + '7700911958869953813' },
  },
  {
    slug: 'brown-sugar-cream-latte', name: 'Brown Sugar Cream Latte', col: 'try', serve: ['iced'], style: 'Milk',
    shots: 2, time: 3, needs: [],
    desc: 'Our own tested recipe: brown sugar syrup and milk with a splash of cream for a fuller body, and no foam on top.',
    parts: [
      { title: 'Coffee', items: [['2 shots', 'Espresso'], ['30 g', 'Brown sugar syrup']] },
      { title: 'Glass', items: [['90 g', 'Ice'], ['130 g', 'Milk'], ['20 g', 'Cream', 'whipping or all-purpose']] },
    ],
    steps: [
      [SHOT + ' onto the brown sugar syrup and stir.', 28],
      'Fill the glass with ice, then add the milk and cream.',
      'Pour the sweetened espresso over the top.',
    ],
    notes: ['Taste whipping cream against all-purpose cream. All-purpose costs less.'],
    source: { by: 'house' },
  },
  {
    slug: 'orange-mocha', name: 'Orange Mocha', col: 'try', serve: ['hot'], style: 'Milk',
    shots: 2, time: 5, needs: ['Steam wand', 'Grater'],
    desc: 'A hot mocha sweetened with homemade orange syrup and finished with grated dark chocolate and orange zest. Chocolate and orange, like the candy.',
    parts: [
      { title: 'Cup', items: [['25 g', 'Chocolate sauce'], ['30 g', 'Orange syrup', 'see Batch syrups'], ['2 shots', 'Espresso']] },
      { title: 'Glass', items: [['~150 g', 'Milk', 'heated'], ['Drizzle', 'Chocolate sauce'], ['Grated', 'Dark chocolate'], ['Zest', 'Orange']] },
    ],
    steps: [
      'Make the orange syrup ahead: juice of 1 orange, 80 g brown sugar and 40 g water, simmered until syrupy.',
      ['Add the chocolate sauce and orange syrup to a cup. ' + SHOT + ' over it and mix.', 28],
      'Heat the milk. Drizzle chocolate sauce inside the glass and pour in the hot milk.',
      'Add the espresso mixture and top with milk foam.',
      'Grate dark chocolate over it and finish with orange zest.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7687905648822111508' },
  },
  {
    slug: 'chocolate-shaken-espresso', name: 'Chocolate Shaken Espresso', col: 'try', serve: ['iced'], style: 'Shaken',
    shots: 2, time: 3, needs: ['Shaker'],
    desc: 'A double shot pulled over a couple of pieces of chocolate, shaken hard with brown sugar until frothy, then poured over oat milk.',
    parts: [
      { title: 'Shaker', items: [['1–2 pcs', 'Chocolate', 'he uses Toblerone'], ['2 shots', 'Espresso'], ['8 g', 'Brown sugar', 'about 2 tsp'], ['Few', 'Ice cubes']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['~100 g', 'Oat milk']] },
    ],
    steps: [
      'Put the chocolate in a cup.',
      [SHOT + ' straight over it and stir until fully melted.', 28],
      ['Add a few ice cubes and the brown sugar, then shake until chilled.', 15],
      'Fill a glass with ice and oat milk, and pour the chocolate espresso on top.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7665261177034804501' },
  },
  {
    slug: 'banana-latte', name: 'Banana Latte', col: 'try', serve: ['iced'], style: 'Cream top',
    shots: 2, time: 4, needs: ['Frother'],
    desc: 'Banana syrup goes in the cream foam, not the milk, so the first sip is banana cream and the rest is a sweet iced latte. Finished with cocoa.',
    parts: [
      { title: 'Foam', items: [['45 g', 'All-purpose cream'], ['30 g', 'Banana syrup'], ['Pinch', 'Salt']] },
      { title: 'Coffee', items: [['2 shots', 'Espresso'], ['15 g', 'Condensed milk']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['130 g', 'Milk'], ['Dust', 'Cocoa powder']] },
    ],
    steps: [
      'Froth the all-purpose cream, banana syrup and salt until thick and creamy.',
      [SHOT + ', add the condensed milk and mix.', 28],
      'Fill the glass with ice and add the milk.',
      'Pour in the espresso, top with the banana foam and dust with cocoa.',
    ],
    notes: ['He doesn’t give his banana syrup recipe in this video.'],
    source: { by: 'flair', url: TT + '7682715502929628437' },
  },
  {
    slug: 'whipped-honey-latte', name: 'Whipped Honey Latte', col: 'try', serve: ['iced'], style: 'Cream top',
    shots: 2, time: 3, needs: ['Frother'],
    desc: 'Honey, water and cream frothed into a loose honey cream that sits on a plain iced latte. Three ingredients in the foam.',
    parts: [
      { title: 'Foam', items: [['30 g', 'Honey'], ['30 g', 'Water'], ['40 g', 'All-purpose cream']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['100 g', 'Milk'], ['2 shots', 'Espresso']] },
    ],
    steps: [
      'Froth the honey, water and all-purpose cream until thick and creamy.',
      ['Fill the glass with ice and milk. ' + SHOT + ' and add it.', 28],
      'Top with the honey foam.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7686070255369735445' },
  },
  {
    slug: 'ube-latte', name: 'Ube Latte', col: 'try', serve: ['iced'], style: 'Cream top',
    shots: 2, time: 4, needs: ['Frother'],
    desc: 'Ube halaya whipped with condensed milk into a purple cold foam, over taro milk and a vanilla shot. The ube goes in the foam, not the milk.',
    parts: [
      { title: 'Ube cold foam', items: [['30 g', 'Ube halaya'], ['10 g', 'Condensed milk'], ['30 g', 'Full cream milk']] },
      { title: 'Coffee', items: [['10 g', 'Vanilla syrup', 'brown sugar syrup also works'], ['2 shots', 'Espresso']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['~150 g', 'Taro-flavored milk']] },
    ],
    steps: [
      'Froth the ube halaya, condensed milk and milk until thick and creamy.',
      ['Put the vanilla syrup in a cup. ' + SHOT + ' onto it.', 28],
      'Fill the glass with ice and pour in the taro milk.',
      'Add the espresso, then top with the ube cold foam.',
    ],
    notes: ['His voiceover and on-screen labels both put the ube in the foam.'],
    source: { by: 'flair', url: TT + '7668761580967873812' },
  },
  {
    slug: 'choco-banana-latte', name: 'Choco Banana Latte', col: 'try', serve: ['iced'], style: 'Cream top',
    shots: 2, time: 6, needs: ['Blender', 'Frother', 'Torch'],
    desc: 'Fresh banana blended into the milk, a cocoa cream foam on top and a torched banana slice to finish.',
    parts: [
      { title: 'Banana milk', items: [['1', 'Banana'], ['~150 g', 'Milk']] },
      { title: 'Chocolate foam', items: [['3 g', 'Cocoa powder'], ['15 g', 'Condensed milk'], ['20 g', 'All-purpose cream'], ['10 g', 'Milk']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['2 shots', 'Espresso'], ['1 slice', 'Banana', 'to garnish']] },
    ],
    steps: [
      'Blend the banana with the milk until smooth.',
      'Froth the cocoa, condensed milk, all-purpose cream and milk until smooth and creamy.',
      ['Fill the glass with ice and pour in the banana milk. ' + SHOT + ' and add it.', 28],
      'Top with the chocolate foam. Add a banana slice and torch it until lightly caramelized.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7671568228086222101' },
  },
  {
    slug: 'vanilla-brulee-latte', name: 'Vanilla Brûlée Latte', col: 'try', serve: ['iced'], style: 'Cream top',
    shots: 2, time: 5, needs: ['Frother', 'Torch'],
    desc: 'Vanilla cream foam over an oat latte, sprinkled with sugar and torched into a thin, crackly crust like crème brûlée.',
    parts: [
      { title: 'Foam', items: [['50 ml', 'All-purpose cream'], ['15 g', 'Vanilla syrup']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['~100 g', 'Oat milk'], ['2 shots', 'Espresso'], ['Sprinkle', 'Sugar', 'for the crust']] },
    ],
    steps: [
      'Froth the all-purpose cream and vanilla syrup until thick and creamy.',
      ['Fill the glass with ice and oat milk. ' + SHOT + ' and pour it in.', 28],
      'Add the vanilla foam and sprinkle sugar evenly over it.',
      'Torch until the sugar melts into a crust.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7663412528084552980' },
  },
  {
    slug: 'langka-coconut-latte', name: 'Langka Coconut Latte', col: 'try', serve: ['iced'], style: 'Cream top',
    shots: 2, time: 6, needs: ['Blender', 'Torch'],
    desc: 'Sweet jackfruit blended with coconut cream into a tropical foam, torched on top and finished with a piece of langka.',
    parts: [
      { title: 'Foam', items: [['20 g', 'Sweetened langka'], ['10 g', 'Syrup'], ['30 ml', 'Coconut cream'], ['20 g', 'All-purpose cream']] },
      { title: 'Coffee', items: [['2 shots', 'Espresso'], ['15 g', 'Condensed milk']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['120 ml', 'Milk'], ['Sprinkle', 'Sugar'], ['1 pc', 'Langka', 'to garnish']] },
    ],
    steps: [
      'Blend the langka, syrup, coconut cream and all-purpose cream until smooth and creamy.',
      [SHOT + ' and mix in the condensed milk.', 28],
      'Fill the glass with ice and milk, then add the espresso.',
      'Top with the langka foam, sprinkle sugar, torch until caramelized and add the langka piece.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7667492493260344597' },
  },
  {
    slug: 'sunrise-latte', name: 'Sunrise Latte', col: 'try', serve: ['iced'], style: 'Cream top',
    shots: 2, time: 6, needs: ['Frother', 'Torch'],
    desc: 'Orange juice, vanilla and condensed milk stirred into the shot, an orange cream foam, and a sugared orange slice torched on top. Bright and citrusy.',
    parts: [
      { title: 'Coffee', items: [['20 g', 'Condensed milk'], ['0.5', 'Orange, juiced'], ['8–10 g', 'Vanilla syrup'], ['2 shots', 'Espresso']] },
      { title: 'Foam', items: [['30 g', 'All-purpose cream'], ['Squeeze', 'Orange juice'], ['5 g', 'Vanilla syrup']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['120 ml', 'Full cream milk'], ['1 slice', 'Orange, sugar-coated']] },
    ],
    steps: [
      ['Put the condensed milk, orange juice and vanilla syrup in a cup. ' + SHOT + ' into it and stir.', 28],
      'Froth the all-purpose cream, orange juice and vanilla syrup until thick and creamy.',
      'Fill the glass with ice and milk, then add the espresso mixture.',
      'Top with the foam and the sugared orange slice, then torch until caramelized.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7666001785999428884' },
  },
  {
    slug: 'cinnamon-crunch-latte', name: 'Cinnamon Crunch Latte', col: 'try', serve: ['iced'], style: 'Cream top',
    shots: 2, time: 4, needs: ['Frother'],
    desc: 'Brown sugar and cinnamon syrup in the shot, a cinnamon foam, and crushed cinnamon cereal on top for crunch.',
    parts: [
      { title: 'Coffee', items: [['8 g', 'Brown sugar'], ['Dash', 'Cinnamon'], ['15 g', 'Cinnamon syrup'], ['2 shots', 'Espresso']] },
      { title: 'Foam', items: [['10 g', 'Cinnamon syrup'], ['20 g', 'All-purpose cream'], ['5 g', 'Milk']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['~100 g', 'Oat milk'], ['Handful', 'Cinnamon cereal, crushed']] },
    ],
    steps: [
      ['Put the brown sugar, cinnamon and cinnamon syrup in a cup. ' + SHOT + ' into it and mix.', 28],
      'Froth the cinnamon syrup, all-purpose cream and milk until thick and creamy.',
      'Fill the glass with ice and oat milk, pour in the espresso and add the foam.',
      'Finish with crushed cinnamon cereal.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7672330700871322901' },
  },
  {
    slug: 'tiramisu-latte', name: 'Tiramisu Latte', col: 'try', serve: ['iced'], style: 'Cream top',
    shots: 2, time: 4, needs: ['Frother'],
    desc: 'Cream cheese and vanilla whipped into a mascarpone-like foam over an oat latte, under a heavy dusting of cocoa.',
    parts: [
      { title: 'Foam', items: [['1 spoon', 'Cream cheese'], ['10 g', 'Oat milk'], ['20 g', 'All-purpose cream'], ['15 g', 'Vanilla syrup']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['2 shots', 'Espresso'], ['80 g', 'Oat milk'], ['Generous', 'Cocoa powder']] },
    ],
    steps: [
      'Froth the cream cheese, oat milk, all-purpose cream and vanilla syrup until thick and creamy.',
      ['Fill the glass with ice. ' + SHOT + ' and add it, then the oat milk.', 28],
      'Top with the foam and a generous dusting of cocoa.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7701666861817007381' },
  },
  {
    slug: 'burnt-milk-latte', name: 'Burnt Milk Latte', col: 'try', serve: ['iced'], style: 'Cream top',
    shots: 2, time: 4, needs: ['Frother'],
    desc: 'Powdered milk toasted until golden and turned into a nutty, butterscotch-like syrup. It goes in the shot and in the foam.',
    parts: [
      { title: 'Roasted milk syrup', batch: '4–5 drinks', items: [['80 g', 'Powdered milk'], ['80 g', 'Water'], ['80 g', 'Brown sugar']] },
      { title: 'Foam', items: [['30 g', 'Roasted milk syrup'], ['30 g', 'All-purpose cream'], ['Dash', 'Milk']] },
      { title: 'Coffee', items: [['20 g', 'Roasted milk syrup'], ['2 shots', 'Espresso']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['100 g', 'Milk'], ['Dust', 'Powdered milk']] },
    ],
    steps: [
      'Toast the powdered milk in a dry pan until golden, then mix in the water and brown sugar. Let it cool.',
      'Froth 30 g syrup with the all-purpose cream and milk until thick and creamy.',
      ['Put 20 g syrup in a cup. ' + SHOT + ' over it.', 28],
      'Fill the glass with ice and milk, add the espresso, top with the foam and dust with powdered milk.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7686814144745590036' },
  },
  {
    slug: 'smores-mocha', name: 'S’mores Mocha', col: 'try', serve: ['iced'], style: 'Cream top',
    shots: 1, time: 5, needs: ['Frother', 'Torch'],
    desc: 'A chocolate single shot under toasted-marshmallow cream, with a torched marshmallow and a chocolate drizzle on top.',
    parts: [
      { title: 'Coffee', items: [['10 g', 'Chocolate sauce'], ['1 shot', 'Espresso']] },
      { title: 'Foam', items: [['40 g', 'All-purpose cream'], ['10 g', 'Full cream milk'], ['25 g', 'Toasted marshmallow syrup', 'see Batch syrups']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['~150 g', 'Milk'], ['1', 'Marshmallow'], ['Drizzle', 'Chocolate sauce']] },
    ],
    steps: [
      ['Pull a single shot over the chocolate sauce and mix.', 25],
      'Froth the all-purpose cream, milk and marshmallow syrup until thick and creamy.',
      'Fill the glass with ice and milk, then pour in the chocolate espresso.',
      'Top with the foam, torch a marshmallow on top and drizzle with chocolate.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7690506272231214357' },
  },
  {
    slug: 'espresso-cream-crown', name: 'Espresso Cream Crown', col: 'try', serve: ['iced'], style: 'Cream top',
    shots: 2, time: 3, needs: ['Frother'],
    desc: 'No milk underneath: hazelnut-sweetened espresso under a thick vanilla coffee cream. Small, strong and dessert-like.',
    parts: [
      { title: 'Coffee', items: [['2 shots', 'Espresso'], ['40 ml', 'Hazelnut syrup'], ['20 g', 'Water']] },
      { title: 'Foam', items: [['50 ml', 'All-purpose cream'], ['10 ml', 'Milk'], ['10 ml', 'Coffee'], ['15 ml', 'Vanilla syrup']] },
    ],
    steps: [
      [SHOT + '. Stir in the hazelnut syrup and water until smooth.', 28],
      'Froth the all-purpose cream, milk, coffee and vanilla syrup until light and fluffy.',
      'Pour the hazelnut espresso into the glass and add the foam on top.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7662662088342523157' },
  },
  {
    slug: 'peanut-butter-latte', name: 'Peanut Butter Iced Latte', col: 'try', serve: ['iced'], style: 'Frothed',
    shots: 2, time: 3, needs: ['Frother'],
    desc: 'Peanut butter and honey frothed into the shot until thick, then poured over iced milk. His most-watched recipe.',
    parts: [
      { title: 'Coffee', items: [['1 tbsp', 'Peanut butter'], ['1 tbsp', 'Honey'], ['2 shots', 'Espresso']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['~150 g', 'Milk']] },
    ],
    steps: [
      ['Put the peanut butter and honey in a cup. ' + SHOT + ' straight onto them.', 28],
      'Froth until thick and creamy.',
      'Fill the glass with ice and milk.',
      'Pour the peanut butter coffee on top and give it a quick mix.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7661920710595448085' },
  },
  {
    slug: 'jasmine-latte', name: 'Jasmine Latte', col: 'try', serve: ['iced'], style: 'Frothed',
    shots: 2, time: 3, needs: ['Frother'],
    desc: 'Jasmine syrup stirred into oat milk with a frothed honey espresso on top. Floral and light.',
    parts: [
      { title: 'Coffee', items: [['8 g', 'Honey'], ['2 shots', 'Espresso']] },
      { title: 'Glass', items: [['20 g', 'Jasmine syrup'], ['100 g', 'Oat milk'], ['Lots', 'Ice']] },
    ],
    steps: [
      [SHOT + ' over the honey and froth until thick.', 28],
      'In the serving glass, mix the jasmine syrup into the oat milk, then add ice.',
      'Pour the honey espresso on top.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7706461399140076820' },
  },
  {
    slug: 'breakfast-latte', name: 'Breakfast Latte', col: 'try', serve: ['iced'], style: 'Frothed',
    shots: 2, time: 5, needs: ['Air fryer', 'French press'],
    desc: 'Toasted cornflakes steeped into cereal milk, a honey shot, and honey cornflakes on top. Tastes like the bottom of a cereal bowl.',
    parts: [
      { title: 'Cereal milk', items: [['Handful', 'Cornflakes'], ['~150 g', 'Milk']] },
      { title: 'Coffee', items: [['2 shots', 'Espresso'], ['15 g', 'Honey']] },
      { title: 'Topping', items: [['Handful', 'Cornflakes, mixed with honey'], ['Dust', 'Cocoa powder']] },
    ],
    steps: [
      ['Air-fry the cornflakes for 3 to 5 minutes until toasted.', 240],
      ['Put them in a French press with the milk and leave in the fridge for 30 minutes. Press and strain.', 1800],
      [SHOT + ' and mix in the honey.', 28],
      'Fill the glass with ice and the cereal milk, then add the honey espresso.',
      'Top with honey cornflakes and a little cocoa.',
    ],
    notes: ['Make the cereal milk ahead in a batch to keep service fast.'],
    source: { by: 'flair', url: TT + '7673443625954446613' },
  },
  {
    slug: 'holos-latte', name: 'Holos Latte', col: 'try', serve: ['iced'], style: 'Tea',
    shots: 2, time: 5, needs: [],
    desc: 'Earl Grey steeped with honey under oat milk and a double shot. Bergamot and coffee in layers.',
    parts: [
      { title: 'Tea', items: [['1 bag', 'Earl Grey tea'], ['70 g', 'Hot water'], ['10 g', 'Honey']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['90 g', 'Oat milk'], ['2 shots', 'Espresso']] },
    ],
    steps: [
      ['Steep the tea bag in the hot water, then stir in the honey.', 180],
      'Fill the glass with ice and pour in the Earl Grey honey.',
      'Add the oat milk.',
      [SHOT + ' and pour it on top.', 28],
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7699393523207965972' },
  },
  {
    slug: 'iced-date-cortado', name: 'Iced Date Cortado', col: 'try', serve: ['iced'], style: 'Frothed',
    shots: 2, time: 4, needs: ['Air fryer', 'Blender', 'Frother'],
    desc: 'Air-fried dates blended with salt into a caramel-like paste, frothed into the shot and served small over milk.',
    parts: [
      { title: 'Date mixture', batch: 'several drinks', items: [['Handful', 'Dates'], ['Pinch', 'Salt']] },
      { title: 'Coffee', items: [['40 g', 'Date mixture'], ['2 shots', 'Espresso'], ['Little', 'Ice']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['~80 g', 'Milk', 'cortado-size glass']] },
    ],
    steps: [
      ['Air-fry the dates for 7 minutes, then blend with a pinch of salt until smooth.', 420],
      [SHOT + '. Add 40 g of the date mixture and a little ice, and froth until thickened.', 28],
      'Fill a small glass with ice and milk, then add the espresso mixture.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7680457803210820884' },
  },
  {
    slug: 'salted-honey-shaken', name: 'Salted Honey Cinnamon Shaken Espresso', col: 'try', serve: ['iced'], style: 'Shaken',
    shots: 2, time: 3, needs: ['Shaker'],
    desc: 'Honey, cinnamon and salt in a double shot, shaken over ice until light and foamy, then poured slowly over oat milk.',
    parts: [
      { title: 'Coffee', items: [['20 g', 'Honey'], ['Dash', 'Cinnamon'], ['Pinch', 'Salt'], ['2 shots', 'Espresso']] },
      { title: 'Shaker', items: [['Lots', 'Ice']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['~100 g', 'Oat milk']] },
    ],
    steps: [
      ['Put the honey, cinnamon and salt in a cup. ' + SHOT + ' straight into it and give it a quick mix.', 28],
      ['Fill the shaker with ice, pour in the espresso and shake until chilled.', 15],
      'Fill another glass with ice and oat milk.',
      'Slowly pour the shaken espresso on top.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7664517345087343892' },
  },
  {
    slug: 'brown-sugar-shaken', name: 'Brown Sugar Shaken Espresso', col: 'try', serve: ['iced'], style: 'Shaken',
    shots: 2, time: 3, needs: ['Shaker'],
    desc: 'Brown sugar, cinnamon and salt shaken into the shot until cold and frothy, over oat milk. The base for most of his shaken drinks.',
    parts: [
      { title: 'Shaker', items: [['2 shots', 'Espresso'], ['15 g', 'Brown sugar', 'about 2 spoons'], ['Dash', 'Cinnamon'], ['Pinch', 'Salt'], ['Lots', 'Ice']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['~100 g', 'Oat milk']] },
    ],
    steps: [
      [SHOT + ' into the shaker. Add the brown sugar, cinnamon and salt.', 28],
      ['Add ice and shake until cold and frothy.', 15],
      'Fill the glass with ice, pour in the shaken espresso, then add the oat milk.',
    ],
    notes: ['Works with regular milk too.'],
    source: { by: 'flair', url: TT + '7675512955924008212', note: 'His base from the Black Sesame video, plus the pinch of salt from his honey version.' },
  },
  {
    slug: 'black-sesame-shaken', name: 'Black Sesame Shaken Espresso', col: 'try', serve: ['iced'], style: 'Shaken',
    shots: 2, time: 4, needs: ['Shaker', 'Frother'],
    desc: 'The brown sugar shaken espresso under a nutty grey sesame foam, with black sesame seeds on top.',
    parts: [
      { title: 'Black sesame foam', items: [['15 g', 'Black sesame syrup'], ['20 g', 'All-purpose cream'], ['5 g', 'Milk']] },
      { title: 'Shaker', items: [['2 shots', 'Espresso'], ['15 g', 'Brown sugar'], ['Dash', 'Cinnamon'], ['Lots', 'Ice']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['~100 g', 'Oat milk'], ['Sprinkle', 'Black sesame seeds']] },
    ],
    steps: [
      'Froth the sesame syrup, all-purpose cream and milk until thick and creamy.',
      [SHOT + ' into the shaker with the brown sugar, cinnamon and ice. Shake until cold and frothy.', 28],
      'Fill the glass with ice, pour in the shaken espresso and add the oat milk.',
      'Top with the foam and sprinkle black sesame seeds.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7675512955924008212' },
  },
  {
    slug: 'campfire-shaken', name: 'Campfire Shaken Espresso', col: 'try', serve: ['iced'], style: 'Shaken',
    shots: 2, time: 4, needs: ['Air fryer', 'Shaker', 'Frother'],
    desc: 'Marshmallows air-fried until toasty and melted into a syrup, whipped into cream over a brown sugar shaken espresso.',
    parts: [
      { title: 'Toasted marshmallow syrup', batch: '5–6 drinks', items: [['Handful', 'Marshmallows'], ['80 g', 'Water'], ['80 g', 'Brown sugar']] },
      { title: 'Shaker', items: [['2 shots', 'Espresso'], ['7 g', 'Brown sugar'], ['Lots', 'Ice']] },
      { title: 'Foam', items: [['40 g', 'All-purpose cream'], ['30 g', 'Toasted marshmallow syrup']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['~100 g', 'Oat milk']] },
    ],
    steps: [
      ['Air-fry the marshmallows for 5 to 8 minutes.', 360],
      'In a pan, dissolve the brown sugar in the water, add the marshmallows and stir until fully melted.',
      [SHOT + ' and shake it with the 7 g brown sugar and ice.', 28],
      'Froth the all-purpose cream and 30 g syrup until thick and creamy.',
      'Fill the glass with ice and oat milk, pour in the shaken espresso and top with the foam.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7689432318632561940' },
  },
  {
    slug: 'honey-lemon-tonic', name: 'Honey Lemon Espresso Tonic', col: 'try', serve: ['iced'], style: 'Refresher',
    shots: 2, time: 2, needs: [],
    desc: 'Lemon and honey under tonic water, with a double shot poured on last so it layers. Fizzy, bittersweet and very cold.',
    parts: [
      { title: 'Base', items: [['0.5', 'Lemon, juiced'], ['20 g', 'Honey']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['1 slice', 'Lemon'], ['100 g', 'Tonic water', 'he uses Canada Dry'], ['2 shots', 'Espresso']] },
    ],
    steps: [
      'Mix the lemon juice and honey until smooth.',
      'Fill the glass with ice, add the lemon honey and a lemon slice, then pour in the tonic.',
      [SHOT + ' and pour it slowly on top so it layers.', 28],
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7666775711008509204' },
  },
  {
    slug: 'pineapple-tonic', name: 'Pineapple Espresso Tonic', col: 'try', serve: ['iced'], style: 'Refresher',
    shots: 2, time: 3, needs: ['Frother'],
    desc: 'Pineapple juice and sparkling water with a honey espresso and a pineapple cream foam.',
    parts: [
      { title: 'Pineapple foam', items: [['15 g', 'Pineapple juice'], ['20 g', 'All-purpose cream'], ['5 g', 'Milk']] },
      { title: 'Coffee', items: [['2 shots', 'Espresso'], ['20 g', 'Honey']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['40 g', 'Pineapple juice'], ['80 g', 'Sparkling water']] },
    ],
    steps: [
      'Froth the pineapple juice, all-purpose cream and milk until thick and creamy.',
      [SHOT + ' and mix in the honey.', 28],
      'Fill the glass with ice, then add the pineapple juice and sparkling water.',
      'Pour the espresso over and top with the pineapple foam.',
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7673052981377568020' },
  },
  {
    slug: 'coconut-cloud', name: 'Coconut Cloud Coffee', col: 'try', serve: ['iced'], style: 'Refresher',
    shots: 1, time: 3, needs: ['Frother'],
    desc: 'Cold coconut water under a single shot whipped with cream into a thick coffee cloud. Unsweetened and refreshing.',
    parts: [
      { title: 'Coffee cloud', items: [['1 shot', 'Espresso'], ['70 g', 'All-purpose cream']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['120 g', 'Coconut water'], ['Dust', 'Cocoa powder'], ['1 pc', 'Fresh coconut meat']] },
    ],
    steps: [
      ['Pull a single shot into a separate glass with the all-purpose cream. Froth until thick and creamy.', 25],
      'Fill the serving glass with ice and pour in the coconut water.',
      'Spoon the coffee cloud on top and dust with cocoa. Add the coconut meat.',
    ],
    notes: ['For a sweeter version, froth 15 g condensed milk into the cloud.'],
    source: { by: 'flair', url: TT + '7676799531362569492' },
  },
  {
    slug: 'hibiscus-ginger-espresso', name: 'Hibiscus Ginger Espresso', col: 'try', serve: ['iced'], style: 'Refresher',
    shots: 2, time: 5, needs: [],
    desc: 'Hibiscus tea sweetened with honey, topped up with ginger ale and finished with a double shot. Tart, red and fizzy.',
    parts: [
      { title: 'Tea', items: [['1 bag', 'Hibiscus tea'], ['~80 g', 'Hot water'], ['15 g', 'Honey']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['50 g', 'Ginger ale'], ['2 shots', 'Espresso'], ['1 slice', 'Lemon']] },
    ],
    steps: [
      ['Steep the hibiscus tea and stir in the honey.', 240],
      'Fill the glass with ice. Pour in the hibiscus tea, then the ginger ale.',
      [SHOT + ' and pour it in. Finish with a lemon slice.', 28],
    ],
    notes: ['From his caption; the water amount isn’t given.'],
    source: { by: 'flair', url: TT + '7688646683282050324' },
  },
  {
    slug: 'espresso-martini-mocktail', name: 'Espresso Martini Mocktail', col: 'try', serve: ['iced'], style: 'Shaken',
    shots: 2, time: 2, needs: ['Shaker'],
    desc: 'Everything an espresso martini has except the alcohol: a double shot shaken hard with vanilla and agave, strained into a chilled coupe under a thick foam.',
    parts: [
      { title: 'Shaker', items: [['2 shots', 'Espresso'], ['10 ml', 'Vanilla syrup'], ['10 ml', 'Agave syrup'], ['30 ml', 'Cold water'], ['100 g', 'Ice']] },
    ],
    steps: [
      [SHOT + ' and add it to the shaker with everything else.', 28],
      ['Shake really hard.', 20],
      'Strain into a chilled martini or coupe glass.',
    ],
    notes: ['From his caption. No alcohol in his version.'],
    source: { by: 'flair', url: TT + '7691980388159278357' },
  },
  {
    slug: 'cocoa-dalgona', name: 'Cocoa Dalgona', col: 'try', serve: ['iced'], style: 'Dessert',
    shots: 0, time: 4, needs: ['Frother'],
    desc: 'Instant coffee, sugar and water whipped until it doubles, spooned over cocoa milk. No espresso machine needed.',
    parts: [
      { title: 'Dalgona', items: [['7 g', 'Instant coffee'], ['7 g', 'Sugar'], ['7 g', 'Water']] },
      { title: 'Glass', items: [['3.5 g', 'Cocoa powder'], ['15 g', 'Condensed milk'], ['Lots', 'Ice'], ['~150 g', 'Milk']] },
    ],
    steps: [
      'Froth the instant coffee, sugar and water until thick and doubled in size.',
      'In the glass, froth the cocoa and condensed milk until smooth.',
      'Add ice and milk, then top with the dalgona.',
    ],
    notes: ['Fast to make, since it needs no espresso.'],
    source: { by: 'flair', url: TT + '7670826330610519316' },
  },
  {
    slug: 'vietnamese-egg-coffee', name: 'Vietnamese Egg Coffee', col: 'try', serve: ['iced'], style: 'Dessert',
    shots: 2, time: 5, needs: ['Frother', 'Torch'],
    desc: 'Egg yolk and condensed milk whipped into a thick custard foam, spooned over iced coffee and torched. Pasteurized eggs only.',
    parts: [
      { title: 'Egg foam', items: [['1', 'Pasteurized egg yolk'], ['~30 g', 'Condensed milk']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['20 g', 'Water'], ['2 shots', 'Espresso'], ['Sprinkle', 'White sugar']] },
    ],
    steps: [
      'Froth the yolk and condensed milk until thick and creamy.',
      ['Fill the glass with ice and add the water. ' + SHOT + ' and add it.', 28],
      'Spoon the egg foam on top, sprinkle sugar and torch until caramelized.',
    ],
    notes: ['He stresses using pasteurized eggs, never raw.'],
    source: { by: 'flair', url: TT + '7669424289120062741' },
  },
  {
    slug: 'vietnamese-salt-coffee', name: 'Vietnamese Salt Coffee', col: 'try', serve: ['iced'], style: 'Cream top',
    shots: 2, time: 4, needs: ['Frother'],
    desc: 'Condensed-milk coffee lengthened with cold water and ice, under the same sea salt foam as the Sea Salt Latte. Stronger and less milky.',
    parts: [
      { title: 'Base', items: [['2 shots', 'Espresso'], ['30 g', 'Condensed milk'], ['60 g', 'Cold water'], ['100 g', 'Ice']] },
      { title: 'Sea salt foam', items: [['30 g', 'All-purpose cream'], ['20 g', 'Condensed milk'], ['Pinch', 'Salt']] },
    ],
    steps: [
      [SHOT + ' onto the condensed milk and stir.', 28],
      'Add the cold water and ice.',
      'Froth the all-purpose cream, condensed milk and salt until thick but pourable, and pour it on top.',
    ],
    notes: ['Iced only. Pick this or the Sea Salt Latte for the menu, since they share the same foam.'],
    source: { by: 'house', note: 'Our base with his sea salt foam.' },
  },
  {
    slug: 'dirty-hojicha-latte', name: 'Dirty Hojicha Latte', col: 'try', serve: ['iced'], style: 'Tea',
    shots: 1, time: 3, needs: ['Whisk'],
    desc: 'Roasted green tea whisked with agave, layered over oat milk with a single shot poured last. Toasty and earthy.',
    parts: [
      { title: 'Hojicha', items: [['5 g', 'Hojicha powder'], ['15 g', 'Agave syrup'], ['40 ml', 'Water']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['45 g', 'Oat milk'], ['1 shot', 'Espresso']] },
    ],
    steps: [
      'Whisk the hojicha powder, agave and water until frothy and smooth.',
      'Fill the glass with ice and oat milk, then slowly pour the hojicha on top.',
      ['Pull a single shot and pour it over to make a layer.', 25],
    ],
    notes: [],
    source: { by: 'flair', url: TT + '7678674933823753492' },
  },
  {
    slug: 'mont-blanc', name: 'Mont Blanc', col: 'try', serve: ['iced'], style: 'Cream top',
    shots: 0, time: 5, needs: ['Pour-over', 'Frother'],
    desc: 'Coffee flash-brewed straight over ice under an orange and vanilla cream with a dash of nutmeg. Made on a pour-over, not the espresso machine.',
    parts: [
      { title: 'Coffee', items: [['20 g', 'Ground coffee', 'medium-fine'], ['~180 g', 'Hot water'], ['~120 g', 'Ice', 'in the server']] },
      { title: 'Foam', items: [['20 g', 'Orange syrup'], ['5 g', 'Vanilla syrup'], ['40 g', 'All-purpose cream']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['Little', 'Orange syrup'], ['Dash', 'Nutmeg']] },
    ],
    steps: [
      ['Brew the coffee on a pour-over straight onto the ice in the server.', 180],
      'Froth the orange syrup, vanilla syrup and all-purpose cream until thick and creamy.',
      'Fill the glass with ice and a little orange syrup, pour in the flash brew and top with the foam.',
      'Finish with a dash of nutmeg.',
    ],
    notes: ['He doesn’t give a water amount. The suggestion here is a standard flash brew: 60% hot water, 40% ice.'],
    source: { by: 'flair', url: TT + '7693837960361397524' },
  },

  /* =========================== CLASSICS =========================== */
  {
    slug: 'flat-white', name: 'Flat White', col: 'classic', serve: ['hot'], style: 'Milk',
    shots: 2, time: 3, needs: ['Steam wand'],
    desc: 'A double shot with a small amount of silky, thinly textured milk. Stronger than a latte and smoother than a cappuccino.',
    parts: [
      { title: 'Cup', items: [['2 shots', 'Espresso'], ['120 g', 'Milk']] },
    ],
    steps: [
      [SHOT + ' into a 5–6 oz cup.', 28],
      'Steam the milk with only 1 to 2 seconds of air for a thin, glossy microfoam, to 55–60 °C.',
      'Swirl the jug, then pour low and fast. Finish with a small heart. The foam should be about 5 mm.',
    ],
    notes: [],
    source: { by: 'classic' },
  },
  {
    slug: 'cortado', name: 'Cortado', col: 'classic', serve: ['hot'], style: 'Milk',
    shots: 2, time: 3, needs: ['Steam wand'],
    desc: 'Espresso cut with about the same amount of warm milk, barely foamed. Served small, in a glass.',
    parts: [
      { title: 'Glass', items: [['2 shots', 'Espresso'], ['40 g', 'Milk', 'about equal to the shot']] },
    ],
    steps: [
      [SHOT + ' into a 4.5 oz glass.', 28],
      'Steam the milk with very little air to 55–60 °C.',
      'Pour it in gently so it mixes with the shot, with just a thin layer of foam.',
    ],
    notes: [],
    source: { by: 'classic' },
  },
  {
    slug: 'espresso-macchiato', name: 'Espresso Macchiato', col: 'classic', serve: ['hot'], style: 'Milk',
    shots: 2, time: 2, needs: ['Steam wand'],
    desc: 'A shot “stained” with a spoonful of milk foam. The smallest milk drink on the bar.',
    parts: [
      { title: 'Cup', items: [['2 shots', 'Espresso'], ['1 tbsp', 'Milk foam']] },
    ],
    steps: [
      [SHOT + ' into a demitasse.', 28],
      'Steam a small amount of milk with plenty of air.',
      'Spoon a dollop of foam onto the centre of the crema.',
    ],
    notes: [],
    source: { by: 'classic' },
  },
  {
    slug: 'iced-caramel-macchiato', name: 'Iced Caramel Macchiato', col: 'classic', serve: ['iced'], style: 'Milk',
    shots: 2, time: 3, needs: [],
    desc: 'Vanilla milk over ice with the shot poured on top and a caramel crosshatch. Built in layers and stirred by whoever drinks it.',
    parts: [
      { title: 'Glass', items: [['15 g', 'Vanilla syrup'], ['180 g', 'Milk'], ['Lots', 'Ice'], ['2 shots', 'Espresso'], ['10 g', 'Caramel sauce']] },
    ],
    steps: [
      'Put the vanilla syrup in the glass, add the milk and fill with ice.',
      [SHOT + ' and pour it slowly over the ice so it sits on top.', 28],
      'Drizzle the caramel in a crosshatch over the top.',
    ],
    notes: [],
    source: { by: 'classic' },
  },
  {
    slug: 'affogato', name: 'Affogato', col: 'classic', serve: ['hot'], style: 'Dessert',
    shots: 2, time: 2, needs: [],
    desc: 'A scoop of vanilla ice cream drowned in a hot double shot. Serve it straight away.',
    parts: [
      { title: 'Glass', items: [['1 scoop', 'Vanilla ice cream', 'about 60 g'], ['2 shots', 'Espresso']] },
    ],
    steps: [
      'Chill a small glass or bowl and add the ice cream.',
      [SHOT + '.', 28],
      'Pour it over the ice cream at the table.',
    ],
    notes: ['A pinch of salt or a little grated chocolate on top works well.'],
    source: { by: 'classic' },
  },
  {
    slug: 'cold-brew', name: 'Cold Brew', col: 'classic', serve: ['iced'], style: 'Brewed',
    shots: 0, time: 3, needs: ['Jar', 'Filter'],
    desc: 'Coarse coffee steeped in cold water overnight, then diluted. Low in acidity, naturally sweet, and it keeps for about a week in the fridge.',
    parts: [
      { title: 'Concentrate', batch: 'about 6 drinks', items: [['100 g', 'Coarse-ground coffee'], ['800 g', 'Cold water']] },
      { title: 'Glass', items: [['100 g', 'Concentrate'], ['100 g', 'Water or milk'], ['Lots', 'Ice']] },
    ],
    steps: [
      'Stir the coffee into the cold water until it is all wet. Cover.',
      'Steep in the fridge for 14 to 16 hours.',
      'Strain through a paper filter or cloth.',
      'Serve 1 : 1 with water or milk over ice.',
    ],
    notes: ['Sweeten with brown sugar syrup, or float the sea salt foam on top.'],
    source: { by: 'classic' },
  },
  {
    slug: 'pour-over', name: 'Pour-Over (V60)', col: 'classic', serve: ['hot'], style: 'Brewed',
    shots: 0, time: 4, needs: ['V60', 'Gooseneck kettle', 'Scale'],
    desc: 'A clean, tea-like cup that shows off the bean. 15 g of coffee to 250 g of water.',
    parts: [
      { title: 'Brew', items: [['15 g', 'Medium-fine coffee'], ['250 g', 'Water', '93–96 °C']] },
    ],
    steps: [
      'Rinse the paper filter with hot water and discard the water.',
      'Add the coffee, level the bed and start the timer.',
      ['Bloom: pour 40 g of water, swirl, and wait.', 40],
      'Pour in slow circles to 150 g by 1:15.',
      'Pour to 250 g by 1:45.',
      ['Give it a gentle swirl and let it drain. Aim to finish around 3:00.', 75],
    ],
    notes: ['Draining much faster: grind finer. Much slower: grind coarser.'],
    source: { by: 'classic' },
  },
  {
    slug: 'french-press', name: 'French Press', col: 'classic', serve: ['hot'], style: 'Brewed',
    shots: 0, time: 10, needs: ['French press'],
    desc: 'Full-bodied and forgiving. 30 g of coffee to 500 g of water, steeped, skimmed and pressed gently.',
    parts: [
      { title: 'Brew', items: [['30 g', 'Coarse-ground coffee'], ['500 g', 'Water', 'just off the boil']] },
    ],
    steps: [
      ['Add the coffee, pour in all the water and start the timer.', 240],
      'Stir the crust that formed on top, then spoon off the foam.',
      ['Wait 5 more minutes so the fines sink.', 300],
      'Press the plunger just to the surface and pour slowly. Leave the last bit in the press.',
    ],
    notes: [],
    source: { by: 'classic', url: 'https://www.jameshoffmann.co.uk/', note: 'The long-steep method popularised by James Hoffmann.' },
  },
  {
    slug: 'kapeng-barako', name: 'Kapeng Barako', col: 'classic', serve: ['hot'], style: 'Brewed',
    shots: 0, time: 6, needs: ['Cloth filter or French press'],
    desc: 'Batangas Liberica: bold, smoky and nutty, with a jackfruit-like aroma. Steeped, strained through cloth, and sweetened with brown sugar.',
    parts: [
      { title: 'Brew', items: [['20 g', 'Barako, coarse-ground'], ['250 g', 'Water', 'just off the boil'], ['To taste', 'Brown sugar or muscovado']] },
    ],
    steps: [
      'Bring the water to a boil and take it off the heat for 30 seconds.',
      ['Add the coffee, stir and let it steep.', 240],
      'Strain through a cloth filter (or press it in a French press).',
      'Sweeten with brown sugar, muscovado or honey.',
    ],
    notes: ['Liberica beans are large and oily, so grind coarse.'],
    source: { by: 'classic', url: 'https://en.wikipedia.org/wiki/Kapeng_barako' },
  },
  {
    slug: 'coconut-coffee', name: 'Vietnamese Coconut Coffee', col: 'classic', serve: ['iced'], style: 'Dessert',
    shots: 2, time: 3, needs: ['Blender'],
    desc: 'Strong coffee under a slushy blend of coconut cream, condensed milk and ice. Half drink, half dessert.',
    parts: [
      { title: 'Coconut slush', items: [['60 g', 'Coconut cream'], ['30 g', 'Condensed milk'], ['120 g', 'Ice']] },
      { title: 'Glass', items: [['2 shots', 'Espresso']] },
    ],
    steps: [
      'Blend the coconut cream, condensed milk and ice until slushy.',
      [SHOT + ' into the glass.', 28],
      'Spoon the coconut slush on top.',
    ],
    notes: ['Traditionally made with strong phin-brewed robusta.'],
    source: { by: 'classic', url: 'https://vickypham.com/blog/vietnamese-iced-coconut-milk-coffee-ca-phe-dua/' },
  },
  {
    slug: 'biscoff-latte', name: 'Biscoff Latte', col: 'classic', serve: ['iced'], style: 'Frothed',
    shots: 2, time: 3, needs: ['Frother'],
    desc: 'Biscoff spread melted into the shot for a caramelized cinnamon-cookie latte, topped with crushed cookie.',
    parts: [
      { title: 'Coffee', items: [['15 g', 'Biscoff spread'], ['10 g', 'Brown sugar syrup'], ['2 shots', 'Espresso']] },
      { title: 'Glass', items: [['Lots', 'Ice'], ['150 g', 'Milk'], ['1', 'Biscoff cookie, crushed']] },
    ],
    steps: [
      [SHOT + ' onto the spread and syrup, and froth until smooth.', 28],
      'Fill the glass with ice and milk.',
      'Pour the espresso on top and finish with crushed cookie.',
    ],
    notes: [],
    source: { by: 'classic', url: 'https://deliciousnotgorgeous.com/biscoff-latte/' },
  },
  {
    slug: 'einspanner', name: 'Einspänner', col: 'classic', serve: ['hot', 'iced'], style: 'Cream top',
    shots: 2, time: 4, needs: ['Whisk'],
    desc: 'Viennese coffee: a double shot under lightly sweetened whipped cream, sipped through the cream without stirring.',
    parts: [
      { title: 'Cream', items: [['40 g', 'Whipping cream', 'cold'], ['5 g', 'Sugar']] },
      { title: 'Glass', items: [['2 shots', 'Espresso'], ['60 g', 'Hot water'], ['Dust', 'Cocoa', 'optional']] },
    ],
    steps: [
      'Whip the cream and sugar to soft peaks.',
      ['Pour the hot water into a glass. ' + SHOT + ' on top.', 28],
      'Spoon the cream over the coffee in a thick layer. Don’t stir.',
    ],
    notes: ['Iced, Korean café style: pour the shot over ice and cold water, then add the cream.'],
    source: { by: 'classic', url: 'https://www.juliusmeinl.com/your-perfect-cup/classic-recipes' },
  },
  {
    slug: 'dirty-chai', name: 'Dirty Chai', col: 'classic', serve: ['hot', 'iced'], style: 'Tea',
    shots: 1, time: 5, needs: [],
    desc: 'A spiced chai latte with a shot of espresso. Cinnamon, cardamom and ginger over coffee.',
    parts: [
      { title: 'Chai', items: [['1 bag', 'Chai tea'], ['80 g', 'Hot water'], ['10 g', 'Brown sugar syrup']] },
      { title: 'Glass', items: [['150 g', 'Milk', 'steamed, or cold over ice'], ['1 shot', 'Espresso'], ['Dust', 'Cinnamon']] },
    ],
    steps: [
      ['Steep the chai strong in the hot water, then stir in the syrup.', 240],
      'Hot: steam the milk and pour it into the chai. Iced: pour the chai over ice and cold milk.',
      ['Pull a single shot and pour it on top. Dust with cinnamon.', 25],
    ],
    notes: [],
    source: { by: 'classic' },
  },
  {
    slug: 'shakerato', name: 'Shakerato', col: 'classic', serve: ['iced'], style: 'Shaken',
    shots: 2, time: 2, needs: ['Shaker'],
    desc: 'Italy’s iced espresso: a double shot and syrup shaken hard with ice and strained into a chilled glass under a thick foam.',
    parts: [
      { title: 'Shaker', items: [['2 shots', 'Espresso'], ['10 g', 'Brown sugar syrup', 'or simple syrup'], ['Lots', 'Ice']] },
    ],
    steps: [
      'Chill a coupe or martini glass.',
      [SHOT + ' and add it to a shaker full of ice with the syrup.', 28],
      ['Shake hard.', 20],
      'Strain into the chilled glass.',
    ],
    notes: ['A couple of drops of salt water make it taste rounder.'],
    source: { by: 'classic', url: 'https://www.jameshoffmann.co.uk/weird-coffee-science/caffe-shakerato' },
  },
];

/* ---------------- Batch syrups & sauces (Basics section) ---------------- */
window.SYRUPS = [
  {
    id: 'batch-sea-salt-foam', name: 'Sea salt foam base', feature: true,
    perDrink: [[30, 'g', 'all-purpose cream'], [20, 'g', 'condensed milk'], [0.2, 'g', 'fine salt']],
    batches: [10, 20, 30], batch: 20, unit: 'drinks',
    method: 'Stir in a jug (don’t froth) until the condensed milk and salt dissolve. Pour into a clean squeeze bottle or sealed jar, label it with the date, and keep it at 4 °C or colder. Shake before each use and froth to order.',
    notes: [
      'Per drink: 50 g for a Sea Salt Latte, 35 g for an iced Spanish Latte.',
      'Keeps up to 7 days from opening the cream, which is Alaska’s storage note for opened all-purpose cream. Check your own pack’s label.',
      'Selling fewer than 20 a week? Make the 10-drink batch twice a week instead, so the foam stays fresh and whips thick.',
      'Shopping for 20 drinks: 600 g all-purpose cream (3 × 250 ml packs, with some left over) and 400 g condensed milk.',
    ],
    used: ['sea-salt-latte', 'spanish-latte', 'vietnamese-salt-coffee'],
  },
  { name: 'Brown sugar syrup', yield: 'about 190 g', items: ['100 g brown sugar', '100 g hot water'], method: 'Stir until the sugar fully dissolves. 1 : 1.', used: ['latte', 'mocha', 'americano', 'brown-sugar-cream-latte', 'biscoff-latte', 'shakerato', 'dirty-chai'] },
  { name: 'Chocolate sauce', yield: 'about 8 drinks', items: ['100 g chocolate', '100 g hot milk'], method: 'Melt the chocolate into the hot milk and stir until smooth.', used: ['mocha', 'orange-mocha', 'smores-mocha'] },
  { name: 'Orange syrup', yield: 'about 5 drinks', items: ['Juice of 1 orange', '80 g brown sugar', '40 g water'], method: 'Mix in a pan and simmer until syrupy.', used: ['orange-mocha', 'mont-blanc'] },
  { name: 'Toasted marshmallow syrup', yield: '5–6 drinks', items: ['Handful of marshmallows', '80 g water', '80 g brown sugar'], method: 'Air-fry the marshmallows 5–8 min. Dissolve the sugar in the water, add the marshmallows and stir until melted.', used: ['campfire-shaken', 'smores-mocha'] },
  { name: 'Roasted milk syrup', yield: '4–5 drinks', items: ['80 g powdered milk', '80 g water', '80 g brown sugar'], method: 'Toast the powdered milk in a dry pan until golden, then mix in the water and sugar. Cool.', used: ['burnt-milk-latte'] },
  { name: 'Cereal milk', yield: 'per drink', items: ['Handful of cornflakes', '150 g milk'], method: 'Air-fry the cornflakes 3–5 min, steep in the milk in the fridge 30 min, then strain.', used: ['breakfast-latte'] },
];

/* ---------------- Testing plan (Must try section) ---------------- */
window.ROUNDS = [
  { title: 'Round 1', sub: 'Opening menu', items: [
    { key: 'dial-in', label: 'Dial in the shot', note: '18 g → 36 g in 25–30 s', href: '#shot' },
    { key: 'sea-salt-batch', label: 'Make the sea salt foam batch', note: '20 drinks', href: '#batch-sea-salt-foam' },
    { slug: 'espresso' },
    { slug: 'americano', note: 'hot 300 ml and iced 380 ml' },
    { slug: 'cappuccino', note: 'hot 300 ml' },
    { slug: 'mocha', note: 'hot and iced' },
    { slug: 'latte', note: 'hot and iced' },
    { slug: 'spanish-latte', note: 'hot and iced' },
    { slug: 'sea-salt-latte', note: 'check the fill line' },
  ] },
  { title: 'Round 2', sub: 'Next to try', items: [
    { slug: 'honey-hush-latte', note: 'vs the menu latte' },
    { slug: 'brown-sugar-cream-latte', note: 'whipping cream vs APC' },
    { slug: 'chocolate-shaken-espresso' },
    { slug: 'brown-sugar-shaken' },
    { slug: 'vietnamese-salt-coffee', note: 'uses the same foam batch' },
  ] },
  { title: 'Round 3', sub: 'Filipino-favorite flavors', items: [
    { slug: 'banana-latte' }, { slug: 'ube-latte' }, { slug: 'langka-coconut-latte' },
    { slug: 'peanut-butter-latte' }, { slug: 'salted-honey-shaken' }, { slug: 'coconut-cloud' },
  ] },
  { title: 'Round 4', sub: 'Specialty drinks', items: [
    { slug: 'vanilla-brulee-latte', note: 'needs a torch' }, { slug: 'sunrise-latte', note: 'needs a torch' },
    { slug: 'tiramisu-latte' }, { slug: 'burnt-milk-latte' },
    { slug: 'honey-lemon-tonic' }, { slug: 'pineapple-tonic' },
    { slug: 'cocoa-dalgona' }, { slug: 'vietnamese-egg-coffee' },
  ] },
];
