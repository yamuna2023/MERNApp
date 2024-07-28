import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Employee from './components/EmployeeTable';
import DataTable from './components/dashboardscreens/table';
import EmployeeTable from './components/EmployeeTable';
import EditEmployee from './components/EditEmployee';
import Welcomedashboard from './components/dashboardscreens/welcomedashboard';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Welcomedashboard />}  />
          <Route exact path="/employeetable" element={<EmployeeTable />}  />
          <Route path="/edit-employee/:id" element={<EditEmployee />}  />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
