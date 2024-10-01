import { Image, Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';

import { AssetModel, assetsMap } from '@/modules/core';

interface TokenInfosProps {
  asset: AssetModel;
}

const TokenInfos = ({ asset }: TokenInfosProps) => {
  const assetInfo = useMemo(
    () =>
      asset?.assetId && assetsMap[asset?.assetId]
        ? assetsMap[asset?.assetId]
        : assetsMap['UNKNOWN'],
    [asset?.assetId],
  );
  return (
    <VStack minW="76px" alignItems="start">
      <Image
        w={{ base: 8, sm: 10 }}
        h={{ base: 8, sm: 10 }}
        src={assetInfo?.icon ?? ''}
        alt="Asset Icon"
        objectFit="cover"
      />
      <Text fontSize="sm" color="grey.500">
        {assetInfo?.slug}
      </Text>
    </VStack>
  );
};
export default TokenInfos;
