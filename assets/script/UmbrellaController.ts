import {
  _decorator,
  Button,
  Component,
  EventMouse,
  ImageAsset,
  Node,
  resources,
  Sprite,
  SpriteFrame,
  Texture2D,
  UITransform,
} from 'cc';
import { BoardControler } from './BoardController';
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

  instanceBoard: BoardControler;
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
  public get open(): boolean {
    return this._open;
  }
  public get flagged(): boolean {
    return this._flagged;
  }
  public openBoom(): void {
    if (!this._open) {
      if (this._flagged) {
        if (!this._bombExist) {
          this.spriteUmbrella.spriteFrame = this.listStatusUmbrella[13];
        }
      } else if (this._bombExist) {
        this.spriteUmbrella.spriteFrame = this.listStatusUmbrella[12];
      }
    }
  }

  public openAUmbrellar(): boolean {
    if (!this._open) {
      if (!this._flagged) {
        if (this._bombExist) {
          this.spriteUmbrella.spriteFrame = this.listStatusUmbrella[9];
          this._open = true;
          //game over
          return true;
        } else {
          this._open = true;
          BoardControler.blockNotOpen += 1;
          this.spriteUmbrella.spriteFrame =
            this.listStatusUmbrella[this._number];
          if (this._number === 0) {
            return null;
          }
        }
      } else {
        if (!this._bombExist) {
          this.spriteUmbrella.spriteFrame = this.listStatusUmbrella[13];
        }
      }
    }

    return false;
  }
  public flag(): void {
    if (!this._open) {
      if (!this._flagged) {
        this.spriteUmbrella.spriteFrame = this.listStatusUmbrella[11];
      } else {
        this.spriteUmbrella.spriteFrame = this.listStatusUmbrella[10];
      }
      this._flagged = !this._flagged;
    }
  }
  update(deltaTime: number) {}
}
