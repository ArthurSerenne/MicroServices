# Microservices E‑commerce (Node.js + Express)

Ce projet implémente un mini‑système de e‑commerce composé de deux microservices indépendants :

- **catalogue‑service** : gestion des produits  
- **order‑service** : création et consultation des commandes

Les deux services communiquent via HTTP (fetch natif), et sont packagés via Docker + docker‑compose.

---

## 🌳 Arborescence

.
├── catalogue-service
│   ├── Dockerfile
│   ├── db.js
│   ├── index.js
│   ├── package.json
│   └── products.js
├── order-service
│   ├── Dockerfile
│   ├── db.js
│   ├── index.js
│   ├── package.json
│   └── orders.js
├── .gitignore
└── docker-compose.yml

---

## 🚀 Prérequis

- **Node.js** (version 18+ ou `latest`)  
- **npm**  
- **Docker** & **docker‑compose** (>= 1.29)

---

## 🛠 Installation & exécution locale

1. **Cloner le dépôt**  
   ```bash
   git clone <repo-url>
   cd <repo-root>

	2.	Installer les dépendances

cd catalogue-service && npm install
cd ../order-service   && npm install


	3.	Lancer les services
	•	En mode développement (2 terminaux) :

# Terminal 1
cd catalogue-service
npm start

# Terminal 2
cd order-service
npm start


	•	Avec Docker Compose :

docker-compose up --build



⸻

📦 Liste des endpoints

1. catalogue‑service (port 8081)

Méthode	URL	Description
GET	/products	Liste tous les produits
GET	/products/:id	Récupère un produit par son ID
POST	/products	Crée un nouveau produit

Exemple de corps pour POST /products

{
    "id": 1,
    "name": "iPhone 15",
    "price": 999
}



⸻

2. order‑service (port 8082)

Méthode	URL	Description
POST	/orders	Crée une commande (corps = tableau d’IDs produit)
GET	/orders/:id	Récupère une commande par son ID

Exemple de corps pour POST /orders

[ 1, 2, 3 ]



⸻

🧪 Tests via curl

# 1) Ajouter un produit
```
curl -X POST http://localhost:8081/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Nokia","price":699}'
```

# 2) Lister tous les produits
```
curl http://localhost:8081/products
```

# 3) Créer une commande (IDs de produits)
```
curl -X POST http://localhost:8082/orders \
  -H "Content-Type: application/json" \
  -d '[1,2]'
```
# 4) Récupérer une commande
```
curl http://localhost:8082/orders/1
```


⸻

🐳 Docker & docker‑compose

Le docker-compose.yml se trouve à la racine et lance :
	•	catalogue → service sur localhost:8081
	•	order    → service sur localhost:8082, configuré pour joindre le catalogue via http://catalogue:8081

version: "3.8"
services:
  catalogue:
    build: ./catalogue-service
    ports:
      - "8081:8081"

  order:
    build: ./order-service
    ports:
      - "8082:8082"
    environment:
      - CATALOGUE_URL=http://catalogue:8081



⸻

✅ .gitignore

Le .gitignore couvre :

# Node.js modules
**/node_modules/

# Logs
*.log
logs/

# Environnements
.env
.env.*.local

# Coverage & builds
coverage/
dist/
build/

# IDE & OS
.DS_Store
.vscode/
.idea/