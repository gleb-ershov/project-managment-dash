import { getProjects } from '@/utils/data-access/getProjects';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const search = req?.nextUrl?.searchParams.get('search') || '';
    return Response.json(await getProjects(search));
}
