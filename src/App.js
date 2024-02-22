import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa'; // Import icons
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [initialLoad, setInitialLoad] = useState(false);

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

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <div className="App">
      <h1>React Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyPress={handleKeyPress} 
        />
        <button onClick={addTask}>
          <FaPlus /> {/* Add icon */}
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>
              <FaTrash /> {/* Delete icon */}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={clearCompleted}>
        <FaCheck /> Clear Completed {/* Check icon */}
      </button>
    </div>
  );
};

export default App;
