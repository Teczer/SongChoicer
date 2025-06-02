import { NextRequest, NextResponse } from 'next/server';

import { getYTMusicInstance } from '../instance';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const albumId = searchParams.get('albumId');

  if (!albumId) {
    return NextResponse.json({ error: 'Paramètre albumId manquant' }, { status: 400 });
  }

  try {
    const ytmusic = await getYTMusicInstance();
    const results = await ytmusic.getAlbum(albumId);
    return NextResponse.json(results);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Erreur YTMusic API' }, { status: 500 });
  }
}
