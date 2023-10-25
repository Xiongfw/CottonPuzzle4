import { EventEnum, ItemStatusEnum, ItemTypeEnum } from '../Enum';
import { Singleton } from '../Base/Singleton';
import { EventManager } from './EventManager';

interface IItem {
  type: ItemTypeEnum;
  status: ItemStatusEnum;
}

export class DataManager extends Singleton {
  static get instance() {
    return super.getInstance<DataManager>();
  }
  private _isSelect = false;
  private _curItemType?: ItemTypeEnum;
  private _items: Array<IItem> = [
    { type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene },
    { type: ItemTypeEnum.Mail, status: ItemStatusEnum.Inventory },
  ];

  get isSelect() {
    return this._isSelect;
  }

  set isSelect(value) {
    this._isSelect = value;
    this.render();
  }

  get curItemType() {
    return this._curItemType;
  }

  set curItemType(value) {
    this._curItemType = value;
    this.render();
  }

  get items() {
    return this._items;
  }

  set items(value) {
    this._items = value;
    this.render();
  }

  private render() {
    EventManager.instance.emit(EventEnum.Render);
  }
}
