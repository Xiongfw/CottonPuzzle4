import { _decorator, Component, Node } from 'cc';
import { ItemManager } from './ItemManeger';
import { ItemTypeEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('KeyManager')
export class KeyManager extends ItemManager {
  type: ItemTypeEnum = ItemTypeEnum.Key;
  label: string = '信箱钥匙';
}
