# TEDxFLAME University 2027 — WILDFIRE: What Burns, Becomes

Static site: plain HTML, CSS and JavaScript. No build step.

## Run locally
Open `index.html` directly, or serve the folder:

    python3 -m http.server 8000
    # then visit http://localhost:8000

## Where things live
- `index.html` — all sections (hero, theme, speakers, team, FLAME & venue, footer)
- `css/style.css` — theme, layout, responsive rules
- `js/main.js` — countdown, ember animation, nav, team rendering, reveal-on-scroll
- `js/team-data.js` — **edit this to update the team**
- `team_picture/` — 34 background-removed headshots (`member_01.png` … `member_34.png`)
- `assets/` — drop optional images here (see below)

## Adding photos
Every photo is optional; a missing file falls back to an initials avatar.
- Speakers: `assets/speaker_dushyant_dubey.jpg`, `assets/speaker_neha_panchamiya.jpg`
- Hero background photo: `assets/wildfire.jpg` (layered on top of the CSS fire gradients)
- Team: set each member's `img` in `js/team-data.js`, e.g. `team_picture/member_07.png`
  or rename a file to the convention `team_picture/<Department>_<FirstLast>.png`.

## Countdown
Target date is set in `js/main.js` (`TARGET`), currently 10 January 2027, 09:00 IST.
