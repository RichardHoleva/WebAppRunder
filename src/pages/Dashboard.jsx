import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthProvider.jsx';
import AddRunInput from '../components/dashboardComponents/AddRunInput.jsx';
import NavBar from '../components/NavBar.jsx';
import Calendar from '../components/dashboardComponents/Calendar.jsx';
import Filter from '../components/dashboardComponents/Filter.jsx';
import '../styles/dashboard.css';
import EventCard from '../components/dashboardComponents/EventCard.jsx';
import { getAllEvents, getUserEvents, getJoinedEvents, joinEvent, deleteEvent } from '../lib/events.js';
import runnerImage from '../assets/runner.png';

// main dashboard page where users see all events
export default function Dashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('created'); // what type of events to show

  // load events when page loads or filter changes
  useEffect(() => {
    loadEvents();
  }, [filterType]);

  // get events based on current filter
  const loadEvents = async () => {
    setLoading(true);
    try {
      let result;
      if (filterType === 'created') {
        result = await getUserEvents(); // events user created
      } else if (filterType === 'joined') {
        result = await getJoinedEvents(); // events user joined
      } else {
        result = await getAllEvents(); // all events
      }
      
      if (result.success) {
        setEvents(result.events);
      } else {
        console.error('Error loading events:', result.error);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  // when user clicks join on an event
  const handleJoinEvent = async (eventId) => {
    try {
      const result = await joinEvent(eventId);
      if (result.success) {
        console.log('Successfully joined event');
        // Optionally reload events to update participant count
        loadEvents();
      } else {
        alert(`Error joining event: ${result.error}`);
      }
    } catch (error) {
      alert(`Error joining event: ${error.message}`);
    }
  };

  // when user wants to delete their own event
  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const result = await deleteEvent(eventId);
        if (result.success) {
          console.log('Successfully deleted event');
          loadEvents(); // Reload events to update the list
        } else {
          alert(`Error deleting event: ${result.error}`);
        }
      } catch (error) {
        alert(`Error deleting event: ${error.message}`);
      }
    }
  };

  // converts event data to format that EventCard needs
  const formatEventForCard = (event) => {
    const eventDate = new Date(event.date);
    const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = eventDate.getDate().toString().padStart(2, '0');
    
    return {
      id: event.id,
      title: event.title,
      location: event.location,
      date: { month, day },
      imageUrl: event.image_url || runnerImage,
      description: event.description,
      typeOfRun: event.type_of_run,
      time: event.time,
      createdBy: event.created_by,
      participants: event.participants || []
    };
  };

  return (
    <>
      <Calendar />
      
      <div>
        <main className="dashboard">
          <div className="dashboard-container">
            {/* filter to switch between different event types */}
            <Filter onFilterChange={setFilterType} />
            <AddRunInput title="New run" />
            
            {loading ? (
              <p>Loading events...</p>
            ) : (
              <div className="events-list">
                {events.length === 0 ? (
                  <p>No events found. Create your first event!</p>
                ) : (
                  // show all events as cards
                  events.map((event) => {
                    const formattedEvent = formatEventForCard(event);
                    return (
                      <EventCard
                        key={event.id}
                        id={event.id}
                        title={formattedEvent.title}
                        location={formattedEvent.location}
                        date={formattedEvent.date}
                        imageUrl={formattedEvent.imageUrl}
                        description={formattedEvent.description}
                        onJoinEvent={() => handleJoinEvent(event.id)}
                        onDeleteEvent={handleDeleteEvent}
                        showDeleteButton={filterType === 'created'} // only show delete for user's own events
                      />
                    );
                  })
                )}
              </div>
            )}
          </div>
        </main>
      </div>
      <NavBar />
    </>
  );
}