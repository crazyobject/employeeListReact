import "./list.css";
import { Accordion } from "react-bootstrap";

const widthOfAccordion = "50%";

const List = (props) => {
  const { celebrityList } = props;

  const renderList = () => {
    const createItem = (item, index) => {
      console.log(item);
      return (
        <Accordion.Item eventKey={index} className="item">
          <Accordion.Header>{`${item.first} ${item.last}`}</Accordion.Header>
          <Accordion.Body>
            Age: {item.age}
            Gender: {item.gender}
            Country: {item.country}
            <hr />
            Description:
            <br />
            {item.description}
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
