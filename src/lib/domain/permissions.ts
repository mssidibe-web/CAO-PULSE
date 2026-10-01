import type {Mission,Role,User} from '@/lib/types';
export function canReadMission(u:User,m:Mission){return u.role==='admin'||u.role==='quality'||m.authorizedUserIds.includes(u.id)}
export function canEditOpportunity(role:Role){return role==='commercial'||role==='admin'}
export function canDecideBid(role:Role){return role==='founder'||role==='admin'}
export function canValidateIndependence(role:Role){return role==='quality'||role==='admin'}
export function canManageRequirement(role:Role){return role==='commercial'||role==='quality'||role==='admin'}
