import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FirestoreModule } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [CommonModule, MatDialogModule,  MatInputModule, FormsModule, MatButtonModule, FirestoreModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name: string | undefined;

  constructor(private dialog: MatDialogRef<DialogAddPlayerComponent>) {  }

  onNoClick() {
    this.dialog.close();
  }

}
