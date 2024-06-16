import { useState, useEffect } from 'react';
import axios from 'axios';
// Custom hook to fetch schedule data based on month and year
const useScheduleData = (month, year, userid) => {
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch schedule data
    const fetchScheduleData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/instructorschedule/view', {
          params: { month, year }
        });
        setScheduleData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
// Call the function to fetch data
    fetchScheduleData();
  }, [month, year]);
// Return the schedule data, loading status, and error
  return { scheduleData, loading, error };
};

export default useScheduleData;
