import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Form, Field } from 'react-final-form';

import { valueRequired, timeRequired } from './utils';
import TypeConditionFields, {
  renderNumericTextField,
} from './TypeConditionFields';

const renderTextField = ({
  input,
  meta,
  ...rest
}: {
  // no idea how to type these properly :(
  input: any;
  meta: any;
}) => (
  <TextField
    name={input.name}
    value={input.value}
    onChange={input.onChange}
    error={meta.error && meta.touched}
    helperText={meta.error && meta.touched && `${meta.error}`}
    inputProps={{ maxLength: '40' }}
    {...input}
    {...rest}
  />
);

function DishForm() {
  return (
    <Form
      onSubmit={handleFormSubmit}
      render={({ handleSubmit, values, submitting, form }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              padding: '2.5rem',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                gap: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Field
                component={renderTextField}
                validate={valueRequired}
                name="name"
                label="Name"
                placeholder={`Name of the ${
                  values.type ? values.type : 'dish'
                }`}
              />

              <Field
                component={renderNumericTextField}
                validate={timeRequired}
                name="preparation_time"
                label="Preparation time"
                placeholder="HH:MM:SS"
                numberFormat="##:##:##"
                mask={['H', 'H', 'M', 'M', 'S', 'S']}
              />

              <Field name="type" validate={valueRequired}>
                {({ input, meta }) => (
                  <FormControl fullWidth error={meta.error && meta.touched}>
                    <InputLabel>Type</InputLabel>
                    <Select
                      label="Type"
                      name={input.name}
                      value={input.value}
                      id="input-type-select"
                      labelId="input-type-select"
                      onChange={(e: SelectChangeEvent) =>
                        handleTypeChange(e, input.onChange, form.change)
                      }
                    >
                      <MenuItem value="pizza">Pizza</MenuItem>
                      <MenuItem value="soup">Soup</MenuItem>
                      <MenuItem value="sandwich">Sandwich</MenuItem>
                    </Select>
                    <FormHelperText>
                      {meta.error && meta.touched && `${meta.error}`}
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>

              {values.type && TypeConditionFields(values.type)}
            </Box>
            <Box
              sx={{
                gap: '1rem',
                display: 'flex',
                flexDirection: 'column',
                marginTop: '3.5rem',
              }}
            >
              <Button
                size="large"
                type="submit"
                variant="contained"
                disabled={submitting}
              >
                Submit
              </Button>
              <Button variant="outlined" onClick={form.reset}>
                Reset
              </Button>
            </Box>
          </Box>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </form>
      )}
    />
  );
}

export default DishForm;

async function handleFormSubmit(values: any) {
  try {
    const res = await fetch(
      'https://frosty-wood-6558.getsandbox.com:443/dishes',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }
    );

    const resJson = await res.json();
    alert(JSON.stringify(resJson, null, 2));
  } catch (error) {
    // Our code never produces any errors 🤠
    //
    // Submitting the form should not produce
    // any errors (besides network and server),
    // since we don't allow for anything wrong to get send.
    alert(`An error has occured\n ${error}`);
  }
}

function handleTypeChange(
  event: SelectChangeEvent,
  onChange: any,
  formChange: any
) {
  onChange(event);
  removeTypeProperties(formChange);
}

// We want to remove all values related to type on type
// change to prevent sending values from other types.
function removeTypeProperties(formChange: any) {
  const propertiesToRemove = [
    'no_of_slices',
    'diameter',
    'spiciness_scale',
    'slices_of_bread',
  ];

  propertiesToRemove.forEach((propToRemove) =>
    formChange(propToRemove, undefined)
  );
}
