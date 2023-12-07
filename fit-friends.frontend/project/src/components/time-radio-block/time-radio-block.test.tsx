import {render, screen, waitFor} from '@testing-library/react';
import {TrainingTime} from '../../enums';
import userEvent from '@testing-library/user-event';
import TimeRadioBlock from './time-radio-block';

describe('Component: UserGenderRadioGroup', () => {
  it('should render "UserGenderRadioGroup', async () => {
    const onInputHandle = jest.fn();
    render(
      <TimeRadioBlock callback={onInputHandle} value={TrainingTime['10 - 30']}/>
    );
    const button = screen.getByTestId('radio-button-30 - 50');
    userEvent.click(button);
    await waitFor (() => {
      expect(button).toBeChecked();
    });
    expect(button).toBeInTheDocument();
    expect(onInputHandle).toHaveBeenCalledWith('30 - 50');
  });
});
