// Lightweight interactive 3D model gallery — drag, touch, pinch and wheel.
const modelStage=document.querySelector('.model-stage');
if(modelStage){
  const models=[
    {name:'ORBIT',type:'orb',desc:'Drag to rotate the luminous core.'},
    {name:'CRYSTAL',type:'crystal',desc:'Touch and spin the geometric object.'},
    {name:'SATELLITE',type:'satellite',desc:'Explore the orbital mechanism.'}
  ];
  modelStage.innerHTML=`<div class="model-viewer"><div class="model-object orb-model"></div><div class="model-object crystal-model"><i></i><i></i><i></i></div><div class="model-object satellite-model"><span></span><b></b><em></em></div></div><div class="model-info"><small>INTERACTIVE OBJECT</small><strong id="modelName">ORBIT</strong><p id="modelDesc">Drag to rotate the luminous core.</p><div class="model-dots">${models.map((_,i)=>`<button data-i="${i}" aria-label="Model ${i+1}"></button>`).join('')}</div></div>`;
  const viewer=modelStage.querySelector('.model-viewer'); const objects=[...modelStage.querySelectorAll('.model-object')];
  let active=0, rx=-8, ry=18, zoom=1, dragging=false, lx=0, ly=0;
  const render=()=>{objects.forEach((o,i)=>o.classList.toggle('active',i===active)); viewer.style.setProperty('--rx',rx+'deg');viewer.style.setProperty('--ry',ry+'deg');viewer.style.setProperty('--zoom',zoom);document.querySelector('#modelName').textContent=models[active].name;document.querySelector('#modelDesc').textContent=models[active].desc;};
  const point=e=>e.touches?e.touches[0]:e;
  const down=e=>{dragging=true;const p=point(e);lx=p.clientX;ly=p.clientY;viewer.setPointerCapture?.(e.pointerId);};
  const move=e=>{if(!dragging)return;const p=point(e);ry+=(p.clientX-lx)*.55;rx-=(p.clientY-ly)*.35;lx=p.clientX;ly=p.clientY;render();};
  const up=()=>dragging=false;
  viewer.addEventListener('pointerdown',down);viewer.addEventListener('pointermove',move);viewer.addEventListener('pointerup',up);viewer.addEventListener('pointercancel',up);viewer.addEventListener('pointerleave',up);
  viewer.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(.7,Math.min(1.35,zoom-e.deltaY*.001));render();},{passive:false});
  modelStage.querySelectorAll('.model-dots button').forEach(b=>b.addEventListener('click',()=>{active=+b.dataset.i;rx=-8;ry=18;zoom=1;render();}));
  render();
}
