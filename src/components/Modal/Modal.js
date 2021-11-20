import { useEffect } from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";
import style from "./Modal.module.css";
import { changeModalStatus } from "../../redux/actions";
import { getModalStatus } from "../../redux/modal-selectors";
import ItemModal from "../ItemModal";
import EditForm from "../EditForm";
import CreateForm from "../CreateForm";

const modalRoot = document.querySelector("#modal-root");

function Modal({ changeModalStatus, modalStatus }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  function handleKeydown(event) {
    if (event.code === "Escape") {
      changeModalStatus({ isOpen: false, type: null, itemId: null });
    }
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      changeModalStatus({ isOpen: false, type: null, itemId: null });
    }
  }

  return createPortal(
    <div className={style.Overlay} onClick={handleBackdropClick}>
      <div className={style.Modal}>
        {modalStatus.type === "item" && (
          <ItemModal itemId={modalStatus.itemId} />
        )}
        {modalStatus.type === "edit" && (
          <EditForm itemId={modalStatus.itemId} />
        )}
        {modalStatus.type === "create" && <CreateForm />}
      </div>
    </div>,
    modalRoot
  );
}

const mapDispatchToProps = (dispatch) => ({
  changeModalStatus: (obj) => dispatch(changeModalStatus(obj)),
});

const mapStateToProps = (state) => ({
  modalStatus: getModalStatus(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
