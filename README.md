# Woodestic microsite scaffold

<<<<<<< codex/create-microsite-with-placeholders-and-dockerfile-6fnc8o
Statikus microsite sablon a csatolt design alapján, előkészített többnyelvűséggel, placeholder képekkel és Dockeres futtatással.

## Struktúra

- `public/index.html` – oldal struktúra + cookie banner helye.
- `public/assets/css/main.css` – stílusok.
- `public/assets/js/i18n.js` – domain alapú locale kiválasztás + cookie consent + analytics bootstrap.
- `public/locales/*.json` – fordítási kulcsok (hu, en, de, fr, it, sv, lt).
- `public/assets/images/**` – képek és videó-placeholderek.
- `Dockerfile` + `docker/nginx/default.conf` – produkciós statikus kiszolgálás.

## Nyelvi domain kötés

Az `i18n.js` `domainLangMap` objektumában tudod a domaineket nyelvhez kötni.
Lokális tesztnél használható: `?lang=en`, `?lang=de`, stb.

## Analytics + cookie banner

1. Állítsd be a GA mérési azonosítót az `index.html` fájlban a `<meta name="ga-measurement-id" ...>` értékével.
2. Az analytics script csak akkor töltődik be, ha a felhasználó elfogadja a cookie-kat.
3. A választás `localStorage`-ben tárolódik (`cookieConsent`).

=======
Statikus microsite sablon a csatolt design alapján, előkészített többnyelvűséggel (HU/EN), placeholder képekkel és Dockeres futtatással.

## Struktúra

- `public/index.html` – oldal struktúra.
- `public/assets/css/main.css` – stílusok.
- `public/assets/js/i18n.js` – egyszerű kliens oldali i18n loader.
- `public/locales/*.json` – fordítási kulcsok nyelvenként.
- `public/assets/images/**` – képek helye placeholderrel.
- `Dockerfile` + `docker/nginx/default.conf` – produkciós statikus kiszolgálás.

>>>>>>> main
## Lokális futtatás

```bash
python3 -m http.server 8080 --directory public
```

## Docker futtatás

```bash
docker build -t woodestic-microsite .
docker run --rm -p 8080:80 woodestic-microsite
```
