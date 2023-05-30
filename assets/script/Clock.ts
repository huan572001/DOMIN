import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Clock')
export class Clock extends Component {
  @property({ type: [SpriteFrame] })
  private listStatusNumber: SpriteFrame[] = [];
  @property({ type: Sprite })
  private spriteNumber: Sprite;
  public setNumber(num: number): void {
    this.spriteNumber.spriteFrame = this.listStatusNumber[num];
  }
}
