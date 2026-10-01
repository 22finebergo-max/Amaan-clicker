/* Amaan Clicker — game engine */
(function(){
'use strict';
var $=function(id){return document.getElementById(id)};
var now=function(){return Date.now()};
var KEY='amaan-clicker-v2',OLDKEY='amaan-clicker-v1';
var SUF=['','K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','Dc','UDc','DDc','TDc','QaDc','QiDc','SxDc','SpDc','OcDc','NoDc','Vg'];

/* ================= CONTENT ================= */
var BUILD=[
{id:'cc',n:'Class Clown',d:'Amaan tells one more joke.',c:15,v:0.5},
{id:'yb',n:'Yearbook Photo',d:'Front page, tongue out.',c:100,v:3},
{id:'pb',n:'Prefect Badge',d:'Authority, with specs.',c:1100,v:15},
{id:'ts',n:'Tuck Shop',d:'Amaan-brand snacks.',c:12000,v:80},
{id:'fc',n:'School Fan Club',d:'Meets Tuesdays. Also Thursdays.',c:130000,v:450},
{id:'ah',n:'Assembly Hall',d:'Every assembly is now about Amaan.',c:1.4e6,v:2600},
{id:'af',n:'Amaan Factory',d:'Industrial-grade Amaans.',c:2e7,v:15000},
{id:'fm',n:'Amaan FM',d:'All Amaan, all day.',c:3.3e8,v:1e5},
{id:'tp',n:'Amaan Theme Park',d:'The queue is the ride.',c:5.1e9,v:6.5e5},
{id:'sat',n:'Amaan Satellite',d:'Beaming the tongue to space.',c:7.5e10,v:4.3e6},
{id:'ad',n:'Amaan Dimension',d:'A whole plane of Amaan.',c:1e12,v:3e7},
{id:'tm',n:'Amaan Time Machine',d:'Amaans from last Tuesday.',c:1.4e13,v:2.1e8},
{id:'mv',n:'Amaan Multiverse',d:'Every Amaan at once.',c:1.7e14,v:1.5e9},
{id:'sg',n:'Amaan Singularity',d:'Dense with Amaan.',c:2.1e15,v:1.1e10,req:function(){return !!S.tro.sgl||S.halo>=1}},
{id:'idea',n:'The Amaan Idea',d:'Not a thing. A concept.',c:2.6e16,v:8e10,req:function(){return S.halo>=1}},
{id:'him',n:'Amaan Himself',d:'He has arrived.',c:3.1e17,v:6e11,req:function(){return S.halo>=2}}
];
var TIER_AT=[1,5,25,50,100,150,200,250,300],TIER_COST=[10,50,500,5e4,5e6,5e8,5e10,5e12,5e14];
var TIER_NAMES={
cc:['Whoopee Cushion','Rubber Chicken','Knock-Knock Archive','Fake Moustache','Stand-Up Set','Pratfall Training','Comedy Special','Streaming Deal','Clown Prince'],
yb:['Better Lighting','Retake Day','Glossy Paper','Full-Page Spread','Signed Copies',"Collector's Edition",'Yearbook Museum','Holographic Print','Portrait Hall'],
pb:['Shinier Pin','Lanyard','Clipboard','Head Prefect','Whistle Privileges','Corridor Authority','Prefect Council','Golden Badge','Supreme Prefect'],
ts:['Fizzy Amaans','Sherbet Stock','Meal Deal','Loyalty Card','Second Counter','Vending Machine','Franchise','Drive-Thru','Michelin Star'],
fc:['Membership Cards','Fan Mail','Matching Hoodies','Chant Practice','Fan Convention','Merch Table','International Chapter','Fan Fiction Wing','Devoted Masses'],
ah:['Better Speakers','Spotlight','Velvet Curtain','Encore Policy','Stadium Seating','Pyrotechnics','Jumbotron','Arena Tour','Eternal Assembly'],
af:['Conveyor Belts','Night Shift','Quality Control','Robot Arms','Second Plant','Export Licence','Automated Everything','Orbital Factory','Infinite Assembly Line'],
fm:['Stronger Signal','Jingle Pack','Morning Show','Request Line','Podcast Spin-off','Satellite Radio','Global Frequency','Subliminal Hour','The Only Station'],
tp:['Faster Queue','Log Flume','Tongue Coaster','Candy Floss Stand','Night Opening','Second Park','Water Park','Space Park','Park of Parks'],
sat:['Bigger Dish','Solar Panels','Second Orbit','Laser Uplink','Satellite Swarm','Moon Base','Mars Relay','Dyson Specs','Galactic Broadcast'],
ad:['Stable Portal','Return Ticket','Pocket Dimension','Mirror Realm','Dimension Hopping','Nested Dimensions','Dimension Mall','Dimension Highway','All Dimensions'],
tm:['Fresh Batteries','Flux Something','Paradox Insurance','Tuesday Loop','Century Skip','Era Harvest','Timeline Merge','Clockwork Core','Eternal Now'],
mv:['Branch Pruning','Multiverse Map','Parallel Amaans','Universe Swap','Infinite Variants','Multiverse Council','Reality Fork','Omniverse Access','Every Possibility'],
sg:['Event Horizon','Denser Core','Gravity Assist','Hawking Grin','Black Hole Snack','Quasar Jet','Singularity Pair','Cosmic Hum','Final Collapse'],
idea:['Clearer Thought','Eureka','Thought Experiment','Shared Dream','Collective Idea','Memetic Spread','Platonic Form','Universal Truth','The Idea Itself'],
him:['Firm Handshake','Eye Contact','Approving Nod','Photo Op','Personal Visit','Lifelong Friend',"Amaan's Blessing",'Amaan Ascendant','Amaan Forever']
};
var CLICKUP=[
{id:'t',n:'Longer Tongue',v:1,c:15},{id:'g',n:'Googly Specs',v:5,c:250},{id:'b',n:'Blazer Polish',v:30,c:4000},
{id:'s',n:'Assembly Stage',v:200,c:60000},{id:'mg',n:'Megaphone',v:1500,c:9e5},{id:'sp',n:'Signature Pose',v:12000,c:1.4e7},
{id:'hf',n:'Hall of Fame Photo',v:1e5,c:2e8},{id:'st',n:'Amaan Statue',v:1e6,c:3e9},{id:'mn',n:'Amaan Monument',v:1e7,c:4.5e10}
];
function own(id){return S.o[id]||0}
var UP=[
// click multipliers
{id:'dbl',n:'Double Tap',d:'Clicks ×2.',c:500,k:'click',v:2,r:function(){return S.clicks>=50}},
{id:'fg',n:'Finger Gym',d:'Clicks ×2.',c:25000,k:'click',v:2,r:function(){return S.clicks>=500}},
{id:'cti',n:'Carpal Tunnel Insurance',d:'Clicks ×2.',c:2e6,k:'click',v:2,r:function(){return S.clicks>=2000}},
{id:'ah2',n:'Autograph Hand',d:'Clicks ×2.',c:2.5e8,k:'click',v:2,r:function(){return S.clicks>=5000}},
{id:'tt',n:'Thunder Thumbs',d:'Clicks ×2.',c:5e10,k:'click',v:2,r:function(){return S.clicks>=10000}},
{id:'mol',n:'Mouse of Legends',d:'Clicks ×2.',c:1e13,k:'click',v:2,r:function(){return S.clicks>=25000}},
{id:'gh',n:'God Hand',d:'Clicks ×2.',c:1e16,k:'click',v:2,r:function(){return S.clicks>=50000}},
// cps to click
{id:'ph',n:"Prefect's Handshake",d:'Each click also earns 1% of your amaans per second.',c:50000,k:'pct',v:.01,r:function(){return own('pb')>=10}},
{id:'tpet',n:"Teacher's Pet",d:'Each click also earns 2% of amaans per second.',c:1e7,k:'pct',v:.02,r:function(){return S.t>=1e7}},
{id:'hfav',n:"Headteacher's Favourite",d:'Each click also earns 3% of amaans per second.',c:1e10,k:'pct',v:.03,r:function(){return S.t>=1e10}},
{id:'bless',n:"Amaan's Autograph",d:'Each click also earns 4% of amaans per second.',c:1e14,k:'pct',v:.04,r:function(){return S.t>=1e14}},
// global production
{id:'ma',n:'Morning Assembly',d:'All production +10%.',c:10000,k:'glob',v:.10,r:function(){return S.t>=5000}},
{id:'stp',n:'School Trip',d:'All production +10%.',c:1e6,k:'glob',v:.10,r:function(){return S.t>=5e5}},
{id:'sd',n:'Sports Day',d:'All production +15%.',c:1e8,k:'glob',v:.15,r:function(){return S.t>=5e7}},
{id:'pn',n:'Prom Night',d:'All production +20%.',c:1e10,k:'glob',v:.20,r:function(){return S.t>=5e9}},
{id:'rn',n:'School Reunion',d:'All production +25%.',c:1e12,k:'glob',v:.25,r:function(){return S.t>=5e11}},
{id:'doc',n:'Amaan: The Documentary',d:'All production +30%.',c:1e14,k:'glob',v:.30,r:function(){return S.t>=5e13}},
{id:'bio',n:'The Biopic',d:'All production +40%.',c:1e16,k:'glob',v:.40,r:function(){return S.t>=5e15}},
{id:'stat',n:'Statue in the Town Square',d:'All production +50%.',c:1e18,k:'glob',v:.50,r:function(){return S.t>=5e17}},
{id:'rel',n:'Amaanism',d:'All production +100%.',c:1e21,k:'glob',v:1,r:function(){return S.t>=5e20}},
{id:'lgd',n:'Living Legend',d:'All production +150%.',c:1e25,k:'glob',v:1.5,r:function(){return S.t>=5e24}},
// golden
{id:'lc',n:'Lucky Charm',d:'Golden Amaans appear 25% more often.',c:1e6,k:'gold',v:1.25,r:function(){return S.gold>=1}},
{id:'gs',n:'Glitter Specs',d:'Golden Amaan effects last 50% longer.',c:1e8,k:'gdur',v:1.5,r:function(){return S.gold>=5}},
{id:'flb',n:'Four-Leaf Blazer',d:'Golden Amaans appear 25% more often and stay 50% longer.',c:1e11,k:'gold',v:1.25,r:function(){return S.gold>=15}},
{id:'gold2',n:'Midas Tongue',d:'Golden Amaans appear twice as often.',c:1e15,k:'gold',v:2,r:function(){return S.gold>=40}},
// combo
{id:'hh',n:'Hot Hands',d:'Combo decays 50% slower.',c:1e5,k:'combo',r:function(){return S.maxHeat>=100}},
{id:'cm',n:'Combo Master',d:'Max combo bonus raised to ×3.',c:1e8,k:'combo',r:function(){return S.fevers>=5}},
{id:'rh',n:'Rhythm',d:'Each click builds 50% more combo.',c:1e10,k:'combo',r:function(){return S.fevers>=20}},
{id:'cm2',n:'Combo Legend',d:'Max combo bonus raised to ×5.',c:1e13,k:'combo',r:function(){return S.fevers>=50}},
// crit
{id:'lf',n:'Lucky Flick',d:'5% chance a click crits for ×5.',c:1e5,k:'crit',r:function(){return S.clicks>=300}},
{id:'ct',n:'Critical Tongue',d:'Crit chance +5%.',c:1e9,k:'crit',r:function(){return S.crits>=20}},
{id:'mc',n:'Mega Crit',d:'Crits deal ×10 instead of ×5.',c:1e12,k:'crit',r:function(){return S.crits>=200}},
{id:'cc3',n:'Crit Cascade',d:'Crit chance +10%.',c:1e15,k:'crit',r:function(){return S.crits>=1000}},
// offline
{id:'hd',n:'Homework Diary',d:'Offline earnings rate 50% → 75%.',c:1e7,k:'off',r:function(){return S.t>=1e6}},
{id:'hd2',n:'Alarm Clock',d:'Offline earnings cap 8h → 24h.',c:1e11,k:'off',r:function(){return S.offTot>0}},
// synergies [building, per building, pct]
{id:'sy1',n:'Clown College',d:'Class Clowns +3% per Assembly Hall.',c:1e8,k:'syn',a:'cc',b:'ah',v:.03,r:function(){return own('ah')>=15}},
{id:'sy2',n:'Radio Ads',d:'Tuck Shops +3% per Amaan FM.',c:1e10,k:'syn',a:'ts',b:'fm',v:.03,r:function(){return own('fm')>=15}},
{id:'sy3',n:'Park Merch',d:'Fan Clubs +3% per Theme Park.',c:1e12,k:'syn',a:'fc',b:'tp',v:.03,r:function(){return own('tp')>=15}},
{id:'sy4',n:'Live Broadcast',d:'Yearbook Photos +5% per Satellite.',c:1e13,k:'syn',a:'yb',b:'sat',v:.05,r:function(){return own('sat')>=15}},
{id:'sy5',n:'Dimensional Prefects',d:'Prefect Badges +5% per Dimension.',c:1e15,k:'syn',a:'pb',b:'ad',v:.05,r:function(){return own('ad')>=15}},
{id:'sy6',n:'Factory Time',d:'Factories +5% per Time Machine.',c:1e17,k:'syn',a:'af',b:'tm',v:.05,r:function(){return own('tm')>=15}}
];
// tier upgrades generated
BUILD.forEach(function(b){TIER_AT.forEach(function(at,i){UP.push({id:'T_'+b.id+'_'+i,n:TIER_NAMES[b.id][i],d:b.n+' production ×2.',c:b.c*TIER_COST[i],k:'tier',bid:b.id,ti:i,tag:b.n,r:(function(bid,at){return function(){return own(bid)>=at}})(b.id,at)})})});
var UPMAP={};UP.forEach(function(u){UPMAP[u.id]=u});

var STK=[
{id:'hs',n:'Head Start',d:'Begin every Rebirth with 10 Class Clowns.',c:3},
{id:'pm',n:'Pocket Money',d:'Begin every Rebirth with 500 amaans per Gold Star earned this cycle.',c:5},
{id:'sf1',n:'Sticky Fingers',d:'Clicks ×1.5.',c:8},
{id:'gm',n:'Golden Memory',d:'Golden Amaans appear 25% more often.',c:12},
{id:'rt',n:'Remembered Tricks',d:'Keep Click power upgrades through Rebirth.',c:20},
{id:'lm1',n:'Lunch Money',d:'Buildings cost 5% less.',c:20},
{id:'tl',n:"Teacher's Lounge",d:'Unlock the Challenges tab.',c:30},
{id:'at1',n:'Auto-Tongue',d:'Amaan clicks himself once per second.',c:40},
{id:'rc1',n:'Report Card',d:'Earn 25% more Gold Stars.',c:60},
{id:'sp1',n:'Star Power',d:'Each Gold Star gives +12% instead of +10%.',c:100},
{id:'sf2',n:'Sticky Fingers II',d:'Clicks ×2.',c:150,req:'sf1'},
{id:'tc',n:'Time Capsule',d:'Offline earnings ×2.',c:200},
{id:'lm2',n:'Lunch Money II',d:'Buildings cost another 5% less.',c:200,req:'lm1'},
{id:'at2',n:'Auto-Tongue II',d:'Auto-clicks 5 times per second.',c:300,req:'at1'},
{id:'hs2',n:'Head Start II',d:'Begin every Rebirth with 10 of each of the first 4 buildings.',c:400,req:'hs'},
{id:'hp',n:'Hall Pass',d:'Unlock Graduation.',c:500},
{id:'rc2',n:'Report Card II',d:'Earn another 25% more Gold Stars.',c:600,req:'rc1'},
{id:'sp2',n:'Star Power II',d:'Each Gold Star gives +15%.',c:1000,req:'sp1'},
{id:'kt',n:'Permanent Record',d:'Keep the first two tier upgrades of every building through Rebirth.',c:1500},
{id:'at3',n:'Auto-Tongue III',d:'Auto-clicks 20 times per second.',c:2500,req:'at2'},
{id:'lm3',n:'Lunch Money III',d:'Buildings cost another 10% less.',c:3000,req:'lm2'},
{id:'rc3',n:'Report Card III',d:'Earn another 50% more Gold Stars.',c:5000,req:'rc2'}
];
var TRO=[
{id:'ap',n:'Autopilot',d:'Automatically buys the cheapest affordable building every 2 seconds.',c:1},
{id:'sch',n:'Scholarship',d:'Begin every Rebirth with 100 Gold Stars per Diploma earned this cycle.',c:2},
{id:'gl',n:'Golden Lecture',d:'Golden Amaan effects last twice as long.',c:2},
{id:'sgl',n:'Singularity Lab',d:'Unlock the Amaan Singularity building.',c:3},
{id:'au',n:'Auto-Upgrades',d:'Automatically buys affordable upgrades every 3 seconds.',c:4},
{id:'hon',n:'Honours',d:'Gold Stars ×2.',c:5},
{id:'cth',n:'Click Thesis',d:'Each click also earns 10% of amaans per second.',c:6},
{id:'an',n:'Alumni Network',d:'Keep the Sticker Book through Graduation.',c:10},
{id:'fch',n:'First Class Honours',d:'Gold Stars ×2 again.',c:15},
{id:'dd',n:'Double Major',d:'Diplomas ×1.5.',c:20},
{id:'lt',n:'Legacy Tie',d:'Unlock Transcendence.',c:25},
{id:'pf',n:'Professor',d:'All production ×2.',c:30},
{id:'ta',n:'Tenure',d:'Keep all one-time upgrades through Rebirth.',c:40}
];
var HALO_MS=[
{h:1,d:'Unlock The Amaan Idea. Autopilot and Auto-Upgrades are kept forever.'},
{h:2,d:'Unlock Amaan Himself. The Trophy Cabinet is kept through Transcendence.'},
{h:3,d:'Golden Amaans appear twice as often. Challenge rewards doubled.'},
{h:5,d:'Each click also earns 25% of amaans per second.'},
{h:8,d:'All production ×10.'},
{h:13,d:'Amaan has become myth. All production ×10 again. You win, probably.'}
];
var CHAL=[
{id:'sil',n:'Silent Study',d:'Clicking earns nothing.',g:1e9,rw:'Buildings +20% per completion'},
{id:'det',n:'Detention',d:'Buildings produce nothing.',g:1e7,rw:'Clicks +50% per completion'},
{id:'inf',n:'Inflation',d:'Buildings cost 5× more.',g:1e10,rw:'Buildings cost 4% less per completion'},
{id:'ecl',n:'Eclipse',d:'No Golden Amaans appear.',g:1e11,rw:'Golden Amaans +20% more often per completion'},
{id:'shs',n:'Shortsighted',d:'Tier upgrades cannot be bought.',g:1e10,rw:'All production +25% per completion'},
{id:'spd',n:'Speedrun',d:'Reach the goal within 10 minutes or fail.',g:1e9,rw:'Gold Stars +30% per completion'}
];
var ACH=[];
function A(cat,id,n,d,f,secret){ACH.push({cat:cat,id:id,n:n,d:d,f:f,s:!!secret})}
[[100,'Pocket Change'],[1e4,'Lunch Money'],[1e6,'Millionaire'],[1e8,'Big Amaan'],[1e10,'Tenfold Legend'],[1e12,'Trillionaire'],[1e14,'Beyond Counting'],[1e16,'Quadrillions'],[1e18,'Quintillions'],[1e21,'Sextillions'],[1e24,'Septillions'],[1e27,'Octillions'],[1e30,'Nonillions'],[1e36,'Undecillions'],[1e42,'Tredecillions'],[1e50,'Fifty Zeroes']].forEach(function(x,i){A('Amaans earned','e'+i,x[1],'Earn '+fmtS(x[0])+' amaans in total.',function(){return S.t>=x[0]})});
[[10,'Tap Tap'],[100,'Warmed Up'],[1000,'Clicker'],[1e4,'Finger Athlete'],[1e5,'Carpal Hero'],[1e6,'One Million Clicks']].forEach(function(x,i){A('Clicking','c'+i,x[1],'Click Amaan '+x[0].toLocaleString()+' times.',function(){return S.clicks>=x[0]})});
BUILD.forEach(function(b){[[1,''],[50,' Collector'],[150,' Tycoon']].forEach(function(x,i){A('Buildings','b'+b.id+i,b.n+x[1],'Own '+x[0]+' '+b.n+(x[0]>1?'s':'')+'.',function(){return own(b.id)>=x[0]})})});
[[1,'Shiny'],[10,'Lucky Streak'],[50,'Gold Rush'],[200,'Midas']].forEach(function(x,i){A('Golden Amaans','g'+i,x[1],'Click '+x[0]+' Golden Amaan'+(x[0]>1?'s':'')+'.',function(){return S.gold>=x[0]})});
A('Combo','f0','Fever Pitch','Fill the combo bar to 100%.',function(){return S.fevers>=1});
A('Combo','f1','Hot Streak','Reach FEVER 100 times.',function(){return S.fevers>=100});
A('Combo','k0','Critical Hit','Land your first crit.',function(){return S.crits>=1});
A('Combo','k1','Critical Mass','Land 1,000 crits.',function(){return S.crits>=1000});
[[1,'Born Again'],[5,'Serial Rebirther'],[25,'Cycle of Life'],[100,'Eternal Return']].forEach(function(x,i){A('Rebirth','r'+i,x[1],'Rebirth '+x[0]+' time'+(x[0]>1?'s':'')+'.',function(){return S.rb>=x[0]})});
[[10,'Gold Star Pupil'],[100,'Star Student'],[1000,'Constellation'],[1e4,'Galaxy'],[1e5,'Supercluster']].forEach(function(x,i){A('Rebirth','s'+i,x[1],'Earn '+x[0].toLocaleString()+' Gold Stars in total.',function(){return S.starsAll>=x[0]})});
[[1,'Graduate'],[5,'Serial Student'],[20,'Lifelong Learner']].forEach(function(x,i){A('Prestige','gr'+i,x[1],'Graduate '+x[0]+' time'+(x[0]>1?'s':'')+'.',function(){return S.gr>=x[0]})});
[[1,'Certified'],[10,'Well Qualified'],[50,'Over-Qualified']].forEach(function(x,i){A('Prestige','d'+i,x[1],'Earn '+x[0]+' Diploma'+(x[0]>1?'s':'')+' in total.',function(){return S.dipAll>=x[0]})});
[[1,'Transcendent'],[3,'Holy Trinity'],[8,'Octave of Light']].forEach(function(x,i){A('Prestige','h'+i,x[1],'Earn '+x[0]+' Halo'+(x[0]>1?'s':'')+'.',function(){return S.halo>=x[0]})});
[[1,'Challenger'],[6,'Well Rounded'],[15,'Overachiever'],[30,'Perfect Record']].forEach(function(x,i){A('Challenges','ch'+i,x[1],'Complete '+x[0]+' challenge'+(x[0]>1?'s':'')+'.',function(){return chalDone()>=x[0]})});
A('Misc','m0','Shopaholic','Buy 100 upgrades in one run.',function(){return Object.keys(S.up).length>=100});
A('Misc','m1','Property Magnate','Own 1,000 buildings at once.',function(){return totalBuild()>=1000});
A('Misc','m2','Welcome Back','Collect offline earnings.',function(){return S.offTot>0});
A('Misc','m3','Dedicated','Play for 1 hour.',function(){return S.time>=3600});
A('Misc','m4','Obsessed','Play for 10 hours.',function(){return S.time>=36000});
A('Misc','m5','Amaan Is Life','Play for 100 hours.',function(){return S.time>=360000});
A('Misc','m6','Backup Plan','Export your save.',function(){return !!S.exported});
A('Misc','m7','Speed Demon','Click 40 times in 5 seconds.',function(){return !!S.speedy},true);
A('Misc','m8','Night Owl','Play between 2am and 4am.',function(){var h=new Date().getHours();return h>=2&&h<4},true);
var NEWS=[
'Amaan sticks tongue out. Economy reacts.','Local boy named "most clicked" for third year running.',
'Scientists baffled: tongue appears to generate currency.','Headteacher: "Please stop clicking him during assembly."',
function(){return 'Amaan reserves hit '+fmt(S.a)+'. Analysts say "wow".'},
{t:'Class Clown union demands longer breaks.',c:function(){return own('cc')>=10}},
{t:'Yearbook sells out. Reprint features more tongue.',c:function(){return own('yb')>=10}},
{t:'Prefects now outnumber students.',c:function(){return own('pb')>=25}},
{t:'Tuck Shop launches Amaan-flavoured crisps. Nobody can describe the taste.',c:function(){return own('ts')>=10}},
{t:'Fan Club chant heard from neighbouring town.',c:function(){return own('fc')>=10}},
{t:'Factory recall: some Amaans shipped with normal-length tongues.',c:function(){return own('af')>=10}},
{t:'Amaan FM listener figures now exceed population of Earth.',c:function(){return own('fm')>=10}},
{t:'Theme park queue time now measured in school years.',c:function(){return own('tp')>=10}},
{t:'Satellite photos reveal the tongue is visible from orbit.',c:function(){return own('sat')>=10}},
{t:'Dimension travellers report "it\'s Amaan all the way down".',c:function(){return own('ad')>=10}},
{t:'Time traveller returns from 1066. Bayeux Tapestry now features googly specs.',c:function(){return own('tm')>=10}},
{t:'Multiverse census complete. Result: Amaan.',c:function(){return own('mv')>=10}},
{t:'Golden Amaan sightings up 300%. Birdwatchers confused.',c:function(){return S.gold>=5}},
{t:'Rebirth clinic opens. Reviews: "would be born again."',c:function(){return S.rb>=1}},
{t:'Graduation ceremony enters its fourth hour. Amaan still waving.',c:function(){return S.gr>=1}},
{t:'Theologians confirm the halo is real and slightly tilted.',c:function(){return S.halo>=1}},
'Weather: cloudy with a chance of Amaan.','Breaking: nothing else is happening. Only this.',
'Opinion: has the tongue gone too far? Yes, says tongue.','Spelling bee cancelled after every word turns out to be "Amaan".',
'Local cat refuses to be clicked. "Not my brand," it says.','Stock market replaced by one large photo of Amaan.'
];

/* ================= STATE ================= */
var S,D={v:2,a:0,t:0,tr:0,eg:0,o:{},cu:{},up:{},clicks:0,crits:0,gold:0,maxHeat:0,fevers:0,
stars:0,starsTot:0,sgain:0,starsAll:0,starsEver:0,stk:{},dip:0,dipTot:0,dgain:0,dipAll:0,tro:{},halo:0,hfrom:0,
rb:0,gr:0,tc:0,ach:{},ch:{},chA:null,chT:0,buffs:[],time:0,last:0,offTot:0,nxtGold:0,exported:false,speedy:false,
set:{theme:'auto',sound:true,fx:true,num:'short',auto:true,autoU:true}};
function fresh(){var x=JSON.parse(JSON.stringify(D));x.last=now();return x}
function load(){
  S=fresh();
  try{
    var r=localStorage.getItem(KEY);
    if(r){var x=JSON.parse(r);if(x&&x.v===2){Object.keys(D).forEach(function(k){if(x[k]!==undefined)S[k]=x[k]});S.set=Object.assign({},D.set,x.set||{})}}
    else{var o=localStorage.getItem(OLDKEY);if(o){var y=JSON.parse(o);if(y&&typeof y.a==='number'){S.a=y.a;S.t=S.tr=S.eg=y.t||0;var oo=y.o||{};['t','g','b','s'].forEach(function(k){if(oo[k])S.cu[k]=oo[k]});['cc','yb','pb','fc','af','ad'].forEach(function(k){if(oo[k])S.o[k]=oo[k]});S.last=now()}}}
  }catch(e){}
  if(!S.last)S.last=now();
}
function save(){S.last=now();try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}

/* ================= FORMAT ================= */
function fmtS(n){return fmtN(n,'short')}
function fmt(n){return fmtN(n,S?S.set.num:'short')}
function fmtN(n,mode){
  if(!isFinite(n))return '∞';
  if(n<0)return '-'+fmtN(-n,mode);
  if(n<1e3)return (n<10&&n%1!==0?n.toFixed(1):Math.floor(n).toLocaleString());
  if(mode==='sci'&&n>=1e6)return n.toExponential(2).replace('+','');
  if(n<1e6)return Math.floor(n).toLocaleString();
  var e=Math.floor(Math.log10(n)/3);
  if(e>=SUF.length)return n.toExponential(2).replace('+','');
  return (n/Math.pow(1000,e)).toFixed(2)+' '+SUF[e];
}
function fmtTime(s){s=Math.floor(s);var h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+'h ':'')+(m||h?m+'m ':'')+x+'s'}
function pct(x){return Math.round(x*100)+'%'}

/* ================= MATH ================= */
function totalBuild(){var n=0;BUILD.forEach(function(b){n+=own(b.id)});return n}
function chalDone(){var n=0;CHAL.forEach(function(c){n+=S.ch[c.id]||0});return n}
function achCount(){return Object.keys(S.ach).length}
function tiers(bid){var n=0;for(var i=0;i<TIER_AT.length;i++)if(S.up['T_'+bid+'_'+i])n++;return n}
function costMult(){var m=1;if(S.stk.lm1)m*=.95;if(S.stk.lm2)m*=.95;if(S.stk.lm3)m*=.9;m*=Math.max(.2,1-.04*(S.ch.inf||0));if(S.chA==='inf')m*=5;return m}
function bCost(b,k){return Math.ceil(b.c*costMult()*Math.pow(1.15,k===undefined?own(b.id):k))}
function bulkCost(b,n){var k=own(b.id);return Math.ceil(b.c*costMult()*Math.pow(1.15,k)*(Math.pow(1.15,n)-1)/0.15)}
function maxBuy(b){var k=own(b.id),base=b.c*costMult()*Math.pow(1.15,k);var n=Math.floor(Math.log(S.a*0.15/base+1)/Math.log(1.15));return Math.max(0,n)}
function cuCost(u){return Math.ceil(u.c*Math.pow(1.2,S.cu[u.id]||0))}
function starRate(){return S.stk.sp2?.15:S.stk.sp1?.12:.10}
function starMult(){var m=1;if(S.stk.rc1)m*=1.25;if(S.stk.rc2)m*=1.25;if(S.stk.rc3)m*=1.5;if(S.tro.hon)m*=2;if(S.tro.fch)m*=2;m*=1+.5*S.dipTot;m*=Math.pow(2,S.halo);m*=1+.3*(S.ch.spd||0);return m}
function dipMult(){var m=1;if(S.tro.dd)m*=1.5;m*=Math.pow(1.5,S.halo);return m}
function pendingStars(){return Math.max(0,Math.floor(Math.sqrt(S.eg/2.5e6)*starMult())-S.sgain)}
function pendingDip(){return Math.max(0,Math.floor(Math.sqrt(S.starsEver/750)*dipMult())-S.dgain)}
function pendingHalo(){return Math.max(0,Math.floor(S.dipAll/50)-haloFrom())}
function haloFrom(){return S.hfrom||0}
function globalMult(){
  var m=1+.01*achCount();
  m*=1+starRate()*S.starsTot;
  m*=1+.5*S.dipTot;
  if(S.halo>0)m*=2.5*S.halo;
  UP.forEach(function(u){if(u.k==='glob'&&S.up[u.id])m*=1+u.v});
  m*=1+.25*(S.ch.shs||0);
  if(S.tro.pf)m*=2;
  if(S.halo>=8)m*=10;if(S.halo>=13)m*=10;
  return m;
}
function buff(k){for(var i=0;i<S.buffs.length;i++)if(S.buffs[i].k===k)return S.buffs[i];return null}
function bCps(b){
  var n=own(b.id);if(!n||S.chA==='det')return 0;
  var m=Math.pow(2,tiers(b.id));
  UP.forEach(function(u){if(u.k==='syn'&&u.a===b.id&&S.up[u.id])m*=1+u.v*own(u.b)});
  m*=1+.2*(S.ch.sil||0);
  var sp=buff('special');if(sp&&sp.b===b.id)m*=sp.m;
  return n*b.v*m;
}
function cps(){var t=0;BUILD.forEach(function(b){t+=bCps(b)});t*=globalMult();if(buff('frenzy'))t*=7;return Math.min(t,1e300)}
function comboMax(){return 1+(S.up.cm?1:0)+(S.up.cm2?2:0)}
function comboMult(){return 1+heat/100*comboMax()}
function critChance(){if(!S.up.lf)return 0;return .05+(S.up.ct?.05:0)+(S.up.cc3?.1:0)}
function clickBase(){
  if(S.chA==='sil')return 0;
  var flat=1;CLICKUP.forEach(function(u){flat+=(S.cu[u.id]||0)*u.v});
  var m=1;UP.forEach(function(u){if(u.k==='click'&&S.up[u.id])m*=u.v});
  if(S.stk.sf1)m*=1.5;if(S.stk.sf2)m*=2;m*=1+.5*(S.ch.det||0);
  var p=0;UP.forEach(function(u){if(u.k==='pct'&&S.up[u.id])p+=u.v});if(S.tro.cth)p+=.1;if(S.halo>=5)p+=.25;
  var v=flat*m*globalMult()+cps()*p;
  v*=comboMult();if(buff('clickfrenzy'))v*=777;
  return Math.min(v,1e300);
}
function goldFreq(){var m=1;UP.forEach(function(u){if(u.k==='gold'&&S.up[u.id])m*=u.v});if(S.stk.gm)m*=1.25;m*=1+.2*(S.ch.ecl||0);if(S.halo>=3)m*=2;return m}
function goldDur(){var m=1;if(S.up.gs)m*=1.5;if(S.tro.gl)m*=2;return m}
function offRate(){var r=S.up.hd?.75:.5;if(S.stk.tc)r*=2;return Math.min(r,1.5)}
function offCap(){return S.up.hd2?86400:28800}
function hasAuto(){return !!S.tro.ap||S.halo>=1}
function hasAutoU(){return !!S.tro.au||S.halo>=1}

/* ================= UI HELPERS ================= */
var toastQ=[];
function toast(m,sub,cls){var t=document.createElement('div');t.className='toast'+(cls?' '+cls:'');t.innerHTML=(cls==='ach'?'<svg class="ico"><use href="#i-star"/></svg>':'')+'<div>'+m+(sub?'<small>'+sub+'</small>':'')+'</div>';$('toasts').appendChild(t);setTimeout(function(){t.classList.add('out');setTimeout(function(){t.remove()},300)},3200);var tc=$('toasts');for(var i=tc.children.length-5;i>=0;i--)tc.children[i].remove()}
function modal(title,html,btns){$('mTitle').textContent=title;$('mBody').innerHTML=html;var bb=$('mBtns');bb.innerHTML='';btns.forEach(function(b){var x=document.createElement('button');x.className='btn'+(b.p?' primary':'')+(b.d?' danger':'');x.textContent=b.t;x.onclick=function(){closeModal();if(b.f)b.f()};bb.appendChild(x)});$('modal').hidden=false}
function closeModal(){$('modal').hidden=true}
$('modal').addEventListener('click',function(e){if(e.target===$('modal'))closeModal()});
var ACtx=null;function snd(type){
  if(!S.set.sound)return;try{if(!ACtx)ACtx=new (window.AudioContext||window.webkitAudioContext)();var c=ACtx;if(c.state==='suspended')c.resume();
  var seq={click:[[520,.04,0]],crit:[[300,.08,0],[900,.1,.05]],buy:[[440,.06,0],[660,.08,.06]],gold:[[523,.08,0],[659,.08,.08],[784,.08,.16],[1046,.14,.24]],ach:[[659,.1,0],[880,.16,.1]],bad:[[220,.15,0],[160,.2,.12]],prest:[[392,.1,0],[523,.1,.1],[659,.1,.2],[784,.1,.3],[1046,.3,.4]]}[type];
  seq.forEach(function(s){var o=c.createOscillator(),g=c.createGain();o.type=type==='click'?'sine':'triangle';o.frequency.value=s[0];g.gain.setValueAtTime(0.0001,c.currentTime+s[2]);g.gain.exponentialRampToValueAtTime(.12,c.currentTime+s[2]+.005);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+s[2]+s[1]);o.connect(g);g.connect(c.destination);o.start(c.currentTime+s[2]);o.stop(c.currentTime+s[2]+s[1]+.02)})}catch(e){}
}
function pop(x,y,t,cls){var p=document.createElement('div');p.className='pop'+(cls?' '+cls:'');p.textContent=t;p.style.left=x+'px';p.style.top=y+'px';$('pic').appendChild(p);setTimeout(function(){p.remove()},850)}
function sparks(x,y,n){if(!S.set.fx)return;for(var i=0;i<n;i++){var s=document.createElement('i');s.className='spark';s.style.left=x+'px';s.style.top=y+'px';var a=Math.random()*Math.PI*2,d=30+Math.random()*50;s.style.setProperty('--dx',Math.cos(a)*d+'px');s.style.setProperty('--dy',Math.sin(a)*d-20+'px');$('pic').appendChild(s);(function(e){setTimeout(function(){e.remove()},600)})(s)}}

