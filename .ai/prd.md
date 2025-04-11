# Dokument wymagań produktu (PRD) - 4focus (MVP)

## Spis treści
1. Przegląd projektu
2. Problem użytkownika
3. Wymagania funkcjonalne
4. Granice projektu
5. Historie użytkownika
6. Metryki sukcesu

## 1. Przegląd projektu

Aplikacja **4focus** (w wersji **MVP** - Minimum Viable Product) to narzędzie typu **Progressive Web App (PWA)** z responsywnym interfejsem (**RWD**), zaprojektowane w celu pomocy użytkownikom, w szczególności osobom z **ADHD** lub trudnościami w skupieniu, w organizacji zadań. Aplikacja wykorzystuje **Macierz Eisenhowera** do kategoryzacji zadań, pomagając w priorytetyzacji. Użytkownicy mogą przeglądać zadania w uproszczonym widoku listy, dodawać nowe zadania poprzez prosty interfejs oraz zarządzać ich statusem, w tym korzystać z **Trybu Skupienia** podczas wykonywania zadania. Aplikacja generuje również dzienne raporty statystyk, które pomagają użytkownikowi śledzić postępy i poprawiać efektywność. Celem **MVP** jest dostarczenie podstawowej funkcjonalności planowania i śledzenia zadań z naciskiem na prostotę i szybkość działania, dostępnej na urządzeniach mobilnych i desktopowych poprzez przeglądarkę internetową. Autoryzacja odbywa się za pomocą konta **Google**.

## 2. Problem użytkownika

Głównym problemem, który adresuje aplikacja **4focus**, są trudności ze skupieniem się na konkretnych czynnościach i efektywnym zarządzaniem czasem, co jest szczególnie powszechne u osób z **ADHD**, ale dotyka również szerokiego grona osób poszukujących prostych narzędzi do organizacji. Istniejące narzędzia mogą być zbyt skomplikowane, rozpraszające lub nie dostarczać odpowiedniej struktury priorytetyzacji oraz wsparcia w trakcie wykonywania zadania. Użytkownicy potrzebują prostego, intuicyjnego systemu, który pomoże im:

-   Zrozumieć priorytety swoich zadań (co jest pilne, a co ważne).
-   Koncentrować się na realizacji aktualnych zadań.
-   Łatwo dodawać i oznaczać zadania jako wykonane.
-   Minimalizować wysiłek potrzebny do zarządzania listą zadań, aby skupić się na ich realizacji.
-   **Otrzymać wsparcie w utrzymaniu koncentracji podczas pracy nad wybranym zadaniem.**
-   **Otrzymać informacje zwrotne o swoich postępach i wzorcach zachowań.**

**4focus MVP** ma na celu dostarczenie takiego właśnie narzędzia, koncentrując się na **Macierzy Eisenhowera** jako podstawowej metodzie organizacji oraz wprowadzając mechanizmy wspierające skupienie.

## 3. Wymagania funkcjonalne

### 3.1. Autoryzacja i Zarządzanie Kontem (AUTH)
-   **FR-AUTH-001:** Użytkownik musi mieć możliwość zarejestrowania się i zalogowania do aplikacji wyłącznie za pomocą swojego konta **Google**.
-   **FR-AUTH-002:** Aplikacja powinna bezpiecznie przechowywać podstawowe informacje o użytkowniku uzyskane z Google (ID, email, ewentualnie imię) w celu powiązania zadań z kontem.
-   **FR-AUTH-003:** Użytkownik musi mieć możliwość wylogowania się z aplikacji.

### 3.2. Zarządzanie Zadaniami (CRUD) (TASK)
-   **FR-TASK-001:** Użytkownik musi mieć możliwość szybkiego dodania nowego zadania poprzez formularz zawierający pola:
    -   Nazwa zadania (pole wymagane)
    -   Opis zadania (pole opcjonalne)
    -   Kategoria **Macierzy Eisenhowera** (pole wymagane, wybór z 4 opcji)
