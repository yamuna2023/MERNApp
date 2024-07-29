// src/components/CreateEmployee.js
import { Box } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cboxes from './commonfiles/Cboxes';
import GenderRadioButtons from './commonfiles/GenderRadioButtons';
import ImageUpload from './commonfiles/ImageUpload';
import { hasWhiteSpace, phonenoregex, reg } from './Login';

const CreateEmployee = () => {
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
        checkForValidFields();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/employees/`, employee);
            navigate('/employeetable');
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };
    // drop down code
    const [selectedOption, setSelectedOption] = useState('');
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        handleChange(event);
    };
    const designationList = [
        {
            label: 'HR',
            value: 'HR'
        },
        {
            label: 'Manager',
            value: 'Manager'
        },
        {
            label: 'Sales',
            value: 'Sales'
        },
    ]

    // Validations
    const [disableLoginButton, setdisableLoginButton] = useState(true);

    const checkForValidFields = () => {
        let boolVal =
            (reg.test(employee.f_email)) &&
            !hasWhiteSpace(employee.f_email) &&
            employee.f_mobile.match(phonenoregex)  &&
            employee.f_name?.length > 0 &&
            !hasWhiteSpace(employee.f_name);
        setdisableLoginButton(!boolVal);
    };

    return (
        <Box className="loginscreencontainer">
            <div style={{ width: '30%', height: '100%', marginTop: 20 }}>

                <form className="loginscreencontainer2" onSubmit={handleSubmit}>
                    <h1 className="loginheading" >Create Employee </h1>
                    <p className="commonparagraph" style={{ textAlign: 'left', marginBottom: 0 }}  >ID</p>
                    <input
                        className="commontextinpustyle"
                        type="text"
                        name="f_id"
                        value={employee.f_id}
                        onChange={handleChange}
                        placeholder="ID"
                    />

                    <p className="commonparagraph" style={{ textAlign: 'left', marginBottom: 3 }}  >Name</p>

                    <input
                        className="commontextinpustyle"
                        type="text"
                        name="f_name"
                        value={employee.f_name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                    <p className="commonparagraph" style={{ textAlign: 'left', marginBottom: 3 }}  >Email</p>

                    <input
                        className="commontextinpustyle"
                        type="email"
                        name="f_email"
                        value={employee.f_email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <p className="commonparagraph" style={{ textAlign: 'left', marginBottom: 3 }}  >Mobile</p>
                    <input
                        className="commontextinpustyle"
                        type="text"
                        name="f_mobile"
                        value={employee.f_mobile}
                        onChange={handleChange}
                        placeholder="Mobile"

                    />

                    <p className="commonparagraph" style={{ textAlign: 'left', marginBottom: 3 }}  >Designation</p>

                    <select name="f_designation" className="commontextinpustyle" style={{ width: '88%' }} id="options" value={selectedOption} onChange={handleSelectChange}>
                        <option >Select an Employee</option>
                        {designationList.map((each, index) => (
                            <option key={index} value={each.value}>
                                {each.label}
                            </option>
                        ))}
                    </select>

                    <p className="commonparagraph" style={{ textAlign: 'left', marginBottom: 3 }}  >Gender</p>
                    <GenderRadioButtons btnChange={handleChange} />

                    <p className="commonparagraph" style={{ textAlign: 'left', marginBottom: 3 }}  >Course</p>
                    <Cboxes btnChange={handleChange} />

                    <p className="commonparagraph" style={{ textAlign: 'left', marginBottom: 3 }}  >Image</p>
                    <input
                        className="commontextinpustyle"
                        type="text"
                        name="f_image"
                        value={employee.f_image}
                        onChange={handleChange}
                        placeholder="Image url"
                    />

                    <p className="commonparagraph" style={{ textAlign: 'left', marginBottom: 3 }}  >Create Date</p>
                    <input
                        className="commontextinpustyle"
                        type="text"
                        name="f_createdate"
                        value={employee.f_createdate}
                        onChange={handleChange}
                        placeholder="Create Date"
                    />

                    <button style={{
                        backgroundColor: disableLoginButton ? "grey" : "#0062ff",
                        color: 'white',
                        alignItems: 'center',
                        textAlign: 'center',
                        justifyContent: "center",
                        borderWidth: 0,
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                        alignSelf: 'center',
                        marginTop: 10, padding: 10, borderRadius: 10, width: "50%"
                    }}
                        type="submit">Create</button>
                </form>

            </div>

        </Box >
    );
};

export default CreateEmployee;
