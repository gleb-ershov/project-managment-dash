import { getMembers } from '@/utils/data-access/getMembers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const search = req?.nextUrl?.searchParams.get('search') || '';
    return Response.json(await getMembers(search));
}
