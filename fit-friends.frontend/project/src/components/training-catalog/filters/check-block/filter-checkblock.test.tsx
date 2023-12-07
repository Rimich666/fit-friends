import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import FilterCheckBlock from './filter-check-block';
import {ComponentVariant} from '../../../../component-variant';
import {initCheckBox} from './init-check-box';
import {CheckType, FormClass} from '../../variances';

const callback = jest.fn();
const variant = ComponentVariant.userCatalog;
const type = CheckType.specialization;
const checked = initCheckBox(variant)[type];
const formClass = FormClass[variant as keyof typeof FormClass];

const mockStore = configureMockStore();
const fakeApp = (store: MockStore) => (
  <Provider store={store}>
    <FilterCheckBlock {...{callback, variant, checked, type, formClass}}/>
  </Provider>
);

describe('Component: FilterCheckBlock', () => {
  it('should render "FilterCheckBlock"', async () => {
    render(fakeApp(mockStore({})));
    expect(screen.getByTestId(/check-yoga/i)).toBeInTheDocument();
    expect(screen.getByTestId(/check-crossfit/i)).toBeInTheDocument();
    expect(screen.getByTestId(/check-running/i)).toBeInTheDocument();
    expect(screen.getByText(/Посмотреть все/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/check-box/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(/Посмотреть все/i));
    await waitFor (() => {
      expect(screen.getByTestId(/check-box/i)).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId('check-running'));
    await waitFor (() => {
      expect(callback).toBeCalledWith(CheckType.specialization, {...checked, running: false});
    });
  });
});
