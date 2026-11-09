(() => {
 const isShort=location.pathname.includes('homepage-v2');
 const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];let version=0,current=null;
 const names={warm:{ru:['Вафельное полотенце','Банное полотенце','Домашний халат','Покрывало'],en:['Waffle towel','Bath towel','Bathrobe','Bed cover']},cold:{ru:['Набор полотенец','Полотенце','После купания','На свежем воздухе'],en:['Towel set','Towel','After a swim','In the open air']},interior:{ru:['У ванной','У раковины','Рядом с вами','Светлый интерьер'],en:['By the bath','By the basin','Close at hand','A light interior']},people:{ru:['Полотенце для лица','Банное полотенце','Мягкое прикосновение','После душа'],en:['Face towel','Bath towel','A soft touch','After a shower']},studio:{ru:['Набор полотенец','Банное полотенце','Набор полотенец','Белое полотенце'],en:['Towel set','Bath towel','Towel set','White towel']},graphic:{ru:['Графичный рисунок','В интерьере','Полотенце на человеке','После душа'],en:['Graphic pattern','In the room','Worn as a wrap','After a shower']}};
 const cache=new Map(),queue=[];let active=0;
 function pump(){while(active<3&&queue.length){const task=queue.shift();active++;task().finally(()=>{active--;pump()})}}
 function preload(name){if(cache.has(name))return cache.get(name);const promise=new Promise((resolve,reject)=>{queue.push(async()=>{try{const img=new Image();img.src=window.DINAME_PHOTO_ASSETS[name];await img.decode();resolve(img)}catch(error){cache.delete(name);reject(error)}});pump()});cache.set(name,promise);return promise}
 const note=document.createElement('div');note.className='photo-note';document.body.append(note);
 window.applyDinamePhotos=async(id,lang)=>{
  if(current===id)return;const v=++version,p=window.DINAME_PHOTOS[id],ru=lang==='ru';if(!p)return;
  if(!isShort)return applyLong(id,lang,p,v);
  const hero=$('.hero-photo');let companion=hero.querySelector('.hero-companion');if(!companion){companion=document.createElement('img');companion.className='hero-companion';companion.alt='';hero.append(companion)}
  const targets=[[$('.hero-photo>img'),p.hero],[$('.bath [data-parallax]'),p.bath],[$('.home [data-parallax]'),p.home],[$('.product-photo .detail'),p.detail],[$('.material-background img'),p.material],[$('.material-detail>img'),p.inset]];
  $$('.product-photo>img:first-child').forEach((el,i)=>targets.push([el,p.cards[i]]));if(p.hero2)targets.push([companion,p.hero2]);
  try{await Promise.all([...new Set(targets.map(([,id])=>id))].map(preload))}catch(e){if(v!==version)return;note.textContent='Не удалось загрузить серию. Обновите страницу.';throw e}
  if(v!==version)return;for(const [el,name] of targets)el.src=window.DINAME_PHOTO_ASSETS[name];hero.classList.toggle('has-pair',Boolean(p.hero2));current=id;
  const labels=names[id][lang];$$('.product').forEach((el,i)=>{el.querySelector('h3').textContent=labels[i];el.querySelector('img').alt=labels[i];el.querySelector('.product-caption>span').textContent=''});
  $('.hero h1').innerHTML=ru?'Текстиль<br>для жизни дома':'Textiles<br>for life at home';$('.hero-bottom>p').innerHTML=ru?'Полотенца, халаты и текстиль.<br>Для ванной, спальни и кухни.':'Towels, robes and textiles.<br>For the bath, bedroom and kitchen.';
  $('.home h2').innerHTML=ru?'Каждый<br>день':'Every<br>day';$('.home .feature-detail p').textContent=ru?'После душа, у раковины, рядом с ванной. Соберите свой набор в близких оттенках.':'After a shower, by the basin, beside the bath. Build your set in complementary shades.';$('.home .outline').textContent=ru?'Все полотенца':'Explore towels';$('.bath .feature-detail p').textContent=ru?'Полотенца для рук и тела. Цвета и фактуры для вашей ванной.':'Towels for hands and body. Colours and textures for your bathroom.';
  $('.material-panel>p').innerHTML=ru?'Цвет, рисунок, переплетение нитей.<br>Рассмотрите ткань в деталях.':'Colour, pattern and weave.<br>A closer look at the fabric.';
  note.innerHTML=`<span>${p.title} · ${p.description}</span><a href="../shared-studio/photos.html#${id}" target="_blank">Вся серия и источники ↗</a>`;dispatchEvent(new Event('resize'));
 };
 async function applyLong(id,lang,p,v){
  const ru=lang==='ru',hero=$('.hero-image');hero.classList.add('hero-photo');
  let companion=hero.querySelector('.hero-companion');if(!companion){companion=document.createElement('img');companion.className='hero-companion';companion.alt='';hero.append(companion)}
  const scene={warm:['bathlook-08','bathlook-19'],cold:['winter-00','hebrides-04'],interior:['cultiver-12','cultiver-10'],people:['resore-00','resore-01'],studio:['sky-02','pebble-04'],graphic:['weave-01','weave-03']}[id];
  const targets=[[$('.hero-image>img'),p.hero],[$('.collection-scene img'),p.bath],[$('.product-image .alternate'),p.detail],[$('.material-photo img'),p.material],[$('.colour-portrait img'),p.home],[$('.colour-stripes img'),p.cards[0]],[$('.gift-photo img'),p.inset]];
  $$('.product-image>img:first-child').forEach((el,i)=>targets.push([el,p.cards[i]]));$$('.interior-pair img').forEach((el,i)=>targets.push([el,scene[i]]));if(p.hero2)targets.push([companion,p.hero2]);
  try{await Promise.all([...new Set(targets.map(([,name])=>name))].map(preload))}catch(e){if(v!==version)return;throw e}
  if(v!==version)return;for(const [el,name] of targets){el.src=window.DINAME_PHOTO_ASSETS[name];el.alt=''}hero.classList.toggle('has-pair',Boolean(p.hero2));current=id;
  const copy={warm:['Хорошо<br>быть дома.','Good to<br>be home.','Дома, каждый день.','At home, every day.'],cold:['После воды.<br>В тепле.','Out of the water.<br>Into warmth.','Рядом с водой.','Beside the water.'],interior:['Ваш дом.<br>Ваши детали.','Your home.<br>Your details.','На своём месте.','Just where it belongs.'],people:['Для ваших<br>ежедневных ритуалов.','For your<br>daily rituals.','Момент для себя.','A moment for yourself.'],studio:['Полотенца.<br>Ничего лишнего.','Towels.<br>Simply considered.','В деталях и целиком.','The detail. The whole.'],graphic:['Цвет, который<br>остаётся с вами.','Colour that<br>stays with you.','Привычные вещи. Новый взгляд.','Everyday things. A fresh perspective.']}[id];
  $('.hero h1').innerHTML=copy[ru?0:1];$('.interior h2').textContent=copy[ru?2:3];
  $('.hero-note').innerHTML=ru?'Полотенца и домашний текстиль.<br>Цвет, фактура и привычные ритуалы.':'Towels and home textiles.<br>Colour, texture and daily rituals.';
  $('.selection .heading-note p').textContent=ru?'Рассмотрите ткань, выберите оттенок. Найдите полотенца, которые хочется видеть дома.':'Explore the fabric. Choose a shade. Find the towels you want to come home to.';
  $$('.product').forEach((el,i)=>{el.querySelector('h3').textContent=names[id][lang][i];el.querySelector('.product-caption>span').textContent=''});
  $('.material-copy p').textContent=ru?'Рисунок, складки и переплетение нитей. Посмотрите на ткань вблизи — здесь лучше всего видны её детали.':'Pattern, folds and weave. Look closely at the fabric — this is where its details come into view.';
  $('.photo-label').textContent=ru?'Ткань · крупный план':'Fabric · a closer look';
  $('.interior .heading-note').textContent=ru?'Один текстиль — разные моменты. Общий план и детали, которые меняют впечатление.':'One textile, different moments. The wider scene and the details that change how it feels.';
  $$('.interior-pair figcaption').forEach((el,i)=>el.textContent=ru?['В жизни','Другой ракурс'][i]:['In everyday life','Another view'][i]);
  $('.colour-copy p').textContent=ru?'Оттенки и фактуры одной серии. Посмотрите, как они работают рядом.':'Shades and textures from one series. See how they work together.';
  $('.swatches').hidden=true;
  $('.gift-copy p').textContent=ru?'Набор полотенец для нового дома. Знакомая вещь в любимом цвете. Подарок, которому найдётся место каждый день.':'A set of towels for a new home. A familiar object in a favourite colour. A gift with a place in everyday life.';
  note.innerHTML=`<span>${p.title}</span><a href="../shared-studio/photos.html#${id}" target="_blank">Вся серия и источники ↗</a>`;dispatchEvent(new Event('resize'));
 }

})();