-   **FR-TASK-002:** Użytkownik musi mieć możliwość edycji istniejącego zadania (zmiana nazwy, opisu, kategorii).
-   **FR-TASK-003:** Użytkownik musi mieć możliwość usunięcia istniejącego zadania.
-   **FR-TASK-004:** Każde zadanie musi mieć przypisany jeden z trzech statusów: **TODO** (Do zrobienia), **PENDING** (W trakcie), **DONE** (Zakończone).
-   **FR-TASK-005:** Użytkownik musi mieć możliwość zmiany statusu zadania poprzez interakcję z elementem zadania na liście (np. kliknięcie przycisku/ikony statusu lub samego zadania). Przepływ statusów to: **TODO** -> **PENDING** -> **DONE**.
-   **FR-TASK-006:** Dla zadań ze statusem **DONE**, aplikacja musi wyświetlać czas, jaki upłynął od momentu zmiany statusu na **PENDING** do momentu zmiany statusu na **DONE**.

### 3.3. Widok Listy Zadań (VIEW)
-   **FR-VIEW-001:** Aplikacja musi prezentować prosty interfejs listy zadań.
-   **FR-VIEW-002:** Aplikacja zawsze prezentuje wszystkie zadania użytkownika w jednym widoku.
-   **FR-VIEW-003:** [Usunięto - funkcjonalność poza zakresem MVP]
-   **FR-VIEW-004:** Aplikacja musi wyświetlać listę wszystkich zadań użytkownika.
-   **FR-VIEW-005:** Zadania na liście muszą być wizualnie rozróżnione (np. kolorem tła, etykietą) w zależności od przypisanej kategorii **Macierzy Eisenhowera**.
-   **FR-VIEW-006:** Zadania na liście muszą być pogrupowane według kategorii **Macierzy Eisenhowera** (1. Pilne/Ważne, 2. Ważne/Niepilne, 3. Pilne/Nieważne, 4. Nieważne/Niepilne) i posortowane wewnątrz grup po aktualnym statusie.
-   **FR-VIEW-007:** Użytkownik musi mieć możliwość podstawowego filtrowania listy zadań (kryteria do ustalenia, np. po statusie, kategorii).

### 3.4. Interfejs Użytkownika i Platforma (UI)
-   **FR-UI-001:** Aplikacja musi być typu **Progressive Web App (PWA)**.
-   **FR-UI-002:** Interfejs użytkownika musi być responsywny (**RWD**) i dostosowywać się do różnych rozmiarów ekranów (mobilne, desktopowe).
-   **FR-UI-003:** Interfejs powinien być minimalistyczny, z ograniczoną paletą kolorów i dobrym kontrastem, aby minimalizować rozpraszanie.
-   **FR-UI-004:** Po zmianie statusu zadania na **PENDING**, aplikacja musi przejść do dedykowanego **Trybu Skupienia (Focus Mode Screen)**. Ekran ten powinien:
    -   Wyświetlać informacje o aktywnym zadaniu (minimum nazwę).
    -   Zawierać prostą, minimalistyczną animację (np. subtelne tło, licznik czasu - *szczegóły do ustalenia w fazie projektowania UI*).
    -   Ukrywać standardowy interfejs aplikacji (np. listę zadań, kalendarz, nawigację).
    -   Udostępniać wyraźną opcję oznaczenia bieżącego zadania jako **DONE**.
    -   Przy próbie opuszczenia Trybu Skupienia przed oznaczeniem zadania jako **DONE** (np. przez nawigację wstecz, próbę zamknięcia aplikacji/karty), wyświetlić komunikat ostrzegawczy zniechęcający do przerwania (np. "Skupienie na jednym zadaniu pomaga w efektywności. Czy na pewno chcesz teraz przerwać?").
    -   Pełnić funkcję blokera, który aktywnie utrudnia użytkownikowi wyjście z aktualnie wykonywanego zadania (np. poprzez dodatkowe potwierdzenia, opóźnienia w nawigacji lub inne mechanizmy zniechęcające do rozpraszania).
    -   Po oznaczeniu zadania jako **DONE** z poziomu Trybu Skupienia, aplikacja powinna powrócić do standardowego widoku (np. listy zadań).

