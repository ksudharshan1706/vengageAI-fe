import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import AddEventModel from "./AddEventModel";
import axios from "axios";
import moment from "moment";

const Calnendar = () => {
  const [modelOpen, setModelOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);
  const onEventAdded = (e) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(e.start).toDate(),
      end: moment(e.end).toDate(),
      title: e.title,
    });
  };

  const handleEventAdd = async (data) => {
    await axios.post("/create-event", data.event);
  };
  const handleDatesSet = async (data) => {
    const response = await axios.get(
      "/get-event?start=" +
        moment(data.start).toISOString() +
        "&end=" +
        moment(data.end).toISOString(),
      data.event
    );
    setEvents(response.data);
  };

  return (
    <section>
      <button onClick={() => setModelOpen(true)}>Add Event</button>
      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          ref={calendarRef}
          events={events}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          eventAdd={(e) => handleEventAdd(e)}
          datesSet={(date) => handleDatesSet(date)}
        />
      </div>
      <AddEventModel
        isOpen={modelOpen}
        onClose={() => setModelOpen(false)}
        onEventAdded={(e) => onEventAdded(e)}
      />
    </section>
  );
};

export default Calnendar;
