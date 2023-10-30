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
    axios
      .patch(`/api/tasks/${task._id}`, editedTask)
      .then((response) => {
        const updatedTask = response.data;
        editTask(task._id, updatedTask);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteClick = () => {
    console.log('Task ID to delete:', task._id); // Log the task ID
    const deleteUrl = `/api/tasks/${task._id}`;
  console.log('Delete URL:', deleteUrl); // Log the URL
    axios
      .delete(`/api/tasks/${task._id}`)
      .then(() => {
        console.log('Deleting task with ID:', task._id);
        deleteTask(task._id);
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
            <button onClick={() => handleDeleteClick(task._id)}>Delete</button>
            <button onClick={() => handleEditClick(task._id)}>Edit</button>
          
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;