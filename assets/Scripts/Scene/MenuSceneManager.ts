import { _decorator, Component, director, Node } from 'cc';
import { RenderManager } from '../Base/RenderManager';
import { SceneEnum } from '../Enum';
import { SceneManager } from './SceneManager';
import { DataManager } from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('MenuSceneManager')
export class MenuSceneManager extends SceneManager {
  type: SceneEnum = SceneEnum.Menu;
  handleNewGame() {
    DataManager.instance.reset();
    director.loadScene(SceneEnum.H1);
  }

  handleContinueGame() {
    DataManager.instance.restore();
    director.loadScene(DataManager.instance.curScene);
  }

  render(): void {}
}
