# React + Vite

# 🧠 Project Management Tool

Een webapplicatie voor het beheren van projecten, taken en workflows. Gebouwd met **React** (frontend) en **Strapi** (headless CMS backend). De app ondersteunt een backlog, statussen, labels, filtering en bewerken/verwijderen van taken.

## 🚀 Functionaliteiten

- ✅ Taken toevoegen, bewerken en verwijderen
- 🗂️ Taken georganiseerd per status (Backlog, To-do, In progress, Done...)
- 🔍 Filteren op labels en zoektermen
- 🕒 Deadlines instellen voor taken
- 📝 Bekijken van alle taakdetails via een modal
- 🔁 Live updates van kolommen zonder herladen
- 🧾 Paginatie op de backlog
- 🔐 Public API met token via Strapi (Render)

## 🛠️ Technologieën

- **Frontend:** React + Vite + React Query + TanStack Router
- **Backend:** Strapi CMS (gehost op Render)
- **Styling:** CSS (custom)
- **API Auth:** Token-based (via Bearer-token)

---

## 📦 Structuur

/client
├── components/ # StatusBoard, EditTaskModal, Backlog, Pagination, etc.
├── routes/ # Routing via TanStack Router
├── styles/ # backlog.css etc.
├── constants/ # API_URL & API_TOKEN
└── main.jsx # Entry point
/server
└── (Strapi project) # Content types: Task, Status, Label, Project

link naar netlify: final-project-jamstack.netlify.app
link naar render: https://final-project-kugayumasan.onrender.com