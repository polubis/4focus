# Specyfikacja interfejsu użytkownika - 4focus (MVP)

## Spis treści
1. Przegląd interfejsu użytkownika
2. Kluczowe widoki i ekrany
3. Przepływy użytkownika
4. Specyfikacja komponentów
5. Zarządzanie danymi
6. Responsywność i dostępność
7. Nierozwiązane kwestie

## 1. Przegląd interfejsu użytkownika

Aplikacja **4focus** w wersji **MVP** oferuje minimalistyczny interfejs użytkownika, zaprojektowany z myślą o osobach z **ADHD** i trudnościami w utrzymaniu koncentracji. Interfejs jest oparty na czarno-białej estetyce z żółtawym tłem i szarawym tekstem, inspirowanej design systemem Anthropic, zapewniając dobry kontrast bez zbyt intensywnych bodźców wizualnych. Aplikacja koncentruje się na zarządzaniu zadaniami przy użyciu **Macierzy Eisenhowera** do kategoryzacji priorytetów, z dedykowanym **Trybem Skupienia** wspierającym użytkownika w realizacji zadań.

Jako **Progressive Web App (PWA)** z responsywnym interfejsem (**RWD**), 4focus dostosowuje się do różnych urządzeń, z nawigacją umieszczoną na dole ekranu dla urządzeń mobilnych i na górze dla urządzeń desktopowych.

## 2. Kluczowe widoki i ekrany

### 2.1. Ekran logowania
- Minimalistyczny interfejs logowania zgodny z ogólną estetyką aplikacji
- Dwie opcje logowania:
  - Logowanie przez Google OAuth
  - Standardowe logowanie przez login i hasło
- Brak rozbudowanego procesu onboardingu

### 2.2. Widok listy zadań (główny)
- Zadania pogrupowane w sekcje według kategorii **Macierzy Eisenhowera**
- Sekcje z nagłówkami kategorii w formacie sticky headers dla lepszej nawigacji
- Każdy komponent zadania zawiera:
  - Nazwę zadania (z ucięciem dla długich tytułów)
  - Dedykowany przycisk do zmiany statusu
  - Czas wykonania (dla zadań zakończonych) w formie słownej
- Zadania ze statusem **DONE** są przekreślone i przesunięte na koniec listy w danej sekcji
- Brak mechanizmu filtrowania - wszystkie zadania są widoczne jednocześnie
- Brak paginacji

### 2.3. Tryb Skupienia
- Pełnoekranowy popup aktywowany przy zmianie statusu zadania na **PENDING**
- Zawiera:
  - Informację o aktualnie wykonywanym zadaniu
  - Prostą animację "ruchu wiatru" w tle
  - Trzy przyciski: "skończ i weź następne", "ukończ", "wyjdź"
- Przy próbie wyjścia z trybu wyświetla komunikat z naukowym faktem o ważności koncentracji
- Zachowanie stanu w przypadku odświeżenia strony/przerwania sesji

### 2.4. Widok raportów i statystyk
- Dostępny przez ikonę przy profilu użytkownika
- Notyfikacja o nowym raporcie przy ikonie profilu
- Domyślny widok: listing raportów z całego tygodnia
- Przyciski do wyboru zakresu czasowego:
  - Tydzień
  - Miesiąc
  - Rok
  - Custom (z prostym selektorem dat)
- Wykresy liniowe prezentujące:
  - Procent wykonanych zadań
  - Średni czas wykonania zadań
  - Ilość przypadków rozproszenia uwagi

## 3. Przepływy użytkownika

### 3.1. Rejestracja i logowanie
1. Użytkownik otwiera aplikację
2. Wybiera metodę logowania (Google lub login/hasło)
3. Po pomyślnej autentykacji zostaje przekierowany do widoku głównego

### 3.2. Zarządzanie zadaniami
1. Użytkownik dodaje nowe zadanie przez formularz
   - Wprowadza nazwę zadania
   - Opcjonalnie dodaje opis
   - Wybiera kategorię z **Macierzy Eisenhowera**
2. Nowe zadanie pojawia się na liście ze statusem **TODO**
3. Użytkownik może edytować lub usuwać zadania

### 3.3. Wykonywanie zadania
1. Użytkownik zmienia status zadania na **PENDING** z widoku listy
2. Aplikacja automatycznie przechodzi do **Trybu Skupienia**
3. Po ukończeniu zadania, użytkownik klika "ukończ" lub "skończ i weź następne"
4. Zadanie otrzymuje status **DONE** i wyświetla czas wykonania
5. Użytkownik wraca do widoku listy

