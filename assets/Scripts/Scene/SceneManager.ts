import { _decorator, Component, director, Event, Node } from 'cc';
import { ItemStatusEnum, ItemTypeEnum, SceneEnum } from '../Enum/index';
import { RenderManager } from '../Base/RenderManager';
import { DataManager } from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends RenderManager {
  @property(Node)
  items: Node = null;

  render(): void {}

  changeScene(e: Event, scene: SceneEnum) {
    director.loadScene(scene);
  }
}
