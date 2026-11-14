(()=>{
 const root=document.documentElement,section=document.querySelector('#events'),content=document.querySelector('#events-content');
 const storageKey='diname-events-study-v3';let layout='alternating',active=0;
 try{const saved=localStorage.getItem(storageKey);if(['pair','slider','alternating','hidden'].includes(saved))layout=saved}catch{}
 // Fictional event data, explicitly requested for composition studies. Newest first.
 const events=[
 {city:['Алматы','Almaty'],name:['Дни домашнего текстиля','Home Textile Days'],date:['18–20 марта 2027','18–20 March 2027'],venue:['Atelier Hall','Atelier Hall'],address:['ул. Садовая, 24','24 Sadovaya Street'],stand:'A12',photo:1},
 {city:['Ташкент','Tashkent'],name:['Новая коллекция. Открытый показ','New collection. Open studio'],date:['12–14 ноября 2026','12–14 November 2026'],venue:['Forma Space','Forma Space'],address:['ул. Навруз, 18','18 Navruz Street'],stand:'B04',photo:2},
 {city:['Москва','Moscow'],name:['Текстиль в пространстве дома','Textiles in living spaces'],date:['22–24 сентября 2026','22–24 September 2026'],venue:['Галерея «Среда»','Sreda Gallery'],address:['ул. Ткацкая, 7','7 Tkatskaya Street'],stand:'C08',photo:4},
 {city:['Самарканд','Samarkand'],name:['Встречи о ткани и цвете','Conversations on fabric & colour'],date:['15–16 мая 2026','15–16 May 2026'],venue:['Studio 21','Studio 21'],address:['ул. Багишамаль, 21','21 Bagishamal Street'],stand:'A03',photo:5},
 {city:['Баку','Baku'],name:['Коллекции для новых пространств','Collections for new spaces'],date:['6–8 февраля 2026','6–8 February 2026'],venue:['Дом интерьера','Interior House'],address:['ул. Садовая, 12','12 Sadovaya Street'],stand:'D06',photo:3}
 ];
 const copy={ru:{heading:'<span>Место для</span> <span>новых встреч</span>',intro:'Коллекции, которые можно увидеть вблизи. Встречаемся на выставках и в открытых пространствах — знакомиться, рассматривать ткани и обсуждать новые проекты.',date:'Дата',venue:'Площадка',stand:'Стенд',more:'Подробнее о встрече',prev:'Предыдущее событие',next:'Следующее событие',rail:'Места встреч',demo:'Демонстрационный пример',note:'Название события, дата, площадка, адрес и стенд вымышлены для сравнения дизайна. Фотография служит визуальным ориентиром и не изображает это событие.'},en:{heading:'<span>A place to</span> <span>come together</span>',intro:'Collections to discover up close. Meet us at exhibitions and open studios — to explore fabrics, exchange ideas and discuss new projects.',date:'Date',venue:'Venue',stand:'Stand',more:'Explore the event',prev:'Previous event',next:'Next event',rail:'Meeting places',demo:'Sample event',note:'The event, date, venue, address and stand are fictional design examples. The photograph is a visual reference and does not depict this event.'}};
 const locale=()=>root.dataset.language==='en'?1:0,c=()=>copy[locale()?'en':'ru'];
 const text=(event,key)=>event[key][locale()];
 const eventImages={1:"events-exhibition.webp",2:"beni-event-2.webp",3:"third-bedroom.webp",4:"events-meeting.webp",5:"kitchen-editorial.webp"};
 const photo=(event)=>`<img src="media/${eventImages[event.photo]}" alt="${locale()?'Textile and interior study':'Текстиль и интерьер — визуальный ориентир'}" loading="eager" decoding="async" draggable="false">`;
 const facts=(e)=>`<dl class="event-facts"><dt>${c().date}</dt><dd>${text(e,'date')}</dd><dt>${c().venue}</dt><dd>${text(e,'venue')}<small>${text(e,'address')}</small></dd><dt>${c().stand}</dt><dd>${e.stand}</dd></dl>`;
 const link=(i)=>`<button type="button" class="closing-link" data-event-detail="${i}"><span>${c().more}</span><svg class="event-link-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg></button>`;
 const arrows=()=>`<div class="event-arrows"><button type="button" data-event-prev aria-label="${c().prev}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H4m6-6-6 6 6 6"/></svg></button><button type="button" data-event-next aria-label="${c().next}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg></button></div>`;
 function go(index,instant=false){const track=content.querySelector('.event-track');if(!track)return;active=Math.max(0,Math.min(index,events.length-1));const slides=[...track.children];track.classList.toggle('instant',instant);track.style.transform=`translateX(-${slides[active].offsetLeft-slides[0].offsetLeft}px)`;content.querySelectorAll('[data-event-go]').forEach((b,i)=>b.setAttribute('aria-current',String(i===active)));content.querySelector('[data-event-prev]').disabled=active===0;content.querySelector('[data-event-next]').disabled=active===events.length-1;slides.forEach((slide,i)=>{slide.querySelector('button').tabIndex=i===active?0:-1});}
 function render(){active=0;section.hidden=layout==='hidden';section.dataset.layout=layout;section.querySelector('h2').innerHTML=c().heading;section.querySelector('.closing-heading>p').textContent=c().intro;document.querySelector(`input[name="event-layout"][value="${layout}"]`).checked=true;
 if(layout==='slider'){
 content.innerHTML=`<nav class="event-nav" aria-label="${c().rail}">${events.map((e,i)=>`<button type="button" data-event-go="${i}" aria-current="${i===0}"><small>${text(e,'date')}</small><span>${text(e,'city')}</span></button>`).join('')}</nav><div class="event-window" role="region" aria-label="${c().rail}"><div class="event-track">${events.map((e,i)=>`<article class="event-slide">${photo(e)}<div class="event-copy"><h3>${text(e,'city')}</h3>${facts(e)}${link(i)}</div></article>`).join('')}</div></div>${arrows()}`;go(0,true);
 }else if(layout==='pair'){
 content.innerHTML=`<div class="events-pair">${events.slice(0,2).map((e,i)=>`<article class="event-pair">${photo(e)}<div class="event-copy"><div><h3>${text(e,'city')}</h3><p class="event-name">${text(e,'name')}</p></div>${facts(e)}${link(i)}</div></article>`).join('')}</div>`;
 }else if(layout==='alternating'){
 content.innerHTML=`<div class="events-alternating">${events.slice(0,2).map((e,i)=>`${photo(e)}<article class="event-panel"><h3>${text(e,'city')}</h3><p class="event-name">${text(e,'name')}</p>${facts(e)}${link(i)}</article>`).join('')}</div>`;
 }else content.replaceChildren();
 }
 content.addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;if(button.hasAttribute('data-event-go'))go(Number(button.dataset.eventGo));if(button.hasAttribute('data-event-prev'))go(active-1);if(button.hasAttribute('data-event-next'))go(active+1);});
 content.addEventListener('keydown',e=>{if(!e.target.closest('.event-nav,.event-arrows')||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();go(e.key==='Home'?0:e.key==='End'?events.length-1:active+(e.key==='ArrowRight'?1:-1),true);content.querySelector(`[data-event-go="${active}"]`).focus()});
 document.querySelectorAll('[name="event-layout"]').forEach(input=>input.addEventListener('change',()=>{layout=input.value;try{localStorage.setItem(storageKey,layout)}catch{}render()}));
 document.querySelector('#reset').addEventListener('click',()=>{layout='alternating';try{localStorage.removeItem(storageKey)}catch{}render()});
 new MutationObserver(render).observe(root,{attributes:true,attributeFilter:['data-language']});
 new ResizeObserver(()=>{if(layout==='slider')go(active,true)}).observe(section);render();
})();
