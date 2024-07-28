// src/components/EditEmployee.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { TextInput } from './commonfiles/textinput';
import { ButtonComponent } from './commonfiles/button';

const EditEmployee = () => {
  const { id } = useParams();
  console.log(id,'<****************')
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    f_id: '',
    f_image: '',
    f_name: '',
    f_email: '',
    f_mobile: '',
    f_designation: '',
    f_gender: '',
    f_course: '',
    f_createdate: ''
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employees/${id}`, employee);
      navigate('/employeetable');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <Box className="loginscreencontainer">
      <div style={{ width: '30%', height: '100%',marginTop:20 }}>
       
        <form className="loginscreencontainer2" onSubmit={handleSubmit}>
        <h1 className="loginheading" >Edit Employee details</h1>
          <p className="commonparagraph" style={{ textAlign: 'left',marginBottom: 0}}  >ID</p>
          <input
            className="commontextinpustyle"
            type="text"
            name="id"
            value={employee.f_id}
            onChange={handleChange}
            placeholder="ID"
            readOnly
          />
          <p className="commonparagraph" style={{ textAlign: 'left',marginBottom: 3 }}  >Image</p>

          <input
            className="commontextinpustyle"
            type="text"
            name="image"
            value={employee.f_image}
            onChange={handleChange}
            placeholder="Image URL"
          />
          <p className="commonparagraph" style={{ textAlign: 'left',marginBottom: 3 }}  >Name</p>

          <input
            className="commontextinpustyle"
            type="text"
            name="name"
            value={employee.f_name}
            onChange={handleChange}
            placeholder="Name"
          />
          <p className="commonparagraph" style={{ textAlign: 'left',marginBottom: 3 }}  >Email</p>

          <input
            className="commontextinpustyle"
            type="email"
            name="email"
            value={employee.f_email}
            onChange={handleChange}
            placeholder="Email"
          />

          <p className="commonparagraph" style={{ textAlign: 'left',marginBottom: 3 }}  >Mobile</p>
          <input
            className="commontextinpustyle"
            type="text"
            name="mobile"
            value={employee.f_mobile}
            onChange={handleChange}
            placeholder="Mobile"

          />
          <p className="commonparagraph" style={{ textAlign: 'left',marginBottom: 3 }}  >Designation</p>

          <input
            className="commontextinpustyle"
            type="text"
            name="designation"
            value={employee.f_designation}
            onChange={handleChange}
            placeholder="Designation"

          />
          <p className="commonparagraph" style={{ textAlign: 'left',marginBottom: 3 }}  >Gender</p>

          <input
            className="commontextinpustyle"
            type="text"
            name="gender"
            value={employee.f_gender}
            onChange={handleChange}
            placeholder="Gender"

          />
          <p className="commonparagraph" style={{ textAlign: 'left',marginBottom: 3 }}  >Course</p>

          <input
            className="commontextinpustyle"
            type="text"
            name="course"
            value={employee.f_course}
            onChange={handleChange}
            placeholder="Course"

          />
          <p className="commonparagraph" style={{ textAlign: 'left',marginBottom: 3 }}  >Create Date</p>

          <input
            className="commontextinpustyle"
            type="text"
            name="createdate"
            value={employee.f_createdate}
            onChange={handleChange}
            placeholder="Create Date"
          />

          <button style={{
            
            backgroundColor: "#0062ff",
            color: 'white',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: "center",
            borderWidth: 0,
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            alignSelf:'center',
            marginTop: 10, padding: 10, borderRadius: 10, width: "50%"
          }}
            type="submit">Save</button>
        </form>
        {/* <TextInput
          heading="ID"
          type='text'
          placeholder='ID'
          name="id"
          // value={employee.id}
          value={employee}
          onchangefunction={handleChange}
        /> */}
        {/* <TextInput
          heading="Image"
          type='text'
          placeholder="Image URL"
          value={employee.image}
          onchangefunction={handleChange}
        />
        <TextInput
          heading='Name'
          type='text'
          placeholder="Enter name"
          value={employee.name}
          onchangefunction={handleChange}
        />
        <TextInput
          heading='Email'
          type='text'
          placeholder="Enter email"
          value={employee.email}
          onchangefunction={handleChange}
        />
        <TextInput
          heading='mobile'
          type='text'
          placeholder="Enter mobile"
          value={employee.mobile}
          onchangefunction={handleChange}
        />
        <TextInput
          heading='designation'
          type='text'
          placeholder="Enter designation"
          value={employee.designation}
          onchangefunction={handleChange}
        />
        <TextInput
          heading='gender'
          type='text'
          placeholder="Enter gender"
          value={employee.gender}
          onchangefunction={handleChange}
        />
        <TextInput
          heading='course'
          type='text'
          placeholder="Enter course"
          value={employee.course}
          onchangefunction={handleChange}
        />
         <TextInput
          heading='createdate'
          type='text'
          placeholder="Enter createdate"
          value={employee.createdate}
          onchangefunction={handleChange}
        /> */}
        <br />

        {/* <ButtonComponent
          title='save'
          onClickFunction={handleSubmit}
          // isdisable={disableLoginButton}
        /> */}




      </div>

    </Box >
  );
};

export default EditEmployee;