/* ================= BUILD DOM ================= */
var buyN=1,bBtn={},cBtn={},dirty=true;
function build(){
  // click upgrades
  CLICKUP.forEach(function(u){var b=document.createElement('button');b.className='up';b.innerHTML='<b>'+u.n+'</b><span class="c"></span><small>+'+fmt(u.v)+' per click</small><span class="n"></span>';b.onclick=function(){buyCU(u)};cBtn[u.id]=b;$('L1').appendChild(b)});
  BUILD.forEach(function(b){var e=document.createElement('button');e.className='up';e.innerHTML='<b>'+b.n+'</b><span class="c"></span><small>'+b.d+'</small><span class="n"></span><span class="own"></span>';e.onclick=function(){buyB(b)};bBtn[b.id]=e;$('L2').appendChild(e)});
  $('buyAmt').querySelectorAll('button').forEach(function(x){x.onclick=function(){buyN=x.dataset.n==='max'?'max':+x.dataset.n;$('buyAmt').querySelectorAll('button').forEach(function(y){y.classList.toggle('on',y===x)});renderShop(true)}});
  $('tabs').querySelectorAll('.tab').forEach(function(x){x.onclick=function(){$('tabs').querySelectorAll('.tab').forEach(function(y){y.classList.toggle('on',y===x);y.setAttribute('aria-selected',y===x)});document.querySelectorAll('.panel').forEach(function(p){p.classList.toggle('on',p.id==='p-'+x.dataset.tab)});dirty=true;renderAll()}});
  // milestones
  HALO_MS.forEach(function(m){var e=document.createElement('div');e.className='ms';e.dataset.h=m.h;e.innerHTML='<span class="num">'+m.h+'</span><span>'+m.d+'</span>';$('L6').appendChild(e)});
  // achievements
  var cats={};ACH.forEach(function(a){(cats[a.cat]=cats[a.cat]||[]).push(a)});
  Object.keys(cats).forEach(function(c){var h=document.createElement('div');h.className='achcat';h.textContent=c;$('L8').appendChild(h);var g=document.createElement('div');g.className='achgrid';cats[c].forEach(function(a){var e=document.createElement('div');e.className='ach'+(a.s?' secret':'');e.tabIndex=0;e.id='ach-'+a.id;e.innerHTML='<span>'+a.n.split(' ').map(function(w){return w[0]}).join('').slice(0,2)+'</span><span class="tip"><b>'+a.n+'</b>'+(a.s&&!S.ach[a.id]?'Secret trophy.':a.d)+'</span>';g.appendChild(e)});$('L8').appendChild(g)});
}
function buyCU(u){var c=cuCost(u);if(S.a<c)return;S.a-=c;S.cu[u.id]=(S.cu[u.id]||0)+1;snd('buy');renderShop(true)}
function buyB(b){var n=buyN==='max'?maxBuy(b):buyN;if(n<1)return;var c=bulkCost(b,n);if(S.a<c)return;S.a-=c;S.o[b.id]=own(b.id)+n;snd('buy');dirty=true;renderShop(true)}
function buyUp(u){if(S.up[u.id]||S.a<u.c)return;if(u.k==='tier'&&S.chA==='shs'){toast('Shortsighted: tier upgrades are locked during this challenge.');return}S.a-=u.c;S.up[u.id]=1;snd('buy');dirty=true;renderAll()}
function buyStk(p){if(S.stk[p.id]||S.stars<p.c||(p.req&&!S.stk[p.req]))return;S.stars-=p.c;S.stk[p.id]=1;snd('buy');dirty=true;renderAll()}
function buyTro(p){if(S.tro[p.id]||S.dip<p.c)return;S.dip-=p.c;S.tro[p.id]=1;snd('buy');dirty=true;renderAll()}

