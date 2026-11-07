const CACHE='festival-pos-v2-test-1';
const LOCAL=['./','./index.html','./cloud-v2.js','./ui-v2.js','./config.js','./demo-data.json','./manifest.json','./icon-192.png','./icon-512.png'].map(p=>new URL(p,self.registration.scope).href);
const SDK=['https://www.gstatic.com/firebasejs/11.6.1/firebase-app-compat.js','https://www.gstatic.com/firebasejs/11.6.1/firebase-auth-compat.js','https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore-compat.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled([...LOCAL,...SDK].map(u=>c.add(new Request(u,{cache:'reload'}))))));});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('festival-pos-v2-test-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url),path=u.origin+u.pathname;if(!LOCAL.includes(path)&&!SDK.includes(r.url))return;
if(SDK.includes(r.url)){e.respondWith(caches.open(CACHE).then(async c=>(await c.match(r))||fetch(r)));return;}
e.respondWith(fetch(r).then(resp=>{if(resp.ok)caches.open(CACHE).then(c=>c.put(path,resp.clone()));return resp;}).catch(async()=>{const c=await caches.open(CACHE);return await c.match(path)||new Response('Reconnect to load this app file.',{status:503});}));
});
