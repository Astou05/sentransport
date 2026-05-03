import './Header.css';

function Header() {
    const dateAujourdhui = new Date().toLocaleDateString('fr-FR');
    return (
        <header className="header">
            <h1 classeName="header-titre">SenTransport</h1>
            <p classeName="header-soustitre">Votre guide du transport en commun</p>
            <p classeName="header-date">Aujourd'hui c'est le {dateAujourdhui}</p>
        </header>
    );
}
export default Header;