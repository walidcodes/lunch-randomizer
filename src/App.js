import { Container, Button } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import {
  SingleContent,
  TextlessSingleContent,
  MultiContent,
  TextlessMultiContent,
  ContentInput,
} from "./components/content.js";

//ideas:
// baseline chance reducer/increaser on content (already graphically presented)
// day chance reduce/increase on content (applies when meal containing content is eaten/selected). needs a new input box on contentInput component
// day chance reducer on meal (applies to meal when meal is eaten/selected).needs new input box on mealname input line

function App() {
  const initialContents = [
    { "high oxalate": ["🔹", -15, true] },
    { "high vitamin a": ["🅰️", -15, false] },
    { gluten: ["🍞", -10, false] },
    { "f.o.d.m.a.p": ["💨", -20, false] },
    { expensive: ["💲", -30, false] },
    {
      "red meat": ["🐄", -3, false],
      "white meat": ["🐔", -3, true],
      seafood: ["🐟", 12, false],
      other: ["🌱", 0, false],
    },
    {
      "red meat": ["🐄", -3, false],
      "white meat": ["🐔", -3, true],
      food: ["🐟", 12, false],
      other: ["🌱", 0, false],
    },
  ];

  const initialList = [
    {
      name: "FASTING",
      contents: [],
    },
  ];

  const [contents, setContents] = useState(initialContents);
  const [typingContent, setTypingContent] = useState(false);
  const [contentAmount, setContentAmount] = useState(0);
  const [list, setList] = useState(initialList);
  const [mealName, setMealName] = useState("");

  for (let meal of list) {
    for (let content of contents) {
      for (let singleContent of Object.keys(content)) {
        meal[singleContent] = false;
      }
    }
  }

  function handleMealName(e) {
    setMealName(e.target.value);
  }

  function handleAddMeal() {
    setList([
      ...list,
      { name: mealName.trim().toUpperCase(), contents: contents },
    ]);
    setMealName("");
  }

  function handleTypingContent() {
    setTypingContent(!typingContent);
  }

  function handleContentAmount(e) {
    if (e.target.value >= 0 && e.target.value < 8) {
      for (let i = 0; i <= e.target.value; i++) {
        setContentAmount(i);
      }
    }
  }

  function handleAddContent() {}

  const mealsArr = [];
  list.forEach((meal) => {
    mealsArr.push(meal.name);
  });

  return (
    <Container className="p-2 mt-5 pb-5 d-flex align-items-start">
      <Container
        className="d-flex flex-column mt-5 criteria"
        style={{
          width: "17rem",
          boxShadow: "0.3rem 0.3rem rgb(70,70,70)",
        }}
      >
        <h2 className="text-center mt-2">LUNCH PICKER</h2>
        <div className="d-flex flew-row gap-1">
          <input
            className="mt-2 mb-2 p-1 inputText"
            placeholder="Meal Name"
            onChange={handleMealName}
            value={mealName}
            style={{ width: "80%" }}
            onKeyUp={(e) => {
              if (e.code === "ArrowUp" && contentAmount < 7)
                setContentAmount(contentAmount + 1);
              if (e.code === "ArrowDown" && contentAmount > 0)
                setContentAmount(contentAmount - 1);
            }}
          ></input>
        </div>

        <div className="d-flex gap-1">
          <input
            id="contentAmount"
            type="number"
            min="0"
            max="7"
            className="mt-2 mb-2 p-1 inputText"
            placeholder="?/7"
            style={{ width: "20%" }}
            value={contentAmount}
            onChange={handleContentAmount}
          ></input>

          <Button
            // stretch height 100
            id="deleteContent"
            className="btn-sm mt-2 mb-2 pb-2 removed-button"
            style={{
              width: "40%",
              borderRadius: "3rem",
              background: "rgb(100,20,20)",
              border: "solid red 0.1rem",
              boxShadow: "0.1rem 0.1rem rgb(40, 40, 40)",
            }}
          >
            <b>-</b>
          </Button>
          {typingContent === true ? (
            <Button
              className="btn-sm mt-2 mb-2 pb-2 align-self-stretch added-button"
              style={{
                width: "40%",
                borderRadius: "3rem",
                background: "#f29102",
                border: "none",
                boxShadow: "0.1rem 0.1rem rgb(40, 40, 40)",
                transform: "translateX(-0.2rem)",
              }}
              onClick={handleAddContent}
            >
              <b>+</b>
            </Button>
          ) : (
            <Button
              className="btn-sm mt-2 mb-2 pb-2 align-self-stretch added-button"
              style={{
                width: "40%",
                borderRadius: "3rem",
                background: "transparent",
                border: "none",
                boxShadow: "0.1rem 0.1rem rgb(40, 40, 40)",
                transform: "translateX(-0.2rem)",
              }}
              disabled
            >
              <b>+</b>
            </Button>
          )}
        </div>
        {contentAmount > 0 && (
          <div className="d-flex" style={{ width: "15rem" }}>
            <div className="d-flex flex-column">
              {Array(contentAmount)
                .fill(true)
                .map((item, index) => (
                  <ContentInput
                    handleTypingContent={handleTypingContent}
                    typingContent={typingContent}
                  />
                ))}
            </div>
          </div>
        )}
        <Container
          className="d-flex flex-column p-0"
          style={{ width: "15.2rem", backgroundColor: "rgb(160,160,160)" }}
        >
          {contents.map((c, contentIndex) => {
            if (Object.keys(c).length === 1) {
              for (let prop in c)
                return (
                  <SingleContent
                    key={prop}
                    c={c}
                    prop={prop}
                    checked={c[prop][2]}
                    checking={() =>
                      setContents([
                        ...contents.slice(0, contents.indexOf(c)),
                        { ...c, [prop]: [c[prop][0], c[prop][1], !c[prop][2]] },
                        ...contents.slice(contents.indexOf(c) + 1),
                      ])
                    }
                  />
                );
            } else {
              for (let prop in c)
                return (
                  <MultiContent
                    key={contentIndex}
                    c={c}
                    contents={contents}
                    radioed={c[prop][2]}
                  />
                );
            }
          })}
        </Container>
        {!mealsArr.includes(mealName.trim().toUpperCase()) &&
        mealName.length > 0 ? (
          <Button
            className="btn-sm mt-2 mb-3 added-button"
            style={{
              background: "#f29102",
              border: "none",
              textShadow: "0.1rem 0.1rem #995c00",
              boxShadow: "0.1rem 0.1rem rgb(40, 40, 40)",
            }}
            onClick={handleAddMeal}
          >
            <b>ADD MEAL</b>
          </Button>
        ) : (
          <Button
            className="btn-sm mt-2 mb-3 added-button"
            style={{
              background: "transparent",
              border: "none",
              textShadow: "0.1rem 0.1rem #995c00",
              boxShadow: "0.1rem 0.1rem rgb(40, 40, 40)",
            }}
            disabled
          >
            <b>ADD MEAL</b>
          </Button>
        )}
        <Button className="btn-lg  mb-3 rando-button pt-2 pb-2">
          <b>RANDOMISE</b>
        </Button>
      </Container>
      <Container
        className="d-flex flex-column mt-5 criteria"
        style={{
          width: "15rem",
          boxShadow: "0.3rem 0.3rem rgb(70,70,70)",
        }}
      >
        {list.map((m, i) => {
          return (
            <Container
              key={m.name}
              className="d-flex align-items-center flex-column mt-1 mb-1 ps-3"
            >
              <h2 className="text-center mt-2">​​​ ​</h2>
              <h5
                className="meal text-center mb-2 p-1"
                style={{
                  width: "100%",
                  border: "solid black 0.1rem",
                  borderRadius: "0.4rem",
                  background: "#323232",
                  textShadow: "0.1rem 0.1rem black",
                  color: "#A09149",
                }}
              >
                {m.name}
              </h5>
              <Container className="d-flex align-items-between flex-column-reverse p-0">
                <section>
                  <div
                    className="d-flex flex-row flex-wrap justify-content-between p-1"
                    style={{
                      background: "grey",
                      borderRadius: "0.4rem",
                      boxShadow: "0.1rem 0.1rem rgb(40, 40, 40)",
                    }}
                  >
                    {m.contents.map((c, contentIndex) => {
                      if (Object.keys(c).length === 1) {
                        for (let prop in c)
                          return (
                            <TextlessSingleContent
                              key={prop}
                              c={c}
                              prop={prop}
                              checkedInMeal={c[prop][2]}
                              checkingInMeal={() =>
                                setList([
                                  ...list.slice(0, list.indexOf(m)),
                                  {
                                    name: m.name,
                                    contents: [
                                      ...m.contents.slice(
                                        0,
                                        m.contents.indexOf(c)
                                      ),
                                      {
                                        ...c,
                                        [prop]: [
                                          c[prop][0],
                                          c[prop][1],
                                          !c[prop][2],
                                        ],
                                      },
                                      ...m.contents.slice(
                                        m.contents.indexOf(c) + 1
                                      ),
                                    ],
                                  },
                                  ...list.slice(list.indexOf(m) + 1),
                                ])
                              }
                            />
                          );
                      }
                    })}
                    <div style={{ width: "100%" }}></div>
                    {contents.map((c, contentIndex) => {
                      if (Object.keys(c).length !== 1) {
                        return (
                          <TextlessMultiContent
                            c={c}
                            contents={contents}
                            contentIndex={contentIndex}
                          />
                        );
                      }
                    })}
                  </div>
                </section>
                <Button
                  className="btn-sm btn-outline-danger delete-button mb-2"
                  style={{
                    background: "rgb(200,170,170)",
                    boxShadow: "0.1rem 0.1rem rgb(40, 40, 40)",
                  }}
                >
                  <b>-</b>
                </Button>
              </Container>
            </Container>
          );
        })}
      </Container>
    </Container>
  );
}

export default App;
