import { MoviesShortDetails } from "./MoviesShortDetailsInterface";
import { RepertoireDays } from "./RepertoireDaysInterface";

export interface MoviesRepertoirePayload {
    repertoireDay: RepertoireDays;
    movies: MoviesShortDetails[];
}