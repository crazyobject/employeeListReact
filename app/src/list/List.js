import "./list.css";
import { useState } from "react";
import Celebrities from "./Celebrities";
import DeleteCelebrity from "./DeleteCelebrity";
import Search from "./Search";
const widthOfAccordion = "50%";

const List = ({ celebrityList }) => {
  const [updatedCelebrityList, setUpdatedCelebrityList] =
    useState(celebrityList);
  const [celebrityId, setCelebrityId] = useState(null);
  const [isDeleteCelebrity, setDeleteCelebrity] = useState(false);

  const handleClose = () => {
    setDeleteCelebrity(false);
  };

  const handleEdit = (id) => {
    const newData = updatedCelebrityList.map((item) => {
      if (item.id === id) {
        item.isEdit = true;
      } else {
        item.isEdit = false;
      }
      return item;
    });
    setUpdatedCelebrityList(newData);
  };

  const handleDelete = (id) => {
    setCelebrityId(id);
    setDeleteCelebrity(true);
  };

  const handleDeleteCelebrity = () => {
    const newData = updatedCelebrityList.filter(
      (item) => item.id !== celebrityId
    );
    setUpdatedCelebrityList(newData);
    setCelebrityId(null);
    handleClose();
  };

  return (
    <div style={{ width: widthOfAccordion }}>
      <Search
        celebrityList={celebrityList}
        setUpdatedCelebrityList={setUpdatedCelebrityList}
      />
      {updatedCelebrityList.length ? (
        <>
          <Celebrities
            celebrityList={updatedCelebrityList}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            setUpdatedCelebrityList={setUpdatedCelebrityList}
          />
        </>
      ) : (
        <p>No celebrity found</p>
      )}
      {isDeleteCelebrity && (
        <DeleteCelebrity
          isDeleteCelebrity={isDeleteCelebrity}
          handleClose={handleClose}
          handleDeleteCelebrity={handleDeleteCelebrity}
        />
      )}
    </div>
  );
};

export default List;
