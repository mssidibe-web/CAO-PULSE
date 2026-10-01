import {expect,test} from '@playwright/test';

test('blocking gates and restricted proof cannot be bypassed',async({request})=>{
  expect((await request.post('/api/persona',{data:{userId:'u-founder'}})).status()).toBe(200);
  const blockedDecision=await request.post('/api/opportunities/opp-003/decision',{data:{decision:'GO',rationale:'Forcer une décision malgré le gate'}});
  expect(blockedDecision.status()).toBe(409);

  expect((await request.post('/api/persona',{data:{userId:'u-commercial'}})).status()).toBe(200);
  const matching=await request.post('/api/references/match',{data:{query:'procédures SI pilotage',limit:5}});
  expect(matching.status()).toBe(200);
  const body=await matching.json() as {data:{referenceId:string}[]};
  expect(body.data.map(item=>item.referenceId)).not.toContain('ref-002');
});
