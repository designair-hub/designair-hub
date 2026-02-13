# Woodestic microsite scaffold

Statikus microsite sablon a csatolt design alapján, előkészített többnyelvűséggel (HU/EN), placeholder képekkel és Dockeres futtatással.

## Struktúra

- `public/index.html` – oldal struktúra.
- `public/assets/css/main.css` – stílusok.
- `public/assets/js/i18n.js` – egyszerű kliens oldali i18n loader.
- `public/locales/*.json` – fordítási kulcsok nyelvenként.
- `public/assets/images/**` – képek helye placeholderrel.
- `Dockerfile` + `docker/nginx/default.conf` – produkciós statikus kiszolgálás.

## Lokális futtatás

```bash
python3 -m http.server 8080 --directory public
```

## Docker futtatás

```bash
docker build -t woodestic-microsite .
docker run --rm -p 8080:80 woodestic-microsite
```
