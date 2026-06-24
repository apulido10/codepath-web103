import { useEffect, useMemo, useState } from "react";
import { getEvents, getLocations } from "../services/api.js";
import EventCard from "../components/EventCard.jsx";

// Stretch feature: a page that lists every event, with controls to filter by
// venue and sort by soonest/latest. Filtering is done client-side here so the
// controls feel instant; the API also supports ?location= server-side.
function EventsPage() {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [locationFilter, setLocationFilter] = useState("all");
  const [sort, setSort] = useState("soonest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getEvents(), getLocations()])
      .then(([eventsData, locationsData]) => {
        setEvents(eventsData);
        setLocations(locationsData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const visibleEvents = useMemo(() => {
    let list = events;

    if (locationFilter !== "all") {
      list = list.filter((e) => String(e.location_id) === locationFilter);
    }

    return [...list].sort((a, b) => {
      const diff = new Date(a.date) - new Date(b.date);
      return sort === "soonest" ? diff : -diff;
    });
  }, [events, locationFilter, sort]);

  return (
    <>
      <header className="hero hero-compact">
        <h1>All Events</h1>
        <p>Browse every show across all venues. Filter and sort to plan your week.</p>
      </header>

      <div className="filter-bar">
        <label>
          Venue
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="all">All venues</option>
            {locations.map((loc) => (
              <option key={loc.id} value={String(loc.id)}>
                {loc.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort by
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="soonest">Soonest first</option>
            <option value="latest">Latest first</option>
          </select>
        </label>

        <span className="filter-count">
          {visibleEvents.length} event{visibleEvents.length === 1 ? "" : "s"}
        </span>
      </div>

      {loading && <p className="status">Loading events…</p>}
      {error && <p className="status status-error">{error}</p>}

      <div className="event-list">
        {visibleEvents.map((event) => (
          <EventCard key={event.id} event={event} showVenue />
        ))}
      </div>
    </>
  );
}

export default EventsPage;
