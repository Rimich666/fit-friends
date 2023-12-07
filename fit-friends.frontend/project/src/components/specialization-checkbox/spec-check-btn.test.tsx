import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SpecCheckBtn from './spec-check-btn';
import {TrainingType} from '../../enums';

describe('Component: SpecCheckBtn', () => {
  it('should render "SpecCheckBtn"', async () => {
    const onChangeHandle = jest.fn();
    render(
      <SpecCheckBtn callback={onChangeHandle} value={TrainingType.yoga} isChecked={false} disabled={false}/>
    );
    const input = screen.getByTestId(/spec-check-btn-yoga/i);
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
    userEvent.click(input);
    await waitFor (() => {
      expect(input).toBeChecked();
    });
  });
});
