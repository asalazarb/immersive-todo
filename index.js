var yo = require('yo-yo')
 
var tasks = [] // start empty 
var done = []
var el = list(tasks, done, update)
var taskInput = 'taskInput'



function addToDone(ev){
    var id = ev.target.parentNode.id
    var doneTask = tasks.splice(id, 1)
    done.push(doneTask)
    ev.target.parentNode.remove()
    updateMarkup()
}


function deleteTask(ev){
    var id = ev.target.parentNode.id
    done.splice(id, 1)
    ev.target.parentNode.remove()
}


function makeList(items, onclick, flagButton){
    var checkbox = yo`<input onclick=${onclick} type="checkbox">`
    var button = yo`<button onclick=${onclick}>Delete</button>`
    var element = checkbox;
    if(flagButton){
        element = button;
    }
    return yo`<ul>
                ${items.map(function (item, index) {
                return yo`<li id=${index}>${item}${element}</li>`
                })}
              </ul>`
}
 
function list (tasks, done, onclick) {
  return yo`<div>
    <div><h1>ToDo</h1></div>
    <input type="text" id=${'taskInput'}>
    <button onclick=${onclick}>Add Task</button>
    ${makeList(tasks, addToDone, false)}
    <div><h1>Done</h1></div>
    ${makeList(done, deleteTask, true)}
    
  </div>`
}

 
function update () {
  // add a new random number to our list 
  tasks.push(document.getElementById('taskInput').value)
  document.getElementById('taskInput').value = ""
  // construct a new list and efficiently diff+morph it into the one in the DOM 
  updateMarkup()
  
}

function updateMarkup(){
    var newList = list(tasks, done, update)
    yo.update(el, newList)
}

 
document.body.appendChild(el)