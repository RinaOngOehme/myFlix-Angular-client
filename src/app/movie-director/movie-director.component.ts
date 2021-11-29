import { Component, OnInit, Inject } from '@angular/core';

//Angular material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {

  /**
   * Data from the movie-card component
   * @param data
   */
  constructor(
    public dialogRef: MatDialogRef<MovieDirectorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      bio: string;
      birthyear: string;
    }
  ) { }

  ngOnInit(): void {
  }

  /**
   * close dialog of movie director information that includes name, bio and birthyear
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

}
