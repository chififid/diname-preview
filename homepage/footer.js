(()=>{
 const root=document.documentElement;
 const labels={
  ru:{home:'Главная',collections:'Коллекции',materials:'Материалы',production:'Производство',events:'События',bath:'Для ванной',kitchen:'Для кухни',bedroom:'Для спальни',all:'Все изделия',support:'Покупателям',delivery:'Доставка и оплата',returns:'Обмен и возврат',care:'Уход за изделиями',faq:'Вопросы и ответы',documents:'Документы',privacy:'Политика конфиденциальности',terms:'Пользовательское соглашение',offer:'Публичная оферта',partners:'Оптовым партнёрам',invitation:'Подберём текстиль для вашего магазина, отеля или проекта.',cta:'Стать партнёром',contact:'Связаться с нами',rights:'Все права защищены.',draft:'Раздел в разработке. Содержание и условия добавим после согласования с DINAME.'},
  en:{home:'Home',collections:'Collections',materials:'Materials',production:'Our production',events:'Events',bath:'For the bath',kitchen:'For the kitchen',bedroom:'For the bedroom',all:'All textiles',support:'Customer care',delivery:'Delivery & payment',returns:'Returns & exchanges',care:'Textile care',faq:'Frequently asked questions',documents:'Policies',privacy:'Privacy policy',terms:'Terms of use',offer:'Terms of sale',partners:'Wholesale partners',invitation:'Let’s find the right textiles for your store, hotel or project.',cta:'Become a partner',contact:'Get in touch',rights:'All rights reserved.',draft:'This section is in development. Content and terms will be added after confirmation by DINAME.'}
 };
 function localize(){const words=labels[root.dataset.language==='en'?'en':'ru'];document.querySelectorAll('[data-footer]').forEach(el=>el.textContent=words[el.dataset.footer])}
 new MutationObserver(localize).observe(root,{attributes:true,attributeFilter:['data-language']});localize();
})();
