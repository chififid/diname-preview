// Embla 8.6.0, optional phone preview. The approved slider is the default; a single-column comparison remains available.
(()=>{
 const root=document.documentElement, phone=matchMedia('(max-width:600px)'), reduced=matchMedia('(prefers-reduced-motion:reduce)');
 let value=new URLSearchParams(location.search).get('products')==='grid'?'grid':'rail';
 const sliders=[...document.querySelectorAll('.collection-products')].map(track=>{
  const wrap=document.createElement('div'), viewport=document.createElement('div'), controls=document.createElement('div');
  wrap.className='product-slider';viewport.className='product-slider-viewport';controls.className='product-slider-controls';
  track.before(wrap);wrap.append(viewport,controls);viewport.append(track);
  controls.innerHTML='<div class="product-slider-dots"></div><div class="product-slider-arrows"><button type="button" aria-label="Предыдущий товар"><svg viewBox="0 0 24 24"><path d="m14 5-7 7 7 7M7 12h14"/></svg></button><button type="button" aria-label="Следующий товар"><svg viewBox="0 0 24 24"><path d="m10 5 7 7-7 7M3 12h14"/></svg></button></div>';
  const [prev,next]=controls.querySelectorAll('.product-slider-arrows button'),dots=controls.firstElementChild;
  let api;
  function update(){
   if(!api)return;
   prev.disabled=!api.canScrollPrev();next.disabled=!api.canScrollNext();
   [...dots.children].forEach((dot,i)=>dot.setAttribute('aria-current',String(i===api.selectedScrollSnap())));
  }
  prev.addEventListener('click',()=>api?.scrollPrev(reduced.matches));next.addEventListener('click',()=>api?.scrollNext(reduced.matches));
  return ()=>{
   api?.destroy();api=null;
   if(value!=='rail'||!phone.matches||!window.EmblaCarousel)return;
   api=EmblaCarousel(viewport,{align:'start',containScroll:'trimSnaps',loop:false,slides:[...track.children].filter(el=>!el.hidden)});
   function buildDots(){
    dots.replaceChildren();api.scrollSnapList().forEach((_,i)=>{
     const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`Показать товар ${i+1}`);dot.addEventListener('click',()=>api.scrollTo(i,reduced.matches));dots.append(dot);
    });update();
   }
   api.on('select',update).on('reInit',buildDots);buildDots();
  };
 });
 function render(){root.dataset.mobileProducts=value;document.querySelectorAll('[name="mobile-products"]').forEach(input=>input.checked=input.value===value);sliders.forEach(sync=>sync());}
 document.querySelectorAll('[name="mobile-products"]').forEach(input=>input.addEventListener('change',()=>{value=input.value;render();}));
 document.querySelector('#reset').addEventListener('click',()=>{value='rail';render();});
 document.addEventListener('keydown',event=>{
  if(event.shiftKey&&event.code==='KeyS'&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&!event.target.closest('input,textarea,[contenteditable]')){event.preventDefault();value=value==='grid'?'rail':'grid';render();}
 });
 phone.addEventListener('change',render);
 new MutationObserver(()=>sliders.forEach(sync=>sync())).observe(root,{attributes:true,attributeFilter:['data-density']});
 render();
})();
