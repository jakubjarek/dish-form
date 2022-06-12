const INTS_REG_EXP = /^[0-9\b]+$/;
const FLOATS_REG_EXP = /^[0-9]+\.[0-9]+|^[0-9]+/;
const MAX_LENGTH = 9;

export const withIntegersOnly = ({ value }: { value: string }) => {
  if (value.length > MAX_LENGTH) return false;
  return value === '' || INTS_REG_EXP.test(value) || false;
};

export const withFloatsOnly = ({ value }: { value: string }) => {
  if (value.length > MAX_LENGTH) return false;
  return !value || FLOATS_REG_EXP.test(value) || false;
};

export const withSpicinessScale = ({ value }: { value: string }) => {
  const withinScale = +value >= 1 && +value <= 10 && INTS_REG_EXP.test(value);
  return value === '' || withinScale || false;
};

export const valueRequired = (value: any) =>
  value || +value === 0 ? undefined : 'We need some content in here 🦔';

export const timeRequired = (value: any) => {
  if (!value) return valueRequired(value);

  const cells = value.split(':');
  for (const cell of cells) {
    if (isNaN(+cell)) return 'We need some more numbers 🐸';
  }
};