### 3.4. Przeglądanie raportów
1. Użytkownik klika ikonę raportów przy profilu użytkownika
2. Przegląda listę raportów dziennych z domyślnego zakresu (tydzień)
3. Może zmienić zakres czasowy (tydzień/miesiąc/rok/custom)
4. Analizuje wykresy i statystyki

## 4. Specyfikacja komponentów

### 4.1. Komponent zadania
- Format: karty z minimalną wysokością
- Zawartość:
  - Nazwa zadania (ucięta dla długich tytułów)
  - Dedykowany przycisk do zmiany statusu
  - Czas wykonania (dla zadań **DONE**) w formie tekstowej (np. "10 sekund", "minuta i 20 sekund")
- Wizualne rozróżnienie:
  - Przekreślenie dla zadań ze statusem **DONE**
  - Umieszczenie zadań **DONE** na końcu listy w danej sekcji

### 4.2. Nagłówki sekcji
- Sticky headers dla kategorii **Macierzy Eisenhowera**
- Sortowanie kategorii według priorytetów:
  1. Pilne/Ważne
  2. Ważne/Niepilne
  3. Pilne/Nieważne
  4. Nieważne/Niepilne

### 4.3. Formularz zadania
- Modalny, minimalistyczny formularz
- Pola:
  - Nazwa zadania (wymagane)
  - Opis zadania (opcjonalne)
  - Kategoria **Macierzy Eisenhowera** (wymagane, wybór z 4 opcji)

### 4.4. Tryb Skupienia
- Pełnoekranowy overlay
- Minimalistyczny design z subtelnymi elementami UI
- Animacja "ruchu wiatru" w tle
- Przyciski:
  - "Skończ i weź następne"
  - "Ukończ"
  - "Wyjdź"
- Komunikat ostrzegawczy przy próbie wyjścia

### 4.5. Komponenty raportów
- Listing raportów dziennych
- Selektor zakresu czasowego (3 przyciski + custom picker)
- Wykresy liniowe dla statystyk

## 5. Zarządzanie danymi

### 5.1. Przechowywanie i dostęp do danych
- Centralne przechowywanie danych zadań i statystyk
- Zabezpieczony dostęp powiązany z kontem użytkownika
- Zachowanie stanu zadań między sesjami

### 5.2. Zarządzanie stanem aplikacji
- Globalny stan aplikacji dla zadań i ustawień użytkownika
- Zachowanie stanu Trybu Skupienia w przypadku przerwania sesji
- Zarządzanie sesją użytkownika

### 5.3. Operacje na danych
- Automatyczne generowanie raportów raz dziennie
- Uwzględnianie strefy czasowej użytkownika przy operacjach z datą/czasem
- System notyfikacji przy ikonie profilu

## 6. Responsywność i dostępność

### 6.1. Responsywność
- PWA z interfejsem RWD dostosowującym się do różnych urządzeń
- Nawigacja:
  - Na dole ekranu dla urządzeń mobilnych
  - Na górze dla urządzeń desktopowych

### 6.2. Paleta kolorów i kontrast
- Czarno-biały interfejs z żółtawym tłem
- Szarawy tekst zapewniający odpowiedni kontrast
- Inspiracja design systemem Anthropic

### 6.3. Dostępność
- Minimalistyczny, funkcjonalny interfejs
- Wyraźne rozróżnienie elementów UI
- Responsywne komponenty adaptujące się do różnych rozmiarów ekranów

## 7. Nierozwiązane kwestie

1. Dokładny wygląd i parametry animacji "ruchu wiatru" w Trybie Skupienia.
2. Szczegółowy format raportów i wykresów statystycznych - konkretne metryki i sposób ich prezentacji.
3. Dokładna treść komunikatów ostrzegawczych przy próbie wyjścia z Trybu Skupienia.
4. Sposób prezentacji punktów karnych w raportach.
5. Szczegółowy format wizualizacji czasu wykonania zadania.
6. Dokładne zasady oznaczania przypadków rozproszenia uwagi w statystykach.
7. Szczegóły procesu rejestracji dla nowych użytkowników.
8. Lokalizacja przycisku dodawania nowego zadania w interfejsie.
