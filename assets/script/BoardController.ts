import {
  _decorator,
  Component,
  director,
  EventMouse,
  find,
  instantiate,
  Label,
  Node,
  Prefab,
  randomRange,
  Sprite,
  SpriteFrame,
  UITransform,
  view,
  Size,
  AudioSource,
} from 'cc';
import { UmbrellaController } from './UmbrellaController';
import { Store } from './Store';
import { Clock } from './Clock';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

@ccclass('BoardControler')
export class BoardControler extends Component {
  private _line: number;
  private _columns: number;
  private _numberOfBoom: number;
  private flag: number;
  static blockNotOpen: number;
  private statusGame: boolean = true;
  private sizeBlock: number;
  @property({ type: Prefab })
  private umbrellaPrefab: Prefab | null = null;
  @property({ type: Node })
  private umbrellar: Node = null;
  private arrUmbrella: Node[][] = [];
  @property({ type: [SpriteFrame] })
  private iconGame: SpriteFrame[] = [];
  @property({ type: Sprite })
  private resetGame: Sprite;
  @property({ type: UITransform })
  private menuFrame: UITransform;
  @property({ type: Node })
  private boom: Node;
  @property({ type: Prefab })
  private numberPrefab: Prefab | null = null;

  @property({ type: Node })
  private winGame: Node | null = null;
  @property({ type: Label })
  private timeWin: Label | null = null;
  @property({ type: Node })
  private loseGame: Node | null = null;
  @property({ type: UITransform })
  private locasion: UITransform | null = null;
  @property({ type: AudioSource })
  private audioEXplosion: AudioSource | null = null;
  @property({ type: AudioSource })
  private audioWin: AudioSource | null = null;

