const CATALOGO_351 = __CATALOGO_351__;
let ESTABLECIMIENTOS_IAPSER = [];
let ORGANISMOS_IAPSER = [];
const PADRON_CACHE_KEY = "iapser_padron_cache_v1";
const SHEET_URL = "__SHEET_URL__";
const WEBAPP_URL = "__WEBAPP_URL__";
const DEFAULT_GEMINI_KEY = "";
const STORAGE_KEY = "ivt_hys_2026_v3";

// 49 ÍTEMS EXACTOS DEL MODELO PDF (PÁGS. 2 A 7)
const CHECKLIST_DEF = [
  {
    code: 'A', title: 'A. Gestión y documentación', items: [
      ['A1', 'Servicio de Higiene y Seguridad designado y legajo técnico disponible.'],
      ['A2', 'Nómina del personal, puestos y sectores actualizada.'],
      ['A3', 'Identificación de peligros y evaluación de riesgos por puesto.'],
      ['A4', 'Registro de entrega de EPP y determinación según los riesgos.'],
      ['A5', 'Plan anual y registros de capacitación.'],
      ['A6', 'Programa y registros de mantenimiento preventivo.'],
      ['A7', 'Protocolos vigentes de iluminación, ruido, ergonomía y puesta a tierra.'],
      ['A8', 'Análisis físico-químico y bacteriológico del agua vigente.'],
      ['A9', 'Plan de emergencia, roles, simulacros y registros.']
    ]
  },
  {
    code: 'B', title: 'B. Condiciones edilicias e higiene', items: [
      ['B1', 'Orden y limpieza de los sectores.'],
      ['B2', 'Circulaciones y accesos libres de obstáculos.'],
      ['B3', 'Pisos y desniveles sin riesgo de caída.'],
      ['B4', 'Paredes, techos, aberturas y cielorrasos en condiciones seguras.'],
      ['B5', 'Escaleras, rampas y barandas en condiciones seguras.'],
      ['B6', 'Salidas y vías de evacuación libres e identificadas.'],
      ['B7', 'Iluminación general adecuada.'],
      ['B8', 'Iluminación de emergencia operativa.'],
      ['B9', 'Ventilación suficiente en locales ocupados.'],
      ['B10', 'Baños en condiciones higiénicas y funcionales.'],
      ['B11', 'Cocina, comedor y vestuarios en condiciones higiénicas.'],
      ['B12', 'Agua potable disponible y depósitos protegidos.'],
      ['B13', 'Atención al público y accesibilidad en condiciones seguras.'],
      ['B14', 'Residuos retirados y almacenados de manera segura.']
    ]
  },
  {
    code: 'C', title: 'C. Riesgo eléctrico, herramientas y equipos', items: [
      ['C1', 'Tableros cerrados, identificados y con acceso libre.'],
      ['C2', 'Protecciones termomagnéticas y diferenciales instaladas.'],
      ['C3', 'Puesta a tierra y continuidad de masas verificadas.'],
      ['C4', 'Medición de puesta a tierra vigente.'],
      ['C5', 'Conductores, tomas, fichas, extensiones y canalizaciones en buen estado.'],
      ['C6', 'Mantenimiento eléctrico realizado por personal autorizado.'],
      ['C7', 'Protección contra contactos directos e indirectos.'],
      ['C8', 'Herramientas en buen estado, ordenadas y con protecciones.'],
      ['C9', 'Máquinas con resguardos, parada de emergencia y bloqueo.'],
      ['C10', 'Ascensores, equipos de izaje y aparatos a presión con controles vigentes.'],
      ['C11', 'Cilindros de gases sujetos, identificados y almacenados correctamente.'],
      ['C12', 'Vehículos asignados con elementos de seguridad y mantenimiento.']
    ]
  },
  {
    code: 'D', title: 'D. Incendio, emergencia y primeros auxilios', items: [
      ['D1', 'Estudio de carga de fuego vigente.'],
      ['D2', 'Cantidad y distribución de extintores acorde al riesgo.'],
      ['D3', 'Extintores vigentes, señalizados, visibles y accesibles.'],
      ['D4', 'Registros de recarga, mantenimiento y prueba hidráulica.'],
      ['D5', 'Señalización de salidas, recorridos y punto de encuentro.'],
      ['D6', 'Planos de evacuación disponibles y actualizados.'],
      ['D7', 'Roles de emergencia designados y comunicados.'],
      ['D8', 'Simulacros de evacuación realizados y documentados.'],
      ['D9', 'Detección, alarma e instalaciones fijas controladas, si aplican.'],
      ['D10', 'Botiquín identificado, accesible y con vencimientos controlados.'],
      ['D11', 'Números de emergencia y procedimiento de actuación disponibles.']
    ]
  },
  {
    code: 'E', title: 'E. Salud ocupacional y agentes de riesgo', items: [
      ['E1', 'Puestos administrativos evaluados ergonómicamente.'],
      ['E2', 'Medidas de mejora ergonómica implementadas y seguidas.'],
      ['E3', 'Fuentes de ruido identificadas y protocolo vigente, si corresponde.'],
      ['E4', 'Condiciones térmicas evaluadas cuando exista exposición.'],
      ['E5', 'Contaminantes ambientales identificados y medidos cuando corresponda.'],
      ['E6', 'Sustancias químicas identificadas y con hojas de datos de seguridad.'],
      ['E7', 'Productos incompatibles separados y medios para control de derrames.'],
      ['E8', 'Exámenes médicos periódicos coordinados según riesgos declarados.']
    ]
  }
];

// ACCIONES PRINCIPALES EXACTAS DEL PLAN DE HIGIENE Y SEGURIDAD 2026 (GOB. ENTRE RÍOS)
const ACCIONES_LIST = [
  'RGRL (confección y carga)',
  'NTEAR / RAR (confección y carga)',
  'Cronograma de trabajo',
  'Asesoramiento en EPP',
  'Relevamiento de datos para el plan de evacuación',
  'Informe fotográfico y de desvíos con acciones correctivas',
  'Seguimiento de desvíos',
  'Estudios de ergonomía (Planillas 1 y 2)',
  'Capacitación básica en HyS',
  'Capacitación sobre roles y responsabilidades en caso de evacuación',
  'Control y verificación de extintores e hidrantes'
];

// TAREAS SECUNDARIAS: MEDICIONES Y DEMÁS ACTUACIONES
const TAREAS_SECUNDARIAS_LIST = [
  'Medición de puesta a tierra (Res. SRT 900/15)',
  'Medición de iluminación (Res. SRT 84/12)',
  'Medición de ruido (Res. SRT 85/12)',
  'Muestra y análisis de agua (físico-químico y bacteriológico)',
  'Relevamiento para estudio de carga de fuego',
  'Medición de carga térmica / estrés térmico',
  'Medición de contaminantes ambientales',
  'Entrega de cartelería / folletería',
  'Recordatorios telefónicos o virtuales (Cat. C)'
];

const ACCION_EVAC = 'Relevamiento de datos para el plan de evacuación';
const ACCION_EXT = 'Control y verificación de extintores e hidrantes';
const ACCION_FOTO = 'Informe fotográfico y de desvíos con acciones correctivas';
const ACCION_CRONO = 'Cronograma de trabajo';
const ACCION_SEG = 'Seguimiento de desvíos';
const ACCION_RGRL = 'RGRL (confección y carga)';
const ACCION_NTEAR = 'NTEAR / RAR (confección y carga)';
const ACCION_EPP = 'Asesoramiento en EPP';
const ACCION_ERGO = 'Estudios de ergonomía (Planillas 1 y 2)';
const ACCION_CAP_HYS = 'Capacitación básica en HyS';
const ACCION_CAP_EVAC = 'Capacitación sobre roles y responsabilidades en caso de evacuación';

const PENDIENTES_LIST = [
  'Iluminación',
  'Puesta a tierra',
  'Ergonomía',
  'Carga de fuego',
  'Plan de evacuación',
  'Documentación técnica'
];

// Mapeo automático de estudios pendientes -> IDs de checklist
const PENDIENTE_A_IDS = {
  'Iluminación': { ids: ['B7', 'A7'], nota: 'Estudio de iluminación pendiente. Se realizará en próxima visita.' },
  'Puesta a tierra': { ids: ['C3', 'C4', 'A7'], nota: 'Medición de puesta a tierra y continuidad de masas pendiente.' },
  'Ergonomía': { ids: ['E1', 'E2', 'A7'], nota: 'Evaluación ergonómica (Planillas 1 y 2) pendiente de realizar en próxima visita.' },
  'Carga de fuego': { ids: ['D1'], nota: 'Estudio de carga de fuego pendiente de elaboración.' },
  'Plan de evacuación': { ids: ['A9', 'D5', 'D6', 'D7', 'D8'], nota: 'Plan de evacuación, planos, señalización, roles y simulacro pendientes.' }
};

function crearEstadoVacio() {
  const checklist = {};
  CHECKLIST_DEF.forEach(g => g.items.forEach(([id]) => {
    checklist[id] = { estado: '', obs: '', auto: false };
  }));
  return {
    idVisita: 'IVT-' + Date.now(),
    estadoInforme: 'Borrador', // 'Borrador' | 'Emitido'
    revision: 1,
    fechaCierre: '',
    ultimaActualizacion: '',
    driveFolderUrl: '',
    jsonFileId: '',
    pasoActual: 1,
    pasoMaxHabilitado: 1,
    caratula: {
      organismo: '',
      estNro: '',
      denominacion: '',
      domicilio: '',
      cuit: '',
      fechaVisita: '',
      horaVisita: '',
      categoria: 'B',
      visitaNro: '',
      profNombre: '',
      profMat: '',
      respEst: '',
      coverPhoto: '',
      coverPhotoDriveId: '',
      firmaImg: '',
      firmaImgDriveId: ''
    },
    descripcion: {
      actividadGeneral: '',
      turnos: '',
      antiguedad: '',
      superficie: '',
      supDescubierta: '',
      pisos: '',
      tipologia: '',
      complementarios: '',
      riesgoEspecial: false,
      sectores: [],
      cantTrabajadores: '',
      desglosePersonal: '',
      ocupacionPublico: '',
      eventos: '',
      tercerizados: '',
      procesos: '',
      mantenimiento: '',
      quimicos: '',
      combustibles: '',
      otrosMateriales: '',
      noAccesibles: '',
      obsPendientes: '',
      parrafosIA: ''
    },
    sintesis: {
      obj1: '',
      obj2: 'El relevamiento es visual y documental y se limita a los sectores accesibles y a las condiciones existentes al momento de la visita. No reemplaza mediciones, ensayos, cálculos ni verificaciones profesionales específicas cuando correspondan.',
      acciones: [],
      secundarias: [],
      otroAccion: '',
      pendientes: [],
      pendNota: '',
      docEntregada: ''
    },
    registrosTareas: {
      rgrl: { ofrecimiento: '', obs: '' },
      ntear: { ofrecimiento: '', obs: '' },
      epp: { puestos: '', constancia: '', obs: '' },
      ergonomia: { puestos: '', planillas: '', obs: '' },
      capHys: { asistentes: '', constancia: '', obs: '' },
      capEvac: { asistentes: '', rolesDefinidos: '', constancia: '', obs: '' }
    },
    sinDesviosFoto: false,
    hallazgos: [],
    checklist,
    seguimientoIntro: 'Se utiliza la presentación inicial ante la ART o informe anterior como referencia para el seguimiento.',
    seguimiento: [],
    agendaVisitas: [],
    conclusion: '',
    anexos: {
      evacEstado: 'Pendiente',
      extEstado: 'Pendiente',
      evac: {
        sectores: [],
        salidas: [],
        elementos: [
          { nombre: 'Luces de emergencia', existe: '', cantidad: '', ubicacion: '', estado: '', foto: '' },
          { nombre: 'Alarma / pulsadores', existe: '', cantidad: '', ubicacion: '', estado: '', foto: '' },
          { nombre: 'Tablero eléctrico y llave de corte', existe: '', cantidad: '', ubicacion: '', estado: '', foto: '' },
          { nombre: 'Llaves de corte de gas / agua', existe: '', cantidad: '', ubicacion: '', estado: '', foto: '' },
          { nombre: 'Botiquín', existe: '', cantidad: '', ubicacion: '', estado: '', foto: '' },
          { nombre: 'Punto de reunión', existe: '', cantidad: '', ubicacion: '', estado: '', foto: '' }
        ],
        plano: { existe: '', vigente: '', coincide: '', obs: '' }
      },
      fuego: { extintores: [], hidrantes: [] }
    }
  };
}

let state = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return Object.assign(crearEstadoVacio(), JSON.parse(raw));
  } catch (e) {}
  return crearEstadoVacio();
})();

let cacheInformes = [];
let cacheAgenda = [];

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // Si supera cuota local por fotos grandes, persistimos la estructura sin dataUrls
    try {
      const slim = JSON.parse(JSON.stringify(state));
      slim.caratula.coverPhoto = '';
      slim.caratula.firmaImg = '';
      slim.hallazgos = slim.hallazgos.map(h => ({ ...h, photos: (h.photos || []).map(p => ({ ...p, dataUrl: '' })) }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slim));
    } catch (_) {}
  }
}

// ================================================================
// UTILIDADES DE FECHAS Y ESCAPING
// ================================================================
function calcularFechaVencimiento(fechaIso, plazoStr) {
  if (!fechaIso) return '';
  const base = new Date(fechaIso + 'T12:00:00');
  if (isNaN(base.getTime())) return '';
  const p = String(plazoStr || '').toLowerCase();
  let dias = 30;
  if (p.includes('inmediat')) dias = 2;
  else if (p.includes('15')) dias = 15;
  else if (p.includes('30') || p.includes('1 mes')) dias = 30;
  else if (p.includes('60') || p.includes('2 mes')) dias = 60;
  else if (p.includes('90') || p.includes('3 mes')) dias = 90;
  else if (p.includes('180') || p.includes('6 mes')) dias = 180;
  else {
    const num = parseInt(p, 10);
    if (!isNaN(num) && num > 0) dias = p.includes('mes') ? num * 30 : num;
  }
  base.setDate(base.getDate() + dias);
  return base.toISOString().slice(0, 10);
}

function fmtFechaAR(iso) {
  if (!iso || iso.length < 10) return iso || '';
  const [y, m, d] = iso.slice(0, 10).split('-');
  return `${d}/${m}/${y}`;
}

