import React from 'react';
import './TaskFormModal.css';

const EditTaskModal = ({ onClose, onSave, editedTask, onInputChange }) => {
  // Define the formatTaskDate function to format the task date
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
        {/* Form fields for editing an existing task */}
        <input type="text" name="name" placeholder="Task Name" value={editedTask.name} onChange={onInputChange} />
        <textarea
          className="task-description"
          name="description"
          placeholder="Task Description"
          value={editedTask.description}
          onChange={onInputChange}
        />
        <input type="date" name="date" value={formatTaskDate(editedTask.date)} onChange={onInputChange} />
        {/* Add more form fields as needed */}
        <button onClick={handleSave}>Save Changes</button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EditTaskModal;
