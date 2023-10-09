import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = defineStyle({
  excessLabel: {
    width: '30px',
    height: '30px',
    bgColor: 'brand.500',
    borderWidth: 2,
    borderColor: 'dark.100',
    color: 'dark.900',
    fontWeight: 'bold',
    fontSize: 'sm',
    marginLeft: -2,
    letterSpacing: -1,
  },

  group: {
    '.chakra-avatar': {
      borderColor: 'dark.100',
      borderWidth: 2,
      width: '30px',
      height: '30px',
    },
  },
});

const roundedSquare = defineStyle({
  container: {
    borderRadius: 8,
  },
  excessLabel: {
    borderRadius: 8,
  },
  badge: {
    borderRadius: 8,
  },
  group: {
    '.chakra-avatar': {
      borderColor: 'dark.100',
      borderWidth: 2,
      width: '40px',
      height: '40px',
      img: {
        borderRadius: 5,
      },
    },
  },
});

const Avatar = defineStyleConfig({
  baseStyle,
  variants: {
    roundedSquare,
  },
});

export { Avatar };
