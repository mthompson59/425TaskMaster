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
      .patch(`/api/tasks/${task.id}`, editedTask)
      .then((response) => {
        const updatedTask = response.data;
        editTask(task.id, updatedTask);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteClick = () => {
    axios
      .delete(`/api/tasks/${task.id}`)
      .then(() => {
        deleteTask(task.id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleToggleCompletionClick = () => {
    axios
      .patch(`/api/tasks/${task.id}`, { completed: !task.completed })
      .then((response) => {
        const updatedTask = response.data;
        editTask(task.id, updatedTask);
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
        <p>Due Date: {task.dueDate}</p>
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
            <input
              type="date"
              value={editedTask.dueDate}
              onChange={(e) =>
                setEditedTask({ ...editedTask, dueDate: e.target.value })
              }
            />
            <button onClick={handleSaveClick}>Save</button>
          </div>
        ) : (
          <div>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
            <button onClick={handleToggleCompletionClick}>
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
