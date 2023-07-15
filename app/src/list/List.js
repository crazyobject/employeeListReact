import "./list.css";
import { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { age, getMyAvatar, getMyName } from "../util/util.js";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";

const widthOfAccordion = "50%";

const marginRight20 = {
  marginTop: "20px",
};

const List = (props) => {
  const { celebrityList } = props;
  const [data, setData] = useState(celebrityList);
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const deleteHandler = (idToDelete) => {
    setDeleteId(idToDelete);
    setShow(true);
  };

  const deleteItemFromData = () => {
    const newData = data.filter((item) => {
      return item.id !== deleteId;
    });
    setData(newData);
    setDeleteId("");
    handleClose();
  };

  const renderList = () => {
    const createItem = (item, index) => {
      console.log(item);
      const dob = item?.dob?.split("-");
      const birthdate = new Date(...dob);
      let myAge = age(birthdate);

      return (
        <Accordion.Item eventKey={index} className="item">
          <Accordion.Header>
            {getMyAvatar(item.picture)}
            {getMyName(item.first, item.last)}
          </Accordion.Header>
          <Accordion.Body>
            <div class="container">
              <div class="row">
                <div class="col text-left text-muted">Age</div>
                <div class="col text-left text-muted">Gender</div>
                <div class="col text-left text-muted">Country</div>
              </div>
              <div class="row">
                <div class="col text-left">{myAge}</div>
                <div class="col text-left">{item.gender}</div>
                <div class="col text-left">{item.country}</div>
              </div>
              <div class="row" style={marginRight20}>
                <div class="col text-left text-muted">Description</div>
              </div>
              <div class="row">
                <div class="col text-left">{item.description}</div>
              </div>
              <div class="row" style={marginRight20}>
                <div class="col text-right">
                  <BsFillTrashFill
                    onClick={() => {
                      deleteHandler(item.id);
                    }}
                    style={{
                      marginRight: "10px",
                      color: "red",
                      cursor: "pointer",
                    }}
                  />
                  <BsFillPencilFill style={{ color: "blue" }} />
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      );
    };

    const items = data.map((item, index) => {
      return createItem(item, index);
    });

    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body closeButton>Are you sure you want to delete?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteItemFromData}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Accordion className="mt-5 p-3">{items}</Accordion>
      </>
    );
  };

  const renderError = () => {
    return <div>No celebrity found</div>;
  };

  return (
    <div style={{ width: widthOfAccordion }}>
      {celebrityList.length ? renderList() : renderError()}
    </div>
  );
};

export default List;
