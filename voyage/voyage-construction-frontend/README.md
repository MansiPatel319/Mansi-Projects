## To install node modules

> npm install

## To run project

> npm start

## To run Testcases

> npm run cy:open

## Directory Structure

VOYAGE-CONSTRUCTION-FRONTEND
|
|->cypress/ - Cypress allows you to configure where your tests, fixtures, and support files.
fixtures - Fixtures are used as external pieces of static data that your tests can use.
integration - Integration contains a spec test cases file which contains a test cases
plugin - The plugin file is a special file that executes in Node before the project is loaded.
support - This file runs before every single spec file.
public/ - The public folder contains the HTML file
src/
Assets - It contains assets of our project.
Components - This folder consists of a collection of UI components like buttons, input, etc.
Language - This folder contains the language file
Library - This folder contains Common function and constant that is used in build react application
Network - This folder contains API call
Pages - The files in the pages folder indicate the route of the react application
Store - Global Redux store
App.tsx - It Contains the main javascript render function
index.tsx - It is the JavaScript entry point

## React Component-Based Structure

React Follow Component-Based architecture

- Component-based architecture focuses on the decomposition of the design into individual functional or logical components that represent well-defined communication interfaces containing methods, events, and properties. It provides a higher level of abstraction and divides the problem into sub-problems, each associated with component partitions.

- Components are global shared/reusable components, such as layout (wrappers, navigation), form components, buttons

- In this project, we are using new concepts that are

1. Storybook
2. React Hooks
3. Redux
4. Cypress

## StoryBook

- A storybook is an open-source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.
- There are steps to follow to implement storybook

1. npx sb init
2. npm run storybook
3. Remove .Stories folder from your project
4. Make a component.js file in your UI component
5. Make a component.stories.js file in your UI component

To learn more about Story Book
https://storybook.js.org/docs/react/get-started/introduction

## React Hooks

- React Hook Form reduces the amount of code you need to write while removing unnecessary re-renders.
- Form handling doesn't have to be painful. React Hook Form will help you write less code while achieving better performance.
- To learn more about React Hooks
  https://react-hook-form.com/get-started/

## Redux

- React Redux is the official React binding for Redux. It allows React components to read data from a Redux Store, and dispatch Actions to the Store to update data. Redux helps apps to scale by providing a sensible way to manage state through a unidirectional data flow model
- To learn more about Redux
  https://react-redux.js.org/introduction/getting-started

## Cypress

- Cypress is a next-generation front-end testing tool built for the modern web. We address the key pain points developers and QA engineers face when testing modern applications.
- Cypress enables you to write all types of tests:
- End-to-end tests
- Integration tests
- Unit tests
- To learn more about Cypress
  https://docs.cypress.io/guides/overview/why-cypress#In-a-nutshell