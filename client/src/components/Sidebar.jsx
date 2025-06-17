import { Link } from "@tanstack/react-router";
import "../styles/sidebar.css";

export default function Sidebar({ projects, activeProject, onProjectSelect }) {
  return (
    <div className="sidebar">
      <h4 className="sidebar__title">INFO</h4>
      <ul className="sidebar__list">
        <li className="sidebar__item">
          <Link to="/" className="sidebar__link">
            Home
          </Link>
        </li>
        <li className="sidebar__item">
          <Link to="/about" className="sidebar__link">
            About
          </Link>
        </li>
      </ul>

      <h4 className="sidebar__title">PROJECTS</h4>
      <ul className="sidebar__list">
        {projects.map((project) => {
          let className = "sidebar__item";
          const path = `/projects/${project.id}`;
          if (activeProject.startsWith(path)) {
            className += " active";
          }

          return (
            <li
              key={project.id}
              className={className}
              onClick={() => onProjectSelect(project)}
            >
              {project.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
