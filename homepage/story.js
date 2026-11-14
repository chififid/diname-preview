(() => {
 const root=document.documentElement,section=document.querySelector('#home-story'),video=section.querySelector('video'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let visible=false;
 const copy={ru:{title:'Как создаётся DINAME',body:'За каждой вещью — работа с тканью, цветом и формой. От выбора фактуры до аккуратной отделки складывается характер текстиля DINAME. Приглашаем заглянуть в производство: увидеть людей за работой, рассмотреть процесс вблизи и узнать, как материал становится частью вашего дома.',link:'Выбрать текстиль'},en:{title:'The making of DINAME',body:'Behind each piece is a process of working with fabric, colour and form. From the choice of texture to the finishing details, the character of DINAME textiles takes shape. Step inside the production process: meet the people at work, look closely at each stage and see how a fabric becomes part of your home.',link:'Discover the textiles'}};
 function localize(){const c=copy[root.dataset.language==='en'?'en':'ru'];section.querySelector('h2').textContent=c.title;section.querySelector('.story-description').textContent=c.body;section.querySelector('.story-link').textContent=c.link}
 function playback(){if(visible&&!document.hidden&&!reduced.matches)video.play().catch(()=>{});else video.pause()}
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;playback()},{rootMargin:'100px'}).observe(section);
 document.addEventListener('visibilitychange',playback);reduced.addEventListener('change',playback);
 new MutationObserver(localize).observe(root,{attributes:true,attributeFilter:['data-language']});localize();
})();
