import { _decorator, Event, instantiate, Node, Prefab, UITransform } from 'cc';
import { CircleController } from './CircleController';
import { RenderManager } from '../Base/RenderManager';
import { DataManager } from '../Runtime/DataManager';
const { ccclass, property } = _decorator;

@ccclass('H2AGameManager')
export class H2AGameManager extends RenderManager {
  @property([CircleController])
  circles: CircleController[] = [];
  @property(Node)
  lines: Node = null;
  @property(Prefab)
  linePrefab: Prefab = null;
  @property([Prefab])
  contentPrefabs: Prefab[] = [];

  private circlesMap: Map<CircleController, Array<CircleController>> = new Map();

  start() {
    super.start();
    this.generateCirclesMap();
    this.generateLines();
  }

  render(): void {
    for (let i = 0; i < this.circles.length; i++) {
      const circle = this.circles[i];
      circle.node.destroyAllChildren();

      const contentIndex = DataManager.instance.h2aData[i];
      if (contentIndex !== null && this.contentPrefabs[contentIndex]) {
        const content = instantiate(this.contentPrefabs[contentIndex]);
        circle.node.addChild(content);
      }
    }
  }

  handleCircleTouch(e: Event, index: string) {
    const nIndex = Number(index);
    // 如果点击空的就直接 return
    if (DataManager.instance.h2aData[nIndex] === null) {
      return;
    }
    const emptyContentIndex = DataManager.instance.h2aData.findIndex((i) => i === null);
    const circles = this.circlesMap.get(this.circles[index]);
    for (const nextCircle of circles) {
      const nextCircleIndex = this.circles.findIndex((i) => i === nextCircle);
      // 如果路径里面有空节点就替换
      if (nextCircleIndex === emptyContentIndex) {
        const temp = DataManager.instance.h2aData[nIndex];
        DataManager.instance.h2aData[nIndex] = DataManager.instance.h2aData[emptyContentIndex];
        DataManager.instance.h2aData[emptyContentIndex] = temp;

        DataManager.instance.h2aData = [...DataManager.instance.h2aData];
        break;
      }
    }
  }

  generateCirclesMap() {
    this.circlesMap.set(this.circles[0], [this.circles[1], this.circles[4], this.circles[6]]);
    this.circlesMap.set(this.circles[1], [this.circles[0], this.circles[5], this.circles[6]]);
    this.circlesMap.set(this.circles[2], [this.circles[4], this.circles[6]]);
    this.circlesMap.set(this.circles[3], [this.circles[5], this.circles[6]]);
    this.circlesMap.set(this.circles[4], [
      this.circles[0],
      this.circles[2],
      this.circles[5],
      this.circles[6],
    ]);
    this.circlesMap.set(this.circles[5], [
      this.circles[1],
      this.circles[3],
      this.circles[4],
      this.circles[6],
    ]);
    this.circlesMap.set(this.circles[6], [
      this.circles[0],
      this.circles[1],
      this.circles[2],
      this.circles[3],
      this.circles[4],
      this.circles[5],
    ]);
  }

  generateLines() {
    for (const [curCircle, circles] of this.circlesMap) {
      for (const nextCircle of circles) {
        // 保证只生成一条线， nextCircleIndex
        const curCircleIndex = this.circles.findIndex((i) => i === curCircle);
        const nextCircleIndex = this.circles.findIndex((i) => i === nextCircle);
        if (nextCircleIndex > curCircleIndex) {
          this.generateLine(curCircle, nextCircle);
        }
      }
    }
  }

  generateLine(curCircle: CircleController, nextCircle: CircleController) {
    const line = instantiate(this.linePrefab);
    this.lines.addChild(line);

    const { x: x1, y: y1 } = curCircle.node.position;
    const { x: x2, y: y2 } = nextCircle.node.position;
    const x = (x1 + x2) / 2;
    const y = (y1 + y2) / 2;

    const side1 = Math.abs(x1 - x2);
    const side2 = Math.abs(y1 - y2);
    const transform = line.getComponent(UITransform);
    transform.setContentSize(Math.sqrt(side1 ** 2 + side2 ** 2), transform.height);

    const rad = Math.atan(side2 / side1);
    const angle = (rad * 180) / Math.PI;
    const sign = (x1 > x2 && y1 > y2) || (x1 < x2 && y1 < y2) ? 1 : -1;

    line.setRotationFromEuler(0, 0, sign * angle);
    line.setPosition(x, y);
  }
}
