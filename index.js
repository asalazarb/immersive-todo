var yo = require('yo-yo')
// import external modules
import html from 'yo-yo'
import EventEmitter from 'events'
import reducer from './reducer'

const state = {
    tasks : [], // start empty 
    done : []
}
 
const bus = new EventEmitter
bus.on('update', updateMarkup)
reducer(bus, state)


var el = list(state.tasks, state.done, addTask)


function addTask () {
    // add a new random number to our list 
    bus.emit('new-task', document.getElementById('taskInput').value)
    // construct a new list and efficiently diff+morph it into the one in the DOM 
    
    
  }

function addToDone(ev){
    bus.emit('add-to-done', ev.target.parentNode.id)
   // ev.target.parentNode.remove()
    
}


function deleteTask(ev){
    bus.emit('delete-task', ev.target.parentNode.id)
    console.log(state.done)
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

 

function updateMarkup(){
    var newList = list(state.tasks, state.done, addTask)
    document.getElementById('taskInput').value = ""
    yo.update(el, newList)
}

 
document.body.appendChild(el)