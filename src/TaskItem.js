import React, { useState } from 'react';
import './TaskItem.css';
import axios from 'axios'; // Import Axios

const TaskItem = ({ task, editTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEditClick = () => {
    setIsEditing(true);
  };

const handleSaveClick = () => {
  // Create a new object based on the server's requirements
  const updatedData = {
    // Include only the fields that need to be updated
    title: editedTask.title,
    description: editedTask.description,
    // Add any other required fields
  };

  axios
    .patch(`/api/tasks/${task._id}`, updatedData)
    .then((response) => {
     

      setIsEditing(false);
    })
    .catch((error) => {
      if (error.response) {
        console.error('Server Error Data:', error.response.data);
        console.error('Server Error Status:', error.response.status);
        console.error('Server Error Headers:', error.response.headers);
      } else {
        console.error('Error Message:', error.message);
      }
    });
};


  const handleDeleteClick = () => {
    axios
      .delete(`/api/tasks/${task._id}`)
      .then(() => {
        console.log('Deleting task with ID:', task._id);
        //deleteTask(task._id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleToggleCompletionClick = () => {
    axios
      .patch(`/api/tasks/${task._id}`, { completed: !task.completed })
      .then((response) => {
        const updatedTask = response.data;
        editTask(task._id, updatedTask);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-details">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="task-actions">
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
            />
            <input
              type="text"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
            />
            <button onClick={handleSaveClick}>Save</button>
          </div>
        ) : (
          <div>
            <button onClick={handleDeleteClick}>Delete</button>
            <button onClick={handleEditClick}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
