import * as React from 'react';
import styled from '@emotion/styled';

export const Container = styled('div')({
  // borderRadius: '5px',
  // textAlign: 'left',
  // width: '960px',
  // color: '#54595e',
  // fontSize: '13px',
  // fontWeight: '500',
  // boxShadow: '0 0 10px #f4f5f6',
  // border: '1px solid #e0eaf0',
});

export const Header = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '18px 20px',
  borderBottom: '1px solid #e0eaf0',
  alignItems: 'center',
});

export const HeaderLeft = styled('div')({
  // h3: {
  //   fontSize: '20px',
  //   fontWeight: '500',
  //   margin: '0 0 4px 0',
  //   color: '#000614',
  // },
  // h6: {
  //   fontSize: '13px',
  //   margin: '0',
  //   fontWeight: '500',
  //   color: '#9c9da0',
  // },
});

export const Grid = styled('div')({
  display: 'grid',
  gridTemplateColumns: '160px repeat(10, 80px)',
  gridTemplateRows: '40px repeat(5, 50px)',
});

export const HeaderRight = styled('div')({});

export const TableHeader = styled('div')((props: { index: number }) => ({
  backgroundColor: '#f4f7ff',
  gridRowStart: '1',
  gridRowEnd: '2',
  gridColumnStart: `${props.index + 1}`,
  gridColumnEnd: `${props.index + 2}`,
  borderRight:
    props.index === tableHeaderContent.length - 1
      ? 'none'
      : '1px solid #e0eaf0',
  borderBottom: '1px solid #e0eaf0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: props.index === 0 ? 'flex-start' : 'center',
  padding: '0 20px',
}));

export const EmptyBox = styled('div')(
  (props: { rIndex: number; cIndex: number }) => ({
    gridRowStart: `${props.rIndex + 2}`,
    gridRowEnd: `${props.rIndex + 3}`,
    gridColumnStart: `${props.cIndex + 2}`,
    gridColumnEnd: `${props.cIndex + 3}`,
    borderBottom:
      props.rIndex === emptyBoxRowContent.length - 1
        ? 'none'
        : `1px solid #e0eaf0`,
    borderRight:
      props.cIndex === emptyBoxColumnContent.length - 1
        ? 'none'
        : `1px solid #e0eaf0`,
  }),
);

export const DateBlock = styled('div')((props: { index: number }) => ({
  gridRowStart: `${props.index + 2}`,
  gridRowEnd: `${props.index + 3}`,
  gridColumnStart: '1',
  gridColumnEnd: '2',
  borderRight: '1px solid #e0eaf0',
  borderBottom:
    props.index === dateColumnContent.length - 1 ? 'none' : '1px solid #e0eaf0',
  fontSize: '14px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px',
}));

export const ScheduleBlock = styled('div')((props: ScheduleBlockProps) => ({
  backgroundColor: props.backgroundColor,
  color: props.color,
  gridColumn: `${props.column}/ span ${props.columnSpan}`,
  gridRow: `${props.row}`,
  alignSelf: 'center',
  margin: '5px',
  height: '24px',
  lineHeight: '23px',
  padding: '0px 10px',
  fontSize: '12px',
  borderRadius: 9999,
  position: 'relative',
}));

export const TimeLine = styled('div')({
  position: 'relative',
  backgroundColor: '#eb373e',
  gridColumn: '4 / span 1',
  gridRowStart: '1',
  gridRow: '1 / span 7',
  transform: 'translateX(20px)',
  width: '2px',
  'span:first-of-type,span:last-of-type': {
    width: '10px',
    height: '10px',
    display: 'block',
    borderRadius: '999px',
    position: 'absolute',
    backgroundColor: '#eb373e',
    top: '-5px',
    left: '-4px',
  },
  'span:last-child': {
    top: 'auto',
    bottom: '-5px',
  },
});

export const CreateButton = styled('div')({
  fontSize: '13px',
  backgroundColor: '#5647f1',
  color: '#fff',
  padding: '7px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
});

const emptyBoxColumnContent = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const emptyBoxRowContent = [0, 1, 2, 3, 4];

const tableHeaderContent = [
  'DATE / TIME',
  '9AM',
  '10AM',
  '11AM',
  '12AM',
  '1PM',
  '2PM',
  '3PM',
  '4PM',
  '5PM',
  '6PM',
];

const dateColumnContent = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thurday',
  'Friday',
];

export interface ScheduleBlockProps {
  backgroundColor: string;
  color: string;
  column: number;
  columnSpan: number;
  row: number;
}

export interface ExtendScheduleBlockProps extends ScheduleBlockProps {
  content: string;
}

const schedule: ExtendScheduleBlockProps[] = [
  {
    backgroundColor: '#FFE4D9',
    color: '#de7e4c',
    column: 2,
    columnSpan: 2,
    row: 2,
    content: 'Team standup',
  },
  {
    backgroundColor: '#eabff9',
    color: '#8668a8',
    column: 9,
    columnSpan: 2,
    row: 2,
    content: 'Shakeholder interview',
  },
  {
    backgroundColor: '#41b8fe',
    color: '#ffffff',
    column: 4,
    columnSpan: 3,
    row: 3,
    content: 'Product meeting',
  },
  {
    backgroundColor: '#bae9d9',
    color: '#587182',
    column: 6,
    columnSpan: 4,
    row: 4,
    content: 'Feature planning',
  },
  {
    backgroundColor: '#41b8fe',
    color: '#ffffff',
    column: 10,
    columnSpan: 2,
    row: 4,
    content: 'Meeting',
  },
  {
    backgroundColor: '#eabff9',
    color: '#8668a8',
    column: 2,
    columnSpan: 3,
    row: 5,
    content: 'Feature planning',
  },
  {
    backgroundColor: '#FFE4D9',
    color: '#de7e4c',
    column: 6,
    columnSpan: 2,
    row: 5,
    content: 'Feature planning',
  },
  {
    backgroundColor: '#edebfd',
    color: '#5647f1',
    column: 3,
    columnSpan: 3,
    row: 6,
    content: 'Feature planning',
  },
  {
    backgroundColor: '#bae9d9',
    color: '#587182',
    column: 8,
    columnSpan: 3,
    row: 6,
    content: 'Feature planning',
  },
];

export class GridCalendar extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <HeaderLeft>
            <h3>August 29, 2017</h3>
            <h6>Tuesday</h6>
          </HeaderLeft>

          <HeaderRight>
            <CreateButton>Create event</CreateButton>
          </HeaderRight>
        </Header>
        <Grid>
          {tableHeaderContent.map((c, i) => (
            <TableHeader index={i} key={c}>
              {c}
            </TableHeader>
          ))}

          {dateColumnContent.map((c, i) => (
            <DateBlock index={i} key={c}>
              {c}
            </DateBlock>
          ))}

          {emptyBoxColumnContent.map(c => {
            return emptyBoxRowContent.map(r => (
              <EmptyBox cIndex={c} rIndex={r} key={r} />
            ));
          })}

          <TimeLine>
            <span />
            <span />
          </TimeLine>
          {schedule.map(({ content, ...props }, i) => (
            <ScheduleBlock {...props} key={i}>
              {content}
            </ScheduleBlock>
          ))}
        </Grid>
      </Container>
    );
  }
}
