import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('store')
export class Store extends Component {
  private _line: number;
  private _boom: number;
  private _column: number;
  public get column(): number {
    return this._column;
  }
  public set column(value: number) {
    this._column = value;
  }

  public get boom(): number {
    return this._boom;
  }
  public set boom(value: number) {
    this._boom = value;
  }
  public get line(): number {
    return this._line;
  }
  public set line(value: number) {
    this._line = value;
  }
}
