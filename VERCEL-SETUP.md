# Deploy on Vercel

1. Extract the ZIP. Upload or push its **contents** to the GitHub repository. The root must contain `package.json`, `vercel.json`, `server.mjs`, `api/`, `lib/`, and `dist/`. Do not upload just the ZIP or just `dist/`.
2. In Vercel, import the repository or update the existing project's **Settings → Build and Deployment**:
   - Framework Preset: **Other**
   - Root Directory: the folder containing `package.json` and `vercel.json`. Leave the default if they are at the repository root.
   - Build Command: **npm run build**
   - Output Directory: **public**
   - Node.js: **22.x**
3. Redeploy the latest Git commit. Open the URL of a deployment marked **Ready**.
4. Check `/api/universities` on that same URL. It should return the current university names as a JSON list. The home page should display the selector.

The build copies only the three frontend files into `public/`. Vercel runs the separate Node.js API functions from `api/`. Do not add a catch-all rewrite that sends `/api/*` to `index.html`. The Cloudflare build in `dist/server/` is not used by Vercel.

Google Sheet viewing remains available while the sheet is shared as Anyone with the link → Viewer. Saving requires the separate one-time Google setup in `EDITOR-SETUP.md`; a Vercel deployment does not grant spreadsheet write permission.

If you still see 404, verify that Vercel imported the correct repository and branch, that the configured Root Directory contains the files above, and that you opened the newest Ready deployment's URL. Send the website URL and build log to diagnose any remaining issue. A 404 alone does not uniquely identify its cause.

No deployment credentials or editor key should be committed to GitHub.

Vercel documentation: https://vercel.com/docs/functions/runtimes/node-js and https://vercel.com/docs/project-configuration/vercel-json
