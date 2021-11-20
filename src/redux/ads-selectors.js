import { createSelector } from "reselect";

const getItems = (state) => {
  return state.ads.items;
};

const getFilter = (state) => {
  return state.ads.filter;
};

const getFilteredItems = createSelector(
  [getItems, getFilter],
  (items, filter) => {
    const normalizedFilter = filter.toUpperCase();

    const filteredItems = items.filter((item) => {
      return item.title.toUpperCase().includes(normalizedFilter);
    });

    return filteredItems;
  }
);

export { getItems, getFilteredItems };
