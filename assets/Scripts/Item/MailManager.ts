import { _decorator, Component, Node } from 'cc';
import { ItemManager } from './ItemManeger';
import { ItemTypeEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('MailManager')
export class MailManager extends ItemManager {
  type: ItemTypeEnum = ItemTypeEnum.Mail;
  label: string = '邮票';
}
