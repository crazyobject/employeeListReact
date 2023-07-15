import "./list.css";
import { Accordion } from "react-bootstrap";
import { age, getMyAvatar, getMyName } from "../util/util.js";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

const widthOfAccordion = "50%";

const marginRight20 = {
  marginTop: "20px",
};

const List = (props) => {
  const { celebrityList } = props;

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
                    style={{ marginRight: "10px", color: "red" }}
                  />
                  <BsFillPencilFill style={{ color: "blue" }} />
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      );
    };

    const items = celebrityList.map((item, index) => {
      return createItem(item, index);
    });

    return <Accordion className="mt-5 p-3">{items}</Accordion>;
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
