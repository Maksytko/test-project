import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { getAllAds, deleteAd, editAd, createAd } from "./ads-operations";
import { changeFilter, changeModalStatus, setItems } from "./actions";

const initialState = {
  ads: {
    items: [],
    filter: "",
  },
  modal: {
    isOpen: false,
    type: null,
    itemId: null,
  },
  isLoading: false,
  error: null,
};

const adsReducer = createReducer(initialState.ads, {
  [getAllAds.fulfilled]: (ads, { payload }) => ({
    ...ads,
    items: [...payload],
  }),
  [changeFilter]: (ads, { payload }) => ({
    ...ads,
    filter: payload,
  }),
  [setItems]: (ads, { payload }) => ({
    ...ads,
    items: [...payload],
  }),
});

const modalReducer = createReducer(initialState.modal, {
  [changeModalStatus]: (_, { payload }) => ({ ...payload }),
});

const loadingReducer = createReducer(initialState.isLoading, {
  [getAllAds.pending]: () => true,
  [getAllAds.fulfilled]: () => false,
  [deleteAd.pending]: () => true,
  [deleteAd.fulfilled]: () => false,
  [editAd.pending]: () => true,
  [editAd.fulfilled]: () => false,
  [createAd.fulfilled]: () => true,
  [createAd.fulfilled]: () => false,
});

const errorReducer = createReducer(initialState.error, {
  [getAllAds.rejected]: (_, { payload }) => payload,
  [deleteAd.rejected]: (_, { payload }) => payload,
  [editAd.rejected]: (_, { payload }) => payload,
  [createAd.rejected]: (_, { payload }) => payload,
});

export default combineReducers({
  ads: adsReducer,
  modal: modalReducer,
  isLoading: loadingReducer,
  error: errorReducer,
});
