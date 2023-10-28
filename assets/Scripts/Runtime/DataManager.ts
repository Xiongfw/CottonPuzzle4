import {
  EventEnum,
  ItemStatusEnum,
  ItemTypeEnum,
  TriggerStatusEnum,
  TriggerTypeEnum,
} from '../Enum';
import { Singleton } from '../Base/Singleton';
import { EventManager } from './EventManager';

interface IItem {
  type: ItemTypeEnum;
  status: ItemStatusEnum;
}

interface TriggerItem {
  type: TriggerTypeEnum;
  status: TriggerStatusEnum;
}

export class DataManager extends Singleton {
  static get instance() {
    return super.getInstance<DataManager>();
  }

  readonly h2aAnwser = [0, 1, 2, 3, 4, 5, null];
  readonly h2aInitData = [1, 0, 3, 2, 5, 4, null];
  private _h2aData = [...this.h2aInitData];

  private _isSelect = false;
  private _curItemType?: ItemTypeEnum;
  private _items: Array<IItem> = [
    { type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene },
    { type: ItemTypeEnum.Mail, status: ItemStatusEnum.Disable },
  ];

  private _triggerItems: Array<TriggerItem> = [
    { type: TriggerTypeEnum.Mailbox, status: TriggerStatusEnum.Pending },
    { type: TriggerTypeEnum.Grandmo, status: TriggerStatusEnum.Pending },
    { type: TriggerTypeEnum.Door, status: TriggerStatusEnum.Pending },
  ];

  get h2aData() {
    return this._h2aData;
  }

  set h2aData(value) {
    this._h2aData = value;
    this.render();
  }

  get triggerItems() {
    return this._triggerItems;
  }

  set triggerItems(value) {
    this._triggerItems = value;
    this.render();
  }

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
