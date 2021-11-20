import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { getFilteredItems } from "../../redux/ads-selectors";
import { deleteAd } from "../../redux/ads-operations";
import { changeModalStatus, setItems } from "../../redux/actions";
import Card from "../Card";
import style from "./ItemModal.module.css";

function ItemModal({ itemId, ads, deleteAd, setItems, changeModalStatus }) {
  const [item, setItem] = useState(null);
  const [similarItems, setSimilarItems] = useState(null);

  useEffect(() => {
    const ad = ads.find((ad) => ad.id === itemId);
    setItem(ad);
  }, []);

  useEffect(() => {
    if (item) {
      const result = getSimilarAds();
      setSimilarItems(result);
    }
  }, [item]);

  function getSimilarAds() {
    const keywords = [...item.title.split(" "), ...item.description.split(" ")];
    const uniqFilteredKeywords = new Set(
      keywords.filter((word) => word.length > 3)
    );

    const adsForCheck = ads.filter((ad) => ad.id !== itemId);

    const result = adsForCheck.filter((ad) =>
      checkAdsForSimilar(ad, uniqFilteredKeywords)
    );

    if (result.length > 3) {
      result.length = 3;
    }

    return result;
  }

  function checkAdsForSimilar(ad, uniqFilteredKeywords) {
    const uniqKeywordsOfAd = new Set([
      ...ad.title.split(" "),
      ...ad.description.split(" "),
    ]);
    const keywords = [...uniqFilteredKeywords];
    for (const key of keywords) {
      if (uniqKeywordsOfAd.has(key)) {
        return true;
      }
    }
  }

  function handleDeleteButtonClick() {
    deleteAd(item.id);
    const itemIdForDelete = ads.findIndex((ad) => ad.id === itemId);
    ads.splice(itemIdForDelete, 1);
    setItems(ads);
    changeModalStatus({ isOpen: false, type: null, itemId: null });
  }

  function handleEditButtonClick() {
    changeModalStatus({ isOpen: true, type: "edit", itemId: item.id });
  }

  return (
    <div className={style.modal}>
      {item && (
        <div>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>{item.date}</p>
          <ul className={style.list}>
            <li className={style.item}>
              <button
                type="button"
                onClick={handleDeleteButtonClick}
                className={style.button}
              >
                Delete
              </button>
            </li>
            <li className={style.item}>
              <button
                type="button"
                onClick={handleEditButtonClick}
                className={style.button}
              >
                Edit
              </button>
            </li>
          </ul>
        </div>
      )}
      {similarItems &&
        similarItems.map((ad) => (
          <Card title={ad.title} date={ad.date} id={ad.id} key={ad.id} />
        ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  ads: getFilteredItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteAd: (id) => dispatch(deleteAd(id)),
  changeModalStatus: (obj) => dispatch(changeModalStatus(obj)),
  setItems: (id) => dispatch(setItems(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);
