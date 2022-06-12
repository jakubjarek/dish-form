import TextField from '@mui/material/TextField';
import NumberFormat from 'react-number-format';
import { Field } from 'react-final-form';

import {
  withIntegersOnly,
  withFloatsOnly,
  withSpicinessScale,
  valueRequired,
} from './utils';

type DishType = 'pizza' | 'soup' | 'sandwich';

function TypeConditionFields(type: DishType) {
  switch (type) {
    case 'pizza':
      return (
        <>
          <Field
            name="no_of_slices"
            parse={parseNumericInput}
            validate={valueRequired}
          >
            {({ input, meta }) => (
              <NumberFormat
                label="Slices"
                name={input.name}
                value={input.value}
                isNumericString={true}
                customInput={TextField}
                onChange={input.onChange}
                isAllowed={withIntegersOnly}
                placeholder="Number of slices"
                error={meta.error && meta.touched}
                helperText={meta.error && meta.touched && `${meta.error}`}
              />
            )}
          </Field>
          <Field
            name="diameter"
            format={parseNumericInput}
            parse={parseNumericInput}
            validate={valueRequired}
          >
            {({ input, meta }) => (
              <NumberFormat
                label="Diameter"
                name={input.name}
                value={input.value}
                isNumericString={true}
                customInput={TextField}
                onChange={input.onChange}
                isAllowed={withFloatsOnly}
                error={meta.error && meta.touched}
                placeholder="Diameter of the pizza"
                helperText={meta.error && meta.touched && `${meta.error}`}
              />
            )}
          </Field>
        </>
      );
    case 'soup':
      return (
        <Field
          name="spiciness_scale"
          parse={parseNumericInput}
          validate={valueRequired}
        >
          {({ input, meta }) => (
            <NumberFormat
              label="Spiciness"
              name={input.name}
              value={input.value}
              isNumericString={true}
              customInput={TextField}
              onChange={input.onChange}
              isAllowed={withSpicinessScale}
              error={meta.error && meta.touched}
              placeholder="Spiciness scale (1-10)"
              helperText={meta.error && meta.touched && `${meta.error}`}
            />
          )}
        </Field>
      );
    case 'sandwich':
      return (
        <Field
          name="slices_of_bread"
          parse={parseNumericInput}
          validate={valueRequired}
        >
          {({ input, meta }) => (
            <NumberFormat
              label="Slices"
              name={input.name}
              value={input.value}
              isNumericString={true}
              customInput={TextField}
              onChange={input.onChange}
              isAllowed={withIntegersOnly}
              placeholder="Number of slices"
              error={meta.error && meta.touched}
              helperText={meta.error && meta.touched && `${meta.error}`}
            />
          )}
        </Field>
      );
    default:
      return null;
  }
}

export default TypeConditionFields;

function parseNumericInput(value: any, name: string) {
  // We have to return undefined to remove
  // the property from the values object
  return value ? +value : undefined;
}