function esc(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escA(s) { return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

// ================================================================
// NAVEGACIÓN PRINCIPAL Y AVISOS
// ================================================================
function verVista(v) {
  document.querySelectorAll('.top-nav-btn').forEach(b => b.classList.toggle('active', b.dataset.v === v));
  document.querySelectorAll('.app-view').forEach(s => s.classList.remove('active'));
  document.getElementById('view-' + v)?.classList.add('active');
  if (v === 'biblioteca' || v === 'agenda') cargarBibliotecaYAgenda();
  window.scrollTo({ top: 0 });
}

function abrirVistaPrevia() {
  if (state.estadoInforme !== 'Emitido' && state.pasoMaxHabilitado < 5) {
    avisar('Para ver el informe completo debe completar los pasos previos hasta el Paso 5 (o abrir un informe ya guardado).', 'info');
  }
  renderPreview();
  verVista('preview');
}

function avisar(msg, tipo = 'err') {
  const box = document.getElementById('noticeBox');
  box.className = 'notice show notice-' + tipo;
  document.getElementById('noticeMsg').innerHTML = msg;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function cerrarAviso() { document.getElementById('noticeBox').classList.remove('show'); }

// ================================================================
// CONTROL DEL WIZARD SECUENCIAL (5 PASOS ESTRICTOS)
// ================================================================
function renderWizardBar() {
  document.querySelectorAll('#wizardBar .step-btn').forEach(btn => {
    const n = Number(btn.dataset.step);
    btn.classList.remove('active', 'done', 'locked');
    if (n === state.pasoActual) btn.classList.add('active');
    else if (n < state.pasoMaxHabilitado || state.estadoInforme === 'Emitido') btn.classList.add('done');
    else if (n > state.pasoMaxHabilitado) btn.classList.add('locked');
  });
  document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('step-' + state.pasoActual)?.classList.add('active');

  // Franja de estado Borrador vs Emitido
  const isEmitido = state.estadoInforme === 'Emitido';
  const strip = document.getElementById('statusStrip');
  const lockZone = document.getElementById('wizardLockZone');
  strip.classList.toggle('emitido', isEmitido);
  lockZone.classList.toggle('readonly-lock', isEmitido);

  const tag = document.getElementById('lblEstadoInforme');
  tag.innerText = isEmitido ? `Emitido · Rev. ${state.revision}` : `Borrador · Rev. ${state.revision}`;
  tag.className = 'status-tag ' + (isEmitido ? 'tag-emitido' : 'tag-borrador');

  const meta = document.getElementById('lblMetaEstado');
  if (isEmitido) {
    meta.innerHTML = `Cerrado el ${esc(state.fechaCierre || state.ultimaActualizacion)} · Protegido contra edición accidental.${state.driveFolderUrl ? ` <a href="${state.driveFolderUrl}" target="_blank" style="color:var(--navy);font-weight:700;">Ver carpeta Drive</a>` : ''}`;
  } else {
    meta.innerHTML = state.ultimaActualizacion
      ? `Último guardado nube: ${esc(state.ultimaActualizacion)} · ID: ${esc(state.idVisita)}`
      : `Informe nuevo (${esc(state.idVisita)}) · Avance secuencial obligatorio`;
  }

  document.getElementById('btnGuardarBorradorTop').style.display = isEmitido ? 'none' : 'inline-flex';
  document.getElementById('btnReimprimirTop').style.display = isEmitido ? 'inline-flex' : 'none';
  document.getElementById('btnReabrirTop').style.display = isEmitido ? 'inline-flex' : 'none';
}

function irPaso(n) {
  if (state.estadoInforme !== 'Emitido' && n > state.pasoMaxHabilitado) {
    avisar(`Debe completar y validar el <strong>Paso ${state.pasoActual}</strong> antes de avanzar al Paso ${n}.`, 'err');
    return;
  }
  cerrarAviso();
  state.pasoActual = n;
  if (n === 3) { actualizarDatalistSectores(); syncBloqueoAnexosPorAcciones(); }
  if (n === 4) renderChecklist();
  if (n === 5) { renderSeguimiento(); renderAgendaVisitas(); renderRegistrosTareas(); renderAnexos(); syncBloqueoAnexosPorAcciones(); }
  renderWizardBar();
  save();
  window.scrollTo({ top: 0 });
}

function avanzarDesde(paso) {
  if (!validarPaso(paso)) return;
  if (paso === 3) {
    autocompletarChecklistDesdeFotosYPendientes();
  }
  if (paso === 4) {
    sincronizarChecklistNCaHallazgos();
  }
  if (state.pasoMaxHabilitado < paso + 1) state.pasoMaxHabilitado = paso + 1;
  irPaso(paso + 1);
}

function marcarInvalido(id, faltantes, label) {
  const el = document.getElementById(id);
  if (!el) return;
  const v = (el.value || '').trim();
  el.classList.toggle('invalid', !v);
  if (!v) faltantes.push({ id, label });
}

function validarPaso(paso) {
  const falt = [];
  if (paso === 1) {
    syncPaso1();
    const selOrg = document.getElementById('f-organismo');
    const manOrg = document.getElementById('f-organismo-manual');
    if (selOrg.value === '__OTRO__') {
      marcarInvalido('f-organismo-manual', falt, 'Organismo');
      selOrg.classList.remove('invalid');
    } else {
      marcarInvalido('f-organismo', falt, 'Organismo');
      manOrg.classList.remove('invalid');
    }
    marcarInvalido('f-estNro', falt, 'Establecimiento N°');
    marcarInvalido('f-denominacion', falt, 'Denominación');
    marcarInvalido('f-cuit', falt, 'CUIT');
    marcarInvalido('f-domicilio', falt, 'Domicilio y localidad');
    marcarInvalido('f-fechaVisita', falt, 'Fecha de visita');
    marcarInvalido('f-horaVisita', falt, 'Hora de visita');
    marcarInvalido('f-visitaNro', falt, 'Visita N°');
    marcarInvalido('f-profNombre', falt, 'Profesional de HyS');
    marcarInvalido('f-profMat', falt, 'Título y Matrícula');
    marcarInvalido('f-respEst', falt, 'Responsable del Establecimiento');
    if (falt.length) {
      avisar('Complete los campos obligatorios del Paso 1: <strong>' + falt.map(f => f.label).join(', ') + '</strong>.', 'err');
      document.getElementById(falt[0].id)?.focus();
      return false;
    }
    if (!state.sintesis.obj1.trim()) generarObjetoEstandar();
    return true;
  }

  if (paso === 2) {
    syncPaso2();
    marcarInvalido('d-actividadGeneral', falt, 'Actividad principal');
    marcarInvalido('d-turnos', falt, 'Modalidad / turnos y horarios');
    marcarInvalido('d-pisos', falt, 'Cantidad de pisos');
    marcarInvalido('d-superficie', falt, 'Superficie cubierta (m²)');
    marcarInvalido('d-tipologia', falt, 'Tipología constructiva');
    marcarInvalido('d-cantTrabajadores', falt, 'Cantidad de trabajadores');
    marcarInvalido('d-desglosePersonal', falt, 'Desglose de personal');
    marcarInvalido('d-procesos', falt, 'Procesos y actividades');
    marcarInvalido('s-obj1', falt, 'Objeto de la visita');
    marcarInvalido('s-obj2', falt, 'Alcance y límites');
    marcarInvalido('s-docEntregada', falt, 'Documentación entregada');

    if (state.descripcion.sectores.length === 0) {
      falt.push({ id: '', label: 'Al menos un Sector del establecimiento' });
    } else {
      state.descripcion.sectores.forEach((sec, idx) => {
        if (!sec.piso.trim() || !sec.nombre.trim() || !sec.actividad.trim()) {
          falt.push({ id: '', label: `Completar Piso, Sector y Actividad en fila #${idx + 1}` });
        }
      });
    }
    if (!(state.sintesis.acciones || []).length && !(state.sintesis.secundarias || []).length && !state.sintesis.otroAccion.trim()) {
      falt.push({ id: '', label: 'Marcar al menos una acción del Plan HyS 2026 o tarea secundaria' });
    }
    if (falt.length) {
      renderSectoresEst();
      avisar('Complete los campos obligatorios del Paso 2: <strong>' + falt.map(f => f.label).join(' · ') + '</strong>.', 'err');
      if (falt[0].id) document.getElementById(falt[0].id)?.focus();
      return false;
    }
    return true;
  }

  if (paso === 3) {
    const reqFoto = (state.sintesis.acciones || []).includes(ACCION_FOTO);
    if (reqFoto && state.hallazgos.length === 0) {
      avisar(`En el Paso 2 tildó <strong>"${ACCION_FOTO}"</strong>, por lo que debe cargar al menos un hallazgo con fotografía antes de continuar (o destildarlo en el Paso 2).`, 'err');
      return false;
    }
    if (state.hallazgos.length === 0 && !state.sinDesviosFoto) {
      avisar('Suba al menos una fotografía/hallazgo o marque la casilla <strong>"No se detectaron desvíos fotográficos en esta visita"</strong>.', 'err');
      return false;
    }
    for (let i = 0; i < state.hallazgos.length; i++) {
      const h = state.hallazgos[i];
      const miss = [];
      if (!h.ubicacion?.trim()) miss.push('Lugar de detección');
      if (!h.incumplimiento?.trim()) miss.push('Incumplimiento');
      if (!h.riesgo?.trim()) miss.push('Riesgo');
      if (!h.medida?.trim()) miss.push('Medida correctiva');
      if (!h.responsable?.trim()) miss.push('Responsable');
      if (!h.plazo?.trim()) miss.push('Plazo');
      if (miss.length) {
        renderHallazgos();
        avisar(`Complete en el <strong>Hallazgo #${i + 1}</strong>: ${miss.join(', ')}.`, 'err');
        document.getElementById('hubic-' + i)?.focus();
        return false;
      }
      if (!h.fechaVencimiento) {
        h.fechaVencimiento = calcularFechaVencimiento(state.caratula.fechaVisita, h.plazo);
      }
    }
    return true;
  }

  if (paso === 4) {
    const sinVerificar = [];
    CHECKLIST_DEF.forEach(g => g.items.forEach(([id]) => {
      if (!state.checklist[id] || !state.checklist[id].estado) sinVerificar.push(id);
    }));
    if (sinVerificar.length > 0) {
      avisar(`Quedan <strong>${sinVerificar.length} ítem(s) en "Sin verificar"</strong> (${sinVerificar.slice(0, 8).join(', ')}${sinVerificar.length > 8 ? '...' : ''}). Defina C, NC, OBS o NA en cada uno (o use los botones rápidos por bloque).`, 'err');
      document.getElementById('chk-sel-' + sinVerificar[0])?.focus();
      return false;
    }
    return true;
  }

  if (paso === 5) {
    syncPaso5();
    const acc = state.sintesis.acciones || [];
    const rt = state.registrosTareas || {};

    // Validar Planilla 1 (Evacuación) obligatoria si se tildó en Paso 2
    if (acc.includes(ACCION_EVAC)) {
      if (state.anexos.evacEstado !== 'Completado') {
        avisar(`Tildó <strong>"${ACCION_EVAC}"</strong> en Paso 2: debe completar la <strong>Planilla 1 (Evacuación)</strong>.`, 'err');
        return false;
      }
      const ev = state.anexos.evac;
      if (!ev.sectores.length) { avisar('Planilla 1 obligatoria (Evacuación): agregue al menos un sector en <strong>A. Sectores y ocupación</strong>.', 'err'); return false; }
      if (!ev.salidas.length) { avisar('Planilla 1 obligatoria (Evacuación): agregue al menos un medio de salida en <strong>B. Medios de salida</strong>.', 'err'); return false; }
      if (!ev.elementos.some(el => el.existe)) { avisar('Planilla 1 obligatoria (Evacuación): indique Sí/No en <strong>C. Elementos de emergencia</strong>.', 'err'); return false; }
      if (!ev.plano.existe) { avisar('Planilla 1 obligatoria (Evacuación): indique si existe plano en <strong>D. Plano existente</strong>.', 'err'); return false; }
    }

    // Validar Planilla 2 (Extintores e Hidrantes) obligatoria si se tildó en Paso 2
    if (acc.includes(ACCION_EXT)) {
      if (state.anexos.extEstado !== 'Completado') {
        avisar(`Tildó <strong>"${ACCION_EXT}"</strong> en Paso 2: debe completar la <strong>Planilla 2 (Extintores e Hidrantes)</strong>.`, 'err');
        return false;
      }
      if (!state.anexos.fuego.extintores.length && !state.anexos.fuego.hidrantes.length) {
        avisar('Planilla 2 obligatoria (Extintores e Hidrantes): cargue al menos un extintor o hidrante verificado.', 'err');
        return false;
      }
    }

    // Validar Cronograma si se tildó
    if (acc.includes(ACCION_CRONO) && !state.agendaVisitas.some(v => v.fecha)) {
      avisar(`Tildó <strong>"${ACCION_CRONO}"</strong> en Paso 2: agende al menos una fecha de próxima visita acordada en la tabla de Agenda.`, 'err');
      return false;
    }

    // Validar Seguimiento si se tildó
    if (acc.includes(ACCION_SEG) && !state.seguimiento.some(s => s.hallazgo && s.hallazgo.trim())) {
      avisar(`Tildó <strong>"${ACCION_SEG}"</strong> en Paso 2: complete al menos una fila en <strong>5. Seguimiento de hallazgos anteriores</strong>.`, 'err');
      return false;
    }

    // Validar registros obligatorios de RGRL / NTEAR / EPP / Ergonomía / Capacitaciones tildadas
    if (acc.includes(ACCION_RGRL) && !rt.rgrl?.ofrecimiento) { avisar('Complete el registro obligatorio de <strong>RGRL</strong> (ofrecimiento / respuesta del organismo).', 'err'); return false; }
    if (acc.includes(ACCION_NTEAR) && !rt.ntear?.ofrecimiento) { avisar('Complete el registro obligatorio de <strong>NTEAR / RAR</strong> (validación / ofrecimiento de carga).', 'err'); return false; }
    if (acc.includes(ACCION_EPP) && !rt.epp?.puestos?.trim()) { avisar('Complete los puestos asesorados en el registro obligatorio de <strong>Asesoramiento en EPP</strong>.', 'err'); return false; }
    if (acc.includes(ACCION_ERGO) && !rt.ergonomia?.puestos?.trim()) { avisar('Complete los puestos evaluados en el registro obligatorio de <strong>Estudios de ergonomía (Planillas 1 y 2)</strong>.', 'err'); return false; }
    if (acc.includes(ACCION_CAP_HYS) && !rt.capHys?.asistentes) { avisar('Complete la cantidad de asistentes en <strong>Capacitación básica en HyS</strong>.', 'err'); return false; }
    if (acc.includes(ACCION_CAP_EVAC) && (!rt.capEvac?.asistentes || !rt.capEvac?.rolesDefinidos)) { avisar('Complete asistentes y si había roles definidos en <strong>Capacitación sobre roles de evacuación</strong>.', 'err'); return false; }

    if (state.anexos.extEstado === 'Completado') {
      const badE = state.anexos.fuego.extintores.findIndex(e => !e.ubicacion.trim());
      if (badE !== -1) { avisar(`Falta la ubicación obligatoria del Extintor N° ${badE + 1}.`, 'err'); return false; }
      const badH = state.anexos.fuego.hidrantes.findIndex(h => !h.ubicacion.trim());
      if (badH !== -1) { avisar(`Falta la ubicación obligatoria del Hidrante N° ${badH + 1}.`, 'err'); return false; }
    }

    if (!state.conclusion.trim()) {
      document.getElementById('c-conclusion').classList.add('invalid');
      avisar('Debe redactar la <strong>Conclusión y prioridades (Punto 6)</strong> antes de cerrar el informe.', 'err');
      document.getElementById('c-conclusion').focus();
      return false;
    }
    return true;
  }
  return true;
}

// ================================================================
// DESPLEGABLES DINÁMICOS: ORGANISMOS Y ESTABLECIMIENTOS (SIN HARDCODEO)
// ================================================================
async function cargarPadronIapser(forceRefresh = false) {
  const lbl = document.getElementById('lblEstadoPadron');
  // 1. Si hay caché local reciente y no es forzado, hidratar al instante
  if (!forceRefresh) {
    try {
      const cached = JSON.parse(localStorage.getItem(PADRON_CACHE_KEY) || 'null');
      if (cached && Array.isArray(cached.items) && cached.items.length > 0) {
        aplicarPadron(cached.items, `Padrón en caché (${cached.items.length} estab.) · actualizando...`);
      }
    } catch (e) {}
  } else if (lbl) {
    lbl.innerText = 'Consultando padrón en vivo desde Informes IAPSER...';
  }

  // 2. Consultar en vivo al Apps Script (?action=catalog)
  try {
    const r = await fetch(WEBAPP_URL + '?action=catalog');
    const txt = await r.text();
    let d;
    try { d = JSON.parse(txt); } catch (_) {
      throw new Error('Falta autorizar el Apps Script (1 sola vez)');
    }
    if (!d.ok || !Array.isArray(d.establecimientos)) throw new Error(d.error || 'Respuesta inválida');
    localStorage.setItem(PADRON_CACHE_KEY, JSON.stringify({ ts: Date.now(), items: d.establecimientos }));
    aplicarPadron(d.establecimientos, `Padrón sincronizado en vivo (${d.establecimientos.length} estab.)`);
  } catch (err) {
    if (lbl) {
      lbl.innerHTML = ESTABLECIMIENTOS_IAPSER.length
        ? `Usando caché local (${ESTABLECIMIENTOS_IAPSER.length} estab.)`
        : `<span style="color:var(--warn);">Sin conexión al padrón (${esc(err.message)}) — puede usar "Otro organismo"</span>`;
    }
    poblarOrganismos();
  }
}

function aplicarPadron(items, statusTxt) {
  ESTABLECIMIENTOS_IAPSER = items || [];
  ORGANISMOS_IAPSER = [...new Set(ESTABLECIMIENTOS_IAPSER.map(e => e.org))].sort((a, b) => a.localeCompare(b, 'es'));
  const lbl = document.getElementById('lblEstadoPadron');
  if (lbl) lbl.innerText = statusTxt;
  poblarOrganismos();
  const c = state.caratula;
  const selOrg = document.getElementById('f-organismo');
  const manOrg = document.getElementById('f-organismo-manual');
  if (selOrg && c.organismo && ORGANISMOS_IAPSER.includes(c.organismo)) {
    selOrg.value = c.organismo;
    if (manOrg) { manOrg.style.display = 'none'; manOrg.value = ''; }
  }
  poblarDesplegablesEstab();
}

function poblarOrganismos() {
  const sel = document.getElementById('f-organismo');
  if (!sel) return;
  const counts = {};
  ESTABLECIMIENTOS_IAPSER.forEach(e => { counts[e.org] = (counts[e.org] || 0) + 1; });
  sel.innerHTML = '<option value="">-- Seleccionar Organismo --</option>' +
    ORGANISMOS_IAPSER.map(o => `<option value="${escA(o)}">${esc(o)} (${counts[o]} estab.)</option>`).join('') +
    '<option value="__OTRO__">Otro organismo (carga manual)...</option>';
}

function alCambiarOrganismo() {
  const sel = document.getElementById('f-organismo');
  const man = document.getElementById('f-organismo-manual');
  const isOtro = sel.value === '__OTRO__';
  man.style.display = isOtro ? 'block' : 'none';
  if (document.getElementById('f-filtro-estab')) document.getElementById('f-filtro-estab').value = '';
  poblarDesplegablesEstab();
  syncPaso1();
}

function poblarDesplegablesEstab() {
  const org = document.getElementById('f-organismo')?.value || '';
  const filtro = (document.getElementById('f-filtro-estab')?.value || '').trim().toLowerCase();
  const selNro = document.getElementById('f-sel-nro');
  const selDom = document.getElementById('f-sel-dom');
  const lblCant = document.getElementById('lblCantEstab');
  if (!selNro || !selDom) return;

  let lista = (!org || org === '__OTRO__') ? [] : ESTABLECIMIENTOS_IAPSER.filter(e => e.org === org);
  if (filtro) {
    lista = lista.filter(e =>
      String(e.nro).toLowerCase().includes(filtro) ||
      e.dom.toLowerCase().includes(filtro) ||
      e.loc.toLowerCase().includes(filtro) ||
      e.nom.toLowerCase().includes(filtro)
    );
  }
  if (lblCant) lblCant.innerText = lista.length;

  const porNro = [...lista].sort((a, b) => (parseInt(a.nro, 10) || 999999) - (parseInt(b.nro, 10) || 999999));
  const porDom = [...lista].sort((a, b) => (a.dom + ' ' + a.loc).localeCompare(b.dom + ' ' + b.loc, 'es'));

  const phNro = org && org !== '__OTRO__' ? '-- Elegir por N° de Establecimiento --' : '-- Primero elija un Organismo --';
  const phDom = org && org !== '__OTRO__' ? '-- Elegir por Domicilio / Localidad --' : '-- Primero elija un Organismo --';

  selNro.innerHTML = `<option value="">${phNro}</option>` + porNro.map(e => {
    const extra = e.nom && e.nom.toUpperCase() !== (e.dom + ' (' + e.loc + ')').toUpperCase() ? ` · ${e.nom}` : '';
    return `<option value="${escA(e.id)}">N° ${esc(e.nro || 'S/N')} — ${esc(e.dom)} (${esc(e.loc)})${esc(extra)}</option>`;
  }).join('');

  selDom.innerHTML = `<option value="">${phDom}</option>` + porDom.map(e => {
    const extra = e.nom ? ` · ${e.nom}` : '';
    return `<option value="${escA(e.id)}">${esc(e.dom)}, ${esc(e.loc)} (Est. N° ${esc(e.nro || 'S/N')})${esc(extra)}</option>`;
  }).join('');

  // Reseleccionar si el estado actual coincide
  const match = lista.find(e => e.nro === state.caratula.estNro && state.caratula.domicilio.toUpperCase().includes(e.dom.toUpperCase()));
  if (match) {
    selNro.value = match.id;
    selDom.value = match.id;
  }
}

function alSeleccionarEstablecimiento(estId) {
  const selNro = document.getElementById('f-sel-nro');
  const selDom = document.getElementById('f-sel-dom');
  if (selNro) selNro.value = estId;
  if (selDom) selDom.value = estId;
  if (!estId) return;

  const item = ESTABLECIMIENTOS_IAPSER.find(e => e.id === estId);
  if (!item) return;

  document.getElementById('f-estNro').value = item.nro || '';
  const domCompleto = [item.dom, item.loc, item.prov].filter(Boolean).join(', ');
  document.getElementById('f-domicilio').value = domCompleto;
  if (item.nom) {
    document.getElementById('f-denominacion').value = item.nom;
  } else if (!document.getElementById('f-denominacion').value.trim()) {
    document.getElementById('f-denominacion').value = `Establecimiento N° ${item.nro} (${item.loc || item.dom})`;
  }
  // Si el establecimiento ya tiene superficie relevada en Superficie_Establecimientos, precompletar en Paso 2 y calcular Categoría
  if (item.sup) {
    state.descripcion.superficie = item.sup;
    const supEl = document.getElementById('d-superficie');
    if (supEl) supEl.value = item.sup;
    calcCategoriaPlan();
  }
  ['f-estNro', 'f-domicilio', 'f-denominacion'].forEach(id => document.getElementById(id)?.classList.remove('invalid'));
  syncPaso1();
}

// ================================================================
// HIDRATACIÓN Y SINCRONIZACIÓN DE FORMULARIOS
// ================================================================
function hidratarTodo() {
  poblarOrganismos();
  const c = state.caratula;
  const selOrg = document.getElementById('f-organismo');
  const manOrg = document.getElementById('f-organismo-manual');
  if (c.organismo && ORGANISMOS_IAPSER.includes(c.organismo)) {
    selOrg.value = c.organismo;
    manOrg.style.display = 'none';
    manOrg.value = '';
  } else if (c.organismo) {
    selOrg.value = '__OTRO__';
    manOrg.style.display = 'block';
    manOrg.value = c.organismo;
  } else {
    selOrg.value = '';
    manOrg.style.display = 'none';
    manOrg.value = '';
  }
  poblarDesplegablesEstab();
  document.getElementById('f-estNro').value = c.estNro || '';
  document.getElementById('f-denominacion').value = c.denominacion || '';
  document.getElementById('f-domicilio').value = c.domicilio || '';
  document.getElementById('f-cuit').value = c.cuit || '';
  document.getElementById('f-fechaVisita').value = c.fechaVisita || '';
  document.getElementById('f-horaVisita').value = c.horaVisita || '';
  document.getElementById('f-categoria').value = c.categoria || 'B';
  document.getElementById('f-visitaNro').value = c.visitaNro || '';
  document.getElementById('f-profNombre').value = c.profNombre || '';
  document.getElementById('f-profMat').value = c.profMat || '';
  document.getElementById('f-respEst').value = c.respEst || '';
  renderPrevUnica('coverPhoto');
  renderPrevUnica('firmaImg');

  const d = state.descripcion;
  document.getElementById('d-actividadGeneral').value = d.actividadGeneral || '';
  document.getElementById('d-turnos').value = d.turnos || '';
  document.getElementById('d-antiguedad').value = d.antiguedad || '';
  document.getElementById('d-superficie').value = d.superficie || '';
  document.getElementById('d-supDescubierta').value = d.supDescubierta || '';
  document.getElementById('d-pisos').value = d.pisos || '';
  document.getElementById('d-tipologia').value = d.tipologia || '';
  document.getElementById('d-complementarios').value = d.complementarios || '';
  document.getElementById('d-riesgoEspecial').checked = !!d.riesgoEspecial;
  document.getElementById('d-cantTrabajadores').value = d.cantTrabajadores || '';
  document.getElementById('d-desglosePersonal').value = d.desglosePersonal || '';
  document.getElementById('d-ocupacionPublico').value = d.ocupacionPublico || '';
  document.getElementById('d-eventos').value = d.eventos || '';
  document.getElementById('d-tercerizados').value = d.tercerizados || '';
  document.getElementById('d-procesos').value = d.procesos || '';
  document.getElementById('d-mantenimiento').value = d.mantenimiento || '';
  document.getElementById('d-quimicos').value = d.quimicos || '';
  document.getElementById('d-combustibles').value = d.combustibles || '';
  document.getElementById('d-otrosMateriales').value = d.otrosMateriales || '';
  document.getElementById('d-noAccesibles').value = d.noAccesibles || '';
  document.getElementById('d-obsPendientes').value = d.obsPendientes || '';
  renderSectoresEst();
  renderPreviewParrafosPaso2();

  const s = state.sintesis;
  if (!Array.isArray(s.acciones)) s.acciones = [];
  if (!Array.isArray(s.secundarias)) s.secundarias = [];
  if (!Array.isArray(s.pendientes)) s.pendientes = [];
  ensureRegistrosTareas();

  document.getElementById('s-obj1').value = s.obj1 || '';
  document.getElementById('s-obj2').value = s.obj2 || '';
  document.getElementById('s-otroAccion').value = s.otroAccion || '';
  document.getElementById('s-pendNota').value = s.pendNota || '';
  document.getElementById('s-docEntregada').value = s.docEntregada || '';

  document.getElementById('chk-acciones').innerHTML = ACCIONES_LIST.map(a => `
    <label class="chk-item">
      <input type="checkbox" ${s.acciones.includes(a) ? 'checked' : ''} onchange="toggleChk('acciones', '${escA(a)}', this.checked)"> ${esc(a)}
    </label>
  `).join('');

  const chkSec = document.getElementById('chk-secundarias');
  if (chkSec) {
    chkSec.innerHTML = TAREAS_SECUNDARIAS_LIST.map(t => `
      <label class="chk-item">
        <input type="checkbox" ${s.secundarias.includes(t) ? 'checked' : ''} onchange="toggleChk('secundarias', '${escA(t)}', this.checked)"> ${esc(t)}
      </label>
    `).join('');
  }

  document.getElementById('chk-pendientes').innerHTML = PENDIENTES_LIST.map(p => `
    <label class="chk-item">
      <input type="checkbox" ${s.pendientes.includes(p) ? 'checked' : ''} onchange="toggleChk('pendientes', '${escA(p)}', this.checked)"> ${esc(p)}
    </label>
  `).join('');

  document.getElementById('chk-sinDesviosFoto').checked = !!state.sinDesviosFoto;
  document.getElementById('c-segIntro').value = state.seguimientoIntro || '';
  document.getElementById('c-conclusion').value = state.conclusion || '';
  document.getElementById('st-evac').value = state.anexos.evacEstado || 'Pendiente';
  document.getElementById('st-ext').value = state.anexos.extEstado || 'Pendiente';
  document.getElementById('ev-pl-ex').value = state.anexos.evac.plano.existe || '';
  document.getElementById('ev-pl-vig').value = state.anexos.evac.plano.vigente || '';
  document.getElementById('ev-pl-coi').value = state.anexos.evac.plano.coincide || '';
  document.getElementById('ev-pl-obs').value = state.anexos.evac.plano.obs || '';

  actualizarDatalistSectores();
  renderHallazgos();
  renderChecklist();
  renderSeguimiento();
  renderAgendaVisitas();
  renderRegistrosTareas();
  renderAnexos();
  syncBloqueoAnexosPorAcciones();
  renderWizardBar();
  actualizarTopModelo();
}

function syncPaso1() {
  const c = state.caratula;
  const selOrg = document.getElementById('f-organismo').value;
  c.organismo = selOrg === '__OTRO__' ? document.getElementById('f-organismo-manual').value : selOrg;
  c.estNro = document.getElementById('f-estNro').value;
  c.denominacion = document.getElementById('f-denominacion').value;
  c.domicilio = document.getElementById('f-domicilio').value;
  c.cuit = document.getElementById('f-cuit').value;
  c.fechaVisita = document.getElementById('f-fechaVisita').value;
  c.horaVisita = document.getElementById('f-horaVisita').value;
  c.visitaNro = document.getElementById('f-visitaNro').value;
  c.profNombre = document.getElementById('f-profNombre').value;
  c.profMat = document.getElementById('f-profMat').value;
  c.respEst = document.getElementById('f-respEst').value;
  save();
}

function calcCategoriaPlan() {
  const sup = parseFloat(document.getElementById('d-superficie').value);
  const esp = document.getElementById('d-riesgoEspecial').checked;
  if (isNaN(sup) || sup <= 0) return;
  let cat = sup > 10000 ? 'AA' : (sup >= 2501 ? 'A' : (sup >= 501 ? 'B' : 'C'));
  if (esp) cat = cat === 'C' ? 'B' : (cat === 'B' ? 'A' : 'AA');
  document.getElementById('f-categoria').value = cat;
  state.caratula.categoria = cat;
}

function syncPaso2() {
  const d = state.descripcion;
  d.actividadGeneral = document.getElementById('d-actividadGeneral').value;
  d.turnos = document.getElementById('d-turnos').value;
  d.antiguedad = document.getElementById('d-antiguedad').value;
  d.superficie = document.getElementById('d-superficie').value;
  d.supDescubierta = document.getElementById('d-supDescubierta').value;
  d.pisos = document.getElementById('d-pisos').value;
  d.tipologia = document.getElementById('d-tipologia').value;
  d.complementarios = document.getElementById('d-complementarios').value;
  d.riesgoEspecial = document.getElementById('d-riesgoEspecial').checked;
  d.cantTrabajadores = document.getElementById('d-cantTrabajadores').value;
  d.desglosePersonal = document.getElementById('d-desglosePersonal').value;
  d.ocupacionPublico = document.getElementById('d-ocupacionPublico').value;
  d.eventos = document.getElementById('d-eventos').value;
  d.tercerizados = document.getElementById('d-tercerizados').value;
  d.procesos = document.getElementById('d-procesos').value;
  d.mantenimiento = document.getElementById('d-mantenimiento').value;
  d.quimicos = document.getElementById('d-quimicos').value;
  d.combustibles = document.getElementById('d-combustibles').value;
  d.otrosMateriales = document.getElementById('d-otrosMateriales').value;
  d.noAccesibles = document.getElementById('d-noAccesibles').value;
  d.obsPendientes = document.getElementById('d-obsPendientes').value;

  state.caratula.categoria = document.getElementById('f-categoria').value;
  state.sintesis.obj1 = document.getElementById('s-obj1').value;
  state.sintesis.obj2 = document.getElementById('s-obj2').value;
  state.sintesis.otroAccion = document.getElementById('s-otroAccion').value;
  state.sintesis.pendNota = document.getElementById('s-pendNota').value;
  state.sintesis.docEntregada = document.getElementById('s-docEntregada').value;
  renderPreviewParrafosPaso2();
  save();
}

function cerrarPunto(s) {
  const t = String(s || '').trim();
  if (!t) return '';
  return /[.!?]$/.test(t) ? t : t + '.';
}

function construirParrafosDescripcion() {
  const d = state.descripcion;
  if (d.parrafosIA && d.parrafosIA.trim()) {
    return d.parrafosIA.trim().split(/\n\s*\n/).map(p => {
      const m = p.match(/^([^:]{3,35}):\s*([\s\S]+)$/);
      return m ? { titulo: m[1].trim(), texto: m[2].trim() } : { titulo: '', texto: p.trim() };
    });
  }

  const out = [];

  // 1. Actividad
  const actPartes = [];
  if (d.actividadGeneral.trim()) {
    actPartes.push(d.actividadGeneral.trim() + (d.turnos.trim() ? ', ' + d.turnos.trim() : ''));
  } else if (d.turnos.trim()) {
    actPartes.push(d.turnos.trim());
  }
  if (d.antiguedad.trim()) actPartes.push(d.antiguedad.trim());
  if (actPartes.length) out.push({ titulo: 'Actividad', texto: actPartes.map(cerrarPunto).join(' ') });

  // 2. Edificio
  const edPartes = [];
  let baseEd = '';
  if (d.pisos || d.superficie) {
    const pTxt = d.pisos ? (Number(d.pisos) === 1 ? 'una planta' : `${d.pisos} plantas`) : '';
    const sTxt = d.superficie ? `unos ${Number(d.superficie).toLocaleString('es-AR')} m² cubiertos` : '';
    baseEd = 'Construcción' + (pTxt ? ' de ' + pTxt : '') + (sTxt ? ' de ' + sTxt : '');
    if (d.tipologia.trim()) baseEd += ', con ' + d.tipologia.trim();
    if (d.supDescubierta) baseEd += `, más superficie descubierta/patio de ${Number(d.supDescubierta).toLocaleString('es-AR')} m²`;
    if (d.complementarios.trim()) baseEd += ' y ' + d.complementarios.trim();
    edPartes.push(baseEd);
  }
  if (d.sectores && d.sectores.length) {
    const dist = d.sectores
      .filter(s => s.nombre.trim())
      .map(s => `${s.nombre.trim()}${s.piso.trim() ? ' (' + s.piso.trim() + (s.sup ? ', ' + s.sup + ' m²' : '') + ')' : ''}${s.actividad.trim() ? ' — ' + s.actividad.trim() : ''}`)
      .join('; ');
    if (dist) edPartes.push('Distribución: ' + dist);
  }
  if (edPartes.length) out.push({ titulo: 'Edificio', texto: edPartes.map(cerrarPunto).join(' ') });

  // 3. Personal y ocupación
  const perPartes = [];
  if (d.cantTrabajadores || d.desglosePersonal.trim()) {
    let pt = d.cantTrabajadores ? `${d.cantTrabajadores} trabajadores` : 'Personal';
    if (d.desglosePersonal.trim()) pt += ` (${d.desglosePersonal.trim()})`;
    perPartes.push(pt);
  }
  if (d.ocupacionPublico.trim()) perPartes.push(d.ocupacionPublico.trim());
  if (d.eventos.trim()) perPartes.push(d.eventos.trim());
  if (d.tercerizados.trim()) perPartes.push(d.tercerizados.trim());
  if (perPartes.length) out.push({ titulo: 'Personal y ocupación', texto: perPartes.map(cerrarPunto).join(' ') });

  // 4. Procesos y actividades
  const procPartes = [];
  if (d.procesos.trim()) procPartes.push(d.procesos.trim());
  if (d.mantenimiento.trim()) procPartes.push(d.mantenimiento.trim());
  if (procPartes.length) out.push({ titulo: 'Procesos y actividades', texto: cerrarPunto(procPartes.join('; ')) });

  // 5. Materiales y sustancias
  const matPartes = [d.quimicos.trim(), d.combustibles.trim(), d.otrosMateriales.trim()].filter(Boolean);
  if (matPartes.length) out.push({ titulo: 'Materiales y sustancias', texto: cerrarPunto(matPartes.join('; ')) });

  // 6. Observaciones
  const obsPartes = [d.noAccesibles.trim(), d.obsPendientes.trim()].filter(Boolean);
  if (obsPartes.length) out.push({ titulo: 'Observaciones', texto: obsPartes.map(cerrarPunto).join(' ') });

  return out;
}

function renderPreviewParrafosPaso2() {
  const el = document.getElementById('descPreviewParrafos');
  if (!el) return;
  const pars = construirParrafosDescripcion();
  if (!pars.length) {
    el.innerHTML = '<em style="color:var(--muted);">Complete los bloques A a F para ver aquí los párrafos redactados tal como figurarán en el informe.</em>';
    return;
  }
  el.innerHTML = pars.map(p => `<p style="margin-bottom:8px;">${p.titulo ? `<strong>${esc(p.titulo)}:</strong> ` : ''}${esc(p.texto)}</p>`).join('');
}

function limpiarTextoPersonalizadoDesc() {
  state.descripcion.parrafosIA = '';
  renderPreviewParrafosPaso2();
  save();
}

async function pulirDescripcionConIA() {
  state.descripcion.parrafosIA = '';
  const borrador = construirParrafosDescripcion().map(p => `${p.titulo}: ${p.texto}`).join('\n\n');
  if (!borrador.trim()) { avisar('Complete primero algunos campos de la descripción antes de pulir la redacción.', 'info'); return; }
  const cfg = getAIConfig();
  const [provider, modelName] = cfg.model.split(':');
  avisar('Puliendo redacción de la descripción del establecimiento con IA...', 'info');
  const prompt = `Reescribí únicamente para mejorar fluidez, concordancia y estilo técnico-profesional los siguientes 6 párrafos de descripción de un establecimiento para un Informe de Higiene y Seguridad en Argentina.
REGLAS ESTRICTAS:
1. Conservá exactamente los encabezados "Actividad:", "Edificio:", "Personal y ocupación:", "Procesos y actividades:", "Materiales y sustancias:" y "Observaciones:" (solo incluí los que tengan datos).
2. NO inventes ni agregues ningún número, dato, sector ni supuesto que no esté en el borrador.
3. Devolvé texto plano separado por línea en blanco entre párrafos, sin markdown ni viñetas.

BORRADOR:
${borrador}`;
  try {
    let out = '';
    if (provider === 'openai') {
      if (!cfg.openaiKey) throw new Error('Falta OpenAI API Key');
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.openaiKey },
        body: JSON.stringify({ model: modelName, temperature: 0.15, messages: [{ role: 'user', content: prompt }] })
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error?.message || 'HTTP ' + r.status);
      out = d.choices[0].message.content.trim();
    } else {
      if (!cfg.geminiKey) { abrirModalIA(); throw new Error('Falta configurar tu Clave API de Gemini en "Motor IA" (se guarda localmente en el navegador)'); }
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${cfg.geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.15 } })
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error?.message || 'HTTP ' + r.status);
      out = d.candidates[0].content.parts[0].text.trim();
    }
    state.descripcion.parrafosIA = out;
    renderPreviewParrafosPaso2();
    save();
    avisar('Redacción en párrafos pulida correctamente sin alterar tus datos.', 'ok');
  } catch (err) {
    avisar('No se pudo pulir con IA: ' + err.message, 'err');
  }
}

