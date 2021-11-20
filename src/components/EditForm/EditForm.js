import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { changeModalStatus, setItems } from "../../redux/actions";
import { getFilteredItems } from "../../redux/ads-selectors";
import { editAd } from "../../redux/ads-operations";
import style from "./EditForm.module.css";

function EditForm({ ads, itemId, editAd, setItems, changeModalStatus }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const ad = ads.find((ad) => ad.id === itemId);
    setItem(ad);
  }, []);

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

    const itemIdForChange = ads.findIndex((ad) => ad.id === itemId);
    ads.splice(itemIdForChange, 1, item);

    editAd(item);
    setItems(ads);
    changeModalStatus({ isOpen: false, type: null, itemId: null });
  }

  return (
    <>
      {item && (
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
              onChange={(event) => handleInputChange(event)}
            ></input>
          </label>
          <button type="submit" className={style.button}>
            Save changes
          </button>
        </form>
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setItems: (obj) => dispatch(setItems(obj)),
  editAd: (ad) => dispatch(editAd(ad)),
  changeModalStatus: (obj) => dispatch(changeModalStatus(obj)),
});

const mapStateToProps = (state) => ({
  ads: getFilteredItems(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
