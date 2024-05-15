import { useState } from 'react';

const useScheduleData = () => {
  const [scheduleData, setScheduleData] = useState([
    {
      "instructor": "John Doe",
      "month": "May",
      "year":"2024",
      "leaves": [
        { "date": "2024-05-05", "reason": "Personal Leave" }
      ],
      "courses": [
        { "date": "2024-05-01", "title": "SWIRC-RAN" },
        { "date": "2024-05-03", "title": "DD-SKN" }
      ]
    },
    {
      "instructor": "Jane Smith",
      "month": "May",
      "year":"2024",
      "leaves": [],
      "courses": [
        { "date": "2024-05-02", "title": "SWIRC-RAN" },
        { "date": "2024-05-04", "title": "DD-SKN" }
      ]
    }
  ]);

  return scheduleData;
};

export default useScheduleData;
