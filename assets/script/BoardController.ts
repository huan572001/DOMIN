import {
  _decorator,
  Component,
  instantiate,
  Node,
  Prefab,
  randomRange,
  Script,
} from 'cc';
import { UmbrellaController } from './UmbrellaController';
const { ccclass, property } = _decorator;

@ccclass('BoardControler')
export class BoardControler extends Component {
  private _line: number = 9;
  private _columns: number = 9;
  private _numberOfBoom: number = 10;
  private flag: number = 0;
  @property({ type: Prefab })
  private umbrellaPrefab: Prefab | null = null;
  @property({ type: Node })
  private umbrellar: Node = null;

  private arrUmbrella: Node[][] = [];
  //   constructor(line: number, columns: number, numberOfBoom: number) {
  //     super();
  //     this._line = line;
  //     this._columns = columns;
  //     this._numberOfBoom = numberOfBoom;
  //   }
  start() {}
  protected onLoad(): void {
    this.initBoard();
    this.initBoom();
    this.initNumberINUmbralla();
    for (let i = 0; i < this._line; i++) {
      for (let j = 0; j < this._columns; j++) {
        console.log(
          this.arrUmbrella[i][j].getComponent(UmbrellaController).number
        );
      }
    }
  }
  private initBoard(): void {
    for (let i = 0; i < this._line; i++) {
      this.arrUmbrella[i] = [];
      for (let j = 0; j < this._columns; j++) {
        this.arrUmbrella[i][j] = instantiate(this.umbrellaPrefab);
        this.umbrellar.addChild(this.arrUmbrella[i][j]);
        this.arrUmbrella[i][j].setPosition(
          -(this._columns * 50) / 2 + j * 50,
          (this._line * 50) / 2 - i * 50
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
  update(deltaTime: number) {}
}
