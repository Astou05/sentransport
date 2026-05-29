import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Recherche from './Recherche';
import LigneBus from './LigneBus';
import DetailLigne from './DetailLigne';
import Footer from './Footer';

function App() {
  // Etats
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [compteurRecherche, setCompteurRecherche] = useState(0);

    // Donnees CHARGEES au démarrage
  useEffect(() => {
      fetch("http://localhost:5000/lignes")
      .then(response => {
        if (!response.ok) {
        throw new Error(
        "Erreur serveur : " + response.status);
        }
      return response.json();
      })
      .then(data => {
        setLignes(data);
        setChargement(false);
      })
      .catch(error => {
        setErreur(error.message);
        setChargement(false);
      });
  }, []);

  const lignesFiltrees = lignes.filter(l =>
    l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
    l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
    l.numero.includes(recherche)
  );
  function handleClickLigne(ligne) {
  if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
  setLigneSelectionnee(null);
  // re-clic = deselectioner
  } else {
    setLigneSelectionnee(ligne); // premier clic = selectionner
  }
  }
  
  // Ecran de chargement
 if (chargement) {
  return (
    <div className="App">
      <Header />
        <main className="contenu">
          <p className="message-chargement">
            Chargement des lignes...
          </p>
         </main>
    </div>
  );
  }
// Ecran d'erreur
  if (erreur) {
  return (
    <div className="App">
      <Header />
        <main className="contenu">
          <div className="message-erreur">
            <p>Impossible de charger les lignes.</p>
            <p className="erreur-detail">{erreur}</p>
            <p>Verifiez que le serveur Flask est lance
             (python api/app.py).</p>
     </div>
         </main>
     </div>
  );
  }
  return (
    <div className="App">
      <Header />
      <main className="contenu">    
        <div className='search-container'>
        {/* <Recherche valeur={recherche} onChange={setRecherche} /> */}
        <Recherche 
            valeur={recherche} 
            onChange={(v) => {
              setRecherche(v);
              setCompteurRecherche(compteurRecherche + 1);
            }} />
        <button 
          className="bouton-effacer" 
          onClick={() => setRecherche("")} >
          Effacer
      </button></div>
       <p className="stats-compteur">
              Vous avez effectué {compteurRecherche} recherche(s)
            </p>
        <div className="resultats-container">
          {lignesFiltrees.length > 0 ? (
            <p className="resultat-recherche">
              {lignesFiltrees.length} ligne{lignesFiltrees.length > 1 ? 's' : ''} trouvée{lignesFiltrees.length > 1 ? 's' : ''}
            </p>
          ) : (
            <p className="aucune-ligne">Aucune ligne trouvée</p>
          )}
        </div>
       {lignesFiltrees.map(ligne => (
          <LigneBus
          key={ligne.id}
          numero={ligne.numero}
          depart={ligne.depart}
          arrivee={ligne.arrivee}
          arrets={ligne.arrets}
          estSelectionnee={ligneSelectionnee
          && ligneSelectionnee.id === ligne.id}
          onClick={() => handleClickLigne(ligne)}
          />
        ))}
          {ligneSelectionnee
          && <DetailLigne ligne={ligneSelectionnee} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;

