# Station Atlas par Charly Rosetto

Application React + TypeScript (Vite) pour gérer les demandes d'amarrage.

## Lancer le projet

```
npm install
npm run dev
```

## Structure

- `public/api/docks.json` : manifeste des quais (lu avec `fetch`)
- `src/types` : types Dock (union par `kind`), DTO et demandes
- `src/services` : `getDocks` (fetch + `response.ok`) et `adaptDock` (DTO -> modèle UI)
- `src/context` : `DocksContext` (chargement, erreur, retry, AbortController) et `RequestsContext` (Context + `useReducer`)
- `src/state/requestsReducer.ts` : reducer pur et status requested
- `src/pages` : Docks, fiche d'un quai, demandes, nouvelle demande, 404
- `src/components` : layout, carte de quai, affichage des états réseau

## Limites

- Les demandes ne sont pas sauvegardées après rechargement.
- Le style est volontairement minimaliste.
- Le focus sur le premier champ fautif utilise `document.getElementById`.

## Ressenti du TP

Le travail était compliqué quand même. Le TP expliquait partiellement ce qu'il fallait faire, évidemment c'est compréhensible que tout ne soit pas donné comme l'architecture où le nombre de fichiers. La mise en place des Dock (dock, request.ts), des pages (/pages), les composants (/components) était relativement simple. Le reste était réalisable grâce au source sur Internet et aux précédents TP et diapos. Malheureusement je n'ai pas réussi à faire les différents status après la création d'une demande.
Je suis assez content de ce que j'ai fait même si c'est "minimaliste", en tout cas le projet fonctionne ! 