function generarObjetoEstandar() {
  const c = state.caratula;
  const fStr = c.fechaVisita ? fmtFechaAR(c.fechaVisita) + (c.horaVisita ? ' a las ' + c.horaVisita + ' h' : '') : '';
  const txt = `El presente informe registra la visita técnica a ${c.denominacion || 'el establecimiento'}, establecimiento N° ${c.estNro || 'S/N'}, realizada el ${fStr}. Documenta la descripción general del establecimiento, los desvíos observados y establece medidas correctivas y prioridades de seguimiento.`;
  state.sintesis.obj1 = txt;
  document.getElementById('s-obj1').value = txt;
  save();
}

function toggleChk(key, val, checked) {
  if (!Array.isArray(state.sintesis[key])) state.sintesis[key] = [];
  if (checked && !state.sintesis[key].includes(val)) state.sintesis[key].push(val);
  if (!checked) state.sintesis[key] = state.sintesis[key].filter(x => x !== val);

  if (key === 'acciones') {
    if (val === ACCION_EVAC && checked) {
      state.anexos.evacEstado = 'Completado';
      const el = document.getElementById('st-evac');
      if (el) el.value = 'Completado';
      renderAnexos();
    }
    if (val === ACCION_EXT && checked) {
      state.anexos.extEstado = 'Completado';
      const el = document.getElementById('st-ext');
      if (el) el.value = 'Completado';
      renderAnexos();
    }
    if (val === ACCION_FOTO && checked) {
      state.sinDesviosFoto = false;
      const el = document.getElementById('chk-sinDesviosFoto');
      if (el) el.checked = false;
    }
    renderRegistrosTareas();
    syncBloqueoAnexosPorAcciones();
  }
  save();
}

