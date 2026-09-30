# Nexera Dine — Restaurant Total Solution landing page

Static landing page (HTML + CSS + vanilla JS, no build step) presenting:

1. **Restaurant Operations System** — inventory, accounting, internal transfers, purchasing, recipe costing
2. **POS System**
3. **Restaurant Website** with online ordering
4. **WhatsApp AI Bot** — order, check locations, pay, talk to a live agent
5. **AI Voice Call Agent**

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

## Customise

- Colours / fonts: CSS variables at the top of `styles.css`
- Contact details: `#contact` section in `index.html` (WhatsApp number, email)
- Demo form: front-end only — connect the submit handler in `script.js` to your backend, CRM or WhatsApp API
