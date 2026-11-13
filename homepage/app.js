const root = document.documentElement;
const storageKey = 'diname-homepage-study-v1';
const defaults = { hero: 'armadillo', font: 'prata', palette: 'linen', video: 'limonta', language: 'ru', category: 'center', density: 'large', cardinfo: 'overlay', categorytext: 'normal', motion: true, sticky: true, heights: {cocoon:'full',frette:'compact',armadillo:'full'} };
const presetRevision='approved-homepage-2026-11-13';
let hasPreferredDefaults=false;
let settings = { ...defaults, heights: {...defaults.heights} };
try { const saved = JSON.parse(localStorage.getItem(storageKey)); hasPreferredDefaults=saved?.presetRevision===presetRevision; for (const key of ['hero','font','palette','video','category','language','density','cardinfo','categorytext']) { if ({hero:['cocoon','frette','armadillo'],font:['prata','forum','cormorant'],palette:['linen','walnut'],video:['frette','limonta'],category:['split','center'],language:['ru','en'],density:['large','triple'],cardinfo:['below','overlay'],categorytext:['normal','large']}[key].includes(saved?.[key])) settings[key] = saved[key]; } for(const hero of ['cocoon','frette','armadillo']){if(['full','compact'].includes(saved?.heights?.[hero]))settings.heights[hero]=saved.heights[hero];} if(typeof saved?.motion === 'boolean') settings.motion = saved.motion; if(typeof saved?.sticky === 'boolean') settings.sticky = saved.sticky; } catch {}
// Apply the approved defaults once, preserving later comparison choices.
if(!hasPreferredDefaults){for(const key of ['hero','video','language','category','density','cardinfo','categorytext','sticky'])settings[key]=defaults[key];settings.heights.armadillo='full';}
// Each new visit opens the selected direction; alternatives remain available for comparison.
settings.hero='armadillo';settings.heights.armadillo='full';
const categories = [
 { id:'bath', title:'Для ванной', photo:'../assets/873c95c53696f4b0.webp', text:'Мягкое полотенце после душа, любимый халат и немного времени для себя. Текстиль для ваших ежедневных ритуалов.', action:'Коллекция для ванной', items:[['Банное полотенце','Песочный · 70 × 140 см','2 400 ₽','bath-towel.jpg','bath-detail.jpg'],['Вафельное полотенце','Молочный · 70 × 140 см','2 100 ₽','waffle-towel.jpg','waffle-detail.jpg']] },
 { id:'kitchen', title:'Для кухни', photo:'media/kitchen-scene.jpg', text:'Неторопливый завтрак и ужин за общим столом. Простые вещи, которые делают каждый день немного теплее.', action:'Коллекция для кухни', items:[['Кухонное полотенце','Льняной · 50 × 70 см','850 ₽','kitchen-taupe.jpg'],['Кухонное полотенце','Молочный · 50 × 70 см','850 ₽','kitchen-ivory.jpg']] },
 { id:'bedroom', title:'Для спальни', photo:'../assets/612d79aae99b1d41.webp', text:'Укутаться в плед, отложить дела и остаться дома. Спокойные оттенки и фактуры, к которым хочется прикасаться.', action:'Коллекция для спальни', items:[['Фактурный плед','Песочный · 140 × 200 см','6 800 ₽','blanket-sand.jpg'],['Мягкий плед','Карамель · 140 × 200 см','7 200 ₽','blanket-caramel.jpg']] }
];
const categoryEditorial = [
 {heading:['Банная','коллекция'],text:'Мягкие полотенца, лёгкие халаты и спокойные природные оттенки. Для первых минут после душа, неторопливого утра и вечера, когда можно наконец выдохнуть. Любимые вещи, к которым хочется возвращаться каждый день.'},
 {heading:['Кухонная','коллекция'],text:'Фактурный текстиль в оттенках льна, молока и тёплой земли. Для завтраков у окна, семейных обедов и долгих разговоров за общим столом. Простые детали, с которыми даже обычный день становится немного уютнее.'},
 {heading:['Коллекция','для спальни'],text:'Мягкие пледы, выразительные фактуры и оттенки, которые легко сочетать между собой. Для тихих вечеров с книгой, прохладных утренних часов и выходных без спешки. Всё, чтобы отдыхать и чувствовать себя дома.'}
];
categories.forEach((category,index)=>Object.assign(category,categoryEditorial[index]));
categories[0].items.push(['Вафельное полотенце','Песочный · 70 × 140 см','2 100 ₽','third-bath.jpg']);
categories[1].items.push(['Кухонное полотенце','Льняной · 50 × 70 см','850 ₽','third-kitchen.jpg']);
categories[2].items.push(['Мягкий плед','Молочный · 140 × 200 см','7 200 ₽','third-bedroom.jpg']);
const products = [];
document.querySelector('.collections').innerHTML = categories.map((c,i)=>`<section class="collection-row ${i%2?'reverse':''}" id="${c.id}" aria-labelledby="${c.id}-title"><article class="category"><div class="category-media"><img src="${c.photo}" alt="Текстиль в домашнем интерьере" loading="lazy" width="1000" height="1000"></div><div class="category-content"><h2 id="${c.id}-title">${c.heading.map(line=>`<span>${line}</span>`).join('')}</h2><div class="category-copy"><p class="category-description">${c.text}</p><button class="outline category-button" data-category="${c.id}">${c.action}</button></div></div></article>${c.items.map((item,itemIndex)=>{ const n=products.push({name:item[0],detail:item[1],price:item[2],image:'media/'+item[3],category:c.id})-1;return `<button class="product-card ${itemIndex===2?'third-product':''} ${item[4]?'has-detail':'zoom-detail'}" data-product="${n}" aria-label="${item[0]}, ${item[1]}"><span class="product-media"><img src="media/${item[3]}" alt="${item[0]}" width="800" height="1000" loading="lazy">${item[4]?`<img class="alternate" src="media/${item[4]}" alt="" width="800" height="1000" loading="lazy">`:''}</span><span class="product-info"><span><strong>${item[0]}</strong><small>${item[1]}</small></span><span class="price">${item[2]}</span></span></button>`;}).join('')}</section>`).join('');
const translations = {
  "Магазин": "Shop",
  "Оптовым партнёрам": "Trade enquiries",
  "Оптовым партнёрам ↗": "Trade enquiries ↗",
  "Поиск": "Search",
  "Корзина": "Bag",
  "К коллекциям": "Skip to collections",
  "Dina.Me — главная": "Dina.Me — home",
  "Основная навигация": "Main navigation",
  "Коллекции для дома": "Collections for your home",
  "Текстиль в домашнем интерьере": "Textiles in a home interior",
  "Смотреть коллекции": "Explore the collections",
  "Для ванной": "Bath",
  "Для кухни": "Kitchen",
  "Для спальни": "Bedroom",
  "Коллекция для ванной": "Explore bath",
  "Коллекция для кухни": "Explore kitchen",
  "Коллекция для спальни": "Explore bedroom",
  "Мягкое полотенце после душа, любимый халат и немного времени для себя. Текстиль для ваших ежедневных ритуалов.": "A soft towel after a shower, your favourite robe and a little time to yourself. Textiles for your everyday rituals.",
  "Неторопливый завтрак и ужин за общим столом. Простые вещи, которые делают каждый день немного теплее.": "Slow breakfasts and dinners around the table. Simple things that bring a little warmth to every day.",
  "Укутаться в плед, отложить дела и остаться дома. Спокойные оттенки и фактуры, к которым хочется прикасаться.": "Wrap yourself in a throw, put things aside and stay home. Quiet colours and textures you want to reach for.",
  "Банное полотенце": "Bath towel",
  "Вафельное полотенце": "Waffle towel",
  "Кухонное полотенце": "Kitchen towel",
  "Фактурный плед": "Textured throw",
  "Мягкий плед": "Soft throw",
  "Песочный · 70 × 140 см": "Sand · 70 × 140 cm",
  "Молочный · 70 × 140 см": "Ivory · 70 × 140 cm",
  "Льняной · 50 × 70 см": "Linen · 50 × 70 cm",
  "Молочный · 50 × 70 см": "Ivory · 50 × 70 cm",
  "Песочный · 140 × 200 см": "Sand · 140 × 200 cm",
  "Карамель · 140 × 200 см": "Caramel · 140 × 200 cm",
  "Настройки просмотра": "Preview settings",
  "Открыть и закрыть —": "Open and close —",
  "01 / Первый экран": "01 / Hero layout",
  "Во весь экран · крупный текст слева": "Full screen · large text on the left",
  "Компактнее · текст и кнопка слева внизу": "Shorter hero · text and button at bottom left",
  "Минимализм · текст по центру": "Minimal · centred text",
  "Видео первого экрана": "Hero video",
  "Текущий ролик": "Frette homepage film",
  "Видео с главной · кожаный диван": "Homepage film · leather sofa",
  "02 / Композиция категорий": "02 / Category layout",
  "Заголовок сверху": "Title at the top",
  "Название слева сверху, текст и кнопка снизу": "Title at top left, copy and button below",
  "Два столбца": "Two columns",
  "Заголовок и текст слева, кнопка справа": "Title and copy on the left, button on the right",
  "Всё слева": "Left aligned",
  "Название, описание и кнопка одной группой": "Title, copy and button grouped together",
  "Карточки товаров": "Product cards",
  "Минималистичные": "Minimal",
  "Фото и компактная подпись": "Image and compact caption",
  "По центру": "Centred",
  "Чистое фото, подпись и цена по центру": "Clean image, centred caption and price",
  "Шрифт заголовков": "Heading typeface",
  "Prata — основной. Forum — спокойнее, Cormorant — мягче.": "Prata is the primary choice. Forum is quieter, Cormorant softer.",
  "Палитра": "Palette",
  "Молочный лён": "Milky linen",
  "Слоновая кость и орех": "Ivory and walnut",
  "Плавная прокрутка и параллакс": "Smooth scrolling and parallax",
  "Сбросить настройки": "Reset settings",
  "Язык": "Language",
  "Визуальный прототип. Видео Frette / Society Limonta и фотографии других брендов используются для сравнения композиций. Названия, товары и цены демонстрационные.": "Visual prototype. Frette / Society Limonta videos and other brands’ photography are used to compare layouts. Product names and prices are illustrative.",
  "Найти изделие": "Find a product",
  "Полотенце, плед…": "Towel, throw…",
  "Ваша корзина пока пуста.": "Your bag is empty.",
  "Сейчас открыт визуальный прототип. Покупки ещё не подключены.": "This is a visual prototype. Shopping is not connected yet.",
  "Текстиль Dina.Me для вашего бизнеса.": "Dina.Me textiles for your business.",
  "Здесь появится форма заявки. Контакт для оптовых обращений уточняется.": "An enquiry form will appear here. Trade contact details are to be confirmed.",
  "Пример оформления. Реальные изделия и цены будут добавлены после получения каталога.": "Layout preview. Actual products and prices will be added once the catalogue is available.",
  "Ничего не найдено. Попробуйте «полотенце» или «плед».": "No results. Try “towel” or “throw”.",
  "Закрыть меню": "Close menu",
  "Закрыть настройки": "Close settings",
  "Закрыть поиск": "Close search",
  "Закрыть корзину": "Close bag",
  "Закрыть изделие": "Close product",
  "Закрыть": "Close"
};
Object.assign(translations,{"Общее": "General", "Первый экран": "Hero", "Категории": "Categories", "Материалы": "Materials", "Разделы настроек": "Settings sections", "Высота первого экрана": "Hero height", "Во весь экран": "Full screen", "Компактный": "Compact"});
Object.assign(translations,{"Выбранный вариант": "Selected direction", "Плотность блока": "Section density", "Два товара · категория ниже и уже": "Two products · a shorter, narrower category", "Три товара": "Three products", "Больше изделий в каждом ряду": "More products in each row", "Молочный · 140 × 200 см": "Ivory · 140 × 200 cm"});
Object.assign(translations,{"Большой": "Large", "Квадратная категория и два товара": "Square category and two products", "Информация о товаре": "Product information", "Под фотографией": "Below the image", "На фотографии": "On the image", "Соотношение высот": "Relative heights", "Исходное": "Original", "Категория выше": "Taller category"});
Object.assign(translations,{"Вариант блока":"Section layout","Крупная категория · два невысоких товара":"Large category · two shorter product cards","Три товара · категория выше":"Three products · taller category","Сохранённые пропорции и высота":"Existing proportions and height","Размер текста в блоке":"Section text size","Обычный":"Regular","Крупнее":"Larger"});
Object.assign(translations,{
 'Банная':'Bath','Кухонная':'Kitchen','коллекция':'collection','Коллекция':'Collection','для спальни':'for the bedroom',
 'Cocoon · центр':'Cocoon · centred','Заголовок над описанием, описание и кнопка справа снизу':'Title above the copy, copy and button at bottom right','Заголовок по центру высоты категории':'Title centred in the full category height'
});
const categoryEnglish=[
 'Soft towels, light robes and quiet natural shades. For the first moments after a shower, slow mornings and evenings when you can finally breathe out. Favourite pieces to return to, day after day.',
 'Textured linens in shades of flax, milk and warm earth. For breakfasts by the window, family lunches and long conversations around the table. Simple details that make an ordinary day feel a little warmer.',
 'Soft throws, expressive textures and colours that sit easily together. For quiet evenings with a book, cool mornings and unhurried weekends. Everything you need to rest and feel at home.'
];
categoryEditorial.forEach((category,index)=>translations[category.text]=categoryEnglish[index]);
Object.assign(translations,{'Прилипание карточек при прокрутке':'Sticky product cards'});
Object.assign(translations,{'Основной':'Preferred','Prata, Forum и Cormorant — варианты для сравнения.':'Prata, Forum and Cormorant — options to compare.'});
function t(text){return settings.language==='en'?(translations[text]||text):text;}
// Keep original text nodes so switching languages never destroys controls or icons.
const localizedNodes=[];
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
while(walker.nextNode()){
 const node=walker.currentNode, key=node.textContent.trim();
 if(translations[key])localizedNodes.push({node,original:node.textContent,key});
}
const localizedAttributes=[];
document.querySelectorAll('[aria-label],[placeholder],[alt]').forEach(node=>{
 for(const attr of ['aria-label','placeholder','alt']){
  const original=node.getAttribute(attr);
  if(original && translations[original])localizedAttributes.push({node,attr,original});
 }
});
const heroCopy={
 ru:{
  frette:{lines:['Искусство жить красиво','и чувствовать себя дома'],intro:'Мягкие фактуры текстиля и спокойные оттенки|Для любимого дома и тёплых моментов каждый день'},
  cocoon:{lines:['Простое тепло','любимого дома'],intro:'Текстиль для вашего дома'},
  armadillo:{lines:['Искусство','чувствовать дом'],intro:'Текстиль для вашего дома'},
  cta:'Смотреть коллекции',note:'Мягкие фактуры и спокойные оттенки. Для неспешного утра и тёплых вечеров дома.'
 },
 en:{
  frette:{lines:['The art of living well','and feeling truly at home'],intro:'Soft and comforting textures in quiet colours|For your favourite spaces and everyday moments'},
  cocoon:{lines:['Everyday warmth','for your home'],intro:'Textiles for your home'},
  armadillo:{lines:['The art of','feeling at home'],intro:'Textiles for your home'},
  cta:'Explore the collections',note:'Soft textures and quiet colours. For slow mornings and warm evenings at home.'
 }
};
function applyLanguage(){
 root.lang=settings.language;
 document.title=settings.language==='en'?'Dina.Me — textiles for your home':'Dina.Me — текстиль для дома';
 localizedNodes.forEach(({node,original,key})=>{node.textContent=original.replace(key,t(key));});
 localizedAttributes.forEach(({node,attr,original})=>node.setAttribute(attr,t(original)));
 document.querySelectorAll('.product-card').forEach((node,i)=>node.setAttribute('aria-label',`${t(products[i].name)}, ${t(products[i].detail)}`));
 const copy=heroCopy[settings.language], composition=copy[settings.hero];
 const title=document.querySelector('#hero-title');title.replaceChildren();
 composition.lines.forEach(line=>{const span=document.createElement('span');span.className='hero-line';span.textContent=line;title.append(span);});
 const intro=document.querySelector('.hero .eyebrow');intro.replaceChildren();
 composition.intro.split('|').forEach(line=>{const span=document.createElement('span');span.className='intro-line';span.textContent=line;intro.append(span);});
 document.querySelector('.hero-actions a').textContent=copy.cta;
 document.querySelector('.hero-note').textContent=copy.note;
 const categoryCopy = settings.language==='en' ? [
  ['A soft towel after a shower, your favourite robe and a little time to yourself. Textiles for your everyday rituals.','Soft towels and light robes in quiet natural shades. For slow mornings, warm showers and restful evenings at home. Made for every day. Find the texture you love.'],
  ['Slow breakfasts and dinners around the table. Simple things that bring a little warmth to every day.','Textured linens in warm natural shades. For breakfasts by the window, family lunches and long evenings around the table. Warmth in every detail. Mix colours to suit your mood.'],
  ['Wrap yourself in a throw, put things aside and stay home. Quiet colours and textures you want to reach for.','Soft throws, comforting textures and quiet colours. For evenings with a book and cosy weekends with nowhere to rush. Settle into comfort. Make home your favourite place.']
 ] : [
  ['Мягкое полотенце после душа, любимый халат и немного времени для себя. Текстиль для ваших ежедневных ритуалов.','Мягкие полотенца и лёгкие халаты в природных оттенках. Для неспешного утра, тёплого душа и тихого вечера дома. На каждый день. Выбирайте свою любимую фактуру.'],
  ['Неторопливый завтрак и ужин за общим столом. Простые вещи, которые делают каждый день немного теплее.','Фактурный текстиль в природных оттенках. Для завтраков у окна, семейных обедов и долгих встреч за общим столом. С теплом к деталям. Сочетайте оттенки по настроению.'],
  ['Укутаться в плед, отложить дела и остаться дома. Спокойные оттенки и фактуры, к которым хочется прикасаться.','Мягкие пледы, приятные фактуры и спокойные оттенки. Для вечеров с книгой и уютных выходных, когда некуда спешить. Отдыхайте с уютом. Пусть дома будет по-настоящему хорошо.']
 ];
 categories.forEach((category,index)=>{
  const section=document.getElementById(category.id), heading=section.querySelector('h2');
  heading.replaceChildren();
  const lines=settings.category==='split'?[t(category.title)]:category.heading.map(t);
  lines.forEach(line=>{const span=document.createElement('span');span.textContent=line;heading.append(span);});
  const description=section.querySelector('.category-description');description.replaceChildren();
  categoryCopy[index][settings.category==='split'?0:1].split('|').forEach(line=>{const span=document.createElement('span');span.textContent=line;description.append(span);});
 });

}

