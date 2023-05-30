import {
  _decorator,
  Button,
  Component,
  director,
  find,
  Label,
  Node,
  Prefab,
  SpriteFrame,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
  @property({ type: [Button] })
  private listMenu: Button[] = [];
  @property({ type: Label })
  private timeLabel: Label;
  private time: number = 0;
  private startTime: number;
  protected start(): void {
    this.startTimer();
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
      this.time = Math.floor(elapsedTime / 1000);
      // if (!(this.time === Math.floor(elapsedTime / 1000))) {
      this.timeLabel.string = this.time.toString();
      // }
      // this.startTime = 0; // Đặt lại thời gian bắt đầu
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
