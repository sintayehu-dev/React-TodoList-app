import React, { useState, useEffect } from 'react';
import { FaTrash, FaCheck, FaDownload, FaEdit } from 'react-icons/fa'; // Import icons
import Logo from "./assets/p-pc.jpg";
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [initialLoad, setInitialLoad] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  useEffect(() => {
    // Load tasks from local storage on component mount
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
    setInitialLoad(true);
  }, []);

  useEffect(() => {
    // Save tasks to local storage whenever tasks state changes
    if (initialLoad) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, initialLoad]);

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const handleKeyPress = (e) => {
    // Add task when Enter key is pressed
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId, text) => {
    setEditingTaskId(taskId);
    setEditedTaskText(text);
  };

  const saveEditedTask = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, text: editedTaskText } : task)));
    setEditingTaskId(null);
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <div className="App">
      <div className="logo-container">
        <div className="logo">
          {/* Your image goes here */}
          <img src={Logo} alt="Logo" /> 
          <p>sintayehu-dev Todo List</p>
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyPress={handleKeyPress} 
        />
        <button onClick={addTask}>
          <FaDownload /> {/* Add icon */}
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input className='checkbox'
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTaskText}
                  onChange={(e) => setEditedTaskText(e.target.value)}
                />
                <button className='edit' onClick={() => saveEditedTask(task.id)}>
                  <FaDownload /> {/* Save icon */}
                </button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <button className='edit' onClick={() => editTask(task.id, task.text)}>
                  <FaEdit /> {/* Edit icon */}
                </button>
                <button className='delete' onClick={() => deleteTask(task.id)}>
                  <FaTrash /> {/* Delete icon */}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button className='clear-completed' onClick={clearCompleted}>
        <FaCheck /> Clear Completed {/* Check icon */}
      </button>
    </div>
  );
};

export default App;
