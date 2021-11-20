import { useEffect } from "react";
import { getAllAds } from "../../redux/ads-operations";
import { connect } from "react-redux";
import Card from "../Card";
import { getFilteredItems } from "../../redux/ads-selectors";
import style from "./AdsList.module.css";

function AdsList({ ads, getAllAds }) {
  useEffect(() => {
    getAllAds();
  }, []);

  return (
    <ul className={style.list}>
      {ads.map((ad) => (
        <Card title={ad.title} date={ad.date} id={ad.id} key={ad.id} />
      ))}
    </ul>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getAllAds: () => dispatch(getAllAds()),
});

const mapStateToProps = (state) => ({
  ads: getFilteredItems(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdsList);
