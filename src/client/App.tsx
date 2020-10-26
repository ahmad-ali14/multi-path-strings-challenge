import * as React from "react";

import { Story } from "../server/controllers/stories/story.model";
import MultiString from "../server/controllers/stories/multiString.model";
import { Istory } from "../server/controllers/stories/stories.types";

const store = new MultiString();

type IstateKey =
  | "currentCenter"
  | "currentUp"
  | "currentLeft"
  | "currentRight"
  | "currentDown";

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      stateStore: [],
      currentCenter: {
        text: "",
        up: 1,
        left: 2,
        down: 3,
        right: 4,
      },
      currentUp: {
        text: "",
        up: null,
        left: null,
        down: 0,
        right: null,
      },
      currentLeft: {
        text: "",
        up: null,
        left: null,
        down: null,
        right: 0,
      },
      currentDown: {
        text: "",
        up: 0,
        left: null,
        down: null,
        right: null,
      },
      currentRight: {
        text: "",
        up: null,
        left: 0,
        down: null,
        right: null,
      },
      chosen: 0,
    };
  }

  makeFirstCenter = () => {
    store.addStoryObject(this.state.currentCenter);
    store.addStoryObject(this.state.currentUp);
    store.addStoryObject(this.state.currentLeft);
    store.addStoryObject(this.state.currentDown);
    store.addStoryObject(this.state.currentRight);

    this.setState({ stateStore: [...store.list] });
  };

  makeCenter = () => {
    let first = new Story();
    let second = new Story();
    let third = new Story();
    let fourth = new Story();

    const chosenStory = store.list[this.state.chosen];

    if (chosenStory.story.up !== null) {
      first = store.list[chosenStory.story.up] as Story;
    } else {
      first.story.down = this.state.chosen;
      store.addStoryObject(first.story);
      chosenStory.story.up = store.list.length - 1;
    }

    if (chosenStory.story.left !== null) {
      second = store.list[chosenStory.story.left] as Story;
    } else {
      second.story.right = this.state.chosen;
      store.addStoryObject(second.story);
      chosenStory.story.left = store.list.length - 1;
    }

    if (chosenStory.story.down !== null) {
      third = store.list[chosenStory.story.down] as Story;
    } else {
      third.story.up = this.state.chosen;
      store.addStoryObject(third.story);
      chosenStory.story.down = store.list.length - 1;
    }

    if (chosenStory.story.right !== null) {
      fourth = store.list[chosenStory.story.right] as Story;
    } else {
      fourth.story.left = this.state.chosen;
      store.addStoryObject(fourth.story);
      chosenStory.story.right = store.list.length - 1;
    }

    this.setState(
      {
        currentCenter: { ...chosenStory.story },
        currentUp: { ...first.story },
        currentLeft: { ...second.story },
        currentDown: { ...third.story },
        currentRight: { ...fourth.story },
      },
      () => {
        this.setState({ stateStore: [...store.list] });
      }
    );
  };

  async componentDidMount() {
    // fetch('/api/stories', { method: 'GET'}).then(res => res.json()).then(data => { console.log('data >>>>>>>>>>> ', data); });

    this.makeFirstCenter();
  }

  updateStory = (index, key) => {
    const story = store.list[index];
    story.setText(this.state[key].text);
    // delete this.state[key].text;
    this.setState({ stateStore: [...store.list] });
  };

  changeStoryTextonState = (stateKey: IstateKey, value) => {
    this.setState(({
      [stateKey]: {
        ...this.state[stateKey],
        text: value,
      },
    } as unknown) as IAppState);
  };

  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <h1 className="text-center p-3 m-1">
          Multi path String challenge By Ahmad Ali{" "}
        </h1>
        <h3 className="m-2 p-2 text-center"> choosen : {this.state.chosen} </h3>
        <h3 className="m-2 p-2 text-center">
          {" "}
          <button
            onClick={() => {
              this.setState({ chosen: 0 }, () => {
                this.makeCenter();
              });
            }}
          >
            Back to Start
          </button>{" "}
        </h3>
        <div style={{ display: "block" }} className="m-2 p-2">
          <p style={{ position: "relative", left: "30%" }} className="m-5 p-5">
            <label>up</label>
            <input
              value={this.state.currentUp.text}
              onChange={(e) =>
                this.changeStoryTextonState("currentUp", e.target.value)
              }
            />
            <button
              id={"save" + (this.state.chosen + 1).toString()}
              onClick={(e) => {
                this.updateStory(this.state.currentCenter.up, "currentUp");
              }}
            >
              save
            </button>
            {this.state.currentUp.text !== "" && (
              <button
                id={"center" + (this.state.chosen + 1).toString()}
                onClick={(e) => {
                  this.setState({ chosen: this.state.currentCenter.up }, () => {
                    this.makeCenter();
                  });
                }}
              >
                make center
              </button>
            )}
          </p>

          <p className="m-5 p-5">
            <div style={{ display: "inline" }}>
              <label>left</label>
              <input
                id={"input" + (this.state.chosen + 2).toString()}
                value={this.state.currentLeft.text}
                onChange={(e) =>
                  this.changeStoryTextonState("currentLeft", e.target.value)
                }
              />
              <button
                id={"save" + (this.state.chosen + 2).toString()}
                onClick={(e) => {
                  this.updateStory(
                    this.state.currentCenter.left,

                    "currentLeft"
                  );
                }}
              >
                save
              </button>
              <button
                id={"center" + (this.state.chosen + 2).toString()}
                onClick={(e) => {
                  this.setState(
                    { chosen: this.state.currentCenter.left },

                    () => {
                      this.makeCenter();
                    }
                  );
                }}
              >
                make center
              </button>
            </div>

            <div
              style={{
                position: "relative",
                left: "25%",
                display: "inline",
              }}
            >
              center{" "}
              <input
                value={this.state.currentCenter.text}
                onChange={(e) =>
                  this.changeStoryTextonState("currentCenter", e.target.value)
                }
              />
              <button
                id={this.state.chosen.toString()}
                onClick={(e) => {
                  this.updateStory(this.state.chosen, "currentCenter");
                }}
              >
                save
              </button>
            </div>

            <div
              style={{
                position: "relative",
                left: "30%",
                display: "inline",
              }}
            >
              <label> right</label>
              <input
                id={"input" + (this.state.chosen + 4).toString()}
                value={this.state.currentRight.text}
                onChange={(e) =>
                  this.changeStoryTextonState("currentRight", e.target.value)
                }
              />
              <button
                id={"save" + (this.state.chosen + 4).toString()}
                onClick={(e) => {
                  this.updateStory(
                    this.state.currentCenter.right,

                    "currentRight"
                  );
                }}
              >
                save
              </button>
              <button
                id={"center" + (this.state.chosen + 4).toString()}
                onClick={(e) => {
                  this.setState(
                    { chosen: this.state.currentCenter.right },

                    () => {
                      this.makeCenter();
                    }
                  );
                }}
              >
                make center
              </button>
            </div>
          </p>
          <p style={{ position: "relative", left: "30%" }} className="m-5 p-5">
            <label> down</label>
            <input
              id={"input" + (this.state.chosen + 3).toString()}
              value={this.state.currentDown.text}
              onChange={(e) => {
                this.changeStoryTextonState("currentDown", e.target.value);
              }}
            />
            <button
              id={"save" + (this.state.chosen + 3).toString()}
              onClick={(e) => {
                this.updateStory(this.state.currentCenter.down, "currentDown");
              }}
            >
              save
            </button>

            <button
              id={"center" + (this.state.chosen + 3).toString()}
              onClick={(e) => {
                this.setState({ chosen: this.state.currentCenter.down }, () => {
                  this.makeCenter();
                });
              }}
            >
              make center
            </button>
          </p>
        </div>
        <br />
      </div>
    );
  }
}

export interface IAppProps {}

export interface IAppState {
  currentCenter: Istory;
  currentLeft: Istory;
  currentRight: Istory;
  currentUp: Istory;
  currentDown: Istory;
  chosen: number;
  stateStore: Story[];
}

export default App;
