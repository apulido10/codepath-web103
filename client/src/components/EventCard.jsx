import { Link } from "react-router-dom";
import Countdown from "./Countdown.jsx";
import { formatEventDate, isPast } from "../utils/dates.js";

// A single event row/card. When the event has already happened it gets a
// "past" modifier class that crosses out the title and dims the card.
function EventCard({ event, showVenue = false }) {
  const past = isPast(event.date);

  return (
    <article className={`event-card${past ? " event-card-past" : ""}`}>
      <div className="event-card-main">
        <div className="event-card-head">
          <h3 className="event-title">{event.title}</h3>
          <span className="event-genre">{event.genre}</span>
        </div>
        <p className="event-artist">{event.artist}</p>
        <p className="event-description">{event.description}</p>

        {showVenue && event.location_name && (
          <Link to={`/location/${event.location_id}`} className="event-venue">
            📍 {event.location_name}
          </Link>
        )}
      </div>

      <div className="event-card-meta">
        <span className="event-date">{formatEventDate(event.date)}</span>
        {event.price != null && (
          <span className="event-price">${Number(event.price).toFixed(2)}</span>
        )}
        <Countdown date={event.date} />
        {past && <span className="event-passed-tag">Event passed</span>}
      </div>
    </article>
  );
}

export default EventCard;
