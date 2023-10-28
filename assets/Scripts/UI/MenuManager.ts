import { _decorator, Component, director, Node } from 'cc';
import { DataManager } from '../Runtime/DataManager';
import { SceneEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('MenuManager')
export class MenuManager extends Component {
  handleBackMenu() {
    director.loadScene(SceneEnum.Menu);
  }
}
