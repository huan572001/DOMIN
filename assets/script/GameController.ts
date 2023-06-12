import {
  _decorator,
  AudioSource,
  Button,
  Component,
  director,
  EditBox,
  find,
  instantiate,
  Label,
  Node,
  Prefab,
  SpriteFrame,
} from 'cc';
import { Clock } from './Clock';
import { Store } from './Store';
import { Constant } from './constant';
const { ccclass, property } = _decorator;
type TopUser = {
  name: string;
  time: number;
};
@ccclass('GameController')
export class GameController extends Component {
  static time: number = 0;
  @property({ type: Node })
  private clock: Node;
  @property({ type: Prefab })
  private numberPrefab: Prefab | null = null;
  @property({ type: EditBox })
  private nameUser: EditBox;
  @property({ type: Node })
  private dropDownSetting: Node;
  @property({ type: Node })
  private audioOpen: Node;
  @property({ type: Node })
  private audioClose: Node;
  @property({ type: [AudioSource] })
  private arrAudio: AudioSource[] = [];
  @property({ type: AudioSource })
  private audioBtn: AudioSource | null = null;
  static statusGame: boolean = null;

  private arrClock: Node[] = [];
  protected start(): void {
    GameController.time = 0;
    this.startTimer();
    this.initClock();
    this.startAudio();
  }
  protected update(dt: number): void {
    // if (GameController.statusGame === null) this.stopTimer();
  }
  private playAudioBtn(): void {
    this.audioBtn.play();
  }
  private onRropdownMenu(): void {
    this.dropDownSetting.active = !this.dropDownSetting.active;
  }
  private startAudio(): void {
    let volume = localStorage.getItem(Constant.audio);
    if (volume) {
      if (volume === '0') {
        this.audioOpen.active = true;
        this.audioClose.active = false;
      }
      this.arrAudio.forEach((element) => {
        element.volume = Number(volume);
      });
      this.audioBtn.volume = Number(volume);
    }
  }
  private onAudio(): void {
    let volume = 1;
    this.audioOpen.active = this.audioClose.active;
    this.audioClose.active = !this.audioClose.active;

    if (this.audioOpen.active) {
      volume = 0;
    }
    this.arrAudio.forEach((element) => {
      element.volume = volume;
    });
    this.audioBtn.volume = volume;
    localStorage.setItem(Constant.audio, volume.toString());
  }
  private startTimer() {
    this.schedule(
      function () {
        GameController.time += 1;
        let tmp = GameController.time;
        // console.log(this.time);
        for (let i = 2; i >= 0; i--) {
          this.arrClock[i].getComponent(Clock).setNumber(tmp % 10);
          tmp = Math.floor(tmp / 10);
        }
      },
      1,
      999,
      1
    );
  }
  private initClock(): void {
    for (let i = 0; i < 3; i++) {
      this.arrClock[i] = instantiate(this.numberPrefab);
      this.clock.addChild(this.arrClock[i]);
      this.arrClock[i].setPosition(i * 13, this.clock.position.y);
    }
  }
  public reset(): void {
    GameController.statusGame = null;
    GameController.time = 0;
    director.resume();
    director.loadScene(Constant.screenGame);
  }
  private openMenu(): void {
    director.resume();
    find('store').removeFromParent();
    director.loadScene('menu');
  }
}
