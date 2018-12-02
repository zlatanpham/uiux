import * as React from 'react';
import { data, Key } from './keycodes';
import styled from 'react-emotion';
import useKeyTrap from '../../hooks/useKeyTrap';

interface CodeProps {
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
}

const Container = styled('div')<{ keySize: number }>(props => ({
  width: `${(58 * props.keySize) / 4}px`,
}));

const Grid = styled('div')<{ keySize: number }>(props => ({
  display: 'grid',
  gridTemplateColumns: `repeat(58, ${props.keySize / 4}px)`,
  gridTemplateRows: `repeat(20, ${props.keySize / 4}px)`,
  gridColumnGap: '0px',
}));

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

const Code = styled('div')<MappedKey & { active: boolean }>(props => ({
  gridColumnStart: `${props.columnStart} `,
  gridColumnEnd: `${props.columnEnd} `,
  gridRowStart: props.rowStart,
  gridRowEnd: props.rowEnd,
}));

interface GridKeyboardProps {
  keySize?: number;
  KeyComponent?: React.ComponentType<KeyProps>;
}

export interface KeyProps {
  name: string;
  active: boolean;
  code: string;
}

const KeyButton = styled('div')<{ active: boolean }>(props => ({
  width: '100%',
  height: '100%',
  padding: '3px',
  boxSizing: 'border-box',
  div: {
    width: '100%',
    borderRadius: '5px',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    color: '#232323',
    boxShadow: props.active
      ? '0 2px 0 rgba(0,0,0,0.05)'
      : '0 2px 0 rgba(0,0,0,0.1)',
    border: '1px solid #ddd',
    backgroundColor: props.active ? '#eeeeee' : '#ffffff',
  },
}));

const DefaultKeyComponent = ({ name, active }: KeyProps) => (
  <KeyButton active={active}>
    <div>{name}</div>
  </KeyButton>
);

const GridKeyboard = ({
  keySize = 58,
  KeyComponent = DefaultKeyComponent,
}: GridKeyboardProps) => {
  const keyStack = useKeyTrap();
  return (
    <Container keySize={keySize}>
      <Grid keySize={keySize}>
        {keys.map(props => (
          <Code
            key={props.code}
            {...props}
            active={keyStack.indexOf(props.code) !== -1}
          >
            <KeyComponent
              {...{
                name: props.name,
                active: keyStack.indexOf(props.code) !== -1,
                code: props.code,
              }}
            />
          </Code>
        ))}
      </Grid>
    </Container>
  );
};

export default GridKeyboard;
