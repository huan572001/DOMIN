import {
  _decorator,
  Component,
  EventMouse,
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

  start() {}
  protected onLoad(): void {
    this.node.on(Node.EventType.MOUSE_UP, this.openUmbrella, this);
  }
  public openUmbrella(event: EventMouse): void {
    if (event.getButton() === 0) {
      if (!this._bombExist && !this._flagged) {
        this.spriteUmbrella.spriteFrame = this.listStatusUmbrella[this._number];
        this._open = !this._open;
      } else {
        this.spriteUmbrella.spriteFrame = this.listStatusUmbrella[9];
        //game over
      }
    } else if (event.getButton() === 2) {
      if (!this._flagged) {
        this.spriteUmbrella.spriteFrame = this.listStatusUmbrella[11];
      } else {
        this.spriteUmbrella.spriteFrame = this.listStatusUmbrella[10];
      }
      this._flagged = !this._flagged;
    }
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
