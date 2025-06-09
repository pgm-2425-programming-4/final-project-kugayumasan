
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <h1>About</h1>
      <p>
        Deze app is gemaakt als eindproject voor het vak PGM. Beheer taken per
        project, status en label!
      </p>
      <p>
        Gemaakt door: <strong>Karel De Smet</strong>
        <br />
        E-mail: karel.desmet@arteveldehs.be
        <br />
        <a href="https://linkedin.com/in/jouwprofiel" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </p>
    </div>
  );
}
