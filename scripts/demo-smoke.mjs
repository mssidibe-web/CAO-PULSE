const base=process.env.DEMO_URL??'http://localhost:3000';
const login=await fetch(`${base}/api/persona`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({userId:'u-founder'})});
const cookie=login.headers.get('set-cookie')?.split(';',1)[0];
if(!login.ok||!cookie){console.error(`FAIL /api/persona ${login.status}`);process.exit(1)}
const paths=['/api/health','/api/dashboard','/api/opportunities','/api/references'];
let bad=0;
for(const path of paths){try{const response=await fetch(base+path,{headers:{cookie}});console.log(response.status,path);if(!response.ok)bad++}catch(error){console.error('FAIL',path,String(error));bad++}}
if(bad)process.exit(1);
console.log('Demo smoke OK');
