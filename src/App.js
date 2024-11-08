import React, { useState,useEffect } from 'react';
import './Todo.css';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(()=>{
    if(tasks.length>0){
    console.log(`${tasks[tasks.length - 1].text} is added (component mounted)`);
    }
  },
   [tasks]);
   useEffect(()=>{
    if(editingIndex!=null){
     console.log(`${tasks[editingIndex].text} is edited (component mounted)`);
    }
  },
   [tasks,editingIndex]);
   useEffect(() => {
  console.log(` ${tasks.text}Task has been deleted (Component Unmounted)`);
  }, [tasks]);
  const handleAddTask = () => {
    if (inputValue.trim()) {
      const newTask = {
        text: inputValue,
        completed: false,
        pending:false
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };
  

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingValue(tasks[index].text);
  };

  const handleUpdate = () => {
    if (editingValue.trim()) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex].text = editingValue;
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditingValue('');
    }
  };
  

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };
  

  const handleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };
  const handlePending = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].pending = !updatedTasks[index].pending;
    
  
    if (updatedTasks[index].pending) {
      updatedTasks[index].completed = false;
    }
    
    setTasks(updatedTasks);
  };

  return (
    <div className='container'>
      <div className='card-container'>
        <h1>To-Do List</h1>
        <input 
          type="text" 
          className='c-2'
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder='Enter Task' 
        />
        <button className='btn-add' onClick={handleAddTask}>
         Add
        </button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              {editingIndex === index ? (
                <>
                  <input 
                    type="text" 
                    className='map-input'
                    value={editingValue} 
                    onChange={(e) => setEditingValue(e.target.value)} 
                  />
                  <button className='update' onClick={handleUpdate}>Update</button>
                  <button  className='Cancel' onClick={() => setEditingIndex(null)}>Cancel</button>
                </>
              ) : (
                <>
                <span>{task.text}</span>
                <span className='span-pending'>
                     {task.pending && <strong>(Pending)</strong>} 
                  </span>
                <div className='button-group'>
                  <button className='edit'  onClick={() => handleEdit(index)}>
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button  className='delete' onClick={() => handleDelete(index)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button  onClick={() => handleComplete(index)} className="complete-btn">
                    <i className="fa fa-check-circle"></i>
                  </button>
                  <button  onClick={() => handlePending(index)} className="btn-panding">
                  <i class="fa fa-clock-o" aria-hidden="true"></i>
                  </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
