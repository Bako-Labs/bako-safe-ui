import { Box, Button, Card, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { NotFoundIcon, SquarePlusIcon } from '@/components';
import { Pages } from '@/modules/core';

interface EmptyVaultProps {
  title?: string;
  description?: string;
}

const EmptyVault = (props?: EmptyVaultProps) => {
  const navigate = useNavigate();

  return (
    <Card
      w="full"
      p={20}
      bgColor="dark.300"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Box mb={6}>
        <NotFoundIcon w={100} h={100} />
      </Box>
      <Box mb={5}>
        <Heading color="brand.500" fontSize="4xl">
          {props?.title ?? `Let's Begin!`}
        </Heading>
      </Box>
      <Box maxW={400} mb={8}>
        <Text color="white" fontSize="md" textAlign="center" fontWeight="bold">
          {props?.description ??
            `Your vaults are entirely free on Fuel. Let's create your very
          first one?`}
        </Text>
      </Box>
      <Button
        leftIcon={<SquarePlusIcon />}
        variant="primary"
        onClick={() => navigate(Pages.createVault())}
      >
        Create my first vault
      </Button>
    </Card>
  );
};

export { EmptyVault };