function cargarImgUnica(key, ev) {
  if (!ev.target.files?.length) return;
  const r = new FileReader();
  r.onload = async () => {
    state.caratula[key] = await prepararImagen(r.result, key === 'firmaImg' ? 600 : 1200);
    state.caratula[key + 'DriveId'] = '';
    renderPrevUnica(key);
    save();
  };
  r.readAsDataURL(ev.target.files[0]);
}
function limpiarImgUnica(key) {
  state.caratula[key] = '';
  state.caratula[key + 'DriveId'] = '';
  renderPrevUnica(key);
  save();
}
function renderPrevUnica(key) {
  const el = document.getElementById('prev-' + key);
  if (el) el.innerHTML = state.caratula[key] ? `<img src="${state.caratula[key]}" style="max-height:74px; border:1px solid #cbd5e1; border-radius:3px;">` : '';
}

// SECTORES DEL ESTABLECIMIENTO (PASO 2)
function addSectorEst() {
  state.descripcion.sectores.push({ piso: 'Planta Baja', nombre: '', actividad: '', sup: '' });
  renderSectoresEst();
  actualizarDatalistSectores();
  renderPreviewParrafosPaso2();
  save();
}
function delSectorEst(i) {
  state.descripcion.sectores.splice(i, 1);
  renderSectoresEst();
  actualizarDatalistSectores();
  renderPreviewParrafosPaso2();
  save();
}
function renderSectoresEst() {
  const tb = document.getElementById('tb-sectores-est');
  if (!state.descripcion.sectores.length) {
    tb.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--muted);padding:12px;">Sin sectores cargados. Pulse "+ Agregar Sector" para describir cada sector y su actividad.</td></tr>';
    return;
  }
  tb.innerHTML = state.descripcion.sectores.map((s, i) => `
    <tr>
      <td><input class="${!s.piso.trim() ? 'invalid' : ''}" value="${escA(s.piso)}" placeholder="Ej: PB / Piso 1" oninput="state.descripcion.sectores[${i}].piso=this.value;this.classList.toggle('invalid',!this.value.trim());actualizarDatalistSectores();renderPreviewParrafosPaso2();save()"></td>
      <td><input class="${!s.nombre.trim() ? 'invalid' : ''}" value="${escA(s.nombre)}" placeholder="Ej: Aulas / Oficina de guardia / Cocina" oninput="state.descripcion.sectores[${i}].nombre=this.value;this.classList.toggle('invalid',!this.value.trim());actualizarDatalistSectores();renderPreviewParrafosPaso2();save()"></td>
      <td><input class="${!s.actividad.trim() ? 'invalid' : ''}" value="${escA(s.actividad)}" placeholder="Ej: Dictado de clases / Atención al público" oninput="state.descripcion.sectores[${i}].actividad=this.value;this.classList.toggle('invalid',!this.value.trim());renderPreviewParrafosPaso2();save()"></td>
      <td><input value="${escA(s.sup)}" placeholder="m²" oninput="state.descripcion.sectores[${i}].sup=this.value;renderPreviewParrafosPaso2();save()"></td>
      <td><button class="btn btn-danger-outline btn-sm edit-only" onclick="delSectorEst(${i})">×</button></td>
    </tr>
  `).join('');
}
function actualizarDatalistSectores() {
  const dl = document.getElementById('sectoresDatalist');
  if (!dl) return;
  dl.innerHTML = state.descripcion.sectores
    .filter(s => s.nombre.trim())
    .map(s => `<option value="${escA((s.piso ? s.piso + ' · ' : '') + s.nombre)}">`)
    .join('');
}

// ================================================================
// PASO 3: FOTOS, IA ANTI-ALUCINACIÓN Y CATÁLOGO DEC 351/79
// ================================================================
function getAIConfig() {
  return {
    model: localStorage.getItem('hys_ai_model') || 'gemini:gemini-3-flash-preview',
    geminiKey: localStorage.getItem('hys_gemini_key') || DEFAULT_GEMINI_KEY,
    openaiKey: localStorage.getItem('hys_openai_key') || ''
  };
}
function actualizarTopModelo() {
  const cfg = getAIConfig();
  const map = {
    'gemini:gemini-3-flash-preview': 'Gemini 3 Flash (Deep)',
    'gemini:gemini-3.6-flash': 'Gemini 3.6 Flash',
    'gemini:gemini-3.1-pro-preview': 'Gemini 3.1 Pro',
    'openai:gpt-4o': 'OpenAI GPT-4o',
    'openai:gpt-4.1': 'OpenAI GPT-4.1'
  };
  document.getElementById('lblModeloTop').innerText = map[cfg.model] || cfg.model;
}
function abrirModalIA() {
  const cfg = getAIConfig();
  document.getElementById('cfg-model').value = cfg.model;
  document.getElementById('cfg-geminiKey').value = cfg.geminiKey;
  document.getElementById('cfg-openaiKey').value = cfg.openaiKey;
  document.getElementById('modalIA').classList.add('open');
}
function cerrarModalIA() { document.getElementById('modalIA').classList.remove('open'); }
function guardarConfigIA() {
  localStorage.setItem('hys_ai_model', document.getElementById('cfg-model').value);
  localStorage.setItem('hys_gemini_key', document.getElementById('cfg-geminiKey').value.trim() || DEFAULT_GEMINI_KEY);
  localStorage.setItem('hys_openai_key', document.getElementById('cfg-openaiKey').value.trim());
  actualizarTopModelo();
  cerrarModalIA();
  avisar('Configuración de Motor IA guardada.', 'ok');
}

function fileToBase64(file) {
  return new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(file); });
}
function prepararImagen(dataUrl, maxDim = 1500) {
  return new Promise(res => {
    const img = new Image();
    img.onload = () => {
      let w = img.width, h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) { h = Math.round(h * maxDim / w); w = maxDim; }
        else { w = Math.round(w * maxDim / h); h = maxDim; }
      }
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      res(c.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => res(dataUrl);
    img.src = dataUrl;
  });
}

const CHECKLIST_COMPACT = CHECKLIST_DEF.map(g => g.items.map(([id, t]) => `${id}: ${t}`).join(' | ')).join('\n');
const CATS_351 = [...new Set(CATALOGO_351.map(c => c.cat))].join(', ');

async function analizarConIAFlujo(ev) {
  const files = Array.from(ev.target.files || []);
  ev.target.value = '';
  if (!files.length) return;

  const lugarPre = document.getElementById('ai-lugar-pre').value.trim();
  const notaPre = document.getElementById('ai-nota-pre').value.trim();
  const stLine = document.getElementById('ai-status-line');
  const stTxt = document.getElementById('ai-status-txt');
  stLine.style.display = 'flex';
  cerrarAviso();

  const photos = [];
  for (const f of files) {
    stTxt.innerText = 'Optimizando ' + f.name + '...';
    const raw = await fileToBase64(f);
    photos.push({ dataUrl: await prepararImagen(raw), driveFileId: '', url: '' });
  }

  stTxt.innerText = `Analizando ${photos.length} foto(s) con ${document.getElementById('lblModeloTop').innerText}...`;

  try {
    const res = await llamarMotorIA(photos.map(p => p.dataUrl), lugarPre, notaPre);
    const plazo = res.plazo || '30 días';
    state.hallazgos.push({
      uid: Date.now() + Math.random(),
      ids: (res.ids || '').trim(),
      ubicacion: lugarPre || res.ubicacionSugerida || '',
      incumplimiento: res.incumplimiento || '',
      riesgo: res.riesgo || '',
      prioridad: res.prioridad || 'Prioridad media',
      gravedad351: res.gravedad351 || 'Moderado',
      medida: res.medida || '',
      responsable: res.responsable || 'Responsable del establecimiento / mantenimiento',
      plazo,
      fechaVencimiento: calcularFechaVencimiento(state.caratula.fechaVisita, plazo),
      rgrl: '',
      cat351: res.cat351 || '',
      estadoSeg: 'Abierto',
      photos
    });
    document.getElementById('ai-lugar-pre').value = '';
    document.getElementById('ai-nota-pre').value = '';
    renderHallazgos();
    save();
    avisar(lugarPre ? 'Hallazgo analizado correctamente. Al pasar al Paso 4 se autocompletará la Lista de Verificación.' : 'Hallazgo analizado. Verifique y complete el <strong>Lugar de detección obligatorio</strong>.', 'ok');
  } catch (err) {
    state.hallazgos.push({
      uid: Date.now() + Math.random(),
      ids: '', ubicacion: lugarPre, incumplimiento: notaPre, riesgo: '',
      prioridad: 'Prioridad media', gravedad351: 'Moderado', medida: '',
      responsable: 'Responsable del establecimiento / mantenimiento', plazo: '30 días',
      fechaVencimiento: calcularFechaVencimiento(state.caratula.fechaVisita, '30 días'),
      rgrl: '', cat351: '', estadoSeg: 'Abierto', photos
    });
    renderHallazgos();
    save();
    avisar('No se pudo conectar con la IA (' + err.message + '). Las fotos se conservaron para completar con el buscador Dec. 351/79.', 'err');
  } finally {
    stLine.style.display = 'none';
  }
}

async function llamarMotorIA(imgsBase64, lugarPre, notaPre) {
  const cfg = getAIConfig();
  const [provider, modelName] = cfg.model.split(':');
  const prompt = `Sos Técnico/Licenciado Senior en Higiene y Seguridad en el Trabajo de Argentina (Ley 19.587, Decreto 351/79, AEA 90364, IRAM 3517).
Redactá UNA FILA técnica para la sección "4. Hallazgos y medidas correctivas" de un Informe de Visita Técnica.

REGLAS ANTI-ALUCINACIÓN (OBLIGATORIAS):
1. Describí EXCLUSIVAMENTE lo objetivamente visible en la(s) fotografía(s) o informado en la nota de campo.
2. NUNCA afirmes vencimientos de matafuegos, falta de puesta a tierra, falta de disyuntor o ausencia de insumos si NO es visible con certeza. Cuando requiera verificación en sitio, usá redacción prudente ("Verificar vigencia...", "No se identifica visualmente protección diferencial; verificar con electricista...").
3. Tono institucional, sobrio y conciso (sin signos de exclamación).
4. Mapeá los IDs exactos de nuestra Lista de Verificación:
${CHECKLIST_COMPACT}
5. Elegí la categoría exacta del Dec. 351/79 entre: ${CATS_351}.

CONTEXTO DEL ESTABLECIMIENTO Y CAMPO:
- Actividad general: ${state.descripcion.actividadGeneral || '-'}
- Lugar/Sector indicado: ${lugarPre || '(No indicado — sugerir brevemente el ambiente visible)'}
- Nota de campo del preventor: ${notaPre || '(Sin nota adicional)'}

Respondé EXCLUSIVAMENTE un JSON válido:
{
  "ids": "Ej: C1 C2 o D2 D3 o B4",
  "ubicacionSugerida": "Sector breve solo si no fue indicado",
  "incumplimiento": "Descripción objetiva y precisa del desvío (máx. 2-3 oraciones).",
  "riesgo": "Riesgo concreto (ej: Contacto eléctrico directo e indirecto e incendio).",
  "prioridad": "Prioridad alta" | "Prioridad media" | "Prioridad baja",
  "gravedad351": "Grave" | "Moderado" | "Leve",
  "medida": "Acción correctiva técnica concreta.",
  "responsable": "Ej: Dirección / electricista matriculado · Responsable / mantenimiento",
  "plazo": "Inmediato" | "15 días" | "30 días" | "60 días" | "1 mes" | "3 meses" | "6 meses",
  "cat351": "Categoría exacta del Dec. 351/79"
}`;

  if (provider === 'openai') {
    if (!cfg.openaiKey) throw new Error('Falta configurar tu OpenAI API Key en Motor IA');
    const content = [{ type: 'text', text: prompt }];
    imgsBase64.forEach(d => content.push({ type: 'image_url', image_url: { url: d, detail: 'high' } }));
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.openaiKey },
      body: JSON.stringify({ model: modelName, temperature: 0.1, response_format: { type: 'json_object' }, messages: [{ role: 'user', content }] })
    });
    const d = await r.json();
    if (!r.ok) throw new Error(d.error?.message || 'HTTP ' + r.status);
    return JSON.parse(d.choices[0].message.content);
  }

  if (!cfg.geminiKey) { abrirModalIA(); throw new Error('Falta configurar tu Clave API de Gemini en "Motor IA" (se guarda localmente en el navegador)'); }
  const parts = [{ text: prompt }];
  imgsBase64.forEach(d => parts.push({ inlineData: { mimeType: 'image/jpeg', data: d.split(',')[1] } }));
  const genCfg = { responseMimeType: 'application/json', temperature: 0.1 };
  if (modelName.includes('gemini-3')) genCfg.thinkingConfig = { thinkingBudget: 4096 };
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${cfg.geminiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts }], generationConfig: genCfg })
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error?.message || 'HTTP ' + r.status);
  let txt = d.candidates[0].content.parts[0].text.trim();
  txt = txt.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
  return JSON.parse(txt);
}

function agregarHallazgoManual() {
  state.hallazgos.push({
    uid: Date.now() + Math.random(),
    ids: '', ubicacion: '', incumplimiento: '', riesgo: '',
    prioridad: 'Prioridad media', gravedad351: 'Moderado', medida: '',
    responsable: 'Responsable del establecimiento / mantenimiento', plazo: '30 días',
    fechaVencimiento: calcularFechaVencimiento(state.caratula.fechaVisita, '30 días'),
    rgrl: '', cat351: '', estadoSeg: 'Abierto', photos: []
  });
  renderHallazgos();
  save();
}

async function agregarFotoAHallazgo(idx, ev) {
  const files = Array.from(ev.target.files || []);
  ev.target.value = '';
  for (const f of files) {
    const raw = await fileToBase64(f);
    state.hallazgos[idx].photos.push({ dataUrl: await prepararImagen(raw), driveFileId: '', url: '' });
  }
  renderHallazgos();
  save();
}
function quitarFotoHallazgo(idx, pIdx) { state.hallazgos[idx].photos.splice(pIdx, 1); renderHallazgos(); save(); }
function delHallazgo(idx) {
  if (!confirm('¿Eliminar hallazgo #' + (idx + 1) + '?')) return;
  state.hallazgos.splice(idx, 1);
  renderHallazgos();
  save();
}

function buscar351(idx, q) {
  const box = document.getElementById('catdd-' + idx);
  const t = (q || '').trim().toLowerCase();
  if (t.length < 2) { box.classList.remove('open'); return; }
  const hits = CATALOGO_351.filter(c =>
    c.detalle.toLowerCase().includes(t) || c.cat.toLowerCase().includes(t) ||
    c.kw.toLowerCase().includes(t) || (c.rgrl && c.rgrl.toLowerCase() === t)
  ).slice(0, 12);
  box.innerHTML = hits.length === 0
    ? '<div class="cat-opt" style="color:var(--muted);">Sin coincidencias en Dec. 351/79</div>'
    : hits.map(m => {
        const ci = CATALOGO_351.indexOf(m);
        return `<div class="cat-opt" onclick="aplicar351(${idx}, ${ci})">
          <div style="font-size:10.5px; color:var(--navy); font-weight:700;">${m.rgrl ? 'RGRL ' + m.rgrl + ' · ' : ''}${m.cat} · ${m.riesgo} · ${m.plazo}</div>
          <div>${esc(m.detalle)}</div>
        </div>`;
      }).join('');
  box.classList.add('open');
}

function aplicar351(idx, ci) {
  const h = state.hallazgos[idx];
  const m = CATALOGO_351[ci];
  if (!h || !m) return;
  h.rgrl = m.rgrl || '';
  h.cat351 = m.cat;
  h.gravedad351 = m.riesgo;
  h.prioridad = m.riesgo === 'Grave' ? 'Prioridad alta' : (m.riesgo === 'Leve' ? 'Prioridad baja' : 'Prioridad media');
  h.plazo = m.plazo;
  h.fechaVencimiento = calcularFechaVencimiento(state.caratula.fechaVisita, m.plazo);
  h.medida = h.medida && h.medida.trim() && !h.medida.includes(m.detalle) ? h.medida.trim() + '\n' + m.detalle : m.detalle;
  renderHallazgos();
  save();
}

