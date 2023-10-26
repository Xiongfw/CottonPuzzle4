import { _decorator, Component, director, Event, instantiate, Node, Prefab } from 'cc';
import { ItemStatusEnum, ItemTypeEnum, SceneEnum } from '../Enum/index';
import { RenderManager } from '../Base/RenderManager';
import { DataManager } from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends RenderManager {
  @property(Node)
  items: Node = null;
  @property(Prefab)
  inventoryPrefab: Prefab = null;

  start(): void {
    super.start();
    if (this.inventoryPrefab) {
      const inventory = instantiate(this.inventoryPrefab);
      this.node.addChild(inventory);
    }
  }

  render(): void {}

  changeScene(e: Event, scene: SceneEnum) {
    director.loadScene(scene);
  }
}
