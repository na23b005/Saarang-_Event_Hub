import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers } from 'react-icons/fa';
import './EventCard.css';

const EventCard = ({ event }) => {
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="event-card">
      <div 
        className="event-image" 
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      >
        <div className="event-capacity">
          <FaUsers />
          <span>{event.registeredUsers?.length || 0}/{event.capacity}</span>
        </div>
      </div>
      <div className="event-details">
        <h3>{event.title}</h3>
        <p className="event-description">{event.description.substring(0, 100)}...</p>
        <div className="event-info">
          <div className="info-item">
            <FaCalendarAlt />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="info-item">
            <FaClock />
            <span>{event.time}</span>
          </div>
          <div className="info-item">
            <FaMapMarkerAlt />
            <span>{event.location}</span>
          </div>
        </div>
        <Link to={`/event/${event._id}`} className="btn btn-primary view-details">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;