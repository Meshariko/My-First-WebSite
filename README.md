# Meshari — Planner Portfolio

Static portfolio scaffold for Meshari (Planner) with a contact form ready to be connected to a backend or service.

What you get
- `index.html` — portfolio entry page
- `css/styles.css` — styles (light/dark support)
- `js/app.js` — JS behaviors (nav, theme toggle, contact form handling)
- `amplify.yml` — example Amplify build settings

Quick local preview

PowerShell (if Python is installed):

```powershell
cd "C:\Users\user\Desktop\My First WebSite"
python -m http.server 8000
```

Open http://localhost:8000 in a browser.

Contact form
- The form in `index.html` has an attribute `data-endpoint` you can set to an HTTP endpoint to receive POST requests.
- If `data-endpoint` is empty, the form will open the visitor's email client with a pre-filled message (mailto fallback).

Deploy to AWS Amplify (GitHub)
1. Create a GitHub repo and push this project.
2. In the AWS Console go to Amplify > All apps > Connect app.
3. Choose GitHub, authorize if needed, select the repository and branch.
4. Use the default build settings or paste the included `amplify.yml`.

Notes
- To receive messages without an email client, use a serverless function or third-party form service and set its URL in the form's `data-endpoint`.
- This project has no build toolchain on purpose; add one if you need asset compilation.
