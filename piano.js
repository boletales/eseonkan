function generatePiano(parent, octaves, onclick){
  let keys = [];
  let piano = document.createElement("div");
  piano.classList.add("piano");
  for(let o=0; o<octaves; o++){
    let octave_white = document.createElement("div");
    octave_white.classList.add("octave_white");
    [0,2,4,5,7,9,11].forEach(i=>{
      let kid = o*12 + i;
      let white_key = document.createElement("div");
      white_key.classList.add("white_key");
      white_key.onclick = ()=>onclick(kid, keys);
      octave_white.appendChild(white_key);
      keys[kid] = white_key;
    });
    let octave_black_ce = document.createElement("div");
    octave_black_ce.classList.add("octave_black_ce", "octave_black_inner");
    [1,3].forEach(i=>{
      let kid = o*12 + i;
      let black_key = document.createElement("div");
      black_key.classList.add("black_key");
      black_key.onclick = ()=>onclick(kid, keys);
      octave_black_ce.appendChild(black_key);
      keys[kid] = black_key;
    });
    let octave_black_fb = document.createElement("div");
    octave_black_fb.classList.add("octave_black_fb", "octave_black_inner");
    [6,8,10].forEach(i=>{
      let kid = o*12 + i;
      let black_key = document.createElement("div");
      black_key.classList.add("black_key");
      black_key.onclick = ()=>onclick(kid, keys);
      octave_black_fb.appendChild(black_key);
      keys[kid] = black_key;
    });
    let octave_black = document.createElement("div");
    octave_black.classList.add("octave_black");
    octave_black.appendChild(octave_black_ce);
    octave_black.appendChild(octave_black_fb);
    let octave = document.createElement("div");
    octave.classList.add("octave");
    octave.appendChild(octave_white);
    octave.appendChild(octave_black);
    piano.appendChild(octave);
  }
  parent.appendChild(piano);
  return keys;
}