// Seed data for "Encore" — a virtual community space for live music. The data
// is split into two related tables:
//   locations -> the venues
//   events    -> individual shows, each tied to a venue via location_id
//
// A mix of past and future dates is used so the frontend can show a countdown
// for upcoming shows and "passed" styling for shows that already happened.
// (While building this, "today" was June 2026.)

const locations = [
  {
    id: 1,
    name: "The Echo Lounge",
    neighborhood: "Downtown",
    capacity: 450,
    description:
      "An intimate brick-walled room known for indie and singer-songwriter nights. Great sightlines and an even better sound system.",
    image:
      "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Blue Note Hall",
    neighborhood: "Jazz District",
    capacity: 320,
    description:
      "A classic jazz and soul listening room with candlelit tables and a grand piano that has hosted legends for decades.",
    image:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Riverside Amphitheater",
    neighborhood: "Waterfront",
    capacity: 8000,
    description:
      "A sprawling open-air amphitheater on the river. The go-to spot for headline tours and festival weekends under the stars.",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    name: "The Underground",
    neighborhood: "Warehouse District",
    capacity: 600,
    description:
      "A gritty subterranean club for punk, metal, and electronic acts. Low ceilings, loud amps, and a sweaty dance floor.",
    image:
      "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    name: "Skyline Rooftop",
    neighborhood: "Midtown",
    capacity: 250,
    description:
      "A breezy rooftop bar with DJ sets, sunset acoustic shows, and skyline views. Casual vibes and craft cocktails.",
    image:
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1200&q=80",
  },
];

const events = [
  // The Echo Lounge (location 1)
  {
    title: "Wildflower — Acoustic Tour",
    artist: "Wildflower",
    genre: "Indie Folk",
    date: "2026-07-12T20:00:00",
    price: 28.0,
    description: "An evening of stripped-back harmonies and storytelling.",
    location_id: 1,
  },
  {
    title: "Neon Static — Album Release",
    artist: "Neon Static",
    genre: "Indie Rock",
    date: "2026-08-03T21:00:00",
    price: 32.0,
    description: "Celebrating their debut record with a full live band.",
    location_id: 1,
  },
  {
    title: "Open Mic Spotlight",
    artist: "Various Artists",
    genre: "Singer-Songwriter",
    date: "2026-05-29T19:30:00",
    price: 10.0,
    description: "A packed night of local talent — this one already happened.",
    location_id: 1,
  },

  // Blue Note Hall (location 2)
  {
    title: "The Midnight Quartet",
    artist: "The Midnight Quartet",
    genre: "Jazz",
    date: "2026-07-05T20:30:00",
    price: 45.0,
    description: "Smooth late-night standards and improvised solos.",
    location_id: 2,
  },
  {
    title: "Soul Revue Sundays",
    artist: "Ella & The Keys",
    genre: "Soul",
    date: "2026-06-28T18:00:00",
    price: 38.0,
    description: "A warm Sunday set of Motown classics and originals.",
    location_id: 2,
  },
  {
    title: "Bebop Night",
    artist: "Cool Cats Collective",
    genre: "Jazz",
    date: "2026-06-10T20:00:00",
    price: 30.0,
    description: "A high-energy bebop session — a recent fan favorite.",
    location_id: 2,
  },

  // Riverside Amphitheater (location 3)
  {
    title: "Summer Sounds Festival",
    artist: "Multiple Headliners",
    genre: "Festival",
    date: "2026-08-15T16:00:00",
    price: 89.0,
    description: "Two stages, ten acts, one unforgettable riverside day.",
    location_id: 3,
  },
  {
    title: "The Coastlines — World Tour",
    artist: "The Coastlines",
    genre: "Pop Rock",
    date: "2026-09-02T19:00:00",
    price: 75.0,
    description: "The arena-pop sensation brings their stadium show outdoors.",
    location_id: 3,
  },
  {
    title: "Symphony Under the Stars",
    artist: "City Philharmonic",
    genre: "Orchestral",
    date: "2026-05-20T20:00:00",
    price: 55.0,
    description: "A classical evening that closed out the spring season.",
    location_id: 3,
  },

  // The Underground (location 4)
  {
    title: "Bass Drop Warehouse Rave",
    artist: "DJ Volt",
    genre: "Electronic",
    date: "2026-07-19T22:00:00",
    price: 25.0,
    description: "Heavy bass, lasers, and dancing until the lights come up.",
    location_id: 4,
  },
  {
    title: "Riot Circuit — Punk Showcase",
    artist: "Riot Circuit + Guests",
    genre: "Punk",
    date: "2026-08-09T21:00:00",
    price: 18.0,
    description: "Four loud, fast bands tear up the basement stage.",
    location_id: 4,
  },
  {
    title: "Doomscroll Metal Night",
    artist: "Doomscroll",
    genre: "Metal",
    date: "2026-06-06T21:30:00",
    price: 22.0,
    description: "A crushing wall of sound — this show has already passed.",
    location_id: 4,
  },

  // Skyline Rooftop (location 5)
  {
    title: "Sunset Acoustic Sessions",
    artist: "Marlowe",
    genre: "Acoustic",
    date: "2026-07-08T18:30:00",
    price: 20.0,
    description: "Mellow guitar and vocals as the sun dips behind the skyline.",
    location_id: 5,
  },
  {
    title: "Rooftop House Party",
    artist: "DJ Sunset",
    genre: "House",
    date: "2026-08-22T20:00:00",
    price: 30.0,
    description: "Deep house grooves and craft cocktails high above the city.",
    location_id: 5,
  },
  {
    title: "Golden Hour Jazz",
    artist: "The Skyline Trio",
    genre: "Jazz",
    date: "2026-06-01T18:00:00",
    price: 24.0,
    description: "A laid-back trio set — last month's sold-out opener.",
    location_id: 5,
  },
];

export { locations, events };
