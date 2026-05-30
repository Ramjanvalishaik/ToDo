const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.classList.add('task');

  li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button class="complete-btn">✔️</button>
      <button class="delete-btn">🗑️</button>
    </div>
  `;

  taskList.appendChild(li);
  taskInput.value = '';

  li.querySelector('.complete-btn').addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.remove();
  });
});
