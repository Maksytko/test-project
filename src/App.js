import "./App.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Modal from "./components/Modal/Modal";
import { connect } from "react-redux";
import { getModalStatus } from "./redux/modal-selectors";

function App({ modalStatus }) {
  return (
    <div className="App">
      <Header />
      <Main />
      {modalStatus.isOpen && <Modal />}
    </div>
  );
}

const mapStateToProps = (state) => ({
  modalStatus: getModalStatus(state),
});

export default connect(mapStateToProps)(App);
