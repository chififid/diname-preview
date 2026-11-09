(() => {
 const root=document.documentElement,short=location.pathname.includes('homepage-v2'),lang=root.lang,config=window.DINAME_CONFIG,$=s=>document.querySelector(s),params=new URLSearchParams(location.search),key=short?'short':'long',storageKey='diname-studio-v2';
 const defaults={short:{photos:'warm'},long:{palette:'linen',type:'prata',intensity:50}};
 function read(){try{return JSON.parse(localStorage.getItem(storageKey)||'{}')}catch{return {}}}
 const stored=read(),state={...defaults[key],...stored[key]};
 Object.keys(defaults[key]).forEach(k=>{if(params.has(k))state[k]=params.get(k)});
 function validate(){
  if(short){state.photos=({original:'warm',linen:'interior',terry:'studio'})[state.photos]||state.photos;if(!config.presets[state.photos])state.photos='warm'}
  else{if(state.palette==='ivory')state.palette='walnut';if(!config.palettes.some(p=>p.id===state.palette))state.palette='linen';if(!config.fonts.some(f=>f.id===state.type))state.type='prata';const v=Number(state.intensity);state.intensity=Number.isFinite(v)?Math.max(0,Math.min(100,v)):50}
 }
 validate();root.dataset.sketch=short?'short':'long';
 const paletteUI=`<div class="palette-field"><span class="field-title">Палитра</span><button class="palette-trigger" id="palette-open" aria-expanded="false" aria-controls="palette-menu"><i></i><span></span><b>⌄</b></button></div><label class="depth-control"><span class="field-title">Глубина цвета</span><span><input id="colour-depth" aria-label="Глубина цвета" type="range" min="0" max="100" step="1"><button id="depth-reset" type="button" aria-label="Вернуть исходный оттенок" title="Исходный оттенок">↺</button></span></label><label><span class="field-title">Шрифт</span><select id="shared-type">${config.fonts.map(f=>`<option value="${f.id}">${f.name}</option>`).join('')}</select></label>`;
 const photosUI=`<label><span class="field-title">Фотосъёмка</span><select id="shared-photos">${Object.entries(window.DINAME_PHOTOS).map(([id,p])=>`<option value="${id}">${p.title}</option>`).join('')}</select></label>`;
 const menu=`<div id="palette-menu" class="palette-menu" hidden><div class="palette-heading"><span>Палитры</span><button id="palette-close" aria-label="Закрыть палитры">×</button></div>${['Основные','Дополнительные'].map(g=>`<section class="palette-group"><h3>${g}</h3><div>${config.palettes.filter(p=>p.group===g).map(p=>`<button data-palette="${p.id}" aria-label="${p.name}"><span class="palette-swatches">${['paper','panel','ink','muted','line'].map(k=>`<i style="background:${p[k]}"></i>`).join('')}</span><span>${p.name}</span></button>`).join('')}</div></section>`).join('')}</div>`;
 const bar=document.createElement('aside');bar.className='design-studio';bar.setAttribute('aria-label',short?'Выбор фотосъёмки':'Оформление главной');
 bar.innerHTML=`<a class="studio-wordmark" href="../homepage-v2/">DINA.ME <span>ЭСКИЗЫ</span></a><nav class="sketch-tabs" aria-label="Эскиз"><a data-sketch="short">3 блока</a><a data-sketch="long">7 блоков</a></nav><div class="studio-controls">${short?photosUI:paletteUI}<a id="shared-language" class="language-button">${lang==='ru'?'EN':'RU'}</a><button id="studio-close" aria-label="Скрыть панель">×</button></div>${short?'':menu}`;
 document.body.prepend(bar);
 const peek=document.createElement('button');peek.className='studio-peek';peek.textContent=short?'Фотосъёмки ↓':'Оформление ↓';document.body.append(peek);
 let lastY=scrollY,manual=false;
 function reveal(){manual=false;bar.classList.remove('is-hidden');peek.classList.remove('visible')}
 function closePalette(){if(short)return;$('#palette-menu').hidden=true;$('#palette-open').setAttribute('aria-expanded','false')}
 function hide(){bar.classList.add('is-hidden');peek.classList.add('visible');closePalette()}
 if(!short){$('#palette-open').onclick=()=>{const open=$('#palette-menu').hidden;$('#palette-menu').hidden=!open;$('#palette-open').setAttribute('aria-expanded',String(open))};$('#palette-close').onclick=closePalette}
 $('#studio-close').onclick=()=>{manual=true;hide()};peek.onclick=reveal;
 addEventListener('scroll',()=>{const y=scrollY;if(y>lastY+5&&y>85)hide();else if(y<lastY-7&&!manual)reveal();if(y<8&&!manual)reveal();lastY=y},{passive:true});
 addEventListener('pointermove',e=>{if(e.clientY<8&&!params.has('clean'))reveal()},{passive:true});
 addEventListener('keydown',e=>{if(e.key==='Escape'&&!short&&!$('#palette-menu').hidden){closePalette();$('#palette-open').focus()}});
 addEventListener('click',e=>{if(!bar.contains(e.target))closePalette()});
 function mix(a,b,t){return '#'+[1,3,5].map(i=>Math.round(parseInt(a.slice(i,i+2),16)*(1-t)+parseInt(b.slice(i,i+2),16)*t).toString(16).padStart(2,'0')).join('')}
 function colours(p,depth){const d=(depth-50)/50;return {...p,paper:d<0?mix(p.paper,'#ffffff',-d*.65):mix(p.paper,p.panel,d*.55),panel:d<0?mix(p.panel,p.paper,-d*.6):mix(p.panel,p.ink,d*.08)}}
 function link(path,values){const u=new URL(path,location.href);Object.entries(values).forEach(([k,v])=>u.searchParams.set(k,v));return u.href}
 function render(persist=true){
  validate();const chosen=short?config.presets[state.photos]:state,p=colours(config.palettes.find(p=>p.id===chosen.palette),short?50:state.intensity);
  for(const k of ['paper','panel','ink','muted','line'])root.style.setProperty('--'+k,p[k]);root.dataset.type=chosen.type;root.dataset.palette=chosen.palette;root.dataset.tone='light';if(short)root.dataset.photos=state.photos;
  if(short){$('#shared-photos').value=state.photos;window.dinameReady=window.applyDinamePhotos(state.photos,lang)}
  else{$('#shared-type').value=state.type;$('#colour-depth').value=state.intensity;$('#colour-depth').setAttribute('aria-valuetext',state.intensity===50?'Исходный оттенок':state.intensity+' из 100');$('#depth-reset').disabled=state.intensity===50;$('#palette-open i').style.background=p.panel;$('#palette-open span').textContent=p.name;bar.querySelectorAll('[data-palette]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.palette===state.palette)))}
  const saved=read();saved[key]={...state};if(persist)try{localStorage.setItem(storageKey,JSON.stringify(saved))}catch{}
  bar.querySelectorAll('[data-sketch]').forEach(a=>{const target=a.dataset.sketch;a.href=link(`../${target==='short'?'homepage-v2':'homepage-emil'}/${lang==='ru'?'index.html':'en.html'}`,target===key?state:{...defaults[target],...saved[target]});a.setAttribute('aria-current',target===key?'page':'false')});
  $('#shared-language').href=link(lang==='ru'?'en.html':'index.html',state);
  const u=new URL(location.href);['palette','type','photos','intensity','copy'].forEach(k=>u.searchParams.delete(k));Object.entries(state).forEach(([k,v])=>u.searchParams.set(k,v));try{history.replaceState(null,'',u)}catch{}
  dispatchEvent(new Event('resize'));
 }
 if(short)$('#shared-photos').onchange=e=>{state.photos=e.target.value;render()};
 else{bar.querySelectorAll('[data-palette]').forEach(b=>b.onclick=()=>{state.palette=b.dataset.palette;state.intensity=config.palettes.find(p=>p.id===state.palette).defaultIntensity;render();closePalette()});$('#shared-type').onchange=e=>{state.type=e.target.value;render()};$('#colour-depth').oninput=e=>{state.intensity=+e.target.value;render()};$('#depth-reset').onclick=()=>{state.intensity=50;render()}}
 addEventListener('storage',e=>{if(e.key===storageKey&&e.newValue){try{Object.assign(state,JSON.parse(e.newValue)[key]||{});render(false)}catch{}}});
 if(params.get('clean')==='1'){document.body.classList.add('studio-clean');bar.hidden=true;peek.hidden=true}
 render();window.dinameStudio={getState:()=>({...state}),setState:v=>{Object.assign(state,v);render()},show:reveal};
})();