function renderHallazgos() {
  const cont = document.getElementById('hallazgosList');
  if (!state.hallazgos.length) {
    cont.innerHTML = '<div style="text-align:center; padding:26px; color:var(--muted); border:1px dashed var(--border); border-radius:4px;">Sin hallazgos cargados aún. Suba fotografías arriba para analizarlas con IA o agregue un hallazgo manual.</div>';
    return;
  }
  cont.innerHTML = state.hallazgos.map((h, i) => {
    const prioCls = (h.prioridad || '').toLowerCase().includes('alta') ? 'prio-alta' : ((h.prioridad || '').toLowerCase().includes('media') ? 'prio-media' : '');
    const fotos = h.photos || [];
    return `
      <div class="finding-row-card ${prioCls}">
        <div class="finding-row-head">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <strong style="color:var(--navy);">Hallazgo #${i + 1}</strong>
            <span style="font-size:11.5px; color:var(--muted);">IDs: <strong>${esc(h.ids || 'Sin asignar')}</strong></span>
            ${h.cat351 ? `<span style="font-size:11px; background:var(--tint); color:var(--navy); padding:2px 7px; border-radius:3px; font-weight:600;">${esc(h.cat351)}</span>` : ''}
          </div>
          <button class="btn btn-danger-outline btn-sm edit-only" onclick="delHallazgo(${i})">Eliminar</button>
        </div>
        <div class="finding-layout">
          <div>
            <div class="grid-3">
              <div class="field"><label>ID(s) Checklist</label><input class="input" value="${escA(h.ids)}" placeholder="Ej: C1 C2" oninput="state.hallazgos[${i}].ids=this.value;save()"></div>
              <div class="field" style="grid-column: span 2;">
                <label>Lugar / Ubicación de detección <span class="req">* OBLIGATORIO</span></label>
                <input class="input ${!h.ubicacion?.trim() ? 'invalid' : ''}" id="hubic-${i}" list="sectoresDatalist" value="${escA(h.ubicacion)}"
                  placeholder="Ej: Planta Baja · Tablero principal"
                  oninput="state.hallazgos[${i}].ubicacion=this.value;this.classList.toggle('invalid',!this.value.trim());save()">
              </div>
            </div>
            <div class="field"><label>Incumplimiento observado <span class="req">*</span></label><textarea class="textarea" style="min-height:54px;" oninput="state.hallazgos[${i}].incumplimiento=this.value;save()">${esc(h.incumplimiento)}</textarea></div>
            <div class="grid-4">
              <div class="field"><label>Riesgo <span class="req">*</span></label><input class="input" value="${escA(h.riesgo)}" oninput="state.hallazgos[${i}].riesgo=this.value;save()"></div>
              <div class="field">
                <label>Prioridad</label>
                <select class="select" onchange="state.hallazgos[${i}].prioridad=this.value;state.hallazgos[${i}].gravedad351=this.value.includes('alta')?'Grave':(this.value.includes('baja')?'Leve':'Moderado');save()">
                  <option value="Prioridad alta" ${h.prioridad === 'Prioridad alta' ? 'selected' : ''}>Alta (Grave)</option>
                  <option value="Prioridad media" ${h.prioridad === 'Prioridad media' ? 'selected' : ''}>Media (Moderado)</option>
                  <option value="Prioridad baja" ${h.prioridad === 'Prioridad baja' ? 'selected' : ''}>Baja (Leve)</option>
                </select>
              </div>
              <div class="field">
                <label>Plazo <span class="req">*</span></label>
                <input class="input" value="${escA(h.plazo)}" placeholder="Inmediato / 30 días / 1 mes"
                  oninput="state.hallazgos[${i}].plazo=this.value;state.hallazgos[${i}].fechaVencimiento=calcularFechaVencimiento(state.caratula.fechaVisita,this.value);document.getElementById('hvenc-${i}').value=state.hallazgos[${i}].fechaVencimiento;save()">
              </div>
              <div class="field">
                <label>Vencimiento (Agenda)</label>
                <input type="date" class="input" id="hvenc-${i}" value="${escA(h.fechaVencimiento)}" oninput="state.hallazgos[${i}].fechaVencimiento=this.value;save()">
              </div>
            </div>
            <div class="field cat-search-wrap edit-only">
              <label>Vincular Recomendación Oficial Dec. 351/79 (398 ítems)</label>
              <input class="input" placeholder="Buscar por palabra clave (ej: tablero, matafuego, humedad, piso, epp) o RGRL..."
                oninput="buscar351(${i}, this.value)"
                onblur="setTimeout(()=>document.getElementById('catdd-${i}')?.classList.remove('open'), 220)">
              <div class="cat-dropdown" id="catdd-${i}"></div>
            </div>
            <div class="field"><label>Medida correctiva <span class="req">*</span></label><textarea class="textarea" oninput="state.hallazgos[${i}].medida=this.value;save()">${esc(h.medida)}</textarea></div>
            <div class="field" style="margin-bottom:0;"><label>Responsable <span class="req">*</span></label><input class="input" value="${escA(h.responsable)}" oninput="state.hallazgos[${i}].responsable=this.value;save()"></div>
          </div>
          <div class="photo-stack-edit">
            <div style="font-size:11px; font-weight:700; color:var(--navy); text-transform:uppercase;">Fotografías (${fotos.length})</div>
            ${fotos.length === 0
              ? '<div style="font-size:11.5px; color:var(--muted); text-align:center; padding:18px 8px; border:1px dashed #cbd5e1; background:#fff;">Sin foto vinculante</div>'
              : fotos.map((p, pi) => `
                <div class="photo-thumb-item">
                  <img src="${p.dataUrl || ''}" alt="Foto ${pi + 1}">
                  <button class="photo-del-btn edit-only" onclick="quitarFotoHallazgo(${i}, ${pi})">×</button>
                </div>
              `).join('')}
            <label class="btn btn-white btn-sm edit-only" style="justify-content:center; cursor:pointer;">
              + Agregar foto
              <input type="file" multiple accept="image/*" style="display:none;" onchange="agregarFotoAHallazgo(${i}, event)">
            </label>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ================================================================
// PASO 4: AUTOCOMPLETADO Y RENDER DE LISTA DE VERIFICACIÓN A1–E8
// ================================================================
function autocompletarChecklistDesdeFotosYPendientes() {
  // 1. Desde hallazgos fotográficos del Paso 3
  state.hallazgos.forEach(h => {
    const ids = String(h.ids || '').split(/[\s,]+/).filter(Boolean);
    ids.forEach(id => {
      if (state.checklist[id]) {
        state.checklist[id].estado = (h.prioridad || '').toLowerCase().includes('baja') ? 'OBS' : 'NC';
        const txt = (h.ubicacion ? h.ubicacion + ': ' : '') + (h.incumplimiento || '');
        if (!state.checklist[id].obs || state.checklist[id].auto) {
          state.checklist[id].obs = txt.slice(0, 220);
          state.checklist[id].auto = true;
        }
      }
    });
  });

  // 2. Desde estudios pendientes tildados en Paso 2
  (state.sintesis.pendientes || []).forEach(pName => {
    const map = PENDIENTE_A_IDS[pName];
    if (!map) return;
    map.ids.forEach(id => {
      if (state.checklist[id] && !state.checklist[id].estado) {
        state.checklist[id].estado = 'NC';
        state.checklist[id].obs = map.nota;
        state.checklist[id].auto = true;
      }
    });
  });

  renderChecklist();
  save();
}

function marcarVaciosBloque(code, nuevoEstado) {
  const g = CHECKLIST_DEF.find(x => x.code === code);
  if (!g) return;
  g.items.forEach(([id]) => {
    if (!state.checklist[id] || !state.checklist[id].estado) {
      state.checklist[id] = { estado: nuevoEstado, obs: state.checklist[id]?.obs || '', auto: false };
    }
  });
  renderChecklist();
  save();
}

function sincronizarChecklistNCaHallazgos() {
  const existingIds = new Set(state.hallazgos.flatMap(h => String(h.ids || '').split(/[\s,]+/).filter(Boolean)));
  CHECKLIST_DEF.forEach(g => g.items.forEach(([id, texto]) => {
    const cur = state.checklist[id];
    if (cur && (cur.estado === 'NC' || cur.estado === 'OBS') && !existingIds.has(id)) {
      const plazo = cur.estado === 'NC' ? '60 días' : '60 días';
      state.hallazgos.push({
        uid: Date.now() + Math.random(),
        ids: id,
        ubicacion: 'General / Documental',
        incumplimiento: texto + (cur.obs ? ' ' + cur.obs : ''),
        riesgo: 'Incumplimiento normativo / exposición a riesgos sin controlar.',
        prioridad: cur.estado === 'NC' ? 'Prioridad alta' : 'Prioridad media',
        gravedad351: cur.estado === 'NC' ? 'Grave' : 'Moderado',
        medida: 'Regularizar y acreditar cumplimiento documental o técnico correspondiente.',
        responsable: 'Responsable del establecimiento / HyS',
        plazo,
        fechaVencimiento: calcularFechaVencimiento(state.caratula.fechaVisita, plazo),
        rgrl: '', cat351: g.title, estadoSeg: 'Abierto', photos: []
      });
    }
  }));
  renderHallazgos();
  save();
}

function renderChecklist() {
  let sinVer = 0, nc = 0, obs = 0, c = 0;
  Object.values(state.checklist).forEach(v => {
    if (!v.estado) sinVer++;
    else if (v.estado === 'NC') nc++;
    else if (v.estado === 'OBS') obs++;
    else if (v.estado === 'C') c++;
  });
  const lbl = document.getElementById('lblResumenChk');
  if (lbl) lbl.innerText = `Sin verificar: ${sinVer} · NC: ${nc} · OBS: ${obs} · C: ${c}`;

  document.getElementById('checklistContainer').innerHTML = CHECKLIST_DEF.map(g => `
    <div style="display:flex; justify-content:space-between; align-items:center; margin:16px 0 6px 0; flex-wrap:wrap; gap:8px;">
      <h3 style="font-size:13.5px; color:var(--navy);">${g.title}</h3>
      <div style="display:flex; gap:6px;" class="edit-only">
        <button class="btn btn-white btn-sm" onclick="marcarVaciosBloque('${g.code}', 'C')">Marcar vacíos como C</button>
        <button class="btn btn-white btn-sm" onclick="marcarVaciosBloque('${g.code}', 'NA')">Marcar vacíos como NA</button>
      </div>
    </div>
    <table class="inst-table">
      <thead><tr><th style="width:52px;">ID</th><th style="width:38%;">Aspecto a verificar</th><th style="width:125px;">Estado *</th><th>Observación o evidencia</th></tr></thead>
      <tbody>
        ${g.items.map(([id, text]) => {
          const cur = state.checklist[id] || { estado: '', obs: '' };
          const cls = cur.estado ? 'st-' + cur.estado : 'st-EMPTY';
          return `
            <tr>
              <td style="text-align:center; font-weight:700;">${id}</td>
              <td>${text}</td>
              <td>
                <select id="chk-sel-${id}" class="${cls}" onchange="state.checklist['${id}'].estado=this.value;state.checklist['${id}'].auto=false;renderChecklist();save()">
                  <option value="" ${!cur.estado ? 'selected' : ''}>Sin verificar</option>
                  <option value="C" ${cur.estado === 'C' ? 'selected' : ''}>C (Cumple)</option>
                  <option value="NC" ${cur.estado === 'NC' ? 'selected' : ''}>NC (No cumple)</option>
                  <option value="OBS" ${cur.estado === 'OBS' ? 'selected' : ''}>OBS (Mejora)</option>
                  <option value="NA" ${cur.estado === 'NA' ? 'selected' : ''}>NA (No aplica)</option>
                </select>
              </td>
              <td><input value="${escA(cur.obs)}" placeholder="Evidencia u observación..." oninput="state.checklist['${id}'].obs=this.value;state.checklist['${id}'].auto=false;save()"></td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `).join('');
}

// ================================================================
// PASO 5: SEGUIMIENTO, AGENDA VISITAS, ANEXOS, CONCLUSIÓN Y CIERRE
// ================================================================
function addSeguimiento() {
  state.seguimiento.push({ id: '', fecha: '', hallazgo: '', plazo: '', estAnt: 'Abierto', estAct: 'Pendiente', evidencia: '' });
  renderSeguimiento();
  save();
}
function renderSeguimiento() {
  const tb = document.getElementById('tb-seguimiento');
  if (!state.seguimiento.length) {
    tb.innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--muted);padding:10px;">Sin hallazgos anteriores registrados (primera visita o sin antecedentes cargados).</td></tr>';
    return;
  }
  tb.innerHTML = state.seguimiento.map((r, i) => `
    <tr>
      <td><input value="${escA(r.id)}" oninput="state.seguimiento[${i}].id=this.value;save()"></td>
      <td><input value="${escA(r.fecha)}" oninput="state.seguimiento[${i}].fecha=this.value;save()"></td>
      <td><input value="${escA(r.hallazgo)}" oninput="state.seguimiento[${i}].hallazgo=this.value;save()"></td>
      <td><input value="${escA(r.plazo)}" oninput="state.seguimiento[${i}].plazo=this.value;save()"></td>
      <td><input value="${escA(r.estAnt)}" oninput="state.seguimiento[${i}].estAnt=this.value;save()"></td>
      <td>
        <select onchange="state.seguimiento[${i}].estAct=this.value;save()">
          <option ${r.estAct === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
          <option ${r.estAct === 'En proceso' ? 'selected' : ''}>En proceso</option>
          <option ${r.estAct === 'Cumplido' ? 'selected' : ''}>Cumplido</option>
        </select>
      </td>
      <td><input value="${escA(r.evidencia)}" oninput="state.seguimiento[${i}].evidencia=this.value;save()"></td>
      <td><button class="btn btn-danger-outline btn-sm edit-only" onclick="state.seguimiento.splice(${i},1);renderSeguimiento();save()">×</button></td>
    </tr>
  `).join('');
}

function addVisitaAcordada() {
  const nextN = state.agendaVisitas.length + 2;
  state.agendaVisitas.push({ tipo: `Visita ${nextN} - Seguimiento`, fecha: '', tareas: 'Seguimiento de desvíos y tareas pendientes del ciclo' });
  renderAgendaVisitas();
  save();
}
function renderAgendaVisitas() {
  const tb = document.getElementById('tb-agenda-visitas');
  if (!state.agendaVisitas.length) {
    tb.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--muted);padding:10px;">Sin próximas visitas agendadas aún. Pulse "+ Agendar visita" para incorporarlas a la Agenda de Seguimiento.</td></tr>';
    return;
  }
  tb.innerHTML = state.agendaVisitas.map((v, i) => `
    <tr>
      <td><input value="${escA(v.tipo)}" oninput="state.agendaVisitas[${i}].tipo=this.value;save()"></td>
      <td><input type="date" value="${escA(v.fecha)}" oninput="state.agendaVisitas[${i}].fecha=this.value;save()"></td>
      <td><input value="${escA(v.tareas)}" oninput="state.agendaVisitas[${i}].tareas=this.value;save()"></td>
      <td><button class="btn btn-danger-outline btn-sm edit-only" onclick="state.agendaVisitas.splice(${i},1);renderAgendaVisitas();save()">×</button></td>
    </tr>
  `).join('');
}

function syncPaso5() {
  state.seguimientoIntro = document.getElementById('c-segIntro').value;
  state.conclusion = document.getElementById('c-conclusion').value;
  document.getElementById('c-conclusion').classList.remove('invalid');
  save();
}

function ensureRegistrosTareas() {
  const def = crearEstadoVacio().registrosTareas;
  if (!state.registrosTareas || typeof state.registrosTareas !== 'object') {
    state.registrosTareas = def;
    return;
  }
  Object.keys(def).forEach(k => {
    if (!state.registrosTareas[k] || typeof state.registrosTareas[k] !== 'object') {
      state.registrosTareas[k] = def[k];
    } else {
      state.registrosTareas[k] = Object.assign({}, def[k], state.registrosTareas[k]);
    }
  });
}

function syncBloqueoAnexosPorAcciones() {
  const acc = state.sintesis.acciones || [];

  // Planilla 1 (Evacuación)
  const reqEvac = acc.includes(ACCION_EVAC);
  const selEvac = document.getElementById('st-evac');
  const lblEvac = document.getElementById('lbl-req-evac');
  if (selEvac) {
    if (reqEvac) {
      state.anexos.evacEstado = 'Completado';
      selEvac.value = 'Completado';
      selEvac.disabled = true;
      const w = document.getElementById('wrap-anexo-evac');
      if (w) w.style.display = 'block';
    } else {
      selEvac.disabled = false;
    }
  }
  if (lblEvac) lblEvac.innerText = reqEvac ? '· OBLIGATORIA (tildada en Paso 2)' : '';

  // Planilla 2 (Extintores e Hidrantes)
  const reqExt = acc.includes(ACCION_EXT);
  const selExt = document.getElementById('st-ext');
  const lblExt = document.getElementById('lbl-req-ext');
  if (selExt) {
    if (reqExt) {
      state.anexos.extEstado = 'Completado';
      selExt.value = 'Completado';
      selExt.disabled = true;
      const w = document.getElementById('wrap-anexo-ext');
      if (w) w.style.display = 'block';
    } else {
      selExt.disabled = false;
    }
  }
  if (lblExt) lblExt.innerText = reqExt ? '· OBLIGATORIA (tildada en Paso 2)' : '';

  // Fotos y desvíos (Paso 3)
  const reqFoto = acc.includes(ACCION_FOTO);
  const chkSinFoto = document.getElementById('chk-sinDesviosFoto');
  const lblFoto = document.getElementById('lbl-req-foto');
  if (chkSinFoto) {
    if (reqFoto) {
      state.sinDesviosFoto = false;
      chkSinFoto.checked = false;
      chkSinFoto.disabled = true;
    } else {
      chkSinFoto.disabled = false;
    }
  }
  if (lblFoto) {
    lblFoto.style.display = reqFoto ? 'block' : 'none';
    lblFoto.innerText = reqFoto ? 'Acción "Informe fotográfico y de desvíos" tildada en Paso 2: debe registrar al menos un hallazgo antes de continuar.' : '';
  }

  // Seguimiento y Cronograma (Paso 5)
  const lblSeg = document.getElementById('lbl-req-seg');
  if (lblSeg) lblSeg.innerText = acc.includes(ACCION_SEG) ? '· OBLIGATORIO (tildado en Paso 2)' : '';
  const lblCrono = document.getElementById('lbl-req-crono');
  if (lblCrono) lblCrono.innerText = acc.includes(ACCION_CRONO) ? '· OBLIGATORIO (tildado en Paso 2)' : '';
}

function renderRegistrosTareas() {
  ensureRegistrosTareas();
  const card = document.getElementById('card-registros-tareas');
  const cont = document.getElementById('registrosTareasContainer');
  if (!card || !cont) return;

  const acc = state.sintesis.acciones || [];
  const rt = state.registrosTareas;
  const blocks = [];

  if (acc.includes(ACCION_RGRL)) {
    const r = rt.rgrl;
    blocks.push(`
      <div style="border:1px solid var(--border); border-left:3px solid var(--navy); border-radius:4px; padding:12px 14px; margin-bottom:10px; background:#fff;">
        <div style="font-size:12px; font-weight:700; color:var(--navy); text-transform:uppercase; margin-bottom:8px;">RGRL (confección y carga) <span class="req">*</span></div>
        <div class="grid-2">
          <div class="field" style="margin-bottom:0;">
            <label>Ofrecimiento y modalidad de carga <span class="req">*</span></label>
            <select class="select ${!r.ofrecimiento ? 'invalid' : ''}" onchange="state.registrosTareas.rgrl.ofrecimiento=this.value; this.classList.toggle('invalid',!this.value); save();">
              <option value="">-- Seleccionar --</option>
              <option ${r.ofrecimiento==='Aceptó carga por parte del preventor'?'selected':''}>Aceptó carga por parte del preventor</option>
              <option ${r.ofrecimiento==='Organismo carga directamente en plataforma ART'?'selected':''}>Organismo carga directamente en plataforma ART</option>
              <option ${r.ofrecimiento==='Realizado y cargado en sistema'?'selected':''}>Realizado y cargado en sistema</option>
              <option ${r.ofrecimiento==='Pendiente de firma / documentación del organismo'?'selected':''}>Pendiente de firma / documentación del organismo</option>
            </select>
          </div>
          <div class="field" style="margin-bottom:0;">
            <label>Observaciones / fecha de carga</label>
            <input class="input" value="${escA(r.obs)}" placeholder="Ej: Relevamiento completo, pendiente firma del referente" oninput="state.registrosTareas.rgrl.obs=this.value; save();">
          </div>
        </div>
      </div>
    `);
  }

  if (acc.includes(ACCION_NTEAR)) {
    const r = rt.ntear;
    blocks.push(`
      <div style="border:1px solid var(--border); border-left:3px solid var(--navy); border-radius:4px; padding:12px 14px; margin-bottom:10px; background:#fff;">
        <div style="font-size:12px; font-weight:700; color:var(--navy); text-transform:uppercase; margin-bottom:8px;">NTEAR / RAR (confección y carga) <span class="req">*</span></div>
        <div class="grid-2">
          <div class="field" style="margin-bottom:0;">
            <label>Validación y modalidad de carga <span class="req">*</span></label>
            <select class="select ${!r.ofrecimiento ? 'invalid' : ''}" onchange="state.registrosTareas.ntear.ofrecimiento=this.value; this.classList.toggle('invalid',!this.value); save();">
              <option value="">-- Seleccionar --</option>
              <option ${r.ofrecimiento==='Nómina y agentes validados · Aceptó carga por preventor'?'selected':''}>Nómina y agentes validados · Aceptó carga por preventor</option>
              <option ${r.ofrecimiento==='Organismo carga directamente en plataforma ART'?'selected':''}>Organismo carga directamente en plataforma ART</option>
              <option ${r.ofrecimiento==='Realizado y cargado en sistema'?'selected':''}>Realizado y cargado en sistema</option>
              <option ${r.ofrecimiento==='Pendiente de nómina actualizada del organismo'?'selected':''}>Pendiente de nómina actualizada del organismo</option>
            </select>
          </div>
          <div class="field" style="margin-bottom:0;">
            <label>Observaciones / agentes de riesgo declarados</label>
            <input class="input" value="${escA(r.obs)}" placeholder="Ej: Agentes químicos (limpieza), ruido, postura forzada" oninput="state.registrosTareas.ntear.obs=this.value; save();">
          </div>
        </div>
      </div>
    `);
  }

  if (acc.includes(ACCION_EPP)) {
    const r = rt.epp;
    blocks.push(`
      <div style="border:1px solid var(--border); border-left:3px solid var(--navy); border-radius:4px; padding:12px 14px; margin-bottom:10px; background:#fff;">
        <div style="font-size:12px; font-weight:700; color:var(--navy); text-transform:uppercase; margin-bottom:8px;">Asesoramiento en EPP <span class="req">*</span></div>
        <div class="grid-3">
          <div class="field" style="margin-bottom:0;">
            <label>Puestos / tareas asesorados <span class="req">*</span></label>
            <input class="input ${!r.puestos?.trim() ? 'invalid' : ''}" value="${escA(r.puestos)}" placeholder="Ej: Auxiliares de limpieza, cocina, mantenimiento" oninput="state.registrosTareas.epp.puestos=this.value; this.classList.toggle('invalid',!this.value.trim()); save();">
          </div>
          <div class="field" style="margin-bottom:0;">
            <label>Constancia de asesoramiento</label>
            <select class="select" onchange="state.registrosTareas.epp.constancia=this.value; save();">
              <option value="">-- Seleccionar --</option>
              <option ${r.constancia==='Entregada y firmada'?'selected':''}>Entregada y firmada</option>
              <option ${r.constancia==='Enviada en formato digital'?'selected':''}>Enviada en formato digital</option>
              <option ${r.constancia==='En elaboración'?'selected':''}>En elaboración</option>
            </select>
          </div>
          <div class="field" style="margin-bottom:0;">
            <label>EPP recomendados / observaciones</label>
            <input class="input" value="${escA(r.obs)}" placeholder="Ej: Guantes nitrilo, calzado antideslizante, protección ocular" oninput="state.registrosTareas.epp.obs=this.value; save();">
          </div>
        </div>
      </div>
    `);
  }

  if (acc.includes(ACCION_ERGO)) {
    const r = rt.ergonomia;
    blocks.push(`
      <div style="border:1px solid var(--border); border-left:3px solid var(--navy); border-radius:4px; padding:12px 14px; margin-bottom:10px; background:#fff;">
        <div style="font-size:12px; font-weight:700; color:var(--navy); text-transform:uppercase; margin-bottom:8px;">Estudios de ergonomía (Planillas 1 y 2 · Res. SRT 886/15) <span class="req">*</span></div>
        <div class="grid-3">
          <div class="field" style="margin-bottom:0;">
            <label>Puestos evaluados <span class="req">*</span></label>
            <input class="input ${!r.puestos?.trim() ? 'invalid' : ''}" value="${escA(r.puestos)}" placeholder="Ej: Secretaría, mesa de entradas, cocina" oninput="state.registrosTareas.ergonomia.puestos=this.value; this.classList.toggle('invalid',!this.value.trim()); save();">
          </div>
          <div class="field" style="margin-bottom:0;">
            <label>Estado de Planillas 1 y 2</label>
            <select class="select" onchange="state.registrosTareas.ergonomia.planillas=this.value; save();">
              <option value="">-- Seleccionar --</option>
              <option ${r.planillas==='Planillas 1 y 2 completadas'?'selected':''}>Planillas 1 y 2 completadas</option>
              <option ${r.planillas==='Planilla 1 completada (Planilla 2 en curso)'?'selected':''}>Planilla 1 completada (Planilla 2 en curso)</option>
              <option ${r.planillas==='Relevamiento de campo inicial'?'selected':''}>Relevamiento de campo inicial</option>
            </select>
          </div>
          <div class="field" style="margin-bottom:0;">
            <label>Observaciones / hallazgos ergonómicos</label>
            <input class="input" value="${escA(r.obs)}" placeholder="Ej: Puestos PVD sin apoya-pies, manipulación de cargas en cocina" oninput="state.registrosTareas.ergonomia.obs=this.value; save();">
          </div>
        </div>
      </div>
    `);
  }

  if (acc.includes(ACCION_CAP_HYS)) {
    const r = rt.capHys;
    blocks.push(`
      <div style="border:1px solid var(--border); border-left:3px solid var(--navy); border-radius:4px; padding:12px 14px; margin-bottom:10px; background:#fff;">
        <div style="font-size:12px; font-weight:700; color:var(--navy); text-transform:uppercase; margin-bottom:8px;">Capacitación básica en HyS <span class="req">*</span></div>
        <div class="grid-3">
          <div class="field" style="margin-bottom:0;">
            <label>Cantidad de asistentes <span class="req">*</span></label>
            <input type="number" min="1" class="input ${!r.asistentes ? 'invalid' : ''}" value="${escA(r.asistentes)}" placeholder="Ej: 18" oninput="state.registrosTareas.capHys.asistentes=this.value; this.classList.toggle('invalid',!this.value); save();">
          </div>
          <div class="field" style="margin-bottom:0;">
            <label>Constancia / planilla de asistencia</label>
            <select class="select" onchange="state.registrosTareas.capHys.constancia=this.value; save();">
              <option value="">-- Seleccionar --</option>
              <option ${r.constancia==='Firmada y archivada'?'selected':''}>Firmada y archivada</option>
              <option ${r.constancia==='Digital / virtual'?'selected':''}>Digital / virtual</option>
              <option ${r.constancia==='Pendiente de firma'?'selected':''}>Pendiente de firma</option>
            </select>
          </div>
          <div class="field" style="margin-bottom:0;">
            <label>Temario y observaciones</label>
            <input class="input" value="${escA(r.obs)}" placeholder="Ej: Riesgos generales, uso de extintores, orden y limpieza" oninput="state.registrosTareas.capHys.obs=this.value; save();">
          </div>
        </div>
      </div>
    `);
  }

  if (acc.includes(ACCION_CAP_EVAC)) {
    const r = rt.capEvac;
    blocks.push(`
      <div style="border:1px solid var(--border); border-left:3px solid var(--navy); border-radius:4px; padding:12px 14px; margin-bottom:10px; background:#fff;">
        <div style="font-size:12px; font-weight:700; color:var(--navy); text-transform:uppercase; margin-bottom:8px;">Capacitación sobre roles y responsabilidades en caso de evacuación <span class="req">*</span></div>
        <div class="grid-4">
          <div class="field" style="margin-bottom:0;">
            <label>Asistentes <span class="req">*</span></label>
            <input type="number" min="1" class="input ${!r.asistentes ? 'invalid' : ''}" value="${escA(r.asistentes)}" placeholder="Ej: 22" oninput="state.registrosTareas.capEvac.asistentes=this.value; this.classList.toggle('invalid',!this.value); save();">
          </div>
          <div class="field" style="margin-bottom:0;">
            <label>¿Roles definidos previamente? <span class="req">*</span></label>
            <select class="select ${!r.rolesDefinidos ? 'invalid' : ''}" onchange="state.registrosTareas.capEvac.rolesDefinidos=this.value; this.classList.toggle('invalid',!this.value); save();">
              <option value="">-- Seleccionar --</option>
              <option ${r.rolesDefinidos==='Sí'?'selected':''}>Sí</option>
              <option ${r.rolesDefinidos==='No (se definieron en la jornada)'?'selected':''}>No (se definieron en la jornada)</option>
              <option ${r.rolesDefinidos==='Parcialmente'?'selected':''}>Parcialmente</option>
            </select>
          </div>
          <div class="field" style="margin-bottom:0;">
            <label>Constancia de asistencia</label>
            <select class="select" onchange="state.registrosTareas.capEvac.constancia=this.value; save();">
              <option value="">-- Seleccionar --</option>
              <option ${r.constancia==='Firmada y archivada'?'selected':''}>Firmada y archivada</option>
              <option ${r.constancia==='Digital / virtual'?'selected':''}>Digital / virtual</option>
              <option ${r.constancia==='Pendiente de firma'?'selected':''}>Pendiente de firma</option>
            </select>
          </div>
          <div class="field" style="margin-bottom:0;">
            <label>Observaciones / líderes de evacuación</label>
            <input class="input" value="${escA(r.obs)}" placeholder="Ej: Se designó coordinador por turno y punto de encuentro" oninput="state.registrosTareas.capEvac.obs=this.value; save();">
          </div>
        </div>
      </div>
    `);
  }

  card.style.display = blocks.length ? 'block' : 'none';
  cont.innerHTML = blocks.join('');
}

// ANEXOS OPCIONALES (PLANILLA 1 y 2)
function addEvacSector() { state.anexos.evac.sectores.push({ sector:'', sup:'', manana:'', tarde:'', noche:'', movRed:'No', obs:'' }); renderAnexos(); save(); }
function addEvacSalida() { state.anexos.evac.salidas.push({ ubicacion:'', tipo:'Puerta', ancho:'', apertura:'Hacia afuera', libre:'Sí', senalizada:'Sí', foto:'' }); renderAnexos(); save(); }
function syncEvacPlano() {
  state.anexos.evac.plano = {
    existe: document.getElementById('ev-pl-ex').value,
    vigente: document.getElementById('ev-pl-vig').value,
    coincide: document.getElementById('ev-pl-coi').value,
    obs: document.getElementById('ev-pl-obs').value
  };
  save();
}
function addExt() { state.anexos.fuego.extintores.push({ ubicacion:'', agente:'ABC 5 kg', vencCarga:'', vencPH:'', estadoVisual:'✓', acceso:'✓', desvio:'No', foto:'' }); renderAnexos(); save(); }
function addHid() { state.anexos.fuego.hidrantes.push({ ubicacion:'', gabinete:'✓', manguera:'✓', lanza:'✓', llave:'✓', acceso:'✓', desvio:'No', foto:'' }); renderAnexos(); save(); }

function renderAnexos() {
  document.getElementById('wrap-anexo-evac').style.display = state.anexos.evacEstado === 'Completado' ? 'block' : 'none';
  document.getElementById('wrap-anexo-ext').style.display = state.anexos.extEstado === 'Completado' ? 'block' : 'none';

  const ev = state.anexos.evac;
  document.getElementById('tb-ev-sec').innerHTML = ev.sectores.length
    ? ev.sectores.map((s,i) => `<tr><td><input value="${escA(s.sector)}" oninput="state.anexos.evac.sectores[${i}].sector=this.value;save()"></td><td><input value="${escA(s.sup)}" oninput="state.anexos.evac.sectores[${i}].sup=this.value;save()"></td><td><input value="${escA(s.manana)}" oninput="state.anexos.evac.sectores[${i}].manana=this.value;save()"></td><td><input value="${escA(s.tarde)}" oninput="state.anexos.evac.sectores[${i}].tarde=this.value;save()"></td><td><input value="${escA(s.noche)}" oninput="state.anexos.evac.sectores[${i}].noche=this.value;save()"></td><td><input value="${escA(s.movRed)}" oninput="state.anexos.evac.sectores[${i}].movRed=this.value;save()"></td><td><input value="${escA(s.obs)}" oninput="state.anexos.evac.sectores[${i}].obs=this.value;save()"></td><td><button class="btn btn-danger-outline btn-sm edit-only" onclick="state.anexos.evac.sectores.splice(${i},1);renderAnexos();save()">×</button></td></tr>`).join('')
    : '<tr><td colspan="8" style="text-align:center;color:var(--muted);">Sin registros</td></tr>';

  document.getElementById('tb-ev-sal').innerHTML = ev.salidas.length
    ? ev.salidas.map((s,i) => `<tr><td style="text-align:center;">${i+1}</td><td><input value="${escA(s.ubicacion)}" oninput="state.anexos.evac.salidas[${i}].ubicacion=this.value;save()"></td><td><select onchange="state.anexos.evac.salidas[${i}].tipo=this.value;save()"><option ${s.tipo==='Puerta'?'selected':''}>Puerta</option><option ${s.tipo==='Escalera'?'selected':''}>Escalera</option><option ${s.tipo==='Pasillo'?'selected':''}>Pasillo</option></select></td><td><input value="${escA(s.ancho)}" oninput="state.anexos.evac.salidas[${i}].ancho=this.value;save()"></td><td><input value="${escA(s.apertura)}" oninput="state.anexos.evac.salidas[${i}].apertura=this.value;save()"></td><td><select onchange="state.anexos.evac.salidas[${i}].libre=this.value;save()"><option ${s.libre==='Sí'?'selected':''}>Sí</option><option ${s.libre==='No'?'selected':''}>No</option></select></td><td><select onchange="state.anexos.evac.salidas[${i}].senalizada=this.value;save()"><option ${s.senalizada==='Sí'?'selected':''}>Sí</option><option ${s.senalizada==='No'?'selected':''}>No</option></select></td><td><input value="${escA(s.foto)}" oninput="state.anexos.evac.salidas[${i}].foto=this.value;save()"></td><td><button class="btn btn-danger-outline btn-sm edit-only" onclick="state.anexos.evac.salidas.splice(${i},1);renderAnexos();save()">×</button></td></tr>`).join('')
    : '<tr><td colspan="9" style="text-align:center;color:var(--muted);">Sin registros</td></tr>';

  document.getElementById('tb-ev-elem').innerHTML = ev.elementos.map((el,i) => `<tr><td style="font-weight:600;">${el.nombre}</td><td><select onchange="state.anexos.evac.elementos[${i}].existe=this.value;save()"><option value="">--</option><option ${el.existe==='Sí'?'selected':''}>Sí</option><option ${el.existe==='No'?'selected':''}>No</option></select></td><td><input value="${escA(el.cantidad)}" oninput="state.anexos.evac.elementos[${i}].cantidad=this.value;save()"></td><td><input value="${escA(el.ubicacion)}" oninput="state.anexos.evac.elementos[${i}].ubicacion=this.value;save()"></td><td><input value="${escA(el.estado)}" oninput="state.anexos.evac.elementos[${i}].estado=this.value;save()"></td><td><input value="${escA(el.foto)}" oninput="state.anexos.evac.elementos[${i}].foto=this.value;save()"></td></tr>`).join('');

  const fg = state.anexos.fuego;
  document.getElementById('tb-ext').innerHTML = fg.extintores.length
    ? fg.extintores.map((e,i) => `<tr><td style="text-align:center;">${i+1}</td><td><input class="${!e.ubicacion.trim()?'invalid':''}" value="${escA(e.ubicacion)}" placeholder="Ubicación obligatoria" oninput="state.anexos.fuego.extintores[${i}].ubicacion=this.value;this.classList.toggle('invalid',!this.value.trim());save()"></td><td><input value="${escA(e.agente)}" oninput="state.anexos.fuego.extintores[${i}].agente=this.value;save()"></td><td><input value="${escA(e.vencCarga)}" oninput="state.anexos.fuego.extintores[${i}].vencCarga=this.value;save()"></td><td><input value="${escA(e.vencPH)}" oninput="state.anexos.fuego.extintores[${i}].vencPH=this.value;save()"></td><td><select onchange="state.anexos.fuego.extintores[${i}].estadoVisual=this.value;save()"><option ${e.estadoVisual==='✓'?'selected':''}>✓</option><option ${e.estadoVisual==='✗'?'selected':''}>✗</option></select></td><td><select onchange="state.anexos.fuego.extintores[${i}].acceso=this.value;save()"><option ${e.acceso==='✓'?'selected':''}>✓</option><option ${e.acceso==='✗'?'selected':''}>✗</option></select></td><td><select onchange="state.anexos.fuego.extintores[${i}].desvio=this.value;save()"><option ${e.desvio==='No'?'selected':''}>No</option><option ${e.desvio==='Sí'?'selected':''}>Sí</option></select></td><td><input value="${escA(e.foto)}" oninput="state.anexos.fuego.extintores[${i}].foto=this.value;save()"></td><td><button class="btn btn-danger-outline btn-sm edit-only" onclick="state.anexos.fuego.extintores.splice(${i},1);renderAnexos();save()">×</button></td></tr>`).join('')
    : '<tr><td colspan="10" style="text-align:center;color:var(--muted);">Sin registros</td></tr>';

  document.getElementById('tb-hid').innerHTML = fg.hidrantes.length
    ? fg.hidrantes.map((h,i) => `<tr><td style="text-align:center;">${i+1}</td><td><input class="${!h.ubicacion.trim()?'invalid':''}" value="${escA(h.ubicacion)}" placeholder="Ubicación obligatoria" oninput="state.anexos.fuego.hidrantes[${i}].ubicacion=this.value;this.classList.toggle('invalid',!this.value.trim());save()"></td>${['gabinete','manguera','lanza','llave','acceso'].map(k=>`<td><select onchange="state.anexos.fuego.hidrantes[${i}].${k}=this.value;save()"><option ${h[k]==='✓'?'selected':''}>✓</option><option ${h[k]==='✗'?'selected':''}>✗</option></select></td>`).join('')}<td><select onchange="state.anexos.fuego.hidrantes[${i}].desvio=this.value;save()"><option ${h.desvio==='No'?'selected':''}>No</option><option ${h.desvio==='Sí'?'selected':''}>Sí</option></select></td><td><input value="${escA(h.foto)}" oninput="state.anexos.fuego.hidrantes[${i}].foto=this.value;save()"></td><td><button class="btn btn-danger-outline btn-sm edit-only" onclick="state.anexos.fuego.hidrantes.splice(${i},1);renderAnexos();save()">×</button></td></tr>`).join('')
    : '<tr><td colspan="10" style="text-align:center;color:var(--muted);">Sin registros</td></tr>';
}

async function redactarConclusionIA() {
  const cfg = getAIConfig();
  const [provider, modelName] = cfg.model.split(':');
  avisar('Redactando conclusión técnica en base a los datos reales del informe...', 'info');
  const ncs = Object.entries(state.checklist).filter(([,v]) => v.estado === 'NC' || v.estado === 'OBS').map(([id,v]) => `${id} (${v.estado}): ${v.obs}`).join('\n');
  const hals = state.hallazgos.map(h => `[${h.ids}] ${h.ubicacion}: ${h.incumplimiento} (Plazo: ${h.plazo})`).join('\n');
  const prompt = `Redactá la sección "6. Conclusión y prioridades" de un Informe de Visita Técnica de Higiene y Seguridad (4 a 6 párrafos sobrios, sin viñetas ni markdown, texto plano para recuadro oficial).
Establecimiento: ${state.caratula.denominacion} (Est. N° ${state.caratula.estNro}), Fecha: ${fmtFechaAR(state.caratula.fechaVisita)}.
Actividad: ${state.descripcion.actividadGeneral} (${state.descripcion.superficie} m², ${state.descripcion.pisos} piso(s)).
Estudios pendientes: ${state.sintesis.pendientes.join(', ') || 'Ninguno'}.
Ítems NC/OBS:
${ncs || 'Ninguno'}
Hallazgos:
${hals || 'Ninguno'}
No inventes ningún dato no listado arriba.`;

  try {
    let out = '';
    if (provider === 'openai') {
      if (!cfg.openaiKey) throw new Error('Falta OpenAI API Key');
      const r = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.openaiKey },
        body: JSON.stringify({ model: modelName, temperature: 0.2, messages: [{ role: 'user', content: prompt }] })
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error?.message || 'HTTP ' + r.status);
      out = d.choices[0].message.content.trim();
    } else {
      if (!cfg.geminiKey) { abrirModalIA(); throw new Error('Falta configurar tu Clave API de Gemini en "Motor IA" (se guarda localmente en el navegador)'); }
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${cfg.geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.2 } })
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error?.message || 'HTTP ' + r.status);
      out = d.candidates[0].content.parts[0].text.trim();
    }
    state.conclusion = out;
    document.getElementById('c-conclusion').value = out;
    save();
    avisar('Conclusión generada. Revisala antes de cerrar el informe.', 'ok');
  } catch (err) {
    avisar('Error generando conclusión: ' + err.message, 'err');
  }
}

