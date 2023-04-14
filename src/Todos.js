import React from 'react'

import './index.css';
import './App.css';
import { useEffect, useState } from 'react';
import ListsTable from './ListsTable'


function Todos() {

  const [lists, setLists] = useState([]);

  useEffect(() =>
  {
    getLists();
  }, []);

  async function getLists()
  {
    try
    {
      const res = await fetch('http://localhost:3001/api/todos');
      const data = await res.json();

      setLists(data);
    }
    catch (err)
    {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <h1>Welcome to the TodoList React App!</h1>
      <CreatePostForm />
      <ListsTable characterData={lists}/>
    </div>
  );
}

export default Todos;

function CreatePostForm()
{
  const [title, setTitle] = useState('');

  function handleSubmit(e)
  {

    fetch('http://localhost:3001/api/todos',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'title': title
      })
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <button>Submit</button>
    </form>
  )
}