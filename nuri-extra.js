/* nuri-extra.js — Nurinetworks extra interactions */

/* MASCOT JUMP CYCLE: 2초마다 불독하트가 카드 이동 */
(function(){
var whyObs=new IntersectionObserver(function(entries){
entries.forEach(function(e){
if(e.isIntersecting){
var mascots=document.querySelectorAll('.why-mascot');
if(mascots.length===0)return;
var idx=0;
function jumpNext(){
mascots.forEach(function(m){m.classList.remove('active');});
mascots[idx].classList.add('active');
idx=(idx+1)%mascots.length;
}
jumpNext();
setInterval(jumpNext,2000);
whyObs.unobserve(e.target);
}
});
},{threshold:0.2});
var whySec=document.getElementById('about');
if(whySec)whyObs.observe(whySec);
})();

/* COMING SOON POPUP: 인스타/유튜브 오픈대기중 */
function showComingSoon(name){
var overlay=document.createElement('div');
overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(4px);';
overlay.onclick=function(){document.body.removeChild(overlay);};
var box=document.createElement('div');
box.style.cssText='background:#fff;border-radius:24px;padding:40px 48px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.2);max-width:320px;';
box.innerHTML='<img src="mascot-heart.png" style="width:80px;height:80px;object-fit:contain;margin-bottom:16px;animation:mascotPopBounce 1s ease infinite;" alt=""><div style="font-size:1.2rem;font-weight:800;color:#1d1d1f;">'+name+'</div><div style="font-size:1.4rem;font-weight:800;color:#1B3A8C;margin-top:8px;">오픈 대기중입니다</div>';
overlay.appendChild(box);
document.body.appendChild(overlay);
box.style.animation='popInAnim .4s cubic-bezier(.34,1.56,.64,1)';
}

/* Add CSS animations dynamically */
(function(){
var style=document.createElement('style');
style.textContent='@keyframes popInAnim{0%{transform:scale(0.5);opacity:0}100%{transform:scale(1);opacity:1}}@keyframes mascotPopBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}';
document.head.appendChild(style);
})();
