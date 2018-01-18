var yo = require('yo-yo')
 
var tasks = [] // start empty 
var el = list(tasks, update, deleteTask)
var taskInput = 'taskInput'

function deleteTask(ev){
    var id = ev.target.parentNode.id
    tasks.splice(id, 1)
    ev.target.parentNode.remove()
    console.log(tasks)
}
 
function list (items, onclick, deleteTask) {
  return yo`<div>
    <div><h1>ToDo</h1></div>
    <input type="text" id=${'taskInput'}>
    <button onclick=${onclick}>Add Task</button>
    <ul>
      ${items.map(function (item, index) {
        return yo`<li id=${index}>${item}<button onclick=${deleteTask}>Delete</button></li>`
      })}
    </ul>
    
  </div>`
}
 
function update () {
  // add a new random number to our list 
  tasks.push(document.getElementById('taskInput').value)
  //console.log(document.getElementById('taskInput').value)
  // construct a new list and efficiently diff+morph it into the one in the DOM 
  var newList = list(tasks, update, deleteTask)
  yo.update(el, newList)
  
}


 
document.body.appendChild(el)