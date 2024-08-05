
---

# Tooma-UI Frontend

## Overview

Tooma-UI Frontend is a React application designed to handle file uploads, generate presigned URLs for downloading files, and display shared links on a user-friendly landing page. The project integrates Google OAuth for authentication.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Project](#running-the-project)
4. [Project Structure](#project-structure)
5. [Features](#features)
6. [Troubleshooting](#troubleshooting)
7. [Contributing](#contributing)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- Create React App globally installed (`npx create-react-app`)

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-repo/tooma-ui.git
    cd tooma-ui/frontend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

## Running the Project

1. **Start the React development server**:
    ```sh
    npm start
    ```

The React application will run on `http://localhost:3000`.

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── AppBar.js
│   │   ├── FormComponent.js
│   │   ├── GoogleLoginComponent.js
│   │   ├── LandingPage.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

## Features

- **Google OAuth Authentication**: Secure login using Google accounts.
- **File Upload**: Upload files and generate presigned URLs for secure access.
- **Shared Link Landing Page**: Display shared link information on a user-friendly page.

## Troubleshooting

- **Ensure you are in the correct directory**: Verify you are inside the `tooma-ui/frontend` project directory.
- **Dependencies**: Ensure all dependencies are installed by running `npm install`.
- **CORS Issues**: Make sure your backend is configured to allow requests from your frontend.

## Contributing

Fred Osege

Shadrack Apollo

"# tooma-UI" 
