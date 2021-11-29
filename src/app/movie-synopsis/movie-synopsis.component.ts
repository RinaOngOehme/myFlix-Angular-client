import { Component, OnInit, Inject } from '@angular/core';

//Angular material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrls: ['./movie-synopsis.component.scss']
})
export class MovieSynopsisComponent implements OnInit {

  /**
   * Data from the movie-card component
   * @param data
   */
  constructor(
    public dialogRef: MatDialogRef<MovieSynopsisComponent>,
    @Inject(MAT_DIALOG_DATA)

    public data: {
      title: string;
      description: string
    }
  ) { }

  ngOnInit(): void {
  }


  /**
   * close dialog of movie synopsis
   */
  closeDialog(): void {
    this.dialogRef.close();
  }


}
