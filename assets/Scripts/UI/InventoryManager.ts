import { _decorator, Button, Node, Label, Prefab, instantiate } from 'cc';
import { RenderManager } from '../Base/RenderManager';
import { DataManager } from '../Runtime/DataManager';
import { ItemStatusEnum, ItemTypeEnum } from '../Enum';
import { KeyManager } from '../Item/KeyManager';
import { MailManager } from '../Item/MailManager';
const { ccclass, property } = _decorator;

@ccclass('InventoryManager')
export class InventoryManager extends RenderManager {
  @property(Label)
  itemLabel: Label = null;
  @property(Button)
  leftBtn: Button = null;
  @property(Button)
  rightBtn: Button = null;
  @property(Node)
  placeholder: Node = null;
  @property(Node)
  hand: Node = null;

  @property(Prefab)
  keyPrefab: Prefab = null;
  @property(Prefab)
  mailPrefab: Prefab = null;

  render(): void {
    const inventoryItems = DataManager.instance.items.filter(
      (item) => item.status === ItemStatusEnum.Inventory
    );
    if (inventoryItems.length === 0) {
      this.node.active = false;
      return;
    }
    this.placeholder.removeAllChildren();
    this.node.active = true;
    if (DataManager.instance.curItemType) {
      // TODO 是否要判断 Item 是否 为 Inventory 状态？
      this.generateItem(DataManager.instance.curItemType);
    } else {
      const type = inventoryItems[0].type;
      DataManager.instance.curItemType = type;
      this.generateItem(type);
    }
    // 手图标显示
    this.hand.active = DataManager.instance.curItemType && DataManager.instance.isSelect;
    this.changeBtnInteractable();
  }

  generateItem(type: ItemTypeEnum) {
    switch (type) {
      case ItemTypeEnum.Key:
        const keyNode = instantiate(this.keyPrefab);
        this.itemLabel.string = keyNode.getComponent(KeyManager).label;
        this.placeholder.addChild(keyNode);
        break;
      case ItemTypeEnum.Mail:
        const mailNode = instantiate(this.mailPrefab);
        this.itemLabel.string = mailNode.getComponent(MailManager).label;
        this.placeholder.addChild(mailNode);
        break;
      default:
        break;
    }
  }

  onLeftBtnClick() {
    if (!DataManager.instance.curItemType) {
      return;
    }
    const inventoryItems = DataManager.instance.items.filter(
      (item) => item.status === ItemStatusEnum.Inventory
    );
    const index = inventoryItems.findIndex(
      (item) => item.type === DataManager.instance.curItemType
    );
    if (index > 0) {
      DataManager.instance.curItemType = inventoryItems[index - 1].type;
    }
  }

  onRigthBtnClick() {
    if (!DataManager.instance.curItemType) {
      return;
    }
    const inventoryItems = DataManager.instance.items.filter(
      (item) => item.status === ItemStatusEnum.Inventory
    );
    const index = inventoryItems.findIndex(
      (item) => item.type === DataManager.instance.curItemType
    );
    if (index < inventoryItems.length - 1) {
      DataManager.instance.curItemType = inventoryItems[index + 1].type;
    }
  }

  changeBtnInteractable() {
    if (!DataManager.instance.curItemType) {
      this.leftBtn.interactable = false;
      this.rightBtn.interactable = false;
    }
    const inventoryItems = DataManager.instance.items.filter(
      (item) => item.status === ItemStatusEnum.Inventory
    );
    const index = inventoryItems.findIndex(
      (item) => item.type === DataManager.instance.curItemType
    );
    this.leftBtn.interactable = index > 0;
    this.rightBtn.interactable = index < inventoryItems.length - 1;
  }

  handleSelect() {
    DataManager.instance.isSelect = !DataManager.instance.isSelect;
  }
}
