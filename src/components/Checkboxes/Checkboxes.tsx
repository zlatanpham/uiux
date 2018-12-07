import * as React from 'react';

const data = [
  {
    label: 'check-1',
    name: 'Checkbox 1',
  },
  {
    label: 'check-2',
    name: 'Checkbox 2',
  },
  {
    label: 'check-3',
    name: 'Checkbox 3',
  },
  {
    label: 'check-4',
    name: 'Checkbox 4',
  },
  {
    label: 'check-5',
    name: 'Checkbox 5',
  },
  {
    label: 'check-6',
    name: 'Checkbox 6',
  },
  {
    label: 'check-7',
    name: 'Checkbox 7',
  },
  {
    label: 'check-8',
    name: 'Checkbox 8',
  },
];

interface CheckboxesState {
  checked: string[];
  marker: number;
}

export class Checkboxes extends React.Component<any, CheckboxesState> {
  shiftPress = false;
  state = {
    checked: [] as string[],
    marker: 0,
  };

  handleCheck = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    this.setState(prevState => {
      let checked: string[];
      const hasChecked = prevState.checked.indexOf(value) !== -1;
      const prevChecked =
        prevState.checked.indexOf(data[prevState.marker].label) !== -1;
      if (this.shiftPress) {
        let reserved: string[] = [];
        if (prevChecked && index !== prevState.marker) {
          let end = Math.max(index, prevState.marker);
          let start = Math.min(index, prevState.marker);
          for (let i = start; i <= end; i++) {
            reserved.push(data[i].label);
          }
          const containsAll =
            reserved.length <= prevState.checked.length &&
            reserved.reduce((a, c) => {
              return a ? prevState.checked.indexOf(c) !== -1 : false;
            }, true);

          if (containsAll) {
            checked = prevState.checked.filter(v => reserved.indexOf(v) === -1);
          } else {
            checked = [
              ...prevState.checked,
              ...reserved.filter(v => prevState.checked.indexOf(v) === -1),
            ];
          }

          return { marker: index, checked };
        }
      }

      if (hasChecked) {
        checked = prevState.checked.filter(v => v !== value);
      } else {
        checked = [...prevState.checked, value];
      }

      return { marker: index, checked };
    });
  };

  handleKeydown = (e: KeyboardEvent) => {
    if (e.shiftKey && !this.shiftPress) {
      this.shiftPress = true;
    }
  };

  handleKeyup = (e: KeyboardEvent) => {
    this.shiftPress = false;
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('keyup', this.handleKeyup);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('keyup', this.handleKeyup);
  }

  render() {
    return (
      <div>
        {data.map(({ label, name }: { label: string; name: string }, index) => (
          <div
            style={{
              display: 'block',
              marginBottom: '15px',
            }}
            key={label}
          >
            <input
              type="checkbox"
              value={label}
              checked={this.state.checked.indexOf(label) !== -1}
              onChange={this.handleCheck(index)}
            />
            {name}
          </div>
        ))}
      </div>
    );
  }
}
