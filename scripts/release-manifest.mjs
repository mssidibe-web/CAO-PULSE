import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';

const output=resolve(process.argv[2]??'audit/release/manifest.json');
const commit=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const files=execFileSync('git',['ls-files','-z']).toString().split('\0').filter(Boolean).sort();
const entries=files.map(path=>({path,sha256:createHash('sha256').update(readFileSync(path)).digest('hex')}));
const manifest={product:'CAO PULSE',generatedAt:new Date().toISOString(),commit,fileCount:entries.length,files:entries};
mkdirSync(dirname(output),{recursive:true});writeFileSync(output,JSON.stringify(manifest,null,2)+'\n');
console.log(`${output}\nfiles=${entries.length}\nsha256=${createHash('sha256').update(readFileSync(output)).digest('hex')}`);
