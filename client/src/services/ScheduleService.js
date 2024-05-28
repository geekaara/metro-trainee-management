import { useState, useEffect } from 'react';
import axios from 'axios';

const useScheduleData = (month, year, userid) => {
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchScheduleData();
  }, [month, year]);

  return { scheduleData, loading, error };
};

export default useScheduleData;
