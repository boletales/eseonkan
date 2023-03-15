const ctx = new AudioContext();
let gainNode = ctx.createGain();
gainNode.connect(ctx.destination);
gainNode.gain.value = 0.1;

let wave = {
  sine : ctx.createPeriodicWave(
     [0,1]
    ,[0,0]
  )
, test : ctx.createPeriodicWave(
     [0,120,48,12,2,1,1]
    ,[0,  0, 0, 0,0,0,1]
  )
};
let gain = {
    default : (length)=>{
      let g = ctx.createGain();
      g.connect(gainNode);
      g.gain.setValueAtTime              (0.0 , ctx.currentTime);
      g.gain.linearRampToValueAtTime     (1.0 , ctx.currentTime + 0.006);
      g.gain.linearRampToValueAtTime     (1.0 , ctx.currentTime + (length/1000));
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + (length/1000) + 0.10);
      return g;
    }
  , natural : (length)=>{
      let g = ctx.createGain();
      g.connect(gainNode);
      g.gain.setValueAtTime              (0.0 , ctx.currentTime);
      g.gain.linearRampToValueAtTime     (1.0 , ctx.currentTime + 0.006);
      g.gain.exponentialRampToValueAtTime(0.5 , ctx.currentTime + 0.02);
      g.gain.linearRampToValueAtTime     (0.5 , ctx.currentTime + (length/1000));
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + (length/1000) + 0.10);
      return g;
    }
};

let ocillator = {
    A : (tone, length) => {
      let g = gain.default(length);
      let o = ctx.createOscillator();
      o.setPeriodicWave(wave.sine);
      o.frequency.setValueAtTime(toneToFreq(tone), ctx.currentTime);
      o.connect(g);
      return o;
    }
  , B : (tone, length) => {
      let g = gain.natural(length);
      let o = ctx.createOscillator();
      o.setPeriodicWave(wave.test);
      o.frequency.setValueAtTime(toneToFreq(tone), ctx.currentTime);
      o.connect(g);
      return o;
    }
};