import { MoviesShortDetailsHours } from "./MoviesShortDetailsHoursInterface";

export interface MoviesShortDetails {
    picture: string;
    title: string;
    genre: string;
    hours: MoviesShortDetailsHours[];
    type: string;
    language: string;
}