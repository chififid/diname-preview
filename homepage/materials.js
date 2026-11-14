(() => {
 const section=document.getElementById('materials');
 const key='diname-material-split-v2';
 const defaults={mark:'thread',type:'normal',texture:'terry'};
 const allowed={mark:['thread','knot'],type:['normal','italic'],texture:['linen','terry']};
 let state={...defaults};
 try {
  const saved=JSON.parse(localStorage.getItem(key));
  for(const name of ['mark','type','texture'])if(allowed[name].includes(saved?.[name]))state[name]=saved[name];
  if(saved?.textureRevision!=='linen-terry-v1')state.texture='terry';
 }catch{}
 // Retired comparison URLs still lead to the selected composition.
 const url=new URL(location.href);
 if(url.searchParams.has('material')){url.searchParams.delete('material');history.replaceState(null,'',url);}
 const text={
  ru:{lines:['Всё начинается','с прикосновения'],description:'В рельефе ткани, мягкости складок и аккуратной отделке — характер каждой вещи. Текстиль, который хочется рассматривать вблизи и чувствовать каждый день.',alt:'Стопка тканей в молочных, песочных и ореховых оттенках'},
  en:{lines:['It begins','with a touch'],description:'The character of a piece is in its weave, its soft folds and its carefully finished edges. Textiles to look at closely and enjoy every day.',alt:'A stack of fabrics in ivory, sand and walnut tones'}
 };
 function render(){
  section.dataset.texture=state.texture;section.dataset.type=state.type;section.dataset.mark=state.mark;
  for(const name of ['mark','type','texture'])document.querySelector(`input[name="material-${name}"][value="${state[name]}"]`).checked=true;
  section.querySelectorAll('[data-material-symbol]').forEach(symbol=>symbol.toggleAttribute('hidden',symbol.dataset.materialSymbol!==state.mark));
  const copy=text[document.documentElement.dataset.language==='en'?'en':'ru'];
  section.querySelectorAll('h2 span').forEach((span,i)=>span.textContent=copy.lines[i]+(i===0?' ':''));
  section.querySelector('.materials-description').textContent=copy.description;
  section.querySelector('img').alt=copy.alt;
  try{localStorage.setItem(key,JSON.stringify({...state,textureRevision:"linen-terry-v1"}));}catch{}
 }
 document.querySelector('#panel-materials').addEventListener('change',event=>{
  const name=event.target.name?.replace('material-','');
  if(!allowed[name]?.includes(event.target.value))return;
  state[name]=event.target.value;render();
 });
 document.querySelector('#reset').addEventListener('click',()=>{state={...defaults};render();});
 new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['data-language']});
 render();
})();
