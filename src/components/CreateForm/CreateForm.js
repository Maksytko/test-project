import { v4 as uuid } from "uuid";
import { useState } from "react";
import { connect } from "react-redux";
import { setItems } from "../../redux/actions";
import { getFilteredItems } from "../../redux/ads-selectors";
import { createAd } from "../../redux/ads-operations";
import { changeModalStatus } from "../../redux/actions";
import style from "./CreateForm.module.css";

function CreateForm({ setItems, createAd, ads, changeModalStatus }) {
  const [item, setItem] = useState({
    title: "",
    description: "",
  });

  function handleInputChange(event) {
    if (event.currentTarget.name === "title") {
      setItem({ ...item, title: event.currentTarget.value });
      return;
    }

    if (event.currentTarget.name === "description") {
      setItem({ ...item, description: event.currentTarget.value });
      return;
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const date = new Date(Date.now()).toLocaleString();
    const id = uuid();
    const itemForAdd = {
      ...item,
      id,
      date,
    };
    ads.push(itemForAdd);

    setItems(ads);
    createAd(itemForAdd);
    changeModalStatus({ isOpen: false, type: null, itemId: null });
  }

  return (
    <form onSubmit={handleFormSubmit} className={style.form}>
      <label className={style.label}>
        Title
        <input
          name="title"
          value={item.title}
          onChange={handleInputChange}
        ></input>
      </label>
      <label className={style.label}>
        Description
        <input
          name="description"
          value={item.description}
          onChange={handleInputChange}
        ></input>
      </label>
      <button type="submit" className={style.button}>
        Create ad
      </button>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setItems: (array) => dispatch(setItems(array)),
  createAd: (ad) => dispatch(createAd(ad)),
  changeModalStatus: (obj) => dispatch(changeModalStatus(obj)),
});

const mapStateToProps = (state) => ({
  ads: getFilteredItems(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
