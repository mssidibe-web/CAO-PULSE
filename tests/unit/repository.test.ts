import {afterEach,describe,expect,it} from 'vitest';
import {repo} from '@/lib/data/repository';

afterEach(()=>{repo.reset()});

describe('demo repository mutations',()=>{
  it('persists a bid decision until demo reset',()=>{
    const decision=repo.addBidDecision({id:'bd-test',opportunityId:'opp-001',decision:'HOLD',rationale:'Attendre la confirmation documentaire.',decidedBy:'u-founder',decidedAt:'2026-10-01T12:00:00Z'});
    expect(repo.bidDecisions()[0]).toEqual(decision);
    repo.reset();
    expect(repo.bidDecisions().some(item=>item.id==='bd-test')).toBe(false);
  });

  it('updates action status until demo reset',()=>{
    expect(repo.updateAction('act-001',{status:'done'})?.status).toBe('done');
    expect(repo.actions().find(item=>item.id==='act-001')?.status).toBe('done');
    repo.reset();
    expect(repo.actions().find(item=>item.id==='act-001')?.status).toBe('todo');
  });
});
