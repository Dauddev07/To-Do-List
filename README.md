# ✨ Smart To-Do App

A modern, interactive To-Do List web app built with **HTML, CSS, and JavaScript**.

---

## 🚀 Features

- 🌙 Dark / Light mode toggle  
- ➕ Add new tasks  
- ✏️ Edit tasks (custom modal, no browser prompt)  
- 🗑️ Delete tasks  
- ☑️ Mark tasks as completed using checkbox  
- 🔍 Filter tasks:
  - All
  - Remaining
  - Completed  
- 📊 Dynamic task counters  
- 💾 Data saved using LocalStorage (persists after refresh)  
- ⌨️ Keyboard support (Enter / Esc in modal)  
- 🖱️ Click outside modal to close  

---
## Deployment
Live at:https://dauddev07.github.io/To-Do-List/

## 🧠 How It Works

- Tasks are stored in **LocalStorage**
- Each task has:
  ```js
  {
    id: unique_id,
    text: "Task name",
    done: false
  }
