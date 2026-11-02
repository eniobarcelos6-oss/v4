/* Lógica do site. Textos, músicas, links e perguntas ficam em conteudo.js. */
const C = window.SITE_CONTENT || {};
const $ = id => document.getElementById(id);
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Fotos: coloque os arquivos na pasta /fotos com estes nomes ---------- */
const PHOTOS = {
  'foto-01.jpg': 'fotos/foto-01.jpg',
  'foto-02.jpg': 'fotos/foto-02.jpg',
  'foto-03.jpg': 'fotos/foto-03.jpg',
  'foto-04.jpg': 'fotos/foto-04.jpg',
  'foto-05.jpg': 'fotos/foto-05.jpg'
};

/* ---------- Capítulos e navegação ---------- */
const chapters = [...document.querySelectorAll('.screen')];
let current = 0;

const dots = $('navDots');
chapters.forEach((_, i) => {
  const b = document.createElement('button');
  b.className = 'nav-dot' + (i === 0 ? ' active' : '');
  b.setAttribute('aria-label', 'Ir para capítulo ' + (i + 1));
  b.onclick = () => show(i);
  dots.append(b);
});

function show(i) {
  i = Math.max(0, Math.min(chapters.length - 1, i));
  chapters[current].classList.remove('active');
  current = i;
  chapters[current].classList.add('active');
  $('chapterLabel').textContent = chapters[current].dataset.title || 'uma história especial';
  [...dots.children].forEach((d, n) => d.classList.toggle('active', n === i));
  $('prevChapter').disabled = i === 0;
  $('nextChapter').disabled = i === chapters.length - 1;
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  setTrack(i);
  if (chapters[i].id === 'final') startLanterns();
}

document.querySelectorAll('[data-go]').forEach(b =>
  b.addEventListener('click', () => show(chapters.findIndex(s => s.id === b.dataset.go)))
);
$('prevChapter').onclick = () => show(current - 1);
$('nextChapter').onclick = () => show(current + 1);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeLightbox(); closeMusicPanel(); return; }
  if ($('lightbox').classList.contains('open')) return;
  if (e.key === 'ArrowRight') show(current + 1);
  if (e.key === 'ArrowLeft') show(current - 1);
});

/* ---------- Música: só toca quando a pessoa aperta "Reproduzir" ---------- */
const audio = $('audioPlayer');
let loadedFile = '';

function setStatus(text) { $('audioStatus').textContent = text; }
function setPlayLabel(playing) { $('playButton').textContent = playing ? 'Ⅱ Pausar' : '▶ Reproduzir'; }

async function tryPlay() {
  try {
    await audio.play();
    setPlayLabel(true);
    setStatus('Reproduzindo');
  } catch (e) {
    setPlayLabel(false);
    setStatus('Falta o arquivo ' + loadedFile + ' (confira o nome na pasta musicas).');
  }
}

function setTrack(i) {
  const t = (C.tracks && C.tracks[i]) || {};
  $('trackTitle').textContent = t.title || 'Trilha do capítulo';
  $('trackArtist').textContent = t.artist || '';
  $('trackNote').textContent = t.reason || '';
  const file = t.file || '';
  if (file === loadedFile) return;
  const wasPlaying = !audio.paused;       // se já estava tocando, a trilha segue para o próximo capítulo
  audio.pause();
  loadedFile = file;
  if (!file) { audio.removeAttribute('src'); setPlayLabel(false); setStatus('Sem música neste capítulo'); return; }
  audio.src = file;
  setPlayLabel(false);
  setStatus('Pronta para tocar');
  if (wasPlaying) tryPlay();
}

function closeMusicPanel() {
  $('musicPanel').classList.remove('open');
  $('musicPanel').setAttribute('aria-hidden', 'true');
}
$('musicToggle').onclick = () => {
  const open = $('musicPanel').classList.toggle('open');
  $('musicPanel').setAttribute('aria-hidden', String(!open));
};
$('musicClose').onclick = closeMusicPanel;   // fechar o painel não para a música

$('playButton').onclick = () => {
  if (!audio.src) return;
  if (audio.paused) tryPlay();
  else { audio.pause(); setPlayLabel(false); setStatus('Pausado'); }
};
audio.onended = () => { setPlayLabel(false); setStatus('Faixa concluída'); };
audio.onerror = () => { setPlayLabel(false); setStatus('Falta o arquivo ' + loadedFile + ' (confira o nome na pasta musicas).'); };

/* ---------- Fotos e lightbox ---------- */
function closeLightbox() { $('lightbox').classList.remove('open'); $('lightbox').setAttribute('aria-hidden', 'true'); }

