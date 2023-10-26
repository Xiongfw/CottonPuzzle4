import { _decorator, Component, Label, Node, Sprite, SpriteFrame } from 'cc';
import { TriggerManager } from './TriggerManager';
import { ItemStatusEnum, ItemTypeEnum, TriggerStatusEnum, TriggerTypeEnum } from '../Enum';
import { DataManager } from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('GrandmoManager')
export class GrandmoManager extends TriggerManager {
  @property(Node)
  dialog: Node = null;
  @property(Label)
  label: Label = null;

  pendingMessages = [
    '我年纪大了，很多事情想不起来了。',
    '你是谁？算了，我也不在乎你是谁。你能帮我找到信箱的钥匙吗？',
    '老头子说最近会给我寄船票过来，叫我和他一起出去看看。虽然我没有什么兴趣。',
    '他折腾了一辈子，不是躲在楼上捣鼓什么时间机器，就是出海找点什么东西。',
    '这些古怪的电视节目真没有什么意思。',
    '老头子说这个岛上有很多秘密，其实我知道，不过是岛上的日子太孤独，他找点事情做罢了。',
    '人嘛，谁没有年轻过。年轻的时候...算了，不说这些往事了。',
    '老了才明白，万物静默如迷。',
  ];
  resolvedMessages = ['没想到老头子的船票寄过来了，谢谢你。'];
  curMesssageIndex = -1;

  type: TriggerTypeEnum = TriggerTypeEnum.Grandmo;

  render(): void {
    if (this.curMesssageIndex === -1) {
      this.dialog.active = false;
      return;
    }
    this.dialog.active = true;
    const status = DataManager.instance.triggerItems.find((i) => i.type === this.type)?.status;
    if (status === TriggerStatusEnum.Resolve) {
      this.label.string = this.resolvedMessages[this.curMesssageIndex];
    } else {
      this.label.string = this.pendingMessages[this.curMesssageIndex];
    }
  }

  handleTrigger(): void {
    const status = DataManager.instance.triggerItems.find((i) => i.type === this.type)?.status;
    if (status === TriggerStatusEnum.Resolve) {
      if (this.curMesssageIndex < this.resolvedMessages.length - 1) {
        this.curMesssageIndex++;
      } else {
        this.curMesssageIndex = -1;
      }
      this.render();
      return;
    }
    if (DataManager.instance.curItemType === ItemTypeEnum.Mail && DataManager.instance.isSelect) {
      DataManager.instance.items.find((item) => item.type === ItemTypeEnum.Mail).status =
        ItemStatusEnum.Disable;
      DataManager.instance.items = [...DataManager.instance.items];
      DataManager.instance.triggerItems.find(
        (item) => item.type === TriggerTypeEnum.Grandmo
      ).status = TriggerStatusEnum.Resolve;
      DataManager.instance.triggerItems = [...DataManager.instance.triggerItems];
      this.curMesssageIndex = 0;
      DataManager.instance.curItemType = null;
      DataManager.instance.isSelect = false;
    } else {
      if (this.curMesssageIndex < this.pendingMessages.length - 1) {
        this.curMesssageIndex++;
      } else {
        this.curMesssageIndex = -1;
      }
      this.render();
    }
  }
}