### 3.5. Statystyki i Raportowanie (STATS)
-   **FR-STATS-001:** Na koniec każdego dnia aplikacja musi automatycznie generować raport statystyk dla użytkownika.
-   **FR-STATS-002:** Raport musi zawierać następujące informacje:
    -   Średni czas wykonania zadań w danym dniu.
    -   Liczba przypadków, gdy użytkownik niepotrzebnie sięgnął po telefon lub próbował opuścić Tryb Skupienia.
    -   Punkty karne za zmiany priorytetu zadania lub wycofywanie się z zadań.
    -   Ocena dzienna (w skali 1-10) wyliczana na podstawie powyższych metryk.
    -   Personalizowane sugestie i porady (tips & tricks), które pomogą zniwelować powtarzające się problemy użytkownika.
-   **FR-STATS-003:** Użytkownik musi mieć możliwość przeglądania historycznych raportów dziennych.
-   **FR-STATS-004:** Aplikacja musi zbierać i przechowywać dane niezbędne do generowania raportów (czasy wykonania zadań, próby przerywania trybu skupienia, zmiany priorytetów).
-   **FR-STATS-005:** Wszystkie operacje związane z datą i czasem (generowanie raportów, obliczanie czasu trwania zadań, rejestrowanie zdarzeń) muszą uwzględniać strefę czasową użytkownika.

### 3.6. Prywatność (PRIV)
-   **FR-PRIV-001:** Aplikacja musi posiadać i udostępniać użytkownikowi **Politykę Prywatności** oraz informację o wykorzystywaniu **cookies**, zgodnie z obowiązującymi przepisami (np. RODO), szczególnie w kontekście logowania Google i przechowywania danych zadań.

## 4. Granice projektu

