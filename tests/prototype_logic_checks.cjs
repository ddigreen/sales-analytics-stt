'use strict';

// Run the prototype's actual inline script with minimal document stubs.
// These logic regressions do not launch a browser or exercise a backend.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const html = fs.readFileSync(path.join(__dirname, '..', 'prototype', 'index.html'), 'utf8');
const inlineScript = html.match(/<script>([\s\S]*?)<\/script>/);
assert(inlineScript, 'The prototype must contain its inline application script');
const js = inlineScript[1];
const nodes=new Map();
function node(id){
 if(nodes.has(id))return nodes.get(id);
 const classes=new Set(id==='screen-dashboard'?['screen','active']:id.startsWith('screen-')?['screen']:[]);
 const n={id,value:id==='role'?'reviewer':id.startsWith('dash-')||id.startsWith('calls-')?'all':'',textContent:'',innerHTML:'',style:{},disabled:false,dataset:{},events:{},attributes:{},
 classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x),toggle:(x,b)=>b?classes.add(x):classes.delete(x)},
 setAttribute(k,v){this.attributes[k]=v},removeAttribute(k){delete this.attributes[k]},focus(){this.focused=true},scrollIntoView(){},addEventListener(k,f){this.events[k]=f}};
 nodes.set(id,n);return n;
}
for(const tag of html.matchAll(/<[^>]+\bid="([^"]+)"[^>]*>/g))node(tag[1]).disabled=/\sdisabled(?:\s|>)/.test(tag[0]);
const nav=['dashboard','calls','import'].map(x=>({...node('nav-'+x),dataset:{route:x}}));
const doc={events:{},querySelector:s=>s.startsWith('#')?node(s.slice(1)):null,querySelectorAll:s=>s==='.screen'?['dashboard','calls','detail','import'].map(x=>node('screen-'+x)):s==='.nav button'?nav:[],addEventListener(k,f){this.events[k]=f}};
const context=vm.createContext({document:doc,window:{scrollTo(){}},structuredClone,Intl,Date,console,setTimeout(){return 1},clearTimeout(){}});
vm.runInContext(js+`\nglobalThis.demo={renderDashboard,renderDetail,renderCalls,validateFixture,validTimestamp,localDate,hasObjectionEvidence,objectionReviewLabel,auditForCall,
get calls(){return calls},set calls(x){calls=x},get deals(){return crmDeals},set deals(x){crmDeals=x},fixture,crmFixture,get audit(){return audit},get validImport(){return validImport},set current(x){currentCall=x},get current(){return currentCall},route};`,context);
const d=context.demo,passed=[];
function check(name,fn){
 try {fn();passed.push(name);console.log('PASS '+name)}
 catch(error){console.error('FAIL '+name);throw error}
}
function resetFilters(){for(const id of ['dash-rep','dash-language','dash-date','dash-outcome','calls-status','calls-language'])node(id).value='all'}
function dashboard(filters={}){resetFilters();for(const [key,value] of Object.entries(filters))node('dash-'+key).value=value;d.renderDashboard();return {revenue:node('kpi-revenue').textContent,pipeline:node('kpi-pipeline').textContent,win:node('kpi-win').textContent,ready:node('kpi-ready').textContent,description:node('win-description').textContent,count:node('filter-count').textContent}}
function submit(id,value){d.current=id;node('review-correction').value=value;doc.events.submit({target:{id:'review-form'},preventDefault(){}})}
function click(selector,dataset){doc.events.click({target:{closest(s){return s===selector?{dataset}:null}}})}
function event(id){node(id).events.click()}

