// The composition stays still; only the photograph moves within its rectangular mask.
(()=>{
 const photos=[...document.querySelectorAll('[data-parallax]')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let frame=0;
 function paint(){frame=0;for(const img of photos){const r=img.parentElement.getBoundingClientRect();if(reduced.matches){img.style.transform='none';continue}const progress=Math.max(-1,Math.min(1,((innerHeight-r.top)/(innerHeight+r.height)) * 2-1));img.style.transform=`translate3d(0,${(progress*r.height*.145).toFixed(2)}px,0)`}}
 function request(){if(!frame)frame=requestAnimationFrame(paint)}
 addEventListener('scroll',request,{passive:true});addEventListener('resize',request);reduced.addEventListener('change',request);paint();
})();
