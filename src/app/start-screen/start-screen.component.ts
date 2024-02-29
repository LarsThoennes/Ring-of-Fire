import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore'; // Firestore statt FirestoreModule
import { collection, addDoc } from 'firebase/firestore'; // Nur benötigte Firestore-Importe
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private firestore: Firestore, private router: Router) {}

  newGame() {
    let game = new Game();
    addDoc(collection(this.firestore, 'games'), game.toJson()).then((gameInfo:any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }
}