function renderShop(full){
  CLICKUP.forEach(function(u){var b=cBtn[u.id],c=cuCost(u),ok=S.a>=c;b.querySelector('.c').textContent=fmt(c);b.querySelector('.c').classList.toggle('no',!ok);b.querySelector('.n').textContent='Owned: '+(S.cu[u.id]||0);b.disabled=!ok});
  BUILD.forEach(function(b){var e=bBtn[b.id];var vis=!b.req||b.req();var prev=BUILD[BUILD.indexOf(b)-1];var seen=vis&&(own(b.id)>0||!prev||own(prev.id)>0||S.t>=b.c*0.6);e.hidden=!seen;if(!seen)return;
    var n=buyN==='max'?Math.max(1,maxBuy(b)):buyN,c=bulkCost(b,n),ok=S.a>=c&&n>0;
    e.querySelector('.c').textContent=fmt(c)+(n>1?' ×'+n:'');e.querySelector('.c').classList.toggle('no',!ok);
    var p=bCps(b)*globalMult();e.querySelector('.n').textContent=own(b.id)?fmt(p)+'/s total · '+fmt(b.v*Math.pow(2,tiers(b.id))*globalMult())+' each':'Produces '+fmt(b.v*globalMult())+'/s';
    e.querySelector('.own').textContent=own(b.id)||'';e.disabled=!ok});
}
function upAvail(u){return !S.up[u.id]&&u.r()}
function renderUpg(){
  var L=$('L3'),Lb=$('L3b');var av=UP.filter(upAvail).sort(function(a,b){return a.c-b.c});
  $('upgEmpty').hidden=av.length>0;$('upgCount').textContent=av.length+' available';
  if(dirty){L.innerHTML='';av.forEach(function(u){var e=document.createElement('button');e.className='ug';e.dataset.id=u.id;e.innerHTML=(u.tag?'<span class="tag">'+u.tag+'</span>':'')+'<b>'+u.n+'</b><small>'+u.d+'</small><span class="c"></span>';e.onclick=function(){buyUp(u)};L.appendChild(e)});
    var bt=UP.filter(function(u){return S.up[u.id]});$('boughtN').textContent=bt.length;Lb.innerHTML='';bt.forEach(function(u){var e=document.createElement('div');e.className='ug done';e.innerHTML=(u.tag?'<span class="tag">'+u.tag+'</span>':'')+'<b>'+u.n+'</b><small>'+u.d+'</small><span class="c"><svg class="ico"><use href="#i-check"/></svg></span>';Lb.appendChild(e)})}
  var any=false;L.querySelectorAll('.ug').forEach(function(e){var u=UPMAP[e.dataset.id],ok=S.a>=u.c;e.querySelector('.c').textContent=fmt(u.c);e.querySelector('.c').classList.toggle('no',!ok);e.disabled=!ok;if(ok)any=true});
  $('dotUpg').hidden=!any;
}
function renderPerkGrid(L,list,ownMap,cur,icon,buyF){
  if(dirty){L.innerHTML='';list.forEach(function(p){var e=document.createElement('button');e.className='ug';e.dataset.id=p.id;var locked=p.req&&!ownMap[p.req];e.innerHTML='<b>'+p.n+'</b><small>'+p.d+(locked?' <em>Requires '+list.filter(function(q){return q.id===p.req})[0].n+'.</em>':'')+'</small><span class="c"></span>';e.onclick=function(){buyF(p)};L.appendChild(e)})}
  L.querySelectorAll('.ug').forEach(function(e){var p=list.filter(function(q){return q.id===e.dataset.id})[0];var done=!!ownMap[p.id],locked=p.req&&!ownMap[p.req],ok=!done&&!locked&&cur>=p.c;
    e.classList.toggle('done',done);e.classList.toggle('req',!!locked);e.disabled=!ok;
    e.querySelector('.c').innerHTML=done?'<svg class="ico"><use href="#i-check"/></svg> Owned':'<svg class="ico"><use href="#i-'+icon+'"/></svg> '+p.c;e.querySelector('.c').classList.toggle('no',!done&&!ok)});
}
function renderRebirth(){
  var ps=pendingStars();
  $('starRate').textContent='+'+Math.round(starRate()*100)+'%';$('starsUnspent').textContent=fmt(S.stars);$('starsTot').textContent=fmt(S.starsTot);
  $('starBonus').textContent='×'+fmt(1+starRate()*S.starsTot);
  var need=Math.pow((S.sgain+ps+1)/starMult(),2)*1e6;$('nextStar').textContent=fmt(Math.max(0,need-S.eg))+' more';
  var rb=$('rebirthBtn');rb.disabled=ps<1;rb.innerHTML='Rebirth for <b>+'+fmt(ps)+'</b> Gold Star'+(ps===1?'':'s');
  $('dotReb').hidden=!(ps>=1&&ps>=Math.max(1,S.starsTot*0.1));
  renderPerkGrid($('L4'),STK,S.stk,S.stars,'star',buyStk);
}
function renderPrestige(){
  var pd=pendingDip(),ph=pendingHalo();
  $('dipUnspent').textContent=fmt(S.dip);$('dipTot').textContent=fmt(S.dipTot);$('starsEver').textContent=fmt(S.starsEver);
  var need=Math.pow((S.dgain+pd+1)/dipMult(),2)*300;$('nextDip').textContent=fmt(Math.max(0,need-S.starsEver))+' more stars';
  var canG=!!S.stk.hp||S.gr>0&&!!S.tro.an;$('gradLock').hidden=!!S.stk.hp;$('gradBtn').hidden=!S.stk.hp;$('gradBtn').disabled=pd<1;$('gradBtn').innerHTML='Graduate for <b>+'+fmt(pd)+'</b> Diploma'+(pd===1?'':'s');
  $('haloN').textContent=S.halo;$('dipAll').textContent=fmt(S.dipAll);$('transN').textContent=S.tc;$('nextHalo').textContent=fmt(Math.max(0,(haloFrom()+ph+1)*50-S.dipAll))+' more diplomas';
  $('transLock').hidden=!!S.tro.lt;$('transBtn').hidden=!S.tro.lt;$('transBtn').disabled=ph<1;$('transBtn').innerHTML='Transcend for <b>+'+ph+'</b> Halo'+(ph===1?'':'s');
  $('dotPre').hidden=!((S.stk.hp&&pd>=1)||(S.tro.lt&&ph>=1));
  renderPerkGrid($('L5'),TRO,S.tro,S.dip,'diploma',buyTro);
  $('L6').querySelectorAll('.ms').forEach(function(e){e.classList.toggle('done',S.halo>=+e.dataset.h)});
}
function renderChal(){
  var un=!!S.stk.tl;$('chalLock').hidden=un;var L=$('L7');L.hidden=!un;if(!un){$('chalActive').hidden=true;return}
  var ac=S.chA?CHAL.filter(function(c){return c.id===S.chA})[0]:null;$('chalActive').hidden=!ac;
  if(ac){var g=chalGoal(ac),pr=Math.min(1,S.tr/g);var tl=ac.id==='spd'?' · '+fmtTime(Math.max(0,600-(now()-S.chT)/1000))+' left':'';
    if(dirty||!$('abandon')){$('chalActive').innerHTML='<h3>Active: '+ac.n+'</h3><div>'+ac.d+' Reach <b>'+fmt(g)+'</b> amaans this run.<span id="chalTl"></span></div><div class="prog"><i id="chalBar"></i></div><div id="chalTxt"></div><button class="btn" id="abandon">Abandon challenge</button>';
      $('abandon').onclick=function(){S.chA=null;toast('Challenge abandoned.');dirty=true;renderAll()}}
    $('chalTl').textContent=tl;$('chalBar').style.width=(pr*100)+'%';$('chalTxt').textContent=fmt(S.tr)+' / '+fmt(g)+' ('+pct(pr)+')'}
  if(dirty){L.innerHTML='';CHAL.forEach(function(c){var e=document.createElement('div');e.className='chal';e.dataset.id=c.id;e.innerHTML='<b>'+c.n+'</b><span class="stars-row"></span><small>'+c.d+' Goal: <span class="goal"></span>.<br>Reward: '+c.rw+'.</small><button class="btn">Start challenge</button>';e.querySelector('.btn').onclick=function(){startChal(c)};L.appendChild(e)})}
  L.querySelectorAll('.chal').forEach(function(e){var c=CHAL.filter(function(q){return q.id===e.dataset.id})[0],n=S.ch[c.id]||0;var sr='';for(var i=0;i<5;i++)sr+='<svg class="ico'+(i<n?' on':'')+'"><use href="#i-star"/></svg>';e.querySelector('.stars-row').innerHTML=sr;e.querySelector('.goal').textContent=n>=5?'complete':fmt(chalGoal(c));var b=e.querySelector('.btn');b.disabled=!!S.chA||n>=5;b.textContent=n>=5?'Mastered':S.chA===c.id?'In progress':'Start challenge'});
}
function chalGoal(c){return c.g*Math.pow(1000,S.ch[c.id]||0)}
function startChal(c){if(S.chA||(S.ch[c.id]||0)>=5)return;
  modal('Start '+c.n+'?','<p>This performs a <b>Rebirth</b> now (you gain <b>'+fmt(pendingStars())+'</b> Gold Stars), then applies the rule: <b>'+c.d+'</b></p><p>Goal: earn <span class="bignum">'+fmt(chalGoal(c))+'</span> amaans in the new run. Reward: '+c.rw+'.</p>',[{t:'Cancel'},{t:'Start',p:true,f:function(){doRebirth(true);S.chA=c.id;S.chT=now();toast('Challenge started: '+c.n);dirty=true;renderAll()}}]);
}
function renderAch(){var n=achCount();$('achCount').textContent=n+' / '+ACH.length+' · +'+n+'% production';ACH.forEach(function(a){var e=$('ach-'+a.id);if(e){var on=!!S.ach[a.id];if(on!==e.classList.contains('on')){e.classList.toggle('on',on);if(a.s&&on)e.querySelector('.tip').innerHTML='<b>'+a.n+'</b>'+a.d}}})}
function renderStats(){
  var rows=[['All-time amaans',fmt(S.t)],['This run',fmt(S.tr)],['Since graduation',fmt(S.eg)],['Per second',fmt(cps())],['Per click',fmt(clickBase())],['Clicks',S.clicks.toLocaleString()],['Crits',S.crits.toLocaleString()],['Crit chance',pct(critChance())],['Golden Amaans clicked',S.gold],['Fevers',S.fevers],['Buildings owned',totalBuild()],['Upgrades owned',Object.keys(S.up).length],['Trophy bonus','×'+(1+.01*achCount()).toFixed(2)],['Global multiplier','×'+fmt(globalMult())],['Rebirths',S.rb],['Gold Stars (all time)',fmt(S.starsAll)],['Graduations',S.gr],['Diplomas (all time)',fmt(S.dipAll)],['Transcendences',S.tc],['Halos',S.halo],['Challenges completed',chalDone()+' / '+CHAL.length*5],['Offline earnings collected',fmt(S.offTot)],['Offline rate',pct(offRate())+' up to '+(offCap()/3600)+'h'],['Time played',fmtTime(S.time)]];
  $('L9').innerHTML=rows.map(function(r){return '<div class="stat"><small>'+r[0]+'</small><b>'+r[1]+'</b></div>'}).join('');
}
function renderStage(){
  $('bal').textContent=fmt(S.a);$('cps').textContent=fmt(cps())+' / sec';$('cpc').textContent='+'+fmt(clickBase())+' / click';
  $('heatFill').style.width=heat+'%';$('heatTxt').textContent=heat>=100?'FEVER ×'+comboMult().toFixed(2):'Combo ×'+comboMult().toFixed(2);
  $('stage').classList.toggle('fever',heat>=100);
  var pills='';if(S.starsTot||S.rb)pills+='<span class="pill stars"><svg class="ico"><use href="#i-star"/></svg>'+fmt(S.starsTot)+' stars</span>';if(S.dipTot||S.gr)pills+='<span class="pill dip"><svg class="ico"><use href="#i-diploma"/></svg>'+fmt(S.dipTot)+' diplomas</span>';if(S.halo)pills+='<span class="pill halo"><svg class="ico"><use href="#i-halo"/></svg>'+S.halo+' halos</span>';$('pills').innerHTML=pills;
  var t=now(),bh='';S.buffs.forEach(function(b){var left=(b.until-t)/1000,w=left/b.dur*100;var lab={frenzy:'Frenzy ×7',clickfrenzy:'Click Frenzy ×777',sugar:'Sugar Rush',special:(b.name||'Building')+' ×'+(b.m||1).toFixed(1)}[b.k];bh+='<span class="buff '+b.k+'">'+lab+' · '+Math.ceil(left)+'s<i style="width:'+w+'%"></i></span>'});$('buffs').innerHTML=bh;
  document.title=fmt(S.a)+' amaans - Amaan Clicker';
}
function renderSettings(){$('rowAuto').hidden=!hasAuto();$('rowAutoU').hidden=!hasAutoU()}
function renderAll(){
  renderStage();
  var tab=document.querySelector('.tab.on').dataset.tab;
  if(tab==='shop')renderShop();else if(tab==='upg')renderUpg();else if(tab==='rebirth')renderRebirth();else if(tab==='prestige')renderPrestige();else if(tab==='chal')renderChal();else if(tab==='ach')renderAch();else if(tab==='stats')renderStats();else if(tab==='set')renderSettings();
  dirty=false;
}
function renderDots(){var ps=pendingStars();$('dotReb').hidden=!(ps>=1&&ps>=Math.max(1,S.starsTot*0.1));$('dotUpg').hidden=!UP.some(function(u){return upAvail(u)&&S.a>=u.c});var pd=pendingDip(),ph=pendingHalo();$('dotPre').hidden=!((S.stk.hp&&pd>=1)||(S.tro.lt&&ph>=1))}

