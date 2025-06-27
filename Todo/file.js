const input = document.getElementById('taskinput')
const addButton = document.getElementById('addButton')
const taskLists = document.getElementById('TaskList')

// addButton.addEventListener('click',addTask)

input.addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        addTask();
    }
})

function addTask(taskTextFromStorage = null) {
    const taskText = taskTextFromStorage || input.value.trim()

    if (taskText == "") {
        alert('please enter a task , it should not be empty')
        return;
    }

    const li = document.createElement('li')
    li.classList.add('task-item')


    // create a text task span which will be appen in li tag
    const textSpan = document.createElement('span')
    textSpan.textContent = taskText;
    li.appendChild(textSpan)

    // add button to mark as complete
    const CompleteButton = document.createElement('button')
    CompleteButton.textContent = '✅'
    CompleteButton.classList.add('complete-btn')
    CompleteButton.addEventListener('click', () => {
        textSpan.classList.toggle('completed')
    })
    li.appendChild(CompleteButton)

    // create delte button
    const deleteButton = document.createElement('button')
    deleteButton.textContent = '🗑️'
    deleteButton.classList.add('delete-btn')
    deleteButton.addEventListener('click', () => {
        li.remove()
        saveTasksToLocal();
    })
    li.appendChild(deleteButton)
    taskLists.appendChild(li)

    if (!taskTextFromStorage) {
        input.value = "";
        saveTasksToLocal();
    }
}


function saveTasksToLocal() {
    const allTasks = [];
    const storeTextTolocalDb = document.querySelectorAll('.task-item span');

    storeTextTolocalDb.forEach(span => {
        allTasks.push(span.textContent);
    });

    localStorage.setItem('tasks', JSON.stringify(allTasks));
}

function loadTasksFromLocal() {
    const stored = JSON.parse(localStorage.getItem('tasks')) || []

    stored.forEach(taskText => {
        addTask(taskText)
    })
}

window.addEventListener('DOMContentLoaded',loadTasksFromLocal)