/* Eager images use the browser scheduler; only video transfers are gated. */
(() => {
 const hero = document.querySelector('#hero-video');
 const story = document.querySelector('#story-video');
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 let request, posterReady = false, nearStory = false, heroReady = false, revision = 0;
 const mark = stage => performance.mark('diname-' + stage);
 function startStory() {
  if (reduced.matches || story.getAttribute('src')) return;
  // Do not speculate on a metered connection; approaching the section still loads it.
  if (!nearStory && (!heroReady || navigator.connection?.saveData)) return;
  story.preload = 'auto';
  story.src = story.dataset.src;
  story.load();
  mark('story-requested');
 }
 function startHero() {
  if (!posterReady || !request || reduced.matches) return;
  if (hero.getAttribute('src') !== request.src) {
   heroReady = false;
   hero.preload = 'auto';
   hero.src = request.src;
   hero.load();
   mark('hero-requested');
  }
 }
 function warmPoster(url, priority = 'low') {
  const image = new Image();
  image.fetchPriority = priority;
  return new Promise(resolve => {
   const timer = setTimeout(resolve, 8000); // A failed poster must not block the film forever.
   image.onload = image.onerror = () => { clearTimeout(timer); resolve(); };
   image.src = url;
  });
 }
 window.dinameMedia = {
  requestHero(src, poster) {
   if (request?.src === src) return;
   request = { src, poster };
   hero.poster = poster;
   posterReady = false;
   const current = ++revision;
   warmPoster(poster, 'high').then(() => {
    if (current !== revision) return;
    posterReady = true;
    mark('hero-poster-ready');
    startHero();
   });
  }
 };
 // canplaythrough is a browser estimate, not a promise of a completed download.
 hero.addEventListener('canplaythrough', () => { heroReady = true; startStory(); });
 hero.addEventListener('progress', () => {
  if (hero.duration && hero.buffered.length && hero.buffered.end(hero.buffered.length - 1) >= hero.duration - .25) {
   heroReady = true; startStory();
  }
 });
 new IntersectionObserver(entries => {
  nearStory = entries[0].isIntersecting;
  startStory();
 }, { rootMargin: `${Math.round(innerHeight * 1.5)}px 0px` }).observe(document.querySelector('#home-story'));
 reduced.addEventListener('change', () => { startHero(); startStory(); });
 // Poster is available before the lower video is requested, including reduced-motion mode.
 warmPoster(story.poster);
})();
