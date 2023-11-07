import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {fetchTrainingsForYou, fetchTrainingsPopular} from '../api-actions/api-actions';
import {TrainingState} from '../../types/training-state';

const initialState: TrainingState = {
  forYouTrainings: [],
  isForYouLoaded: false,
  isForYouLoading: false,
  isPopularLoading: false,
  isPopularLoaded: false,
  popularTrainings: []
};

export const trainingProcess = createSlice({
  name: NameSpace.Training,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTrainingsForYou.pending, (state) => {
        state.isForYouLoading = true;
        state.isForYouLoaded = false;
      })
      .addCase(fetchTrainingsForYou.fulfilled, (state, action) => {
        state.isForYouLoading = false;
        state.isForYouLoaded = true;
        state.forYouTrainings = [...action.payload];
      })
      .addCase(fetchTrainingsForYou.rejected, (state, action) => {
        state.isForYouLoading = false;
      })
      .addCase(fetchTrainingsPopular.pending, (state) => {
        state.isPopularLoading = true;
        state.isPopularLoaded = false;
      })
      .addCase(fetchTrainingsPopular.fulfilled, (state, action) => {
        state.isPopularLoading = false;
        state.isPopularLoaded = true;
        state.popularTrainings = [...action.payload];
      })
      .addCase(fetchTrainingsPopular.rejected, (state, action) => {
        state.isPopularLoading = false;
      }
      );
  }
});
