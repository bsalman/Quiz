# Quiz

Quiz React JS This project is a simple and interactive quiz application built with React.js.

# Quiz React JS

A simple and interactive quiz application built with React.js and Vite.

## Features

- User registration with name, email, and subject selection
- Multiple subjects (JavaScript, PHP, etc.)
- 20 random questions per quiz, filtered by subject
- Timer for quiz completion (5 minutes)
- Instant feedback and results summary
- Responsive design with custom SCSS styling

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. Clone the repository:

   ```sh
   git clone <your-repo-url>
   cd Quiz-React-js
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the mock API server:

   ```sh
   npm run server
   ```

4. Start the development server:

   ```sh
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/` - React source code
  - `components/` - UI components (Questions, Answers, Timer)
  - `context/` - React context for subjects and user state
  - `hooks/` - Custom hooks
  - `pages/` - Application pages (Landing, Quiz, Result, etc.)
  - `services/` - API service functions
  - `scss/` - SCSS styles
- `db.json` - Mock database for json-server

## API

The app uses [json-server](https://github.com/typicode/json-server) for a mock REST API. Endpoints include:

- `/subjects`
- `/Question`
- `/users`
- `/results`

See [api.http](api.http) for example requests.

## Customization

- Add or edit questions and subjects in `db.json`.
- Update styles in `src/scss/style.scss`.

## License

MIT

---

Made with ❤️ using React and Vite.
