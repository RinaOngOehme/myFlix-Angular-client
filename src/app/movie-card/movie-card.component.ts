import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  user = localStorage.getItem('username');
  faveMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  //obtain all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }

  //check for favorite movies under user's name
  getFavorites(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.faveMovies = res.FavoriteMovies;
    });
  }

  //
  isFavorite(Title: string): boolean {
    return this.faveMovies.includes(Title);
  };

  //open genre component to display name and description
  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(MovieGenreComponent, {
      width: "500px",
      //data will be passed to the Genre component
      data: {
        genre: Name,
        description: Description,
      }
    });
  }

  //open director component to display name, bio and birthyear
  openDirectorDialog(Name: string, Bio: string, Birthyear: string): void {
    this.dialog.open(MovieDirectorComponent, {
      width: "500px",
      //data will be passed to the Director component
      data: {
        name: Name,
        bio: Bio,
        birthyear: Birthyear,
      }
    });
  }

  //open synopsis component to display title and description
  openSynopsisDialog(Title: string, Description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      width: "500px",
      //data will be passed to the Synopsis component
      data: {
        title: Title,
        description: Description,
      }
    });
  }

  //addFavoriteMovie(Title: string): void {
  //  this.fetchApiData.addFavoriteMovie(Title).subscribe((res: any) => {
  //    this.snackBar.open(`${Title} has been added to favorites`, 'OK', {
  //      duration: 3000,
  //    })
  //    return this.getFavorites();
  //  })
  // }


  // removeFavorites(Title: string): void {
  //   this.fetchApiData.removeFavoriteMovie(Title).subscribe((res: any) => {
  //     this.snackBar.open(`${Title} has been removed from favorites`, 'OK', {
  //       duration: 3000,
  //     })
  //     window.location.reload();
  //     return this.getFavorites();
  //   })
  // }

  //setFavoriteStatus(Title: any): any {
  //  if (this.faveMovies.includes(Title)) {
  //    return true;
  //  } else {
  //    return false;
  //  }
  // }
  //}

  // Add or remove movies from the Favorites list.
  onToggleFavoriteMovie(Title: string): any {
    if (this.isFavorite(Title)) {
      this.fetchApiData.removeFavoriteMovie(Title).subscribe((res: any) => {
        this.snackBar.open(`"${Title}" removed from your Favorites list!`,
          'OK', {
          duration: 2000,
        });
      });

      const index = this.faveMovies.indexOf(Title);
      return this.faveMovies.splice(index, 1);

    } else {
      this.fetchApiData.addFavoriteMovie(Title).subscribe((response: any) => {
        this.snackBar.open(`"${Title}" added to your Favorites list!`,
          'OK', {
          duration: 2000,
        });
      });
    }
    return this.faveMovies.push(Title);
  }

}