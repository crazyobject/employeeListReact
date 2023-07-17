import debounce from "lodash.debounce";
import { useCallback } from "react";

const Search = ({ celebrityList, setUpdatedCelebrityList }) => {
  const changeHandler = (event) => {
    const searchCriteria = event.target.value.toLowerCase();
    if (searchCriteria !== "") {
      const searchResult = celebrityList.filter((item) => {
        return (
          item.first.toLowerCase().search(searchCriteria) !== -1 ||
          item.last.toLowerCase().search(searchCriteria) !== -1
        );
      });
      setUpdatedCelebrityList(searchResult);
    } else {
      setUpdatedCelebrityList(celebrityList);
    }
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 400), []);

  return (
    <nav class="navbar navbar-light bg-light">
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={debouncedChangeHandler}
      />
    </nav>
  );
};

export default Search;
