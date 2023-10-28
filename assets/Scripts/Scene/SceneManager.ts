import { _decorator, Component, director, Event, instantiate, Node, Prefab } from 'cc';
import { ItemStatusEnum, ItemTypeEnum, SceneEnum } from '../Enum/index';
import { RenderManager } from '../Base/RenderManager';
import { DataManager } from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export abstract class SceneManager extends RenderManager {
  @property(Node)
  items: Node = null;
  @property(Prefab)
  inventoryPrefab: Prefab = null;
  @property(Prefab)
  menuPrefab: Prefab = null;

  abstract type: SceneEnum;

  start(): void {
    super.start();
    if (this.inventoryPrefab) {
      const inventory = instantiate(this.inventoryPrefab);
      this.node.addChild(inventory);
    }
    if (this.menuPrefab) {
      const menu = instantiate(this.menuPrefab);
      this.node.addChild(menu);
    }
  }

  render(): void {
    if (DataManager.instance.curScene !== this.type) {
      director.loadScene(DataManager.instance.curScene);
    }
  }

  changeScene(e: Event, scene: SceneEnum) {
    DataManager.instance.curScene = scene;
  }
}
