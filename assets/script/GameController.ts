import {
  _decorator,
  Button,
  Component,
  director,
  find,
  instantiate,
  Label,
  Node,
  Prefab,
  SpriteFrame,
} from 'cc';
import { Clock } from './Clock';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
  private time: number = 0;
  private startTime: number;
  @property({ type: Node })
  private clock: Node;
  @property({ type: Prefab })
  private numberPrefab: Prefab | null = null;
  private arrClock: Node[] = [];
  protected start(): void {
    this.startTimer();
    this.initClock();
  }
  protected update(dt: number): void {
    this.stopTimer();
  }
  private startTimer() {
    this.startTime = Date.now(); // Lưu thời gian bắt đầu
  }
  private stopTimer() {
    if (this.startTime !== 0) {
      const endTime = Date.now(); // Lấy thời gian hiện tại
      const elapsedTime = endTime - this.startTime; // Tính thời gian đã trôi qua
      if (this.time !== Math.floor(elapsedTime / 1000)) {
        this.time = Math.floor(elapsedTime / 1000);
        let tmp = this.time;
        // console.log(this.time);
        for (let i = 2; i >= 0; i--) {
          console.log(tmp);

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
    director.loadScene('game');
  }
  private openMenu(): void {
    find('store').removeFromParent();
    director.loadScene('menu');
  }
}
