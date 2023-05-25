import { _decorator, Button, Component, Node, Prefab, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
  @property({ type: [Button] })
  private listMenu: Button[] = [];
  start() {}

  update(deltaTime: number) {}
}
