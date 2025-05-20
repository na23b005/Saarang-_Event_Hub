import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import EventList from '../components/events/EventList';
import { FaCalendarCheck } from 'react-icons/fa';
import './MyRegistrations.css';

const MyRegistrations = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const res = await axios.get('/api/events/registered/me');
        setEvents(res.data);
        setLoading(false);
      } catch (err) {
        toast.error('Error fetching your registrations');
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, []);

  return (
    <div className="my-registrations-page">
      <div className="page-header">
        <div className="page-title">
          <FaCalendarCheck className="title-icon" />
          <h1>My Registrations</h1>
        </div>
        <p>Events you have registered for</p>
      </div>

      {events.length === 0 && !loading ? (
        <div className="no-registrations">
          <p>You haven't registered for any events yet.</p>
        </div>
      ) : (
        <EventList events={events} loading={loading} />
      )}
    </div>
  );
};

export default MyRegistrations;