const header = document.querySelector('.header');
const video = document.querySelector('#hero-video');
const videoBack = video.cloneNode(true);
videoBack.removeAttribute('id');
videoBack.removeAttribute('autoplay');
video.after(videoBack);
const videos = [video, videoBack];
videos.forEach(v=>{v.loop=false;v.removeAttribute('loop');v.setAttribute('aria-hidden','true');});
let activeVideo=0, blending=false, videoFrame=0;
const blendDuration=.9;
function resetVideoBlend(){
 cancelAnimationFrame(videoFrame);blending=false;activeVideo=0;
 videos.forEach((v,i)=>{v.pause();v.style.opacity=i?'0':'1';v.style.zIndex=i?'0':'1';});
}
function animateVideo(){
 cancelAnimationFrame(videoFrame);
 if(document.hidden || motionPreference.matches)return;
 const current=videos[activeVideo], next=videos[1-activeVideo];
 if(!blending && Number.isFinite(current.duration) && current.duration-current.currentTime<=blendDuration && next.readyState>=2){
  blending=true;next.currentTime=0;next.style.zIndex='2';
  next.play().catch(()=>{blending=false;});
 }
 if(blending){
  const progress=Math.min(1,next.currentTime/blendDuration);
  next.style.opacity=String(progress*progress*(3-2*progress));
  if(progress===1){
   current.pause();current.style.opacity='0';current.style.zIndex='0';current.currentTime=0;
   next.style.zIndex='1';activeVideo=1-activeVideo;blending=false;
  }
 }
 videoFrame=requestAnimationFrame(animateVideo);
}
function resumeVideo(){
 if(document.hidden || motionPreference.matches){videos.forEach(v=>v.pause());cancelAnimationFrame(videoFrame);return;}
 videos[activeVideo].play().catch(()=>{});
 if(blending)videos[1-activeVideo].play().catch(()=>{});
 animateVideo();
}
// If the second decoder is not ready, retain the last frame until it can blend in.
videos.forEach(v=>v.addEventListener('canplay',()=>{if(v===videos[activeVideo])resumeVideo();}));
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let lenis, lastY=scrollY, direction=0, travel=0, downStarted=0, lastScrollTime=0;
let headerTarget=0, headerOffset=0, headerVelocity=0, headerHeight=header.offsetHeight, previousFrame=0;
const stickyProducts=[...document.querySelectorAll('.product-card')].map(element=>({element,row:element.closest('.collection-row'),offset:0}));
function updateStickyProducts(dt){
 const active=settings.sticky && innerWidth>600;
 const inset=Math.max(0,headerHeight-headerOffset)+16;
 const blend=motionPreference.matches?1:1-Math.exp(-dt/110);
 const rows=new Map();
 if(active)document.querySelectorAll('.collection-row').forEach(row=>rows.set(row,row.getBoundingClientRect()));
 const updates=stickyProducts.map(item=>{
  const row=rows.get(item.row),height=item.element.offsetHeight;
  const maximum=active&&height?Math.max(0,row.height-height):0;
  const target=maximum?Math.max(0,Math.min(maximum,inset-row.top)):0;
  item.offset=active?Math.max(0,Math.min(maximum,item.offset+(target-item.offset)*blend)):0;
  if(Math.abs(item.offset-target)<.05)item.offset=target;
  return [item.element,item.offset];
 });
 updates.forEach(([element,offset])=>{const value=offset?`translate3d(0,${offset.toFixed(2)}px,0)`:'';if(element.style.transform!==value)element.style.transform=value;});
}
function showHeader(){headerTarget=0;}
new ResizeObserver(()=>{headerHeight=header.offsetHeight;headerTarget=Math.min(headerTarget,headerHeight);}).observe(header);
header.addEventListener('focusin',showHeader);
const parallaxImages = [...document.querySelectorAll('.category-media img')];
function renderScroll(){
 const y=Math.max(0,Math.min(scrollY,document.documentElement.scrollHeight-innerHeight));
 const delta=y-lastY, now=performance.now();
 // Ignore subpixel settling and elastic overscroll when detecting direction.
 if(Math.abs(delta)>.2){
  const nextDirection=Math.sign(delta);
  if(nextDirection!==direction || now-lastScrollTime>260){travel=0;downStarted=now;}
  direction=nextDirection;travel+=Math.abs(delta);lastScrollTime=now;
 }
 if(y>64)header.classList.add('solid');else if(y<12)header.classList.remove('solid');
 const forcedVisible=y<80 || document.querySelector('dialog[open]') || header.matches(':has(:focus-visible)');
 if(forcedVisible)showHeader();
 else if(direction<0 && travel>32)showHeader();
 else if(direction>0 && travel>Math.max(600,innerHeight*.8) && now-downStarted>1000){
  headerTarget=headerHeight;
 }
 if(settings.motion&&!motionPreference.matches){
  const hero=document.querySelector('.hero');
  if(y<hero.offsetHeight) video.parentElement.style.transform=`translate3d(0,${Math.min(y*.15,hero.offsetHeight*.09)}px,0)`;
  parallaxImages.forEach(img=>{const r=img.parentElement.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const offset=Math.max(-r.height*.115,Math.min(r.height*.115,(innerHeight/2-r.top-r.height/2)*.15));img.style.transform=`translate3d(0,${offset}px,0)`;}});
 }
 lastY=y;
}
// One frame clock drives Lenis, parallax and the header; no separate CSS slide.
function requestRender(){renderScroll();}
function frame(time){
 const dt=Math.min(64,previousFrame?time-previousFrame:16.67);previousFrame=time;
 lenis?.raf(time);if(Math.abs(scrollY-lastY)>.01)renderScroll();
 const target=header.matches(':has(:focus-visible)')?0:headerTarget;
 if(motionPreference.matches){headerOffset=target;headerVelocity=0;}
 else {
  // Critically damped spring: starts gently and preserves velocity on reversal.
  const seconds=dt/1000, omega=10, displacement=headerOffset-target;
  const coefficient=headerVelocity+omega*displacement, decay=Math.exp(-omega*seconds);
  headerOffset=target+(displacement+coefficient*seconds)*decay;
  headerVelocity=(headerVelocity-omega*coefficient*seconds)*decay;
  if(Math.abs(target-headerOffset)<.02 && Math.abs(headerVelocity)<.1){headerOffset=target;headerVelocity=0;}
 }
 header.style.transform=`translate3d(0,${-headerOffset}px,0)`;
 header.classList.toggle('hidden',headerOffset>=headerHeight-.5);
 updateStickyProducts(dt);

 requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
function syncMotion(){
 lenis?.destroy();lenis=null;
 const active=settings.motion&&!motionPreference.matches;
 if(active && window.Lenis) lenis=new Lenis({lerp:.1,smoothWheel:true,syncTouch:false,autoRaf:false,anchors:{offset:-64},prevent:node=>Boolean(node.closest('[data-lenis-prevent]'))});
 if(!active){video.parentElement.style.transform='';parallaxImages.forEach(img=>img.style.transform='');}
 resumeVideo();
 requestRender();
}
function applySettings(){
 for(const key of ['hero','font','palette','video','category','language','density','cardinfo','categorytext']){root.dataset[key]=settings[key];document.querySelector(`input[name="${key}"][value="${settings[key]}"]`).checked=true;}
 root.dataset.height=settings.heights[settings.hero];
 document.querySelector(`input[name="height"][value="${settings.heights[settings.hero]}"]`).checked=true;
 root.dataset.balance=settings.density==='triple'?'taller':'aligned';
 document.querySelectorAll('.third-product').forEach(card=>card.hidden=settings.density==='large');
 applyLanguage();
 document.querySelector('#motion').checked=settings.motion;
 document.querySelector('#sticky-products').checked=settings.sticky;
 try{localStorage.setItem(storageKey,JSON.stringify({...settings,presetRevision}));}catch{}
 const nextVideo=settings.video==='limonta'?'media/limonta-hero.mov':'media/frette-hero.mp4';
 if(video.getAttribute('src')!==nextVideo){
  resetVideoBlend();
  videos.forEach(v=>{v.poster=settings.video==='frette'?'media/frette-poster.jpg':'';v.src=nextVideo;v.load();});
 }
 syncMotion();
}
applySettings();motionPreference.addEventListener('change',syncMotion);
document.querySelector('#settings').addEventListener('change',e=>{if(['hero','font','palette','video','category','language','density','cardinfo','categorytext'].includes(e.target.name))settings[e.target.name]=e.target.value;else if(e.target.name==='height')settings.heights[settings.hero]=e.target.value;else if(e.target.id==='motion')settings.motion=e.target.checked;else if(e.target.id==='sticky-products')settings.sticky=e.target.checked;applySettings();if(document.querySelector('dialog[open]'))lenis?.stop();});
document.querySelector('#reset').addEventListener('click',()=>{settings={...defaults,heights:{...defaults.heights}};applySettings();lenis?.stop();});
function openDialog(id){if(id!=='settings')return;document.querySelectorAll('dialog[open]').forEach(d=>d.close());const dialog=document.getElementById(id);dialog.showModal();lenis?.stop();showHeader();document.querySelector('.shop').setAttribute('aria-expanded',String(id==='menu'));}
document.querySelectorAll('dialog').forEach(d=>{
 d.querySelector('.close').addEventListener('click',()=>d.close());
 d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});
 d.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))lenis?.start();document.querySelector('.shop').setAttribute('aria-expanded',String(document.querySelector('#menu').open));});
});
document.addEventListener('click',e=>{
 const trigger=e.target.closest('[data-open]');if(trigger)openDialog(trigger.dataset.open);
 const anchor=e.target.closest('a[href^="#"]');if(anchor){e.preventDefault();document.querySelectorAll('dialog[open]').forEach(d=>d.close());lenis?.start();const target=document.querySelector(anchor.getAttribute('href'));if(target){if(lenis)lenis.scrollTo(target,{offset:-64});else target.scrollIntoView({behavior:motionPreference.matches?'instant':'smooth'});}}
});
document.addEventListener('keydown',e=>{if(e.shiftKey&&e.code==='KeyD'&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&!e.target.matches('input,textarea,[contenteditable]')){e.preventDefault();const d=document.querySelector('#settings');d.open?d.close():openDialog('settings');}});
document.addEventListener('visibilitychange',resumeVideo);

const settingsTabs=[...document.querySelectorAll('[role="tab"]')];
function selectSettingsTab(tab){
 settingsTabs.forEach(button=>{
  const selected=button===tab;
  button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;
  document.getElementById(button.getAttribute('aria-controls')).hidden=!selected;
 });
 document.querySelector('#settings').scrollTop=0;
}
settingsTabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectSettingsTab(tab));
 tab.addEventListener('keydown',event=>{
  let next;
  if(event.key==='ArrowRight')next=(index+1)%settingsTabs.length;
  else if(event.key==='ArrowLeft')next=(index-1+settingsTabs.length)%settingsTabs.length;
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=settingsTabs.length-1;
  else return;
  event.preventDefault();selectSettingsTab(settingsTabs[next]);settingsTabs[next].focus();
 });
});
