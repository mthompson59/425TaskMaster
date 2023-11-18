// Task.js
import React, { useState } from 'react';
import EditTaskModal from './EditTaskModal';

const Task = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const handleCheckboxChange = () => {
    setEditedTask({ ...editedTask, completed: !editedTask.completed });
    onEdit({ ...editedTask, completed: !editedTask.completed });
  };

  return (
    <div className="task-container">
      {isEditing ? (
        <EditTaskModal
          onClose={() => setIsEditing(false)}
          onSave={handleEdit}
          editedTask={editedTask}
          onInputChange={(e) => setEditedTask({ ...editedTask, [e.target.name]: e.target.value })}
        />
      ) : (
        <div className="task">
          <div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleCheckboxChange}
            />
            <span>{task.completed ? 'Completed' : 'Incomplete'}</span>
          </div>
          <span className="task-name"><strong>Task Name:</strong> {task.name}</span>
          <span className="task-description"><strong>Description:</strong> {task.description}</span>
          <span><strong>Date:</strong> {new Date(task.date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(task)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Task;
