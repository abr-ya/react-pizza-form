import React from "react";
import { Form, Field } from "react-final-form";
import {
  Button,
  TextField,
  Container,
  CssBaseline,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
} from "@material-ui/core";
import DatePicker from "react-datepicker";
import { pizzaTypes } from "./data/pizza";

import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles({
  textField: {
    marginTop: "1em",
  },
  pizzaImage: {
    width: "100%",
  },
});

const required = (value) => (value ? undefined : "Required");
const validatePhone = (value) =>
  /^\d\d\d-\d\d\d-\d\d\d\d$/.test(value) ? undefined : "Invalid phone number";

const RadioFormField = ({
  input: { checked, value, name, onChange, ...otherInput },
  meta,
  ...other
}) => (
  <Radio
    {...other}
    name={name}
    value={value}
    checked={checked}
    onChange={onChange}
    inputProps={otherInput}
  />
);

const DatePickerAdapter = ({ input: { onChange, value }, ...rest }) => (
  <DatePicker selected={value} onChange={date => onChange(date)} {...rest} />
);

const App = () => {
  const classes = useStyles();
  return (
    <Container>
      <CssBaseline />
      <Typography variant="h4">
        Your best pies are always at Fry's pizza
      </Typography>
      <Form
        onSubmit={() => {}}
        initialValues={{
          name: "Jack",
          phone: "555-867-5309",
          pizza: "Pepperoni",
        }}
        render={({ handleSubmit, values, valid, ...other }) => (
          <form onSubmit={handleSubmit}>
            <Field name="name" validate={required}>
              {({ input, meta }) => (
                <TextField
                  error={meta.error !== undefined}
                  label="Your name"
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                  {...input}
                />
              )}
            </Field>
            <Field name="phone" validate={validatePhone}>
              {({ input, meta }) => (
                <TextField
                  variant="outlined"
                  label="Your phone"
                  error={meta.error !== undefined}
                  fullWidth
                  className={classes.textField}
                  {...input}
                />
              )}
            </Field>
            <div>
              <label>Date: </label>
              <Field
                name="date"
                validate={required}
                dateFormat="dd/MM/yyyy"
                component={DatePickerAdapter}
              />
            </div>
            <Grid container>
              <Grid item xs={3}>
                <RadioGroup
                  aria-label="Pizza type"
                  name="pizza"
                  value={values.pizza.name}
                >
                  {pizzaTypes.map((pizza) => (
                    <FormControlLabel
                      value={pizza.name}
                      control={
                        <Field
                          type="radio"
                          name="pizza"
                          value={pizza.name}
                          component={RadioFormField}
                        />
                      }
                      label={pizza.name}
                      key={pizza.name}
                    />
                  ))}
                </RadioGroup>
              </Grid>
              <Grid item xs={9}>
                <img
                  src={`pizzas/${
                    pizzaTypes.find(({ name }) => name === values.pizza).image
                  }`}
                  className={classes.pizzaImage}
                  alt={`${values.pizza} pizza`}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              disabled={!valid}
              variant="contained"
              className={classes.textField}
            >
              Where's the Pizzaaaaaahhhh!!!!
            </Button>
            <div>{JSON.stringify({ ...values })}</div>
          </form>
        )}
      ></Form>{" "}
    </Container>
  );
}

export default App;
