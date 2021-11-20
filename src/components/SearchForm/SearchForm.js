import { useState } from "react";
import { connect } from "react-redux";
import { changeFilter } from "../../redux/actions";

function SearchForm({ changeFilter }) {
  const [text, setText] = useState("");

  function handleInputChange(event) {
    setText(event.currentTarget.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    changeFilter(text);
    setText("");
  }

  return (
    <form type="submit" onSubmit={handleFormSubmit}>
      <input type="text" value={text} onChange={handleInputChange}></input>
      <button type="submit">Search</button>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  changeFilter: (text) => dispatch(changeFilter(text)),
});

export default connect(null, mapDispatchToProps)(SearchForm);
