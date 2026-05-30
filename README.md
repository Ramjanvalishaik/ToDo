# ✅ TaskFlow — To-Do List App

A clean, minimal **To-Do List** web app built with pure **HTML, CSS, and JavaScript**. Dark UI, smooth transitions, live task stats, and localStorage persistence — no frameworks, no dependencies.

---

## 📸 Preview

> Open `index.html` directly in your browser — no build step or server required.

---

## ✨ Features

| Feature | Description |
|---|---|
| ➕ **Add Tasks** | Type and press `Enter` or click **Add** |
| ✅ **Complete Tasks** | Click the circle checkbox to mark done |
| 🗑️ **Delete Tasks** | Hover a task → click the trash icon |
| 📊 **Live Stats Bar** | All / Active / Done counts update in real time |
| 🔍 **Filter Tabs** | Switch between **All**, **Active**, and **Done** views |
| 💾 **Persistence** | Tasks saved to `localStorage` — survive page refresh |
| 🧹 **Clear Done** | One-click removal of all completed tasks |
| 🔔 **Toast Notifications** | Subtle feedback on every action |
| 📱 **Responsive** | Works on desktop and mobile |

---

## 🎨 UI Overview

```
┌──────────────────────────────┐
│  My Tasks          Fri, May  │   ← Header + date
├──────────────────────────────┤
│   3 All  │  2 Active  │ 1 Done │  ← Live stats bar
├──────────────────────────────┤
│  [ Add a new task…  ] [Add]  │   ← Input row
├──────────────────────────────┤
│  [ All ]  [ Active ]  [ Done ] │  ← Filter tabs
├──────────────────────────────┤
│  ○ Buy groceries         🗑️  │
│  ● Write README      ~~done~~│   ← Task list
├──────────────────────────────┤
│  2 tasks left    Clear done  │   ← Footer
└──────────────────────────────┘
```

**Design language:** Dark card (`#1c1c24`) on a near-black background (`#111116`), Inter font, accent purple `#6c63ff`, clean 1px borders, subtle hover states only.

---

## 📁 Project Structure

```
To-Do list/
├── index.html      # App markup — header, stats bar, input, filters, task list
├── styles.css      # Dark theme, stats bar, task items, transitions
├── script1.js      # App logic — add, toggle, delete, filter, localStorage, toasts
├── style.css       # (legacy — unused)
├── script.js       # (legacy — unused)
└── README.md       # This file
```

---

## 🚀 Getting Started

No installation needed. Just open the file:

```bash
# Windows
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

---

## 🛠️ Built With

| Technology | Usage |
|---|---|
| **HTML5** | Semantic markup, `aria-*` accessibility attributes |
| **CSS3** | Custom properties, flexbox, keyframe animations |
| **JavaScript (ES6+)** | DOM manipulation, localStorage, event handling |
| **Google Fonts — Inter** | Clean, modern typography |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `Enter` | Add the typed task |

---

## 📊 How the Stats Bar Works

The three counters (**All**, **Active**, **Done**) are recalculated and updated after every action:

- **All** — total number of tasks in the list
- **Active** — tasks not yet completed (`All − Done`)
- **Done** — tasks marked as complete

They update instantly when you add, complete, uncheck, or delete a task.

---

## 🔒 Security

User input is **HTML-escaped** before being inserted into the DOM to prevent XSS attacks.

---

## 📜 License

Open-source under the [MIT License](LICENSE).

---

<p align="center">Built with HTML · CSS · JavaScript</p>
