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
    this.initGame.line = this.initGame.column = Constant.level9x9.line;
    this.initGame.boom = Constant.level9x9.boom;
    director.addPersistRootNode(this.store);
    director.loadScene(Constant.screenGame);
  }
  private onScreenGame16X16(): void {
    this.initGame.line = this.initGame.column = Constant.level16x16.line;
    this.initGame.boom = Constant.level16x16.boom;
    director.addPersistRootNode(this.store);
    director.loadScene(Constant.screenGame);
  }
  private onScreenGame30X16(): void {
    this.initGame.line = Constant.level30x16.line;
    this.initGame.column = Constant.level30x16.column;
    this.initGame.boom = Constant.level30x16.boom;
    director.addPersistRootNode(this.store);
    director.loadScene(Constant.screenGame);
  }
  private openRating(): void {
    this.rating.active = !this.rating.active;
  }
  private onRating9x9(): void {
    let arrTop: any[] = JSON.parse(
      localStorage.getItem(Constant.beginner)
        ? localStorage.getItem(Constant.beginner)
        : '[]'
    );
    this.setRatingLabel(arrTop);
  }
  private onRating16x16(): void {
    let arrTop: any[] = JSON.parse(
      localStorage.getItem(Constant.Intermediate)
        ? localStorage.getItem(Constant.Intermediate)
        : '[]'
    );
    this.setRatingLabel(arrTop);
  }
  private onRating30x16(): void {
    let arrTop: any[] = JSON.parse(
      localStorage.getItem(Constant.Expert)
        ? localStorage.getItem(Constant.Expert)
        : '[]'
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
