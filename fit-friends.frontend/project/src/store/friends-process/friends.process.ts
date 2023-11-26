import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {fetchFriends} from '../api-actions/friends-actions';
import {FriendState} from '../../types/states/friend-state';
import {fillFriends} from '../../helpers/fill-friends';
import {changeStateQuestion} from '../api-actions/join-actions';

const initialState: FriendState = {
  isFriendsLoaded: false,
  friends: [],
  isFriendsLoading: false,
};

export const friendProcess = createSlice({
  name: NameSpace.Friend,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.isFriendsLoading = true;
        state.isFriendsLoaded = false;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.isFriendsLoading = false;
        state.isFriendsLoaded = true;
        state.friends = action.payload.map((item) => fillFriends(item));
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.isFriendsLoading = false;
      })
      .addCase(changeStateQuestion.fulfilled, (state, action) => {
        const friend = state.friends.find((item) =>
          item.idRequest === action.payload.id);
        if (friend) {
          friend.isRequest = false;
        }
      })
    ;
  }
});
