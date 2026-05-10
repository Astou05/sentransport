import './LigneBus.css';

function LigneBus({ 
  numero, depart, arrivee, arrets, estSelectionnee, onClick 
}) {
  return (
    <div className={`ligne-bus ${estSelectionnee ? 'selectionnee' : ''}`} onClick={onClick}>
      <div className="ligne-numero">{numero}</div>
      <div className="ligne-info">
        <div className="ligne-trajet">{depart} &rarr; {arrivee}</div>
        <div className="ligne-arrets">{arrets} arrets</div>
      </div>
    </div>
  );
}

export default LigneBus;
