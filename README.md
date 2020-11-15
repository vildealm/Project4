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
Applikasjonen skal ha søkegrensesnitt som gir et resultatsett
Resultatsettet skal lastes dynamisk (blaing, lasting ved scrolling)
Skal være mulig å få en detaljert visning av hvert objekt i resultatsettet
Skal være støtte for å å interaktivt raffinere søkeresultatet med filterering og sortering

Vi valgte oppgave 1. Vi har basert vår app på backend og frontend fra Prosjekt 3, hvor vi laget en søkemotor for 
personer. Resultatene av søkemotoren blir lastet ved "endless scrolling" av personer. Appen gir også muligheten til en detaljert beskrivelse av personene ved å trykke på hver 
person boks. Det finnes drop-down meny for filtrering og sortering. Funksjonaliteten er veldig lik som i prosjekt 3, hvor det for brukeren sin del er hovedsaklig stylingen som er den største forskjellen.
Vi vet at padding er stor i for de nyere Iphone men vi valgte heller å ha en slik løsning da det tilrettela at applikasjonen kunne brukes for gamle versjoner av Iphone og Android.
## Teknologi
Som tidligere nevnt baserer appen seg på Prosjekt 3 og der brukte vi hovedsakelig State Hooks for komponentene. Dette gjorde at vi ikke trengte å endre så mye på
logikken da komponentstrukturen var gjenkjennelig og lik som i React. Likevel måtte vi justere på logikken underveis da vi oppdaget at den ikke fungerte slik den var ment. 
Dette gjelder for Filtrering og sortering,da React Native opererer anderledes. Med React Native kom også nødvendigheten med kunnskap om ulik oppførsel på ulike 
enheter. Eksempelvis ville ikke RNPickerSelect eller Modal fungere på nært like bra på Android som på IOS. Derfor valgte vi å importere Platform med Platform.select 
slik at vi kunne skreddersy oppførsel (styling) for IOS og android helt uavhengig av hveranre. Et negtivt aspekt ved dette for oss, er at koden ser lengre ut, 
og dermed mindre ryddig, men da dette er vår første erfaring med React Native innså vi at dette var en vanesak. 

#### React Native
Vi brukte React Native som programmeringsspråk for prosjektet. React Native hadde den samme logikken som React men det var komponentene og HTML elementene som 
var annderledes. 
#### Expo 
I applikasjons utviklingen har vi brukt expo-cli for å initiere prosjektet gjennom expo init og for å gjennomføre manuell ende til ende testing på iOS og Android.
#### Testing
Vi gjorde manuell ende til ende testing ved å teste på flere brukere som hadde Android og Iphone. Vi prøvde også å teste på ulike versjoner av Android og Iphoen
slik at vi fikk testet hvor responsiv appen var på de ulike skjermstørrelsene. Da oppdaget vi t det var det mange React Native elementer som ble støttet av Iphoen men ikke Android. Dette gjaldt
for fontFamily, hvor det var fonter som ikke ble støttet hos Android. I tillegg var også TextInput anderledes på Android enn for Iphone. Dermed måtte vi finne
løsninger som egnet seg for begge mobiler. På grunn av dette blir designløsningene annderledes. Dette ser vi blant annet i Pop-up'ene hvor vi har valgt i Android at 
det skal dukke opp i bunnen av skjermen, og hos Iphone dukker pop-up'en midt i skjermen. Et annet element som hadde ulik utforming på android vs. IOS var de importede RNPickerSelect elementene. Her måtte 
et par stylingendringer til, slik som å for eksempel endre flex-direction til column i stedenfor row, i tillegg til litt margin og padding endringer som var gjennomgårnde 
i hele Android vs IOS prosessen. Ved siste iterasjon gjennomførte vi en test med iPhone4, som viste seg å være et viktig steg hvor vi avdekket en ganske vesentlig paddingfeil. 
Dette er et eksempel på manuell brukertestingen som et kritisk punkt i utviklingen. 
Hva dette var fikk vi observert på ende til ende testing. 
