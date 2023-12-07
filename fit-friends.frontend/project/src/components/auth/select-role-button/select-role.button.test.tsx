import {render, screen} from '@testing-library/react';
import SelectRoleButton from './select-role-button';
import {Role} from '../../../enums';

describe('Component: SelectRoleButton', () => {
  it('should render "SelectRoleButton"', () => {
    const onInputHandle = jest.fn();
    render(
      <SelectRoleButton callback={onInputHandle} value={Role.sportsman} checked={false}/>
    );

    expect(screen.getByText(/Я хочу тренироваться/i)).toBeInTheDocument();
  });
});
