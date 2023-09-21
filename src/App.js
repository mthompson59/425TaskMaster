import logo from './logo.svg';
import './App.css';
import './Header.js';
import './DashBoard.js';
import './MarkTask.js';
import './EditTask.js';
import './addTask.js';


import Header from './Header.js';
import AddTask from './addTask';
import EditTask from './EditTask.js';
import DashBoard from './DashBoard.js';
import MarkTask from './MarkTask.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        
      <Header/>
  
      <AddTask/>
      <EditTask/>
      <DashBoard/>
      <MarkTask/>
     
        
      </header>
    </div>
  );
}

export default App; 
