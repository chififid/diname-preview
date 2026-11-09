(()=>{ const root=document.documentElement;
 const photos=[...document.querySelectorAll('[data-parallax]')],reduce=matchMedia('(prefers-reduced-motion: reduce)');let scheduled=false,keyboard=false;
 // Read all rectangles before writing transforms; masks and text never move.
 function paint(){scheduled=false;const positions=photos.map(el=>({el,r:el.parentElement.getBoundingClientRect()}));positions.forEach(({el,r})=>{if(reduce.matches||keyboard){el.style.transform='none';return}if(r.bottom<0||r.top>innerHeight)return;const progress=Math.max(-1,Math.min(1,(innerHeight/2-r.top-r.height/2)/(innerHeight/2+r.height/2)));el.style.transform=`translate3d(0,${(progress*r.height*.085).toFixed(2)}px,0)`})}
 function requestTick(){if(!scheduled){scheduled=true;requestAnimationFrame(paint)}}
 addEventListener('scroll',requestTick,{passive:true});addEventListener('resize',requestTick);reduce.addEventListener('change',requestTick);
 addEventListener('keydown',()=>{keyboard=true;root.classList.add('keyboard-nav');requestTick()});addEventListener('pointerdown',()=>{keyboard=false;root.classList.remove('keyboard-nav');requestTick()});addEventListener('wheel',()=>{keyboard=false;root.classList.remove('keyboard-nav');requestTick()},{passive:true});
 document.fonts.ready.then(requestTick);requestTick();
})();
