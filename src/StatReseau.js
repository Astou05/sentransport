function StatReseau({ lignes }) {
  const nbLignes = lignes.length;
  const totalArrets = lignes.reduce((cumul, ligne) => cumul + ligne.arrets, 0);
  const lignePlusLongue = lignes.reduce((max, ligne) => 
    ligne.arrets > max.arrets ? ligne : max, lignes[0]);

  return (
    <div className="stat-reseau" style={{ 
      display: 'flex', 
      justifyContent: 'space-around', 
      backgroundColor: '#ecf0f1', 
      padding: '15px', 
      borderRadius: '8px',
      marginBottom: '20px' 
    }}>
      <div className="stat-item">
        <strong>Total Lignes:</strong> {nbLignes}
      </div>
      <div className="stat-item">
        <strong>Total Arrêts:</strong> {totalArrets}
      </div>
      <div className="stat-item">
        <strong>Ligne la plus longue:</strong> n°{lignePlusLongue.numero} ({lignePlusLongue.arrets} arrêts)
      </div>
    </div>
  );
}

export default StatReseau;