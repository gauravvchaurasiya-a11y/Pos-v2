const fs=require('fs'),crypto=require('crypto');
const clean=x=>Object.fromEntries(Object.entries(x).filter(([k])=>!['_u','_by'].includes(k)));
const paise=x=>Math.round(Number(x)*100);
function build(source){
 const s=structuredClone(source),docs={},stock={},catalog={};let used=0;
 for(const c of ['products','categories','customers','sales','movements'])if(!Array.isArray(s[c]))throw Error('Missing collection '+c);
 const {adminPass,cashierPin,...settings}=clean(s.settings);for(const sale of s.sales){const m=String(sale.invNo).match(/(\d+)$/);if(m)used=Math.max(used,Number(m[1]));}
 const nextSeq=Math.max(Number(settings.invSeq)||1,used+1);settings.invSeq=nextSeq;
 for(const c of ['products','categories','customers','sales','movements']){const ids=new Set();for(const raw of s[c]){const x=clean(raw);if(!x.id||typeof x.id!=='string'||x.id.includes('/')||ids.has(x.id))throw Error('Invalid duplicate ID in '+c);ids.add(x.id);
 if(c==='products'){if(!Number.isSafeInteger(x.stock)||x.stock<0)throw Error('Invalid stock '+x.id);stock[x.id]=x.stock;catalog[x.id]={name:x.name,sku:x.sku,active:!!x.active,moq:x.moq,retailPaise:paise(x.retail),wholesalePaise:paise(x.wholesale),discType:x.discType,discPaise:paise(x.discVal),discBp:Math.round(x.discVal*100),taxBp:Math.round(x.gst*100)};const {stock:unused,...metadata}=x;docs['products/'+x.id]=metadata;}
 else if(c==='customers'){const {id,discPct,created,...profile}=x;docs['customers/'+id]={profile,discPct,discBp:Math.round(discPct*100),created};}
 else docs[(c==='sales'?'legacySales':c)+'/'+x.id]=x;
 }}
 const state={config:settings,catalog,stock,nextSeq,lastSaleId:'',version:1};if(Buffer.byteLength(JSON.stringify(state))>900000)throw Error('Control document too large');docs['control/state']=state;
 return {docs,summary:{products:s.products.length,categories:s.categories.length,customers:s.customers.length,legacySales:s.sales.length,movements:s.movements.length,nextSeq,controlBytes:Buffer.byteLength(JSON.stringify(state))},sourceHash:crypto.createHash('sha256').update(JSON.stringify(source)).digest('hex')};
}
module.exports={build};
if(require.main===module){const source=JSON.parse(fs.readFileSync(process.argv[2],'utf8')),r=build(source);fs.writeFileSync(process.argv[3],JSON.stringify(r,null,2));console.log(JSON.stringify(r.summary));console.log('Private migration plan saved. It was not uploaded.');}
