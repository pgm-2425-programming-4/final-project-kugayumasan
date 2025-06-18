import "../styles/about.css";

export default function AboutPage() {
  return (
    <div className="about">
      <h1 className="about__title">Over de applicatie</h1>

      <p className="about__description">
        Deze taakbeheerapplicatie werd ontwikkeld als eindproject voor het vak
        Projectgericht Werken in het Graduaat Programmeren
        aan Arteveldehogeschool. De app stelt gebruikers in staat om hun
        projecttaken te beheren per status, label en deadline — allemaal via een
        gebruiksvriendelijke interface.
      </p>

      <p className="about__description">
        Taken kunnen eenvoudig toegevoegd, bewerkt, verwijderd en gesorteerd
        worden. Elke taak heeft een status (zoals Backlog, In Progress, Done),
        kan gelinkt worden aan labels (zoals Front-end of Documentatie), en
        wordt automatisch verplaatst tussen kolommen wanneer de status wijzigt.
        Perfect voor studenten, kleine teams of solo developers die structuur
        willen brengen in hun workflow.
      </p>

      <div className="about__me">
        <h2 className="about__subtitle">Over de ontwikkelaar</h2>
        <p>
          👋 Hey! Ik ben Eros Ferri, student in het Graduaat
          Programmeren aan Arteveldehogeschool. Ik hou ervan om projecten te
          maken die niet alleen werken, maar er ook goed uitzien en écht iets
          oplossen.
        </p>
        <p>
          Deze app is gebouwd met moderne tools zoals React, React Router, React
          Query en Strapi als headless CMS. Het doel? Efficiënt leren én meteen
          iets bouwen dat bruikbaar is.
        </p>
        <p>
          📧{" "}
          <a href="mailto:eros.ferri@hotmail.com" className="about__link">
            eros.ferri@hotmail.com
          </a>
          <br />
          🔗{" "}
          <a
            href="https://www.linkedin.com/in/eros-ferri-9115aa358/"
            target="_blank"
            rel="noreferrer"
            className="about__link"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </div>
  );
}
