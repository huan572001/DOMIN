import {
  _decorator,
  AudioSource,
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
import { Constant } from './constant';
const { ccclass, property } = _decorator;

@ccclass('UmbrellaController')
export class UmbrellaController extends Component {
  private _open: boolean = false;
  private _flagged: boolean = false;
  private _bombExist: boolean = false;
  private _number: number = 0;
  instanceBoard: BoardControler;

  @property({ type: Sprite })
  private spriteUmbrella: Sprite;
  @property({ type: [SpriteFrame] })
  private listStatusUmbrella: SpriteFrame[] = [];
  @property({ type: Button })
  private btnblock: Button;
  @property({ type: AudioSource })
  private audio: AudioSource;
  protected start(): void {
    let volume = localStorage.getItem(Constant.audio);
    if (volume) {
      if (volume === '0') {
        this.audio.volume = 0;
      }
    }
    this.spriteUmbrella.spriteFrame = this.listStatusUmbrella[10];
  }
  public offVolume(): void {
    if (this.audio.volume === 0) {
      this.audio.volume = 0.5;
    } else {
      this.audio.volume = 0;
    }
  }
  public get btn(): Button {
    return this.btnblock;
  }
  public set btn(value: Button) {
    this.btnblock = value;
  }
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
  public onDisableBlock(): void {
    this.spriteUmbrella.spriteFrame = this.listStatusUmbrella[0];
  }
  public offDisableBlock(): void {
    this.spriteUmbrella.spriteFrame = this.listStatusUmbrella[10];
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
  public onNumber(): void {
    this.spriteUmbrella.spriteFrame = this.listStatusUmbrella[this._number];
  }
  public playAudio() {
    this.audio.play();
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
