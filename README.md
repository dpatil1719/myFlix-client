# myFlix Client (Parcel)
A React frontend for the myFlix API. Users can sign up, log in, browse movies, view details, and manage their profile/favorites.

## Live Demo
- App: https://<your-netlify-site>.netlify.app
- API: https://<your-heroku-app>.herokuapp.com

## Features
- 🔐 Login/Signup with token persisted in localStorage
- 🎬 Movies list + detail view
- 🔎 **Filter on MainView** (search by title + genre dropdown)
- 🧭 SPA navigation (client-side routing)*
- 🧱 Responsive UI with React Bootstrap
- ⚠️ Loading spinner + error messages

\* If your routing is not set up yet, you can remove this bullet for now.

## Tech Stack
- React 18
- React Bootstrap
- Fetch API (HTTP)
- Parcel 2 (dev & build)
- React Router* (if used)
- Redux / Redux Toolkit* (if used)

## Quick Start
```bash
npm install
npx parcel src/index.html
# or: npm run dev  (if you added a dev script)
```

## Build for Production
```bash
npx parcel build src/index.html --public-url /
# outputs to: dist/
```

## Deployment (Netlify)

1) Add SPA redirect at project root (done):
   ```toml
   # netlify.toml
   [[redirects]]
     from = "/*"
     to = "/"
     status = 200
   ```

2) Ensure Parcel is a dev dependency (versions aligned):
   ```bash
   npm i -D parcel@2.9.3 @parcel/transformer-sass@2.9.3
   ```

3) Connect GitHub repo in Netlify, then set:
   - **Build command:** `parcel build src/index.html --public-url /`
   - **Publish directory:** `dist`

4) Deploy → rename site to something friendly (optional).

A simple front-end client for the **myFlix** movie app. This repo uses **Parcel** as the bundler for fast local development and easy builds.

> If you are following the course steps: this README documents **Creating a New Repository**, **Configuring Parcel**, and **Testing**. You can copy/paste these commands into your terminal.

---

## Table of Contents
- [Prerequisites](#prerequisites)
- [Creating a New Repository](#creating-a-new-repository)
- [Project Structure](#project-structure)
- [Configure Parcel for myFlix](#configure-parcel-for-myflix)
- [Add Starter Files](#add-starter-files)
- [Run and Test with Parcel](#run-and-test-with-parcel)
- [Common Git Commands](#common-git-commands)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Prerequisites
- **Node.js** 18+ and **npm** installed  
- **Git** installed and a GitHub account
- A terminal (macOS Terminal, Windows PowerShell, or Git Bash)

Check versions:
```bash
node -v
npm -v
git --version
```

---

## Creating a New Repository

1. **Create a project folder and initialize Git**
   ```bash
   mkdir myflix-client
   cd myflix-client
   git init
   ```

2. **Create a `.gitignore`** (so you don't commit build artifacts):
   ```txt
   node_modules/
   dist/
   .parcel-cache/
   .DS_Store
   .env
   ```

3. **Create a README** (this file) and make your first commit:
   ```bash
   echo "# myFlix Client (Parcel)" > README.md
   git add .
   git commit -m "chore: initial commit with README and .gitignore"
   ```

4. **Create a new repository on GitHub** (via the GitHub UI).  
   Copy the remote URL and connect it locally:
   ```bash
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git branch -M main
   git push -u origin main
   ```

> You can edit this README as you go—GitHub will display it on your repo’s main page after you push.

---

## Project Structure

Suggested layout:
```
myflix-client/
├─ src/
│  ├─ index.html
│  ├─ index.js
│  └─ styles.css
├─ .gitignore
├─ package.json
└─ README.md
```

---

## Configure Parcel for myFlix

1. **Initialize npm**
   ```bash
   npm init -y
   ```

2. **Install Parcel (dev dependency)**
   ```bash
   npm install --save-dev parcel
   ```

3. **Add scripts to `package.json`**
   Open `package.json` and add:
   ```json
   {
     "name": "myflix-client",
     "version": "1.0.0",
     "private": true,
     "scripts": {
       "dev": "parcel src/index.html",
       "build": "parcel build src/index.html",
       "clean": "rimraf dist .parcel-cache"
     },
     "devDependencies": {
       "parcel": "^2.x"
     }
   }
   ```
   > Optional: Install `rimraf` for the `clean` script (`npm i -D rimraf`). On macOS/Linux you can replace it with `rm -rf dist .parcel-cache`.

4. *(Optional)* **React users:** if your myFlix is in React, install React and use JSX:
   ```bash
   npm i react react-dom
   ```
   Parcel supports JSX out of the box. Use `.jsx` files and import them in `index.js`.

---

## Add Starter Files

Create the `src` folder and 3 files:

**`src/index.html`**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>myFlix Client</title>
    <link rel="stylesheet" href="./styles.css" />
  </head>
  <body>
    <div id="app">
      <h1>myFlix</h1>
      <p>Welcome!</p>
    </div>
    <script type="module" src="./index.js"></script>
  </body>
</html>
```

**`src/styles.css`**
```css
body {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  margin: 2rem;
}
```

**`src/index.js`**
```js
// Example: simple DOM update to verify Parcel is working
const app = document.getElementById('app');
const msg = document.createElement('p');
msg.textContent = 'Parcel is bundling your app 🎉';
app.appendChild(msg);
```

Commit these:
```bash
git add src
git commit -m "feat: add Parcel starter files"
git push
```

---

## Run and Test with Parcel

### Option A: Use npm scripts
```bash
npm run dev
```
Parcel will print a local URL (usually `http://localhost:1234`). Open it in your browser.

### Option B: Run Parcel directly
> Use the **actual path** to `index.html` (relative to your current directory).
```bash
npx parcel src/index.html
# OR if index.html is at project root:
# npx parcel index.html
```

### Build production assets
```bash
npm run build
```
This creates a `dist/` folder with optimized files.

---

## Common Git Commands
```bash
git status
git add .
git commit -m "describe your change"
git push
git pull
```

Create a new branch for features/fixes:
```bash
git checkout -b feature/some-change
# ... make changes ...
git add . && git commit -m "feat: some change"
git push -u origin feature/some-change
```

---

## Troubleshooting
- **Port already in use**: Stop other dev servers or set `PORT=3001 parcel src/index.html` (macOS/Linux). Windows PowerShell: `$env:PORT=3001; npx parcel src/index.html`
- **Blank page**: Check that `index.html` includes `<script type="module" src="./index.js"></script>` and that the path is correct.
- **Changes not showing**: Hard refresh the browser, or clear Parcel cache: `rm -rf .parcel-cache` (or `rimraf .parcel-cache` on Windows).
- **404s for assets**: Use relative paths (`./styles.css`, `./index.js`) and keep assets inside `src/`.

---

## License
Add your preferred license (MIT recommended for personal projects).
