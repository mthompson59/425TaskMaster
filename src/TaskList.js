import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, editTask, deleteTask, toggleComplete }) => {
  return (
    <div className="task-list">
      <h2>Task List</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete} // Pass down the toggleComplete function
        />
      ))}
    </div>
  );
};

export default TaskList;
