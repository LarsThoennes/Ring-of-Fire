import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog'
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule, GameInfoComponent, MatCardModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string | undefined;
  game!: Game;

  constructor(public dialog: MatDialog) { }

    ngOnInit(): void {
      this.newGame();
    }

    takeCard() {
      if (!this.pickCardAnimation) {
        const card = this.game.stack.pop();
        if (card !== undefined) {
          this.currentCard = card;
          this.pickCardAnimation = true;
          console.log('Game is: ' + this.game.playedCards);
          console.log('new Card:' + this.currentCard);
          setTimeout(() => {
            if (this.currentCard !== undefined) {
              this.game.playedCards.push(this.currentCard);
              this.pickCardAnimation = false;
              this.pickCardAnimation = false;
            }
          }, 1800);
        }
      }
    }

    newGame() {
     this.game = new Game();
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent);

      dialogRef.afterClosed().subscribe((name:string) => {
        this.game.players.push(name);
      });
    }
}
