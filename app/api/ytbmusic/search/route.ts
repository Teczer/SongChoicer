import { NextRequest, NextResponse } from 'next/server';

import { getYTMusicInstance } from '../instance';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Paramètre q manquant' }, { status: 400 });
  }

  try {
    const ytmusic = await getYTMusicInstance();
    const results = await ytmusic.searchAlbums(query);
    return NextResponse.json(results);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erreur YTMusic API' }, { status: 500 });
  }
}
