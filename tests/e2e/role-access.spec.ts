import {expect,test} from '@playwright/test';

test('manager remains scoped away from cash and unrelated mission data',async({request})=>{
  const persona=await request.post('/api/persona',{data:{userId:'u-manager'}});
  expect(persona.status()).toBe(200);
  const review=await request.post('/api/missions/mis-001/draft-review',{data:{outcome:'accepted',rationale:'Sources relues et brouillon contrôlé.'}});
  expect(review.status()).toBe(200);
  expect((await request.get('/api/billing')).status()).toBe(403);
  expect((await request.get('/api/missions/mis-002')).status()).toBe(403);
  const assistant=await request.post('/api/assistant',{data:{task:'assistant',prompt:'Prépare une synthèse de travail'}});
  expect(assistant.status()).toBe(200);
  const body=await assistant.json() as {data:{citations:{sourceId:string}[]}};
  expect(body.data.citations.map(citation=>citation.sourceId)).not.toContain('fixture-billing');
});