/* ================= CLICKING ================= */
var heat=0,recent=[];
function doClick(x,y,manual){
  var v=clickBase(),crit=false;
  if(manual){S.clicks++;recent.push(now());while(recent.length&&recent[0]<now()-5000)recent.shift();if(recent.length>=40)S.speedy=true;
    if(!buff('sugar')){heat=Math.min(100,heat+4*(S.up.rh?1.5:1));if(heat>=100&&!feverOn){feverOn=true;S.fevers++}}
    if(heat>S.maxHeat)S.maxHeat=heat;}
  if(Math.random()<critChance()){crit=true;S.crits++;v*=S.up.mc?10:5}
  v=Math.min(v,1e300);S.a+=v;S.t+=v;S.tr+=v;S.eg+=v;
  if(manual){pop(x-10+Math.random()*20,y-20,(crit?'CRIT! ':'+')+fmt(v),crit?'crit':'');sparks(x,y,crit?14:4);snd(crit?'crit':'click');if(crit){$('hit').classList.remove('crit');void $('hit').offsetWidth;$('hit').classList.add('crit')}}
}
var feverOn=false;
var hit=$('hit');
hit.addEventListener('pointerdown',function(e){var b=$('pic').getBoundingClientRect();var x=e.clientX?e.clientX-b.left:b.width/2,y=e.clientY?e.clientY-b.top:b.height/2;doClick(x,y,true);hit.classList.add('p');renderStage()});
['pointerup','pointerleave','pointercancel'].forEach(function(ev){hit.addEventListener(ev,function(){hit.classList.remove('p')})});
hit.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();doClick(100,120,true);renderStage()}});
document.addEventListener('keydown',function(e){if(e.key===' '&&document.activeElement!==hit&&!/INPUT|TEXTAREA|SELECT|BUTTON/.test(document.activeElement.tagName)){e.preventDefault();doClick(100,120,true);renderStage()}});

