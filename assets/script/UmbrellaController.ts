import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UmbrellaController')
export class UmbrellaController extends Component {
  private open: boolean = false;
  private flagged: boolean = false;
  private bombExist: boolean = false;
  private number: number = 0;
  start() {}

  update(deltaTime: number) {}
}
