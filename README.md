# Stage Crono — Gravitas Solutions

Sistema de cronometraje GPS para competencias enduro/DH.

## Estructura
```
stage-crono/
├── index.html          ← Home / sesión del piloto
├── crono.html          ← Cronómetro unificado (?seg=1 o ?seg=2)
├── resultados.html     ← Leaderboard en vivo
├── assets/
│   ├── session.js      ← Sesión persistente + config Supabase
│   ├── seg01.js        ← Stage 1 · Lo Barnechea (4.8km)
│   └── seg02.js        ← Stage 2 · Quinchamali (3.06km)
├── icons/
├── manifest.json       ← PWA única
└── sw.js               ← Service worker
```

## Uso
- `index.html` → ingresa nombre → elige stage
- `crono.html?seg=1` → Stage 1
- `crono.html?seg=2` → Stage 2
- `resultados.html` → Leaderboard

## GitHub Pages
Activar en Settings → Pages → Branch: main → / (root)
