import {render, screen, waitFor} from '@testing-library/react';
import {Role} from '../../../enums';
import SelectRoleGroup from './select-role-group';
import userEvent from '@testing-library/user-event';

describe('Component: SelectRoleGroup', () => {
  it('should render "SelectRoleGroup', async () => {
    const onInputHandle = jest.fn();
    render(
      <SelectRoleGroup callback={onInputHandle} value={Role.sportsman}/>
    );
    const button = screen.getByTestId('select-role-button-coach');
    userEvent.click(button);
    await waitFor (() => {
      expect(button).toBeChecked();
    });
    expect(onInputHandle).toHaveBeenCalledWith('coach');
  });
});
