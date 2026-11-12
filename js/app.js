(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var QUESTIONS = window.QUESTIONS || [];

  // ---------- Storage (try/catch, falls localStorage gesperrt ist) ----------
  function load(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  // ---------- DOM-Helper ----------
  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'text') n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    return a.slice().sort().join(',') === b.slice().sort().join(',');
  }

  // ---------- Theme ----------
  $('themeToggle').addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme');
    var next = cur === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'light' ? '#f0f1f3' : '#0d1a2d');
  });

  // ---------- Online-Status ----------
  function updateNet() {
    var s = $('netStatus');
    var on = navigator.onLine;
    s.textContent = on ? 'Online' : 'Offline (App laeuft aus dem Cache)';
    s.classList.toggle('offline', !on);
  }
  window.addEventListener('online', updateNet);
  window.addEventListener('offline', updateNet);
  updateNet();

  // ---------- Routing ----------
  var views = ['quiz', 'journal', 'stats'];
  function route() {
    var v = (location.hash || '#quiz').slice(1);
    if (views.indexOf(v) < 0) v = 'quiz';
    views.forEach(function (name) {
      $('view-' + name).hidden = name !== v;
    });
    Array.prototype.forEach.call(document.querySelectorAll('.nav-link'), function (a) {
      var active = a.getAttribute('data-view') === v;
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (v === 'stats') renderStats();
    if (v === 'journal') renderJournal();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);

  // ---------- Quiz ----------
  // results: { [id]: { right: n, wrong: n, last: true|false } }
  var results = load('m346.results', {});
  var cfg = { topic: 'Alle', count: 10 };
  var run = null; // { list, i, selected[], checked, score, answers[] }

  var COUNTS = [5, 10, 20, 0]; // 0 = alle

  function topics() {
    var t = [];
    QUESTIONS.forEach(function (q) { if (t.indexOf(q.topic) < 0) t.push(q.topic); });
    return ['Alle'].concat(t.sort());
  }

  function pool() {
    var list = QUESTIONS.filter(function (q) { return cfg.topic === 'Alle' || q.topic === cfg.topic; });
    if ($('optWrongOnly').checked) {
      list = list.filter(function (q) { return results[q.id] && results[q.id].last === false; });
    }
    return list;
  }

  function renderSetup() {
    var tp = $('topicPills');
    tp.textContent = '';
    topics().forEach(function (t) {
      var b = el('button', { type: 'button', class: 'pill' + (cfg.topic === t ? ' active' : ''), text: t });
      b.addEventListener('click', function () { cfg.topic = t; renderSetup(); });
      tp.appendChild(b);
    });
    var cp = $('countPills');
    cp.textContent = '';
    COUNTS.forEach(function (c) {
      var b = el('button', { type: 'button', class: 'pill' + (cfg.count === c ? ' active' : ''), text: c === 0 ? 'Alle' : String(c) });
      b.addEventListener('click', function () { cfg.count = c; renderSetup(); });
      cp.appendChild(b);
    });
    var n = pool().length;
    $('poolInfo').textContent = n + (n === 1 ? ' Frage verfuegbar' : ' Fragen verfuegbar');
    $('startQuiz').disabled = n === 0;
  }
  $('optWrongOnly').addEventListener('change', renderSetup);

  $('startQuiz').addEventListener('click', function () {
    var list = pool();
    if ($('optShuffle').checked) list = shuffle(list);
    if (cfg.count > 0) list = list.slice(0, cfg.count);
    if (!list.length) return;
    run = { list: list, i: 0, selected: [], checked: false, score: 0, answers: [] };
    $('quizSetup').hidden = true;
    $('quizResult').hidden = true;
    $('quizRun').hidden = false;
    renderQuestion();
  });

  function renderQuestion() {
    var q = run.list[run.i];
    var multi = q.correct.length > 1;
    run.selected = [];
    run.checked = false;

    $('progressBar').style.width = (run.i / run.list.length * 100) + '%';
    $('progressText').textContent = 'Frage ' + (run.i + 1) + ' von ' + run.list.length;

    var card = $('questionCard');
    card.textContent = '';
    card.appendChild(el('span', { class: 'badge', text: q.topic }));
    card.appendChild(el('p', { class: 'q-text', text: q.text }));
    if (multi) card.appendChild(el('p', { class: 'q-hint', text: 'Mehrere Antworten sind richtig.' }));

    if (q.image) {
      var img = el('img', { class: 'q-image', src: q.image, alt: q.imageAlt || 'Screenshot zur Frage', tabindex: '0', title: 'Zum Vergroessern klicken' });
      img.addEventListener('click', function () { openLightbox(img); });
      img.addEventListener('keydown', function (e) { if (e.key === 'Enter') openLightbox(img); });
      card.appendChild(img);
    }

    var box = el('div', { class: 'options', role: multi ? 'group' : 'radiogroup' });
    q.options.forEach(function (text, idx) {
      var input = el('input', { type: multi ? 'checkbox' : 'radio', name: 'opt' });
      var label = el('label', { class: 'option' }, [input, el('span', { text: text })]);
      input.addEventListener('change', function () {
        if (run.checked) return;
        if (multi) {
          var p = run.selected.indexOf(idx);
          if (input.checked && p < 0) run.selected.push(idx);
          if (!input.checked && p >= 0) run.selected.splice(p, 1);
        } else {
          run.selected = [idx];
        }
        Array.prototype.forEach.call(box.children, function (c, ci) {
          c.classList.toggle('selected', run.selected.indexOf(ci) >= 0);
        });
        $('checkBtn').disabled = run.selected.length === 0;
      });
      box.appendChild(label);
    });
    card.appendChild(box);

    $('checkBtn').hidden = false;
    $('checkBtn').disabled = true;
    $('nextBtn').hidden = true;
  }

  $('checkBtn').addEventListener('click', function () {
    if (!run || run.checked || !run.selected.length) return;
    var q = run.list[run.i];
    run.checked = true;
    var ok = sameSet(run.selected, q.correct);
    if (ok) run.score++;
    run.answers.push({ q: q, ok: ok });

    var r = results[q.id] || { right: 0, wrong: 0, last: null };
    if (ok) r.right++; else r.wrong++;
    r.last = ok;
    results[q.id] = r;
    save('m346.results', results);

    var box = $('questionCard').querySelector('.options');
    Array.prototype.forEach.call(box.children, function (c, idx) {
      c.classList.add('locked');
      c.querySelector('input').disabled = true;
      var isCorrect = q.correct.indexOf(idx) >= 0;
      var isSel = run.selected.indexOf(idx) >= 0;
      c.classList.remove('selected');
      if (isCorrect) c.classList.add('correct');
      else if (isSel) c.classList.add('wrong');
    });

    var fb = el('div', { class: 'feedback ' + (ok ? 'ok' : 'bad'), role: 'status' }, [
      el('strong', { text: ok ? 'Richtig!' : 'Leider falsch.' }),
      q.explanation ? el('div', { text: ' ' + q.explanation }) : null
    ]);
    $('questionCard').appendChild(fb);

    $('checkBtn').hidden = true;
    var last = run.i === run.list.length - 1;
    $('nextBtn').textContent = last ? 'Ergebnis anzeigen' : 'Weiter →';
    $('nextBtn').hidden = false;
    $('nextBtn').focus();
  });

  $('nextBtn').addEventListener('click', function () {
    if (run.i < run.list.length - 1) {
      run.i++;
      renderQuestion();
    } else {
      showResult();
    }
  });

  $('abortBtn').addEventListener('click', function () {
    run = null;
    $('quizRun').hidden = true;
    $('quizSetup').hidden = false;
    renderSetup();
  });

  function showResult() {
    $('quizRun').hidden = true;
    var res = $('quizResult');
    res.hidden = false;
    res.textContent = '';
    var total = run.list.length;
    var pct = Math.round(run.score / total * 100);

    var hist = load('m346.history', []);
    hist.push({ date: new Date().toISOString(), score: run.score, total: total, topic: cfg.topic });
    save('m346.history', hist.slice(-100));

    res.appendChild(el('h2', { text: 'Ergebnis' }));
    res.appendChild(el('p', { class: 'score', text: run.score + ' / ' + total + ' (' + pct + '%)' }));
    var ul = el('ul', { class: 'review' });
    run.answers.forEach(function (a) {
      ul.appendChild(el('li', {}, [
        el('span', { class: a.ok ? 'ok' : 'bad', text: a.ok ? '✓' : '✗' }),
        el('span', { text: a.q.text })
      ]));
    });
    res.appendChild(ul);
    var again = el('button', { type: 'button', class: 'btn', text: 'Neues Quiz' });
    again.addEventListener('click', function () {
      run = null;
      res.hidden = true;
      $('quizSetup').hidden = false;
      renderSetup();
    });
    res.appendChild(again);
  }

  // ---------- Lightbox ----------
  function openLightbox(img) {
    $('lightboxImg').src = img.src;
    $('lightboxImg').alt = img.alt;
    $('lightbox').hidden = false;
  }
  $('lightbox').addEventListener('click', function () { $('lightbox').hidden = true; });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') $('lightbox').hidden = true;
  });

  // ---------- Journal ----------
  var entries = load('m346.journal', []);
  var editId = null;
  var pendingDelete = null;

  function today() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  }
  function fmtDate(iso) {
    var p = iso.split('-');
    return p.length === 3 ? p[2] + '.' + p[1] + '.' + p[0] : iso;
  }
  function resetForm() {
    editId = null;
    $('journalForm').reset();
    $('jDate').value = today();
    $('journalFormTitle').textContent = 'Neuer Eintrag';
    $('jSave').textContent = 'Speichern';
    $('jCancel').hidden = true;
  }

  $('journalForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var data = {
      date: $('jDate').value,
      title: $('jTitle').value.trim(),
      learned: $('jLearned').value.trim(),
      problems: $('jProblems').value.trim(),
      next: $('jNext').value.trim()
    };
    if (!data.date || !data.title || !data.learned) return;
    if (editId) {
      entries = entries.map(function (x) { return x.id === editId ? Object.assign({ id: editId }, data) : x; });
    } else {
      data.id = String(Date.now());
      entries.push(data);
    }
    save('m346.journal', entries);
    resetForm();
    renderJournal();
    setMsg('Gespeichert.');
  });
  $('jCancel').addEventListener('click', resetForm);

  function setMsg(t) {
    $('journalMsg').textContent = t;
    if (t) setTimeout(function () { if ($('journalMsg').textContent === t) $('journalMsg').textContent = ''; }, 3000);
  }

  function section(title, text) {
    if (!text) return null;
    var d = el('div');
    d.appendChild(el('h4', { text: title }));
    d.appendChild(el('p', { text: text }));
    return d;
  }

  function renderJournal() {
    var list = $('journalList');
    list.textContent = '';
    if (!entries.length) {
      list.appendChild(el('p', { class: 'muted', text: 'Noch keine Eintraege.' }));
      return;
    }
    entries.slice().sort(function (a, b) {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : (a.id < b.id ? 1 : -1);
    }).forEach(function (en) {
      var card = el('article', { class: 'card entry' });
      card.appendChild(el('div', { class: 'entry-date', text: fmtDate(en.date) }));
      card.appendChild(el('h3', { text: en.title }));
      [section('Gelernt / gemacht', en.learned), section('Probleme / offene Fragen', en.problems), section('Naechste Schritte', en.next)]
        .forEach(function (s) { if (s) card.appendChild(s); });

      var actions = el('div', { class: 'actions' });
      var edit = el('button', { type: 'button', class: 'btn btn-small btn-ghost', text: 'Bearbeiten' });
      edit.addEventListener('click', function () {
        editId = en.id;
        $('jDate').value = en.date;
        $('jTitle').value = en.title;
        $('jLearned').value = en.learned;
        $('jProblems').value = en.problems || '';
        $('jNext').value = en.next || '';
        $('journalFormTitle').textContent = 'Eintrag bearbeiten';
        $('jSave').textContent = 'Aenderung speichern';
        $('jCancel').hidden = false;
        $('journalForm').scrollIntoView({ behavior: 'smooth' });
        $('jTitle').focus();
      });
      var del = el('button', { type: 'button', class: 'btn btn-small btn-ghost btn-danger', text: pendingDelete === en.id ? 'Wirklich loeschen?' : 'Loeschen' });
      del.addEventListener('click', function () {
        if (pendingDelete === en.id) {
          entries = entries.filter(function (x) { return x.id !== en.id; });
          save('m346.journal', entries);
          pendingDelete = null;
          if (editId === en.id) resetForm();
        } else {
          pendingDelete = en.id;
        }
        renderJournal();
      });
      actions.appendChild(edit);
      actions.appendChild(del);
      card.appendChild(actions);
      list.appendChild(card);
    });
  }

  function journalMarkdown() {
    var sorted = entries.slice().sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    var out = '# Lernjournal M346\n\n';
    sorted.forEach(function (en) {
      out += '## ' + fmtDate(en.date) + ' - ' + en.title + '\n\n';
      out += '**Gelernt / gemacht**\n\n' + en.learned + '\n\n';
      if (en.problems) out += '**Probleme / offene Fragen**\n\n' + en.problems + '\n\n';
      if (en.next) out += '**Naechste Schritte**\n\n' + en.next + '\n\n';
    });
    return out;
  }

  $('jCopy').addEventListener('click', function () {
    if (!entries.length) return setMsg('Keine Eintraege vorhanden.');
    var md = journalMarkdown();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(md).then(
        function () { setMsg('Markdown in die Zwischenablage kopiert.'); },
        function () { setMsg('Kopieren nicht moeglich, bitte die Download-Funktion nutzen.'); }
      );
    } else {
      setMsg('Kopieren nicht moeglich, bitte die Download-Funktion nutzen.');
    }
  });
  $('jDownload').addEventListener('click', function () {
    if (!entries.length) return setMsg('Keine Eintraege vorhanden.');
    var blob = new Blob([journalMarkdown()], { type: 'text/markdown;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'lernjournal-m346.md';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });

  // ---------- Statistik ----------
  function renderStats() {
    var body = $('statsBody');
    body.textContent = '';
    var hist = load('m346.history', []);
    var answered = 0, right = 0;
    Object.keys(results).forEach(function (id) {
      answered += results[id].right + results[id].wrong;
      right += results[id].right;
    });
    var grid = el('div', { class: 'stats-grid' });
    function tile(num, label) {
      grid.appendChild(el('div', { class: 'card' }, [el('div', { class: 'stat-num', text: String(num) }), el('div', { class: 'muted', text: label })]));
    }
    tile(hist.length, 'Quiz-Durchgaenge');
    tile(answered, 'Beantwortete Fragen');
    tile(answered ? Math.round(right / answered * 100) + '%' : '-', 'Trefferquote');
    tile(entries.length, 'Journal-Eintraege');
    body.appendChild(grid);

    var card = el('div', { class: 'card' });
    card.appendChild(el('h2', { text: 'Nach Thema' }));
    topics().slice(1).forEach(function (t) {
      var r = 0, w = 0;
      QUESTIONS.forEach(function (q) {
        if (q.topic === t && results[q.id]) { r += results[q.id].right; w += results[q.id].wrong; }
      });
      var pct = r + w ? Math.round(r / (r + w) * 100) : 0;
      card.appendChild(el('div', { text: t + ' - ' + (r + w ? pct + '% (' + r + ' von ' + (r + w) + ')' : 'noch nicht geuebt') }));
      var bar = el('div', { class: 'bar' }, [el('div', { style: 'width:' + pct + '%' })]);
      card.appendChild(bar);
    });
    body.appendChild(card);

    var reset = el('button', { type: 'button', class: 'btn btn-ghost btn-danger', text: 'Quiz-Statistik zuruecksetzen' });
    var armed = false;
    reset.addEventListener('click', function () {
      if (!armed) { armed = true; reset.textContent = 'Wirklich zuruecksetzen? Nochmal klicken'; return; }
      results = {};
      save('m346.results', results);
      save('m346.history', []);
      renderStats();
    });
    body.appendChild(reset);
  }

  // ---------- Service Worker ----------
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }

  // ---------- Start ----------
  $('jDate').value = today();
  renderSetup();
  route();
})();
