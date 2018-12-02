import * as React from 'react';
import { shallow } from 'enzyme';
import GridKeyboard from '../../GridKeyboard';

const T = () => <div>1</div>;
// https://github.com/facebook/react/issues/14091
describe('<GridKeyboard/>', () => {
  it('Root should be wrapped by KeyTrap render Props', () => {
    const wrapper = shallow(<GridKeyboard />);
    expect(wrapper.exists('KeyTrap')).toBeTruthy();
  });
});
