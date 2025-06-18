import { Link, useRouterState } from "@tanstack/react-router"; // ✅ juiste import
import "../styles/sidebar.css";

export default function Sidebar({ projects, onProjectSelect }) {
  const { location } = useRouterState(); // ✅ haalt current path op

  return (
    <div className="sidebar">
      <h4 className="sidebar__title">INFO</h4>
      <ul className="sidebar__list">
        <li
          className={`sidebar__item ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          <Link to="/" className="sidebar__link">
            Home
          </Link>
        </li>
        <li
          className={`sidebar__item ${
            location.pathname === "/about" ? "active" : ""
          }`}
        >
          <Link to="/about" className="sidebar__link">
            About
          </Link>
        </li>
      </ul>

      <h4 className="sidebar__title">PROJECTS</h4>
      <ul className="sidebar__list">
        {projects.map((project) => {
          const path = `/projects/${project.id}`;
          const isActive = location.pathname.startsWith(path); // ✅ active check
          const className = `sidebar__item ${isActive ? "active" : ""}`;

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
