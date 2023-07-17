import { Formik } from "formik";
import * as Yup from "yup";
import { BsXCircle, BsCheckCircle } from "react-icons/bs";

const EditCelebrity = ({ handleEdit, celebrity, setUpdatedCelebrityList }) => {
  return (
    <Formik
      initialValues={{ ...celebrity }}
      enableReinitialize
      validateOnChange
      validateOnBlur
      validationSchema={Yup.object().shape({
        dob: Yup.date()
          .typeError("Please enter a valid Date of birth")
          .required("Date of birth is required"),
        gender: Yup.string().required("Gender is required"),
        country: Yup.string()
          .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for country ")
          .typeError("Please enter a valid country")
          .required("Country is required"),
        description: Yup.string().required("Description is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const { id } = celebrity;
        setUpdatedCelebrityList((prevState) => {
          return [
            ...prevState.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  ...values,
                  isEdit: false,
                };
              } else {
                return {
                  ...item,
                  isEdit: false,
                };
              }
            }),
          ];
        });
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
      }) => (
        <form>
          <div className="row">
            <div className="col text-left">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.dob}
              />
              <small className="text-danger mt-1">
                {errors.dob && touched.dob && errors.dob}
              </small>
            </div>
            <div className="col text-left">
              <label htmlFor="country" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                name="gender"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Rather not say">Rather not say</option>
                <option value="Other">Other</option>
              </select>
              <small className="text-danger mt-1">
                {errors.gender && touched.gender && errors.gender}
              </small>
            </div>
            <div className="col text-left">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                id="country"
                name="country"
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.country}
              />
              <small className="text-danger mt-1">
                {errors.country && touched.country && errors.country}
              </small>
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
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              <small className="text-danger mt-1">
                {errors.description &&
                  touched.description &&
                  errors.description}
              </small>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col text-right">
              <BsXCircle
                size={30}
                style={{ color: "red", cursor: "pointer" }}
                onClick={handleEdit}
              />
              <BsCheckCircle
                size={30}
                style={{
                  color: isValid ? "green" : "lightgray",
                  width: "40px",
                  cursor: isValid ? "pointer" : "not-allowed",
                }}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default EditCelebrity;
