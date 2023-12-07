import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserGenderRadioGroup from './user-gender-radio-group';
import {ComponentVariant} from '../../../component-variant';
import {Gender} from '../../../enums';

describe('Component: UserGenderRadioGroup', () => {
  it('should render "UserGenderRadioGroup', async () => {
    const onInputHandle = jest.fn();
    render(
      <UserGenderRadioGroup variant={ComponentVariant.register} callback={onInputHandle} value={Gender.male}/>
    );
    const button = screen.getByTestId('radio-button-female');
    userEvent.click(button);
    await waitFor (() => {
      expect(button).toBeChecked();
    });
    expect(button).toBeInTheDocument();
    expect(onInputHandle).toHaveBeenCalledWith('female');
  });
});
