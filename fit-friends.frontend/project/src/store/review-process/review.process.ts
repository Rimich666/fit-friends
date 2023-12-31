import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {ReviewState} from '../../types/states/review-state';
import {fillReview} from '../../helpers/fill-review';
import {createFeedback, fetchFeedbacks} from '../api-actions/feedback-actions';

const initialState: ReviewState = {
  reviews: [],
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.reviews = action.payload.map((feedback) => fillReview(feedback));
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.reviews = action.payload.feedbacks.map((feedback) => fillReview(feedback));
      });
  }
});