// ================================================================
// PERSISTENCIA EN LA NUBE (GOOGLE SHEETS + DRIVE) Y CIERRE
// ================================================================
async function guardarInformeNube(nuevoEstado) {
  syncPaso1(); syncPaso2(); syncPaso5();
  if (!state.caratula.denominacion.trim()) {
    avisar('Complete al menos la Denominación del establecimiento en el Paso 1 para poder guardar en Sheets.', 'err');
    return false;
  }

  state.estadoInforme = nuevoEstado;
  if (nuevoEstado === 'Emitido') {
    state.fechaCierre = new Date().toLocaleString('es-AR');
  }
  avisar(`Guardando informe (${nuevoEstado}) y subiendo fotografías a Google Drive + Sheets...`, 'info');

  try {
    const r = await fetch(WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'save', informe: state })
    });
    const text = await r.text();
    let res;
    try { res = JSON.parse(text); } catch (_) {
      throw new Error('Google requiere autorización única del Apps Script. Abrí el editor de Apps Script y ejecutá doGet para dar permiso a Sheets y Drive.');
    }
    if (!res.ok) throw new Error(res.error || 'Error desconocido al guardar');

    state.idVisita = res.idVisita;
    state.driveFolderUrl = res.folderUrl || state.driveFolderUrl;
    state.jsonFileId = res.jsonFileId || state.jsonFileId;
    state.ultimaActualizacion = res.timestamp || new Date().toLocaleString('es-AR');
    save();
    renderWizardBar();

    avisar(`Informe guardado como <strong>${nuevoEstado} (Rev. ${state.revision})</strong> en Google Sheets y Drive. <a href="${SHEET_URL}" target="_blank" style="color:var(--ok);font-weight:700;">Abrir Sheets</a>${state.driveFolderUrl ? ` · <a href="${state.driveFolderUrl}" target="_blank" style="color:var(--ok);font-weight:700;">Carpeta Drive</a>` : ''}`, 'ok');
    return true;
  } catch (err) {
    if (nuevoEstado === 'Emitido') state.estadoInforme = 'Borrador';
    renderWizardBar();
    avisar('No se pudo guardar en la nube: ' + err.message, 'err');
    return false;
  }
}

