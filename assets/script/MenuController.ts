import {
  _decorator,
  Component,
  director,
  Node,
  Button,
  find,
  Sprite,
  Label,
} from 'cc';
import { Store } from './Store';
import { UITransform } from 'cc';
import { Constant } from './constant';
const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {
  @property({ type: Node })
  private store: Node;
  @property({ type: Store })
  private initGame: Store;
  @property({ type: Node })
  private rating: Node;
  @property({ type: Label })
  private ratingLabelName: Label;
  @property({ type: Label })
  private ratingLabelTime: Label;
  start() {
    this.onRating9x9();
  }
  private onScreenGame9X9(): void {
    this.initGame.line = this.initGame.column = 9;
    this.initGame.boom = 10;
    director.addPersistRootNode(this.store);
    director.loadScene(Constant.screenGame);
  }
  private onScreenGame16X16(): void {
    this.initGame.line = this.initGame.column = 16;
    this.initGame.boom = 40;
    director.addPersistRootNode(this.store);
    director.loadScene(Constant.screenGame);
  }
  private onScreenGame30X16(): void {
    this.initGame.line = 30;
    this.initGame.column = 16;
    this.initGame.boom = 100;
    director.addPersistRootNode(this.store);
    director.loadScene(Constant.screenGame);
  }
  private openRating(): void {
    this.rating.active = !this.rating.active;
  }
  private onRating9x9(): void {
    let arrTop: any[] = JSON.parse(
      localStorage.getItem('beginner') ? localStorage.getItem('beginner') : '[]'
    );
    this.setRatingLabel(arrTop);
  }
  private onRating16x16(): void {
    let arrTop: any[] = JSON.parse(
      localStorage.getItem('Intermediate')
        ? localStorage.getItem('Intermediate')
        : '[]'
    );
    this.setRatingLabel(arrTop);
  }
  private onRating30x16(): void {
    let arrTop: any[] = JSON.parse(
      localStorage.getItem('Expert') ? localStorage.getItem('Expert') : '[]'
    );
    this.setRatingLabel(arrTop);
  }
  private setRatingLabel(arrTop: any[]) {
    let name: string = '';
    let time: string = '';
    arrTop.forEach((element) => {
      name = `${name}${element?.name}
`;
      time = `${time}${element?.time}
`;
    });
    this.ratingLabelName.string = name;
    this.ratingLabelTime.string = time;
  }
}
