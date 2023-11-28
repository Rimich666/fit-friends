import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings';
import {NotificationState} from '../../types/states/notification-state';
import {fetchNotifications} from '../api-actions/notification-action';

const initialState: NotificationState = {
  isNotificationsLoaded: false,
  notifications: [],
  isNotificationsLoading: false,
};

export const notificationProcess = createSlice({
  name: NameSpace.Notification,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isNotificationsLoading = true;
        state.isNotificationsLoaded = false;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isNotificationsLoading = false;
        state.isNotificationsLoaded = true;
        state.notifications = action.payload.map((note) =>
          ({...note, createDate: note.createDate ? note.createDate : note.createdAt}));
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isNotificationsLoading = false;
      });
  }
});
