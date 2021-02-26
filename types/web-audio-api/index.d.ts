declare module 'web-audio-api' {

  class AudioContextType extends AudioContext{
    constructor()
  }

  export {
    AudioContextType as AudioContext
  }
}
