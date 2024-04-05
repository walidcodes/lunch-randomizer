import { Container, Button } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const initialList = [
    {
      name: "Fasting",
      oxalate: false,
      vitaminA: false,
      fodmap: false,
      gluten: false,
      meat: "other",
    },
  ];

  const initialContents = [
    { "high oxalate": ["🔹", -15] },
    { "high vitamin a": ["🅰️", -15] },
    { gluten: ["🍞", -10] },
    { "f.o.d.m.a.p": ["💨", -20] },
    { expensive: ["💲", -30] },
    {
      "red meat": ["🐄", -3],
      "white meat": ["🐔", -3],
      seafood: ["🐟", 12],
      other: ["🌱", 0],
    },
  ];

  const [list, setList] = useState(initialList);
  const [contents, setContents] = useState(initialContents);
  return (
    <Container
      className="p-2 mt-5 pb-5"
      style={{
        boxShadow: " 0 2px 0px #000, 0 2px 5px #000",
        borderRadius: "1rem",
      }}
    >
      <Container
        className="d-flex flex-column mt-5 criteria"
        style={{ width: "17rem", boxShadow: "0.3rem 0.3rem rgb(70,70,70)" }}
      >
        <h2 className="text-center mt-2">LUNCH PICKER</h2>
        <input
          className="mt-2 mb-2 p-1 inputText"
          placeholder="Meal Name"
        ></input>
        <div className="d-flex justify-content-between mb-2">
          <div className="d-flex gap-1" style={{ width: "15rem" }}>
            <div className="ttc" style={{ width: "50%" }}>
              <input
                className="mt-2 mb-2 inputText"
                placeholder="criteria"
                style={{ width: "100%" }}
              ></input>
            </div>
            <div className="tte" style={{ width: "20%" }}>
              <input
                className="mt-2 mb-2 inputText"
                placeholder="🔖"
                style={{ width: "100%" }}
              ></input>
            </div>
            <div className="ttx" style={{ width: "30%" }}>
              <input
                className="mt-2 mb-2 inputText"
                type="number"
                max="99"
                min="-99"
                placeholder="✖️"
                style={{ width: "100%" }}
              ></input>
            </div>
            <p
              style={{
                opacity: "1",
                pointerEvents: "none",
                transform: "translate(-1.46rem, 0.658rem)",
                filter: "invert(100%)",
              }}
            >
              %
            </p>
          </div>
          <Button
            className="btn-sm mt-2 mb-2 pb-2 align-self-center added-button"
            style={{
              borderRadius: "3rem",
              height: "2rem",
              background: "#f29102",
              border: "none",
              boxShadow: "0.1rem 0.1rem rgb(40, 40, 40)",
            }}
          >
            <b>+</b>
          </Button>
        </div>

        <Container
          className="d-flex flex-column p-0"
          style={{ width: "15.2rem", backgroundColor: "rgb(160,160,160)" }}
        >
          {contents.map((c, contentIndex) => {
            if (Object.keys(c).length === 1) {
              for (let prop in c)
                return (
                  <div
                    key={prop}
                    className="criteria d-flex justify-content-between"
                    style={{ boxShadow: "0.1rem 0.1rem rgb(40, 40, 40)" }}
                  >
                    <div>
                      <input
                        className="checkbox"
                        type="checkbox"
                        id="prop"
                      ></input>
                      <label htmlFor="prop">
                        {prop.trim().toLocaleUpperCase()}
                      </label>
                    </div>
                    <div>{c[prop].length ? c[prop] : prop[0]}</div>
                  </div>
                );
            } else {
              return (
                <div
                  key={`i${contentIndex}`}
                  className="criteria d-flex justify-content-between"
                >
                  <section>
                    {Object.keys(c).map((kc, i) => {
                      return (
                        <div id={i}>
                          <input
                            className="checkbox"
                            type="radio"
                            id={kc}
                            name={`c${contents[contentIndex]}`}
                          ></input>
                          <label htmlFor={kc}>{kc}</label>
                        </div>
                      );
                    })}
                  </section>
                  <section>
                    {Object.values(c).map((vc, i) => {
                      return <div key={i}>{vc}</div>;
                    })}
                  </section>
                </div>
              );
            }
          })}
        </Container>
        <Button
          className="btn-sm mt-2 mb-3 added-button"
          style={{
            background: "#f29102",
            border: "none",
            textShadow: "0.1rem 0.1rem #995c00",
            boxShadow: "0.1rem 0.1rem rgb(40, 40, 40)",
          }}
        >
          <b>ADD MEAL</b>
        </Button>
      </Container>
      <Container
        className="d-flex flex-column mt-5 criteria"
        style={{ width: "17rem", boxShadow: "0.3rem 0.3rem rgb(70,70,70)" }}
      >
        {list.map((m, i) => {
          return (
            <Container
              key={i}
              className="d-flex justify-content-between flex-row mt-1 mb-1"
            >
              <div className="meal">{m.name}</div>
              <Button
                className="btn-sm btn-outline-danger delete-button"
                style={{ background: "rgb(200,170,170)" }}
              >
                <b>-</b>
              </Button>
            </Container>
          );
        })}
      </Container>
    </Container>
  );
}

export default App;