### 4.1. W zakresie MVP (Minimum Viable Product)
-   Funkcjonalności opisane w sekcji **3. Wymagania funkcjonalne**.
-   Logowanie wyłącznie przez **Google** (**FR-AUTH-001**).
-   Podstawowe operacje **CRUD** na zadaniach (**FR-TASK-001**, **FR-TASK-002**, **FR-TASK-003**).
-   Kategoryzacja zadań wg **Macierzy Eisenhowera** (część **FR-TASK-001**).
-   Zmiana statusu zadań (**TODO**, **PENDING**, **DONE**) (**FR-TASK-004**, **FR-TASK-005**).
-   Wyświetlanie czasu trwania zadania (**PENDING** -> **DONE**) (**FR-TASK-006**).
-   Prosty widok listy zadań (**FR-VIEW-001**, **FR-VIEW-002**).
-   Wyświetlanie zadań na liście pogrupowanych i posortowanych wg kategorii (**FR-VIEW-004**, **FR-VIEW-005**, **FR-VIEW-006**).
-   Podstawowe filtrowanie zadań (**FR-VIEW-007**).
-   Wsparcie dla urządzeń mobilnych (**PWA**/**RWD**) (**FR-UI-001**, **FR-UI-002**).
-   Minimalistyczny UI/UX (**FR-UI-003**).
-   **Tryb Skupienia (Focus Mode Screen)** dla zadań **PENDING** z funkcją blokera (**FR-UI-004**).
-   Generowanie dziennych raportów statystyk (**FR-STATS-001**, **FR-STATS-002**, **FR-STATS-003**, **FR-STATS-004**, **FR-STATS-005**).
-   Podstawowe śledzenie analityczne (**Google Analytics**) dla metryk sukcesu.

### 4.2. Poza zakresem MVP
-   Raporty postępów użytkownika.
-   Dodawanie zadań za pomocą interfejsu głosowego.
-   Asystent AI do rozbijania kontekstu na zadania.
-   Widoki kalendarza (dzienny, tygodniowy, miesięczny, niestandardowy zakres dat).
-   Inne techniki organizacji zadań poza **Macierzą Eisenhowera**.
-   Zaawansowane filtrowanie lub sortowanie zadań.
-   Powiadomienia (push, email).
-   Funkcje społecznościowe lub współdzielenie zadań.
-   Możliwość dodawania załączników do zadań.
-   Możliwość tworzenia zadań cyklicznych.
-   Dedykowany proces onboardingu użytkownika.
-   Możliwość logowania/rejestracji za pomocą email/hasło lub innych dostawców (Facebook, etc.).
-   Definiowanie i śledzenie szczegółowych wymagań niefunkcjonalnych (np. specyficzne progi wydajności, zaawansowane testy bezpieczeństwa poza standardowymi praktykami).
-   Dynamiczna regulacja wysokości widoku listy zadań.
-   Zaawansowane opcje konfiguracji Trybu Skupienia (np. wybór animacji, dźwięków tła).

## 5. Historie użytkownika

### 5.1. Autoryzacja i Dostęp (AUTH)

#### US-AUTH-001: Logowanie/Rejestracja przez Google
**Opis:** Jako nowy lub powracający użytkownik, chcę móc zalogować się lub zarejestrować w aplikacji za pomocą mojego konta **Google**, aby uzyskać dostęp do moich zadań bez potrzeby tworzenia nowego konta.
**Kryteria akceptacji:**
-   **Given:** Użytkownik znajduje się na ekranie logowania/startowym aplikacji.
-   **When:** Użytkownik kliknie przycisk "Zaloguj się przez Google".
-   **Then:** Użytkownik zostanie przekierowany do procesu autoryzacji Google.
-   **And:** Po pomyślnej autoryzacji w Google, użytkownik zostanie zalogowany do aplikacji **4focus** i przekierowany do głównego widoku (np. widoku dziennego kalendarza).
-   **And:** Jeśli użytkownik loguje się po raz pierwszy, jego konto zostanie utworzone w systemie **4focus**.
-   **And:** W przypadku błędu autoryzacji Google, użytkownik zobaczy stosowny komunikat błędu.
*(Odnosi się do: FR-AUTH-001, FR-AUTH-002)*

#### US-AUTH-002: Wylogowanie
**Opis:** Jako zalogowany użytkownik, chcę móc się wylogować z aplikacji, aby zakończyć moją sesję i zabezpieczyć dostęp do moich danych.
**Kryteria akceptacji:**
-   **Given:** Użytkownik jest zalogowany w aplikacji.
-   **When:** Użytkownik kliknie opcję/przycisk "Wyloguj".
-   **Then:** Sesja użytkownika zostanie zakończona.
-   **And:** Użytkownik zostanie przekierowany do ekranu logowania/startowego.
*(Odnosi się do: FR-AUTH-003)*

### 5.2. Zarządzanie Zadaniami (TASK)

#### US-TASK-001: Dodawanie nowego zadania
**Opis:** Jako użytkownik, chcę móc szybko dodać nowe zadanie, podając jego nazwę i wybierając kategorię wg **Macierzy Eisenhowera**, abym mógł łatwo wprowadzać swoje obowiązki do systemu.
**Kryteria akceptacji:**
-   **Given:** Użytkownik jest zalogowany i znajduje się w głównym widoku aplikacji.
-   **When:** Użytkownik aktywuje funkcję dodawania zadania (np. klika przycisk "+").
-   **And:** Użytkownik wprowadzi nazwę zadania w odpowiednim polu.
-   **And:** Użytkownik wybierze jedną z czterech kategorii Eisenhowera.
-   **And:** Użytkownik (opcjonalnie) wprowadzi opis zadania.
-   **And:** Użytkownik zatwierdzi dodanie zadania.
-   **Then:** Nowe zadanie zostanie zapisane w systemie ze statusem **TODO**.
-   **And:** Nowe zadanie pojawi się na liście zadań w odpowiedniej kategorii dla wybranego widoku kalendarza (*uwaga: zachowanie dla zadań bez daty do ustalenia*).
-   **And:** Formularz dodawania zadania zostanie zamknięty lub wyczyszczony, gotowy do dodania kolejnego zadania.
-   **And:** Jeśli wymagane pola (nazwa, kategoria) nie zostaną wypełnione, użytkownik zobaczy komunikat błędu i zadanie nie zostanie dodane.
*(Odnosi się do: FR-TASK-001, FR-TASK-004)*

#### US-TASK-002: Edycja istniejącego zadania
**Opis:** Jako użytkownik, chcę móc edytować istniejące zadanie (zmienić jego nazwę, opis lub kategorię **Macierzy Eisenhowera**), aby móc aktualizować informacje o zadaniu lub poprawić błędy.
**Kryteria akceptacji:**
-   **Given:** Użytkownik jest zalogowany i widzi listę swoich zadań.
-   **When:** Użytkownik wybierze opcję edycji dla konkretnego zadania.
-   **And:** Użytkownik zmodyfikuje nazwę, opis lub kategorię zadania w formularzu edycji.
-   **And:** Użytkownik zatwierdzi zmiany.
-   **Then:** Zmiany w zadaniu zostaną zapisane w systemie.
-   **And:** Zaktualizowane zadanie zostanie wyświetlone na liście zadań z nowymi danymi i w odpowiedniej kategorii.
*(Odnosi się do: FR-TASK-002)*

#### US-TASK-003: Usuwanie istniejącego zadania
**Opis:** Jako użytkownik, chcę móc usunąć zadanie, którego już nie potrzebuję lub które zostało dodane przez pomyłkę, aby utrzymać porządek na mojej liście zadań.
**Kryteria akceptacji:**
-   **Given:** Użytkownik jest zalogowany i widzi listę swoich zadań.
-   **When:** Użytkownik wybierze opcję usunięcia dla konkretnego zadania.
-   **And:** Użytkownik potwierdzi chęć usunięcia zadania (np. w oknie dialogowym).
-   **Then:** Zadanie zostanie trwale usunięte z systemu.
-   **And:** Zadanie zniknie z listy zadań.
*(Odnosi się do: FR-TASK-003)*

#### US-TASK-004: Zmiana statusu zadania na "W trakcie" (PENDING) i wejście w Tryb Skupienia
**Opis:** Jako użytkownik, chcę móc oznaczyć zadanie jako "**W trakcie**" (**PENDING**), kiedy rozpocznę nad nim pracę, aby śledzić aktywne zadania, umożliwić pomiar czasu ich wykonania **oraz przejść do widoku wspomagającego koncentrację.**
**Kryteria akceptacji:**
-   **Given:** Użytkownik jest zalogowany i widzi zadanie ze statusem **TODO** na liście.
-   **When:** Użytkownik wykona akcję zmiany statusu na **PENDING** dla tego zadania (np. kliknie odpowiednią ikonę/przycisk).
-   **Then:** Status zadania zmieni się na **PENDING**.
-   **And:** System zapisze czas rozpoczęcia statusu **PENDING** dla tego zadania.
-   **And:** Aplikacja przejdzie do **Trybu Skupienia** (zgodnie z **US-UI-003**).
-   *(Uwaga: Poprzednia wizualna reprezentacja zadania na liście może nie być od razu widoczna, gdyż użytkownik przechodzi do innego widoku).*
*(Odnosi się do: FR-TASK-004, FR-TASK-005, FR-TASK-006, FR-UI-004)*

#### US-TASK-005: Zmiana statusu zadania na "Zakończone" (DONE)
**Opis:** Jako użytkownik, chcę móc oznaczyć zadanie jako "**Zakończone**" (**DONE**), kiedy je ukończę (czy to z listy zadań, czy z Trybu Skupienia), aby móc śledzić postępy i oznaczyć zadanie jako niewymagające dalszej uwagi.
**Kryteria akceptacji:**
-   **Given:** Użytkownik jest zalogowany i widzi zadanie ze statusem **PENDING** (na liście lub w Trybie Skupienia).
-   **When:** Użytkownik wykona akcję zmiany statusu na **DONE** dla tego zadania (np. kliknie odpowiednią ikonę/przycisk lub checkbox).
-   **Then:** Status zadania zmieni się na **DONE**.
-   **And:** System obliczy i zapisze czas trwania zadania (od **PENDING** do **DONE**).
-   **And:** Jeśli akcja była wykonana w Trybie Skupienia, użytkownik powróci do standardowego widoku.
-   **And:** Wizualna reprezentacja zadania na liście zmieni się, aby odzwierciedlić status **DONE** (np. przekreślenie, zmiana koloru).
-   **And:** Obliczony czas trwania zadania (od **PENDING** do **DONE**) zostanie wyświetlony przy zakończonym zadaniu na liście.
*(Odnosi się do: FR-TASK-004, FR-TASK-005, FR-TASK-006, FR-UI-004)*

### 5.3. Przeglądanie Zadań (VIEW)

#### US-VIEW-001: Wyświetlanie listy zadań
**Opis:** Jako użytkownik, chcę móc zobaczyć wszystkie moje zadania pogrupowane według kategorii **Macierzy Eisenhowera**, abym mógł skupić się na priorytetach i śledzić mój postęp.
**Kryteria akceptacji:**
-   **Given:** Użytkownik jest zalogowany w aplikacji i nie jest w Trybie Skupienia.
-   **Then:** Aplikacja automatycznie wyświetla listę wszystkich zadań użytkownika (**FR-VIEW-001**).
-   **And:** Lista zadań będzie pogrupowana i posortowana według kategorii **Macierzy Eisenhowera** (kolejność: 1. Pilne/Ważne, 2. Ważne/Niepilne, 3. Pilne/Nieważne, 4. Nieważne/Niepilne - *do potwierdzenia*) (**FR-VIEW-006**).
-   **And:** Każde zadanie na liście będzie wizualnie oznaczone swoją kategorią (**FR-VIEW-005**).
-   **And:** Jeśli użytkownik nie ma żadnych zadań, zostanie wyświetlony odpowiedni komunikat (np. "Brak zadań").

#### US-VIEW-002: [Usunięto - funkcjonalność poza zakresem MVP]

#### US-VIEW-003: [Usunięto - funkcjonalność poza zakresem MVP]

#### US-VIEW-004: Wizualne rozróżnienie kategorii Eisenhowera
**Opis:** Jako użytkownik, przeglądając listę zadań, chcę móc łatwo odróżnić zadania należące do różnych kategorii **Macierzy Eisenhowera** (np. za pomocą kolorów lub etykiet), aby szybko ocenić ich priorytet.
**Kryteria akceptacji:**
-   **Given:** Użytkownik jest zalogowany, nie jest w Trybie Skupienia i widzi listę zadań.
-   **When:** Na liście znajdują się zadania z różnych kategorii **Macierzy Eisenhowera**.
-   **Then:** Każde zadanie na liście ma wyraźne wizualne oznaczenie swojej kategorii (np. kolor tła, pasek boczny w kolorze kategorii, etykieta tekstowa) (**FR-VIEW-005**).
-   **And:** Systematyka oznaczeń jest spójna dla wszystkich zadań tej samej kategorii.

#### US-VIEW-005: Filtrowanie zadań na liście
**Opis:** Jako użytkownik, chcę móc filtrować wyświetlaną listę zadań według podstawowych kryteriów (np. statusu, kategorii), aby skupić się na określonym podzbiorze zadań.
**Kryteria akceptacji:**
-   **Given:** Użytkownik jest zalogowany, nie jest w Trybie Skupienia i widzi listę zadań.
-   **When:** Użytkownik aktywuje opcję filtrowania i wybierze kryterium (np. pokaż tylko zadania "Pilne/Ważne" lub tylko zadania ze statusem "**PENDING**").
-   **Then:** Lista zadań zostanie zaktualizowana i wyświetli tylko te zadania, które spełniają wybrane kryterium filtrowania (**FR-VIEW-007**).
-   **And:** Użytkownik ma możliwość wyczyszczenia filtrów i powrotu do widoku wszystkich zadań dla danego okresu.
-   *(Uwaga: Dokładne kryteria i mechanizm filtrowania wymagają doprecyzowania).*

### 5.4. Platforma i UI (UI)

#### US-UI-001: Responsywność interfejsu
**Opis:** Jako użytkownik, chcę móc korzystać z aplikacji zarówno na moim telefonie komórkowym, jak i na komputerze stacjonarnym, a interfejs (w tym Tryb Skupienia) powinien dostosować się do rozmiaru ekranu, zapewniając wygodną obsługę.
**Kryteria akceptacji:**
-   **Given:** Użytkownik otwiera aplikację w przeglądarce na urządzeniu mobilnym (różne popularne rozdzielczości).
-   **Then:** Interfejs aplikacji (standardowy i Tryb Skupienia) jest czytelny i w pełni funkcjonalny, elementy są odpowiednio rozmieszczone i łatwe do kliknięcia/dotknięcia (**FR-UI-002**, **FR-UI-003**, **FR-UI-004**).
-   **Given:** Użytkownik otwiera aplikację w przeglądarce na komputerze stacjonarnym (różne popularne rozdzielczości).
-   **Then:** Interfejs aplikacji (standardowy i Tryb Skupienia) wykorzystuje dostępną przestrzeń, jest czytelny i w pełni funkcjonalny (**FR-UI-002**, **FR-UI-003**, **FR-UI-004**).
-   **And:** Wszystkie funkcjonalności (dodawanie, edycja, zmiana statusu, przeglądanie, filtrowanie, Tryb Skupienia, logowanie/wylogowanie) są dostępne i działają poprawnie na obu typach urządzeń (**FR-UI-001**).

#### US-UI-002: Dostęp do Polityki Prywatności
**Opis:** Jako użytkownik, chcę mieć łatwy dostęp do **Polityki Prywatności** aplikacji, aby zrozumieć, jakie dane są zbierane i jak są wykorzystywane.
**Kryteria akceptacji:**
-   **Given:** Użytkownik korzysta z aplikacji (zalogowany lub niezalogowany).
-   **When:** Użytkownik szuka linku do **Polityki Prywatności** (np. w stopce, menu ustawień).
-   **Then:** Link do **Polityki Prywatności** jest łatwo dostępny.
-   **And:** Kliknięcie linku otwiera stronę/dokument z treścią **Polityki Prywatności** (**FR-PRIV-001**).

#### US-UI-003: Wejście w Tryb Skupienia i praca nad zadaniem
**Opis:** Jako użytkownik, który właśnie rozpoczął pracę nad zadaniem (oznaczył je jako **PENDING**), chcę, aby aplikacja przeszła w dedykowany **Tryb Skupienia** z minimalistycznym interfejsem i animacją, abym mógł się w pełni skoncentrować na wykonywanej czynności bez rozpraszaczy i otrzymać ostrzeżenie, jeśli spróbuję go opuścić przed zakończeniem.
**Kryteria akceptacji:**
-   **Given:** Użytkownik widzi zadanie ze statusem **TODO** na liście.
-   **When:** Użytkownik zmienia status tego zadania na **PENDING** (zgodnie z **US-TASK-004**).
-   **Then:** Aplikacja wyświetla pełnoekranowy **Tryb Skupienia**.
-   **And:** Standardowy interfejs (lista zadań, kalendarz, nawigacja) jest ukryty.
-   **And:** Na ekranie widoczna jest nazwa bieżącego zadania i prosta, niedystrakcyjna animacja.
-   **And:** Dostępny jest wyraźny przycisk/opcja do oznaczenia zadania jako **DONE**.
-   **Given:** Użytkownik jest w **Trybie Skupienia**.
-   **When:** Użytkownik próbuje nawigować wstecz lub wykonać inną akcję opuszczenia trybu.
-   **Then:** Wyświetlany jest komunikat ostrzegawczy i elementy dodatkowego potwierdzenia, które aktywnie utrudniają użytkownikowi opuszczenie trybu skupienia.
-   **Given:** Użytkownik jest w **Trybie Skupienia**.
-   **When:** Użytkownik oznacza zadanie jako **DONE** za pomocą dostępnej opcji.
-   **Then:** Status zadania zmienia się na **DONE** (zgodnie z **US-TASK-005**).
-   **And:** **Tryb Skupienia** zostaje zamknięty.
-   **And:** Użytkownik powraca do standardowego widoku aplikacji (np. listy zadań).
-   **And:** System rejestruje wszelkie próby przerwania zadania do późniejszego raportowania.
*(Odnosi się do: FR-UI-004, FR-TASK-005, FR-STATS-004)*

### 5.5. Statystyki i Raportowanie (STATS)

#### US-STATS-001: Generowanie dziennego raportu statystyk
**Opis:** Jako użytkownik, chcę otrzymywać dzienny raport statystyk, abym mógł śledzić swoje postępy, identyfikować problemy w moim podejściu do zadań i otrzymywać wskazówki na przyszłość.
**Kryteria akceptacji:**
-   **Given:** Użytkownik korzystał z aplikacji w ciągu dnia (wykonał co najmniej jedno zadanie).
-   **When:** Dzień się kończy (np. o północy lub przy pierwszym logowaniu następnego dnia).
-   **Then:** Aplikacja automatycznie generuje dzienny raport statystyk.
-   **And:** Raport zawiera średni czas wykonania zadań.
-   **And:** Raport zawiera liczbę przypadków rozproszenia uwagi (próby wyjścia z Trybu Skupienia).
-   **And:** Raport zawiera punkty karne za zmiany priorytetów lub wycofywanie się z zadań.
-   **And:** Raport zawiera ocenę dnia w skali 1-10.
-   **And:** Raport zawiera personalizowane sugestie i porady.
-   **And:** Raport jest dostępny do przeglądania przez użytkownika.
-   **And:** Wszystkie operacje czasowe w raporcie uwzględniają strefę czasową użytkownika.
*(Odnosi się do: FR-STATS-001, FR-STATS-002, FR-STATS-005)*

#### US-STATS-002: Przeglądanie historycznych raportów
**Opis:** Jako użytkownik, chcę mieć możliwość przeglądania moich historycznych raportów dziennych, abym mógł analizować trendy i postępy w dłuższej perspektywie czasowej.
**Kryteria akceptacji:**
-   **Given:** Użytkownik jest zalogowany w aplikacji.
-   **When:** Użytkownik wybiera opcję przeglądania historycznych raportów.
-   **Then:** Aplikacja wyświetla listę dostępnych raportów dziennych.
-   **And:** Użytkownik może wybrać konkretny raport do szczegółowego przeglądania.
-   **And:** Wybrane raporty są wyświetlane w czytelnym formacie z wszystkimi zebranymi metrykami.
-   **And:** Wszystkie daty i czasy w raportach są prezentowane zgodnie ze strefą czasową użytkownika.
*(Odnosi się do: FR-STATS-003, FR-STATS-004, FR-STATS-005)*

#### US-STATS-003: Poprawne uwzględnianie strefy czasowej
**Opis:** Jako użytkownik korzystający z aplikacji w dowolnej strefie czasowej, chcę, aby wszystkie operacje związane z czasem (raportowanie, obliczanie czasu wykonania zadania) uwzględniały moją lokalną strefę czasową, aby dane były dokładne i zgodne z moim rzeczywistym doświadczeniem.
**Kryteria akceptacji:**
-   **Given:** Użytkownik jest zalogowany w aplikacji.
-   **When:** System wykrywa lub użytkownik ustawia swoją strefę czasową.
-   **Then:** Wszystkie operacje związane z czasem (zmiana statusu zadania, czas wykonania, generowanie raportów dziennych) są zapisywane i prezentowane zgodnie z lokalną strefą czasową użytkownika.
-   **And:** Dzienne raporty są generowane o północy lokalnego czasu użytkownika.
-   **And:** Jeśli użytkownik zmieni strefę czasową (np. w trakcie podróży), system odpowiednio dostosuje prezentację danych czasowych.
*(Odnosi się do: FR-STATS-005, FR-TASK-006)*
