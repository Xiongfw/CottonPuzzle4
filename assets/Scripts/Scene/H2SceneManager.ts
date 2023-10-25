import { _decorator, instantiate, Node, Prefab } from 'cc';
import { SceneManager } from './SceneManager';
import { ItemTypeEnum, ItemStatusEnum } from '../Enum';
import { DataManager } from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('H2SceneManager')
export class H2SceneManager extends SceneManager {
  @property(Node)
  keyPlaceholder: Node = null;
  @property(Prefab)
  keyPrefab: Prefab = null;

  render(): void {
    super.render();
    this.items.removeAllChildren();
    
    const keyItem = DataManager.instance.items.find((item) => item.type === ItemTypeEnum.Key);
    if (keyItem && keyItem.status === ItemStatusEnum.Scene) {
      const keyNode = instantiate(this.keyPrefab);
      this.items.addChild(keyNode);
      keyNode.setPosition(this.keyPlaceholder.getPosition());
    }
  }
}
