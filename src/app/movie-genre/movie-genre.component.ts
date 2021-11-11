import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";


@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss']
})
export class MovieGenreComponent implements OnInit {
  genre: any[] = [];

  constructor(

    public dialogRef: MatDialogRef<MovieGenreComponent>,
    @Inject(MAT_DIALOG_DATA)

    public data: {
      Name: string;
      Description: string;
    }
  ) { }

  ngOnInit(): void {

  }



  closeDialog(): void {
    this.dialogRef.close();
  }

}
