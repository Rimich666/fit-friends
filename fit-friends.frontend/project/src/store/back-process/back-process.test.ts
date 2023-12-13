import {AppRoute} from '../../app-route';
import {BackState} from '../../types/states/back-state';
import {backProcess, setBack} from './back.process';

describe('Reducer: user', () => {
  let state: BackState;

  beforeEach(() => {
    state = {back: undefined as unknown as AppRoute};
  });

  describe('back process test', () => {
    it('setBack test', () => {
      expect(backProcess.reducer(state, setBack(AppRoute.Main)))
        .toEqual({back: AppRoute.Main});
    });
  });
});
