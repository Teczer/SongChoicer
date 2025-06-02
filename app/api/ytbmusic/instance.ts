import YTMusic from 'ytmusic-api';

let ytmusic: YTMusic | null = null;

export async function getYTMusicInstance() {
  if (!ytmusic) {
    ytmusic = new YTMusic();
    await ytmusic.initialize();
  }
  return ytmusic;
}
