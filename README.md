# TeQniko Engineering — Website Setup Guide

## Files in this Project
```
index.html          → Homepage + Product Catalogue
cart.html           → Enquiry Basket + Form
thankyou.html       → Confirmation Page
style.css           → All Styling
script.js           → Cart + Tracking Logic
google-apps-script.js → Paste this in Google Apps Script
```

---

## STEP 1 — Set Up Google Sheet

1. Go to **sheets.google.com** → Create a new blank sheet
2. Name it: `TeQniko Enquiries`
3. Leave it blank — the script will auto-create columns

---

## STEP 2 — Set Up Google Apps Script

1. Go to **script.google.com**
2. Click **New Project** → delete the default code
3. Open `google-apps-script.js` from this folder
4. Copy ALL the code → paste it into Apps Script
5. Click 💾 Save (name it: `TeQniko Backend`)
6. Click **Deploy → New Deployment**
7. Type: **Web app**
8. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
9. Click **Deploy** → Authorize when asked
10. **COPY the Web App URL** — looks like:
    `https://script.google.com/macros/s/AKfyc.../exec`

---

## STEP 3 — Connect Script to Website

1. Open `script.js` in any text editor (VS Code, Notepad)
2. Line 10 — find:
   ```
   const SHEET_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```
3. Replace with your actual URL:
   ```
   const SHEET_URL = "https://script.google.com/macros/s/YOUR_ID/exec";
   ```
4. Save the file

---

## STEP 4 — Deploy to GitHub + Vercel

### GitHub
1. Go to **github.com** → Sign in → Click **New Repository**
2. Name it: `teqniko-website`
3. Set to **Public** → Create Repository
4. Upload all 5 files:
   - `index.html`
   - `cart.html`
   - `thankyou.html`
   - `style.css`
   - `script.js`
   (Do NOT upload google-apps-script.js — that stays on Google)
5. Click **Commit changes**

### Vercel
1. Go to **vercel.com** → Sign in with GitHub
2. Click **Add New Project**
3. Select your `teqniko-website` repo
4. Click **Deploy** — done!
5. Vercel gives you a URL like: `teqniko-website.vercel.app`

---

## STEP 5 — Test Everything

1. Open your Vercel URL
2. Add 2-3 products to enquiry
3. Go to cart → fill the form → submit
4. Check your Google Sheet — you should see:
   - **"Enquiries"** tab: your submission
   - **"Visitor Tracking"** tab: page visits + products viewed

---

## What Gets Tracked in Google Sheet

### Enquiries Tab
| Column | What it captures |
|--------|-----------------|
| Timestamp | When submitted |
| Query ID | Unique ID (e.g. TQ123456) |
| Name | Customer name |
| Company | Company name |
| Phone | Mobile number |
| Email | Email (optional) |
| City | Location |
| Products | All selected products |
| Message | Any notes |
| Device | Mobile / Desktop |
| Source | Where they came from |
| Status | New (update manually) |

### Visitor Tracking Tab
| Column | What it captures |
|--------|-----------------|
| Session ID | Unique visitor session |
| Event | page_visit / product_viewed / add_to_cart / form_partial |
| Product | Which product they viewed/added |
| Email/Phone | If they started filling form but didn't submit |

---

## Custom Domain (Optional)
1. In Vercel → Project Settings → Domains
2. Add your domain (e.g. teqnikoengineering.com)
3. Update DNS as Vercel instructs

---

## Questions?
Contact your developer with this README.
