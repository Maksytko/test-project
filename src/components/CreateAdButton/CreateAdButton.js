import { connect } from "react-redux";
import { changeModalStatus } from "../../redux/actions";

function CreateAdButton({ changeModalStatus }) {
  function handleCreateButtonClick() {
    changeModalStatus({ isOpen: true, type: "create", itemId: null });
  }
  return (
    <button type="button" onClick={handleCreateButtonClick}>
      Create ad
    </button>
  );
}

const mapDispatchToProps = (dispatch) => ({
  changeModalStatus: (obj) => dispatch(changeModalStatus(obj)),
});

export default connect(null, mapDispatchToProps)(CreateAdButton);
