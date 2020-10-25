import { Story } from "./story.model";
import { ImultiString, Istory } from "./stories.types";

export default class MultiString {
  public list: Story[];
  constructor() {
    this.list = [];
  }

  public addStory = (
    text,
    up = null,
    left = null,
    down = null,
    right = null
  ) => {
    this.list.push(new Story(text, up, left, down, right));
  };

  public addStoryObject = (storyObject) => {
    this.list.push(
      new Story(
        storyObject.text,
        storyObject.up,
        storyObject.left,
        storyObject.down,
        storyObject.right
      )
    );
  };

  public getStory = (index) => {
    if (index === null) {
      return null;
    }
    return this.list[index];
  };

  public getStoryIndex = (story) => {
    const result = this.list.indexOf(story);
    if (result === -1) {
      return null;
    }
    return result;
  };

  public get4Neiboghrs = (story) => {
    const result = {
      up: null,
      left: null,
      down: null,
      right: null,
    };

    const upIndex = story.getDirection("up");
    const leftIndex = story.getDirection("left");
    const downIndex = story.getDirection("down");
    const rightIndex = story.getDirection("right");

    result.up = this.getStory(upIndex);
    result.left = this.getStory(leftIndex);
    result.down = this.getStory(downIndex);
    result.right = this.getStory(rightIndex);

    return result;
  };

  public getAllStories = () => {
    return this.list;
  };
}
