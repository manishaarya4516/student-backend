const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://student:student@cluster0.otd3q8u.mongodb.net/student', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define Student schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  standard: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  totalMarks: { type: Number, required: true },
});

const Student = mongoose.model('Student', studentSchema);

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
