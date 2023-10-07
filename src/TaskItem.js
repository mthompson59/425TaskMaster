import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, editTask, deleteTask, toggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    editTask(task.id, editedTask);
    setIsEditing(false);
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
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => toggleComplete(task.id)}>
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
