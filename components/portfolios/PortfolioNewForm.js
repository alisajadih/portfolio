// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, FormGroup, Label } from "reactstrap";
import PortInput from "../form/PortInput";
import PortDate from "../form/PortDate";

const validateInputs = values => {
  let errors = {};
  Object.entries(values).forEach(([key, value]) => {
    if (!values[key] && key !== "startDate" && key !== "endDate") {
      errors[key] = `${key} is required !`;
    }
  });
  const startDate = values.startDate;
  const endDate = values.endDate;
  if (
    startDate &&
    endDate &&
    startDate.toJSON().slice(0, 10) > endDate.toJSON().slice(0, 10)
  ) {
    errors.endDate = "End Date can not be before Start Date";
  }
  return errors;
};

const INITIAL_VALUES = {
  title: "",
  company: "",
  location: "",
  position: "",
  description: "",
  startDate: "",
  endDate: ""
};

const PortfolioCreateForm = props => (
  <div>
    <Formik
      initialValues={INITIAL_VALUES}
      validate={validateInputs}
      onSubmit={props.onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            type="text"
            name="title"
            component={PortInput}
            label="Title :"
          />
          <Field
            type="text"
            name="company"
            component={PortInput}
            label="Company :"
          />
          <Field
            type="text"
            name="location"
            component={PortInput}
            label="Location :"
          />
          <Field
            type="text"
            name="position"
            component={PortInput}
            label="Position :"
          />
          <Field
            type="textarea"
            name="description"
            component={PortInput}
            label="Description :"
          />

          <Field
            name="startDate"
            component={PortDate}
            label="Start date:"
          />
          <Field
            name="endDate"
            component={PortDate}
            label="End date:"
            canDisable={true}
          />

          <Button
            color="success"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioCreateForm;

// import React, { Component } from "react";

// export default class PortfolioNewForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { title: "", description: "", language: "" };
//   }

//   handleChange = event => {
//     const field = event.target.name;
//     this.setState({ [field]: event.target.value });
//   };
//   handleSubmit = event => {
//     alert(
//       "A name was submitted" + this.state.title +
//       " Description " + this.state.description+
//       "language" + this.state.language
//     );
//     event.preventDefault();
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name :
//           <input
//             name="title"
//             type="text"
//             value={this.state.title}
//             onChange={this.handleChange}
//           />
//         </label>
//         <label>
//           Description :
//           <textarea
//             name="description"
//             value={this.state.description}
//             onChange={this.handleChange}
//           />
//         </label>
//         <label>
//           Pick Your Favorite Programming Language :
//           <select
//             name="language"
//             value={this.state.language}
//             onChange={this.handleChange}
//           >
//             <option value="javascript">Java Script</option>
//             <option value="java">Java</option>
//             <option value="c++">C++</option>
//             <option value="c#">C#</option>
//           </select>
//         </label>
//         <input type="submit" value="submit" />
//       </form>
//     );
//   }
// }
