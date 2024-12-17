import { HStack, Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';

import { UpRightArrow } from '@/components/icons';
import { useScreenSize } from '@/modules/core/hooks';
import { HandleUtils } from '@/utils/handle';

const { VITE_BAKO_ID_URL } = import.meta.env;

interface GoToBakoIdProps {
  handle: string;
}

const GoToBakoId = ({ handle }: GoToBakoIdProps) => {
  const _handle = useMemo(() => HandleUtils.fromHandle(handle ?? ''), [handle]);

  const { isMobile } = useScreenSize();

  return (
    <HStack
      spacing={4}
      px={4}
      py={3}
      cursor="pointer"
      onClick={() => window.open(`${VITE_BAKO_ID_URL}/${_handle}`, '_BLANK')}
    >
      <UpRightArrow color="grey.50" fontSize="lg" />
      <VStack alignItems="flex-start" spacing={0} fontSize="xs">
        <Text color="grey.50">Go to Bako ID</Text>
        <Text
          isTruncated
          textOverflow="ellipsis"
          maxW={isMobile ? '75vw' : '220px'}
          color="grey.425"
        >
          {handle}
        </Text>
      </VStack>
    </HStack>
  );
};

export { GoToBakoId };
