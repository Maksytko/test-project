import { connect } from "react-redux";
import { changeModalStatus } from "../../redux/actions";
import style from "./Card.module.css";

function Card({ title, date, id, changeModalStatus }) {
  function handleCardClick(id) {
    changeModalStatus({ isOpen: true, type: "item", itemId: id });
  }
  return (
    <li
      data-name="card"
      id={id}
      onClick={() => handleCardClick(id)}
      className={style.item}
    >
      <p>{title}</p>
      <p>{date}</p>
    </li>
  );
}

const mapDispatchToProps = (dispatch) => ({
  changeModalStatus: (obj) => dispatch(changeModalStatus(obj)),
});

export default connect(null, mapDispatchToProps)(Card);
