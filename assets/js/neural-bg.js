// neural-bg.js - lightweight neural network style background
(function(){
  const canvas = document.getElementById('neural-bg');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const nodes = [];
  const NODE_COUNT = Math.floor((w*h)/90000) + 20; // scales with screen
  for(let i=0;i<NODE_COUNT;i++){
    nodes.push({
      x: Math.random()*w,
      y: Math.random()*h,
      vx: (Math.random()-0.5)*0.2,
      vy: (Math.random()-0.5)*0.2,
      r: 0.8 + Math.random()*1.8
    });
  }
  function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
  addEventListener('resize', resize);
  function step(){
    ctx.clearRect(0,0,w,h);
    // draw lines
    for(let i=0;i<nodes.length;i++){
      const a = nodes[i];
      for(let j=i+1;j<nodes.length;j++){
        const b = nodes[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const d = Math.hypot(dx,dy);
        if(d<160){
          const alpha = 0.15*(1 - d/160);
          ctx.strokeStyle = 'rgba(108,99,255,'+ (alpha*0.9) +')';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    // draw nodes
    for(let n of nodes){
      n.x += n.vx; n.y += n.vy;
      if(n.x<0||n.x>w) n.vx *= -1;
      if(n.y<0||n.y>h) n.vy *= -1;
      ctx.beginPath();
      const grad = ctx.createRadialGradient(n.x,n.y,n.r,n.x,n.y,n.r*6);
      grad.addColorStop(0,'rgba(0,245,212,0.9)');
      grad.addColorStop(1,'rgba(108,99,255,0.02)');
      ctx.fillStyle = grad;
      ctx.fillRect(n.x-n.r*6, n.y-n.r*6, n.r*12, n.r*12);
    }
    requestAnimationFrame(step);
  }
  step();
})();