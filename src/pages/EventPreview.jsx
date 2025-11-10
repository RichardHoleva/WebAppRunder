import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventHeader from '../components/previewComponents/EventHeader.jsx';
import OrganizerCard from '../components/previewComponents/OrganizerCard.jsx';
import AboutSection from '../components/previewComponents/AboutSection.jsx';
import DistanceSection from '../components/previewComponents/DistanceSection.jsx';
import BuddySection from '../components/previewComponents/BuddySection.jsx';
import PlaylistSection from '../components/previewComponents/PlaylistSection.jsx';
import EventGallery from '../components/previewComponents/EventGallery.jsx';
import familyRunImage from '../assets/familyrun.png';
import richardholeva from '../assets/richardholeva.png'
import BuyTicket from '../components/previewComponents/BuyTicket.jsx';
import '../styles/preview.css';

function EventPreview() {
  // get event id from url
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // fetch event data from supabase later
    // for now just using mock data
    setEvent({
      title: 'Family Run 2025',
      date: '22 Oct, 2025, 19:30',
      location: 'Forstbotanisk Have',
      image: familyRunImage,
      difficulty: 'Beginner',
      participants: 23,
      privacy: 'Private',
      distance: '10 km',
      description: 'Family Run is a midweek reset built around movement, connection, and good energy. It’s a casual, social run where everyone’s welcome — no pressure, no competition, just a chance to get outside, move your body, and share a few conversations along the way. Whether you come with friends or show up solo, you’ll find an easy pace and an even easier atmosphere. It’s about showing up, doing something good for yourself, and ending the day feeling a little lighter than when you started.',
      playlistUrl: 'https://open.spotify.com/playlist/6FIv12d0EedHZAp9ZJvguJ',
      organizer: {
        name: 'Richard Holeva',
        avatar: richardholeva,
      },
      galleryImages: [] 
    });
  }, [eventId]);

  // show loading while fetching data
  if (!event) return <div>Loading...</div>;

  return (
    <div className="event-preview-page">
      {/* header with event image and basic info */}
      <EventHeader event={event} />
      
      {/* organizer profile card */}
      <OrganizerCard organizer={event.organizer} />
      
      {/* event description */}
      <AboutSection description={event.description} />
      
      {/* distance and map */}
      <DistanceSection distance={event.distance} />
      
      {/* buddy program section */}
      <BuddySection />
      
      {/* spotify playlist embed */}
      <PlaylistSection playlistUrl={event.playlistUrl} />
      
      {/* event photos gallery */}
      <EventGallery images={event.galleryImages} />
      
      {/* buy ticket button */}
      <BuyTicket/>
    </div>
  );
}

export default EventPreview;