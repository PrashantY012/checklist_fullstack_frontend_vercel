import React from 'react'

function TodoItem({title,description,isCompleted,updateHandler,deleteHandler,id}) {
  return (
    <div className='todo'>
    <div>
<h4>{title}</h4>
<p4>{description}</p4>
    </div>
    <div>
    <input type='checkbox' checked={isCompleted} onChange={()=>updateHandler(id)}></input>
    <button className='btn' onClick={()=>deleteHandler(id)}>Delete</button>
    </div>

    </div>
  )
}

export default TodoItem