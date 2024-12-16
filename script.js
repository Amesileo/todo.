const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const colorSelector = document.getElementById('colorSelector');

// Load items from localStorage
const loadTodos = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToDOM(todo.text, todo.color, todo.completed));
};

// Save items to localStorage
const saveTodos = () => {
    const todos = Array.from(todoList.children).map(item => ({
        text: item.querySelector('.todo-text').textContent,
        color: item.dataset.color,
        completed: item.classList.contains('completed')
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Add a todo to the DOM
const addTodoToDOM = (text, color, completed = false) => {
    const li = document.createElement('li');
    li.className = `todo-item ${completed ? 'completed' : ''}`;
    li.dataset.color = color;

    const colorTab = document.createElement('div');
    colorTab.className = 'color-tab';
    colorTab.addEventListener('click', () => {
        const newColor = prompt("Enter color (grey, red, green, blue, yellow, purple, pink, orange):", color);
        if (["grey", "red", "green", "blue", "yellow", "purple", "pink", "orange"].includes(newColor)) {
            li.dataset.color = newColor;
            saveTodos();
        }
    });

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;

    const toggleButton = document.createElement('button');
    toggleButton.className = completed ? 'undo' : 'toggle';
    toggleButton.textContent = completed ? 'x' : '✓';
    toggleButton.addEventListener('click', () => {
        li.classList.toggle('completed');
        toggleButton.className = li.classList.contains('completed') ? 'undo' : 'toggle';
        toggleButton.textContent = li.classList.contains('completed') ? 'x' : '✓';
        saveTodos();
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = 'delete';
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTodos();
    });

    li.appendChild(colorTab);
    li.appendChild(span);
    li.appendChild(toggleButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
};

// Form submission handler
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (todoInput.value.length > 40) {
        alert(`
            Woah! That's way too much! 
            Smaller tasks are much more manageable. 
            
            Break it down 😊`);
        return;
    }
    const text = todoInput.value.trim();
    const color = colorSelector.value;
    if (text) {
        addTodoToDOM(text, color || 'grey');
        saveTodos();
        todoInput.value = '';
        colorSelector.value = '';
    }
    remainingChars();
});

//Needs fixing
function remainingChars() {

    let charCount = document.getElementById("todoInput").value.length;
    document.getElementById("todoInput").value.length=(40 - charCount);
    
    document.getElementById("charCount").innerText = (40 - charCount);

    if (charCount > 40) {
        document.getElementById("todoInput").style.color="red";
        document.getElementById("todoInput").value.length="-" + (charCount - 20);
        document.getElementById("charCount").style.color="red";
    } else {
        document.getElementById("todoInput").style.color="";
        document.getElementById("charCount").style.color="";
    }
}


// Load existing todos on page load
loadTodos();