  private arrClock: Node[] = [];
  private checkAudio: number = 0;
  start() {
    BoardControler.blockNotOpen = 0;
  }
  protected onLoad(): void {
    this.initGame();
    this.initBoard();
    this.initBoom();
    this.initNumberINUmbralla();
    this.initClock();
    // this.resetGame.on(Node.EventType.MOUSE_UP, this.reset, this);
  }
  private initGame(): void {
    let store = find('store').getComponent(Store);
    this._line = store.column;
    this._columns = store.line;
    this._numberOfBoom = store.boom;
    this.flag = this._numberOfBoom;
  }
  private initBoard(): void {
    this.sizeBlock = 30;
    const X = this._columns * this.sizeBlock + 20;
    const Y = this._line * this.sizeBlock + 20;
    const contentSize = new Size(X, Y);
    this.menuFrame.setContentSize(new Size(X, 70));
    this.locasion.setContentSize(contentSize);

    this.umbrellar.getComponent(UITransform).setContentSize(contentSize);
    for (let i = 0; i < this._line; i++) {
      this.arrUmbrella[i] = [];
      for (let j = 0; j < this._columns; j++) {
        this.arrUmbrella[i][j] = instantiate(this.umbrellaPrefab);
        this.umbrellar.addChild(this.arrUmbrella[i][j]);
        this.arrUmbrella[i][j].setPosition(
          -X / 2 + j * this.sizeBlock + this.sizeBlock / 2 + 10,
          Y / 2 - i * this.sizeBlock - this.sizeBlock / 2 - 10
        );
        this.arrUmbrella[i][j]
          .getComponent(UITransform)
          .setContentSize(this.sizeBlock, this.sizeBlock);
        this.arrUmbrella[i][j].on(
          Node.EventType.MOUSE_UP,
          (e) => {
            this.EvenUmbrella(i, j, e);
          },
          this
        );
        this.arrUmbrella[i][j].on(
          Node.EventType.MOUSE_DOWN,
          (e) => {
            this.evenMouseDown(i, j, e);
          },
          this
        );
      }
    }
  }
  private initBoom(): void {
    let count: number = 0;
    while (count < this._numberOfBoom) {
      const randomLine = Math.floor(randomRange(0, this._line));
      const randomColumns = Math.floor(randomRange(0, this._columns));
      let childUmbrella =
        this.arrUmbrella[randomLine][randomColumns].getComponent(
          UmbrellaController
        );

      if (!childUmbrella.bombExist) {
        childUmbrella.bombExist = true;
        count += 1;
      }
    }
  }
  private initNumberINUmbralla() {
    for (let i = 0; i < this._line; i++) {
      for (let j = 0; j < this._columns; j++) {
        this.arrUmbrella[i][j].getComponent(UmbrellaController).number =
          this.bombsAround(i, j);

        // console.log(this.bombsAround(i, j));
      }
    }
  }
  private bombsAround(x: number, y: number): number {
    let count = 0;
    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        if (
          !(
            i < 0 ||
            i > this._line - 1 ||
            j < 0 ||
            j > this._columns - 1 ||
            (i == x && j == y)
          )
        ) {
          if (
            this.arrUmbrella[i][j].getComponent(UmbrellaController).bombExist
          ) {
            count += 1;
          }
        }
      }
    }
    return count;
  }
  private setBoomHaveFlag(num: number): void {
    if (num >= 0) {
      let tmp = num;

      for (let i = 2; i >= 0; i--) {
        this.arrClock[i].getComponent(Clock).setNumber(tmp % 10);
        tmp = Math.floor(tmp / 10);
      }
    }
  }
  private initClock(): void {
    for (let i = 0; i < 3; i++) {
      this.arrClock[i] = instantiate(this.numberPrefab);
      this.boom.addChild(this.arrClock[i]);
      this.arrClock[i].setPosition(i * 13, this.boom.position.y);
    }
    this.setBoomHaveFlag(this._numberOfBoom);
  }
  public openUmbrella(x: number, y: number) {
    const tmp = this.arrUmbrella[x][y].getComponent(UmbrellaController);
    this.checkAudio += 1;
    const checkStatus = tmp.openAUmbrellar();
    if (checkStatus === null) {
      for (let i = x - 1; i < x + 2; i++) {
        for (let j = y - 1; j < y + 2; j++) {
          if (
            !(
              i < 0 ||
              i > this._line - 1 ||
              j < 0 ||
              j > this._columns - 1 ||
              (i == x && j == y)
            )
          ) {
            this.openUmbrella(i, j);
          }
        }
      }
    } else if (checkStatus) {
      this.gameOver();
    }
  }
  public openWhenCkickNumber(x: number, y: number): void {
    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        if (
          !(
            i < 0 ||
            i > this._line - 1 ||
            j < 0 ||
            j > this._columns - 1 ||
            (i == x && j == y)
          )
        ) {
          this.checkAudio++;
          const status = this.arrUmbrella[i][j]
            .getComponent(UmbrellaController)
            .openAUmbrellar();
          if (status) {
            this.gameOver();
          } else if (status === null) {
            this.openWhenCkickNumber(i, j);
          }
        }
      }
    }
  }
  public checkFlagged(x: number, y: number, number: number): boolean {
    let count = 0;
    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        if (
          !(
            i < 0 ||
            i > this._line - 1 ||
            j < 0 ||
            j > this._columns - 1 ||
            (i == x && j == y)
          )
        ) {
          if (this.arrUmbrella[i][j].getComponent(UmbrellaController).flagged) {
            count += 1;
          }
        }
      }
    }
    if (number === count) {
      return true;
    }
    return false;
  }
  public EvenUmbrella(x: number, y: number, event: EventMouse): void {
    if (this.statusGame) {
      const tmp = this.arrUmbrella[x][y].getComponent(UmbrellaController);
      if (event.getButton() === 0) {
        if (tmp.open && tmp.number >= 0) {
          if (this.checkFlagged(x, y, tmp.number)) {
            if (tmp.number !== 0) this.openWhenCkickNumber(x, y);
          } else {
            this.offDisableBlockXY(x, y);
          }
          tmp.onNumber();
        } else {
          if (!tmp.flagged) {
            this.openUmbrella(x, y);
          }
        }
        if (this.checkAudio !== 0) {
          tmp.playAudio();
          this.checkAudio = 0;
        }
        this.checkWin();
      } else if (event.getButton() === 2) {
        if (!tmp.open) {
          if (tmp.flagged) {
            this.flag += 1;
          } else {
            this.flag -= 1;
          }
          this.setBoomHaveFlag(this.flag);
        } else {
          tmp.onNumber();
        }
        tmp.flag();
      }
    }
  }
  public offDisableBlockXY(x: number, y: number): void {
    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        if (
          !(
            i < 0 ||
            i > this._line - 1 ||
            j < 0 ||
            j > this._columns - 1 ||
            (i == x && j == y)
          )
        ) {
          let tmp2 = this.arrUmbrella[i][j].getComponent(UmbrellaController);
          if (!tmp2.open && !tmp2.flagged) {
            tmp2.offDisableBlock();
          }
        }
      }
    }
  }
  public evenMouseDown(x: number, y: number, event: EventMouse): void {
    const tmp = this.arrUmbrella[x][y].getComponent(UmbrellaController);
    if (event.getButton() === 0) {
      if (tmp.open) {
        for (let i = x - 1; i < x + 2; i++) {
          for (let j = y - 1; j < y + 2; j++) {
            if (
              !(
                i < 0 ||
                i > this._line - 1 ||
                j < 0 ||
                j > this._columns - 1 ||
                (i == x && j == y)
              )
            ) {
              let tmp2 =
                this.arrUmbrella[i][j].getComponent(UmbrellaController);
              if (!tmp2.open && !tmp2.flagged) {
                tmp2.onDisableBlock();
              }
            }
          }
        }
      }
    }
  }
  private onAudio() {
    for (let i = 0; i < this._line; i++) {
      for (let j = 0; j < this._columns; j++) {
        this.arrUmbrella[i][j].getComponent(UmbrellaController).offVolume();
      }
    }
  }
  public gameOver(): void {
    for (let i = 0; i < this._line; i++) {
      for (let j = 0; j < this._columns; j++) {
        this.arrUmbrella[i][j].getComponent(UmbrellaController).openBoom();
      }
    }
    this.resetGame.spriteFrame = this.iconGame[1];
    this.statusGame = false;
    this.loseGame.active = true;
    this.audioEXplosion.play();
    director.pause();
  }

  private checkWin(): void {
    if (
      this._line * this._columns - BoardControler.blockNotOpen ===
      this._numberOfBoom
    ) {
      this.resetGame.spriteFrame = this.iconGame[2];
      this.winGame.active = true;
      this.timeWin.string = GameController.time.toString();
      this.statusGame = false;
      GameController.statusGame = true;
      this.audioWin.play();
      director.pause();
    }
  }
  update(deltaTime: number) {
    if (GameController.time >= 999) {
      this.gameOver();
    }
  }
}
