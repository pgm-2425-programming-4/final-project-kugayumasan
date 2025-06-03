import { useState } from "react";
import Sidebar from "./components/Sidebar";
import StatusBoard from "./components/StatusBoard";
import { PaginatedBacklog } from "./components/PaginatedBacklog";
import "./styles/app.css";

export default function App() {
  const [activeProject, setActiveProject] = useState("PGM3");

  return (
    <div className="app-layout">
      <Sidebar
        projects={["PGM3", "PGM4"]}
        activeProject={activeProject}
        onProjectSelect={setActiveProject}
      />

      <div className="main-content">
        <StatusBoard project={activeProject} />
        {/* <PaginatedBacklog project={activeProject} /> */}
      </div>
    </div>
  );
}
