import {render, screen, waitFor} from '@testing-library/react';
import {ComponentVariant} from '../../component-variant';
import {Level, Role} from '../../enums';
import userEvent from '@testing-library/user-event';
import LevelRadioBlock from './level-radio-block';

describe('Component: UserGenderRadioGroup', () => {
  it('should render "UserGenderRadioGroup', async () => {
    const onInputHandle = jest.fn();
    render(
      <LevelRadioBlock variant={ComponentVariant.register} callback={onInputHandle} value={Level.amateur} role={Role.coach}/>
    );
    const button = screen.getByTestId('radio-button-beginner');
    userEvent.click(button);
    await waitFor (() => {
      expect(button).toBeChecked();
    });
    expect(button).toBeInTheDocument();
    expect(onInputHandle).toHaveBeenCalledWith('beginner');
  });
});
