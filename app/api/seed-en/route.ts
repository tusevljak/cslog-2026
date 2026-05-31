import { NextRequest, NextResponse } from 'next/server'
import { sql, initDb } from '@/lib/db'
import { revalidatePath } from 'next/cache'

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

const enPosts = [
  {
    slug: 'year-2024',
    title: '2024 — A Year in Review',
    published_at: '2025-02-01',
    content: `Dear partners, friends and collaborators,

A business year is not merely a set of numbers — it is a genuine story of success and progress, born of the hard work and dedication of everyone involved. This past year, consistent performance and efficiency were among our highest goals, and we are proud to say we delivered strong results.

Despite the many challenges that 2024 brought, we adapted to market conditions and left a long list of satisfied clients behind us. Most importantly, we maintained the continuous high quality of our services — which remains our primary commitment.

We renewed our fleet with two new Renault trucks of the latest generation, both EURO 6 compliant like all our other vehicles. We also added two new low-bed trailers: a NOOTEBOOM three-axle and a SCHWARZMÜLLER four-axle.

Our successes are not only a product of our efforts, but also of our plans for the future. We continue to improve our services and expect our results to keep growing.

Below you can see some of the most interesting projects we carried out:

**Serbia – Turkey, four runs with two trucks in convoy**

**Our car transporter on the regular France – Serbia route**

**Transport of metal structures on the Serbia – Maribor – Serbia route**

Follow our blog and hire us for your special cargo transport. For 20 years, we have operated with precision, responsibility and the highest standards of quality.

Yours, CSLOG`,
  },
  {
    slug: 'project-radljevo',
    title: 'PROJECT RADLJEVO',
    published_at: '2023-11-01',
    content: `Dear partners, friends and collaborators,

A major, successful project is behind us. We are proud to share that we completed 14 transports within 5 working days, from Belgrade to the open-cast mines in Radljevo. The loads varied in length, width, height and weight — yet every single one was delivered without any issues.

Of course, no project succeeds without our dedicated and hardworking drivers, as well as the operational team both in the office and on the ground.

We hope you found this update interesting. We look forward to the challenges ahead and will continue to keep you informed.

Follow our blog and hire us for your special cargo transport. For 20 years, we have operated with precision, responsibility and the highest standards of quality.

Yours, CSLOG`,
  },
  {
    slug: 'two-transports-belgrade-to-kostolac',
    title: 'Two Transports from Belgrade to Kostolac',
    published_at: '2023-05-01',
    content: `Dear partners, friends and collaborators,

Two more successful assignments completed! This time we transported two metal structures from Belgrade to Kostolac. One structure was 5.00 m wide, while the other measured 20.00 m in length and 4.25 m in width. Due to the exceptional dimensions, police and technical escort accompanied us for the entire length of both routes.

As always, everything proceeded strictly according to regulations and went off without a hitch.

We hope you found this update interesting. We look forward to the challenges ahead and will continue to keep you informed.

Follow our blog and hire us for your special cargo transport. For 20 years, we have operated with precision, responsibility and the highest standards of quality.

Yours, CSLOG`,
  },
  {
    slug: 'from-koper-to-paracin-5-30m',
    title: 'From Koper to Paraćin — 5.30 m Wide Load',
    published_at: '2023-02-01',
    content: `Dear partners, friends and collaborators,

Another successful assignment is behind us! As we have already announced, our fleet received a significant upgrade in the form of a new truck and semi-trailer combination — dedicated to the most demanding tasks, such as the one described below.

We transported a ring measuring 5.30 m in width. As every time before, this transport was completed without major difficulties. Due to the exceptional width, two police escorts and one technical escort accompanied the convoy for the entire route through Slovenia, Croatia and Serbia.

We hope you found this update interesting. We look forward to the challenges ahead and will continue to keep you informed.

Follow our blog and hire us for your special cargo transport. For 20 years, we have operated with precision, responsibility and the highest standards of quality.

Yours, CSLOG`,
  },
  {
    slug: 'from-serbia-to-hanover',
    title: 'From Serbia to Hanover',
    published_at: '2023-01-01',
    content: `Dear partners, friends and collaborators,

We are carrying on with major projects in 2023! We are pleased to share that in January we completed two transports from Serbia to Hanover. Both loads measured 4.00 m in width and were accompanied by technical escort for the entire route. Transit time for each transport was just 4 days!

As always, everything went smoothly, and both special loads were delivered safely and securely to their destination without any problems.

Follow our blog and hire us for your special cargo transport. For 20 years, we have operated with precision, responsibility and the highest standards of quality.

Yours, CSLOG`,
  },
  {
    slug: 'cslog-news-new-truck-and-trailer',
    title: 'CSLOG NEWS: New Truck and Trailer',
    published_at: '2022-12-01',
    content: `Dear partners, friends and collaborators,

We are proud to announce a new addition to our fleet. We have acquired a new RENAULT truck — EURO 6 compliant, like all our vehicles.

We are also pleased to announce a new FAYMONVILLE four-axle trailer. In combination with the new truck, this unit will be capable of handling the most demanding assignments in special transport.

Follow our blog and hire us for your special cargo transport. For 20 years, we have operated with precision, responsibility and the highest standards of quality.

Yours, CSLOG`,
  },
  {
    slug: 'from-belgrade-to-kostolac',
    title: 'From Belgrade to Kostolac',
    published_at: '2022-12-05',
    content: `Dear partners, friends and collaborators,

We have fulfilled yet another of our more demanding assignments. In November of this year, we carried out the transport of a load measuring 6.70 m in width from Belgrade to Kostolac. Organising the transport, obtaining all permits, expert opinions and approvals required to carry out a safe and secure transport took three weeks in total. Two technical escorts and two Ministry of Interior vehicles accompanied the load for the entire route.

Due to the exceptional width of the load, several sections of the route presented additional challenges. One of the most demanding was the Mostar interchange, where we joined the E-75 motorway, as well as the Vrčin and Požarevac toll stations, where we were required to submit requests for the removal of categorisation equipment. Road works signage and equipment on the motorway near Vrčin also had to be removed — a task our team carried out successfully.

As always, everything proceeded without any issues, and the special load was delivered safely and securely to its destination.

Follow our blog and hire us for your special cargo transport. For 20 years, we have operated with precision, responsibility and the highest standards of quality.

Yours, CSLOG`,
  },
  {
    slug: 'when-is-transport-truly-special',
    title: 'When is Transport Truly Special?',
    published_at: '2022-02-01',
    content: `I often say that in this line of work, the actual transport is the easiest part of all — and here is why.

Special transport involves a series of procedures and regulations that must be known and respected — not only in Serbia, but across every country through which the *convoi exceptionnel* passes.

Look at this sign alone: "IZVANREDNI PRIJEVOZ" (the Croatian term for special transport). We collect as many of these as there are countries we travel to.

I won't dwell on the permits to be obtained, the selection of the most suitable routes, or the servicing of vehicles and equipment. That is all crystal clear — repeated endlessly and never to be questioned.

**"The most important part of this, as of any other business, is people."**

All those we work with day in, day out, to get the job done properly. Just as truck engines need AdBlue to reduce harmful emissions, we as human beings need good communication to finish jobs with grace.

I must admit that I have spent years building my compact team. I have always strived to ensure that my people are a reflection of what we do together.

Yes, we are in transport — and it is special not only because of the loads, but because of the indispensable teamwork of many actors: our drivers, escort crews, police officers, loading and unloading workers, and the many people in their organisations — from owners to gate staff. All of us must be at our posts at exactly the right time.

If a single link in this chain of colleagues and collaborators gives way, it can lead to various consequences — most often delays.

From the very beginning of my business, now over 20 years ago, I have always strived to honour the deadlines I commit to. Step by step, one successfully completed transport after another, CSLOG — just like the ant — grew stronger and larger.

The key word, I believe, is patience and respect for rules — both those set by law, and those we set together as collaborators in this trade.

In the end, I know there is no magic here — only a great deal of work and goodwill. I wish to take this opportunity to thank everyone our CSLOG convoy has met along the way, in the hope that we will cover many more good kilometres together.

*Boban Bićanin,*
*General Manager, CSLOG Team*`,
  },
  {
    slug: 'cslog-news-new-tractor-chassis',
    title: 'CSLOG News: New Truck-Tractor Carrier',
    published_at: '2022-01-20',
    content: `We are proud to announce a new addition to our fleet — a truck-tractor carrier unit, which allows us to transport various types of vehicles and enables exceptionally fast loading and unloading times.

We are particularly proud of the fact that we will be carrying out transport for the Renault company — as our entire fleet consists exclusively of Renault trucks, all EURO 6 compliant.

We are also pleased to let you know that, starting now, you will be able to read about the most interesting transports we have carried out each month right here on our blog.`,
  },
  {
    slug: 'serbia-tyrol-austria-5m-wide',
    title: 'Serbia to Tyrol, Austria — 5 m Wide Load',
    published_at: '2022-01-05',
    content: `At the end of the year, we successfully completed a transport from Serbia to Tyrol, Austria — a load measuring 5 m in width. The transport followed the route: Serbia – Hungary – Austria – Germany – Austria, with a transit time of 3 days.

The transport proceeded without major difficulties, including the removal of existing obstacles and road works, carried out successfully by our team and partners both domestically and abroad.

The complete organisation of permits and escorts outside Serbia was handled by Astaf from Maribor — a company specialising in technical escort coordination, permit acquisition, VML, obstacle removal, and the preparation of all technical assessments required for transport.

Photos are always interesting, but the true sense of just how wide this load really was can only be appreciated through video.

A similar transport is planned for late February — and in line with the Covid-19 situation at the time, we plan to produce a full report with statements from all parties involved.

Read about it soon on the CSLOG blog.`,
  },
  {
    slug: 'from-belgrade-to-kazakhstan',
    title: 'From Belgrade to Kazakhstan',
    published_at: '2016-01-01',
    content: `After more than 15 years in business, we are proud to announce that we have completed what may well be our most ambitious assignment to date. We received a request from the company Lola to transport a load measuring 5 m in width from Belgrade to the Kazakhstani city of Ekibastuz in the Pavlodar region. CSLOG thus became the first Serbian company to successfully transport a 5-metre wide load on the route from Serbia to Kazakhstan.

The entire process took nearly 3 months — 2 months for planning, preparation and obtaining all necessary permits, with the transport itself completed in 24 days.

The route covered a total distance of 14,000 km, with the convoy following the route: Serbia – Romania – Ukraine – Russia – Kazakhstan.

The greatest challenge arose at the Russia–Kazakhstan border, where the permitted clearance at the Olahovka border crossing was 5.20 m — but the actual crossing measured only 4.80 m. We resolved this by engaging a driver and a crane, which transferred the load over the barrier and reloaded it onto the truck. The entire process was completed without any problems, and the special load was safely delivered to its destination in Kazakhstan.

At the start of 2016, another similar project is planned — even larger in scale. Load by load, transport by transport, CSLOG builds its portfolio and reputation — and never gives up. Just like the ant that symbolises our company's philosophy.

Follow our blog and hire us for your special cargo transport. For 20 years, we have operated with precision, responsibility and the highest standards of quality.

Yours, CSLOG`,
  },
  {
    slug: 'from-belgrade-to-pavlodar',
    title: 'From Belgrade to Pavlodar',
    published_at: '2017-01-01',
    content: `Dear partners, collaborators and friends,

We are proud to announce that CSLOG has completed yet another delicate special cargo transport assignment — from Belgrade to Pavlodar.

On the previous run along the same route, we transported a special load measuring 5 metres in width. This time, the assignment was marginally less demanding: a load measuring 4.50 metres in width.

The route was slightly different this time, covering a total distance of 14,400 km, with the convoy following the route: Serbia – Romania – Ukraine – Belarus – Russia – Kazakhstan. Transit time for the transport was 15 days.

Weather was predominantly overcast and rainy with rare sunny intervals, so our vehicles were due for a thorough wash upon return.

Follow our blog and hire us for your special cargo transport. For 20 years, we have operated with precision, responsibility and the highest standards of quality.

Yours, CSLOG`,
  },
  {
    slug: 'from-antwerp-to-belgrade',
    title: 'From Antwerp to Belgrade',
    published_at: '2018-01-01',
    content: `Dear partners, collaborators and friends,

We are pleased to share that we have successfully transported a special load measuring 5.80 metres in width on the Antwerp–Belgrade route — a total distance of 1,600 kilometres.

Transit time was just 4 days, while obtaining the special transport permits took 2 weeks. The convoy followed a transit route through 5 countries: (BE) Belgium – (DE) Germany – (AT) Austria – (HU) Hungary – (RS) Serbia.

As always, everything proceeded without any issues, and the special load was delivered safely and securely to its destination.

Follow our blog and hire us for your special cargo transport. For 20 years, we have operated with precision, responsibility and the highest standards of quality.

Yours, CSLOG`,
  },
]

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await initDb()

  let inserted = 0
  let skipped = 0

  for (const post of enPosts) {
    const existing = await sql`SELECT id FROM blog_posts WHERE slug = ${post.slug}`
    if (existing.length) { skipped++; continue }

    await sql`
      INSERT INTO blog_posts (title, slug, content, excerpt, status, published_at, lang)
      VALUES (
        ${post.title},
        ${post.slug},
        ${post.content},
        '',
        'published',
        ${post.published_at},
        'en'
      )
    `
    inserted++
  }

  revalidatePath('/en/blog')
  return NextResponse.json({ inserted, skipped })
}
