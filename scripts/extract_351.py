import json, openpyxl, sys

EXCEL = r'C:/Users/cript/OneDrive/Escritorio/Antigravity/Dec 351 Recomendaciones/Recomendaciones.xlsx'
wb = openpyxl.load_workbook(EXCEL, data_only=True)
ws = wb['Recom y denuncias']

items = []
cat = 'GENERAL'
for i, r in enumerate(ws.iter_rows(values_only=True)):
    if i == 0:
        continue
    rgrl, c741, rec, det, riesgo, plazo, gasto, kw = (list(r) + [None] * 8)[:8]
    if not det or not str(det).strip():
        continue
    det = str(det).strip()
    if not riesgo and not plazo:
        cat = det
        continue
    items.append({
        'rgrl': str(rgrl).strip() if rgrl is not None else '',
        'cat': cat,
        'detalle': det,
        'riesgo': str(riesgo).strip() if riesgo else 'Moderado',
        'plazo': str(plazo).strip() if plazo else '3 meses',
        'gasto': str(gasto).strip() if gasto else 'Medio',
        'kw': str(kw).strip() if kw else ''
    })

sys.stdout.reconfigure(encoding='utf-8')
print(json.dumps(items, ensure_ascii=False))
