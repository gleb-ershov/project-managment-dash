# Project managment dashboard.

## Description
The application is a classic task tracker for projects, allowing users to create tasks, projects, track deadlines, add new members, and create separate teams.

Made with following stack:
- NextJS ver. 15 as front-end framework
- PostgreSQL as database
- ShadcnUI as UI-component library
- TailwindCSS as way to style this component
- Webpack as bunlder
- Yarn as package manager
- useSWR as a way to handle data fetching on the client side

This project implements a clean architecture approach to separate the business logic from the user interface, improving maintainability, testability, and scalability. It is designed to be modular and flexible, making it easy to extend and adapt to various use cases.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/gleb-ershov/project-managment-dash.git
    ```

2. Navigate to the project directory:
    ```bash
    cd project-managment-dash
    ```

3. Install dependencies:
    - For Node.js:
        ```bash
        yarn install
        ```

## Usage

1. To start the application, run:
    - For Node.js:
        ```bash
        yarn start
        ```

2. Visit [http://localhost:3000](http://localhost:3000) (or the relevant URL) to access the application.

Or you can use the following link to the deploy version on Vercel:
[project-managment-dash.vercel.app](https://project-managment-dash.vercel.app/)