/* ================= GOLDEN AMAAN ================= */
function scheduleGold(){S.nxtGold=now()+(90+Math.random()*150)*1000/goldFreq()}
var goldEl=null;
function spawnGold(){
  if(goldEl||S.chA==='ecl')return;
  var z=$('goldZone'),e=document.createElement('button');e.className='golden';e.setAttribute('aria-label','Golden Amaan! Click for a bonus');e.innerHTML='<img src="amaan.jpg" alt="">';
  e.style.left=(8+Math.random()*72)+'%';e.style.top=(10+Math.random()*70)+'%';
  var life=12000*(S.up.flb?1.5:1);var tm=setTimeout(function(){leave()},life);
  function leave(){if(!goldEl)return;goldEl.classList.add('leaving');var g=goldEl;goldEl=null;setTimeout(function(){g.remove()},400)}
  e.addEventListener('pointerdown',function(ev){ev.stopPropagation();clearTimeout(tm);S.gold++;goldEffect();leave()});
  z.appendChild(e);goldEl=e;snd('gold');
}
function addBuff(k,dur,extra){dur*=goldDur();var b=buff(k);var o=Object.assign({k:k,dur:dur,until:now()+dur*1000},extra||{});if(b)Object.assign(b,o);else S.buffs.push(o)}
function goldEffect(){
  var r=Math.random()*100,msg;
  var ownedB=BUILD.filter(function(b){return own(b.id)>=10});
  if(r<35){addBuff('frenzy',77);msg='Frenzy! Production ×7 for 77 s'}
  else if(r<65){var g=Math.min(S.a*.15,cps()*900)+13;S.a+=g;S.t+=g;S.tr+=g;S.eg+=g;msg='Lucky! +'+fmt(g)+' amaans';pop(100,60,'+'+fmt(g),'gold')}
  else if(r<80){addBuff('clickfrenzy',13);msg='Click Frenzy! Clicks ×777 for 13 s'}
  else if(r<92&&ownedB.length){var b=ownedB[Math.floor(Math.random()*ownedB.length)];var m=1+own(b.id)/10;addBuff('special',30,{b:b.id,m:m,name:b.n});msg=b.n+' special! ×'+m.toFixed(1)+' for 30 s'}
  else{addBuff('sugar',30);heat=100;if(!feverOn){feverOn=true;S.fevers++}msg='Sugar Rush! Combo locked at max for 30 s'}
  toast(msg,null,'gold');snd('gold');dirty=true;
}