check('Initial script compiles and fixture validates',()=>assert.equal(d.validateFixture().length,0));
check('Baseline distinct-deal totals',()=>{const x=dashboard();assert.equal(x.revenue,'$7,300');assert.equal(x.pipeline,'$10,400');assert.equal(x.win,'66.7%');assert.equal(x.ready,'4 / 8')});
check('Close dates are independent of call dates',()=>{let x=dashboard({date:'2026-10-21'});assert.equal(x.revenue,'$7,300');assert.equal(x.ready,'2 / 2');assert.match(x.count,/3 closed deals/);x=dashboard({date:'2026-10-20'});assert.equal(x.revenue,'$0');assert.equal(x.win,'Not available');assert.equal(x.ready,'1 / 3');assert.equal(x.pipeline,'$10,400')});
check('Representative and outcome filters compose',()=>{let x=dashboard({rep:'A'});assert.equal(x.revenue,'$4,200');assert.equal(x.pipeline,'$5,200');assert.equal(x.win,'100.0%');x=dashboard({rep:'B',outcome:'Won'});assert.equal(x.revenue,'$3,100');assert.equal(x.win,'100.0%');assert.equal(x.ready,'1 / 1')});
check('Language cohort and zero denominator behavior',()=>{let x=dashboard({language:'Russian'});assert.equal(x.revenue,'$0');assert.equal(x.win,'0.0%');assert.equal(x.pipeline,'$2,400');x=dashboard({language:'Kazakh'});assert.equal(x.win,'Not available');assert.equal(x.pipeline,'$6,400');x=dashboard({language:'English',date:'2026-10-21'});assert.equal(x.revenue,'$7,300');assert.equal(x.ready,'1 / 1')});
check('All 180 dashboard filter combinations render finite states',()=>{for(const rep of ['all','A','B'])for(const language of ['all','English','Russian','Kazakh','Mixed'])for(const date of ['all','2026-10-20','2026-10-21'])for(const outcome of ['all','Won','Lost','Open']){const x=dashboard({rep,language,date,outcome});assert(!JSON.stringify(x).match(/NaN|Infinity|undefined/));const [ready,total]=x.ready.split(' / ').map(Number);assert(ready<=total)}});
check('CRM deal without a call remains in default sales denominator',()=>{d.deals.push({id:'D-NO-CALL',rep:'A',outcome:'Won',amount:900,currency:'USD',closed_at:'2026-10-21T12:00:00+05:00'});let x=dashboard();assert.equal(x.revenue,'$8,200');assert.equal(x.win,'75.0%');x=dashboard({language:'English'});assert.equal(x.revenue,'$7,300');d.deals=d.deals.filter(x=>x.id!=='D-NO-CALL')});
check('Repeated deal calls and duplicate call IDs do not multiply KPIs',()=>{d.calls.push(structuredClone(d.calls[0]));const x=dashboard();assert.equal(x.revenue,'$7,300');assert.equal(x.ready,'4 / 8');d.calls.pop()});
check('UTC timestamps resolve at Almaty midnight boundary',()=>{assert.equal(d.localDate('2026-10-20T18:59:59Z'),'2026-10-20');assert.equal(d.localDate('2026-10-20T19:00:00Z'),'2026-10-21');assert.equal(d.validTimestamp('2026-10-20T10:00:00'),false)});
check('Missing joins and source-key collisions fail fixture validation',()=>{const c=d.fixture[0],original=c.deal,key=c.external_call_id;c.deal='NOT-A-DEAL';assert(d.validateFixture().some(x=>x.includes('Missing deal')));c.deal=original;c.external_call_id=d.fixture[1].external_call_id;assert(d.validateFixture().some(x=>x.includes('source call identifier')));c.external_call_id=key;assert.equal(d.validateFixture().length,0)});
check('Objection review records only the supported item and escapes text',()=>{submit('C-101','<script>human correction</script>');const c=d.calls.find(x=>x.id==='C-101');assert.equal(c.reviewed,true);assert.equal(c.reviewRevisions.length,1);assert.equal(c.reviewRevision.oldValue,c.objection);assert.match(node('detail-content').innerHTML,/NEXT ACTION · DRAFT/);assert(node('detail-content').innerHTML.includes('&lt;script&gt;human correction&lt;/script&gt;'));assert(!node('detail-content').innerHTML.includes('<script>human correction'))});
check('Empty objection review focuses the field and creates no revision',()=>{const c=d.calls.find(x=>x.id==='C-101'),before=c.reviewRevisions.length;submit(c.id,'   ');assert.equal(c.reviewRevisions.length,before);assert.equal(node('review-correction').focused,true);assert.match(node('toast').textContent,/Enter a reviewed interpretation/)});
check('Review does not invent an objection with no supporting evidence',()=>{submit('C-107','Invented objection');assert(!d.calls.find(x=>x.id==='C-107').reviewed);d.current='C-107';d.renderDetail();assert.match(node('detail-content').innerHTML,/No supporting objection evidence/)});
check('Review trail is isolated by call',()=>{submit('C-102','Cannot start this quarter.');assert.equal(d.auditForCall('C-101').length,1);assert.equal(d.auditForCall('C-102').length,1);d.current='C-102';d.renderDetail();assert(!node('detail-content').innerHTML.includes('C-101: reviewer saved'))});
check('An unchanged interpretation is reviewed, not labeled corrected',()=>{submit('C-103',d.calls.find(x=>x.id==='C-103').objection);assert.equal(d.objectionReviewLabel(d.calls.find(x=>x.id==='C-103')),'Objection reviewed')});
check('Missing evidence blocks saves and next-action rendering remains safe',()=>{const c=d.calls[0],ob=c.evidence,next=c.nextEvidence;c.evidence=999;c.nextEvidence=999;const old=c.reviewRevisions.length;d.current=c.id;d.renderDetail();submit(c.id,'unsupported');assert.equal(c.reviewRevisions.length,old);assert.match(node('detail-content').innerHTML,/Missing source evidence/);c.evidence=ob;c.nextEvidence=next});
check('Viewer handler guards prevent review/import/retry mutations',()=>{node('role').value='viewer';const before=d.calls[0].reviewRevisions.length;submit('C-101','viewer change');assert.equal(d.calls[0].reviewRevisions.length,before);const disabled=node('map-call').disabled;event('load-sample');assert.equal(node('map-call').disabled,disabled);click('[data-retry]',{retry:'C-104'});assert.equal(d.calls.find(x=>x.id==='C-104').status,'failed');node('role').value='reviewer'});
check('Failed job retries once into queue without changing CRM facts',()=>{d.current='C-104';const before=d.deals.find(x=>x.id==='D-104').outcome;click('[data-retry]',{retry:'C-104'});assert.equal(d.calls.find(x=>x.id==='C-104').status,'queued');const count=d.audit.length;click('[data-retry]',{retry:'C-104'});assert.equal(d.audit.length,count);assert.equal(d.deals.find(x=>x.id==='D-104').outcome,before)});
check('Invalid mappings block application and mapping changes clear validation',()=>{event('load-sample');node('map-call').value='wrong';node('map-deal').value='deal_id';event('validate-sample');assert.equal(d.validImport,false);assert.equal(node('apply-sample').disabled,true);node('map-call').value='call_id';event('validate-sample');assert.equal(d.validImport,true);node('map-deal').events.change();assert.equal(d.validImport,false);assert.equal(node('apply-sample').disabled,true)});
check('A failed revalidation cannot retain stale valid-import state',()=>{node('map-deal').value='deal_id';event('validate-sample');assert.equal(d.validImport,true);const original=d.fixture[0].recorded_at;d.fixture[0].recorded_at='2026-10-21T10:00:00';event('validate-sample');assert.equal(d.validImport,false);node('role').events.change();assert.equal(node('apply-sample').disabled,true);d.fixture[0].recorded_at=original;event('validate-sample');assert.equal(d.validImport,true)});
check('Fixture reapplication clears edits and trails without duplicates',()=>{event('apply-sample');assert.equal(d.calls.length,8);assert.equal(d.deals.length,7);assert(!d.calls.some(x=>x.reviewed));assert.equal(d.auditForCall('C-101').length,0);event('apply-sample');assert.equal(d.calls.length,8);assert.equal(d.deals.length,7);assert.equal(d.audit.length,1);assert.equal(d.calls.find(x=>x.id==='C-104').status,'failed')});
check('Reset restores filters and import state',()=>{event('reset-demo');assert.equal(d.validImport,false);assert.equal(d.audit.length,0);assert.equal(node('map-call').disabled,true);assert.equal(node('dash-language').value,'all')});
check('Narrow-screen CSS keeps illustrated role control available',()=>{assert(!html.includes('.side-note,.side-bottom{display:none}'));assert(html.includes('.side-bottom{margin-top:0;max-width:250px}'))});

console.log(`\n${passed.length} prototype logic checks passed, including 180 dashboard filter combinations.`);
console.log('This run does not verify browser layout, server permissions or speech accuracy.');
