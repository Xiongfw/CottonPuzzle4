import { _decorator, Component, director, Node } from 'cc';
import { DataManager } from '../Runtime/DataManager';
import { TriggerManager } from './TriggerManager';
import { SceneEnum, TriggerStatusEnum, TriggerTypeEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('DoorManager')
export class DoorManager extends TriggerManager {
  type: TriggerTypeEnum = TriggerTypeEnum.Door;

  render(): void {
    const status = DataManager.instance.triggerItems.find((i) => i.type === this.type)?.status;
    this.node.active = status === TriggerStatusEnum.Pending;
  }

  handleTrigger(): void {
    const status = DataManager.instance.triggerItems.find((i) => i.type === this.type)?.status;
    if (status === TriggerStatusEnum.Resolve) {
      director.loadScene(SceneEnum.H3);
    } else {
      director.loadScene(SceneEnum.H2A);
    }
  }
}
