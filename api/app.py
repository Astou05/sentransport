import json
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Charger les donnees depuis le fichier JSON
with open("lignes_ddd.json", "r") as f:
    lignes = json.load(f)

with open("arrets.json", "r") as f:
    arrets = json.load(f)
@app.route("/arrets")
def get_arrets():
    return jsonify(arrets)    

@app.route("/")
def accueil():
    return jsonify({
        "message": "Bienvenue sur l'API SenTransport!",
        "endpoints": ["/lignes", "/lignes/<id>", "/arrets"]
    })

@app.route("/lignes")
def get_lignes():
    return jsonify(lignes)

@app.route("/lignes/<int:ligne_id>")
def get_ligne(ligne_id):
    ligne = next(
        (l for l in lignes if l["id"] == ligne_id),
        None
    )
    if ligne is None:
        return jsonify({"erreur": "Ligne non trouvee"}), 404
    return jsonify(ligne)


# @app.route("/arrets")
# def get_arrets():
#     tous_les_arrets = set()
#     for ligne in lignes:
#         # On ajoute chaque arrêt de la listeArrets dans le set
#         for arret in ligne["listeArrets"]:
#             tous_les_arrets.add(arret)
#     return jsonify(sorted(list(tous_les_arrets)))   

@app.route("/stats")
def get_stats():
    total_lignes = len(lignes)
    total_arrets = sum(ligne["arrets"] for ligne in lignes)
    # Trouver la ligne ayant le plus d'arrêts
    ligne_max_arrets = max(lignes, key=lambda l: l["arrets"])
    
    return jsonify({
        "total_lignes": total_lignes,
        "total_arrets_cumules": total_arrets,
        "ligne_plus_d_arrets": {
            "numero": ligne_max_arrets["numero"],
            "nombre_arrets": ligne_max_arrets["arrets"]
        }
    }) 

@app.route("/lignes/recherche")
def recherche_lignes():
    query = request.args.get("q", "").strip().toLowerCase() if hasattr(str, 'toLowerCase') else request.args.get("q", "").strip().lower()
    
    # Filtrer les lignes dont le départ ou l'arrivée contient le mot-clé
    lignes_filtrees = [
        l for l in lignes 
        if query in l["depart"].lower() or query in l["arrivee"].lower()
    ]
    
    return jsonify(lignes_filtrees)        

if __name__ == "__main__":
    app.run(debug=True, port=5000)    