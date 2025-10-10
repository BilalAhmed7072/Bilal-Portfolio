// main.js - simple interactions
document.addEventListener('DOMContentLoaded', function(){
  // nav links smooth scroll if on same page
  document.querySelectorAll('a[data-scroll]').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const id = a.getAttribute('href');
      if(document.querySelector(id)){
        document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
      } else {
        window.location = a.href;
      }
    });
  });

  // simple fade-in on scroll
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting){ ent.target.classList.add('reveal'); }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.card, .section, .avatar-card, .event').forEach(el=>obs.observe(el));
});