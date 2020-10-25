import * as React from "react";

import { Story } from "../server/controllers/stories/story.model";
import MultiString from "../server/controllers/stories/multiString.model";

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
        down: null,
        right: null,
      },
      currentLeft: {
        text: "",
        up: null,
        left: null,
        down: null,
        right: null,
      },
      currentDown: {
        text: "",
        up: null,
        left: null,
        down: null,
        right: null,
      },
      currentRight: {
        text: "",
        up: null,
        left: null,
        down: null,
        right: null,
      },
      chosen: 0,
    };
  }

  makeFirstCenter = () => {
    this.setState(
      {
        currentUp: { ...this.state.currentUp, down: this.state.chosen },
        currentLeft: { ...this.state.currentLeft, right: this.state.chosen },
        currentDown: { ...this.state.currentDown, up: this.state.chosen },
        currentRight: { ...this.state.currentRight, left: this.state.chosen },
      },

      () => {
        console.log("s after change >>>>>>>>", this.state);
        store.addStoryObject(this.state.currentCenter);
        store.addStoryObject(this.state.currentUp);
        store.addStoryObject(this.state.currentLeft);
        store.addStoryObject(this.state.currentDown);
        store.addStoryObject(this.state.currentDown);

        console.log("store >>>>>>>>>>>>", store.list);

        this.setState(
          {
            currentCenter: { ...store.list[this.state.chosen] },
            currentUp: { ...store.list[this.state.chosen + 1] },
            currentLeft: { ...store.list[this.state.chosen + 2] },
            currentDown: { ...store.list[this.state.chosen + 3] },
            currentRight: { ...store.list[this.state.chosen + 4] },
          },
          () => {
            this.setState({ stateStore: [...store.list] });
          }
        );
      }
    );
  };

  makeCenter = () => {
    let first = new Story();
    let second = new Story();
    let third = new Story();
    let fourth = new Story();

    const chosenStory = store.list[this.state.chosen];

    console.log("chosenStory >>>>>>>>>", chosenStory);

    if (chosenStory.story.up !== null) {
      first = { ...store.list[chosenStory.story.up] } as Story;
    } else {
      first.story.down = this.state.chosen;
      store.addStoryObject(first);
      const addedIndex = store.getStoryIndex(first);
      chosenStory.story.up = store.list.length - 1;
      console.log("length on third", store.list.length - 1);
    }

    if (chosenStory.story.left !== null) {
      second = { ...store.list[chosenStory.story.left] } as Story;
    } else {
      second.story.right = this.state.chosen;
      store.addStoryObject(second);
      const addedIndex = store.getStoryIndex(second);
      chosenStory.story.left = store.list.length - 1;
      console.log("length on third", store.list.length - 1);
    }

    if (chosenStory.story.down !== null) {
      console.log("thrd down existed", third);
      third = { ...store.list[chosenStory.story.down] } as Story;
      console.log("third saved", third);
    } else {
      console.log(" No third down", third);
      third.story.up = this.state.chosen;
      store.addStoryObject(third);
      console.log("third saved to the store", third);
      const addedIndex = store.getStoryIndex(third);
      chosenStory.story.down = store.list.length - 1;
      console.log("length on third", store.list.length - 1);
    }

    if (chosenStory.story.right !== null) {
      fourth = { ...store.list[chosenStory.story.right] } as Story;
    } else {
      fourth.story.left = this.state.chosen;
      store.addStoryObject(fourth);
      const addedIndex = store.getStoryIndex(fourth);
      chosenStory.story.right = store.list.length - 1;
      console.log("length on third", store.list.length - 1);
    }

    console.log("finaly center >>>>>>>>>", chosenStory);

    this.setState(
      {
        currentCenter: { ...chosenStory },
        currentUp: { ...first },
        currentLeft: { ...second },
        currentDown: { ...third },
        currentRight: { ...fourth },
      },
      () => {
        this.setState({ stateStore: [...store.list] }, () => {
          console.log("centered store >>>>>>>>>>>>", store.list);
          console.log("centered state >>>>>>>>>>>", this.state);
        });
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
    delete this.state[key].text;
    this.setState({ stateStore: [...store.list] }, () => {
      console.log("saving to store >>>> ", store.list);
    });
  };

  changeStoryTextonState = (stateKey: IstateKey, value) => {
    const statValue = this.state[stateKey];
    console.log(statValue);

    this.setState(({
      [stateKey]: {
        // up: statValue.up,
        // left: statValue.left,
        // down: statValue.down,
        // right: statValue.right,
        ...this.state[stateKey],
        text: value,
      },
    } as unknown) as IAppState);
  };

  render() {
    return (
      <div style={{ maxWidth: "100vw" }}>
        <h1 className="text-center p-3 m-1">
          Multi path String challenge By Ahmad Ali{" "}
        </h1>
        <h3 className="m-2 p-2 text-center"> choosen : {this.state.chosen} </h3>
        <div style={{ display: "block" }} className="m-2 p-2">
          <p style={{ position: "relative", left: "40%" }} className="m-5 p-5">
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
                this.updateStory(this.state.chosen + 1, "currentUp");
              }}
            >
              save
            </button>
            <button
              id={"center" + (this.state.chosen + 1).toString()}
              onClick={(e) => {
                console.log("making center >>>>>>", this.state.currentUp.text);
                this.setState({ chosen: this.state.chosen + 1 }, () => {
                  this.makeCenter();
                });
              }}
            >
              make center
            </button>
            )
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
                  this.updateStory(this.state.chosen + 2, "currentLeft");
                }}
              >
                save
              </button>
              <button
                id={"center" + (this.state.chosen + 2).toString()}
                onClick={(e) => {
                  this.setState({ chosen: this.state.chosen + 2 }, () => {
                    this.makeCenter();
                  });
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
                left: "40%",
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
                  this.updateStory(this.state.chosen + 4, "currentRight");
                }}
              >
                save
              </button>
              <button
                id={"center" + (this.state.chosen + 4).toString()}
                onClick={(e) => {
                  this.setState({ chosen: this.state.chosen + 4 }, () => {
                    this.makeCenter();
                  });
                }}
              >
                make center
              </button>
            </div>
          </p>
          <p style={{ position: "relative", left: "40%" }} className="m-5 p-5">
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
                this.updateStory(this.state.chosen + 3, "currentDown");
              }}
            >
              save
            </button>

            <button
              id={"center" + (this.state.chosen + 3).toString()}
              onClick={(e) => {
                this.setState({ chosen: this.state.chosen + 3 }, () => {
                  this.makeCenter();
                });
              }}
            >
              make center
            </button>
          </p>
        </div>
        <pre className="text-center">
          {/* {JSON.stringify(this.state.stateStore, null, 2)} */}
        </pre>
        <br />{" "}
        <p>
          ___________________________________________________________________________-
        </p>
        <br />
        <pre>center{JSON.stringify(this.state.currentCenter)}</pre>
        <br />
        <pre>up{JSON.stringify(this.state.currentUp)}</pre>
        <br />
        <pre>down{JSON.stringify(this.state.currentDown)}</pre>
        <br />
        <pre>right{JSON.stringify(this.state.currentRight)}</pre>
      </div>
    );
  }
}

export interface IAppProps {}

export interface IAppState {
  currentCenter: any;
  currentLeft: any;
  currentRight: any;
  currentUp: any;
  currentDown: any;
  chosen: number;
  stateStore: Story[];
}

export default App;
