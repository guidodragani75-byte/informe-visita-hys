/**
 * Backend Google Apps Script · Informe de Visita Técnica HyS 2026
 * Planilla ID: 1STF7Y269MUqsLqGYDUrhzN5jPLri0CdyKg0ysfCMlTg
 * Persistencia completa: Google Sheets (datos, checklist, desvíos, agenda) + Google Drive (fotos + JSON completo).
 */

const SPREADSHEET_ID = '1STF7Y269MUqsLqGYDUrhzN5jPLri0CdyKg0ysfCMlTg';
const IAPSER_SPREADSHEET_ID = '1-eQvCHv3LB6C2ydjY_fXwWEY67e5vbE4GNWIBKSrMfE';
const ROOT_DRIVE_FOLDER_NAME = 'Informes Visita Tecnica HyS 2026';

function cleanDomicilio(s) {
  return String(s || '')
    .replace(/\.00\b/g, '')
    .replace(/\s+-\s+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const IAPSER_CUIT_FALLBACK = {
  'JEFATURA DE POLICIA DE LA PROVINCIA DE ENTRE RIOS': '30-67119808-1',
  'MINISTERIO DE SALUD DE LA PROVINCIA DE ENTRE RIOS': '30-67119808-1',
  'MINISTERIO DE GOBIERNO Y TRABAJO DE LA PROVINCIA DE ENTRE RÍOS': '30-67119808-1',
  'DIRECCION DE ADMINISTRACION SECRETARIA DE ENERGIA DE E.RIOS': '30-67119808-1',
  'UNIVERSIDAD AUTÓNOMA DE ENTRE RÍOS': '30-70755845-1',
  'ADMINISTRADORA TRIBUTARIA DE LA PROVINCIA DE ENTRE RÍOS': '30-71171714-3',
  'CAJA DE JUBILACIONES Y PENSIONES DE ENTRE RIOS': '30-65392098-9',
  'TRIBUNAL DE CUENTAS DE ENTRE RIOS': '30-67610996-6',
  'INSTITUTO DE CONTROL DE ALIMENTACION Y BROMATOLOGIA': '30-71239854-8',
  'ENTE DE PROMOCION DE LA PRODUCCION Y EL EMPLEO DE URDINARRAIN': '30-70838186-5'
};

function getCatalogoIapser() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('iapser_catalog_v2');
  if (cached) {
    try { return JSON.parse(cached); } catch (e) {}
  }
  const ssIapser = SpreadsheetApp.openById(IAPSER_SPREADSHEET_ID);
  const estRows = readSheetObjects(ssIapser, 'Establecimientos');
  const supRows = readSheetObjects(ssIapser, 'Superficie_Establecimientos');

  // Leer CUITs cargados dinámicamente en la pestaña Datos de Informes IAPSER
  const cuitMap = Object.assign({}, IAPSER_CUIT_FALLBACK);
  const shDatos = ssIapser.getSheetByName('Datos');
  if (shDatos && shDatos.getLastRow() >= 1) {
    const dVals = shDatos.getRange(1, 1, shDatos.getLastRow(), Math.min(12, shDatos.getLastColumn())).getValues();
    dVals.forEach(row => {
      const o = String(row[2] || '').trim().toUpperCase();
      const ct = String(row[9] || '').trim();
      if (o && /^\d{2}-\d{8}-\d$/.test(ct)) cuitMap[o] = ct;
    });
  }

  const supMap = {};
  supRows.forEach(r => {
    const key = (String(r['Organismo'] || '').trim().toUpperCase()) + '|' + String(r['N° Estab'] || '').trim();
    supMap[key] = r;
  });

  const items = [];
  estRows.forEach((r, idx) => {
    const org = String(r['Organismo'] || '').trim();
    if (!org) return;
    const nro = String(r['NRO.ESTAB.'] || '').trim();
    const orgUpper = org.toUpperCase();
    const sRow = supMap[orgUpper + '|' + nro] || supRows[idx] || {};
    const dom = cleanDomicilio(sRow['Domicilio'] || r['DOMICILIO'] || '');
    const loc = String(sRow['Localidad'] || r['LOCALIDAD'] || '').trim();
    let prov = String(r['PROVINCIA'] || 'Entre Ríos').trim();
    if (/^e\.?\s*rios$|^entre rios$/i.test(prov)) prov = 'Entre Ríos';
    const nom = String(r['Nombre_establecimiento'] || '').trim();
    const supRaw = String(sRow['Superficie Cubierta (m²)'] || '').trim();
    const sup = supRaw ? supRaw.replace(/[^\d.,]/g, '').replace(',', '.') : '';
    const cuit = String(r['CUIT'] || cuitMap[orgUpper] || '').trim();
    items.push({
      id: String(r['ID_EST.EMPRESA'] || (idx + 1)).trim(),
      org: org,
      cuit: cuit,
      nro: nro,
      nom: nom,
      dom: dom,
      loc: loc,
      prov: prov,
      sup: sup
    });
  });

  try {
    const str = JSON.stringify(items);
    if (str.length < 95000) cache.put('iapser_catalog_v2', str, 600);
  } catch (e) {}
  return items;
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateRootFolder() {
  const it = DriveApp.getFoldersByName(ROOT_DRIVE_FOLDER_NAME);
  if (it.hasNext()) return it.next();
  return DriveApp.createFolder(ROOT_DRIVE_FOLDER_NAME);
}

function getOrCreateVisitFolder(root, folderName, existingUrl) {
  if (existingUrl) {
    const m = String(existingUrl).match(/folders\/([a-zA-Z0-9_-]+)/);
    if (m) {
      try { return DriveApp.getFolderById(m[1]); } catch (e) {}
    }
  }
  const it = root.getFoldersByName(folderName);
  if (it.hasNext()) return it.next();
  return root.createFolder(folderName);
}

function saveDataUrlToDrive(folder, dataUrl, fileName) {
  if (!dataUrl || typeof dataUrl !== 'string') return null;
  if (dataUrl.indexOf('data:') !== 0) return null;
  const parts = dataUrl.split(',');
  if (parts.length < 2) return null;
  const mimeMatch = parts[0].match(/data:([^;]+);base64/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const ext = mime.indexOf('png') !== -1 ? '.png' : '.jpg';
  const bytes = Utilities.base64Decode(parts[1]);
  const blob = Utilities.newBlob(bytes, mime, fileName + ext);
  const file = folder.createFile(blob);
  return { driveFileId: file.getId(), url: file.getUrl(), mime: mime };
}

function driveFileToDataUrl(fileId) {
  if (!fileId) return '';
  try {
    const file = DriveApp.getFileById(fileId);
    const blob = file.getBlob();
    const mime = blob.getContentType() || 'image/jpeg';
    const b64 = Utilities.base64Encode(blob.getBytes());
    return 'data:' + mime + ';base64,' + b64;
  } catch (e) {
    return '';
  }
}

function readSheetObjects(ss, sheetName) {
  const sh = ss.getSheetByName(sheetName);
  if (!sh) return [];
  const vals = sh.getDataRange().getValues();
  if (vals.length < 2) return [];
  const headers = vals[0];
  return vals.slice(1).map(row => {
    const o = {};
    headers.forEach((h, i) => {
      let v = row[i];
      if (v instanceof Date) {
        v = Utilities.formatDate(v, 'America/Argentina/Buenos_Aires', 'yyyy-MM-dd');
      }
      o[h] = v;
    });
    return o;
  });
}

function deleteRowsByVisitId(sh, idVisita, colIndexZeroBased) {
  if (!sh) return;
  const lastRow = sh.getLastRow();
  if (lastRow < 2) return;
  const colVals = sh.getRange(2, colIndexZeroBased + 1, lastRow - 1, 1).getValues();
  for (let i = colVals.length - 1; i >= 0; i--) {
    if (String(colVals[i][0]) === String(idVisita)) {
      sh.deleteRow(i + 2);
    }
  }
}

function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : 'list';

    if (action === 'catalog') {
      const items = getCatalogoIapser();
      return jsonOut({ ok: true, count: items.length, establecimientos: items });
    }

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    if (action === 'list') {
      const informes = readSheetObjects(ss, 'Resumen_Visitas');
      const agenda = readSheetObjects(ss, 'Agenda_Seguimiento');
      return jsonOut({ ok: true, informes: informes.reverse(), agenda: agenda });
    }

    if (action === 'load') {
      const idVisita = e.parameter.id || '';
      const informes = readSheetObjects(ss, 'Resumen_Visitas');
      const rec = informes.find(r => String(r.ID_Visita) === String(idVisita));
      if (!rec || !rec.Archivo_JSON_Drive_ID) {
        return jsonOut({ ok: false, error: 'Informe no encontrado en Drive: ' + idVisita });
      }
      const file = DriveApp.getFileById(rec.Archivo_JSON_Drive_ID);
      const doc = JSON.parse(file.getBlob().getDataAsString('UTF-8'));

      // Hidratar imágenes desde Drive para reimpresión / edición
      if (doc.caratula) {
        if (doc.caratula.coverPhotoDriveId) {
          doc.caratula.coverPhoto = driveFileToDataUrl(doc.caratula.coverPhotoDriveId);
        }
        if (doc.caratula.firmaImgDriveId) {
          doc.caratula.firmaImg = driveFileToDataUrl(doc.caratula.firmaImgDriveId);
        }
      }
      if (Array.isArray(doc.hallazgos)) {
        doc.hallazgos = doc.hallazgos.map(h => {
          const refs = h.photoRefs || [];
          const restored = refs.map(ref => ({
            dataUrl: ref.driveFileId ? driveFileToDataUrl(ref.driveFileId) : '',
            driveFileId: ref.driveFileId || '',
            url: ref.url || ''
          })).filter(x => x.dataUrl);
          return Object.assign({}, h, { photos: restored });
        });
      }
      return jsonOut({ ok: true, informe: doc });
    }

    if (action === 'open_findings') {
      const est = String(e.parameter.est || '').trim().toLowerCase();
      const desvios = readSheetObjects(ss, 'Desvios_Dec351');
      const matched = desvios.filter(d => {
        const nameOk = !est || String(d.Denominacion || '').toLowerCase().indexOf(est) !== -1;
        const openOk = String(d.Estado_Seguimiento || 'Abierto').toLowerCase() !== 'cerrado';
        return nameOk && openOk;
      });
      return jsonOut({ ok: true, findings: matched });
    }

    return jsonOut({ ok: true, status: 'Plan HyS 2026 Backend activo' });
  } catch (err) {
    return jsonOut({ ok: false, error: err.message });
  }
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const req = JSON.parse(raw);
    const action = req.action || 'save';
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    if (action === 'update_agenda_status') {
      const shAg = ss.getSheetByName('Agenda_Seguimiento');
      if (!shAg) return jsonOut({ ok: false, error: 'Falta hoja Agenda_Seguimiento' });
      const vals = shAg.getDataRange().getValues();
      for (let i = 1; i < vals.length; i++) {
        if (String(vals[i][0]) === String(req.idHito)) {
          shAg.getRange(i + 1, 14).setValue(req.estado || 'Pendiente');
          return jsonOut({ ok: true, idHito: req.idHito, estado: req.estado });
        }
      }
      return jsonOut({ ok: false, error: 'Hito no encontrado' });
    }

    // ACTION = SAVE (Borrador o Emitido)
    const doc = req.informe || {};
    const idVisita = doc.idVisita || ('IVT-' + Utilities.formatDate(new Date(), 'America/Argentina/Buenos_Aires', 'yyyyMMdd-HHmmss'));
    const nowStr = Utilities.formatDate(new Date(), 'America/Argentina/Buenos_Aires', 'dd/MM/yyyy HH:mm');
    const c = doc.caratula || {};
    const s = doc.sintesis || {};
    const desc = doc.descripcion || {};
    const sectores = desc.sectores || [];
    const hallazgos = doc.hallazgos || [];
    const agendaVisitas = doc.agendaVisitas || [];

    // 1. Subir fotos nuevas a Drive y guardar JSON maestro
    const rootFolder = getOrCreateRootFolder();
    const safeDenom = String(c.denominacion || 'Sin_Denominacion').replace(/[^a-zA-Z0-9 _-]/g, '').trim().slice(0, 40) || 'Establecimiento';
    const fechaSlug = String(c.fechaVisita || Utilities.formatDate(new Date(), 'America/Argentina/Buenos_Aires', 'yyyy-MM-dd')).slice(0, 10);
    const visitFolder = getOrCreateVisitFolder(rootFolder, fechaSlug + '_' + safeDenom + '_' + idVisita, doc.driveFolderUrl);

    const docToStore = JSON.parse(JSON.stringify(doc));
    docToStore.idVisita = idVisita;
    docToStore.ultimaActualizacion = nowStr;
    docToStore.driveFolderUrl = visitFolder.getUrl();

    // Portada y firma
    if (c.coverPhoto && c.coverPhoto.indexOf('data:') === 0 && !c.coverPhotoDriveId) {
      const saved = saveDataUrlToDrive(visitFolder, c.coverPhoto, 'portada_' + idVisita);
      if (saved) docToStore.caratula.coverPhotoDriveId = saved.driveFileId;
    }
    docToStore.caratula.coverPhoto = '';

    if (c.firmaImg && c.firmaImg.indexOf('data:') === 0 && !c.firmaImgDriveId) {
      const saved = saveDataUrlToDrive(visitFolder, c.firmaImg, 'firma_' + idVisita);
      if (saved) docToStore.caratula.firmaImgDriveId = saved.driveFileId;
    }
    docToStore.caratula.firmaImg = '';

    // Fotos de hallazgos
    const hallazgosForSheet = [];
    docToStore.hallazgos = hallazgos.map((h, hIdx) => {
      const photoRefs = [];
      const photos = h.photos || [];
      photos.forEach((p, pIdx) => {
        if (p && p.driveFileId) {
          photoRefs.push({ driveFileId: p.driveFileId, url: p.url || ('https://drive.google.com/file/d/' + p.driveFileId + '/view') });
        } else if (p && p.dataUrl && p.dataUrl.indexOf('data:') === 0) {
          const saved = saveDataUrlToDrive(visitFolder, p.dataUrl, 'hallazgo_' + (hIdx + 1) + '_foto_' + (pIdx + 1));
          if (saved) photoRefs.push({ driveFileId: saved.driveFileId, url: saved.url });
        } else if (typeof p === 'string' && p.indexOf('data:') === 0) {
          const saved = saveDataUrlToDrive(visitFolder, p, 'hallazgo_' + (hIdx + 1) + '_foto_' + (pIdx + 1));
          if (saved) photoRefs.push({ driveFileId: saved.driveFileId, url: saved.url });
        }
      });
      hallazgosForSheet.push(Object.assign({}, h, { photoUrls: photoRefs.map(r => r.url).join(' | ') }));
      const copy = Object.assign({}, h, { photoRefs: photoRefs });
      delete copy.photos;
      return copy;
    });

    // Guardar / sobrescribir informe_completo.json en Drive
    let jsonFileId = doc.jsonFileId || '';
    const jsonBlobStr = JSON.stringify(docToStore, null, 2);
    if (jsonFileId) {
      try {
        DriveApp.getFileById(jsonFileId).setContent(jsonBlobStr);
      } catch (err) {
        jsonFileId = '';
      }
    }
    if (!jsonFileId) {
      const jf = visitFolder.createFile('informe_completo.json', jsonBlobStr, MimeType.PLAIN_TEXT);
      jsonFileId = jf.getId();
    }

    // 2. Actualizar Resumen_Visitas (sin duplicar)
    const shRes = ss.getSheetByName('Resumen_Visitas');
    if (shRes) {
      deleteRowsByVisitId(shRes, idVisita, 0);
      const chkVals = Object.values(doc.checklist || {});
      const cantNC = chkVals.filter(v => v.estado === 'NC').length;
      const cantOBS = chkVals.filter(v => v.estado === 'OBS').length;
      const proxVisita = agendaVisitas.length > 0 ? (agendaVisitas[0].fecha || '') : '';
      const tareasStr = (s.acciones || []).join(', ')
        + ((s.secundarias && s.secundarias.length) ? ' | Secundarias: ' + s.secundarias.join(', ') : '')
        + (s.otroAccion ? ' | ' + s.otroAccion : '');
      shRes.appendRow([
        idVisita,
        doc.estadoInforme || 'Borrador',
        doc.revision || 1,
        nowStr,
        doc.fechaCierre || '',
        c.organismo || '',
        c.estNro || '',
        c.denominacion || '',
        c.domicilio || '',
        c.cuit || '',
        c.fechaVisita || '',
        desc.actividadGeneral || '',
        desc.superficie || '',
        desc.pisos || '',
        sectores.length,
        desc.riesgoEspecial ? 'Sí' : 'No',
        c.categoria || '',
        c.visitaNro || '',
        c.profNombre || '',
        c.profMat || '',
        c.respEst || '',
        tareasStr,
        (s.pendientes || []).join(', '),
        (doc.anexos && doc.anexos.evacEstado) || 'Pendiente',
        (doc.anexos && doc.anexos.extEstado) || 'Pendiente',
        cantNC,
        cantOBS,
        hallazgos.length,
        proxVisita,
        visitFolder.getUrl(),
        jsonFileId
      ]);
    }

    // 3. Actualizar Sectores_Establecimiento
    const shSec = ss.getSheetByName('Sectores_Establecimiento');
    if (shSec) {
      deleteRowsByVisitId(shSec, idVisita, 0);
      if (sectores.length > 0) {
        const rows = sectores.map(sec => [
          idVisita, c.fechaVisita || '', c.denominacion || '',
          sec.piso || '', sec.nombre || '', sec.actividad || '', sec.sup || '', sec.obs || ''
        ]);
        shSec.getRange(shSec.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
      }
    }

    // 4. Actualizar Desvios_Dec351
    const shDesv = ss.getSheetByName('Desvios_Dec351');
    if (shDesv) {
      deleteRowsByVisitId(shDesv, idVisita, 0);
      if (hallazgosForSheet.length > 0) {
        const rows = hallazgosForSheet.map((h, i) => [
          idVisita, c.fechaVisita || '', c.denominacion || '', i + 1,
          h.ids || '', h.ubicacion || '', h.incumplimiento || '', h.riesgo || '',
          h.prioridad || '', h.gravedad351 || '', h.plazo || '', h.fechaVencimiento || '',
          h.medida || '', h.responsable || '', h.rgrl || '', h.cat351 || '',
          h.photoUrls || '', h.estadoSeg || 'Abierto'
        ]);
        shDesv.getRange(shDesv.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
      }
    }

    // 5. Actualizar Agenda_Seguimiento (vencimientos de incumplimientos + visitas acordadas)
    const shAg = ss.getSheetByName('Agenda_Seguimiento');
    if (shAg) {
      deleteRowsByVisitId(shAg, idVisita, 1);
      const agRows = [];
      hallazgosForSheet.forEach((h, i) => {
        if (h.fechaVencimiento) {
          agRows.push([
            idVisita + '-H' + (i + 1),
            idVisita,
            c.denominacion || '',
            c.estNro || '',
            'Vencimiento Incumplimiento',
            h.ids || ('H' + (i + 1)),
            h.ubicacion || '',
            h.incumplimiento || '',
            c.fechaVisita || '',
            h.plazo || '',
            h.fechaVencimiento || '',
            h.prioridad || '',
            h.responsable || '',
            h.estadoSeg === 'Cerrado' ? 'Cumplido' : 'Pendiente'
          ]);
        }
      });
      agendaVisitas.forEach((v, i) => {
        if (v.fecha) {
          agRows.push([
            idVisita + '-V' + (i + 1),
            idVisita,
            c.denominacion || '',
            c.estNro || '',
            'Visita Acordada',
            v.tipo || ('Visita ' + (i + 2)),
            c.domicilio || '',
            v.tareas || 'Visita de seguimiento programada',
            c.fechaVisita || '',
            'Acordada',
            v.fecha,
            'Programada',
            c.profNombre || '',
            'Pendiente'
          ]);
        }
      });
      if (agRows.length > 0) {
        shAg.getRange(shAg.getLastRow() + 1, 1, agRows.length, agRows[0].length).setValues(agRows);
      }
    }

    // 6. Anexos opcionales / obligatorios (solo si Completado)
    const anexos = doc.anexos || {};
    if (anexos.evacEstado === 'Completado' && anexos.evac) {
      const ev = anexos.evac;
      const shESec = ss.getSheetByName('Evac_Sectores');
      if (shESec) {
        deleteRowsByVisitId(shESec, idVisita, 0);
        if (ev.sectores && ev.sectores.length) {
          const r = ev.sectores.map(x => [idVisita, c.fechaVisita||'', c.denominacion||'', x.sector||'', x.sup||'', x.manana||'', x.tarde||'', x.noche||'', x.movRed||'', x.obs||'']);
          shESec.getRange(shESec.getLastRow()+1, 1, r.length, r[0].length).setValues(r);
        }
      }
      const shESal = ss.getSheetByName('Evac_Salidas');
      if (shESal) {
        deleteRowsByVisitId(shESal, idVisita, 0);
        if (ev.salidas && ev.salidas.length) {
          const r = ev.salidas.map((x,i) => [idVisita, c.fechaVisita||'', c.denominacion||'', i+1, x.ubicacion||'', x.tipo||'', x.ancho||'', x.apertura||'', x.libre||'', x.senalizada||'', x.foto||'']);
          shESal.getRange(shESal.getLastRow()+1, 1, r.length, r[0].length).setValues(r);
        }
      }
      const shEEl = ss.getSheetByName('Evac_Elementos');
      if (shEEl) {
        deleteRowsByVisitId(shEEl, idVisita, 0);
        if (ev.elementos && ev.elementos.length) {
          const r = ev.elementos.map(x => [idVisita, c.fechaVisita||'', c.denominacion||'', x.nombre||'', x.existe||'', x.cantidad||'', x.ubicacion||'', x.estado||'', x.foto||'']);
          shEEl.getRange(shEEl.getLastRow()+1, 1, r.length, r[0].length).setValues(r);
        }
      }
      const shEPl = ss.getSheetByName('Evac_Plano');
      if (shEPl && ev.plano) {
        deleteRowsByVisitId(shEPl, idVisita, 0);
        shEPl.appendRow([idVisita, c.fechaVisita||'', c.denominacion||'', ev.plano.existe||'', ev.plano.vigente||'', ev.plano.coincide||'', '', ev.plano.obs||'']);
      }
    }

    if (anexos.extEstado === 'Completado' && anexos.fuego) {
      const fg = anexos.fuego;
      const shExt = ss.getSheetByName('Extintores');
      if (shExt) {
        deleteRowsByVisitId(shExt, idVisita, 0);
        if (fg.extintores && fg.extintores.length) {
          const r = fg.extintores.map((x,i) => [idVisita, c.fechaVisita||'', c.denominacion||'', i+1, x.ubicacion||'', x.agente||'', x.vencCarga||'', x.vencPH||'', x.estadoVisual||'', x.acceso||'', x.desvio||'', x.foto||'']);
          shExt.getRange(shExt.getLastRow()+1, 1, r.length, r[0].length).setValues(r);
        }
      }
      const shHid = ss.getSheetByName('Hidrantes');
      if (shHid) {
        deleteRowsByVisitId(shHid, idVisita, 0);
        if (fg.hidrantes && fg.hidrantes.length) {
          const r = fg.hidrantes.map((x,i) => [idVisita, c.fechaVisita||'', c.denominacion||'', i+1, x.ubicacion||'', x.gabinete||'', x.manguera||'', x.lanza||'', x.llave||'', x.acceso||'', x.desvio||'', x.foto||'']);
          shHid.getRange(shHid.getLastRow()+1, 1, r.length, r[0].length).setValues(r);
        }
      }
    }

    // 7. Registros de Acciones Plan HyS 2026 (RGRL, NTEAR/RAR, EPP, Ergonomía, Capacitaciones) -> EPP_Ergo_Cap
    const shEec = ss.getSheetByName('EPP_Ergo_Cap');
    if (shEec) {
      deleteRowsByVisitId(shEec, idVisita, 0);
      const rt = doc.registrosTareas || {};
      const acc = s.acciones || [];
      const eecRows = [];
      if (acc.indexOf('RGRL (confección y carga)') !== -1 && rt.rgrl) {
        eecRows.push([idVisita, c.fechaVisita||'', c.denominacion||'', 'RGRL', rt.rgrl.ofrecimiento||'Realizado', c.fechaVisita||'', '', '', '', rt.rgrl.obs||'']);
      }
      if (acc.indexOf('NTEAR / RAR (confección y carga)') !== -1 && rt.ntear) {
        eecRows.push([idVisita, c.fechaVisita||'', c.denominacion||'', 'NTEAR / RAR', rt.ntear.ofrecimiento||'Realizado', c.fechaVisita||'', '', '', '', rt.ntear.obs||'']);
      }
      if (acc.indexOf('Asesoramiento en EPP') !== -1 && rt.epp) {
        eecRows.push([idVisita, c.fechaVisita||'', c.denominacion||'', 'Asesoramiento EPP', 'Realizado', c.fechaVisita||'', rt.epp.puestos||'', '', rt.epp.constancia||'', rt.epp.obs||'']);
      }
      if (acc.indexOf('Estudios de ergonomía (Planillas 1 y 2)') !== -1 && rt.ergonomia) {
        eecRows.push([idVisita, c.fechaVisita||'', c.denominacion||'', 'Ergonomía (Planillas 1 y 2)', rt.ergonomia.planillas||'Realizado', c.fechaVisita||'', rt.ergonomia.puestos||'', '', '', rt.ergonomia.obs||'']);
      }
      if (acc.indexOf('Capacitación básica en HyS') !== -1 && rt.capHys) {
        eecRows.push([idVisita, c.fechaVisita||'', c.denominacion||'', 'Capacitación HyS', 'Realizado', c.fechaVisita||'', rt.capHys.asistentes||'', '', rt.capHys.constancia||'', rt.capHys.obs||'']);
      }
      if (acc.indexOf('Capacitación sobre roles y responsabilidades en caso de evacuación') !== -1 && rt.capEvac) {
        eecRows.push([idVisita, c.fechaVisita||'', c.denominacion||'', 'Capacitación Evacuación', 'Realizado', c.fechaVisita||'', rt.capEvac.asistentes||'', rt.capEvac.rolesDefinidos||'', rt.capEvac.constancia||'', rt.capEvac.obs||'']);
      }
      if (eecRows.length > 0) {
        shEec.getRange(shEec.getLastRow() + 1, 1, eecRows.length, eecRows[0].length).setValues(eecRows);
      }
    }

    return jsonOut({
      ok: true,
      idVisita: idVisita,
      estadoInforme: doc.estadoInforme || 'Borrador',
      revision: doc.revision || 1,
      folderUrl: visitFolder.getUrl(),
      jsonFileId: jsonFileId,
      timestamp: nowStr
    });
  } catch (err) {
    return jsonOut({ ok: false, error: err.message });
  }
}
