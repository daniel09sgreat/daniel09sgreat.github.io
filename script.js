document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  document.getElementById('year').textContent = y;

  const menuBtn = document.getElementById('menuBtn');
  menuBtn.addEventListener('click', () => {
    const nav = document.querySelector('.nav');
    nav.style.display = (nav.style.display === 'flex') ? '' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.right = '24px';
    nav.style.top = '64px';
    nav.style.background = 'linear-gradient(180deg, rgba(6,7,10,0.96), rgba(10,12,16,0.98))';
    nav.style.padding = '12px';
    nav.style.borderRadius = '10px';
    nav.style.boxShadow = '0 6px 22px rgba(2,6,23,0.7)';
  });

  window.handleForm = function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if(!name || !email || !message) return alert('Please complete the form');
    const subject = encodeURIComponent(`Website contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\nContact email: ${email}`);
    window.location.href = `mailto:daniels4976@gmail.com?subject=${subject}&body=${body}`;
    return false;
  };

  // Canvas animated subtle network lines
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const nodes = [];
  const N = Math.max(12, Math.floor(w/120));
  for(let i=0;i<N;i++){
    nodes.push({
      x: Math.random()*w,
      y: Math.random()*h,
      vx: (Math.random()-0.5)*0.5,
      vy: (Math.random()-0.5)*0.5,
      r: 1 + Math.random()*2
    });
  }

  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }
  addEventListener('resize', resize);

  function frame(){
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<N;i++){
      const a = nodes[i];
      a.x += a.vx; a.y += a.vy;
      if(a.x<0||a.x>w) a.vx *= -1;
      if(a.y<0||a.y>h) a.vy *= -1;
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(102,210,255,0.06)';
      ctx.fill();

      for(let j=i+1;j<N;j++){
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if(d < 160){
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          const alpha = 0.12 * (1 - d/160);
          ctx.strokeStyle = `rgba(102,210,255,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  frame();
});
