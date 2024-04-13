import { useState } from "react";

export function ContentInput({ handleTypingContent, typingContent }) {
  const [contentName, setContentName] = useState("");

  function handleContentName(e) {
    setContentName(e.target.value);
    if (e.target.value.length > 0 && !typingContent) {
      handleTypingContent();
    } else if (e.target.value.length === 0 && typingContent) {
      handleTypingContent();
    }
  }

  return (
    <div className="d-flex flex-row gap-1">
      <div className="ttc" style={{ width: "50%" }}>
        <input
          className="mt-2 mb-2 inputText"
          placeholder="criteria"
          onChange={handleContentName}
          value={contentName}
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
  );
}

export function SingleContent({ c, prop, checked, checking }) {
  return (
    <div
      key={prop}
      className="criteria d-flex justify-content-between"
      style={{ boxShadow: "0.1rem 0.1rem rgb(40, 40, 40)" }}
    >
      <div>
        {checked ? (
          <input
            className="checkbox"
            type="checkbox"
            checked
            id={prop.trim()}
            onChange={checking}
          ></input>
        ) : (
          <input
            className="checkbox"
            type="checkbox"
            onChange={checking}
            id={prop.trim()}
          ></input>
        )}

        <label htmlFor={prop.trim()}>{prop.trim().toLocaleUpperCase()}</label>
      </div>
      <div>
        {c[prop][0].length
          ? c[prop][0]
          : `(${prop.trim()[0]}${prop.trim()[prop.trim().length - 1]})`}
      </div>
    </div>
  );
}

export function TextlessSingleContent({
  c,
  prop,
  checkedInMeal,
  checkingInMeal,
}) {
  // idea: lock checkboxes of meal cards unless unlocked with button
  return (
    <div
      key={prop}
      className="criteria d-flex justify-content-between mb-2 p-1"
      style={{
        background: "#A0A0A0",
        boxShadow: "0.1rem 0.1rem rgb(40, 40, 40)",
        width: "3rem",
      }}
    >
      <div>
        {checkedInMeal ? (
          <input
            className="checkbox"
            type="checkbox"
            checked
            onChange={checkingInMeal}
            id={prop.trim()}
          ></input>
        ) : (
          <input
            className="checkbox"
            type="checkbox"
            onChange={checkingInMeal}
            id={prop.trim()}
          ></input>
        )}
      </div>
      <div>
        {c[prop][0].length
          ? c[prop][0]
          : `(${prop.trim()[0]}${prop.trim()[prop.trim().length - 1]})`}
      </div>
    </div>
  );
}

export function MultiContent({ c, contentIndex, contents, radioed }) {
  const randu = Math.random();
  return (
    <div
      key={`${c[Object.keys(c)[0]]}${c[Object.keys(c)[0]]}`}
      className="criteria d-flex justify-content-between"
    >
      <section>
        {Object.keys(c).map((kc, i) => {
          return (
            <div id={`${kc}0`}>
              {radioed ? (
                <input
                  className="checkbox"
                  type="radio"
                  id={kc}
                  checked
                  name={`c${contents[contentIndex]}}${randu}`}
                ></input>
              ) : (
                <input
                  className="checkbox"
                  type="radio"
                  id={kc}
                  name={`c${contents[contentIndex]}${randu}`}
                ></input>
              )}

              <label htmlFor={kc}>{kc}</label>
            </div>
          );
        })}
      </section>
      <section>
        {Object.values(c).map((vc, i) => {
          return (
            <div key={vc}>
              <div>
                {vc[0].length
                  ? vc[0]
                  : Object.keys(c)[i].trim().indexOf(" ") > -1
                  ? `(${Object.keys(c)[i][0]}${
                      Object.keys(c)[i][
                        Object.keys(c)[i].trim().indexOf(" ") + 1
                      ]
                    })`
                  : `(${Object.keys(c)[i][0]}${
                      Object.keys(c)[i][Object.keys(c)[i].length - 1]
                    })`}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export function TextlessMultiContent({ c, contents, contentIndex }) {
  return (
    <div
      key={Object.keys(c)}
      className="criteria d-flex justify-content-between"
      style={{ background: "#A0A0A0", width: "3rem" }}
    >
      <section>
        {Object.keys(c).map((kc, i) => {
          return (
            <div id={Object.keys(kc)}>
              <input
                className="checkbox"
                type="radio"
                id={kc}
                name={`c${contents[contentIndex]}`}
              ></input>
            </div>
          );
        })}
      </section>
      <section>
        {Object.values(c).map((vc, i) => {
          return (
            <div key={vc}>
              <div>
                {vc[0].length
                  ? vc[0]
                  : Object.keys(c)[i].trim().indexOf(" ") > -1
                  ? `(${Object.keys(c)[i][0]}${
                      Object.keys(c)[i][
                        Object.keys(c)[i].trim().indexOf(" ") + 1
                      ]
                    })`
                  : `(${Object.keys(c)[i][0]}${
                      Object.keys(c)[i][Object.keys(c)[i].length - 1]
                    })`}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
