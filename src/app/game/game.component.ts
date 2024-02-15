import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, Game],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game: Game;

  constructor() { }

    ngOnInit(): void {
      this.newGame();
    }

    takeCard() {
     this.pickCardAnimation = true;
    }

    newGame() {
     this.game = new Game();
    }
}
