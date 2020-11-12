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
## Teknologi
Som tidligere nevnt baserer appen seg på Prosjekt 3 og der brukte vi hovedsakelig State Hooks for komponentene. Dette gjorde at vi ikke trengte å endre så mye på
logikken da komponentstrukturen var gjenkjennelig og lik som i React. Likevel måtte vi justere på logikken underveis da vi oppdaget at den ikke fungerte slik den var ment. 
Dette gjelder for Filtrering og sortering,da React Native opererer anderledes. [BIRGITTE ???]
#### React Native
Vi brukte React Native som programmeringsspråk for prosjektet. React Native hadde den samme logikken som React men det var komponentene og HTML elementene som 
var annderledes. 
#### Expo 
I applikasjons utviklingen har vi brukt expo-cli for å initiere prosjektet gjennom expo init og for å gjennomføre manuell ende til ende testing på iOS og Android.
#### Testing
Vi gjorde manuell ende til ende testing ved å teste på flere brukere som hadde Android og Iphone. Vi prøvde også å teste på ulike versjoner av Android og Iphoen
slik at vi fikk testet hvor responsiv appen var på de ulike skjermstørrelsene. I tillegg var det mange React Native elementer som ble støttet av Iphoen men ikke Android. 
Hva dette var fikk vi observert på ende til ende testing. 
