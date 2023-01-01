# Authorizer Express Demo

This repository contains demo code for a task manager application built using Authorizer, NodeJS Express Server, and React.

> Note the TODO data is not persisted across the APIs, you can add apis in similar application

# Getting started

1. Have Authorizer Instance Up and Running. Check [docs](https://docs.authorizer.dev/getting-started)
2. Update Authorizer URL & Client ID env variables in `apis/.env`
3. Update Authorizer URL & Client ID in `todo-app/src/Root.tsx`
4. Start API server

```
  cd apis
  npm i
  npm start
```

5. Start Frontend Application

```
cd todo-app
npm i
npm start
```
