import fs from 'node:fs';
const output = new URL('./public/', import.meta.url);
fs.mkdirSync(output, { recursive: true });
for (const name of ['index.html', 'app.js', 'style.css']) {
  fs.copyFileSync(new URL('./dist/' + name, import.meta.url), new URL(name, output));
}
console.log('Vercel frontend built in public/. API functions are in api/.');
