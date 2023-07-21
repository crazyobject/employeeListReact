import React from "react";
import { Accordion } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BsCheckCircle } from "react-icons/bs";
import "./NewEmployee.css";

const initialValues = {
  first: "",
  last: "",
  description: "",
  dob: "",
  gender: "",
  country: "",
  avatar: "",
};

const newUserSchema = Yup.object({
  avatar: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    )
    .required("Avatar URL is required"),
  first: Yup.string().min(2).max(20).required("First name is required"),
  last: Yup.string().min(2).max(20).required("Last name is required"),
  dob: Yup.date()
    .typeError("Please enter a valid Date of birth")
    .required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  country: Yup.string()
    .min(2)
    .max(20)
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for country ")
    .typeError("Please enter a valid country")
    .required("Country is required"),
  description: Yup.string().required("Description is required"),
});

const NewEmployee = ({ celebrityList, setUpdatedCelebrityList }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: newUserSchema,
      onSubmit: (values, action) => {
        setUpdatedCelebrityList((prevState) => {
          return [
            {
              id: prevState[prevState.length - 1].id + 1,
              first: values.first,
              last: values.last,
              dob: values.dob,
              gender: values.gender,
              email: "-",
              picture: values.avatar,
              country: values.country,
              description: values.description,
            },
            ...prevState,
          ];
        });

        action.resetForm();
      },
    });

  return (
    <div className="accordionContainer">
      <Accordion>
        <Accordion.Item eventKey="1" className="item">
          <Accordion.Header>Add new employee</Accordion.Header>
          <Accordion.Body>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col text-left">
                  <label htmlFor="first" className="form-label">
                    first Name
                  </label>
                  <input
                    id="first"
                    name="first"
                    className="form-control"
                    value={values.first}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.first && touched.first ? (
                    <small className="text-danger mt-1">{errors.first}</small>
                  ) : null}
                </div>
                <div className="col text-left">
                  <label htmlFor="last`" className="form-label">
                    Last Name
                  </label>
                  <input
                    id="last"
                    name="last"
                    className="form-control"
                    value={values.last}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.last && touched.last ? (
                    <small className="text-danger mt-1">{errors.last}</small>
                  ) : null}
                </div>
              </div>
              <div className="row  mt-3">
                <div className="col text-left">
                  <label htmlFor="dob" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    className="form-control"
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.dob && touched.dob ? (
                    <small className="text-danger mt-1">{errors.dob}</small>
                  ) : null}
                </div>
                <div className="col text-left">
                  <label htmlFor="country" className="form-label">
                    Gender
                  </label>
                  <select
                    className="form-select"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Rather not say">Rather not say</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && touched.gender ? (
                    <small className="text-danger mt-1">{errors.gender}</small>
                  ) : null}
                </div>
                <div className="col text-left">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <input
                    id="country"
                    name="country"
                    className="form-control"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.country && touched.country ? (
                    <small className="text-danger mt-1">{errors.country}</small>
                  ) : null}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col text-left">
                  <label htmlFor="age" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    rows={4}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.description && touched.description ? (
                    <small className="text-danger mt-1">
                      {errors.description}
                    </small>
                  ) : null}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col text-left">
                  <label htmlFor="first" className="form-label">
                    Avatar
                  </label>
                  <input
                    id="avatar"
                    name="avatar"
                    className="form-control"
                    value={values.avatar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.avatar && touched.avatar ? (
                    <small className="text-danger mt-1">{errors.avatar}</small>
                  ) : null}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col text-right">
                  <BsCheckCircle
                    size={30}
                    style={{
                      color: "green",
                    }}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default NewEmployee;
