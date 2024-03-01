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
import { inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, addDoc, updateDoc, DocumentData } from '@angular/fire/firestore';
import { Observable, Subscription, EMPTY, from } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule, GameInfoComponent, MatCardModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnDestroy {
  game!: Game;
  firestore: Firestore = inject(Firestore);
  items$: Observable<any> = EMPTY;
  items: any[] = [];
  gameIdentification: string = '';
  gameOver = false;


  private itemsSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute,public dialog: MatDialog) {  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {

      this.gameIdentification = params['id'];
      console.log('Game ID from route params:', this.gameIdentification);

      this.items$ = collectionData(collection(this.firestore, 'games'), {idField: 'id'});

      this.items$.subscribe((list: any[]) => {

        console.log('Items from Firestore:', list);
        this.items = list.map((element: any) => element);
        console.log(this.items.map((i) => i.id));
        const foundGame = this.items.find(i => i.id == this.gameIdentification);
        if (foundGame) {
          console.log('Game found:', foundGame);
          this.game.currentPlayer = foundGame.currentPlayer;
          this.game.playedCards = foundGame.playedCards;
          this.game.stack = foundGame.stack;
          this.game.players = foundGame.players;
          this.game.player_images = foundGame.player_images;
          this.game.pickCardAnimation = foundGame.pickCardAnimation;
          this.game.currentCard = foundGame.currentCard;
        } else {
          console.log("Spiel nicht gefunden oder Liste ist leer");
        }
      });
    });
  }

  async safeGame() {
    await updateDoc(doc(this.firestore, 'games', this.gameIdentification), this.game.toJson());
  }

  ngOnDestroy(): void {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }
    newGame() {
      this.game = new Game();
    }

    takeCard() {
      if(this.game.stack.length == 0) {
        this.gameOver = true;
      } else {
        if (!this.game.pickCardAnimation) {
          const card = this.game.stack.pop();
          if (card !== undefined) {
            this.game.currentCard = card;
            this.game.pickCardAnimation = true;
            this.safeGame();
            setTimeout(() => {
              if (this.game.currentCard !== undefined) {
                this.game.playedCards.push(this.game.currentCard);
                this.game.pickCardAnimation = false;
                this.game.currentPlayer++;
                this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
                this.safeGame();
              }
            }, 1800);
          }
      }
      }
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent);
      dialogRef.afterClosed().subscribe((name: string) => {
        if (name && name.length > 0) {
          this.game.players.push(name);
          this.game.player_images.push('user_icon_1');
          this.safeGame();
        }
      });
    }

    editPlayer(playerId: number) {
      console.log(playerId);
      const dialogRef = this.dialog.open(EditPlayerComponent);
      dialogRef.afterClosed().subscribe((change: any) => {
        if(change) {
          if(change == 'DELETE') {
            this.game.players.splice(playerId, 1);
            this.game.player_images.splice(playerId, 1);
          } else {
            console.log(change);
            this.game.player_images[playerId] = change;
          }
          this.safeGame();
        }
      });
    }
}
