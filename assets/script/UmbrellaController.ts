import {
  _decorator,
  Component,
  ImageAsset,
  Node,
  resources,
  Sprite,
  SpriteFrame,
  Texture2D,
} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UmbrellaController')
export class UmbrellaController extends Component {
  private _open: boolean = false;
  private _flagged: boolean = false;
  private _bombExist: boolean = false;
  private _number: number = 0;
  @property({ type: Sprite })
  private spriteUmbrella: Sprite;
  @property({ type: [SpriteFrame] })
  private listStatusUmbrella: SpriteFrame[] = [];

  start() {
    this.node.on(Node.EventType.TOUCH_START, this.openUmbrella, this);
  }

  public openUmbrella(): void {
    if (this._number > 0)
      this.spriteUmbrella.spriteFrame = this.listStatusUmbrella[this._number];
  }
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
