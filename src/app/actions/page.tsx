import {PageHead} from '@/components/page-head';
import {StatusControl} from '@/components/status-control';
import {repo} from '@/lib/data/repository';

export default function Actions(){return <><PageHead eyebrow="Execution" title="Actions & échéances" sub="Une action doit avoir un owner, une date et un objet métier."/><div className="card" style={{marginTop:18}}><table className="table"><thead><tr><th>Action</th><th>Objet</th><th>Owner</th><th>Date</th><th>Statut</th></tr></thead><tbody>{repo.actions().map(action=><tr key={action.id}><td>{action.title}</td><td>{action.objectType}/{action.objectId}</td><td>{action.ownerId}</td><td>{action.dueDate}</td><td><StatusControl endpoint="/api/actions" id={action.id} value={action.status} options={['todo','in_progress','done']}/></td></tr>)}</tbody></table></div></>}
