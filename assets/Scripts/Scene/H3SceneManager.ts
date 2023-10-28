import { _decorator, Component } from 'cc';
import { SceneManager } from './SceneManager';
import { SceneEnum } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('H3SceneManager')
export class H3SceneManager extends SceneManager {
  type: SceneEnum = SceneEnum.H3;
}
