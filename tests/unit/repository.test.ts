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

  it('promotes a signal into a qualification opportunity',()=>{
    const promoted=repo.promoteSignal('sig-001',{id:'opp-signal-test',title:'Signal qualifié',buyer:'Acheteur synthétique',country:'Mali',sector:'développement',source:'Test',sourceUrl:'https://example.invalid/test',fundingStatus:'unknown',deadline:'2026-10-18',estimatedValue:0,currency:'XOF',stage:'qualification',ownerId:'u-commercial',nextAction:'Qualifier',dueDate:'2026-10-18',priority:'medium',scores:{strategic:50,references:50,capacity:50,access:50,economics:50,competition:50},gates:{eligibility:'WARN',independence:'WARN',funding:'WARN'},referenceIds:[],expertIds:[],requirementIds:[]});
    expect(promoted?.stage).toBe('qualification');
    expect(repo.signals().some(item=>item.id==='sig-001')).toBe(false);
    expect(repo.opportunities().some(item=>item.id==='opp-signal-test')).toBe(true);
  });
});
