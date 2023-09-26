
   // TaskForm.js

   import React, { useState } from 'react';

 

   const TaskForm = ({ onTaskAdd }) => {

     const [title, setTitle] = useState('');

     const [description, setDescription] = useState('');

     const [dueDate, setDueDate] = useState('');

 

     const handleAddTask = () => {

       // Validate and add task

       if (title && description && dueDate) {

         onTaskAdd({ title, description, dueDate });

         setTitle('');

         setDescription('');

         setDueDate('');

       }

     };

 

     return (

       <div>

         <input

           type="text"

           placeholder="Title"

           value={title}

           onChange={(e) => setTitle(e.target.value)}

         />

         <input

           type="text"

           placeholder="Description"

           value={description}

           onChange={(e) => setDescription(e.target.value)}

         />

         <input

           type="date"

           placeholder="Due Date"

           value={dueDate}

           onChange={(e) => setDueDate(e.target.value)}

         />

         <button onClick={handleAddTask}>Add Task</button>

       </div>

     );

   };

 

   export default TaskForm;