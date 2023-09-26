import { Flex, FlexProps } from '@chakra-ui/react';

export interface ContentProps extends FlexProps {}

const Content = (props: ContentProps) => {
  return <Flex flex={1}>{props.children}</Flex>;
};

export { Content };
