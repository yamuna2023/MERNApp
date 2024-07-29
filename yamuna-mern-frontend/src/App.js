import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee';
import EmployeeTable from './components/EmployeeTable';
import Login from './components/Login';
import Welcomedashboard from './components/dashboardscreens/welcomedashboard';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Welcomedashboard />} />
          <Route exact path="/employeetable" element={<EmployeeTable />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          <Route exact path="/create-employee" element={<CreateEmployee />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
