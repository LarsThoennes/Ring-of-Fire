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
  gameIdenification: string = '';


  private itemsSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute,public dialog: MatDialog) {  }

  // ngOnInit(): void {
  //   this.newGame();
  //   this.route.params.subscribe((params) => {
  //     this.gameIdenification = params['id'];
  //     console.log(params);
  //     const gameID = params['id'];
  //     this.items$ = collectionData(collection(this.firestore, 'games'));
  //     this.itemsSubscription = this.items$.subscribe((list: any[]) => {
  //     this.items = list.map((element: any) => element);
  //     this.game = this.items.find(i => i.id == gameID).data();
  //     console.log(this.game);
  //     console.log(this.items);
  //     this.updateGame(this.game);
  //   });
  //   })
  // }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameIdenification = params['id'];
      console.log('Game ID from route params:', this.gameIdenification);
      const gameID = params['id'];
      this.items$ = collectionData(collection(this.firestore, 'games'));
      this.items$.subscribe((list: any[]) => {
        console.log('Items from Firestore:', list);
        this.items = list.map((element: any) => element);
        console.log(this.items)
        const foundGame = this.items.find(i => i.id == gameID);
        if (foundGame) {
        console.log('Game found:', foundGame);
        this.game = foundGame;
        this.updateGame(this.game);
        } else {
        console.log("Spiel nicht gefunden oder Liste ist leer");
        }
      });
    });
  }

  async updateGame(item: any) {
    await updateDoc(doc(this.firestore, 'games', item.id), item);
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
      if (!this.pickCardAnimation) {
        const card = this.game.stack.pop();
        if (card !== undefined) {
          this.currentCard = card;
          this.pickCardAnimation = true;
          this.safeGame();
          setTimeout(() => {
            if (this.currentCard !== undefined) {
              this.game.playedCards.push(this.currentCard);
              this.pickCardAnimation = false;
              this.pickCardAnimation = false;
              this.game.currentPlayer++;
              this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
              this.safeGame();
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
        this.safeGame();
      });
    }

    // safeGame() {
    //   // this.firestore.collection('games').doc(this.gameID).updateDoc(this.game.toJson());
    //   collection(this.firestore, 'games').doc(this.gameID).updateDoc(this.game.toJson()));
    // }

    async safeGame() {
      await updateDoc(doc(this.firestore, 'games', this.gameIdenification), this.game.toJson());
  }

}
