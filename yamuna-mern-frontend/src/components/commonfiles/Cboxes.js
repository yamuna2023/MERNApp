import React, { useState } from 'react';

const Cboxes = ({btnChange, cVal}) => {
  const [education, setEducation] = useState({
    f_course: false
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setEducation((prevState) => ({
      ...prevState,
      [name]: checked
    }));
    btnChange(event)
  };

  return (
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
      <div>
        <label>
          <input
            type="checkbox"
            name="f_course"
            value={"MCA"}
            checked={education.mca || cVal === "MCA"}
            onChange={handleCheckboxChange}
          />
          MCA
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="f_course"
            value={"BCA"}
            checked={education.bca || cVal === "BCA"}
            onChange={handleCheckboxChange}
          />
          BCA
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="f_course"
            value={"BSC" || cVal === "BSC"}
            checked={education.bsc}
            onChange={handleCheckboxChange}
          />
          BSc
        </label>
      </div>
    </div>
  );
};

export default Cboxes;
