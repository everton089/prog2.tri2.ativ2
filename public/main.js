const app = document.querySelector('#app')
const input = document.querySelector('#task-input')
const addButton = document.querySelector('#add-button')
const list = document.querySelector('#list')
const itemTemplate = document.querySelector('template')

async function loadTasks() {

  list.innerHTML = ''

  const response = await fetch('/items')

  const tasks = await response.json()

  tasks.forEach(task => {

    const element = createTaskElement(task)

    list.appendChild(element)
  })
}

function createTaskElement(task) {

  const clone =
    itemTemplate.content.cloneNode(true)

  clone.querySelector('.title').textContent =
    task.title

  clone
    .querySelector('.bt-delete')
    .addEventListener('click', async () => {

      await fetch(`/items/${task.id}`, {
        method: 'DELETE'
      })

      loadTasks()
    })

  return clone
}

async function createTask() {

  const title = input.value.trim()

  if (!title) return

  await fetch('/items', {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      title
    })
  })

  input.value = ''

  loadTasks()
}

addButton.addEventListener(
  'click',
  createTask
)

input.addEventListener(
  'keypress',
  (e) => {

    if (e.key === 'Enter') {
      createTask()
    }
  }
)

loadTasks()