document.querySelectorAll('[data-photo]').forEach(el => {
  const file = el.dataset.photo;
  const src = PHOTOS[file];
  if (!src) return;
  // na galeria o data-photo está no botão; a imagem entra no quadro interno para não apagar a legenda
  const target = el.querySelector('.photo-placeholder') || el;
  const img = new Image();
  img.onload = () => {
    target.innerHTML = '';
    target.classList.add('has-photo');
    target.style.backgroundImage = `url('${src}')`;
    target.style.backgroundSize = 'cover';
    target.style.backgroundPosition = 'center';
    target.setAttribute('role', 'img');
    target.setAttribute('aria-label', 'Foto: ' + file);
  };
  img.src = src;
  el.addEventListener('click', () => {
    if (img.complete && img.naturalWidth) {
      $('lightboxImage').src = src;
      $('lightbox').classList.add('open');
      $('lightbox').setAttribute('aria-hidden', 'false');
    }
  });
});
$('lightboxClose').onclick = closeLightbox;
$('lightbox').onclick = e => { if (e.target === $('lightbox')) closeLightbox(); };

/* ---------- Pétalas caindo ---------- */
function petal() {
  if (document.hidden || reduceMotion) return;
  const p = document.createElement('span');
  p.className = 'petal';
  p.textContent = Math.random() > .5 ? '✿' : '❀';
  p.style.left = Math.random() * 100 + 'vw';
  p.style.setProperty('--duration', (10 + Math.random() * 9) + 's');
  p.style.setProperty('--drift', (Math.random() * 150 - 75) + 'px');
  p.style.fontSize = (11 + Math.random() * 10) + 'px';
  $('petals').append(p);
  setTimeout(() => p.remove(), 20000);
}
setInterval(() => { if (Math.random() > .35) petal(); }, 2600);

/* ---------- Lanternas do capítulo final ---------- */
let lanternTimer = null;
function makeLantern(field) {
  const l = document.createElement('i');
  l.className = 'lantern';
  l.style.left = (Math.random() * 95) + '%';
  l.style.setProperty('--duration', (13 + Math.random() * 9) + 's');
  l.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
  field.append(l);
  setTimeout(() => l.remove(), 24000);
}
function startLanterns() {
  if (lanternTimer || reduceMotion) return;
  const field = $('lanterns');
  for (let i = 0; i < 18; i++) setTimeout(() => makeLantern(field), i * 550);
  lanternTimer = setInterval(() => {
    if (chapters[current].id === 'final') makeLantern(field);
    else { clearInterval(lanternTimer); lanternTimer = null; }
  }, 1500);
}

/* ---------- Links de contato (vêm do conteudo.js) ---------- */
const igUrl = C.instagramUrl || 'https://www.instagram.com/';
const waUrl = C.whatsappUrl || 'https://wa.me/55';
$('instagramLink').href = igUrl;
$('whatsappLink').href = waUrl;
if (/SEU_USUARIO|SEUNUMERO/.test(igUrl + waUrl)) {
  console.warn('conteudo.js: troque SEU_USUARIO e SEUNUMERO pelos seus dados reais antes de publicar.');
}

/* ---------- Quiz (perguntas vêm do conteudo.js; nada é coletado ou enviado) ---------- */
const questions = Array.isArray(C.quiz) ? C.quiz : [];
const total = questions.length;
const pad = n => String(n).padStart(2, '0');
let qi = 0;

function renderQuestion() {
  const q = questions[qi];
  $('questionText').textContent = q.q;
  $('quizPhase').textContent = q.phase || '';
  $('quizCount').textContent = pad(qi + 1) + ' / ' + pad(total);
  $('quizProgress').style.width = ((qi + 1) / total * 100) + '%';
  $('feedback').textContent = '';
  $('nextQuestion').disabled = true;
  $('nextQuestion').textContent = qi === total - 1 ? 'Ver encerramento →' : 'Próxima lembrança →';
  const box = $('answers');
  box.innerHTML = '';
  q.options.forEach((text, i) => {
    const b = document.createElement('button');
    b.className = 'answer';
    b.textContent = text;
    b.onclick = () => {
      [...box.children].forEach(x => x.disabled = true);
      b.classList.add(i === q.correct ? 'correct' : 'wrong');
      box.children[q.correct].classList.add('correct');
      $('feedback').textContent = q.reveal || '';
      $('nextQuestion').disabled = false;
      $('nextQuestion').focus({ preventScroll: true });
      petal();
    };
    box.append(b);
  });
}

$('nextQuestion').onclick = () => {
  qi++;
  if (qi >= total) {
    $('quizCard').hidden = true;
    $('quizDone').hidden = false;
    $('quizProgress').style.width = '100%';
  } else renderQuestion();
};

if (total) renderQuestion();
else { $('quizCard').hidden = true; $('quizDone').hidden = false; }

show(0);
