import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterCheckbox from './filter.checkbox';

describe('Component: FilterCheckbox', () => {
  it('should render "FilterCheckbox"', async () => {
    const callback = jest.fn();
    const type = '';
    const value = 'value';
    const isCheck = false;
    const label = '';
    const formClass = '';

    render(
      <FilterCheckbox {...{callback, value, type, isCheck, label, formClass}}/>
    );
    userEvent.click(screen.getByTestId('check-value'));
    await waitFor (() => {
      expect(callback).toBeCalledWith('value', true);
    });
  });
});
