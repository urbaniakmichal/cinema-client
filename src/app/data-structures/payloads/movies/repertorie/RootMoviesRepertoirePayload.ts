import { MoviesRepertoireDaysPayload } from "./MoviesRepertoireDaysPayload";
import { MoviesRepertoirePayload } from "./MoviesRepertoirePayload";

export interface RootMoviesRepertoirePayload {
    
    repertoireDay: MoviesRepertoireDaysPayload;
    movies: MoviesRepertoirePayload[];
}