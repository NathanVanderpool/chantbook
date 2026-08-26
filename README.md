# Chantbook

The Agapic Chants Chantbook — lyrics, chords, attentional instructions, and a
harmony practice player for every chant.

Part of the [Agapic Chants](https://agapicchants.com) project, curated by
Nathan Vanderpool (Bonn).

## Running it

It is a static site. No build step, no dependencies. Open `index.html`, or
serve the folder:

    python3 -m http.server

Then visit http://localhost:8000

## Deploying to GitHub Pages

1. Push this folder to a repository.
2. Settings → Pages → deploy from branch `main`, folder `/ (root)`.
3. The `.nojekyll` file keeps Pages from reprocessing the files.

## What's here

    index.html                        the chant list
    how-to-use.html                   guide to the learning tools
    donate.html                       support page
    sanctuary.html                    chant page  + -print.html sheet
    there-is-the-body.html            chant page  + -print.html sheet
    there-is-love.html                chant page  + -print.html sheet
    be-just-the-way-you-are.html      chant page  + -print.html sheet
    assets/                           logo, CC badge, score data (JSON)
    audio/                            studio recordings (mp3)
    support.js                        page runtime (required by every page)
    doc-page.js                       print-sheet page shell

### Chant pages

Each chant page has:

- the studio recording, with the words available inline
- the attentional instruction
- an instrument picker (sing / guitar / ukulele / piano) with chord names over
  the lyrics, chord diagrams, and beginner + play-along presets
- a key stepper that transposes chords, diagrams, and the practice player
- **Learn a harmony** — a three-voice practice player (melody + two harmonies)
  with mute, octave-down, tempo, drag-to-scrub, and scrolling karaoke words
- a print sheet that follows the key and chord-box settings you chose

### Score data

The practice player reads note data from `assets/*-parts.json`, generated from
MuseScore MusicXML exports. Each file holds three voices:

    { "P1": [ { "t": beat, "d": beats, "m": midiNote, "s": "syllable" }, ... ],
      "P2": [ ... ], "P3": [ ... ],
      "__total": optional loop length in beats }

To update a chant's music, re-export the score and regenerate its JSON.

## Adding a chant

1. Drop the recording in `audio/`.
2. Add the score JSON to `assets/`.
3. Copy the closest existing chant page and edit, in its `<script data-dc-script>`:
   the `LYRICS` array (chord symbol, lyric text), the default `key`, the
   `DEG` chord map, the `fetch()` path for the score JSON, and the audio `src`.
4. Add it to the `chants` list in `index.html`.
5. Copy a print sheet the same way.

## License

The chants are free to sing and share under
[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).
See LICENSE.
