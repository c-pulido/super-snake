# Super Snake

Super Snake is an enhanced single player Snake game featuring global high score tracking, user profile customization, and unlockable skins. It uses a PostgreSQL database to store player information and scores, a Spring Boot backend with a RESTful API, and an upcoming ReactJS frontend for smooth user interaction.

## Visit The Site

Coming soon!

## Features

- PostgreSQL Database: Stores user credentials, high scores, and cosmetic skins.
- Spring Boot Backend: Robust RESTful API to manage user signup, login, and score submission.
- ReactJS Frontend (in progress): User interface for gameplay, leaderboard viewing, profile customization, and skin selection.

## Prerequisites

Before running this project locally, ensure you have the following installed:

- Java Development Kit (JDK) 17 or higher
- Node.js and npm (Node Package Manager)
- PostgreSQL database
- IDE (IntelliJ IDEA, Eclipse, VS Code, etc.)

## Installation

### Backend Setup

1. Clone this repository.
2. Navigate to the `server` directory in your preferred IDE.
3. Configure the `application.properties` file in the `src/main/resources` directory with your PostgreSQL database credentials.
4. Run the Spring Boot application using:

   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup (Coming Soon)

1. Navigate to the `client` directory (once available).
2. Run `npm install` to install necessary dependencies.
3. Update the `src/config.js` file with the backend API URL.
4. Run `npm start` to start the ReactJS app.

## Usage

Access the backend API via Postman or your frontend at `http://localhost:8080`.

### API Endpoints

- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — Login with existing user
- `GET /api/players` — Fetch all players
- `POST /api/players` — Submit player score

## Contributing

Contributions are welcome! To improve this project or report issues, feel free to open an issue or submit a pull request.
