# Dual Code Studios — Website

A single-page marketing site for **Dual Code Studios**, built with plain HTML, CSS and JavaScript — no framework, no build step. Founders: **Ahad Bharucha** (CEO) and **Anmol Tiwari** (Co‑Founder).

```
.
├── index.html          ← the whole page
├── css/styles.css      ← all styling
├── js/main.js          ← nav, scroll‑spy, editor animation, form handling
├── images/
│   ├── ahad-bharucha.jpg
│   ├── anmol-tiwari.jpg
│   ├── favicon.svg
│   └── og-cover.jpg     ← social share preview image
└── README.md
```

Everything is self‑contained — you can open `index.html` directly in a browser and the whole site works, no server or `npm install` required.

---

## 1. Before you launch — 3 things to check

**A. Fix the team photo order if it's swapped.**
I matched the two photos you sent to the two names as a best guess (I couldn't tell for certain which photo was which person). If it's backwards, just rename/swap the two files in `images/` — nothing else needs to change:

- `images/ahad-bharucha.jpg` → shown under **Ahad Bharucha, CEO**
- `images/anmol-tiwari.jpg` → shown under **Anmol Tiwari, Co‑Founder**

**B. Connect the inquiry form so it actually sends you email.**
Right now the form will show a friendly "this isn't wired up yet, email us directly" message instead of silently failing. To make it really send:

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form — it'll give you an endpoint like `https://formspree.io/f/abcd1234`.
3. Open `index.html`, find this line (in the Contact section):
   ```html
   <form id="inquiryForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Replace `YOUR_FORM_ID` with your real ID. Done — submissions land in your inbox.

No Formspree account yet and just want it live today? Leave it as is — visitors will be told to email you directly at the address in step C below, so you won't lose inquiries.

**C. Replace the placeholder contact details.**
Search `index.html` for these and swap in your real details:
- `hello@dualcodestudios.com` (appears twice — the contact link and the JS fallback message in `js/main.js`)
- `+91 00000 00000` (phone)
- `@dualcodestudios` (Instagram — add a real link too, it's currently `href="#"`)
- The domain in `og-cover.jpg` / meta tags if you register a custom domain

---

## 2. Run it locally

Just double‑click `index.html`, or serve it properly (recommended, so relative paths and fonts behave exactly like production):

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000`.

---

## 3. Push this to GitHub

```bash
cd dual-code-studios          # this folder
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

(Create the empty repo on GitHub first via "New repository" — don't initialize it with a README there, or `git push` will conflict.)

---

## 4. Deploy it live — three easy options

### Option A: GitHub Pages (free, simplest)
1. In your GitHub repo: **Settings → Pages**.
2. Under "Build and deployment", set **Source** to `Deploy from a branch`.
3. Pick branch `main`, folder `/ (root)`, then **Save**.
4. Your site goes live at `https://YOUR_USERNAME.github.io/YOUR_REPO/` within a minute or two.
5. Want a custom domain (e.g. `dualcodestudios.com`)? Add it under the same Pages settings and follow GitHub's DNS instructions.

### Option B: Netlify (free, fastest to set up)
1. Go to [netlify.com](https://netlify.com) → **Add new site → Import an existing project**.
2. Connect your GitHub account and pick this repo.
3. Leave build settings blank (there's no build step) and deploy.
4. Netlify gives you a URL immediately and free custom‑domain support.

### Option C: Vercel
1. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
2. Framework preset: "Other". No build command needed.
3. Deploy.

All three auto‑redeploy every time you push to `main`.

---

## 5. Customizing

- **Colors, fonts, spacing** — all defined as CSS custom properties at the top of `css/styles.css` under `:root`. Change `--violet` / `--amber` to re‑theme the whole site.
- **Copy** — all text lives directly in `index.html`, organized by section comment (`HERO`, `SERVICES`, `TEAM`, etc.).
- **Services list** — each offering is one `.service-row` block in the Services section; duplicate a block to add another service.
- **Adding a real portfolio/case-studies section later** — there's deliberately no fake client list or testimonials on the current site (better to add real ones once you have them than placeholder ones that look misleading). Drop me a note if you want a "Work" section scaffolded once you have real projects to show.

---

## 6. Before going fully live — quick checklist

- [ ] Swap team photos if the names are on the wrong person (see §1A)
- [ ] Formspree endpoint connected (see §1B)
- [ ] Real email / phone / social links in place (see §1C)
- [ ] Custom domain connected (optional, via whichever host you pick in §4)
- [ ] Replace the sample OG share image (`images/og-cover.jpg`) if you want your own design later
