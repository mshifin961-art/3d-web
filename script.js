const root=document.documentElement;
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const orb=document.querySelector('.orbital-scene');
const cube=document.querySelector('.cube');
const finalOrb=document.querySelector('.final-orb');
let ticking=false;
function update(){
  const y=window.scrollY;
  const vh=innerHeight;
  root.style.setProperty('--scroll',y);
  if(!reduce){
    if(orb){orb.style.transform=`translateY(calc(-50% + ${y*.08}px)) rotate(${y*.018}deg)`;}
    if(cube){const r=Math.min(y*.12,70);cube.style.marginTop=`${Math.sin(y*.006)*18}px`;cube.style.filter=`drop-shadow(0 30px 50px rgba(0,0,0,.55))`}
    if(finalOrb){finalOrb.style.transform=`translateY(${Math.max(0,(y-(document.body.scrollHeight-innerHeight)*.72))*.08}px) rotate(${y*.015}deg)`}
  }
  ticking=false;
}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});

const stage=document.querySelector('.floating-stage');
if(stage&&!reduce){stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;cube.style.transform=`translate(-50%,-50%) rotateX(${-24-y*18}deg) rotateY(${34+x*30}deg) rotateZ(${12+x*8}deg)`;});stage.addEventListener('pointerleave',()=>{cube.style.transform='translate(-50%,-50%) rotateX(-24deg) rotateY(34deg) rotateZ(12deg)';});}

update();