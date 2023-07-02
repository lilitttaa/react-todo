import './TodoItem.css';

export default function TodoItem({id,checked,label,deleteTodoItem,toggleChecked}:
    {id:number,checked:boolean,label:string,addTodoItem:(label:string)=>void,
        deleteTodoItem:(id:number)=>void,toggleChecked:(id:number)=>void}){
    return(
        <div className="todo__item">
            <input className="todo__item__check" type="checkbox" checked={checked} onChange={()=>{toggleChecked(id)}}></input>
            <button onClick={()=>{deleteTodoItem(id)}} className="todo__item__delete"></button>
            <p className="todo__item__label" style={checked?{textDecoration:'black line-through'}:{}}>{label} </p>  
        </div>
    );
}