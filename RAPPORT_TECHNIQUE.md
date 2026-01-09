# Rapport Technique

## 1. Performance

-   **Lazy loading des images**  
    Toutes les images, y compris celles des composants `ProductCard`, `ProductDetailCard` et les images décoratives, utilisent `loading="lazy"` et `decoding="async"` pour améliorer le temps de rendu et réduire la charge réseau.

-   **Préchargement des images critiques**  
    Les images importantes sont préchargées dans `index.html` avec `<link rel="preload" as="image">` pour optimiser le LCP (Largest Contentful Paint).

-   **Optimisation du DOM**  
    Les composants sont réutilisés (`Navbar`, `ProductCard`, `ProductDetailCard`, `Footer`) afin de minimiser les rendus inutiles et améliorer la performance globale.

-   **Lazy loading des pages**  
    Les pages principales (`Home`, `Products`, `ProductDetails`) sont importées dynamiquement via `React.lazy` et `Suspense` dans `App.jsx`, ce qui réduit le bundle initial.

-   **Optimisation des images de produits**
    -   Largeur et hauteur spécifiées pour éviter le layout shift (CLS).
    -   Utilisation de `sizes` pour permettre au navigateur de choisir la meilleure résolution.
    -   Fallback d’image pour éviter les erreurs d’affichage si une image ne se charge pas.

---

## 2. SEO (Référencement)

-   **Balises meta et title**  
    Chaque page dispose d’un `<title>` et de meta description adaptée pour améliorer l’indexation.

-   **Navigation interne optimisée**  
    Les liens internes utilisent `Link` de `react-router-dom`, ce qui permet aux moteurs de recherche de crawler efficacement l’ensemble du site.

-   **Textes alternatifs sur les images**  
    Toutes les images possèdent un attribut `alt` pertinent, ce qui améliore le référencement et l’accessibilité.

---

## 3. Accessibilité (A11Y)

-   **Contraste visuel**  
    Les fonds transparents ont été remplacés ou adaptés pour garantir un contraste suffisant pour les utilisateurs malvoyants.

-   **Structure sémantique**

    -   Utilisation correcte des balises `<header>`, `<main>`, `<section>`, `<article>`, `<figure>` et `<figcaption>`.
    -   Titres hiérarchisés (`h1`, `h2`) pour faciliter la navigation par les lecteurs d’écran.

-   **Formulaires et labels**  
    Les champs de recherche et autres composants interactifs possèdent des `label` associés pour une meilleure compréhension.

-   **Menu mobile accessible**

    -   Contrôlable au clavier (`Enter`, `Space`) et utilisable via lecteurs d’écran.
    -   Attributs ARIA (`aria-expanded`, `aria-label`) indiquant l’état du menu.

-   **Focus management**  
    Les sections dynamiques (chargement des produits, erreurs) gèrent automatiquement le focus pour améliorer la navigation clavier.

---

## 4. Responsive & UX

-   **Navbar**

    -   Desktop : menu horizontal visible.
    -   Mobile : menu burger avec animation slide-down.
    -   Logo centré et menu aligné selon la taille d’écran.
    -   Fermeture automatique du menu après sélection d’un lien.

-   **Grille des produits**

    -   Responsive : `grid-cols-1` sur mobile, `grid-cols-2` sur tablette, `grid-cols-3-4` sur desktop.
    -   Barre de recherche à gauche, produits à droite sur desktop.

-   **Landing et valeurs**
    -   Sections textuelles et call-to-action centrées et adaptatives.
    -   Défilement fluide vers les produits via un bouton accessible au clavier.

---

## 5. Choix techniques et design

-   **Couleurs et contraste**  
    Les fonds transparents ont été remplacés par des couleurs pleines ou semi-transparentes pour aider les utilisateurs malvoyants.

-   **Typographie et hiérarchie visuelle**  
    Titres, descriptions et boutons utilisent des tailles et contrastes adaptés pour une lecture facile.

-   **Code réutilisable et maintenable**  
    Tous les composants (`Navbar`, `ProductCard`, `ProductDetailCard`) sont modulaires, optimisés pour la performance et respectent les bonnes pratiques d’accessibilité.

---

## 6. Points forts supplémentaires

-   Gestion des erreurs et fallback UI pour les images et les produits non trouvés.
-   Optimisation SEO et accessibilité dès le premier rendu.
-   Architecture React modulaire, avec import dynamique des pages pour réduire le bundle initial.

---

> Ce rapport résume toutes les optimisations techniques mises en place sur le projet, incluant performance, SEO, accessibilité et responsive design.
