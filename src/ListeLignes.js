import LigneBus from './LigneBus';
import './ListeLignes.css';

function ListeLignes({ lignes }) {
  return (
    <div className="liste-lignes-container">
      <h2>Lignes Dakar Dem Dikk</h2>
      <p className="stats-info">{lignes.length} lignes disponibles</p>

      <div className="liste-lignes">
        {lignes.map((ligne) => (
          <LigneBus 
            key={ligne.id} 
            numero={ligne.numero}
            depart={ligne.depart}
            arrivee={ligne.arrivee}
            arrets={ligne.arrets}
          />
        ))}
      </div>
    </div>
  );
}

export default ListeLignes;