/* ================= NEWS ================= */
function news(){var el=[];NEWS.forEach(function(n){if(typeof n==='string'||typeof n==='function')el.push(n);else if(n.c())el.push(n.t)});var x=el[Math.floor(Math.random()*el.length)];var t=typeof x==='function'?x():x;var e=$('news');e.textContent=t;e.style.animation='none';void e.offsetWidth;e.style.animation=''}

/* ================= PRESTIGE ================= */
function resetRun(keepStarsLayer){
  S.a=0;S.tr=0;S.o={};S.buffs=[];heat=0;feverOn=false;S.chA=null;
  if(!S.stk.rt)S.cu={};
  var nu={};Object.keys(S.up).forEach(function(id){var u=UPMAP[id];if(!u)return;if(S.tro.ta&&u.k!=='tier')nu[id]=1;if(u.k==='tier'&&S.stk.kt&&u.ti<2)nu[id]=1});S.up=nu;
  if(S.stk.hs)S.o.cc=10;if(S.stk.hs2){S.o.cc=S.o.yb=S.o.pb=S.o.ts=10}
  if(S.stk.pm)S.a=500*S.starsTot;
  if(goldEl){goldEl.remove();goldEl=null}scheduleGold();
}
function doRebirth(silent){
  var g=pendingStars();S.stars+=g;S.starsTot+=g;S.sgain+=g;S.starsAll+=g;S.starsEver+=g;S.rb++;
  resetRun();if(!silent){toast('Reborn! +'+fmt(g)+' Gold Stars','Production is now ×'+fmt(1+starRate()*S.starsTot)+' from stars.');snd('prest')}
  dirty=true;save();renderAll();
}
function doGrad(){
  var g=pendingDip();S.dip+=g;S.dipTot+=g;S.dgain+=g;S.dipAll+=g;S.gr++;
  var keepStk=S.tro.an||S.halo>=2;
  S.stars=0;S.starsTot=0;S.sgain=0;S.eg=0;S.cu={};if(!keepStk)S.stk={};
  resetRun();S.up={};
  if(S.tro.sch){S.stars=100*S.dipTot;S.starsTot=100*S.dipTot}
  toast('Graduated! +'+fmt(g)+' Diplomas','Production ×'+(1+.5*S.dipTot).toFixed(1)+', Gold Stars ×'+(1+.5*S.dipTot).toFixed(1)+'.');snd('prest');dirty=true;save();renderAll();
}
function doTrans(){
  var g=pendingHalo();S.hfrom=haloFrom()+g;S.halo+=g;S.tc++;
  var newTro={};if(S.halo>=1){if(S.tro.ap)newTro.ap=1;if(S.tro.au)newTro.au=1}if(S.halo>=2)newTro=Object.assign({},S.tro);
  S.dip=0;S.dipTot=0;S.dgain=0;S.starsEver=0;S.tro=newTro;S.stk={};S.stars=0;S.starsTot=0;S.sgain=0;S.eg=0;S.cu={};
  resetRun();S.up={};
  toast('Transcended! +'+g+' Halo'+(g>1?'s':''),'All production ×'+fmt(S.halo>0?2.5*S.halo:1)+'. Amaan glows.');snd('prest');dirty=true;save();renderAll();
}
$('rebirthBtn').onclick=function(){var g=pendingStars();if(g<1)return;modal('Rebirth?','<p>You will gain <span class="bignum">+'+fmt(g)+' Gold Stars</span> for a total of '+fmt(S.starsTot+g)+', making production ×'+fmt(1+starRate()*(S.starsTot+g))+'.</p><ul><li>Resets: amaans, buildings, upgrades'+(S.stk.rt?' (Click power kept)':'')+'.</li><li>Keeps: Gold Stars, Sticker Book, Trophies, Diplomas, Halos.</li></ul>',[{t:'Not yet'},{t:'Rebirth',p:true,f:function(){doRebirth()}}])};
$('gradBtn').onclick=function(){var g=pendingDip();if(g<1)return;modal('Graduate?','<p>You will gain <span class="bignum">+'+fmt(g)+' Diploma'+(g>1?'s':'')+'</span>. Each gives +50% production and +50% Gold Stars, permanently.</p><ul><li>Resets: everything a Rebirth resets, plus Gold Stars'+(S.tro.an||S.halo>=2?'.':' and the Sticker Book.')+'</li><li>Keeps: Diplomas, Trophy Cabinet, Trophies, Halos.</li></ul>',[{t:'Not yet'},{t:'Graduate',p:true,f:doGrad}])};
$('transBtn').onclick=function(){var g=pendingHalo();if(g<1)return;modal('Transcend?','<p>You will gain <span class="bignum">+'+g+' Halo'+(g>1?'s':'')+'</span>. Halos add ×2.5 production each (×2.5, ×5, ×7.5...), multiply Gold Stars by ×2 and Diplomas by ×1.5.</p><ul><li>Resets: <b>everything</b> including Diplomas'+(S.halo+g>=2?' (Trophy Cabinet kept).':' and the Trophy Cabinet.')+'</li><li>Keeps: Halos, Trophies, challenge rewards.</li></ul>',[{t:'Not yet'},{t:'Transcend',p:true,f:doTrans}])};

