// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/employeeDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Employee Schema
const employeeSchema = new mongoose.Schema({
  f_id: String,
  f_image: String,
  f_name: String,
  f_email: String,
  f_mobile: String,
  f_designation: String,
  f_gender: String,
  f_course: String,
  f_createdate: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

// Routes
// Get all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Get employee by ID
app.get('/api/employees/:id', async (req, res) => {
  const { _id } = req.params;
  // console.log()
  try {
    const employee = await Employee.findById(_id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Create a new employee
app.post('/api/employees', async (req, res) => {
  const { f_id, f_image, f_name, f_email, f_mobile, f_designation, f_gender, f_course, f_createdate } = req.body;

  try {
    const newEmployee = new Employee({ f_id, f_image, f_name, f_email, f_mobile, f_designation, f_gender, f_course, f_createdate });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: 'Error creating employee' });
  }
});

// Edit an employee
app.put('/api/employees/:id', async (req, res) => {
  const { _id } = req.params;

  const { f_image, f_name, f_email, f_mobile, f_designation, f_gender, f_course, f_createdate } = req.body;
console.log(req.body)
  try {
    const employee = await Employee.findById(_id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    employee.f_image = f_image || employee.f_image;
    employee.f_name = f_name || employee.f_name;
    employee.f_email = f_email || employee.f_email;
    employee.f_mobile = f_mobile || employee.f_mobile;
    employee.f_designation = f_designation || employee.f_designation;
    employee.f_gender = f_gender || employee.f_gender;
    employee.f_course = f_course || employee.f_course;
    employee.f_createdate = f_createdate || employee.f_createdate;

    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: 'Error updating employee' });
  }
});

// Delete an employee by ID
// app.delete('/api/employees/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const employee = await Employee.findById(id);
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     await employee.remove();
//     res.json({ message: 'Employee deleted' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// Delete Employee
app.delete('/api/employees', async (req, res) => {
  console.log(req.f_id,'<-------------*****')
  try {
    let employee = await Employee.findById(req.query.id);
    console.log(employee)

    if (employee && employee.f_id) {
      await Employee.findByIdAndDelete(req.query.id)
      return res.send('Employee removed');
    }
    else {
      return res.status(404).json({ msg: 'Employee not found' });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// app.delete('/api/employees/:id', async (req, res) => {
//   const { id } = req.params;
// console.log(req.params,'<*********************************')
//   try {
//     const employee = await Employee.findByIdAndRemove(id);
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     res.json({ message: 'Employee deleted' });
//   } catch (error) {
//     console.error('Error deleting employee:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


