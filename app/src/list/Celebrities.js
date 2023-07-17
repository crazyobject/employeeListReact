import React from 'react';
import { Accordion } from 'react-bootstrap';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import { age, getMyAvatar, getMyName } from '../util/util.js';
import EditCelebrity from './EditCelebrity.js';

const Celebrities = ({
  celebrityList,
  handleDelete,
  handleEdit,
  setUpdatedCelebrityList,
}) => {
  const displayAge = (dob) => {
    const newDob = dob?.split('-');
    const birthdate = new Date(...newDob);
    return age(birthdate);
  };
  return (
    <Accordion className="mt-5 p-3">
      {celebrityList.map((celebrity, index) => (
        <Accordion.Item
          eventKey={index}
          key={index + celebrity.first}
          className="item"
        >
          <Accordion.Header>
            {getMyAvatar(celebrity.picture)}
            {getMyName(celebrity.first, celebrity.last)}
          </Accordion.Header>
          <Accordion.Body>
            {!celebrity.isEdit ? (
              <>
                <div className="row">
                  <div className="col text-left text-muted">Age</div>
                  <div className="col text-left text-muted">Gender</div>
                  <div className="col text-left text-muted">Country</div>
                </div>
                <div className="row">
                  <div className="col text-left">
                    {displayAge(celebrity.dob)}
                  </div>
                  <div className="col text-left">{celebrity.gender}</div>
                  <div className="col text-left">{celebrity.country}</div>
                </div>
                <div className="row mt-3">
                  <div className="col text-left text-muted">Description</div>
                </div>
                <div className="row">
                  <div className="col text-left">{celebrity.description}</div>
                </div>
                <div className="row">
                  <div className="col text-right">
                    <BsFillTrashFill
                      size={20}
                      onClick={() => {
                        handleDelete(celebrity.id);
                      }}
                      style={{
                        marginRight: '10px',
                        color: 'red',
                        cursor: 'pointer',
                      }}
                    />
                    <BsFillPencilFill
                      size={20}
                      onClick={() => {
                        handleEdit(celebrity.id);
                      }}
                      style={{ color: 'blue', cursor: 'pointer' }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <EditCelebrity
                celebrity={celebrity}
                handleEdit={handleEdit}
                setUpdatedCelebrityList={setUpdatedCelebrityList}
              />
            )}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Celebrities;