/* ================= SETTINGS / SAVE ================= */
function applyTheme(){var t=S.set.theme;if(t==='auto')document.documentElement.removeAttribute('data-theme');else document.documentElement.setAttribute('data-theme',t)}
$('setTheme').onchange=function(){S.set.theme=this.value;applyTheme();save()};
$('setSound').onchange=function(){S.set.sound=this.checked;save()};
$('setFx').onchange=function(){S.set.fx=this.checked;save()};
$('setNum').onchange=function(){S.set.num=this.value;dirty=true;renderAll();save()};
$('setAuto').onchange=function(){S.set.auto=this.checked;save()};
$('setAutoU').onchange=function(){S.set.autoU=this.checked;save()};
function enc(s){return btoa(unescape(encodeURIComponent(s)))}function dec(s){return decodeURIComponent(escape(atob(s)))}
$('btnSave').onclick=function(){save();$('saveMsg').textContent='Saved.'};
$('btnExport').onclick=function(){save();S.exported=true;$('saveBox').value=enc(JSON.stringify(S));$('saveBox').select();try{document.execCommand('copy');$('saveMsg').textContent='Save code copied to clipboard.'}catch(e){$('saveMsg').textContent='Save code ready. Copy it somewhere safe.'}};
$('btnImport').onclick=function(){try{var x=JSON.parse(dec($('saveBox').value.trim()));if(!x||x.v!==2)throw 0;modal('Import save?','<p>This replaces your current game with the imported one.</p>',[{t:'Cancel'},{t:'Import',p:true,f:function(){localStorage.setItem(KEY,JSON.stringify(x));location.reload()}}])}catch(e){$('saveMsg').textContent='That does not look like a valid save code.';snd('bad')}};
$('btnWipe').onclick=function(){modal('Wipe everything?','<p>This deletes <b>all</b> progress: amaans, Gold Stars, Diplomas, Halos and Trophies. There is no undo.</p>',[{t:'Cancel'},{t:'Wipe it all',d:true,f:function(){modal('Really?','<p>Last chance. Amaan will forget everything.</p>',[{t:'Keep my game'},{t:'Yes, wipe',d:true,f:function(){localStorage.removeItem(KEY);localStorage.removeItem(OLDKEY);S=fresh();save();location.reload()}}])}}])};
function syncSettings(){$('setTheme').value=S.set.theme;$('setSound').checked=S.set.sound;$('setFx').checked=S.set.fx;$('setNum').value=S.set.num;$('setAuto').checked=S.set.auto;$('setAutoU').checked=S.set.autoU;applyTheme()}

