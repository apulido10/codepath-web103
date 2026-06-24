# WEB103 Project 3 - *Encore*

Submitted by: **Alexander**

About this web app: **Encore is a virtual community space for live music. Pick one of several real-feeling venues — from an intimate indie lounge to a riverside amphitheater — and see every show happening (or that already happened) there. The front page is a visual grid of venue cards; each venue has its own page listing its events, and a stretch "All Events" page lets you filter by venue and sort by date. Upcoming shows display a live countdown, and past shows are dimmed and crossed out.**

Time spent: **8** hours

## Tech Stack

- **Frontend:** React (Vite) + React Router
- **Backend:** Node.js + Express
- **Database:** PostgreSQL hosted on Render

The database has two related tables:

- `locations` — the venues
- `events` — individual shows, each tied to a venue through a `location_id` foreign key

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
  - [x]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select a location they would like to view.**
  - [x] *Note: A non-visual list of links to different locations is insufficient.*
- [x] **Each location has a detail page with its own unique URL.**
- [x] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

The following **optional** features are implemented:

- [x] An additional page shows all possible events
  - [x] Users can sort *or* filter events by location.
- [x] Events display a countdown showing the time remaining before that event
  - [x] Events appear with different formatting when the event has passed (ex. negative time, indication the event has passed, crossed out, etc.).

The following **additional** features are implemented:

- [x] Live, second-by-second countdown timers that switch to "Ended Xd Xh ago" once a show passes
- [x] Both **filter by venue** *and* **sort by date** (soonest / latest) on the All Events page
- [x] Genre tags, ticket prices, artist names, and per-venue event counts
- [x] Responsive dark "concert" theme with hover animations and a custom 404 page
- [x] SPA deep-link support — refreshing a `/location/:id` URL still loads the app

## Video Walkthrough

Here's a walkthrough of implemented required features:

[Watch the Video Walkthrough](https://imgur.com/a/4amWFO7)

GIF created with ...  <!-- e.g. peek (Linux) -->

[peek](https://github.com/phw/peek) for Linux. -->

### Render dashboard (database available)

<!-- TODO: Add a screenshot of your Render dashboard showing the PostgreSQL
     instance with an "Available" status. -->

![Render dashboard showing the PostgreSQL database available](add-your-render-dashboard-screenshot-here.png)

### Database table contents

Run these from `psql` connected to your Render database and screenshot the output:

```sql
SELECT * FROM locations;
SELECT * FROM events;
```

<!-- TODO: Add a screenshot of the SELECT output below. -->

![psql output of SELECT * FROM locations and events](add-your-table-contents-screenshot-here.png)

## Project Structure & Running Locally

```
codepath-web103/
├── client/                 # React (Vite) front end
│   ├── src/
│   │   ├── components/     # NavBar, LocationCard, EventCard, Countdown
│   │   ├── pages/          # HomePage, LocationPage, EventsPage, NotFoundPage
│   │   ├── services/api.js # fetch wrappers for the API
│   │   ├── utils/dates.js  # date formatting + countdown logic
│   │   └── css/index.css
│   └── vite.config.js      # proxies /api -> http://localhost:3000
└── server/                 # Express + PostgreSQL back end
    ├── config/
    │   ├── database.js     # pg connection pool (reads .env)
    │   ├── data.js         # seed data (venues + events)
    │   └── reset.js        # creates + seeds the tables
    ├── routes/
    │   ├── locations.js    # GET /api/locations, GET /api/locations/:id
    │   └── events.js       # GET /api/events, GET /api/events?location=:id
    └── server.js
```

### 1. Configure the database

Create a PostgreSQL instance on [Render](https://render.com), then copy its
**External Connection** values into `server/.env`:

```
PGUSER=your_user
PGPASSWORD=your_password
PGHOST=your-host.oregon-postgres.render.com
PGPORT=5432
PGDATABASE=your_database
```

### 2. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 3. Seed the database

```bash
cd server
npm run reset      # drops, creates, and seeds the locations + events tables
```

### 4. Run the app (two terminals)

```bash
# terminal 1 — API on http://localhost:3000
cd server && npm start

# terminal 2 — React dev server on http://localhost:5173
cd client && npm run dev
```

Open **http://localhost:5173**. (For a production-style run, `npm run build` in
`client/` and the Express server will serve the built app on port 3000.)

## API Reference

| Method | Endpoint                      | Description                                         |
| ------ | ----------------------------- | --------------------------------------------------- |
| GET    | `/api/locations`              | All venues                                          |
| GET    | `/api/locations/:id`          | One venue plus its list of events                   |
| GET    | `/api/events`                 | All events (joined with their venue name)           |
| GET    | `/api/events?location=:id`    | Events filtered to a single venue                   |

## Notes

Challenges encountered while building the app:

- **Modeling the data as two related tables.** Events belong to a venue, so I
  used a `location_id` foreign key with `ON DELETE CASCADE` and a `JOIN` on the
  events endpoint so each event can show its venue name on the All Events page.
- **Countdowns updating live.** The `Countdown` component uses a `setInterval`
  inside `useEffect` (cleaned up on unmount) to re-render once per second, and
  flips its formatting once an event's date is in the past.
- **SPA routing on refresh.** Express serves the built React app and falls back
  to `index.html` for any non-`/api` path so deep links like `/location/3`
  survive a page refresh.

## License

    Copyright 2026 Alexander

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
