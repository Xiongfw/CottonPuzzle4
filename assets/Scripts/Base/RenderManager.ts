import { _decorator, Component } from 'cc';
import { EventManager } from '../Runtime/EventManager';
import { EventEnum } from '../Enum';
const { ccclass, property } = _decorator;

export abstract class RenderManager extends Component {
  start() {
    EventManager.instance.on(EventEnum.Render, this.render, this);
    this.render();
  }

  onDestroy() {
    EventManager.instance.off(EventEnum.Render, this.render);
  }

  abstract render(): void;
}
