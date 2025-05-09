# Movie Manager App

The **Movie Manager App** is a web application that allows users to manage movies and directors. Users can add, update, and delete movies and directors, as well as view lists of movies and directors.

## Features

- **Manage Directors**:

  - Add new directors with their first name, last name, and birth date.
  - Update existing directors.
  - Delete directors.
  - View a list of all directors.

- **Manage Movies**:

  - Add new movies with title, description, release year, director, and genres.
  - Update existing movies.
  - Delete movies.
  - View a list of all movies.

- **Genres**:

  - Select multiple genres for a movie from a predefined list.

- **Interactive UI**:
  - Popup messages for success and error notifications.
  - Dynamic forms and tables for managing data.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Fetch API**: For making HTTP requests to the backend.

## Installation

1. Clone the repository:

   ```powershell
   git clone https://github.com/LukasBaja/MovieManagerApp.git
   ```

2. Navigate to the project directory:

   ```powershell
   cd MovieManagerApp
   ```

3. Install dependencies:

   ```powershell
   npm install
   ```

4. Start the server:

   ```powershell
   npm start
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## API Endpoints

### Directors

- **GET** `/get-director`: Fetch all directors.
- **POST** `/add-director`: Add a new director.
- **PUT** `/update-director/:id`: Update a director by ID.
- **DELETE** `/delete-director/:id`: Delete a director by ID.

### Movies

- **GET** `/get-movies`: Fetch all movies.
- **POST** `/add-movie`: Add a new movie.
- **PUT** `/update-movie/:id`: Update a movie by ID.
- **DELETE** `/delete-movie/:id`: Delete a movie by ID.

## How to Contribute

1. Fork the repository.
2. Create a new branch:
   ```powershell
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```powershell
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```powershell
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please contact [Lukas Baja](mailto:your-email@example.com).
