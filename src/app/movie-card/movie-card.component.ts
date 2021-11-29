import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//API call
import { FetchApiDataService } from '../fetch-api-data.service'

//Angular material
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';

//Components
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

  /**
   *
   * @param fetchApiData
   * @param dialog
   * @param snackBar
   * @param router
   */
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

  /**
   * Get all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Get user favorite movies
   */
  getFavorites(): void {
    const user = localStorage.getItem('username');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.faveMovies = res.FavoriteMovies;
    });
  }

  /**
   * Include movie in user's list of favorites
   * @param {string} movie_Title
   * @returns {array} favorite_Movies
   */
  isFavorite(Title: string): boolean {
    return this.faveMovies.includes(Title);
  };


  /**
   * Opens modal with movie genre information
   * @param {string} Description
   * @param {string} Name   
   *  
   */
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

  /**
   * Opens modal with movie director information that includes name, bio and birthyear
   * @param {string} Name
   * @param {string} Bio
   * @param {string} Birthyear
   * 
   */
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

  /**
   * Opens modal with movie synopsis information
   * @param {string} movie_Description
   * @param {string} movie_Title
   */
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



  /**
   * Adds or removes movie from user's list of favorites
   * @param {string} movie_Title 
   * @returns {array} favorite_Movies 
   */
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