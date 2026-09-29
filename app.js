(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const CASES = window.CASES;
  const ORDER = window.CASE_ORDER;
  const STORIES = window.ORIGINAL_STORIES;
  const META_KEY = 'crimen-manana-career-v2';

  const S = {
    mode: null, caseId: null, started: false, ended: false,
    time: 19 * 60 + 30, deadline: 23 * 60 + 47,
    evidence: [], facts: {}, visited: new Set(), wrongs: 0,
    informantUsed: false, zoom: 100
  };

  function loadCareer() {
    const fallback = { prestige: 50, budget: 150, salary: 1400, rank: 'Auxiliar', completed: [], vouchers: 0 };
    try {
      const saved = JSON.parse(localStorage.getItem(META_KEY) || 'null');
      return { ...fallback, ...(saved || {}), completed: Array.isArray(saved?.completed) ? saved.completed : [] };
    } catch (_) { return fallback; }
  }

  const M = loadCareer();
  const pad = n => String(n).padStart(2, '0');
  const esc = value => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const currentCase = () => CASES[S.caseId];

  function saveCareer() { localStorage.setItem(META_KEY, JSON.stringify(M)); }

  function promote() {
    const ranks = [[50, 'Auxiliar', 1400], [70, 'Investigador', 1600], [90, 'Investigador principal', 1900], [110, 'Jefe de unidad', 2300]];
    const hit = ranks.filter(([limit]) => M.prestige >= limit).pop() || ranks[0];
    const changed = M.rank !== hit[1];
    M.rank = hit[1];
    M.salary = Math.max(M.salary, hit[2]);
    return changed ? `Ascenso: ${M.rank}.` : '';
  }

  function renderCareer() {
    if (S.mode === 'archive') {
      $('careerMeta').innerHTML = '<div class="career-title">ARCHIVO DE EXPEDIENTES</div><div class="career-row"><b>Partida libre</b><span>Sin consecuencias</span></div>';
      $('askInformant').innerHTML = 'CONSULTAR PISTA DEL ARCHIVO <small>Ayuda opcional · sin costo</small>';
      $('delegateCase').classList.add('hidden');
      return;
    }
    $('careerMeta').innerHTML = `<div class="career-title">CARRERA DE INVESTIGACIÓN</div><div class="career-row"><b>${esc(M.rank)}</b><span>Prestigio ${M.prestige}</span></div><div class="career-row"><span>Sueldo</span><b>$${M.salary}</b></div><div class="career-row"><span>Presupuesto</span><b>$${M.budget}</b></div><div class="career-row"><span>Vales de informante</span><b>${M.vouchers}</b></div>`;
    $('askInformant').innerHTML = M.vouchers > 0 ? 'CONSULTAR INFORMANTE <small>Usar 1 vale · pista no verificada</small>' : 'CONSULTAR INFORMANTE <small>$20 · pista no verificada</small>';
    $('delegateCase').classList.remove('hidden');
  }

  function renderCasePicker() {
    $('casePicker').innerHTML = `<p class="picker-label">EXPEDIENTES DISPONIBLES · ${ORDER.length} HABILITADOS</p>` + ORDER.map(id => {
      const c = CASES[id];
      const completed = M.completed.includes(id) ? '<span class="case-done">RESUELTO</span>' : '';
      return `<button class="case-choice" data-case="${id}"><b>${pad(c.number)} · ${esc(c.title)} ${completed}</b><small>${esc(c.difficulty)} · ${esc(c.duration)} · ${esc(c.kind)}</small></button>`;
    }).join('');
    document.querySelectorAll('[data-case]').forEach(button => { button.onclick = () => selectCase(button.dataset.case); });
  }

  function selectMode(mode) {
    S.mode = mode;
    document.querySelectorAll('[data-mode]').forEach(button => button.classList.toggle('selected', button.dataset.mode === mode));
    $('casePicker').classList.remove('hidden');
    $('introSummary').textContent = mode === 'career' ? 'Cada decisión afecta tu prestigio y presupuesto. Todos los expedientes siguen disponibles.' : 'Elegí cualquier expediente y rejugalo sin modificar tu carrera.';
    $('introFootnote').textContent = mode === 'career' ? 'Los informantes cuestan recursos. Delegar resta prestigio y no entrega premio.' : 'Las pistas opcionales son gratuitas y los errores no afectan tu progreso.';
    renderCasePicker(); renderCareer();
    if (S.caseId) { markSelectedCase(); renderCaseChrome(); }
  }

  function markSelectedCase() { document.querySelectorAll('[data-case]').forEach(button => button.classList.toggle('selected', button.dataset.case === S.caseId)); }
  function selectCase(id) { S.caseId = id; markSelectedCase(); renderCaseChrome(); $('begin').disabled = false; }

  function renderNeutralChrome() {
    $('caseNumber').textContent = 'ARCHIVO CENTRAL'; $('caseTitle').textContent = 'EL CRIMEN DE MAÑANA';
    $('fileLabelOne').textContent = 'COLECCIÓN'; $('fileTitleOne').textContent = `${ORDER.length} expedientes abiertos`;
    $('fileTextOne').textContent = 'Homicidios, desapariciones, enigmas de identidad y casos sin responsable penal.';
    $('fileLabelTwo').textContent = 'PROPÓSITO'; $('fileTitleTwo').textContent = 'Observar, deducir, concluir';
    $('fileTextTwo').textContent = 'La dificultad está en el caso, no en aprender a usar la interfaz.';
    $('introKicker').textContent = 'OFICINA DE INVESTIGACIONES COMPLEJAS'; $('introTitle').innerHTML = 'EL CRIMEN<br>DE MAÑANA';
    $('introPaper').textContent = 'ARCHIVO CENTRAL'; $('introEdition').textContent = 'NUEVO TURNO';
    $('introHeadline').innerHTML = 'CUENTOS PARA LEER.<br>CASOS PARA RESOLVER.'; $('introCaption').textContent = 'No todos los misterios terminan con un culpable.';
    renderEvidence(); renderPeople();
  }

  function renderCaseChrome() {
    const c = currentCase();
    $('caseNumber').textContent = `CASO ${pad(c.number)}`; $('caseTitle').textContent = c.title.toUpperCase();
    $('fileLabelOne').textContent = c.file[0][0]; $('fileTitleOne').textContent = c.file[0][1]; $('fileTextOne').textContent = c.file[0][2];
    $('fileLabelTwo').textContent = c.file[1][0]; $('fileTitleTwo').textContent = c.file[1][1]; $('fileTextTwo').textContent = c.file[1][2];
    $('introKicker').textContent = c.intro.kicker; $('introTitle').textContent = c.title.toUpperCase();
    $('introPaper').textContent = c.intro.paper; $('introEdition').textContent = c.intro.edition;
    $('introHeadline').innerHTML = esc(c.intro.headline).replace(/\n/g, '<br>'); $('introCaption').textContent = c.intro.caption; $('introSummary').textContent = c.intro.summary;
  }

  function resetCaseState() {
    S.started = true; S.ended = false; S.time = 19 * 60 + 30; S.evidence = []; S.facts = {}; S.visited = new Set(); S.wrongs = 0; S.informantUsed = false;
    $('theory').value = ''; $('askInformant').disabled = false; $('resolve').disabled = false;
  }

  function startCase() {
    if (!S.mode || !S.caseId) return;
    resetCaseState(); $('intro').classList.add('hidden'); renderCaseChrome(); renderCareer(); renderPeople(); renderEvidence(); locationButtons(); displayTime(); home();
  }

  function renderPeople() {
    if (!S.caseId) {
      $('suspects').innerHTML = '<li class="empty-suspect">Elegí un expediente para ver sus personajes.</li>';
      $('accused').innerHTML = '<option value="">Elegí una conclusión…</option>'; return;
    }
    const c = currentCase();
    $('suspects').innerHTML = c.people.map(person => `<li><b>${esc(person.name)}</b><span>${esc(person.role)}</span><small>${esc(person.note)}</small></li>`).join('');
    const r = c.resolution;
    $('resolutionPrompt').textContent = r.prompt.toUpperCase(); $('resolve').innerHTML = `${esc(r.button)} <span>→</span>`;
    $('resolutionTip').textContent = r.type === 'person' ? 'Podés acusar en cualquier momento. Una acusación errónea tiene consecuencias en Carrera.' : 'No todos los expedientes exigen señalar a una persona. Elegí la explicación que mejor reúna las pruebas.';
    const options = r.type === 'person' ? c.people.map(person => [person.name, `${person.name} — ${person.role}`]) : r.options;
    $('accused').innerHTML = `<option value="">${esc(r.prompt)}…</option>` + options.map(([value, label]) => `<option value="${esc(value)}">${esc(label)}</option>`).join('');
  }

  function renderEvidence() {
    const total = S.caseId ? currentCase().locations.length : 0;
    $('evidenceCount').textContent = S.caseId ? `${S.evidence.length}/${total}` : '0/—';
    $('evidence').innerHTML = S.evidence.length ? S.evidence.map(id => `<div class="evidence"><b>${esc(S.facts[id].title)}</b>${esc(S.facts[id].text)}</div>`).join('') : '<p>Aún no reuniste pruebas.</p>';
  }

  function locationButtons() {
    if (!S.caseId) { $('locations').innerHTML = ''; return; }
    $('locations').innerHTML = currentCase().locations.map((place, index) => `<button class="location" data-location="${index}"><span>${place.icon}</span>${esc(place.name)}<small>${S.visited.has(index) ? 'Revisitar' : 'Viaje'}: ${place.cost} min</small></button>`).join('');
    document.querySelectorAll('[data-location]').forEach(button => { button.onclick = () => visit(+button.dataset.location); });
  }

  function setScene(label, html, actions = [], status = '') {
    $('sceneTag').textContent = label; $('status').textContent = status; $('story').innerHTML = html;
    $('actions').innerHTML = actions.map((action, index) => `<button class="action" data-action="${index}" ${action.disabled ? 'disabled' : ''}>${esc(action.label)}<small>${action.cost ? `Tiempo: ${action.cost} min` : esc(action.note || 'Sin costo')}</small></button>`).join('');
    document.querySelectorAll('[data-action]').forEach(button => { button.onclick = () => actions[+button.dataset.action].run(); });
  }

  function home() {
    const c = currentCase(); const opening = c.opening.map(text => `<p>${esc(text)}</p>`).join('');
    setScene('EXPEDIENTE', `<p><span class="difficulty-badge">${esc(c.difficulty)}</span><span class="case-meta">${esc(c.duration)} · ${esc(c.kind)}</span></p><h2>${esc(c.title)}</h2>${opening}<div class="objective"><b>OBJETIVO</b>${esc(c.objective)}</div><p class="case-credit">${esc(c.credit)}</p>`, [], 'Elegí un lugar para investigar.');
  }

  function displayTime() {
    const hours = Math.floor(S.time / 60) % 24, minutes = S.time % 60;
    $('time').textContent = `${pad(hours)}:${pad(minutes)}`;
    const remaining = Math.max(0, S.deadline - S.time);
    $('urgency').textContent = remaining > 0 ? `QUEDAN ${Math.floor(remaining / 60)}H ${remaining % 60}M` : 'CIERRA EL TURNO';
  }

  function advance(minutes) {
    S.time += minutes; displayTime();
    if (S.time >= S.deadline && !S.ended) { finish(false, 'El turno terminó antes de que pudieras sostener una conclusión. El expediente vuelve al archivo sin resolver.'); return false; }
    return true;
  }

  function visit(index) {
    if (S.ended) return;
    const place = currentCase().locations[index]; if (!place || !advance(place.cost)) return;
    S.visited.add(index); locationButtons(); const factId = `${S.caseId}-${index}`;
    setScene(place.name.toUpperCase(), `<h2>${esc(place.name)}</h2><p>${esc(place.scene)}</p>`, [{ label: place.action, cost: 8, disabled: S.evidence.includes(factId), run: () => {
      if (!advance(8)) return;
      if (!S.evidence.includes(factId)) { S.evidence.push(factId); S.facts[factId] = { title: place.clueTitle, text: place.clueText }; renderEvidence(); }
      setScene('HALLAZGO', `<h2>${esc(place.clueTitle)}</h2><p>${esc(place.clueText)}</p>`, [], 'Prueba incorporada al expediente.');
    }}], 'Elegí qué verificar.');
  }

  function askInformant() {
    if (S.ended || S.informantUsed) return;
    let costText = 'Consulta libre del archivo.';
    if (S.mode === 'career') {
      if (M.vouchers > 0) { M.vouchers -= 1; costText = 'Se utilizó un vale de informante.'; }
      else { if (M.budget < 20) { $('status').textContent = 'No queda presupuesto para consultar a la fuente.'; return; } M.budget -= 20; costText = 'Presupuesto −$20.'; }
      saveCareer(); renderCareer();
    }
    S.informantUsed = true; $('askInformant').disabled = true;
    setScene('INFORMANTE', `<h2>Una fuente habla bajo reserva</h2><p>${esc(currentCase().informant)}</p>`, [], costText);
  }

  function delegateCase() {
    if (S.mode !== 'career' || S.ended) return;
    finish(false, 'El expediente fue derivado a un compañero de la fuerza. No cobrás recompensa y perdés parte del prestigio de la investigación.', 'delegated');
  }

  function submitResolution() {
    if (S.ended) return;
    const selected = $('accused').value;
    if (!selected) { $('status').textContent = 'Elegí una opción antes de presentar tu conclusión.'; $('accused').focus(); return; }
    const r = currentCase().resolution;
    if (selected === r.correct) { finish(true, r.verdict); return; }
    S.wrongs += 1;
    if (S.mode === 'career') { M.prestige = Math.max(0, M.prestige - 5); M.budget = Math.max(0, M.budget - 10); saveCareer(); renderCareer(); if (!advance(12)) return; }
    if (S.wrongs >= 3) { finish(false, `${r.wrong} Tres conclusiones erróneas obligan a retirar el expediente.`); return; }
    $('accused').value = '';
    setScene('HIPÓTESIS RECHAZADA', `<h2>La conclusión no se sostiene</h2><p>${esc(r.wrong)}</p><p>Podés seguir investigando o intentar otra conclusión.</p>`, [], S.mode === 'career' ? 'Prestigio −5 · presupuesto −$10 · tiempo −12 min.' : 'Sin penalización en Archivo.');
  }

  function randomReward() {
    const rewards = [
      { text: 'Bono operativo +$40.', apply: () => { M.budget += 40; } },
      { text: 'Mención interna +3 prestigio.', apply: () => { M.prestige = Math.min(120, M.prestige + 3); } },
      { text: 'Vale de informante para otro caso.', apply: () => { M.vouchers += 1; } },
      { text: 'Sin premio extraordinario esta vez.', apply: () => {} }
    ];
    const reward = rewards[Math.floor(Math.random() * rewards.length)]; reward.apply(); return reward.text;
  }

  function finish(success, verdict, kind = 'normal') {
    if (S.ended) return;
    S.ended = true; const c = currentCase(); let rewardLine = '', careerLine = '';
    if (S.mode === 'career') {
      if (kind === 'delegated') M.prestige = Math.max(0, M.prestige - 5);
      else if (success) {
        const firstResolution = !M.completed.includes(S.caseId);
        if (firstResolution) { M.completed.push(S.caseId); M.prestige = Math.min(120, M.prestige + 10); const pay = Math.max(80, Math.round(M.salary / 10)); M.budget += pay; rewardLine = `Honorarios +$${pay}. ${randomReward()}`; }
        else { M.budget += 20; M.prestige = Math.min(120, M.prestige + 1); rewardLine = 'Revisión de expediente: +$20 y +1 prestigio.'; }
        const promotion = promote(); if (promotion) rewardLine += ` ${promotion}`;
      } else { M.prestige = Math.max(0, M.prestige - 8); M.budget = Math.max(0, M.budget - 20); }
      saveCareer(); careerLine = `Prestigio ${M.prestige} · Sueldo $${M.salary} · Presupuesto $${M.budget}`;
    } else careerLine = 'Resolución de archivo · sin cambios en Carrera';
    renderCareer();
    const delegated = kind === 'delegated';
    const reflection = success && c.reflection ? `<div class="reflection"><b>REFLEXIÓN DEL AUTOR</b><p>${esc(c.reflection)}</p></div>` : '';
    const originalButton = success && c.original ? '<button id="readOriginal" class="secondary" type="button">LEER CUENTO ORIGINAL</button>' : '';
    const epilogue = success ? `<div class="epilogue"><b>EPÍLOGO</b><p>${esc(c.resolution.epilogue)}</p></div>` : '';
    $('endingCard').innerHTML = `<div id="endingSummary"><p class="kicker">${delegated ? 'EXPEDIENTE DELEGADO' : success ? 'CONCLUSIÓN CORRECTA' : 'EXPEDIENTE INCONCLUSO'}</p><h1>${delegated ? 'OTRO INVESTIGADOR CONTINÚA' : success ? 'CASO RESUELTO' : 'LA HIPÓTESIS FALLÓ'}</h1><p>${esc(verdict)}</p>${epilogue}${reflection}${rewardLine ? `<p class="reward">PREMIO VARIABLE · ${esc(rewardLine)}</p>` : ''}<p class="result">${esc(careerLine)}</p><div class="ending-actions">${originalButton}<button id="replayCase" class="secondary" type="button">REJUGAR CASO</button><button id="returnOffice" class="primary" type="button">VOLVER AL ARCHIVO</button></div></div><article id="originalStory" class="original-story hidden"></article>`;
    $('ending').classList.remove('hidden'); $('returnOffice').onclick = () => location.reload();
    $('replayCase').onclick = () => { $('ending').classList.add('hidden'); startCase(); };
    if ($('readOriginal')) $('readOriginal').onclick = showOriginalStory;
  }

  function showOriginalStory() {
    const story = STORIES[currentCase().original]; if (!story) return;
    $('endingSummary').classList.add('hidden');
    $('originalStory').innerHTML = `<p class="kicker">CUENTO ORIGINAL</p><h1>${esc(story.title)}</h1><p class="story-author">Por ${esc(story.author)}</p>${story.paragraphs.map(paragraph => `<p>${esc(paragraph)}</p>`).join('')}<button id="closeOriginal" class="primary" type="button">VOLVER AL CIERRE DEL CASO</button>`;
    $('originalStory').classList.remove('hidden');
    $('closeOriginal').onclick = () => { $('originalStory').classList.add('hidden'); $('endingSummary').classList.remove('hidden'); };
  }

  function setZoom(next) {
    S.zoom = Math.max(85, Math.min(130, next)); document.documentElement.style.setProperty('--ui-zoom', S.zoom / 100); $('uiZoom').textContent = `${S.zoom}%`; localStorage.setItem('crimen-manana-ui-zoom', S.zoom);
  }

  document.querySelectorAll('[data-mode]').forEach(button => { button.onclick = () => selectMode(button.dataset.mode); });
  $('begin').onclick = startCase; $('resolve').onclick = submitResolution; $('askInformant').onclick = askInformant; $('delegateCase').onclick = delegateCase;
  $('menuButton').onclick = () => location.reload(); $('uiMinus').onclick = () => setZoom(S.zoom - 10); $('uiPlus').onclick = () => setZoom(S.zoom + 10);
  renderNeutralChrome(); renderCasePicker(); renderCareer(); displayTime(); setZoom(+localStorage.getItem('crimen-manana-ui-zoom') || 100);
})();
