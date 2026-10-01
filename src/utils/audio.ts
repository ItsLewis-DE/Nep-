// Web Audio API synthesizer for retro ambient music and sound effects

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isPlayingAmbient: boolean = false;
  private timerId: number | null = null;

  constructor() {
    const saved = localStorage.getItem('tiem_may_audio_muted');
    this.isMuted = saved !== null ? saved === 'true' : true;
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('tiem_may_audio_muted', String(this.isMuted));
    if (!this.isMuted) {
      this.initContext();
      this.startAmbient();
      this.playChime();
    } else {
      this.stopAmbient();
    }
    return this.isMuted;
  }

  // Play gentle wooden click
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  // Play lovely chime for rewards / signs
  public playChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime + i * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.45);
    });
  }

  // Play cute kitten meow sound
  public playCatMeow() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // Meow pitch curve
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.35);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  // Synthesize peaceful pentatonic Vietnamese-inspired evening melody
  private startAmbient() {
    if (this.isPlayingAmbient || this.isMuted) return;
    this.isPlayingAmbient = true;

    // Traditional pentatonic scale: C, D, E, G, A (Do, Re, Mi, Sol, La)
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    let step = 0;

    const loop = () => {
      if (!this.isPlayingAmbient || this.isMuted || !this.ctx) return;

      const baseNote = scale[step % scale.length];
      const t = this.ctx.currentTime;

      // Play soft pluck like Dan Tranh / Guqin
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseNote, t);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.0005, t + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 1.25);

      step = (step + Math.floor(Math.random() * 3) + 1) % scale.length;
      this.timerId = window.setTimeout(loop, 900 + Math.random() * 400);
    };

    loop();
  }

  private stopAmbient() {
    this.isPlayingAmbient = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}

export const soundManager = new SoundManager();
