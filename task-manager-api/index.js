const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001; // You can choose a different port

app.use(bodyParser.json());

// Sample data to simulate a database
let tasks = [
  { id: 1, name: 'Task 1', description: 'Description 1', date: '2023-11-02' },
  { id: 2, name: 'Task 2', description: 'Description 2', date: '2023-11-03' },
];

// Define your endpoints

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Create a new task
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task by ID
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  tasks = tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task));
  res.json(updatedTask);
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
