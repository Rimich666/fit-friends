import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextArea from './text-area';

describe('Component: TextArea', () => {
  it('should render "TextArea"', async () => {
    const onInputHandle = jest.fn();
    render(
      <TextArea callback={onInputHandle} errorMessage={''} class={'user-info__textarea'}/>
    );
    userEvent.type(screen.getByTestId('text-area'), 'keks@mail.ru');
    await waitFor (() => {
      expect(screen.getByDisplayValue(/keks@mail.ru/i)).toBeInTheDocument();
    });
  });
});
