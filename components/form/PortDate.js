import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FormGroup, Label, Button } from "reactstrap";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class PortDate extends React.Component {
  constructor(props) {
    super(props);

    const dateValue = props.initialDate
      ? new Date(props.initialDate)
      : null;
    const isHidden = props.initialDate ? false : true;

    this.state = {
      dateValue,
      isHidden
    };

    console.log(this.state, "this is for endDate");
  }

  componentDidMount() {
    const { setFieldValue } = this.props.form;
    const { name } = this.props.field;
    setFieldValue(name, this.state.dateValue, true);
  }

  handleChange = date => {
    const { setFieldValue, setFieldTouched } = this.props.form;
    const { name } = this.props.field;

    this.setState({
      dateValue: date
    });
    setFieldValue(name, date, true);
    setFieldTouched(name, true, true);
  };

  handleToggle = date => {
    const { setFieldValue, setFieldTouched } = this.props.form;
    const { name } = this.props.field;

    this.setState({
      isHidden: !this.state.isHidden
    });
    setFieldValue(name, date, true);
    setFieldTouched(name, true, true);
  };

  render() {
    const {
      canDisable,
      label,
      field,
      form: { touched, errors }
    } = this.props;
    const { isHidden, dateValue } = this.state;
    return (
      <FormGroup>
        <Label>{label}</Label>
        <div className="input-group">
          {!isHidden && (
            <DatePicker
              className="form-control"
              selected={dateValue}
              onChange={this.handleChange}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              maxDate={new Date()}
              dropdownMode="select"
            />
          )}
        </div>
        {canDisable && !isHidden && (
          <Button onClick={() => this.handleToggle(null)}>
            Still Working On It !
          </Button>
        )}
        {canDisable && isHidden && (
          <>
            <span>still Working Here</span>
            <Button onClick={() => this.handleToggle(dateValue)}>
              Set End Date
            </Button>
          </>
        )}
        {touched[field.name] && errors[field.name] && (
          <div className="error">{errors[field.name]}</div>
        )}
      </FormGroup>
    );
  }
}
