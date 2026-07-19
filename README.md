# rkz_qlf — site officiel

Site statique (HTML / CSS / JS pur, sans backend) pour centraliser les réseaux,
la galerie lifestyle, et une future offre Formations & VIP.

## Structure du projet

```
.
├── index.html          → page unique, tout le contenu
├── css/
│   └── style.css        → design system (couleurs, typographie, layout)
├── js/
│   └── script.js         → compteurs animés, onglet actif, formulaire VIP
├── images/
│   ├── photo-1.jpg … photo-6.jpg   → à ajouter (voir plus bas)
│   └── README.txt
└── README.md
```

## 🚀 Déployer sur GitHub Pages (5 minutes)

1. **Créer le repo**
   - Va sur [github.com/new](https://github.com/new)
   - Nomme-le par exemple `rkz-qlf-site` (public)
   - Ne coche aucune option d'initialisation (pas de README auto)

2. **Envoyer les fichiers**
   Depuis ce dossier, dans un terminal :
   ```bash
   git init
   git add .
   git commit -m "Site rkz_qlf"
   git branch -M main
   git remote add origin https://github.com/TON-PSEUDO/rkz-qlf-site.git
   git push -u origin main
   ```
   *(Ou plus simple : sur GitHub, clique "Add file → Upload files" et glisse tout le contenu de ce dossier.)*

3. **Activer GitHub Pages**
   - Dans le repo → onglet **Settings**
   - Menu **Pages** (à gauche)
   - Sous "Build and deployment" → Source : **Deploy from a branch**
   - Branche : **main**, dossier : **/ (root)**
   - Clique **Save**

4. **Récupérer le lien**
   - Après 1–2 minutes, ton site est en ligne à :
     `https://TON-PSEUDO.github.io/rkz-qlf-site/`
   - Le lien apparaît aussi en haut de la page Settings → Pages

C'est tout — aucune configuration serveur, aucune base de données.

## ✏️ Personnaliser le contenu

- **Nom / accroche / stats** : modifie le texte directement dans `index.html`,
  section `<section id="accueil">`.
- **Réseaux sociaux** : chaque plateforme est une carte `.social-card` dans
  `<section id="reseaux">`. Remplace les liens `href`, ajoute le nombre
  d'abonnés, ou passe une carte de `social-card--soon` à `social-card--active`
  dès qu'un réseau est prêt.
- **Galerie photo** : dépose tes images dans le dossier `images/` en les
  nommant `photo-1.jpg` à `photo-6.jpg` (ou change les chemins `src` dans
  `index.html` si tu utilises d'autres noms/formats comme `.png` ou `.webp`).
  Tant qu'une image n'existe pas, un emplacement vide s'affiche automatiquement.
- **Couleur d'accent / typographies** : tout est centralisé en haut de
  `css/style.css` dans le bloc `:root { --gold: ...; }`.

## 📧 Activer réellement le formulaire VIP (liste d'attente)

Le site est 100% statique : par défaut, le formulaire confirme juste
l'inscription visuellement, sans réellement stocker l'e-mail nulle part
(il n'y a pas de serveur). Pour recevoir vraiment les inscriptions, deux
options simples et gratuites, sans backend à héberger :

**Option A — Formspree (recommandé, 2 minutes)**
1. Crée un compte sur [formspree.io](https://formspree.io) et un formulaire
2. Copie l'URL fournie (ex : `https://formspree.io/f/xxxxxxx`)
3. Dans `js/script.js`, colle-la dans la constante en haut du fichier :
   ```js
   const FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxx';
   ```
4. Envoie les modifications sur GitHub — c'est en ligne.

**Option B — Google Forms**
Crée un Google Form avec un champ e-mail, et remplace le `<form>` dans
`index.html` par le code d'intégration fourni par Google Forms.

## 🧱 Stack technique

- HTML5 sémantique, une seule page
- CSS pur avec variables (pas de framework, pas de build)
- JavaScript vanilla (aucune dépendance)
- Polices via Google Fonts (Bebas Neue, Inter, JetBrains Mono)
- 100% compatible GitHub Pages, Netlify, Vercel ou tout hébergement statique

## ✅ Checklist avant mise en ligne

- [ ] Remplacer les photos de la galerie
- [ ] Vérifier les liens Instagram / TikTok
- [ ] Connecter le formulaire VIP (Formspree ou Google Forms)
- [ ] Mettre à jour le nombre d'abonnés dans `index.html` quand il change
- [ ] Personnaliser la balise `<title>` et `<meta name="description">` si besoin
