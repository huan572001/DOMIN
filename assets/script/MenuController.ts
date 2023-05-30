import {
  _decorator,
  Component,
  director,
  Node,
  Button,
  find,
  Sprite,
} from 'cc';
import { Store } from './Store';
const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {
  @property({ type: Node })
  private store: Node;
  @property({ type: Store })
  private initGame: Store;
  private onScreenGame9X9(): void {
    this.initGame.line = this.initGame.column = 9;
    this.initGame.boom = 10;
    director.addPersistRootNode(this.store);
    director.loadScene('game');
  }
  private onScreenGame16X16(): void {
    this.initGame.line = this.initGame.column = 16;
    this.initGame.boom = 40;
    director.addPersistRootNode(this.store);
    director.loadScene('game');
  }
  private onScreenGame30X16(): void {
    this.initGame.line = 30;
    this.initGame.column = 16;
    this.initGame.boom = 100;
    director.addPersistRootNode(this.store);
    director.loadScene('game');
  }
}
