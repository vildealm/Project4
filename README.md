# Prosjekt 4 - App med React Native


### Fremgangsmåte for testing av prosjekt
Først naviger til ønsket lokasjon på din maskin, deretter:
`git clone ` for HTTPS.

Navigér inn i prosjektmappen:

`cd project4`

Installer dependencies:

`npm install`

Start Expo-serveren:

`expo start`

Deretter scanner du QR-koden som dukker opp i nettleseren din med mobilen din.
## Funksjonalitet
Vi valgte oppgave 1 i prosjekt 4. Vi har basert vår app på backend og frontend fra Prosjekt 3, hvor vi laget en søkemotor for 
personer. Brukeren kan søke blant personene i databasen ved å benytte søkefeltet på siden. Søkefeltet er dynamisk slik at det søker for hvert 
tegn som endrer seg. Søkefeltet er case sensitivt, fordi vi ønsket at det skulle være mulig. Resultatene av søkemotoren blir lastet opp ved dynamisk pafinering, da dette er den vanligste løsningen for mobil. Dersom brukeren scroller til bunnen av søke resultatene vil applikasjonen 
laste de 10 neste elementene inn. Appen gir også muligheten til en detaljert beskrivelse av personene ved at det kommer en pop-up hvis man trykker på hver 
person. I tillegg kan brukeren legge til filtrering på søkeresultatene ved å trukke på drop-down meny under søkefeltet. Da kan brukeren filtrere på alder, lokasjon. I 
tillegg er det også mulig å sortere alfabetisk og etter alder. Dette er også i form av en drop-down meny under søkefeltet.Hvis brukeren endrer søkeord eller filtrering blir pagineringen nullstilt automatisk.
Funksjonaliteten er veldig lik som i prosjekt 3, hvor det for brukeren sin del er hovedsaklig stylingen som er den største forskjellen. Paddingen er 
ulike for de forskjellige mobil enhetene og derfor valgte vi heller å ha en løsning hvor paddingen er litt stor for de nyere mobil enhetene, som Iphone X,
og mindre padding for Android og eldre Iphone versjoner. Dette gjorde vi fordi vi ønsket at funksjonaliteten på applikasjonen skulle være mulig å bruke 
på alle mobil enheter. 

## Teknologi

#### React Native
Prosjektet skal basere seg på React Native, noe som ligner veldig på React. Av den grunn gjennbrukte vi mye kode fra prosjekt 3. Mye av logikken der baserte seg
på State Hooks for komponentene. Dette gjorde at vi ikke trengte å endre så mye på kode logikken da komponentstrukturen var gjenkjennelig og lik som i React. 
Likevel måtte vi justere litt på logikken underveis da vi oppdaget at den ikke fungerte slik den var ment. 
Dette gjaldt filtrering og sortering, da React Native opererer anderledes. Med React Native kom også nødvendigheten med kunnskap om ulik oppførsel 
på ulike enheter. Eksempelvis ville ikke RNPickerSelect eller Modal fungere på nært like bra på Android som på IOS. Derfor valgte vi å importere 
Platform med Platform.select slik at vi kunne skreddersy oppførsel (styling) for IOS og android helt uavhengig av hveranre. Et negtivt aspekt ved dette for oss, er at koden ser lengre ut, 
og dermed mindre ryddig, men da dette er vår første erfaring med React Native innså vi at dette var en vanesak. 

#### Expo 
I applikasjons utviklingen har vi brukt expo-cli for å initiere prosjektet gjennom expo init og for å gjennomføre manuell ende til ende testing på iOS og Android.
#### Testing
Kravet for testing av manuell ende til ende testing. Testing har fåregått på følgende enheter: 
- Iphone XS,
- Samsung Galaxy,
- Iphone 6,
- Iphone 4 

Vi ønsket under testingen å sjekke hvordan funksjonaliteten opererte på de ulike enhetene. I tillegg ønsket vi å sjekke hvor responsiv appen var på de 
ulike skjermstørrelsene. Da oppdaget vi at det var det mange React Native elementer som ble støttet av Iphone men ikke Android. Dette gjaldt
TextInput, da layouten var anderledes på Android enn for Iphone. På grunn av dette måtte vi implementere designløsningene annderledes på de uliek mobilene. 
Dette ser vi blant annet i Pop-up'ene hvor paddingen er ulike hos mobilenehetene. Et annet element som hadde ulik utforming på android vs. IOS 
var de importede RNPickerSelect elementene. Her måtte et par stylingendringer til, slik som å for eksempel endre flex-direction til column i stedenfor row, 
i tillegg til litt margin og padding endringer som var gjennomgårnde i hele Android vs IOS prosessen. Ved siste iterasjon gjennomførte vi en test med 
iPhone4, som viste seg å være et viktig steg hvor vi avdekket en ganske vesentlig paddingfeil. 
Dette er et eksempel på manuell brukertestingen som et kritisk punkt i utviklingen. Hva dette var fikk vi observert på ende til ende testing. 
