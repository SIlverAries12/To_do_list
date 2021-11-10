//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')


// Event listners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions

function addTodo(e){
    //prevent form from submitting
    e.preventDefault();
    // generate div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create list entry
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // add entry to storage
    saveLocalTodos(todoInput.value);
    // done button
    const completedbutton = document.createElement('button');
    completedbutton.innerHTML = '<i class = "fas fa-check"></i>';
    completedbutton.classList.add("complete-btn");
    todoDiv.appendChild(completedbutton);
    // delete button
    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    todoDiv.appendChild(trashbutton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    if (item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function(){
            removeLocalTodos(todo);
            todo.remove();
        });
    }

    if (item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        filterTodo();
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(filterOption.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')){
                   todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none'
                }
                break;
            case 'incompleted':
                if (!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                 }else{
                     todo.style.display = 'none'
                 }
                 break;
        }
    });
}

function saveLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos(){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
    //Create list entry
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    // done button
        const completedbutton = document.createElement('button');
        completedbutton.innerHTML = '<i class = "fas fa-check"></i>';
        completedbutton.classList.add("complete-btn");
        todoDiv.appendChild(completedbutton);
    // delete button
        const trashbutton = document.createElement('button');
        trashbutton.innerHTML = '<i class = "fas fa-trash"></i>';
        trashbutton.classList.add("trash-btn");
        todoDiv.appendChild(trashbutton);

        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}