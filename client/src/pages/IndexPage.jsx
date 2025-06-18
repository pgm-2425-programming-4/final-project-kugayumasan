import "../styles/home.css";

export default function IndexPage() {
  return (
    <div className="home">
      <div className="home__content">
        <h1 className="home__title">Welkom bij de Kanban App</h1>
        <p className="home__subtitle">
          Beheer je projecten visueel en efficiënt. Selecteer een project uit
          het menu om te beginnen.
        </p>
        <p className="home__instructions">
          Met deze app kan je taken aanmaken, bewerken en
          verwijderen — allemaal op één plek. Elke taak hoort bij een status
          (zoals "Backlog" of "Done") en kan gelabeld worden met categorieën
          zoals Front-end, Back-end of Documentatie.
        </p>
        <p className="home__note">
          👉 Klaar om aan de slag te gaan? Kies een project en organiseer je
          werk als een pro!
        </p>
      </div>
    </div>
  );
}
