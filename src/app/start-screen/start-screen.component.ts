import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreModule } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [FirestoreModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructor(private router: Router) {}
    newGame() {
      this.router.navigateByUrl('/game');
  }
}
