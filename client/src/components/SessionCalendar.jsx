import React from 'react'
import { useState,useEffect } from 'react';

const SessionCalendar = ({workoutSessions}) => {
    
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
   const [calendarDays, setCalendarDays] = useState([]);
   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
   const monthsNames = [
     "January",
     "February",
     "March",
     "April",
     "May",
     "June",
     "July",
     "August",
     "September",
     "October",
     "November",
     "December",
   ];

   console.log('workoutSessions:',workoutSessions)
   useEffect(() => {
     generateCalendar(currentYear, currentMonth);
   }, [currentYear, currentMonth]);

  function generateCalendar(year, month) {
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    const newCalendarDays = [];

    // Add empty boxes for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      newCalendarDays.push("");
    }

    // Add boxes for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      newCalendarDays.push(day);
    }

    // Update the state with the new calendar days
    setCalendarDays(newCalendarDays);
  }

  function showModal(selectedDate) {
    // Your existing showModal function
  }

  function hideModal() {
    // Your existing hideModal function
  }

  function handlePrevMonth() {
    setCurrentMonth((prevMonth) => {
      let newMonth = prevMonth - 1;
      let newYear = currentYear;
      if (newMonth < 0) {
        newMonth = 11;
        newYear = currentYear - 1;
      }
      setCurrentYear(newYear);
      return newMonth;
    });
  }

  function handleNextMonth() {
    setCurrentMonth((prevMonth) => {
      let newMonth = prevMonth + 1;
      let newYear = currentYear;
      if (newMonth > 11) {
        newMonth = 0;
        newYear = currentYear + 1;
      }
      setCurrentYear(newYear);
      return newMonth;
    });
  }

  function handleDayClick(day) {
    const selectedDate = new Date(currentYear, currentMonth, day);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = selectedDate.toLocaleDateString(undefined, options);
    showModal(formattedDate);
  }

  function calculateDate(year,monthIndex,day){
    const date = new Date(year,monthIndex,day+1);
    console.log('date:',date)
    return date;
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center h-1/2">
      <div className="lg:w-7/12 md:w-9/12 sm:w-10/12 mx-auto p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-gray-700">
            <button
              id="prevMonth"
              className="text-white"
              onClick={handlePrevMonth}
            >
              Previous
            </button>
            <h2
              id="currentMonth"
              className="text-white"
            >{`${monthsNames[currentMonth]} ${currentYear}`}</h2>
            <button
              id="nextMonth"
              className="text-white"
              onClick={handleNextMonth}
            >
              Next
            </button>
          </div>
          <div
            className="grid grid-cols-7 gap-2 p-4 dark:text-black"
            id="calendar"
          >
            {daysOfWeek.map((day, index) => (
              <div
                key={index}
                className="text-center py-2 border cursor-pointer"
              >
                <h3>{day}</h3>
              </div>
            ))}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className="text-center py-2 border cursor-pointer"
                onClick={() => handleDayClick(day)}
                style={
                  workoutSessions.find(
                    (session) => session.finishedDate.substr(-29,10) === calculateDate(currentYear,currentMonth,day).toISOString().substr(-29,10)
                  )
                    && { backgroundColor: "green" }
                    
                }
              >
                <h3>{day}</h3>
              </div>
            ))}
          </div>
          <div
            id="myModal"
            className="modal hidden fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl font-bold">Selected Date</p>
                  <button
                    id="closeModal"
                    className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring"
                  >
                    ✕
                  </button>
                </div>
                <div id="modalDate" className="text-xl font-semibold"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionCalendar