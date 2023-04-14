import React from 'react'

import './index.css';
import './App.css';
import { useEffect, useState } from 'react';
import {useParams, Link} from "react-router-dom";


function TodoList() {

  const {id} = useParams();
  const [items, setItems] = useState([]);

  useEffect(() =>
  {
    getItems();
  },[]);

  async function getItems()
  {
    try
    {
      const res = await fetch(`http://localhost:3001/api/todos/${id}`);
      const data = await res.json();

      setItems(data);
      console.log(data);
    }
    catch (err)
    {
      console.error(err);
    }
  }

  const Header = () =>
  {
    return (
            <h1>List name: {items.title}</h1>
        )
  }

  const Return = () =>
  {
    return (
            <h5>
                <Link to = {"../.."}>
                        <button >Return to Lists</button>
                    </Link>
                </h5>
        )
  }

  const TableHeader = () =>
  {
    return (
        <thead>
            <tr>
                <th>Completed</th>
                <th>Task</th>
            </tr>
        </thead>
    )
  }

  const removeCharacter = (taskid) => {
    fetch(`http://localhost:3001/api/todos/${id}/items/${taskid}`,
    {
      method: 'DELETE',
    });
    window.location.reload(false);
  }

  const updateTask = (taskid, taskcomplete) => {

    fetch(`http://localhost:3001/api/todos/${id}/items/${taskid}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'complete': !taskcomplete
      })
    });
    window.location.reload(false);
  }

  const TableBody = () =>
  {
    const tasks = items.todoItems;

    if(!tasks)
    {
        return;
    }

    return(
        <tbody>
            {tasks.map((task, index) => (
                <tr key={task.id}>
                    <td width="1px" style={{
                        textAlign:"center"
                      }}>
                        {task.complete ? <>&#x2705;</> : <>&#10060;</>}
                        </td>
                    <td style={{
                        fontSize:"25px"
                    }}>{task.content}</td>
                    <td width="1px" >
                        <button onClick={() => updateTask(task.id, task.complete)}>
                            {task.complete ? <>Mark as Incomplete</> : <>Mark as Complete</>}</button>
                    </td>
                    <td width="1px">
                        <button onClick={() => removeCharacter(task.id)}>Delete</button>
                    </td> 
                </tr>
            ))}
        </tbody>
    )
  }

  return (
    <div className="App">
        <Header />
        <Return />
        <CreatePostForm />
        <table>
            <TableHeader />
            <TableBody />
        </table>
    </div>
  );
}

export default TodoList;

function CreatePostForm()
{
  
  const {id} = useParams();
  const [content, setTitle] = useState('');

  function handleSubmit(e)
  {

    fetch(`http://localhost:3001/api/todos/${id}/items`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'content': content
      })
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{
        paddingLeft: 250,
        paddingRight: 250,
    }}>
      <input 
        type="text" 
        name="content"
        value={content}
        onChange={(e) => setTitle(e.target.value)}
        />
        <button>Submit</button>
    </form>
  )
}