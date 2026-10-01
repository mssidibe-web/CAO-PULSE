import {spawnSync} from 'node:child_process';

const commands=[
  ['npm',['run','identity:check']],
  ['npm',['run','lint']],
  ['npm',['run','typecheck']],
  ['npm',['run','test']],
  ['npm',['run','test:e2e']],
  ['npm',['run','build']],
  ['npm',['run','audit:pack']],
  ['npm',['run','trace:verify']],
  ['npm',['run','models:eval']],
];
for(const [command,args] of commands){
  console.log(`\n$ ${command} ${args.join(' ')}`);
  const result=spawnSync(command,args,{stdio:'inherit',env:{...process.env,LIVE_AI:'false'}});
  if(result.status!==0)process.exit(result.status??1);
}
console.log('\nCAO PULSE offline preflight OK');
