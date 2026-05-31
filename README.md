# MatchScore - Śledzenie Wyników Sportowych

Prosta aplikacja webowa do śledzenia wyników sportowych na żywo, korzystająca z API ESPN.

## Funkcje

- **Wybór dyscypliny:** Wsparcie dla NFL, NBA, MLB, NHL oraz Futbolu Amerykańskiego (NCAA).
- **Wyniki na żywo:** Przegląd aktualnych meczów z automatycznym stronicowaniem.
- **Wyszukiwarka:** Możliwość filtrowania meczów po nazwie drużyny.
- **Szczegóły meczu:** Szczegółowe statystyki oraz liderzy dla konkretnego spotkania.
- **Ulubione:** Możliwość dodawania meczów do listy ulubionych (zapisywane w `localStorage`).

## Technologie

- **Frontend:** HTML5, CSS3, JavaScript (ES6+).
- **API:** Dane pobierane z publicznych endpointów ESPN.
- **Stylizacja:** Czysty CSS z podziałem na moduły.

## Jak uruchomić

1. Sklonuj repozytorium lub pobierz pliki.
2. Otwórz plik `index.html` w dowolnej przeglądarce internetowej.
3. Nie jest wymagana żadna dodatkowa konfiguracja ani serwer (aplikacja działa jako statyczne pliki).

## Struktura plików

- `index.html` - Strona główna (wybór sportu).
- `scores.html` - Lista wyników.
- `details.html` - Szczegóły meczu.
- `favorites.html` - Lista ulubionych.
- `js/` - Logika aplikacji (obsługa API, renderowanie, ulubione).
- `*.css` - Pliki stylów dla poszczególnych widoków.

---
&copy; 2026 MatchScore Tracker
