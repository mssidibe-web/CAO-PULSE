import {describe,expect,it} from 'vitest';
import {searchKnowledge} from '@/lib/data/search';
import {users} from '@/lib/data/fixtures';

describe('search',()=>{
  it('returns source-backed result',()=>{
    const results=searchKnowledge(users[0],'audit');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].citations.length).toBeGreaterThan(0);
  });

  it('filters restricted evidence before returning citations',()=>{
    const expert=users.find(user=>user.id==='u-expert')!;
    const results=searchKnowledge(expert,'procédures');
    expect(results.flatMap(result=>result.citations).some(citation=>citation.sourceId==='ev-003')).toBe(false);
  });

  it('returns no retrieval results without a session role',()=>{
    expect(searchKnowledge({id:'u-anonymous',name:'Anonymous',role:'anonymous',missionIds:[],active:false},'audit')).toEqual([]);
  });
});
