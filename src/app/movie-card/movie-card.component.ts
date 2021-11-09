import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';

import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: string | null = localStorage.getItem("user");
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavorites(): void {
    this.fetchApiData.getUser(this.user).subscribe((results) => {
      //get favorites to the favorites array
      this.favorites = results.Favorites;
    })
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(MovieGenreComponent, {
      width: "500px",
      //data will be passed to the Genre component
      data: {
        Name, Description
      }
    });
  }


  openDirectorDialog(Name: string, Bio: string, Birthyear: string): void {
    this.dialog.open(MovieDirectorComponent, {
      width: "500px",
      //data will be passed to the Director component
      data: { Name, Bio, Birthyear }
    });
  }

  openSynopsisDialog(Title: string, Description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      width: "500px",
      //data will be passed to the Synopsis component
      data: {
        Title, Description
      }
    });
  }

  addFavoriteMovie(Title: string): void {
    this.fetchApiData.addFavoriteMovie(Title).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to favorties`, 'OK', {
        duration: 3000,
      })
      return this.getFavorites();
    })
  }


  removeFromFavorites(Title: string): void {
    this.fetchApiData.removeFavoriteMovie(Title).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been removed from favorties`, 'OK', {
        duration: 3000,
      })
      return this.getFavorites();
    })
  }

  setFavoriteStatus(Title: string): any {
    if (this.favorites.includes(Title)) {
      return true;
    } else {
      return false;
    }
  }


}
