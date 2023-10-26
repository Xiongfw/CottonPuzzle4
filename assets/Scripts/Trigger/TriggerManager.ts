import { _decorator, Component, Node } from 'cc';
import { RenderManager } from '../Base/RenderManager';
import { TriggerTypeEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('TriggerManager')
export abstract class TriggerManager extends RenderManager {
  abstract type: TriggerTypeEnum;

  abstract handleTrigger(): void;
}
