import { Component, OnInit, Inject } from '@angular/core';

//Angular material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss']
})
export class MovieGenreComponent implements OnInit {

  /**
   * Data from the movie-card component
   * @param data
   */
  constructor(
    public dialogRef: MatDialogRef<MovieGenreComponent>,
    @Inject(MAT_DIALOG_DATA)

    public data: {
      genre: string;
      description: string;
    }
  ) { }

  ngOnInit(): void {

  }


  /**
   * close dialog of movie genre information that includes genre and description
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

}
