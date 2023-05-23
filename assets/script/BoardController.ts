import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BoardControler')
export class BoardControler extends Component {
  private _line: number = 0;
  private _columns: number = 0;
  private _numberOfBoom: number = 0;
  private flag: number = 0;
  @property({ type: Prefab })
  private umbrellaPrefab: Prefab | null = null;

  private arrUmbrella: Node[][] = [[]];
  constructor(line: number, columns: number, numberOfBoom: number) {
    super();
    this._line = line;
    this._columns = columns;
    this._numberOfBoom = numberOfBoom;
  }
  start() {}

  update(deltaTime: number) {}
}
