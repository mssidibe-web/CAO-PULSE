import {NextResponse} from 'next/server';
export function ok(data:unknown,meta:Record<string,unknown>={}){return NextResponse.json({data,error:null,meta})}
export function fail(message:string,status=400){return NextResponse.json({data:null,error:{message},meta:{}},{status})}
