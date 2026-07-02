import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isCreating, setIsCreating] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const userName = localStorage.getItem("user_name") || "Alumni User";

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events/all");
      if (response.data.success) {
        setEvents(response.data.events);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...newEvent, organizer: userName };
      const response = await axios.post("/api/events", payload);
      if (response.data.success) {
        setIsCreating(false);
        setNewEvent({ title: "", description: "", date: "", location: "" });
        fetchEvents();
      }
    } catch (error) {
      console.error("Failed to create event:", error);
      alert("Failed to create event. Please fill all fields.");
    }
  };

  const handleRSVP = async (eventId) => {
    try {
      await axios.post(`/api/events/${eventId}/rsvp`, { alumniName: userName });
      fetchEvents(); // Refresh to show updated attendees
    } catch (error) {
      console.error("RSVP failed:", error);
      alert("Failed to RSVP.");
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Alumni Events</h1>
          <button 
            onClick={() => setIsCreating(!isCreating)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {isCreating ? "Cancel" : "Create Event"}
          </button>
        </div>

        {isCreating && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Host a New Event</h2>
            <form onSubmit={handleCreateEvent} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                <input required type="text" name="title" value={newEvent.title} onChange={handleInputChange} className="w-full px-4 py-2 border rounded focus:ring-blue-500" placeholder="e.g. Class of 2015 Reunion" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time *</label>
                <input required type="datetime-local" name="date" value={newEvent.date} onChange={handleInputChange} className="w-full px-4 py-2 border rounded focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input required type="text" name="location" value={newEvent.location} onChange={handleInputChange} className="w-full px-4 py-2 border rounded focus:ring-blue-500" placeholder="e.g. Main Campus or Zoom Link" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea required name="description" value={newEvent.description} onChange={handleInputChange} rows="3" className="w-full px-4 py-2 border rounded focus:ring-blue-500" placeholder="What is the event about?"></textarea>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition">
                  Create Event
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-gray-500">Loading events...</p>
        ) : events.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">No upcoming events.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => {
              const isAttending = event.attendees.includes(userName);
              return (
                <div key={event._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-3 mb-4 text-sm">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">📅 {new Date(event.date).toLocaleString()}</span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">📍 {event.location}</span>
                  </div>
                  <p className="text-gray-700 text-sm flex-grow mb-4">{event.description}</p>
                  
                  <div className="mt-auto border-t pt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">{event.attendees.length}</span> attending
                      <br/>
                      Organized by: {event.organizer}
                    </div>
                    
                    {isAttending ? (
                      <span className="px-4 py-2 bg-green-100 text-green-800 font-medium rounded-full text-sm">
                        ✓ Going
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleRSVP(event._id)}
                        className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                      >
                        RSVP
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Events;
