// define UI variables
  const form = document.querySelector('#task-form');
  const taskList = document.querySelector('.collection');
  const clearBtn = document.querySelector('.clear-tasks');
  const filter = document.querySelector('#filter');
  const taskInput = document.querySelector('#task');
  taskInput.setAttribute('autocomplete', 'off')

// Load all event Listeners
loadEventListeners()

// Load all event Listeners
function loadEventListeners(){
  // DOM Load Event
  document.addEventListener('DOMContentLoaded',getTasks)
  // Add Task Event
  form.addEventListener('submit', addTask)
  // Remove Task Event
  taskList.addEventListener('click', removeTask)
  // Clear Tasks Event
  clearBtn.addEventListener('click', clearTasks)
  // Filter Task Event
  filter.addEventListener('keyup', filterTasks)
}

// Get Tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = []
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
    // create li element
    const li = document.createElement('li')
    // add class
    li.className = 'collection-item'
    // create text node and append
    li.appendChild(document.createTextNode(task))
    // create a new link element
    const link = document.createElement('a')
    // add class to link
    link.className = 'delete-item secondary-content'
    // add icon html
    link.innerHTML = '<i class= "fa fa-remove"></i>'
    // append link child to li
    li.appendChild(link)
    // append li to ul
    taskList.appendChild(li)
  })

  
}

// Add task
function addTask(e){
  function keyPress(e){
    if(e.keyCode === 32){
      return false;
    }
  }
  if(taskInput.value === '' || keyPress){
    alert('Add a task');
  }else{
    // we want to create a lst item when add tsk is clicked

    // create li element
    const li = document.createElement('li')
    // add class
    li.className = 'collection-item'
    // create text node and append
    li.appendChild(document.createTextNode(taskInput.value))
    // create a new link element
    const link = document.createElement('a')
    // add class to link
    link.className = 'delete-item secondary-content'
    // add icon html
    link.innerHTML = '<i class= "fa fa-remove"></i>'
    // append link child to li
    li.appendChild(link)
    // append li to ul
    taskList.appendChild(li)

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value)


    // clear the input
    taskInput.value = ''
  }
    
    // log the value
    // console.log(`task added: ${li.textContent}`)
  
  e.preventDefault();
}

// Store Tasks in Local Storage
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = []
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  // push on to that variable
  tasks.push(task)
  // set it back to LS
  localStorage.setItem('tasks', JSON.stringify(tasks))
}



// since adding tasks is dynamic we need to use event deligation event listner must be added on parent i.e ul in this case

// Remove Task
  function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
      if(confirm('Are you sure?')){
        // Remove from DOM
        e.target.parentElement.parentElement.remove()
        // Remove from Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement)
      }
    }
  }

// Remove From Local Storage
  function removeTaskFromLocalStorage(taskItem){
    console.log(taskItem)
    // Check Local Storage
    let tasks;
    if(localStorage.getItem('tasks')===null){
      tasks = []
    }else{
      tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task,index){
      if(taskItem.textContent === task){
        tasks.splice(index,1)
      }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks))

  }

// Clear All Tasks
  function clearTasks(){
    // one way
    // taskList.innerHTML = ''

    // Faster Methond
    //  while there is still a first child in ul remove the first child
    // firstChild is gonna get the first child of the taskList if there is still something in the list
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild)
    }

    // Clear Tasks From LS
    clearTasksFromLocalStorage();
  }

  // CLEAR TASKS FROM LS
  function clearTasksFromLocalStorage(){
    localStorage.clear()
  }

// Filter Tasks
  function filterTasks(e){
    // get what ever is typed in the input
    const text = e.target.value.toLowerCase()

    // take all of the list items
    document.querySelectorAll('.collection-item').forEach(function(task){
      // will get the text content of out input
      const item = task.firstChild.textContent  
      /* we check if the text exist inside the string if there is no match it is gonna return -1 */
      if(item.toLowerCase().indexOf(text) != -1){
        // if match--> show
        task.style.display = 'block'
      }else{
        // no match--> hide
        task.style.display = 'none'
      }
    })
  }