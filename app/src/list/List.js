import "./list.css";
import { useState } from "react";
import { Accordion, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { age, getMyAvatar, getMyName } from "../util/util.js";
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsXCircle,
  BsCheckCircle,
} from "react-icons/bs";
import Modal from "react-bootstrap/Modal";

const widthOfAccordion = "50%";

const marginRight20 = {
  marginTop: "20px",
};

const textarea = {
  border: "1px solid #cccccc",
  borderRadius: "10px",
  padding: "10px",
  overflow: "hidden",
};

const inputElement = {
  border: "1px solid #cccccc",
  borderRadius: "10px",
  padding: "2px",
  width: "120px",
};

const List = (props) => {
  const { celebrityList } = props;
  const [data, setData] = useState(celebrityList);
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const editToggler = (status) => {
    setEditMode(status);
  };

  const editRecordHandler = (idToEdit) => {
    if (idToEdit) {
    } else {
      return false;
    }
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
      const dob = item?.dob?.split("-");
      const birthdate = new Date(...dob);
      const myAge = age(birthdate);

      const ageFieldName = `age${item.id}`;
      const genderFieldName = `gender${item.id}`;
      const countryFieldName = `country${item.id}`;
      const descriptionFieldName = `description${item.id}`;

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
                {editMode ? (
                  <div class="col text-left">
                    <input
                      name={ageFieldName}
                      value={myAge}
                      style={inputElement}
                    ></input>
                  </div>
                ) : (
                  <div class="col text-left">{myAge}</div>
                )}
                {editMode ? (
                  <div class="col text-left">
                    <select name={genderFieldName} style={inputElement}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Transgender">Transgender</option>
                      <option value="Rather not say">Rather not say</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                ) : (
                  <div class="col text-left">{item.gender}</div>
                )}
                {editMode ? (
                  <div class="col text-left">
                    <input
                      name={countryFieldName}
                      value={item.country}
                      style={inputElement}
                    ></input>
                  </div>
                ) : (
                  <div class="col text-left">{item.country}</div>
                )}
              </div>
              <div class="row" style={marginRight20}>
                <div class="col text-left text-muted">Description</div>
              </div>
              <div class="row">
                {editMode ? (
                  <div>
                    <textarea rows="4" cols="55" style={textarea}>
                      {item.description}
                    </textarea>
                  </div>
                ) : (
                  <div class="col text-left">{item.description}</div>
                )}
              </div>
              <div class="row" style={marginRight20}>
                {editMode ? (
                  <div class="col text-right">
                    <BsXCircle
                      size={30}
                      style={{ color: "red" }}
                      onClick={() => {
                        editToggler(false);
                      }}
                    />
                    <BsCheckCircle
                      size={30}
                      style={{ color: "green", width: "40px" }}
                      onClick={() => {
                        editRecordHandler(item.id);
                      }}
                    />
                  </div>
                ) : (
                  <div class="col text-right">
                    <BsFillTrashFill
                      size={20}
                      onClick={() => {
                        deleteHandler(item.id);
                      }}
                      style={{
                        marginRight: "10px",
                        color: "red",
                        cursor: "pointer",
                      }}
                    />
                    <BsFillPencilFill
                      size={20}
                      onClick={() => {
                        editToggler(true);
                      }}
                      style={{ color: "blue" }}
                    />
                  </div>
                )}
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
