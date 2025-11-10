import { useState } from "react";
import "../../styles/dashboard.css";

// calendar widget that shows weekly view
export default function Calendar() {
  const [currentWeekStart, setCurrentWeekStart] = useState(getMonday(new Date()));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCollapsed, setIsCollapsed] = useState(false);

  // gets the monday of any week
  function getMonday(date) {
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  }

  function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // go back one week
  function goToPreviousWeek() {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  }

  // go forward one week
  function goToNextWeek() {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  }

  function formatDate(date) {
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
  }

  // check if date is today
  function isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  function isSelected(date) {
    return date.toDateString() === selectedDate.toDateString();
  }

  // calculates what week number it is in the year
  function getWeekNumber(date) {
    const tempDate = new Date(date);
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
    const week1 = new Date(tempDate.getFullYear(), 0, 4);
    return 1 + Math.round(((tempDate - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
  }

  // show/hide calendar details
  function handleToggle() {
    setIsCollapsed(!isCollapsed);
  }

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  // create array of 7 days for current week
  const daysInWeek = [];
  for (let i = 0; i < 7; i++) {
    daysInWeek.push(addDays(currentWeekStart, i));
  }

  const weekNumber = getWeekNumber(currentWeekStart);

  return (
    <div className={`calendar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="calendar-header">
        <button className="calendar-arrow" onClick={goToPreviousWeek}>
          &lt;
        </button>
        <div className="calendar-title">
          <div className="calendar-week">WEEK {weekNumber}</div>
          <div className="calendar-range">
            {formatDate(daysInWeek[0]).toUpperCase()} - {formatDate(daysInWeek[6]).toUpperCase()}
          </div>
        </div>
        <button className="calendar-arrow" onClick={goToNextWeek}>
          &gt;
        </button>
      </div>

      <div className={`calendar-days-container ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <div className="calendar-days">
          {daysInWeek.map((day, index) => (
            <div key={index} className="calendar-day-wrapper">
              <button
                className={`calendar-day ${isSelected(day) ? 'selected' : ''}`}
                onClick={() => setSelectedDate(day)}
              >
                <span className="day-letter">{weekDays[index]}</span>
                {isToday(day) && <span className="day-dot"></span>}
              </button>
              <span className="day-date">{formatDate(day).toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      <button 
        className="calendar-toggle" 
        onClick={handleToggle}
        aria-label={isCollapsed ? "Expand calendar" : "Collapse calendar"}
      >
        <span className="toggle-line"></span>
      </button>
    </div>
  );
}