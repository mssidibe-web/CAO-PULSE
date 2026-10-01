import {describe,expect,it} from 'vitest';
import {opportunities} from '@/lib/data/fixtures';
import {blockingReasons,suggestedDecision} from '@/lib/domain/scoring';

const base=opportunities.find(item=>item.id==='opp-001')!;
const cases=[
  ['eligible-ready',base,'GO'],
  ['funding-warning',opportunities.find(item=>item.id==='opp-002')!,'GO_CONDITIONNEL'],
  ['independence-blocked',opportunities.find(item=>item.id==='opp-003')!,'NO_GO'],
  ['unknown-funding',opportunities.find(item=>item.id==='opp-004')!,'GO_CONDITIONNEL'],
  ['eligibility-blocked',{...base,gates:{...base.gates,eligibility:'BLOCKED' as const}},'NO_GO'],
  ['unfunded',{...base,fundingStatus:'not_funded' as const},'NO_GO'],
  ['low-score',{...base,scores:{...base.scores,strategic:40,references:40,capacity:40,access:40,economics:40,competition:40}},'GO_CONDITIONNEL'],
  ['high-score-warning',{...base,gates:{...base.gates,funding:'WARN' as const}},'GO_CONDITIONNEL'],
] as const;

describe('commercial decision cases',()=>{for(const [name,opportunity,decision] of cases){it(name,()=>{expect(suggestedDecision(opportunity)).toBe(decision);if(decision==='NO_GO')expect(blockingReasons(opportunity).length).toBeGreaterThan(0)})}});