/* ================= LEADERBOARD ================= */
var LBKEY='amaan-lb-top50';
function getLb(){try{var x=localStorage.getItem(LBKEY);return x?JSON.parse(x):[]}catch(e){return[]}}
function saveLb(lb){try{localStorage.setItem(LBKEY,JSON.stringify(lb.slice(0,50)))}catch(e){}}
function addLbScore(name,score){
  if(!name||name.trim().length<1)return;
  var lb=getLb();lb.push({name:name.trim().slice(0,20),amaans:Math.floor(score),time:Date.now()});
  lb.sort(function(a,b){return b.amaans-a.amaans});saveLb(lb);renderLb();toast('Score submitted! You are #'+(Math.min(lb.findIndex(function(x){return x.amaans===score})+1,50)),'','ach');
}
function renderLb(){
  var lb=getLb(),html='';
  if(lb.length===0){html='<div style="text-align:center;color:var(--mut);padding:20px">No scores yet. Be the first!</div>'}
  else{lb.slice(0,50).forEach(function(e,i){html+='<div class="lb-entry" style="display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;padding:10px;border-bottom:1px solid var(--line)"><div style="font-weight:700;color:var(--gold)">#'+(i+1)+'</div><div><b>'+e.name+'</b></div><div style="text-align:right;font-weight:700">'+fmt(e.amaans)+' amaans</div></div>'})}
  $('lbList').innerHTML=html;
}
$('lbSubmit').onclick=function(){addLbScore($('lbName').value,S.t);$('lbName').value=''};

/* ================= OFFLINE ================= */
function offline(){
  var dt=(now()-S.last)/1000;if(dt<60)return;
  var base=0;BUILD.forEach(function(b){base+=bCps(b)});base*=globalMult();
  var secs=Math.min(dt,offCap()),g=base*secs*offRate();if(g<1)return;
  S.a+=g;S.t+=g;S.tr+=g;S.eg+=g;S.offTot+=g;
  modal('While you were away…','<p>Amaan kept working for <b>'+fmtTime(secs)+'</b>'+(dt>secs?' (capped at '+(offCap()/3600)+'h)':'')+' at '+pct(offRate())+' efficiency.</p><div class="bignum">+'+fmt(g)+' amaans</div>',[{t:'Nice',p:true}]);
}

/* ================= LOOP ================= */
var MS=[[100,'100 amaans! Keep going.'],[10000,'10,000 amaans. The school is talking.'],[1e6,'One million amaans. Legendary.'],[1e9,'A billion amaans. Too much Amaan.'],[1e12,'A trillion. The tongue is unstoppable.']],mi=0;
var last=now(),acc=0,tick=0,secs=0,autoAcc=0,autoUAcc=0,acAcc=0;
function loop(){
  var n=now(),dt=Math.min((n-last)/1000,5);last=n;acc+=dt;S.time+=dt;tick++;
  var p=cps()*dt;if(p>0){S.a+=p;S.t+=p;S.tr+=p;S.eg+=p}
  // heat decay
  if(!buff('sugar')){heat=Math.max(0,heat-dt*12*(S.up.hh?.5:1));if(heat<100)feverOn=false}else heat=100;
  // buffs
  S.buffs=S.buffs.filter(function(b){return b.until>n});
  // autoclick
  var ac=S.stk.at3?20:S.stk.at2?5:S.stk.at1?1:0;if(ac){acAcc+=dt*ac;while(acAcc>=1){acAcc--;doClick(0,0,false)}}
  // autopilot
  if(hasAuto()&&S.set.auto){autoAcc+=dt;if(autoAcc>=2){autoAcc=0;var best=null,bc=Infinity;BUILD.forEach(function(b){if(b.req&&!b.req())return;var c=bCost(b);if(c<bc&&c<=S.a){bc=c;best=b}});if(best){S.a-=bc;S.o[best.id]=own(best.id)+1;dirty=true}}}
  if(hasAutoU()&&S.set.autoU){autoUAcc+=dt;if(autoUAcc>=3){autoUAcc=0;var av=UP.filter(function(u){return upAvail(u)&&S.a>=u.c&&!(u.k==='tier'&&S.chA==='shs')}).sort(function(a,b){return a.c-b.c});if(av[0]){S.a-=av[0].c;S.up[av[0].id]=1;dirty=true;toast('Auto-bought '+av[0].n)}}}
  // golden
  if(!S.nxtGold)scheduleGold();if(n>=S.nxtGold&&!goldEl){spawnGold();scheduleGold()}
  // challenge
  if(S.chA){var c=CHAL.filter(function(q){return q.id===S.chA})[0];if(S.tr>=chalGoal(c)){S.ch[c.id]=(S.ch[c.id]||0)+1;S.chA=null;toast('Challenge complete: '+c.n+'!',c.rw+'.','ach');snd('ach');dirty=true}else if(c.id==='spd'&&n-S.chT>600000){S.chA=null;toast('Speedrun failed. Too slow!');snd('bad');dirty=true}}
  // per second
  if(acc>=1){acc=0;ACH.forEach(function(a){if(!S.ach[a.id]&&a.f()){S.ach[a.id]=1;toast(a.n,a.d,'ach');snd('ach');dirty=true}});
    while(mi<MS.length&&S.t>=MS[mi][0]){toast(MS[mi][1]);mi++}renderDots();secs++;if(secs%9===0)news();if(secs%10===0)save();
    if(document.querySelector('.tab.on').dataset.tab!=='shop')dirty=dirty||secs%2===0}
  renderAll();
  setTimeout(loop,100);
}

/* ================= INIT ================= */
load();syncSettings();build();renderLb();
while(mi<MS.length&&S.t>=MS[mi][0])mi++;
offline();scheduleGold();news();
dirty=true;renderAll();
loop();
window.addEventListener('pagehide',save);window.addEventListener('beforeunload',save);
document.addEventListener('visibilitychange',function(){if(document.hidden)save()});
})();
