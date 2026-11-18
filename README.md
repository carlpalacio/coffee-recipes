# Kape — Coffee Recipes

A single-page coffee recipe book: the house menu, the new drinks to try, and the classics. Every amount is in grams, and every espresso drink starts from the same 18 g → 36 g double shot.

Plain HTML, CSS and JavaScript. There's no build step and nothing to install.

## What's on the page

- **Index:** a grid of all drinks, filterable by Menu / Must try / Classics, hot or iced, and style, with search across names and ingredients. Click a drink for its recipe.
- **Recipe view:** description, ingredients that scale from 1 to 12 drinks, a method you can tick off step by step, and built-in timers on timed steps. Links straight to the original video where there is one. Use ← / → to move between drinks, Esc to close. Every recipe has its own link (`#/sea-salt-latte`).
- **Must try:** the testing plan in rounds, with checkboxes and a progress bar. Ticks are saved in your browser only.
- **Basics:** a shot timer with dose and ratio sliders, the dialing-in steps, cold foam rules, and the batch syrups.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 4330
```

Then visit http://localhost:4330.

## Put it on GitHub Pages

1. Create an empty repository on GitHub, for example `coffee-recipes`.
2. From this folder:

   ```bash
   git init
   git add .
   git commit -m "Coffee recipes site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/coffee-recipes.git
   git push -u origin main
   ```

3. On GitHub, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. After a minute the site is live at `https://<your-username>.github.io/coffee-recipes/`.

## Editing

| To change | Edit |
| --- | --- |
| Recipes, the testing rounds, batch syrups | `recipes.js` (the format is explained at the top of the file) |
| The site name ("Kape") | `window.SITE` at the top of `recipes.js` |
| Photos and their credits | `photos.js` |
| Colours, fonts, layout | `styles.css` (colours are variables at the top) |

Amounts that start with a number scale with the servings stepper. Start an amount with `~` to mark it as a suggested amount when the source didn't give one.

## Credits

- Most menu and must-try recipes follow [@flairshotscafe](https://www.tiktok.com/@flairshotscafe); each one links to its video.
- Photos come from Unsplash (and Wikimedia Commons where noted). Photographers are credited on each recipe and in the footer. In the grid every photo gets the same coffee duotone so they read as one set.
- Design inspired by [AAWU(M)](https://www.awwwards.com/sites/aawu-m). Typeface: [Inter Tight](https://fonts.google.com/specimen/Inter+Tight).
