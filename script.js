import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
const trigger=document.querySelector(".menu-trigger"),panel=document.querySelector(".menu-panel");
if(trigger&&panel){trigger.addEventListener("click",()=>{const open=panel.classList.toggle("open");trigger.classList.toggle("open",open);trigger.setAttribute("aria-expanded",String(open));panel.setAttribute("aria-hidden",String(!open));document.body.style.overflow=open?"hidden":""});panel.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{panel.classList.remove("open");trigger.classList.remove("open");document.body.style.overflow=""}))}
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")}),{threshold:.1});
document.querySelectorAll(".manifesto,.editorial-image,.day-section,.weekly,.location-tease,.final-cta").forEach(el=>{el.classList.add("reveal");observer.observe(el)});
const canvas=document.querySelector("#scene3d");
if(canvas){
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,.1,100);
 camera.position.set(0,0,8.5);
 const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;
 const group=new THREE.Group();scene.add(group);
 const red=new THREE.MeshPhysicalMaterial({color:0x9e261c,metalness:.78,roughness:.18,clearcoat:1,clearcoatRoughness:.1});
 const knot=new THREE.Mesh(new THREE.TorusKnotGeometry(1.65,.43,220,32,2,3),red);group.add(knot);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(2.5,.025,12,180),new THREE.MeshBasicMaterial({color:0xef4938,transparent:true,opacity:.75}));group.add(ring);
 const ring2=new THREE.Mesh(new THREE.TorusGeometry(3.15,.012,10,160),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.18}));ring2.rotation.x=Math.PI/2.7;group.add(ring2);
 for(let i=0;i<60;i++){const p=new THREE.Mesh(new THREE.SphereGeometry(.018+Math.random()*.035,8,8),new THREE.MeshBasicMaterial({color:0xddd8ce}));const a=Math.random()*Math.PI*2,r=3+Math.random()*2.8;p.position.set(Math.cos(a)*r,(Math.random()-.5)*4,Math.sin(a)*r-1);scene.add(p)}
 const l1=new THREE.PointLight(0xef4938,18,15);l1.position.set(3,3,4);scene.add(l1);
 const l2=new THREE.PointLight(0xffffff,10,13);l2.position.set(-4,-1,3);scene.add(l2);scene.add(new THREE.AmbientLight(0xffffff,1.3));
 let tx=0,ty=0,cx=0,cy=0;
 addEventListener("pointermove",e=>{tx=(e.clientX/innerWidth-.5)*2;ty=(e.clientY/innerHeight-.5)*2});
 addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
 function animate(t){requestAnimationFrame(animate);cx+=(tx-cx)*.035;cy+=(ty-cy)*.035;group.rotation.y=t*.00018+cx*.28;group.rotation.x=cy*.16;group.rotation.z=Math.sin(t*.00025)*.08;ring.rotation.z=t*.00018;ring2.rotation.z=-t*.0001;camera.position.x+=(cx*.42-camera.position.x)*.02;camera.position.y+=(-cy*.25-camera.position.y)*.02;renderer.render(scene,camera)}
 animate(0);
}