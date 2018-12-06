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
  marker: undefined | number;
}

export class Checkboxes extends React.Component<any, CheckboxesState> {
  shiftPress = false;
  state = {
    checked: [] as string[],
    marker: undefined,
  };

  handleCheck = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    console.log(e.target.value);
    console.log(index);
    const { value } = e.target;
    this.setState(prevState => {
      return { marker: index, checked: [...prevState.checked, value] };
    });
  };

  handleKeydown = (e: KeyboardEvent) => {
    console.log(e.shiftKey);
    if (e.shiftKey) {
      e.preventDefault();
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

  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.marker}
        {data.map(({ label, name }: { label: string; name: string }, index) => (
          <label
            style={{
              display: 'block',
              marginBottom: '15px',
              cursor: 'pointer',
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
          </label>
        ))}
      </div>
    );
  }
}
