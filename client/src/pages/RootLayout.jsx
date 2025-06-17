import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import { API_URL } from "../constants/constants";
import "../styles/app.css";

export default function RootLayout() {
  const { location } = useRouterState();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${API_URL}/projects`);
        const json = await res.json();
        const data = json.data.map((p) => ({
          id: p.id,
          title: p.title,
        }));
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="layout">
      <Sidebar
        projects={projects}
        activeProject={location.pathname}
        onProjectSelect={(project) => {
          navigate({ to: `/projects/${project.id}` });
        }}
      />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
