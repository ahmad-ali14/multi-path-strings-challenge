import { Istory } from "./stories.types";

export class Story {
  public story: Istory;
  constructor(text = "", up = null, left = null, down = null, right = null) {
    this.story = {
      text: text,
      up: up,
      left: left,
      down: down,
      right: right,
    };
  }

  public setText(text) {
    this.story.text = text;
  }

  public getText() {
    return this.story.text;
  }

  public setDirection(direction, value) {
    this.story[direction] = value;
  }

  public getDirection(direction) {
    return this.story[direction];
  }
}
