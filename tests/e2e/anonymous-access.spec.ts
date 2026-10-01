import {expect,test} from '@playwright/test';

test('anonymous requests fail closed',async({request})=>{
  expect((await request.get('/api/dashboard')).status()).toBe(403);
  expect((await request.get('/api/references')).status()).toBe(403);
  expect((await request.get('/api/search?q=audit')).status()).toBe(401);
  expect((await request.get('/api/missions')).status()).toBe(401);
  expect((await request.post('/api/assistant',{data:{task:'assistant',prompt:'Synthèse'}})).status()).toBe(401);
});
