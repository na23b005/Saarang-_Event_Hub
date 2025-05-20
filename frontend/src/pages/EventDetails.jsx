import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import './EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/events/${id}`);
        setEvent(res.data);
        
        
        if (isAuthenticated && user && res.data.registeredUsers) {
          setIsRegistered(res.data.registeredUsers.includes(user._id));
        }
        
        setLoading(false);
      } catch (err) {
        toast.error('Error fetching event details');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, isAuthenticated, user]);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setRegisterLoading(true);
    try {
      await axios.post(`/api/events/${id}/register`);
      setIsRegistered(true);
      toast.success('Successfully registered for the event!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error registering for event');
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleUnregister = async () => {
    setRegisterLoading(true);
    try {
      await axios.delete(`/api/events/${id}/unregister`);
      setIsRegistered(false);
      toast.success('Successfully unregistered from the event');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error unregistering from event');
    } finally {
      setRegisterLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-container"><div className="spinner"></div></div>;
  }

  if (!event) {
    return <div className="event-not-found">Event not found</div>;
  }

  return (
    <div className="event-details-page">
      <div 
        className="event-banner" 
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      >
        <div className="event-banner-overlay"></div>
        <div className="event-banner-content">
          <h1>{event.title}</h1>
        </div>
      </div>

      <div className="event-content">
        <div className="event-info-box">
          <div className="event-meta">
            <div className="meta-item">
              <FaCalendarAlt />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="meta-item">
              <FaClock />
              <span>{event.time}</span>
            </div>
            <div className="meta-item">
              <FaMapMarkerAlt />
              <span>{event.location}</span>
            </div>
            <div className="meta-item">
              <FaUsers />
              <span>{event.registeredUsers?.length || 0} / {event.capacity} registered</span>
            </div>
          </div>

          {isAuthenticated && (
            <div className="registration-actions">
              {isRegistered ? (
                <button 
                  onClick={handleUnregister} 
                  className="btn btn-secondary"
                  disabled={registerLoading}
                >
                  {registerLoading ? 'Processing...' : 'Unregister'}
                </button>
              ) : (
                <button 
                  onClick={handleRegister} 
                  className="btn btn-primary"
                  disabled={registerLoading || (event.registeredUsers?.length >= event.capacity)}
                >
                  {registerLoading ? 'Processing...' : 
                   (event.registeredUsers?.length >= event.capacity) ? 'Event Full' : 'Register Now'}
                </button>
              )}
            </div>
          )}

          {!isAuthenticated && (
            <div className="login-prompt">
              <p>Please log in to register for this event</p>
              <button 
                onClick={() => navigate('/login')} 
                className="btn btn-primary"
              >
                Log In
              </button>
            </div>
          )}
        </div>

        <div className="event-description-container">
          <h2>About This Event</h2>
          <p>{event.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;