import {
  _decorator,
  Component,
  director,
  EventMouse,
  instantiate,
  Node,
  Prefab,
  randomRange,
  Script,
  Sprite,
  SpriteFrame,
} from 'cc';
import { UmbrellaController } from './UmbrellaController';
const { ccclass, property } = _decorator;

@ccclass('BoardControler')
export class BoardControler extends Component {
  private _line: number = 15;
  private _columns: number = 15;
  private _numberOfBoom: number = 10;
  private flag: number = 0;
  static blockNotOpen: number = 0;
  private statusGame: boolean = true;
  @property({ type: Prefab })
  private umbrellaPrefab: Prefab | null = null;
  @property({ type: Node })
  private umbrellar: Node = null;
  private arrUmbrella: Node[][] = [];
  @property({ type: [SpriteFrame] })
  private iconGame: SpriteFrame[] = [];
  @property({ type: Sprite })
  private resetGame: Sprite;
  start() {
    BoardControler.blockNotOpen = 0;
  }
  protected onLoad(): void {
    this.initBoard();
    this.initBoom();
    this.initNumberINUmbralla();
    // this.resetGame.on(Node.EventType.MOUSE_UP, this.reset, this);
  }

  private initBoard(): void {
    for (let i = 0; i < this._line; i++) {
      this.arrUmbrella[i] = [];
      for (let j = 0; j < this._columns; j++) {
        this.arrUmbrella[i][j] = instantiate(this.umbrellaPrefab);
        this.umbrellar.addChild(this.arrUmbrella[i][j]);
        // this.arrUmbrella[i][j].setPosition(
        //   -(this._columns * 50) / 2 + j * 50,
        //   (this._line * 50) / 2 - i * 50
        // );
        this.arrUmbrella[i][j].setPosition(
          this.node.position.x - (this._columns * 50) / 2 + j * 50,
          this.node.position.y - i * 50 - 50 / 2
        );
        this.arrUmbrella[i][j].on(
          Node.EventType.MOUSE_UP,
          (e) => {
            this.EvenUmbrella(i, j, e);
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
    // phải check lại
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
  public openUmbrella(x: number, y: number) {
    const tmp = this.arrUmbrella[x][y].getComponent(UmbrellaController);
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
        if (tmp.open && tmp.number > 0) {
          if (this.checkFlagged(x, y, tmp.number))
            this.openWhenCkickNumber(x, y);
        } else {
          this.openUmbrella(x, y);
        }
        this.checkWin();
      } else if (event.getButton() === 2) {
        tmp.flag();
      }
    }
  }

  private gameOver(): void {
    for (let i = 0; i < this._line; i++) {
      for (let j = 0; j < this._columns; j++) {
        this.arrUmbrella[i][j].getComponent(UmbrellaController).openBoom();
      }
    }
    this.resetGame.spriteFrame = this.iconGame[1];
    this.statusGame = false;
  }
  public reset(): void {
    director.loadScene('game');
  }
  private checkWin(): void {
    if (
      this._line * this._columns - BoardControler.blockNotOpen ===
      this._numberOfBoom
    ) {
      this.resetGame.spriteFrame = this.iconGame[2];
      this.statusGame = false;
    }
  }
  update(deltaTime: number) {}
}
