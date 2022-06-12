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

export const renderNumericTextField = ({
  input,
  meta,
  numberFormat,
  mask,
  ...rest
}: {
  // no idea how to type these properly :(
  input: any;
  meta: any;
  numberFormat?: string;
  mask?: string;
}) => (
  <NumberFormat
    customInput={TextField}
    name={input.name}
    value={input.value}
    onChange={input.onChange}
    error={meta.error && meta.touched}
    helperText={meta.error && meta.touched && `${meta.error}`}
    isNumericString={!mask && true}
    format={numberFormat}
    mask={mask}
    {...input}
    {...rest}
  />
);

//@ts-ignore no idea how to type these properly :(
const TypeConditionField = ({ name, ...rest }) => (
  <Field
    component={renderNumericTextField}
    validate={valueRequired}
    parse={parseNumericInput}
    format={parseNumericInput}
    name={name}
    {...rest}
  />
);
function TypeConditionalFields(type: DishType) {
  switch (type) {
    case 'pizza':
      return (
        <>
          <TypeConditionField
            name="no_of_slices"
            label="Slices"
            placeholder="Number of slices"
            isAllowed={withIntegersOnly}
          />

          <TypeConditionField
            name="diameter"
            label="Diameter"
            placeholder="Diameter of the pizza"
            isAllowed={withFloatsOnly}
          />
        </>
      );

    case 'soup':
      return (
        <TypeConditionField
          name="spiciness_scale"
          label="Spiciness"
          placeholder="Spiciness scale (1-10)"
          isAllowed={withSpicinessScale}
        />
      );

    case 'sandwich':
      return (
        <TypeConditionField
          name="slices_of_bread"
          label="Slices"
          placeholder="Number of slices"
          isAllowed={withIntegersOnly}
        />
      );

    default:
      return null;
  }
}

export default TypeConditionalFields;

function parseNumericInput(value: any, name: string) {
  // We have to return undefined to remove
  // the property from the values object
  return value ? +value : undefined;
}
