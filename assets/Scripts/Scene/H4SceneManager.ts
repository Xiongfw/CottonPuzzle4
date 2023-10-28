import { _decorator, Node, instantiate, Prefab } from 'cc';
import { SceneManager } from './SceneManager';
import { ItemTypeEnum, ItemStatusEnum, SceneEnum } from '../Enum';
import { DataManager } from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('H4SceneManager')
export class H4SceneManager extends SceneManager {
  type: SceneEnum = SceneEnum.H4;
  @property(Node)
  mailPlaceholder: Node = null;
  @property(Prefab)
  mailPrefab: Prefab = null;

  render(): void {
    super.render();
    this.items.destroyAllChildren();

    const mailItem = DataManager.instance.items.find((item) => item.type === ItemTypeEnum.Mail);
    if (mailItem && mailItem.status === ItemStatusEnum.Scene) {
      const mailNode = instantiate(this.mailPrefab);
      this.items.addChild(mailNode);
      mailNode.setPosition(this.mailPlaceholder.getPosition());
    }
  }
}
