import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {ReviewState} from '../../types/review-state';
import {ReviewInterface} from '../../types/review.interface';
import {fetchFeedbacks} from '../api-actions/api-actions';
import {fillReview} from '../../helpers/fill-review';

const initialState: ReviewState = {
  reviews: [],
};

export const reviewsProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    loadReviews: (state, action: PayloadAction<ReviewInterface[]>) => {
      state.reviews = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.reviews = action.payload.map((feedback) => fillReview(feedback));
      });
  }
});

export const {loadReviews} = reviewsProcess.actions;
