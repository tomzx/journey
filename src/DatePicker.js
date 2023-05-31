import React, { useEffect, useRef, useState } from 'react';

const DatePicker = ({ value, onChange }) => {
  const [date, setDate] = useState(value || '');
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
	onChange(e.target.value);
  };

  useEffect(() => {
    setDate(value || '');
  }, [value]);

  return (
    <input
      type="date"
      onChange={handleChange}
      ref={dateInputRef}
      value={date}
    />
  );
};

export default DatePicker;
