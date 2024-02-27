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
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule, GameInfoComponent, MatCardModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnDestroy {
  pickCardAnimation = false;
  currentCard: string | undefined;
  game!: Game;
  firestore: Firestore = inject(Firestore);
  items$: Observable<any> = EMPTY;
  items: any[] = [];

  private itemsSubscription: Subscription | undefined;

  constructor(private router: Router,private route: ActivatedRoute,public dialog: MatDialog) {


  }

  ngOnInit(): void {
    debugger;
    this.newGame(this.game);
    this.route.params.subscribe((params) => {
      console.log(params);
      const gameID = params['id'];
      this.router.navigate(['/games', gameID]);
      this.items$ = collectionData(collection(this.firestore, 'games'));
      this.itemsSubscription = this.items$.subscribe((list: any[]) => {
      this.items = list.map((element: any) => element);
      console.log(this.items);
      this.game = this.items.find(i => i.id == gameID).data();
      console.log(this.game);
    });
    })
    this.updateGame(this.game);
  }
  async updateGame(item: any) {
    await updateDoc(doc(this.firestore, 'games', item.id), item);
  }

  ngOnDestroy(): void {
    if (this.itemsSubscription) {
      this.itemsSubscription.unsubscribe();
    }
  }
    async newGame(gameID: any) {
      this.game = new Game();
       await addDoc(collection(this.firestore, 'games', gameID),this.game.toJson()).catch(
         (err) => { console.error() }
       ).then(
         (docRef) => {console.log(docRef)}
       )
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
              this.game.currentPlayer++;
              this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
            }
          }, 1800);
        }
      }
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent);

      dialogRef.afterClosed().subscribe((name: string) => {
        if (name && name.length > 0) {
          this.game.players.push(name);
        }
      });
    }

}
