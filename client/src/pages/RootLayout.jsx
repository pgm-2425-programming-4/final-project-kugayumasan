import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router";

import Sidebar from "../components/Sidebar.jsx";
import "../styles/app.css";


export default function RootLayout() {
  const { location } = useRouterState();
  const navigate = useNavigate();
  const projects = ["PGM3", "PGM4"];

  return (
    <div className="layout">
      <Sidebar
        projects={projects}
        activeProject={location.pathname}
        onProjectSelect={(project) => {
          const id = project === "PGM3" ? 2 : 3;
          navigate({ to: `/projects/${id}` });
        }}
      />
      
      <div className="main-content">
        <Outlet />
        
      </div>
    </div>
  );
}
