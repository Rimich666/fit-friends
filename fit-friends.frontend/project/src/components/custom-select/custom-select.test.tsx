import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomSelect from './custom-select';
import {UserLocation} from '../../enums';
import React from 'react';

describe('Component: CustomSelect', () => {
  it('should render "CustomSelect"', async () => {
    const onSelect = jest.fn();

    render(
      <CustomSelect
        title={'Ваша локация'}
        options={UserLocation}
        callback={onSelect}
        errorMessage={''}
        disabled={false}
      />
    );
    const button = screen.getByTestId(/arrow-button/i);
    const list = screen.getByTestId(/select-list/i);
    const item = screen.getByTestId(/select-item-pioneer/i);
    expect(button).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(item).toBeInTheDocument();
    userEvent.click(item);
    await waitFor (() => {
      expect(onSelect).toHaveBeenCalledWith('pioneer');
    });
  });
});
