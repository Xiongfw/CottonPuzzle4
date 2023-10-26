import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { TriggerManager } from './TriggerManager';
import { ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum, TriggerTypeEnum } from '../Enum';
import { DataManager } from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('MailboxManager')
export class MailboxManager extends TriggerManager {
  @property(SpriteFrame)
  pendingSpriteFrame: SpriteFrame;
  @property(SpriteFrame)
  resolveSpriteFrame: SpriteFrame;
  type: TriggerTypeEnum = TriggerTypeEnum.Mailbox;

  render(): void {
    const status = DataManager.instance.triggerItems.find(
      (item) => item.type === this.type
    )?.status;
    const sprite = this.getComponent(Sprite);
    sprite.spriteFrame =
      status === TriggerStatusEnum.Resolve ? this.resolveSpriteFrame : this.pendingSpriteFrame;
  }

  handleTrigger(): void {
    if (DataManager.instance.curItemType === ItemTypeEnum.Key && DataManager.instance.isSelect) {
      DataManager.instance.items.find((item) => item.type === ItemTypeEnum.Key).status =
        ItemStatusEnum.Disable;
      DataManager.instance.items.find((item) => item.type === ItemTypeEnum.Mail).status =
        ItemStatusEnum.Scene;
      DataManager.instance.items = [...DataManager.instance.items];
      DataManager.instance.triggerItems.find(
        (item) => item.type === TriggerTypeEnum.Mailbox
      ).status = TriggerStatusEnum.Resolve;
      DataManager.instance.triggerItems = [...DataManager.instance.triggerItems];
      DataManager.instance.curItemType = null;
      DataManager.instance.isSelect = false;
    }
  }
}
