(()=>{
 const root=document.documentElement;
 const words={ru:{title:'Текстиль для вашего бизнеса',description:'Оптовым партнёрам — полотенца, халаты и пледы для магазинов, отелей и интерьерных проектов. Вместе подберём коллекцию для вашего бизнеса.',cta:'Обсудить сотрудничество'},en:{title:'Textiles for your business',description:'For wholesale partners: towels, robes and throws for stores, hotels and interior projects. Let’s put together a collection for your business.',cta:'Discuss a partnership'}};
 const section=document.querySelector('#partners');
 function setPresentation(value){
  value=value==='heading'?'heading':'minimal';section.dataset.presentation=value;
  section.dataset.composition='flatlay';
  document.querySelectorAll('[name="wholesale-presentation"]').forEach(input=>input.checked=input.value===value);
 }
 let saved;try{saved=localStorage.getItem('diname-wholesale-presentation-v2')}catch{}
 document.querySelectorAll('[name="wholesale-presentation"]').forEach(input=>input.addEventListener('change',event=>{event.stopPropagation();setPresentation(input.value);try{localStorage.setItem('diname-wholesale-presentation-v2',input.value)}catch{}}));

 document.querySelector('#reset').addEventListener('click',()=>{setPresentation('minimal');try{localStorage.removeItem('diname-wholesale-presentation-v2')}catch{}});
 function localize(){const copy=words[root.dataset.language==='en'?'en':'ru'];document.querySelectorAll('[data-wholesale]').forEach(el=>el.textContent=copy[el.dataset.wholesale]);}
 new MutationObserver(localize).observe(root,{attributes:true,attributeFilter:['data-language']});setPresentation(saved);localize();
})();
