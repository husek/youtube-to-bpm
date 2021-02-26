declare module 'music-tempo' {
  export class MusicTempo {
    constructor(buffer: Float32Array, options?: { expiryTime?: number, maxBeatInterval?: number });
    tempo: number
  }

  export default MusicTempo;
}
