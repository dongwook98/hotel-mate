import { forwardRef, SelectHTMLAttributes } from 'react';
import styled from '@emotion/styled';

import { colors } from '@/styles/colorPalette';
import Text from './Text';
import Flex from './Flex';

export interface Option {
  label: string;
  value: string;
}

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.gray};
  border: none;
  border-radius: 16px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color: #c0c4c7;
  }
`;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder: string;
  options: Option[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, placeholder, value, ...props },
  ref
) {
  return (
    <Flex direction='column'>
      {label ? (
        <Text
          typography='t7'
          color='black'
          display='inline-block'
          style={{ marginBottom: 6 }}
        >
          {label}
        </Text>
      ) : null}
      <BaseSelect required={true} ref={ref} value={value} {...props}>
        <option disabled={true} hidden={true} value=''>
          {placeholder}
        </option>
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </BaseSelect>
    </Flex>
  );
});

export default Select;
