import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDU2OTgzYWE5YTQ3NmU4YWY4NmYzNDE1NjljMGQ2ZCIsIm5iZiI6MTc0MjE5MTI5Mi40MzcsInN1YiI6IjY3ZDdiYWJjMzE2NzhjYzNmODAxOTI2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dEXz8oaF7Mm_WwGYDB-2xQhqjg1ojWoW5kHVB5EfHqk'
      }
})

export default instance;
