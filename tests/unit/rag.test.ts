import {afterEach,describe,expect,it} from 'vitest';
import {ingestRagDocument,queryRag} from '@/lib/rag';
import {repo} from '@/lib/data/repository';
import type {User} from '@/lib/types';
const founder:User={id:'u-founder',name:'Fondateur',role:'founder',missionIds:[],active:true};
const anonymous:User={id:'u-anonymous',name:'Anonymous',role:'anonymous',missionIds:[],active:false};
afterEach(()=>repo.reset());
describe('controlled RAG demo',()=>{it('ingests an office-scoped document and returns its cited passage',()=>{const document=ingestRagDocument(founder,{title:'Méthode de revue qualité',content:'La revue qualité exige une analyse des preuves, une validation humaine et une note de clôture.',scope:'office'});const result=queryRag(founder,'Comment traiter la revue qualité ?');expect(result.answer).toContain('analyse des preuves');expect(result.citations).toContainEqual(expect.objectContaining({sourceId:document.id,title:'Méthode de revue qualité'}));});it('abstains when no authorized source supports the answer',()=>{const result=queryRag(founder,'Quelle est la politique spatiale de Mars ?');expect(result.abstained).toBe(true);expect(result.citations).toEqual([])});it('denies anonymous ingestion and retrieval',()=>{expect(()=>ingestRagDocument(anonymous,{title:'Test',content:'Contenu contrôlé suffisant.',scope:'office'})).toThrow('Session requise');expect(queryRag(anonymous,'test').abstained).toBe(true)})});
