import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-movie-director',
  templateUrl: './movie-director.component.html',
  styleUrls: ['./movie-director.component.scss']
})
export class MovieDirectorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MovieDirectorComponent>,
    @Inject(MAT_DIALOG_DATA)
    public director: {
      Name: string;
      Bio: string;
      Birthyear: string;
    }
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
