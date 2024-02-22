import { MoviesRepertoireHoursPayload } from "./MoviesRepertoireHoursPayload";

export interface MoviesRepertoirePayload {
    
    id: string;
    picture: string;
    title: string;
    trailerUrl: string
    genre: string;
    hours: MoviesRepertoireHoursPayload[];
    type: string;
    language: string;
    description: string;
    original_title: string;
    cast: string;
    director: string;
    duration: string;
    premiere: string;
    production: string;
}