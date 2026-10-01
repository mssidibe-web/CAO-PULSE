import {describe,expect,it} from 'vitest';
import {actions,billing,evidence,opportunities,references,requirements,reviewPoints} from '@/lib/data/fixtures';
import {computeKpis} from '@/lib/domain/kpis';

describe('command center KPIs',()=>{
  it('uses the supplied reference date for overdue actions',()=>{
    const before=computeKpis(opportunities,references,evidence,requirements,reviewPoints,billing,actions,'2026-01-01');
    const after=computeKpis(opportunities,references,evidence,requirements,reviewPoints,billing,actions,'2027-01-01');
    expect(after.overdueActions).toBeGreaterThanOrEqual(before.overdueActions);
  });
});
