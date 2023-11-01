
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem'; // Import the TaskItem component
import './TaskList.css';

const TaskList = ({ tasks, editTask, deleteTask, toggleComplete }) => {
  const [fetchedTasks, setFetchedTasks] = useState(tasks); // Use a different variable name

  useEffect(() => {
    axios.get('/api/tasks')
      .then((response) => {
        setFetchedTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="task-list">
      <h2>Task List</h2>
      {fetchedTasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;