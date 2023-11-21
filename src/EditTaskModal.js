// EditTaskModal.js
import React from 'react';
import './TaskFormModal.css';
import './App.css';

const EditTaskModal = ({ onClose, onSave, editedTask, onInputChange }) => {
  const formatTaskDate = (date) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <input type="text" name="name" placeholder="Task Name" value={editedTask.name} onChange={onInputChange} />
        <textarea
          className="task-description"
          name="description"
          placeholder="Task Description"
          value={editedTask.description}
          onChange={onInputChange}
        />
        <input type="date" name="date" value={formatTaskDate(editedTask.date)} onChange={onInputChange} />
        <button className="savechangesbutton" onClick={handleSave}>Save</button>
        <button className="closeeditbutton" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EditTaskModal;
