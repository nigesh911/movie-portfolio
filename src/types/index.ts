export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface Review {
    id: string;
    movieId: number;
    userId: string;
    content: string;
    createdAt: Date;
  }