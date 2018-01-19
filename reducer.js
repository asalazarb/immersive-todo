function reducer(bus, state) {

    bus.on('new-task', function(data) {
      state.tasks.push(data);
      bus.emit('update')
    })

    bus.on('add-to-done', function(id) {
      var doneTask = state.tasks.splice(id, 1)
      state.done.push(doneTask)
      bus.emit('update')
    })

    bus.on('delete-task', function(id) {
      state.done.splice(id, 1)
      bus.emit('update')
    })
  
  }
  export default reducer