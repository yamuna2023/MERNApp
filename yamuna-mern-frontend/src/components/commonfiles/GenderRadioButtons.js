import React, { useEffect, useState } from 'react';

const GenderRadioButtons = ({btnChange, genderVal}) => {
  const [gender, setGender] = useState(genderVal);
  const handleRadioChange = (event) => {
    setGender(event.target.value);
    btnChange(event)
  };
  return (
    <div style={{display:'flex'}}>
      <div>
        <label>
          <input
            type="radio"
            name="f_gender"
            value="Male"
            checked={gender === 'Male' || genderVal === "Male"}
            onChange={handleRadioChange}
          />
          Male
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="f_gender"
            value="Female"
            checked={gender === 'Female' || genderVal === "Female"}
            onChange={handleRadioChange}
          />
          Female
        </label>
      </div>
    </div>
  );
};

export default GenderRadioButtons;
