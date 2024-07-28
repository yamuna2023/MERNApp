// src/components/EmployeeTable.js
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutModal from './dashboardscreens/logoutmodel';
import { Typography } from '@mui/material';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100%)`,
    marginLeft: `${0}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [logoutshowmodal, setlogoutShowModal] = useState(false)
  const [getUserName, setGetUserName] = React.useState('');
  const navigate = useNavigate();
  useEffect(() => {
    setGetUserName(localStorage.getItem('UserName'))
  }, [])
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  return (
    <Box>

      <AppBar position="fixed" >
        <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row', width: '15%', justifyContent: 'space-between', alignItems: 'center' }}>

            <Typography onClick={() => navigate('/dashboard')} variant="h6" noWrap component="div" style={{ cursor: 'pointer' }}>
              Home
            </Typography>
            <Typography onClick={() => navigate('/employeetable')} variant="h6" noWrap component="div" style={{ cursor: 'pointer' }} >
              Employee list
            </Typography>
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', width: '15%', justifyContent: 'space-between', paddingRight: 10 }}>
            <Typography onClick={() => setlogoutShowModal(!logoutshowmodal)} > {getUserName}  </Typography>

            <Typography onClick={() => setlogoutShowModal(!logoutshowmodal)} style={{ cursor: 'pointer' }}> Logout</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      {logoutshowmodal &&
        <LogoutModal open={logoutshowmodal} close={() => setlogoutShowModal(false)} />
      }
      <Box sx={{ marginX: 5, marginTop: 10 }}>
        <Typography variant="h5" sx={{ color: 'green', padding: 2 }} noWrap component="div">
          Dashboard
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Create Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee,index) => (
                <TableRow key={index}>
                  <TableCell>{employee.f_id}</TableCell>
                  <TableCell>
                    <img src={employee.f_image} alt={employee.f_name} style={{ width: '50px', height: '50px' }} />
                  </TableCell>
                  <TableCell>{employee.f_name}</TableCell>
                  <TableCell>{employee.f_email}</TableCell>
                  <TableCell>{employee.f_mobile}</TableCell>
                  <TableCell>{employee.f_designation}</TableCell>
                  <TableCell>{employee.f_gender}</TableCell>
                  <TableCell>{employee.f_course}</TableCell>
                  <TableCell>{employee.f_createdate}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(employee._id)}>
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(employee._id)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>

  );
};

export default EmployeeTable;
