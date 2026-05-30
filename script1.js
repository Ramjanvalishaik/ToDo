'use strict';

// --- DOM ---
const taskInput         = document.getElementById('task-input');
const addBtn            = document.getElementById('add-btn');
const tasksList         = document.getElementById('tasks-list');
const emptyState        = document.getElementById('empty-state');
const footerText        = document.getElementById('footer-text');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const toastEl           = document.getElementById('toast');
const filterBtns        = document.querySelectorAll('.tab');
const dateLabel         = document.getElementById('date-label');
const statAll           = document.getElementById('stat-all');
const statActive        = document.getElementById('stat-active');
const statDone          = document.getElementById('stat-done');

// --- Date ---
dateLabel.textContent = new Date().toLocaleDateString('en-US', {
  weekday: 'long', month: 'short', day: 'numeric'
});

// --- State ---
let tasks  = JSON.parse(localStorage.getItem('taskflow-tasks') || '[]');
let filter = 'all';
let toastTimer = null;

const uid = () => `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

function save() {
  localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
}

// --- Toast ---
function showToast(msg) {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2000);
}

// --- Escape HTML ---
function esc(str) {
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// --- Render ---
function render() {
  tasksList.innerHTML = '';

  const visible = tasks.filter(t => {
    if (filter === 'active')    return !t.completed;
    if (filter === 'completed') return  t.completed;
    return true;
  });

  emptyState.style.display = visible.length === 0 ? 'flex' : 'none';

  visible.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item${task.completed ? ' completed' : ''}`;
    li.dataset.id = task.id;

    li.innerHTML = `
      <button class="task-check${task.completed ? ' checked' : ''}" aria-label="Toggle complete" aria-pressed="${task.completed}">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </button>
      <span class="task-text">${esc(task.text)}</span>
      <button class="task-delete" aria-label="Delete task">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
          <path d="M10 11v6M14 11v6"/>
          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
        </svg>
      </button>
    `;

    li.querySelector('.task-check').addEventListener('click', () => toggle(task.id));
    li.querySelector('.task-delete').addEventListener('click', () => remove(task.id, li));

    tasksList.appendChild(li);
  });

  updateFooter();
}

function updateFooter() {
  const total  = tasks.length;
  const done   = tasks.filter(t =>  t.completed).length;
  const active = total - done;

  // Stats bar
  statAll.textContent    = total;
  statActive.textContent = active;
  statDone.textContent   = done;

  // Footer
  footerText.textContent = total === 0
    ? ''
    : `${active} task${active !== 1 ? 's' : ''} left`;

  clearCompletedBtn.style.display = done > 0 ? 'inline' : 'none';
}

// --- Actions ---
function addTask() {
  const text = taskInput.value.trim();
  if (!text) {
    taskInput.style.animation = 'none';
    requestAnimationFrame(() => { taskInput.style.animation = 'shake 0.3s ease'; });
    taskInput.focus();
    return;
  }
  tasks.unshift({ id: uid(), text, completed: false });
  save();
  taskInput.value = '';
  taskInput.focus();
  render();
  showToast('Task added');
}

function toggle(id) {
  const t = tasks.find(t => t.id === id);
  if (!t) return;
  t.completed = !t.completed;
  save();
  render();
}

function remove(id, li) {
  li.classList.add('removing');
  li.addEventListener('animationend', () => {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
  }, { once: true });
  showToast('Task removed');
}

function clearCompleted() {
  const count = tasks.filter(t => t.completed).length;
  tasks = tasks.filter(t => !t.completed);
  save();
  render();
  if (count) showToast(`Cleared ${count} task${count > 1 ? 's' : ''}`);
}

// --- Filter ---
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    filter = btn.dataset.filter;
    render();
  });
});

// --- Events ---
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });
clearCompletedBtn.addEventListener('click', clearCompleted);

// --- Init ---
render();
