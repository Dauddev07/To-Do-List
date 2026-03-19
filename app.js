const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");
const stats = document.getElementById("stats");
const filterButtons = document.querySelectorAll(".filters button");
const themeToggle = document.getElementById("themeToggle");

// MODAL
const modal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const saveEdit = document.getElementById("saveEdit");
const cancelEdit = document.getElementById("cancelEdit");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";
let currentEditId = null;

// unique id generator
function createId() {
  return Date.now() + Math.random();
}

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";

  const remainingCount = todos.filter((t) => !t.done).length;
  const completedCount = todos.filter((t) => t.done).length;

  // update button labels
  filterButtons.forEach((btn) => {
    if (btn.dataset.filter === "remaining") {
      btn.textContent = `Remaining (${remainingCount})`;
    }
    if (btn.dataset.filter === "completed") {
      btn.textContent = `Completed (${completedCount})`;
    }
  });

  todos.forEach((todo) => {
    // 🔥 THIS IS THE CRITICAL FIX
    if (currentFilter === "remaining" && todo.done === true) return;
    if (currentFilter === "completed" && todo.done === false) return;

    const li = document.createElement("li");
    if (todo.done) li.classList.add("completed");

    const left = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    checkbox.onchange = () => {
      todo.done = checkbox.checked;
      save();
      render();
    };

    const span = document.createElement("span");
    span.textContent = todo.text;

    left.appendChild(checkbox);
    left.appendChild(span);

    const actions = document.createElement("div");

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";

    editBtn.onclick = () => {
      currentEditId = todo.id;
      editInput.value = todo.text;
      modal.classList.remove("hidden");
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";

    delBtn.onclick = () => {
      todos = todos.filter((t) => t.id !== todo.id);
      save();
      render();
    };

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(left);
    li.appendChild(actions);

    list.appendChild(li);
  });

  if (currentFilter === "remaining") {
    stats.textContent = `Remaining: ${remainingCount}`;
  } else if (currentFilter === "completed") {
    stats.textContent = `Completed: ${completedCount}`;
  } else {
    stats.textContent = `Remaining: ${remainingCount} | Completed: ${completedCount}`;
  }
}
// ADD TASK
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  todos.push({
    id: createId(),
    text,
    done: false,
  });

  input.value = "";
  save();
  render();
});

// FILTERS
filterButtons.forEach((btn) => {
  btn.onclick = () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  };
});

// THEME
themeToggle.onclick = () => {
  document.body.classList.toggle("light");
};

// MODAL SAVE
saveEdit.onclick = () => {
  const newText = editInput.value.trim();

  if (!newText || currentEditId === null) return;

  const todo = todos.find((t) => t.id === currentEditId);
  if (todo) {
    todo.text = newText;
  }

  save();
  render();
  closeModal();
};

// MODAL CLOSE
function closeModal() {
  modal.classList.add("hidden");
  currentEditId = null;
}

cancelEdit.onclick = closeModal;

// CLICK OUTSIDE MODAL
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// KEYBOARD SUPPORT
document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("hidden")) return;

  if (e.key === "Enter") saveEdit.click();
  if (e.key === "Escape") closeModal();
});

render();
