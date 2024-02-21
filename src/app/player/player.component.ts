import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FirestoreModule } from '@angular/fire/firestore';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, FirestoreModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input() name:string | undefined;
  @Input() playerActive: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

}
