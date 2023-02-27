const express = require('express')
const app = express()
app.use(express.json())
const mongoose= require ("mongoose")
require('dotenv').config()
require('./helpers/dbConnect')
const User = require('./models/User');





const Port = process.env.PORT || 5000
app.listen(Port, (err) => {
   err ? console.log(err) : console.log(`server running on ${Port}`)
} )


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log('Database connection error:', error);
  });

app.use(express.json());

// GET all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new user
app.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update user by ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE user by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});