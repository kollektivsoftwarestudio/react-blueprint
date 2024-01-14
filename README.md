# react-blueprint

Architecture reference project for scalable web applications built with React.

## What this project is and what it is not

This project is a high level architecture reference project. It is **not** a boilerplate or a starter kit. It is not a reference guide on how to use any of the libraries used in this project. For example, the usage of @tanstack/react-query is simplified in this project and you should reference [TkDodo's blog series](https://tkdodo.eu/blog/practical-react-query) if you are looking for more information on how to use it. Code often is contrived and only used to illustrate general data flow and logic.

## Docs

- [Application Overview](./docs/application-overview.md)
- [File and Code Naming Conventions](./docs/file-and-code-naming-conventions.md)
- [Project Folder Structure](./docs/project-folder-structure.md)

## Introduction and Credit

**react-blueprint** is heavily based on Alan Alickovic's [bulletproof-react](https://github.com/alan2207/bulletproof-react) project. Almost every component has been rewritten or iterated on from the source material, but the overall UX and Application has been kept the same. **bulletproof-react** is a great architecture reference project, **react-blueprint** just takes some seperate approaches like leveraging scenes over features. Keeping the same application should allow developers to easily learn different approaches.
