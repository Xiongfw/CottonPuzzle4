import { _decorator, Component, director, Event, Node } from 'cc';
import { SceneEnum } from '../Enum/index';
const { ccclass, property } = _decorator;

@ccclass('SceneManager')
export class SceneManager extends Component {
  changeScene(e: Event, scene: SceneEnum) {
    director.loadScene(scene);
  }
}
