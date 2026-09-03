/* Screenshot seed for store captures. Injected into the simulator bundle only
   (ios/App/App/public is gitignored). Each launch reads shotStep and builds a
   deterministic race so the same run yields the same screens. */
(function(){
  const step=parseInt(localStorage.getItem('shotStep')||'0',10);
  const now=Date.now(), M=60000;
  const uid=()=>Math.random().toString(36).slice(2,10);
  const F=['TMF_Offshore','TMF_Inshore','APHT','GPH','APHD'];
  const orc=(tmfO,tmfI,aph,gph,aphd)=>({TMF_Offshore:tmfO,TMF_Inshore:tmfI,APHT:aph,GPH:gph,APHD:aphd});
  const boats=[
    {name:'Kestrel',   sail:'GBR 4471',rating:1.0842,own:true, orc:orc(1.0842,1.0910,1.0876,551.2,4.61)},
    {name:'Blue Note', sail:'IRL 1520',rating:1.1215,own:false,orc:orc(1.1215,1.1302,1.1258,532.9,4.32)},
    {name:'Tempest',   sail:'GBR 9036',rating:0.9887,own:false,orc:orc(0.9887,0.9924,0.9905,603.7,5.51)},
    {name:'Sea Fever', sail:'GBR 7712',rating:1.0330,own:false,orc:orc(1.0330,1.0388,1.0359,578.4,5.05)},
    {name:'Halcyon',   sail:'FRA 2208',rating:1.0611,own:false,orc:orc(1.0611,1.0672,1.0640,563.0,4.83)},
    {name:'Nightjar',  sail:'GBR 8140',rating:0.9541,own:false,orc:orc(0.9541,0.9598,0.9570,626.1,5.86)},
    {name:'Mistral',   sail:'NED 331', rating:1.0157,own:false,orc:orc(1.0157,1.0201,1.0179,589.5,5.25)},
    {name:'Firefly',   sail:'GBR 5599',rating:0.9722,own:false,orc:orc(0.9722,0.9760,0.9741,613.8,5.66)},
  ].map(b=>({id:uid(),...b}));
  const marks=[{name:'Windward',dist:2.1},{name:'Leeward',dist:4.2},{name:'Windward 2',dist:6.3},{name:'Finish',dist:8.4}];
  // Elapsed minutes at each mark per boat; null = not yet rounded.
  const tl={
    'Blue Note':[21.4,39.8,60.5,76.9],'Kestrel':[22.1,41.0,62.3,77.6],'Halcyon':[22.9,42.4,64.1,null],
    'Sea Fever':[23.6,43.9,66.0,null],'Mistral':[24.8,45.7,68.4,null],'Tempest':[25.5,47.3,null,null],
    'Firefly':[26.2,48.8,null,null],'Nightjar':[27.0,null,null,null]};
  const mk=(name,start,rds)=>({id:uid(),name,created:start-30*M,scoring:'tot',marks,boats,start,seq:null,
    roundings:rds,archived:false,orcField:'TMF_Offshore',fleetMode:false,fleets:[]});

  const start=now-78.4*M;
  const rds=[];
  boats.forEach(b=>tl[b.name].forEach((m,i)=>{ if(m!=null) rds.push({id:uid(),boatId:b.id,markIdx:i,t:Math.round(start+m*M),skipped:false}); }));
  const live=mk('Autumn Series — Race 4',start,rds);

  const cd=mk('Autumn Series — Race 5',null,[]); cd.seq={gunAt:now+3*M+12000};

  const fl=JSON.parse(JSON.stringify(live)); fl.id=uid(); fl.name='Round the Island';
  fl.fleetMode=true; fl.fleets=[{id:'c1',name:'Class 1',start:start,seq:null},{id:'c2',name:'Class 2',start:start+10*M,seq:null}];
  fl.boats=fl.boats.map((b,i)=>({...b,fleetId:i<4?'c1':'c2'}));
  fl.roundings=fl.roundings.map(r=>{ const b=fl.boats.find(x=>x.id===r.boatId); return b.fleetId==='c2'?{...r,t:r.t+10*M}:r; });

  const db={races:[live,cd,fl],activeId:live.id};
  const tabs=['race','board','setup','log','race','board'];
  if(step===4) db.activeId=cd.id;
  if(step===5) db.activeId=fl.id;
  localStorage.setItem('roundings.v1',JSON.stringify(db));
  localStorage.setItem('shotStep',String(step+1));
  window.__shotTab=tabs[step]||'race';
})();
