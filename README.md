# Movie Explorer

A simple React application to browse trending movies using the TMDB API.
This project demonstrates fetching data from a backend Java(Spring Boot) API, unit testing with Mockito for backend, State management with React hooks, and unit testing with Jest + React Testing Library.

---

## Features

- Browse trending movies (daily or weekly), Dropdown to select time frame
- API calls will be cached
- View movie posters, titles, release dates, movie description 
- Add Movies to Favorites
- Favorites will be persisted in localstorage 
- Tested with React Testing Library and Mockito for backend

---

## Tech Stack

- **Frontend:** React (Create React App, hooks, fetch)
- **Backend:** Spring Boot (TMDB client, CORS enabled)
- **Styling:** CSS
- **Testing:** Jest, React Testing Library, Mocktio

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/224HiepHuynh/movie-app.git
```
### 2. Add the API Key
- go to ```movie/src/main/resources/```
- add a file named ```application.properties```
- add your tmdb API key inside the file ```tmdb.api.key= the api key```
- add ```tmdb.base.url=https://api.themoviedb.org/3```

### 3. Install Maven
- go into ```/movie`` folder
- on Mac ```brew install maven```
- on Linux ```sudo apt update```, ```sudo apt install maven```
- check if it's installed ```mvn -v```
- clean and install project ```mvn clean install```
- run project (port 8080) ```mvn spring-boot:run```
- you can see the back end API at ```http://localhost:8080/swagger-ui/index.html#/```

### 4. Set up front end
- go to ```movie-react-app/popcornsoda``` folder
- do ```npm install``` 
- then do ```npm install react-scripts@5```
- then ```npm start``` 
- access the app at ```localhost:3000```


