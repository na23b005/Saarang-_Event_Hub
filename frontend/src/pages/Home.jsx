import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from '../components/events/EventList';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('/api/events');
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        toast.error('Error fetching events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>EVENTS</h1>
        <p>Browse through our collection of events and register for the ones you like</p>
        
        <div className="search-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="events-section">
        <h2>Upcoming Events</h2>
        <EventList events={filteredEvents} loading={loading} />
      </div>
    </div>
  );
};

export default Home;