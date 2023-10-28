import {
  EventEnum,
  ItemStatusEnum,
  ItemTypeEnum,
  SceneEnum,
  TriggerStatusEnum,
  TriggerTypeEnum,
} from '../Enum';
import { Singleton } from '../Base/Singleton';
import { EventManager } from './EventManager';
import { sys } from 'cc';

interface IItem {
  type: ItemTypeEnum;
  status: ItemStatusEnum;
}

interface TriggerItem {
  type: TriggerTypeEnum;
  status: TriggerStatusEnum;
}

const STORAGE_KEY = 'STORAGE_KEY';

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

  private _curScene: SceneEnum = SceneEnum.H1;

  get curScene() {
    return this._curScene;
  }

  set curScene(value) {
    this._curScene = value;
    this.renderAndSave();
  }

  get h2aData() {
    return this._h2aData;
  }

  set h2aData(value) {
    this._h2aData = value;
    this.renderAndSave();
  }

  get triggerItems() {
    return this._triggerItems;
  }

  set triggerItems(value) {
    this._triggerItems = value;
    this.renderAndSave();
  }

  get isSelect() {
    return this._isSelect;
  }

  set isSelect(value) {
    this._isSelect = value;
    this.renderAndSave();
  }

  get curItemType() {
    return this._curItemType;
  }

  set curItemType(value) {
    this._curItemType = value;
    this.renderAndSave();
  }

  get items() {
    return this._items;
  }

  set items(value) {
    this._items = value;
    this.renderAndSave();
  }

  private renderAndSave() {
    EventManager.instance.emit(EventEnum.Render);

    sys.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        h2aData: this.h2aData,
        isSelect: this.isSelect,
        curItemType: this.curItemType,
        items: this.items,
        triggerItems: this.triggerItems,
        curScene: this.curScene,
      })
    );
  }

  restore() {
    const _data = sys.localStorage.getItem(STORAGE_KEY);
    try {
      const data = JSON.parse(_data);
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    } catch (e) {
      console.error(e);
      this.reset();
    }
  }

  reset() {
    this.h2aData = [...this.h2aInitData];
    this.isSelect = false;
    this.curItemType = null;
    this.items = [
      { type: ItemTypeEnum.Key, status: ItemStatusEnum.Scene },
      { type: ItemTypeEnum.Mail, status: ItemStatusEnum.Disable },
    ];
    this.triggerItems = [
      { type: TriggerTypeEnum.Mailbox, status: TriggerStatusEnum.Pending },
      { type: TriggerTypeEnum.Grandmo, status: TriggerStatusEnum.Pending },
      { type: TriggerTypeEnum.Door, status: TriggerStatusEnum.Pending },
    ];
    this.curScene = SceneEnum.H1;
  }
}
