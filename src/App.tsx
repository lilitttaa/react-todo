import React, { useEffect, useState } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';

interface ITodoItemData{
  checked:boolean;
  label:string;
  id:number;
}

interface ITodoData{
  list:ITodoItemData[];
}

let nextId = 0;

const initData:ITodoData = {
  list:[]
}
const localData = localStorage.getItem('data');
if(localData){
  initData.list = JSON.parse(localData).list;
}

function App() {
  const [data,setData] = useState(initData);
  const [inputValue,setInputValue] = useState('');

  useEffect(()=>{
    localStorage.setItem('data',JSON.stringify(data));
  },[data]);


  const toggleChecked = (id:number)=>{
    const newData = {...data};
    newData.list = newData.list.map((item)=>{
      if(item.id === id){
        item.checked = !item.checked;
      }
      return item;
    }
    )
    setData(newData);
  }
  const addTodoItem = (label:string)=>{
    const newData = {...data};
    newData.list.push({
      id:nextId++,
      checked:false,
      label:label
    });
    setData(newData);
  }

  const deleteTodoItem = (id:number)=>{
    const newData = {...data};
    newData.list = newData.list.filter((item)=>{
      return item.id !== id;
    })
    setData(newData);
  }

  return (
    <div className="todo__app">
      <div className="todo__container">
        <div className="todo__header">
          <h1 className="todo__title">
            TODO
          </h1>
          <h2 className="todo__description">
            THIS IS A TODO APP.
          </h2>
        </div>
        <div className="todo__input__container">
          <input type='text' className="todo__input" value={inputValue}
           onChange={(e)=>setInputValue(e.target.value)}></input>
          <button className="todo__button" onClick={()=>{addTodoItem(inputValue);setInputValue('')}}>ADD</button>
        </div>
        <div className="todo__list">
          {data.list.map((item,index)=>{
            return <TodoItem checked={item.checked} label={item.label} key={item.id} id={item.id}
            toggleChecked={toggleChecked} addTodoItem={addTodoItem} deleteTodoItem={deleteTodoItem}/>
          })}
        </div>
      </div>
  </div>
  );
}

export default App;
  