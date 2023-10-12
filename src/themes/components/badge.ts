import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const success = defineStyle({
  bgColor: 'success.900',
  color: 'success.500',
  borderColor: 'success.900',
});

const error = defineStyle({
  bgColor: 'error.900',
  color: 'error.500',
  borderColor: 'error.900',
});

const warning = defineStyle({
  bgColor: 'warning.900',
  color: 'warning.500',
  borderColor: 'warning.900',
});

const info = defineStyle({
  bgColor: 'rgba(18, 18, 18, 0.8)',
  color: 'grey.500',
  borderColor: 'rgba(73, 248, 174, 0.1)',
});

const baseStyle = defineStyle({
  fontSize: 'xs',
  fontWeight: 'normal',
  textTransform: 'initial',
  borderWidth: 1,
  padding: 1.5,
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  borderRadius: 8,
});

const Badge = defineStyleConfig({
  baseStyle,
  variants: {
    error,
    success,
    warning,
    info,
  },
});

export { Badge };