async function cerrarYEmitirInforme() {
  for (let p = 1; p <= 5; p++) {
    if (!validarPaso(p)) { irPaso(p); return; }
  }
  const ok = await guardarInformeNube('Emitido');
  if (ok) {
    renderPreview();
    verVista('preview');
  }
}

function reabrirParaModificar() {
  if (!confirm('¿Reabrir este informe emitido para modificarlo? Se incrementará el número de revisión.')) return;
  state.estadoInforme = 'Borrador';
  state.revision = (state.revision || 1) + 1;
  state.pasoMaxHabilitado = 5;
  save();
  renderWizardBar();
  avisar(`Informe reabierto como <strong>Borrador (Rev. ${state.revision})</strong>. Recordá volver a guardar y emitir tras los cambios.`, 'info');
}

// ================================================================
// BIBLIOTECA DE INFORMES GUARDADOS Y AGENDA DE SEGUIMIENTO
// ================================================================
async function cargarBibliotecaYAgenda() {
  const bib = document.getElementById('bibliotecaBody');
  const ag = document.getElementById('agendaBody');
  bib.innerHTML = '<div style="padding:20px;color:var(--muted);text-align:center;"><span class="spinner"></span> Consultando Google Sheets...</div>';
  ag.innerHTML = '<div style="padding:20px;color:var(--muted);text-align:center;"><span class="spinner"></span> Consultando Agenda en Google Sheets...</div>';

  try {
    const r = await fetch(WEBAPP_URL + '?action=list');
    const txt = await r.text();
    let d;
    try { d = JSON.parse(txt); } catch (_) {
      throw new Error('El Apps Script aún necesita tu autorización única en Google (Sheets + Drive).');
    }
    if (!d.ok) throw new Error(d.error || 'Error leyendo Sheets');
    cacheInformes = d.informes || [];
    cacheAgenda = d.agenda || [];
    renderBibliotecaTabla();
    renderAgendaTabla();
  } catch (err) {
    const msg = `<div style="padding:20px; color:var(--danger); text-align:center;">${esc(err.message)}</div>`;
    bib.innerHTML = msg;
    ag.innerHTML = msg;
  }
}

function renderBibliotecaTabla() {
  const bib = document.getElementById('bibliotecaBody');
  if (!cacheInformes.length) {
    bib.innerHTML = '<div style="padding:26px;text-align:center;color:var(--muted);border:1px dashed var(--border);">Todavía no hay informes guardados en Google Sheets. Complete uno en "Informe Actual" para verlo aquí.</div>';
    return;
  }
  bib.innerHTML = `
    <table class="inst-table">
      <thead>
        <tr>
          <th>Fecha Visita</th><th>Establecimiento</th><th>Visita</th><th>Estado</th>
          <th>Rev.</th><th>NC / Hallazgos</th><th>Próx. Visita</th><th style="width:230px;">Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${cacheInformes.map(inf => {
          const isEm = inf.Estado_Informe === 'Emitido';
          return `
            <tr>
              <td>${esc(fmtFechaAR(inf.Fecha_Visita))}</td>
              <td><strong>${esc(inf.Denominacion)}</strong>${inf.Establecimiento_Nro ? ' (N° ' + esc(inf.Establecimiento_Nro) + ')' : ''}<div style="font-size:11px;color:var(--muted);">${esc(inf.Organismo)}</div></td>
              <td>${esc(inf.Visita_Nro)}</td>
              <td><span class="status-tag ${isEm ? 'tag-emitido' : 'tag-borrador'}">${esc(inf.Estado_Informe)}</span></td>
              <td style="text-align:center;">${esc(inf.Revision)}</td>
              <td style="text-align:center;">${esc(inf.Cant_NC)} NC / ${esc(inf.Total_Hallazgos)}</td>
              <td>${esc(fmtFechaAR(inf.Prox_Visita_Acordada) || '-')}</td>
              <td>
                <div style="display:flex; gap:5px; flex-wrap:wrap;">
                  <button class="btn btn-primary btn-sm" onclick="abrirInformeDesdeDrive('${escA(inf.ID_Visita)}', false)">Abrir / Reimprimir</button>
                  <button class="btn btn-white btn-sm" onclick="iniciarVisitaSeguimiento('${escA(inf.Organismo)}', '${escA(inf.Establecimiento_Nro)}', '${escA(inf.Denominacion)}', '${escA(inf.Domicilio_Localidad)}', '${escA(inf.CUIT)}')">Seguimiento</button>
                </div>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

async function abrirInformeDesdeDrive(idVisita) {
  avisar('Recuperando informe completo y fotografías desde Google Drive...', 'info');
  try {
    const r = await fetch(WEBAPP_URL + '?action=load&id=' + encodeURIComponent(idVisita));
    const d = await r.json();
    if (!d.ok || !d.informe) throw new Error(d.error || 'No se pudo cargar el informe');
    state = Object.assign(crearEstadoVacio(), d.informe);
    state.pasoMaxHabilitado = 5;
    state.pasoActual = state.estadoInforme === 'Emitido' ? 5 : (state.pasoActual || 1);
    save();
    hidratarTodo();
    verVista('wizard');
    avisar(`Informe <strong>${esc(state.caratula.denominacion)}</strong> cargado desde Drive con todas sus fotos.`, 'ok');
  } catch (err) {
    avisar('Error cargando informe desde Drive: ' + err.message, 'err');
  }
}

function renderAgendaTabla() {
  const ag = document.getElementById('agendaBody');
  const q = (document.getElementById('ag-filtro')?.value || '').trim().toLowerCase();
  const est = document.getElementById('ag-estado')?.value || '';
  const hoy = new Date().toISOString().slice(0, 10);

  const filtrados = cacheAgenda
    .filter(x => (!q || String(x.Denominacion || '').toLowerCase().includes(q) || String(x.Descripcion || '').toLowerCase().includes(q)) && (!est || x.Estado === est))
    .sort((a, b) => String(a.Fecha_Programada || '').localeCompare(String(b.Fecha_Programada || '')));

  if (!filtrados.length) {
    ag.innerHTML = '<div style="padding:26px;text-align:center;color:var(--muted);border:1px dashed var(--border);">Sin ítems en la Agenda de Seguimiento para los filtros seleccionados.</div>';
    return;
  }

  ag.innerHTML = `
    <table class="inst-table">
      <thead>
        <tr>
          <th style="width:95px;">Fecha Prog.</th><th style="width:140px;">Tipo</th><th>Establecimiento y Lugar</th>
          <th>Incumplimiento / Tareas</th><th style="width:90px;">Prioridad</th><th style="width:125px;">Estado</th>
        </tr>
      </thead>
      <tbody>
        ${filtrados.map(item => {
          const vencido = item.Estado === 'Pendiente' && item.Fecha_Programada && item.Fecha_Programada < hoy;
          return `
            <tr>
              <td style="font-weight:700; color:${vencido ? 'var(--danger)' : 'var(--navy)'};">
                ${esc(fmtFechaAR(item.Fecha_Programada))}
                ${vencido ? '<div style="font-size:10px;">VENCIDO</div>' : ''}
              </td>
              <td><span class="status-tag ${item.Tipo_Hito === 'Visita Acordada' ? 'tag-emitido' : 'tag-borrador'}">${esc(item.Tipo_Hito)}</span></td>
              <td><strong>${esc(item.Denominacion)}</strong><div style="font-size:11px;color:var(--muted);">${esc(item.Lugar_Deteccion)}</div></td>
              <td>${esc(item.Descripcion)}</td>
              <td>${esc(item.Prioridad)}</td>
              <td>
                <select onchange="cambiarEstadoAgenda('${escA(item.ID_Hito)}', this.value)">
                  <option value="Pendiente" ${item.Estado === 'Pendiente' ? 'selected' : ''}>Pendiente</option>
                  <option value="Cumplido" ${item.Estado === 'Cumplido' ? 'selected' : ''}>Cumplido</option>
                  <option value="Reprogramado" ${item.Estado === 'Reprogramado' ? 'selected' : ''}>Reprogramado</option>
                </select>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;
}

async function cambiarEstadoAgenda(idHito, nuevoEstado) {
  try {
    await fetch(WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'update_agenda_status', idHito, estado: nuevoEstado })
    });
    const it = cacheAgenda.find(x => x.ID_Hito === idHito);
    if (it) it.Estado = nuevoEstado;
    renderAgendaTabla();
    avisar('Estado actualizado en Agenda_Seguimiento.', 'ok');
  } catch (err) {
    avisar('No se pudo actualizar estado en agenda: ' + err.message, 'err');
  }
}

async function traerHallazgosAnteriores() {
  const est = state.caratula.denominacion.trim();
  if (!est) { avisar('Primero complete la Denominación del establecimiento.', 'err'); return; }
  avisar('Buscando hallazgos abiertos de visitas anteriores en Google Sheets...', 'info');
  try {
    const r = await fetch(WEBAPP_URL + '?action=open_findings&est=' + encodeURIComponent(est));
    const d = await r.json();
    if (!d.ok) throw new Error(d.error);
    if (!d.findings || !d.findings.length) {
      avisar('No se encontraron hallazgos abiertos previos para ' + esc(est) + '.', 'info');
      return;
    }
    state.seguimiento = d.findings.map(f => ({
      id: f.IDs_Checklist || ('H' + f.Hallazgo_Nro),
      fecha: fmtFechaAR(f.Fecha_Visita),
      hallazgo: (f.Lugar_Deteccion_Obligatorio ? f.Lugar_Deteccion_Obligatorio + ': ' : '') + f.Incumplimiento,
      plazo: f.Plazo || '',
      estAnt: f.Estado_Seguimiento || 'Abierto',
      estAct: 'Pendiente',
      evidencia: ''
    }));
    renderSeguimiento();
    save();
    avisar(`Se importaron ${state.seguimiento.length} hallazgo(s) abierto(s) desde la visita anterior.`, 'ok');
  } catch (err) {
    avisar('Error consultando hallazgos previos: ' + err.message, 'err');
  }
}

async function iniciarVisitaSeguimiento(org, nro, denom, dom, cuit) {
  state = crearEstadoVacio();
  state.caratula.organismo = org;
  state.caratula.estNro = nro;
  state.caratula.denominacion = denom;
  state.caratula.domicilio = dom;
  state.caratula.cuit = cuit;
  state.caratula.visitaNro = 'Visita 2 - Seguimiento y capacitación';
  save();
  hidratarTodo();
  verVista('wizard');
  await traerHallazgosAnteriores();
}

function nuevoInforme() {
  if (!confirm('¿Iniciar un informe nuevo completamente en blanco?')) return;
  state = crearEstadoVacio();
  localStorage.removeItem(STORAGE_KEY);
  hidratarTodo();
  verVista('wizard');
  avisar('Informe nuevo iniciado desde cero.', 'info');
}

// ================================================================
// VISTA PREVIA E IMPRESIÓN A4 FIEL AL PDF (PÁGINAS 1 A 15 + ANEXOS)
// ================================================================
function footerHtml(pageNum) {
  const c = state.caratula;
  return `
    <footer class="pdf-footer">
      <div class="pdf-footer-left">Higiene y Seguridad</div>
      <div class="pdf-footer-center">
        ${c.firmaImg ? `<img src="${c.firmaImg}" alt="Firma">` : ''}
        <div>Firma y aclaración · Profesional de Higiene y Seguridad</div>
        ${c.profNombre ? `<div style="font-weight:700;color:#000;">${esc(c.profNombre)}</div>` : ''}
        ${c.profMat ? `<div style="font-size:7.5pt;color:#000;">${esc(c.profMat)}</div>` : ''}
      </div>
      <div class="pdf-footer-right">Página ${pageNum}</div>
    </footer>
  `;
}

