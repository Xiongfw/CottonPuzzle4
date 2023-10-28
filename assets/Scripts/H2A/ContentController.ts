import { _decorator, CCInteger, Component, Node, Sprite, SpriteFrame } from 'cc';
import { RenderManager } from '../Base/RenderManager';
import { DataManager } from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('ContentController')
export class ContentController extends RenderManager {
  @property(SpriteFrame)
  normalSpriteFrame: SpriteFrame = null;
  @property(SpriteFrame)
  successSpriteFrame: SpriteFrame = null;
  @property(CCInteger)
  index: number = 0;

  render(): void {
    const sprite = this.getComponent(Sprite);

    if (DataManager.instance.h2aData[this.index] === DataManager.instance.h2aAnwser[this.index]) {
      sprite.spriteFrame = this.successSpriteFrame;
    } else {
      sprite.spriteFrame = this.normalSpriteFrame;
    }
  }
}
