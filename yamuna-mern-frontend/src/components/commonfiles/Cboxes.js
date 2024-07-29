import React, { useState } from 'react';

const Cboxes = ({btnChange, cVal}) => {
  const [education, setEducation] = useState({
    f_course: false,

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
            checked={cVal ? cVal === "MCA" : education.mca}
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
            checked={cVal ? cVal === "BCA" : education.mca}
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
            checked={cVal ? cVal === "BSC" : education.mca}
            onChange={handleCheckboxChange}
          />
          BSc
        </label>
      </div>
    </div>
  );
};

export default Cboxes;
