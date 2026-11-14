/* Use resolved px for the root scale: Safari page zoom can misresolve vw in
   min()/clamp() font sizes. Keep native browser zoom and the fullscreen hero. */
(()=>{
 const root=document.documentElement;
 function update(){
  const width=window.innerWidth;
  const size=width>=1200?Math.min(width,1920)/120:16;
  root.style.setProperty('--desktop-font-size',`${size}px`);
 }
 update();
 window.addEventListener('resize',update,{passive:true});
})();
