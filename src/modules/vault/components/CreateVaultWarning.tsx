import {
  Heading,
  HStack,
  Icon,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react';

import { TriangleWarning } from '@/components';

interface ICreateVaultWarningProps extends StackProps {}

const CreateVaultWarning = (props: ICreateVaultWarningProps) => {
  return (
    <VStack
      w="full"
      borderRadius="8px"
      border="1px solid rgba(255, 192, 16, 0.3)"
      bgColor="rgba(255, 192, 16, 0.15)"
      backdropFilter=" blur(30px)"
      padding="8px 8px 12px 8px"
      alignItems="start"
      {...props}
    >
      <HStack>
        <Icon as={TriangleWarning} fontSize="md" />
        <Heading
          color="brand.500"
          fontWeight={600}
          fontSize="sm"
          lineHeight="16.94px"
        >
          Warning
        </Heading>
      </HStack>

      <Text
        fontWeight={400}
        fontSize="xs"
        lineHeight="14.52px"
        color="brand.400"
        pl={7}
      >
        Please ensure that all signer addresses are valid and accessible wallet
        addresses on the Fuel Network. Addresses from other Bako Safe Vaults and
        wallets from other networks cannot be used as signers.
      </Text>
    </VStack>
  );
};

export default CreateVaultWarning;
