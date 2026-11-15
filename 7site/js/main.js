// Mobile menu
const toggle=document.querySelector('.nav-toggle'),links=document.querySelector('.nav-links');
toggle.addEventListener('click',()=>{const o=links.classList.toggle('open');toggle.setAttribute('aria-expanded',o)});
links.addEventListener('click',e=>{if(e.target.closest('a')){links.classList.remove('open');toggle.setAttribute('aria-expanded',false)}});

// Toast
const toast=document.createElement('div');toast.className='toast';document.body.appendChild(toast);
function say(t){toast.textContent=t;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2400)}
document.getElementById('gen-form').addEventListener('submit',e=>{
  e.preventDefault();const i=e.target.querySelector('input');
  say(i.value.trim()?'Generating your image…':'Write a prompt first');i.value='';
});

// Count-up stats when visible
const nums=document.querySelectorAll('.stat b');
const io=new IntersectionObserver(es=>es.forEach(en=>{
  if(!en.isIntersecting)return;io.unobserve(en.target);
  const el=en.target,to=+el.dataset.to,dec=+(el.dataset.dec||0),suf=el.dataset.suffix||'',t0=performance.now(),dur=1400;
  (function f(t){const p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);
    el.textContent=(to*e).toFixed(dec)+suf;if(p<1)requestAnimationFrame(f)})(t0);
}),{threshold:.6});
nums.forEach(n=>io.observe(n));

// Gallery: drag to scroll
const tr=document.getElementById('track');let down=false,sx=0,sl=0;
tr.addEventListener('pointerdown',e=>{down=true;sx=e.clientX;sl=tr.scrollLeft;tr.classList.add('drag')});
window.addEventListener('pointerup',()=>{down=false;tr.classList.remove('drag')});
window.addEventListener('pointermove',e=>{if(down)tr.scrollLeft=sl-(e.clientX-sx)});

