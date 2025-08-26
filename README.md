# Quiz Naturalisation Française

Une application web moderne pour la préparation à la naturalisation française par mariage. L'application propose des quiz interactifs sur 5 catégories essentielles avec authentification Google et suivi des performances.

## 🚀 Fonctionnalités

- **Authentification Google OAuth** - Connexion sécurisée avec votre compte Google
- **5 catégories de quiz** :
  - Valeurs et symboles
  - Institutions
  - Histoire
  - Culture et société
  - Intégration personnelle
- **Quiz chronométrés** - 30 secondes par question
- **Suivi des performances** - Historique et statistiques détaillées
- **Mode sombre/clair** - Interface adaptable
- **Design responsive** - Compatible mobile et desktop
- **Stockage local** - Aucun serveur requis, données sauvegardées localement

## 🛠️ Technologies utilisées

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI modernes
- **Google Identity Services** - Authentification OAuth
- **LocalStorage** - Stockage des données utilisateur

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Compte Google Cloud Platform (pour OAuth)

## ⚙️ Installation

1. **Cloner le repository**
\`\`\`bash
git clone <repository-url>
cd quiz-naturalisation
\`\`\`

2. **Installer les dépendances**
\`\`\`bash
npm install
# ou
yarn install
\`\`\`

3. **Configuration Google OAuth**

   a. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
   
   b. Créer un nouveau projet ou sélectionner un projet existant
   
   c. Activer l'API "Google Identity"
   
   d. Créer des identifiants OAuth 2.0 :
      - Type d'application : Application web
      - Origines JavaScript autorisées : `http://localhost:3000`
      - URI de redirection autorisés : `http://localhost:3000`
   
   e. Copier l'ID client

4. **Variables d'environnement**

Créer un fichier `.env.local` à la racine du projet :

\`\`\`env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=votre_google_client_id_ici
\`\`\`

5. **Lancer l'application**
\`\`\`bash
npm run dev
# ou
yarn dev
\`\`\`

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📱 Utilisation

1. **Connexion** - Cliquez sur "Se connecter avec Google"
2. **Tableau de bord** - Consultez vos statistiques et choisissez une catégorie
3. **Quiz** - Répondez aux questions dans le temps imparti (30s par question)
4. **Résultats** - Consultez vos scores et explications détaillées
5. **Historique** - Suivez votre progression dans le temps

## 📊 Structure des données

Les questions sont stockées dans `data/quiz-questions.json` avec la structure suivante :

\`\`\`json
{
  "categories": {
    "category-id": {
      "name": "Nom de la catégorie",
      "questions": [
        {
          "id": 1,
          "question": "Question ?",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "correct": 0,
          "explanation": "Explication de la réponse"
        }
      ]
    }
  }
}
\`\`\`

## 🎨 Personnalisation

### Couleurs
Les couleurs sont inspirées du drapeau français et définies dans `app/globals.css` :
- Bleu primaire : `#0055A4`
- Rouge accent : `#EF4135`
- Neutres : blanc, gris

### Ajout de questions
Pour ajouter des questions, modifiez le fichier `data/quiz-questions.json` en respectant la structure existante.

### Timer
Pour modifier la durée des questions, changez la valeur dans `components/quiz-interface.tsx` :
\`\`\`typescript
const [timeRemaining, setTimeRemaining] = useState(30); // 30 secondes
\`\`\`

## 🔧 Scripts disponibles

\`\`\`bash
npm run dev          # Lancement en mode développement
npm run build        # Build de production
npm run start        # Lancement en mode production
npm run lint         # Vérification du code
\`\`\`

## 📦 Déploiement

### Vercel (recommandé)
1. Connecter votre repository GitHub à Vercel
2. Ajouter la variable d'environnement `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
3. Mettre à jour les origines autorisées dans Google Cloud Console avec votre domaine de production

### Autres plateformes
L'application est compatible avec toutes les plateformes supportant Next.js (Netlify, AWS, etc.)

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation des technologies utilisées
- Vérifier la configuration Google OAuth

## 🔮 Roadmap

- [ ] Ajout de plus de questions par catégorie
- [ ] Mode entraînement sans timer
- [ ] Export des résultats en PDF
- [ ] Partage des scores sur les réseaux sociaux
- [ ] Version PWA pour installation mobile
- [ ] Support multilingue
