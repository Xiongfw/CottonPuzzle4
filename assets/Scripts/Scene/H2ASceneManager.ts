import { _decorator, Component } from 'cc';
import { SceneManager } from './SceneManager';
import { SceneEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('H2ASceneManager')
export class H2ASceneManager extends SceneManager {
  type: SceneEnum = SceneEnum.H2A;
}
