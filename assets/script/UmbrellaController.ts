import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UmbrellaController')
export class UmbrellaController extends Component {
  private _open: boolean = false;
  private _flagged: boolean = false;
  private _bombExist: boolean = false;
  private _number: number = 0;
  start() {
    this.node.on(Node.EventType.TOUCH_START, this.openUmbrella, this);
  }

  public openUmbrella(): void {}
  update(deltaTime: number) {}
  public get bombExist(): boolean {
    return this._bombExist;
  }
  public set bombExist(bombExist: boolean) {
    this._bombExist = bombExist;
  }
  public get number(): number {
    return this._number;
  }
  public set number(number: number) {
    this._number = number;
  }
}
