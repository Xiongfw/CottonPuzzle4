import { _decorator, Node, Sprite, SpriteFrame } from 'cc';
import { ItemStatusEnum, ItemTypeEnum } from '../Enum';
import { DataManager } from '../Runtime/DataManager';
import { RenderManager } from '../Base/RenderManager';
const { ccclass, property } = _decorator;

@ccclass('ItemManager')
export class ItemManager extends RenderManager {
  @property(SpriteFrame)
  sceneSpriteFrame: SpriteFrame = null;
  @property(SpriteFrame)
  inventorySpriteFrame: SpriteFrame = null;

  type: ItemTypeEnum;
  label: string = '物品';

  start() {
    super.start();
    this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
  }

  render() {
    const item = DataManager.instance.items.find((item) => item.type === this.type);
    const sprite = this.getComponent(Sprite);
    switch (item?.status) {
      case ItemStatusEnum.Scene:
        this.node.active = true;
        sprite.spriteFrame = this.sceneSpriteFrame;
        break;
      case ItemStatusEnum.Inventory:
        this.node.active = true;
        sprite.spriteFrame = this.inventorySpriteFrame;
        break;
      case ItemStatusEnum.Disable:
        this.node.active = false;
        break;
      default:
        break;
    }
  }

  onTouchEnd() {
    const item = DataManager.instance.items.find((item) => item.type === this.type);
    if (!item) {
      return;
    }
    if (item.status === ItemStatusEnum.Scene) {
      item.status = ItemStatusEnum.Inventory;
      // 为了触发 render
      DataManager.instance.items = [...DataManager.instance.items];
    }
  }
}
