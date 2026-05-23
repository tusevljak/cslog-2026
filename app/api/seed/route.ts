import { NextRequest, NextResponse } from 'next/server'
import { sql, initDb } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

const posts = [
  {
    title: '2024. godina',
    slug: '2024-godina',
    published_at: '2025-02-24',
    excerpt: 'CSLOG gleda unazad na 2024. godinu kao na godinu značajnih dostignuća i rasta. Proširili smo flotu sa dva nova Renault tegljača i dve nove prikolice.',
    content: `## 2024. godina — u znaku rasta i posvećenosti

Poslovni uspeh nije samo statistika — on predstavlja kumulativni trud i posvećenost svih zaposlenih. Uprkos tržišnim izazovima, CSLOG je tokom 2024. godine održao kvalitet usluga i zadovoljstvo klijenata.

## Nova vozila

Proširili smo flotu sa:

- **Dva nova Renault tegljača** — EURO6 standard
- **Nooteboom prikolica** — tri osovine
- **Schwarzmüller prikolica** — četiri osovine

## Ključni projekti

- **Srbija–Turska:** Četiri konvojne misije sa po dva vozila
- **Francuska–Srbija:** Redovni transportni koridori
- **Metalne konstrukcije:** Višestruki prevozi između Srbije i Maribora

Dvadeset godina precizno, odgovorno, uz najviši standard i kvalitet.`,
  },
  {
    title: 'Projekat Radljevo',
    slug: 'projekat-radljevo',
    published_at: '2023-11-01',
    excerpt: '14 transportnih operacija u toku pet radnih dana do rudnika u Radljevu — terete različitih dužina, širina, visina i masa.',
    content: `## Projekat Radljevo

CSLOG je uspešno realizovao projekat koji je obuhvatio **14 transportnih operacija** u toku svega pet radnih dana, sve do rudarskih postrojenja u Radljevu.

Prevezeni su tereti različitih dimenzija i težina, bez ikakvih komplikacija.

## Dimenzije tereta

| Teret | Dimenzije (D × Š × V) | Masa |
|-------|----------------------|------|
| 1 | 7,30 × 6,10 × 2,96 m | 22 t |
| 2 | 12,66 × 4,95 × 2,10 m | 8 t |
| 3 | 7,30 × 6,05 × 3,15 m | 22 t |
| 4 | 7,20 × 6,30 × 3,50 m | 15 t |
| 5 | 17,60 × 4,95 × 3,22 m | 42,6 t |

## Zaključak

Sve je proteklo po propisima i u odličnom redu. Dvadeset godina preciznog, odgovornog rada — uz najviši standard i kvalitet.`,
  },
  {
    title: 'Dva transporta od Beograda do Kostolca',
    slug: 'dva-transporta-od-beograda-do-kostolca',
    published_at: '2023-05-03',
    excerpt: 'Dve metalne konstrukcije — širina 5 m i dužina 20 m × širina 4,25 m — transportovane uz policijsku pratnju celom rutom.',
    content: `## Dva transporta od Beograda do Kostolca

CSLOG je uspešno realizovao dva prevoza metalnih konstrukcija na relaciji **Beograd–Kostolac**.

## Dimenzije tereta

| Konstrukcija | Širina | Dužina |
|-------------|--------|--------|
| 1 | 5,00 m | — |
| 2 | 4,25 m | 20,00 m |

Zbog velikih gabarita tereta, cela ruta je zahtevala **policijsku i tehničku pratnju**.

Sve je i ovog puta bilo po propisima i proteklo u najboljemu redu.`,
  },
  {
    title: 'Od Kopra do Paraćina sa širinom 5,30 m',
    slug: 'od-kopra-do-paracina-sa-sirinom-530m',
    published_at: '2023-02-15',
    excerpt: 'Prstenasta konstrukcija širine 5,30 m prešla je put kroz Sloveniju, Hrvatsku i Srbiju uz dvostruku policijsku pratnju.',
    content: `## Od Kopra do Paraćina sa širinom 5,30 m

**Ruta:** Koper → Paraćin (kroz Sloveniju, Hrvatsku i Srbiju)

Za ovaj zahtevan zadatak koristili smo **novu kombinaciju tegljača i prikolice** namenjenu najizazovnijim prevozima.

## Detalji

- **Teret:** Prstenasta konstrukcija
- **Širina:** 5,30 m
- **Pratnja:** Dvostruka policijska pratnja + jedno tehničko vozilo celom rutom

Transport je realizovan bez većih poteškoća. Fotografije i video materijal dokumentuju kako je izgledao ovaj izazovni prevoz.

Dvadeset godina precizno, odgovorno, uz najviši standard i kvalitet.`,
  },
  {
    title: 'Od Srbije do Hanovera',
    slug: 'od-srbije-do-hanovera',
    published_at: '2023-01-31',
    excerpt: 'Dva prevoza specijalnog tereta širine 4 metra — iz Srbije do Hanovera u januaru 2023. Oba transporta završena za 4 dana.',
    content: `## Od Srbije do Hanovera

U januaru 2023. realizovali smo **dva transporta iz Srbije do Hanovera**.

## Detalji

- **Širina tereta:** 4,00 m
- **Trajanje:** 4 dana po transportu
- **Pratnja:** Tehnička pratnja celom rutom

**Ruta:** Srbija → Nemačka (Hannover)

Oba prevoza su završena bezbedno i bez komplikacija. Pozivamo vas da pogledate fotografije i vidite sami kako je izgledao ovaj specijalni transport.

Za sve upite u vezi specijalnog transporta, stojimo vam na raspolaganju.`,
  },
  {
    title: 'CSLOG vesti: Novi tegljač i prikolica',
    slug: 'cslog-vesti-novi-tegljac-i-prikolica',
    published_at: '2022-12-30',
    excerpt: 'Ponosni smo što možemo da vas obavestimo da smo bogatiji za novi Renault tegljač EURO6 i Faymonville prikolicu sa četiri osovine.',
    content: `## CSLOG vesti: Novi tegljač i prikolica

Ponosni smo što možemo da vas obavestimo — **bogatiji smo za nova vozila u floti**.

## Nova vozila

**Tegljač:** Renault — EURO6 standard, kao i sva ostala naša vozila

**Prikolica:** Faymonville — četiri osovine

Ova kombinacija će moći da ispuni **najzahtevnije zadatke u specijalnom transportu**.

Za 20 godina radimo precizno, odgovorno, uz najviši standard i kvalitet.`,
  },
  {
    title: 'Od Beograda do Kostolca',
    slug: 'od-beograda-do-kostolca',
    published_at: '2022-12-28',
    excerpt: 'Specijalni transport tereta širine 6,70 m od Beograda do Kostolca — tri nedelje pripreme, dve tehničke pratnje, dvoja MUP vozila.',
    content: `## Od Beograda do Kostolca

U novembru 2022. realizovali smo posebno zahtevni specijalni transport — **teret širine 6,70 m** na relaciji Beograd–Kostolac.

## Priprema

Zbog izuzetnih dimenzija tereta, priprema je trajala **tri nedelje** — pribavljanje dozvola i saglasnosti.

## Izazovi na ruti

Nekoliko deonica zahtevalo je posebnu pažnju:

- Čvor Mostar ka autoputu E-75
- Naplatna stanica Vrčin — demontaža kategorizatora
- Naplatna stanica Požarevac — demontaža opreme
- Radna mehanizacija i saobraćajni znakovi kod Vrčina

## Pratnja

- **Dva tehnička vozila** za podršku
- **Dva vozila MUP-a** celom rutom

Transport je završen bezbedno i bez komplikacija.`,
  },
  {
    title: 'Kada je transport zaista specijalan?',
    slug: 'kada-je-transport-zaista-specijalan',
    published_at: '2022-02-19',
    excerpt: 'Boban Bićanin, generalni direktor CSLOG-a, o tome šta čini specijalni transport zaista specijalnim — i zašto su ljudi najvažniji deo posla.',
    content: `## Kada je transport zaista specijalan?

_Piše: Boban Bićanin, generalni direktor CSLOG-a_

Transport sam po sebi možda deluje jednostavno. Ali specijalni transport podrazumeva **bezbroj procedura i propisa** koje treba poznavati i poštovati u svakoj zemlji kroz koju konvoj prolazi.

## Ključni elementi

Pribavljanje dozvola, odabir odgovarajuće rute, ispravnost vozila i opreme — sve to je neophodno. Ali najvažniji deo ovog posla, kao i većine drugih, su **ljudi i komunikacija**.

## Tim u konvoju

Specijalni transport zahteva usklađenost svih učesnika:

- Vozači
- Pratnja
- Policajci
- Radnici na utovaru i istovaru
- Predstavnici firme

Svaka osoba mora biti na svom zadatku u **tačno pravo vreme**.

## Recept za uspeh

Dvadeset godina uspeha gradimo na:

- Poštovanju rokova
- Pridržavanju zakonskih i međusobnih profesionalnih dogovora
- Strpljenju i dobroj volji

Kao mrav koji korak po korak gradi snagu — tako smo i mi rasli kroz svaki uspešno realizovani transport, bez kašnjenja.

**Specijalnost specijalnog transporta nije u magiji — već u teškom radu i dobroj nameri.**`,
  },
  {
    title: 'CSLOG vesti: Novi tegljač, šasija',
    slug: 'cslog-vesti-novi-tegljac-sasija',
    published_at: '2022-01-17',
    excerpt: 'Nova kompozicija za prevoz tegljača i šasija — i vest da smo ostvarili saradnju sa Renaultom na prevozu njihovih vozila.',
    content: `## CSLOG vesti: Novi tegljač i šasija

Uvedli smo novu kompoziciju specijalno namenjenu **prevozu tegljača i šasija** — sa izuzetno brzim vremenima utovara i istovara.

## Saradnja sa Renaultom

Posebno smo ponosni što smo ostvarili posao prevoza za **Renault**. Sva naša vozila su Renault, EURO6 standard.

## Blog

Možete očekivati **mesečne blog postove** sa detaljima o interesantnim transportima koje realizujemo.

Za besplatnu ponudu za specijalni transport, kontaktirajte nas.`,
  },
  {
    title: 'Srbija – Tirol, Austrija – Teret širine 5 m',
    slug: 'srbija-tirol-austrija-teret-sirine-5-m',
    published_at: '2019-01-17',
    excerpt: 'Specijalni transport vangabaritnog tereta širine 5 metara od Srbije do Tirola u Austriji — ruta kroz Mađarsku, Austriju i Nemačku za 3 dana.',
    content: `## Srbija – Tirol, Austrija – Teret širine 5 m

Uspešno smo realizovali specijalni prevoz **vangabaritnog tereta širine 5 metara** na relaciji Srbija–Tirol, Austrija.

## Ruta

**Srbija → Mađarska → Austrija → Nemačka → Austrija**

Trajanje: **3 dana**

## Koordinacija

Za ovaj transport smo sarađivali sa kompanijom **Astaf iz Maribora**, specijalizovanom za:

- Tehničku pratnju
- Pribavljanje dozvola
- Uklanjanje prepreka
- Pripremu regulatorne dokumentacije

Transport je prošao bez većih poteškoća. Planiramo sličan transport krajem februara — sa kompletnim video i foto materijalom i izjavama učesnika.`,
  },
  {
    title: 'Od Beograda do Kazahstana',
    slug: 'od-beograda-do-kazahstana',
    published_at: '2015-09-12',
    excerpt: 'Prva srpska firma koja je transportovala teret širine 5 m od Srbije do Kazahstana — 14.000 km, 24 dana vožnje, ruta kroz Rumuniju, Ukrajinu, Rusiju.',
    content: `## Od Beograda do Kazahstana

CSLOG je ostvario istorijski podvig — postali smo **prva srpska firma koja je uspela da transportuje teret širine 5 metara od Srbije do Kazahstana**.

## Detalji prevoza

- **Klijent:** Lola d.o.o.
- **Širina tereta:** 5,00 m
- **Odredište:** Ekibastuz, Pavlodar oblast, Kazahstan
- **Distanca:** ~14.000 km
- **Trajanje vožnje:** 24 dana
- **Ukupno trajanje projekta:** ~3 meseca (2 meseca priprema + dozvole)

## Ruta

**Srbija → Rumunija → Ukrajina → Rusija → Kazahstan**

## Ključni izazov

Na granici Rusija–Kazahstan (prelaz Olahovka), zakonski limit je bio 5,20 m, ali fizički prolaz je bio svega 4,80 m. Rešenje: **kranskim pretovarom** smo preneli teret preko barijere i ponovo ga natovarili na kamion.

Poduhvat koji je potvrdio da nema zadatka koji je za CSLOG pretežak.`,
  },
  {
    title: 'Od Beograda do Pavlodara',
    slug: 'od-beograda-do-pavlodara',
    published_at: '2015-07-03',
    excerpt: 'Transport tereta širine 4,50 m na relaciji Beograd–Pavlodar — 14.400 km kroz Rumuniju, Ukrajinu, Belorusiju, Rusiju i Kazahstan za 15 dana.',
    content: `## Od Beograda do Pavlodara

Još jedan uspešan specijalni transport na zahtevnoj relaciji **Beograd–Pavlodar**.

## Detalji

- **Širina tereta:** 4,50 m (vangabaritni teret)
- **Distanca:** ~14.400 km
- **Trajanje:** 15 dana

## Ruta

**Srbija → Rumunija → Ukrajina → Belorusija → Rusija → Kazahstan**

Ovaj transport je bio nešto lakši od prethodnog (5 m širine) na istoj relaciji, ali ni po čemu manje zahtevan kada je reč o logistici, dozvolama i koordinaciji.

Pretežno oblačno i kišovito — ali to nas nije zaustavilo.`,
  },
  {
    title: 'Od Antverpena do Beograda',
    slug: 'od-antverpena-do-beograda',
    published_at: '2015-06-02',
    excerpt: 'Specijalni teret širine 5,80 m — od Antverpena do Beograda kroz 5 zemalja, 1.600 km, za 4 dana.',
    content: `## Od Antverpena do Beograda

Uspešno smo transportovali specijalni teret **širine 5,80 metara** na relaciji Antwerpen–Beograd.

## Detalji

- **Širina tereta:** 5,80 m
- **Distanca:** ~1.600 km
- **Trajanje:** 4 dana
- **Pribavljanje dozvola:** 2 nedelje

## Ruta — 5 zemalja

1. Belgija (BE)
2. Nemačka (DE)
3. Austrija (AT)
4. Mađarska (HU)
5. Srbija (RS)

Pošiljka je stigla do odredišta **bezbedno i bez problema**. Još jedan dokaz da CSLOG može da realizuje i najzahtevnije specijalne transporte kroz više zemalja.`,
  },
]

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await initDb()

  let inserted = 0
  let skipped = 0

  for (const post of posts) {
    try {
      await sql`
        INSERT INTO blog_posts (title, slug, content, excerpt, status, published_at, meta_title, meta_description)
        VALUES (
          ${post.title},
          ${post.slug},
          ${post.content},
          ${post.excerpt},
          'published',
          ${post.published_at},
          ${post.title},
          ${post.excerpt}
        )
        ON CONFLICT (slug) DO NOTHING
      `
      inserted++
    } catch {
      skipped++
    }
  }

  return NextResponse.json({ ok: true, inserted, skipped, total: posts.length })
}
