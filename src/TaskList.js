   // TaskList.js

   import React from 'react';

 

   const TaskList = ({ tasks, onTaskClick }) => (

     <ul>

       {tasks.map((task) => (

         <li key={task.id} onClick={() => onTaskClick(task.id)}>

           {task.title} - {task.completed ? 'Completed' : 'Pending'}

         </li>

       ))}

     </ul>

   );

 