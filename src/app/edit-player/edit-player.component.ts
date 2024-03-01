import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FirestoreModule } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, MatDialogModule,  MatInputModule, FormsModule, MatButtonModule, FirestoreModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent implements OnInit{
  allUserIcons = ['user_icon_1','user_icon_2'];
  constructor(private dialog: MatDialogRef<EditPlayerComponent>) {  }

  ngOnInit(): void {

  }

  onNoClick() {
    this.dialog.close();
  }
}
