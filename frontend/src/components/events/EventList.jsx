import React from 'react';
import EventCard from './EventCard';
import './EventList.css';

const EventList = ({ events, loading }) => {
  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  if (events.length === 0) {
    return <p className="no-events">No events found.</p>;
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <div className="event-item" key={event._id}>
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
};

export default EventList;