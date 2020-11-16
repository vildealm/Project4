# Prosjekt 4 - App med React Native


### Fremgangsmåte for testing av prosjekt
Først naviger til ønsket lokasjon på din maskin, deretter:
`git clone https://gitlab.stud.idi.ntnu.no/it2810-h20/team-04/project4.git ` for HTTPS.

Navigér inn i prosjektmappen:

`cd project4`

Installer dependencies:

`npm install`

Navigér inn i backendmappen:

`cd backend`

Installer dependencies:

`npm install`

Kjør backend:

`npm start`

Start Expo-serveren i prosjektmappen:

`expo start`

Deretter scanner du QR-koden som dukker opp i nettleseren din med mobilen din.
## Funksjonalitet
Vi valgte oppgave 1 i prosjekt 4. Vi har basert vår app på backend og frontend fra Prosjekt 3, hvor vi laget en søkemotor for 
personer. 
#### Filtrering, søk, sortering og scroll-load
Brukeren kan søke blant personene i databasen ved å benytte søkefeltet på siden. Søkefeltet er dynamisk slik at det søker for hvert 
tegn som endrer seg. Søkefeltet er case sensitivt, fordi vi ønsket at det skulle være mulig. Resultatene av søkemotoren blir lastet opp ved dynamisk paginering, da dette er den vanligste løsningen for mobil. 
Når brukeren går inn på applikasjonen vil de første 20 elementene lastes inn, og når brukeren scroller 
seg nedover og nærmer seg slutten (kommer til 4. siste element) vil de neste 20 lastes inn. Dette har vi implementert via en komponent som kalles FlatList. 
Denne var enkel å ta i bruk, og lot oss mappe hver element til vår Person-komponent på en veldig grei måte. Det var også enkelt å 
definere hva som skulle skje når man nærmet seg slutten av listen, og hvor nærme bunnen man skulle være.
Vi fant informasjone om FlatList på [her](https://reactnative.dev/docs/flatlist).I tillegg kan brukeren legge til filtrering på søkeresultatene ved å trukke på drop-down meny under søkefeltet. Da kan brukeren filtrere på alder, lokasjon. I 
tillegg er det også mulig å sortere alfabetisk og etter alder. Dette er også i form av en drop-down meny under søkefeltet.Hvis brukeren endrer søkeord eller filtrering blir pagineringen nullstilt automatisk.
Funksjonaliteten er veldig lik som i prosjekt 3, hvor det for brukeren sin del er hovedsaklig stylingen som er den største forskjellen. Paddingen er 
ulike for de forskjellige mobil enhetene og derfor valgte vi heller å ha en løsning hvor paddingen er litt stor for de nyere mobil enhetene, som Iphone X,
og mindre padding for Android og eldre Iphone versjoner. Dette gjorde vi fordi vi ønsket at funksjonaliteten på applikasjonen skulle være mulig å bruke 
på alle mobil enheter.


#### Detaljert visning
Appen gir også muligheten til en detaljert beskrivelse av personene ved at det kommer en pop-up hvis man trykker på hver 
person.  
#### Legg til en person
Det er også mulig å legge til personer i databasen. Hvis brukeren trykker på "+" - knappen midt på siden så dukker det opp en pop-up. Da vil det komme en 
form hvor brukeren kan fylle ut de nødvendige feltene. Vi har implementert nødvendige validering av feltene, slik at brukeren ikke skal kunne legge til
ugyldig verdier for Age, First name, Last name, Location og Description. Dette var også viktig for oss da ugyldig verdier gjør at personen ikke blir lagt inn i databasen, og dermed ville vi informere brukeren om 
hva som var gyldig. Dersom alle feltene er fylt inn riktig så vil formen være mulig å submitte og pop-up forsvinner. Det gis også muligheten til å krysse
ut av pop-up'en dersom man ikke ønsker å legge til en person. Hvis formen er fylt ut men brukeren velger å krysse ut av pop-upen bli ikke denne informasjonen
lagret. 

## Teknologi

#### React Native
Prosjektet skal basere seg på React Native, noe som ligner veldig på React. Av den grunn gjennbrukte vi mye kode fra prosjekt 3. Mye av logikken der baserte seg
på State Hooks for komponentene. Dette gjorde at vi ikke trengte å endre så mye på kode logikken da komponentstrukturen var gjenkjennelig og lik som i React. 
Likevel måtte vi justere litt på logikken underveis da vi oppdaget at den ikke fungerte slik den var ment. 
Dette gjaldt filtrering og sortering, da React Native opererer anderledes.
Blant de ulike tagsene som ligger innebygd i React Native måtte gruppa ta enkelte valg på de som var hensktsmessige for vårt prosjekt. Et eksempel på dette er RNPickerSelect som ga oss
muligheten til å ha en pop-up scroll blant alternativene, hvilket ikke var tilfellet hos Picker, som vi først prøvde med. Med React Native kom også nødvendigheten med kunnskap om ulik oppførsel 
på ulike enheter. Eksempelvis ville ikke RNPickerSelect eller Modal fungere på nært like bra på Android som på IOS. Derfor valgte vi å importere 
Platform med Platform.select slik at vi kunne skreddersy oppførsel (styling) for IOS og android helt uavhengig av hveranre. Et negtivt aspekt ved dette for oss, er at koden ser lengre ut, 
og dermed mindre ryddig, men da dette er vår første erfaring med React Native innså vi at dette var en vanesak. 
I tillegg brukte vi også Dimensions, slik at størrelsen på designelementene ble justert i forhold til skjermstørrelsen til den brukte mobil enheten. Dette ble brukt
for alle pop-up's da Modal varierte på de ulike mobilenhetene.


#### Expo 
I applikasjons utviklingen har vi brukt expo-cli for å initiere prosjektet gjennom expo init og muliggjør bl.a. for fortløpende dynamsik testing på iOS og Android.

##### ApolloClient
Vi brukte ApolloClient da dette var noe vi tok i bruk fra forrige prosjekt. ApolloClient tar imot GraphQL spørringene og sender de til serveren, og fetcher dataen i UIet.
Her brukte vi Mutations, lazyQuery og useQuery. 

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
