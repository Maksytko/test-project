import { createAction } from "@reduxjs/toolkit";

const changeFilter = createAction("filter/change");
const changeModalStatus = createAction("modal/status");
const deleteItem = createAction("ads/delete");
const setItems = createAction("ads/set");

export { changeFilter, changeModalStatus, deleteItem, setItems };
