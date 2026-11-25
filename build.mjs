import fs from 'fs';
import { execSync } from 'child_process';

const PROJ = 'C:/Users/cript/OneDrive/Escritorio/Antigravity/Informe Visita Tecnica HyS';
const EXCEL = 'C:/Users/cript/OneDrive/Escritorio/Antigravity/Dec 351 Recomendaciones/Recomendaciones.xlsx';
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1STF7Y269MUqsLqGYDUrhzN5jPLri0CdyKg0ysfCMlTg/edit';
const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbw9Qgh1_I8OdWXr8QtuBqOzJmzZKDr86huNpACcLe75NJDn_Lcv4rDdBp1ICv7n3VkDAg/exec';

// Extraer catálogo oficial Dec. 351/79 desde Excel
const catalogoJson = execSync(`python "${PROJ}/scripts/extract_351.py"`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }).trim();
const catalogoArr = JSON.parse(catalogoJson);
console.log('Catálogo Dec. 351/79 cargado:', catalogoArr.length, 'ítems');

const css = fs.readFileSync(`${PROJ}/src/styles.css`, 'utf8');
let js = fs.readFileSync(`${PROJ}/src/app.js`, 'utf8');
let tpl = fs.readFileSync(`${PROJ}/src/template.html`, 'utf8');

js = js
  .replace('__CATALOGO_351__', catalogoJson.replace(/<\/script>/gi, '<\\/script>'))
  .replace('__SHEET_URL__', SHEET_URL)
  .replace('__WEBAPP_URL__', WEBAPP_URL);

// Validar sintaxis del JS antes de escribir
new Function(js);
console.log('Validación sintaxis JS: OK (' + js.length + ' caracteres)');

const finalHtml = tpl
  .replace('__SHEET_URL__', SHEET_URL)
  .replace('/*__INLINE_CSS__*/', () => css)
  .replace('/*__INLINE_JS__*/', () => js);

const outputs = [
  `${PROJ}/index.html`,
  'C:/Users/cript/OneDrive/Escritorio/relevamiento-hys.html'
];

outputs.forEach(p => {
  fs.writeFileSync(p, finalHtml, 'utf8');
  console.log('Compilado:', p, '(' + Math.round(finalHtml.length / 1024) + ' KB)');
});
