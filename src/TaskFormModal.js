// TaskFormModal.js
import React from 'react';
import './TaskFormModal.css';

const TaskFormModal = ({ onClose, onSave, newTask, onInputChange }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <input type="text" name="name" placeholder="Task Name" value={newTask.name} onChange={onInputChange} />
        <textarea
          className="task-description"
          name="description"
          placeholder="Task Description"
          value={newTask.description}
          onChange={onInputChange}
        />
        <input type="date" name="date" value={newTask.date} onChange={onInputChange} />
        <button onClick={onSave}>Save</button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskFormModal;
