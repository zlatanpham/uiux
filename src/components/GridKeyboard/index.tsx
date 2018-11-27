import * as React from 'react';
import styles from './style.module.scss';
import { data, Key } from './keycodes';
import styled from 'react-emotion';

interface CodeProps {
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
}

interface MappedKey extends CodeProps, Key {}

const keys: MappedKey[] = data.reduce(
  (a: MappedKey[], c: Key[], rowIndex: number) => {
    let colSpan = 0;
    let prevColSpan = 0;
    const k = c.map((column: Key, colIndex: number) => {
      if (!column.sameColumn) {
        prevColSpan = colSpan;
        colSpan += column.columnSpan;
      }
      return {
        ...column,
        columnStart: prevColSpan + 1,
        columnEnd: colSpan + 1,
        rowStart: rowIndex * 4 + column.rowStartAt + 1,
        rowEnd: rowIndex * 4 + column.rowSpan + column.rowStartAt + 1,
      };
    });
    return [...a, ...k];
  },
  [],
);

const Code = styled('div')<MappedKey>(props => ({
  gridColumnStart: `${props.columnStart} `,
  gridColumnEnd: `${props.columnEnd} `,
  gridRowStart: props.rowStart,
  gridRowEnd: props.rowEnd,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #ddd',
}));

const GridKeyboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {keys.map(props => (
          <Code key={props.code} {...props}>
            {props.name}
          </Code>
        ))}
      </div>
    </div>
  );
};

export default GridKeyboard;
