declare module 'scrambling-text' {
  interface ScramblerOptions {
    characters?: string[];
    speed?: number;
  }

  class Scrambler {
    static CHARACTERS: {
      DEFAULT: string[];
      ALPHABET: string[];
    };

    constructor();

    scramble(
      text: string,
      callback: (text: string) => void,
      options?: ScramblerOptions
    ): void;
  }

  export default Scrambler;
}