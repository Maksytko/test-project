const getModalStatus = (state) => {
  return state.modal;
};

const getIdItemForModal = (state) => {
  return getModalStatus(state).itemId;
};

export { getModalStatus, getIdItemForModal };
