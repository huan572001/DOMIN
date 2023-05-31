import {
  _decorator,
  Button,
  Component,
  director,
  EditBox,
  find,
  instantiate,
  Label,
  Node,
  Prefab,
  SpriteFrame,
} from 'cc';
import { Clock } from './Clock';
import { Store } from './Store';
import { Constant } from './constant';
const { ccclass, property } = _decorator;
type TopUser = {
  name: string;
  time: number;
};
@ccclass('GameController')
export class GameController extends Component {
  static time: number = 0;
  private startTime: number;
  @property({ type: Node })
  private clock: Node;
  @property({ type: Prefab })
  private numberPrefab: Prefab | null = null;
  @property({ type: EditBox })
  private nameUser: EditBox;
  static statusGame: boolean = null;
  private arrClock: Node[] = [];
  protected start(): void {
    this.startTimer();
    this.initClock();
  }
  protected update(dt: number): void {
    if (GameController.statusGame === null) this.stopTimer();
  }
  private startTimer() {
    this.startTime = Date.now(); // Lưu thời gian bắt đầu
  }
  private stopTimer() {
    if (this.startTime !== 0) {
      const endTime = Date.now(); // Lấy thời gian hiện tại
      const elapsedTime = endTime - this.startTime; // Tính thời gian đã trôi qua
      if (GameController.time !== Math.floor(elapsedTime / 1000)) {
        GameController.time = Math.floor(elapsedTime / 1000);
        let tmp = GameController.time;
        // console.log(this.time);
        for (let i = 2; i >= 0; i--) {
          this.arrClock[i].getComponent(Clock).setNumber(tmp % 10);
          tmp = Math.floor(tmp / 10);
        }
      }
    }
  }
  private initClock(): void {
    for (let i = 0; i < 3; i++) {
      this.arrClock[i] = instantiate(this.numberPrefab);
      this.clock.addChild(this.arrClock[i]);
      this.arrClock[i].setPosition(i * 13, this.clock.position.y);
    }
  }
  public reset(): void {
    GameController.statusGame = null;
    GameController.time = 0;
    director.loadScene(Constant.screenGame);
  }
  private savePoint() {
    let store = find('store').getComponent(Store);
    let arrTop: TopUser[] = [];
    let level: string;
    if (store.boom === 10) {
      arrTop = JSON.parse(
        localStorage.getItem('beginner')
          ? localStorage.getItem('beginner')
          : '[]'
      );
      level = 'beginner';
    } else if (store.boom === 40) {
      arrTop = JSON.parse(
        localStorage.getItem('Intermediate')
          ? localStorage.getItem('Intermediate')
          : '[]'
      );
      level = 'Intermediate';
    } else {
      arrTop = JSON.parse(
        localStorage.getItem('Expert') ? localStorage.getItem('Expert') : '[]'
      );
      level = 'Expert';
    }

    arrTop.push({
      name: this.nameUser.string,
      time: GameController.time,
    });

    arrTop.sort(function (a, b) {
      if (a.time > b.time) return 1;
      if (a.time < b.time) return -1;
      return 0;
    });
    if (arrTop.length > 10) {
      arrTop = arrTop.slice(0, 9);
    }

    localStorage.setItem(level, JSON.stringify(arrTop));
    this.reset();
  }
  private openMenu(): void {
    find('store').removeFromParent();
    director.loadScene('menu');
  }
}
