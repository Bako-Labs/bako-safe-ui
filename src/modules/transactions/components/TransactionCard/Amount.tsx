import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import { bn } from 'fuels';

import { AssetModel, NativeAssetId } from '@/modules/core';

interface TransactionCardAmountProps {
  assets: AssetModel[];
}

const Amount = ({ assets }: TransactionCardAmountProps) => {
  const ethAmount = assets
    .filter((a) => a.assetID === NativeAssetId)
    .reduce((total, asset) => total.add(bn.parseUnits(asset.amount)), bn(0))
    .format();

  return (
    <HStack w={110} ml={0} textAlign="left">
      <Box mt={0.5}>
        <Heading variant="title-md" color="grey.200">
          {ethAmount}
        </Heading>
        <Text variant="description" fontSize="sm" color="grey.500">
          Amount sent
        </Text>
      </Box>
    </HStack>
  );
};

export { Amount };