function renderPreview() {
  syncPaso1(); syncPaso2(); syncPaso5();
  const c = state.caratula;
  const d = state.descripcion;
  const s = state.sintesis;
  let pageNum = 1;
  const pages = [];

  const fechaHoraTxt = (c.fechaVisita ? fmtFechaAR(c.fechaVisita) : '') + (c.horaVisita ? ' - ' + c.horaVisita + ' h' : '');

  // PÁGINA 1: CARÁTULA
  pages.push(`
    <article class="pdf-page">
      <div class="pdf-body">
        <div class="cover-title">INFORME DE VISITA TÉCNICA</div>
        <div class="cover-subtitle">Higiene y Seguridad en el Trabajo</div>
        <table class="pdf-table">
          <tbody>
            <tr><td class="pdf-lbl">Organismo</td><td>${esc(c.organismo)}</td></tr>
            <tr><td class="pdf-lbl">Establecimiento N°</td><td>${esc(c.estNro)}</td></tr>
            <tr><td class="pdf-lbl">Denominación</td><td>${esc(c.denominacion)}</td></tr>
            <tr><td class="pdf-lbl">Domicilio y localidad</td><td>${esc(c.domicilio)}</td></tr>
            <tr><td class="pdf-lbl">CUIT</td><td>${esc(c.cuit)}</td></tr>
            <tr><td class="pdf-lbl">Fecha de visita</td><td>${esc(fechaHoraTxt)}</td></tr>
          </tbody>
        </table>
        ${c.coverPhoto ? `<img class="cover-photo" src="${c.coverPhoto}" alt="Establecimiento">` : ''}
      </div>
      ${footerHtml(pageNum++)}
    </article>
  `);

  // PÁGINA 2: 1. OBJETO + 2. DESCRIPCIÓN DEL ESTABLECIMIENTO (EN PÁRRAFOS) + SÍNTESIS DE LA VISITA
  const accList = s.acciones || [];
  const secList = s.secundarias || [];
  const accHtml = ACCIONES_LIST.map(a => (accList.includes(a) ? '☒ ' : '☐ ') + esc(a)).join(' &nbsp; ');
  const secItems = TAREAS_SECUNDARIAS_LIST.filter(t => secList.includes(t)).map(t => '☒ ' + esc(t));
  if (s.otroAccion && s.otroAccion.trim()) secItems.push('☒ Otro: ' + esc(s.otroAccion.trim()));
  const secHtml = secItems.length ? secItems.join(' &nbsp; ') : 'Ninguna registrada en esta visita.';
  const penHtml = PENDIENTES_LIST.map(p => ((s.pendientes || []).includes(p) ? '☒ ' : '☐ ') + esc(p)).join(' &nbsp; ') + (s.pendNota ? '<br>' + esc(s.pendNota) : '');
  const descParrafosHtml = construirParrafosDescripcion()
    .map(p => `<p style="margin-bottom:6px;text-align:justify;">${p.titulo ? `<strong>${esc(p.titulo)}:</strong> ` : ''}${esc(p.texto)}</p>`)
    .join('');

  pages.push(`
    <article class="pdf-page">
      <div class="pdf-body">
        <div class="pdf-h1" style="margin-top:0;">1. Objeto, alcance y criterio de relevamiento</div>
        <div class="pdf-h2">Base del informe y límites de la observación</div>
        <p style="margin-bottom:5px;text-align:justify;">${esc(s.obj1)}</p>
        <p style="margin-bottom:10px;text-align:justify;">${esc(s.obj2)}</p>

        <div class="pdf-h1">2. Descripción del establecimiento y síntesis de la visita</div>
        <div style="margin:6px 0 10px 0; font-size:9.1pt; line-height:1.42;">
          ${descParrafosHtml || '<p>Sin descripción cargada.</p>'}
        </div>

        <table class="pdf-table">
          <tbody>
            <tr><td class="pdf-lbl">Categoría y ciclo de visita</td><td>Categoría ${esc(c.categoria)} · ${esc(c.visitaNro)}</td></tr>
            <tr><td class="pdf-lbl">Acciones realizadas (Plan HyS 2026)</td><td>${accHtml}</td></tr>
            <tr><td class="pdf-lbl">Tareas secundarias y mediciones</td><td>${secHtml}</td></tr>
            <tr><td class="pdf-lbl">Estudios y documentos pendientes</td><td>${penHtml}</td></tr>
            <tr><td class="pdf-lbl">Documentación entregada al establecimiento</td><td>${esc(s.docEntregada)}</td></tr>
          </tbody>
        </table>
      </div>
      ${footerHtml(pageNum++)}
    </article>
  `);

  // PÁGINAS 3–7: 3. LISTA DE VERIFICACIÓN (49 ÍTEMS A1–E8)
  const chkRows = (list) => list.map(([id, txt]) => {
    const v = state.checklist[id] || { estado: '', obs: '' };
    return `<tr><td style="text-align:center;width:12mm;font-weight:700;">${id}</td><td style="width:68mm;">${txt}</td><td style="text-align:center;width:15mm;font-weight:700;">${esc(v.estado || '-')}</td><td>${esc(v.obs)}</td></tr>`;
  }).join('');

  const chkPages = [
    { head: true, blocks: [{ title: CHECKLIST_DEF[0].title, items: CHECKLIST_DEF[0].items }] },
    { head: false, blocks: [{ title: CHECKLIST_DEF[1].title, items: CHECKLIST_DEF[1].items }] },
    { head: false, blocks: [{ title: CHECKLIST_DEF[2].title, items: CHECKLIST_DEF[2].items }] },
    { head: false, blocks: [{ title: CHECKLIST_DEF[3].title, items: CHECKLIST_DEF[3].items }] },
    { head: false, blocks: [{ title: CHECKLIST_DEF[4].title, items: CHECKLIST_DEF[4].items }] }
  ];

  chkPages.forEach(pg => {
    const inner = (pg.head ? `
      <div class="pdf-h1" style="margin-top:0;">3. Lista de verificación</div>
      <p style="font-size:8.6pt;margin-bottom:6px;">C = cumple en el alcance registrado; NC = no cumple; OBS = mejora preventiva; NA = no aplica; Los estados se basan en el relevamiento informado, la constancia y las fotografías.</p>
    ` : '') + pg.blocks.map(b => `
      <div class="pdf-subcat">${b.title}</div>
      <table class="pdf-table">
        <thead><tr><th>ID</th><th>Aspecto a verificar</th><th>Estado</th><th>Observación o evidencia</th></tr></thead>
        <tbody>${chkRows(b.items)}</tbody>
      </table>
    `).join('');
    pages.push(`<article class="pdf-page"><div class="pdf-body">${inner}</div>${footerHtml(pageNum++)}</article>`);
  });

  // PÁGINAS DE HALLAZGOS (A4 HORIZONTAL / LANDSCAPE)
  const chunks = [];
  let curChunk = [], curWeight = 0;
  state.hallazgos.forEach(h => {
    const nPh = (h.photos || []).length;
    const w = nPh >= 3 ? 3 : (nPh >= 1 ? 1.6 : 1);
    if (curChunk.length > 0 && curWeight + w > 3.1) { chunks.push(curChunk); curChunk = []; curWeight = 0; }
    curChunk.push(h); curWeight += w;
  });
  if (curChunk.length) chunks.push(curChunk);
  if (!chunks.length) chunks.push([]);

  chunks.forEach((group, gIdx) => {
    const rowsHtml = !group.length
      ? '<tr><td colspan="7" style="text-align:center;padding:18px;">Sin hallazgos registrados en la presente visita.</td></tr>'
      : group.map(h => `
        <tr>
          <td style="width:14mm;text-align:center;font-weight:700;">${esc(h.ids).replace(/\s+/g, '<br>')}</td>
          <td style="width:52mm;"><div style="font-weight:700;color:var(--navy);margin-bottom:3px;">${esc(h.ubicacion)}</div><div>${esc(h.incumplimiento).replace(/\n/g, '<br>')}</div></td>
          <td style="width:32mm;"><div>${esc(h.riesgo)}</div><div style="font-weight:700;margin-top:4px;">${esc(h.prioridad)}.</div></td>
          <td>${esc(h.medida).replace(/\n/g, '<br>')}</td>
          <td style="width:28mm;">${esc(h.responsable)}</td>
          <td style="width:22mm;text-align:center;">${esc(h.plazo)}${h.fechaVencimiento ? `<div style="font-size:7.5pt;color:#4b5563;">(${fmtFechaAR(h.fechaVencimiento)})</div>` : ''}</td>
          <td style="width:54mm;text-align:center;">
            ${!(h.photos || []).length
              ? '<span style="color:#4b5563;">Sin foto vinculante</span>'
              : `<div class="pdf-finding-photos">${h.photos.map(p => `<img src="${p.dataUrl || ''}" alt="Hallazgo">`).join('')}<div class="pdf-photo-caption">${esc(h.ubicacion)}</div></div>`}
          </td>
        </tr>
      `).join('');

    pages.push(`
      <article class="pdf-page landscape">
        <div class="pdf-body">
          ${gIdx === 0 ? `<div class="pdf-h1" style="margin-top:0;">4. Hallazgos y medidas correctivas</div><p style="font-size:8.6pt;margin-bottom:8px;">Hallazgos vinculados con los estados NC y OBS del punto 3. Los plazos son propuestas de prioridad para confirmar con el responsable del establecimiento; verificar el cierre mediante registros y evidencia de corrección.</p>` : ''}
          <table class="pdf-findings">
            <thead><tr><th>ID</th><th>Incumplimiento y ubicación</th><th>Riesgo y prioridad</th><th>Medida correctiva</th><th>Responsable</th><th>Plazo</th><th>Fotografía del hallazgo</th></tr></thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
        ${footerHtml(pageNum++)}
      </article>
    `);
  });

  // PÁGINA FINAL: 5. SEGUIMIENTO + REGISTROS PLAN HYS 2026 (SI APLICA) + 6. CONCLUSIÓN Y PRIORIDADES
  ensureRegistrosTareas();
  const rt = state.registrosTareas;
  const regRows = [];
  if (accList.includes(ACCION_RGRL)) regRows.push(['RGRL (confección y carga)', rt.rgrl.ofrecimiento || '-', rt.rgrl.obs || '-']);
  if (accList.includes(ACCION_NTEAR)) regRows.push(['NTEAR / RAR (confección y carga)', rt.ntear.ofrecimiento || '-', rt.ntear.obs || '-']);
  if (accList.includes(ACCION_EPP)) regRows.push(['Asesoramiento en EPP', `Puestos: ${rt.epp.puestos || '-'}${rt.epp.constancia ? ' · Constancia: ' + rt.epp.constancia : ''}`, rt.epp.obs || '-']);
  if (accList.includes(ACCION_ERGO)) regRows.push(['Estudios de ergonomía (Planillas 1 y 2)', `Puestos: ${rt.ergonomia.puestos || '-'}${rt.ergonomia.planillas ? ' · ' + rt.ergonomia.planillas : ''}`, rt.ergonomia.obs || '-']);
  if (accList.includes(ACCION_CAP_HYS)) regRows.push(['Capacitación básica en HyS', `Asistentes: ${rt.capHys.asistentes || '-'}${rt.capHys.constancia ? ' · Constancia: ' + rt.capHys.constancia : ''}`, rt.capHys.obs || '-']);
  if (accList.includes(ACCION_CAP_EVAC)) regRows.push(['Capacitación roles de evacuación', `Asistentes: ${rt.capEvac.asistentes || '-'} · Roles previos: ${rt.capEvac.rolesDefinidos || '-'}${rt.capEvac.constancia ? ' · Constancia: ' + rt.capEvac.constancia : ''}`, rt.capEvac.obs || '-']);

  const regTableHtml = regRows.length ? `
        <div class="pdf-subcat" style="margin-top:12px;">Actuaciones y constancias del Plan HyS 2026 realizadas en la visita</div>
        <table class="pdf-table">
          <thead><tr><th style="width:46mm;">Acción realizada</th><th style="width:68mm;">Respaldo / constancia</th><th>Observaciones</th></tr></thead>
          <tbody>${regRows.map(([a, b, obs]) => `<tr><td style="font-weight:700;">${esc(a)}</td><td>${esc(b)}</td><td>${esc(obs)}</td></tr>`).join('')}</tbody>
        </table>` : '';

  pages.push(`
    <article class="pdf-page">
      <div class="pdf-body">
        <div class="pdf-h1" style="margin-top:0;">5. Seguimiento de hallazgos anteriores</div>
        <p style="font-size:8.8pt;margin-bottom:8px;">${esc(state.seguimientoIntro)}</p>
        <table class="pdf-table">
          <thead><tr><th>ID</th><th>Fecha origen</th><th>Hallazgo anterior</th><th>Plazo</th><th>Estado anterior</th><th>Estado actual</th><th>Evidencia y verificación</th></tr></thead>
          <tbody>
            ${state.seguimiento.length
              ? state.seguimiento.map(r => `<tr><td style="text-align:center;">${esc(r.id)}</td><td>${esc(r.fecha)}</td><td>${esc(r.hallazgo)}</td><td>${esc(r.plazo)}</td><td>${esc(r.estAnt)}</td><td>${esc(r.estAct)}</td><td>${esc(r.evidencia)}</td></tr>`).join('')
              : '<tr><td style="text-align:center;">—</td><td>—</td><td>Sin hallazgos anteriores individualizados aportados.</td><td>—</td><td>—</td><td>Pendiente</td><td>Revisar presentación inicial ante ART y antecedentes.</td></tr>'}
          </tbody>
        </table>
        ${regTableHtml}
        <div class="pdf-h1" style="margin-top:14px;">6. Conclusión y prioridades</div>
        <div class="conclusion-box">${esc(state.conclusion || 'Pendiente de redacción.')}</div>
      </div>
      ${footerHtml(pageNum++)}
    </article>
  `);

  // ANEXOS OPCIONALES (SOLO SI COMPLETADOS)
  if (state.anexos.evacEstado === 'Completado') {
    const ev = state.anexos.evac;
    pages.push(`
      <article class="pdf-page">
        <div class="pdf-body">
          <div class="pdf-h1" style="margin-top:0;">ANEXO · Planilla 1 – Relevamiento de datos para el plan de evacuación</div>
          <div class="pdf-subcat">A. Sectores y ocupación</div>
          <table class="pdf-table"><thead><tr><th>Planta / sector</th><th>Sup. m²</th><th>Mañana</th><th>Tarde</th><th>Noche</th><th>Mov. reducida</th><th>Obs.</th></tr></thead>
            <tbody>${ev.sectores.length ? ev.sectores.map(x=>`<tr><td>${esc(x.sector)}</td><td>${esc(x.sup)}</td><td>${esc(x.manana)}</td><td>${esc(x.tarde)}</td><td>${esc(x.noche)}</td><td>${esc(x.movRed)}</td><td>${esc(x.obs)}</td></tr>`).join('') : '<tr><td colspan="7">Sin datos</td></tr>'}</tbody></table>
          <div class="pdf-subcat">B. Medios de salida</div>
          <table class="pdf-table"><thead><tr><th>N°</th><th>Ubicación</th><th>Tipo</th><th>Ancho</th><th>Apertura</th><th>Libre</th><th>Señal.</th><th>Foto</th></tr></thead>
            <tbody>${ev.salidas.length ? ev.salidas.map((x,i)=>`<tr><td>${i+1}</td><td>${esc(x.ubicacion)}</td><td>${esc(x.tipo)}</td><td>${esc(x.ancho)}</td><td>${esc(x.apertura)}</td><td>${esc(x.libre)}</td><td>${esc(x.senalizada)}</td><td>${esc(x.foto)}</td></tr>`).join('') : '<tr><td colspan="8">Sin datos</td></tr>'}</tbody></table>
          <div class="pdf-subcat">C. Elementos de emergencia</div>
          <table class="pdf-table"><thead><tr><th>Elemento</th><th>Existe</th><th>Cant.</th><th>Ubicación</th><th>Estado</th><th>Foto</th></tr></thead>
            <tbody>${ev.elementos.map(el=>`<tr><td>${el.nombre}</td><td>${esc(el.existe||'-')}</td><td>${esc(el.cantidad||'-')}</td><td>${esc(el.ubicacion||'-')}</td><td>${esc(el.estado||'-')}</td><td>${esc(el.foto||'-')}</td></tr>`).join('')}</tbody></table>
          <div class="pdf-subcat">D. Plano existente</div>
          <table class="pdf-table"><thead><tr><th>Existe</th><th>Vigente</th><th>Coincide</th><th>Observaciones</th></tr></thead>
            <tbody><tr><td>${esc(ev.plano.existe||'-')}</td><td>${esc(ev.plano.vigente||'-')}</td><td>${esc(ev.plano.coincide||'-')}</td><td>${esc(ev.plano.obs||'-')}</td></tr></tbody></table>
        </div>
        ${footerHtml(pageNum++)}
      </article>
    `);
  }

  if (state.anexos.extEstado === 'Completado') {
    const fg = state.anexos.fuego;
    pages.push(`
      <article class="pdf-page">
        <div class="pdf-body">
          <div class="pdf-h1" style="margin-top:0;">ANEXO · Planilla 2 – Control de extintores e hidrantes</div>
          <div class="pdf-subcat">A. Extintores</div>
          <table class="pdf-table"><thead><tr><th>N°</th><th>Ubicación de referencia</th><th>Agente/kg</th><th>Venc. carga</th><th>Venc. PH</th><th>Manóm./prec.</th><th>Acceso</th><th>Desvío</th><th>Foto</th></tr></thead>
            <tbody>${fg.extintores.length ? fg.extintores.map((e,i)=>`<tr><td>${i+1}</td><td>${esc(e.ubicacion)}</td><td>${esc(e.agente)}</td><td>${esc(e.vencCarga)}</td><td>${esc(e.vencPH)}</td><td style="text-align:center;">${e.estadoVisual}</td><td style="text-align:center;">${e.acceso}</td><td>${e.desvio}</td><td>${esc(e.foto)}</td></tr>`).join('') : '<tr><td colspan="9">Sin datos</td></tr>'}</tbody></table>
          <div class="pdf-subcat">B. Hidrantes / bocas de incendio</div>
          <table class="pdf-table"><thead><tr><th>N°</th><th>Ubicación de referencia</th><th>Gabinete</th><th>Manguera</th><th>Lanza</th><th>Llave</th><th>Acceso</th><th>Desvío</th><th>Foto</th></tr></thead>
            <tbody>${fg.hidrantes.length ? fg.hidrantes.map((h,i)=>`<tr><td>${i+1}</td><td>${esc(h.ubicacion)}</td><td style="text-align:center;">${h.gabinete}</td><td style="text-align:center;">${h.manguera}</td><td style="text-align:center;">${h.lanza}</td><td style="text-align:center;">${h.llave}</td><td style="text-align:center;">${h.acceso}</td><td>${h.desvio}</td><td>${esc(h.foto)}</td></tr>`).join('') : '<tr><td colspan="9">Sin datos</td></tr>'}</tbody></table>
        </div>
        ${footerHtml(pageNum++)}
      </article>
    `);
  }

  document.getElementById('docPreview').innerHTML = pages.join('');
}

function imprimirPDF() {
  renderPreview();
  verVista('preview');
  setTimeout(() => window.print(), 300);
}

// INIT
hidratarTodo();
cargarPadronIapser(false);
