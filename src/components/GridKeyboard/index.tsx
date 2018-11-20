import * as React from "react";
import styles from "./style.module.scss";
import { data, Key } from "./keycodes";
import styled from "react-emotion";

const mapData = data.map((d, i) => {
  return { ...d, columnStart: i * d.span + 1, columnEnd: (i + 1) * d.span + 1 };
});

interface CodeProps {
  columnStart: number;
  columnEnd: number;
}

const Code = styled("div")<CodeProps>(props => ({
  gridColumnStart: `${props.columnStart} `,
  gridColumnEnd: `${props.columnEnd} `,
  border: "1px solid #ddd"
}));

const GridKeyboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {mapData.map((key, index: number) => (
          <Code key={key.code} {...key}>
            {key.name}
          </Code>
        ))}
      </div>
    </div>
  );
};

export default GridKeyboard;
