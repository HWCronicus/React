import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

const validation = Yup.object().shape({
  fullName: Yup.string().min(2).max(50).required("Is Required"),
  email: Yup.string().email("Invalid Email").required("Is Required"),
});

class Basic extends React.Component {
  state = {
    sports: [
      { id: 1, name: "Soccer" },
      { id: 2, name: "Basketball" },
      { id: 3, name: "Football" },
      { id: 4, name: "Cricket" },
      { id: 5, name: "Hockey" },
    ],
    FormData: {
      fullName: "",
      email: "",
      isAwesome: false,
      color: "",
      content: "",
      sportId: 0,
      friend: [{ name: "" }],
    },
  };

  handleSubmit = (values) => {
    console.log(values);
  };

  mapSport = (sport) => {
    console.log(sport);
    return (
      <option value={sport.id} key={`sport_${sport.id}`}>
        {sport.name}
      </option>
    );
  };

  render() {
    return (
      <div className="container p-4">
        <div className="row">
          <div className="col-4">
            <Formik
              enableReinitialize={true}
              initialValues={this.state.FormData}
              onSubmit={this.handleSubmit}
              validationSchema={validation}
            >
              {({ values }) => (
                <Form>
                  <div className="form-group p-2">
                    <label htmlFor="fullName" className="p-2">
                      Full Name
                    </label>
                    <Field
                      type="text"
                      name="fullName"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="warning"
                    />
                  </div>
                  <div className="form-group p-2">
                    <label htmlFor="email" className="p-2">
                      Email
                    </label>
                    <Field type="text" name="email" className="form-control" />
                  </div>
                  <hr />
                  <div className="form-group p-2">
                    <Field
                      type="checkbox"
                      name="isAwesome"
                      className="form-check-input p-2"
                    />
                    <label htmlFor="isAwesome" className="form-check-label">
                      R U Awesome {`${values.isAwesome}`}
                    </label>
                  </div>
                  <hr />
                  <div className="form-group p-2">
                    <Field
                      type="radio"
                      className="form-check-input p-2"
                      name="color"
                      value="red"
                    />
                    <label className="form-check-lable">Red</label>
                  </div>
                  <div className="form-group p-2">
                    <Field
                      type="radio"
                      className="form-check-input p-2"
                      name="color"
                      value="blue"
                    />
                    <label className="form-check-lable">Blue</label>
                  </div>
                  <div className="form-group p-2">
                    <Field
                      type="radio"
                      className="form-check-input p-2"
                      name="color"
                      value="green"
                    />
                    <label className="form-check-lable">Green</label>
                  </div>
                  <hr />
                  <div className="form-group p-2">
                    <label htmlFor="content">Content</label>
                    <Field
                      component="textarea"
                      name="content"
                      className="form-control"
                    />
                  </div>
                  <hr />
                  <div className="form-group p-2">
                    <Field
                      component="select"
                      name="sportId"
                      className="form-control"
                    >
                      <option value="">Select a spot</option>
                      {this.state.sports.map(this.mapSport)}
                    </Field>
                  </div>
                  <div className="form-group">
                    <FieldArray name="friends">
                      {({ push }) => (
                        <div>
                          <button
                            className="btn btn-info"
                            onClick={() => push({ name: "" })}
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default Basic;
