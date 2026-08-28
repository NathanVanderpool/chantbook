// Shared word tokenizer for chant lyrics + karaoke highlighting.
// LYRICS shape: stanzas[ lines[ segs[chordSym, text] ] ]
// Words are numbered globally in reading order. A word split across two
// chord segments ("We un" + "fold") keeps ONE index, carried by both parts.
(function () {
  function tokenize(LYRICS) {
    let wi = -1, prevWs = true;
    const words = [];
    const stanzas = (LYRICS || []).map(stz => stz.map(line => {
      prevWs = true;
      return line.map(seg => {
        const tx = seg[1] || '';
        const parts = [];
        tx.split(/(\s+)/).filter(s => s.length).forEach(ch => {
          if (/^\s+$/.test(ch)) { parts.push({ tx: ch, w: -1 }); prevWs = true; return; }
          if (/^[\u00d7x]\s*\d+$/i.test(ch)) { parts.push({ tx: ch, w: -1 }); prevWs = true; return; } // repeat marker, not a sung word
          if (prevWs) { wi++; words.push({ i: wi, tx: ch }); }
          else words[wi].tx += ch;
          parts.push({ tx: ch, w: wi });
          prevWs = false;
        });
        return { sym: seg[0] || '', parts };
      });
    }));
    // line groups: [{stanza, words:[{i,tx}]}] for tools that show words by line
    const lines = [];
    stanzas.forEach((stz, zi) => stz.forEach(line => {
      const seen = [], ws = [];
      line.forEach(s => s.parts.forEach(p => {
        if (p.w >= 0 && seen.indexOf(p.w) === -1) { seen.push(p.w); ws.push(words[p.w]); }
      }));
      lines.push({ stanza: zi, words: ws });
    }));
    return { stanzas, words, lines };
  }
  window.WT = { tokenize };
})();
