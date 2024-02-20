import { AttachmentIcon } from '@chakra-ui/icons';
import { Box, Button, Text } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';

import { useContactToast } from '@/modules/addressBook';
import { DrawerConnector, SigninContainer } from '@/modules/auth/components';
import { useGetCurrentAccount } from '@/modules/core';

import { useSignIn } from '../hooks';
import { useFuelAccount } from '../store';

const SigninPage = () => {
  const { isConnecting, connectors, redirectToWalletLink } = useSignIn();
  const { invalidAccount, setInvalidAccount } = useFuelAccount();
  const { getAccount } = useGetCurrentAccount();
  const { errorToast } = useContactToast();

  useEffect(() => {
    getAccount();
  }, []);

  useMemo(() => {
    invalidAccount &&
      errorToast({
        title: 'Invalid Account',
        description: 'You need to use the fuel wallet to connect.',
      });
    setInvalidAccount(false);
  }, [invalidAccount]);

  const pageSections = {
    description: connectors.has
      ? 'Click the button bellow to connect your wallet to BSAFE.'
      : 'You need to use the fuel wallet to connect.',
    action: connectors.has ? (
      <Button
        size="lg"
        color="dark.500"
        fontWeight="bold"
        variant="solid"
        backgroundColor="brand.500"
        colorScheme="brand"
        backgroundSize="200% 100%"
        backgroundPosition="100% 0"
        transition="background-position .5s"
        _hover={{
          transform: 'scale(1.05)',
          transition: 'ease-in-out .3s',
        }}
        isLoading={isConnecting}
        loadingText="Connecting.."
        onClick={connectors.drawer.onOpen}
        leftIcon={<AttachmentIcon />}
      >
        Connect Wallet
      </Button>
    ) : (
      <Button
        size="lg"
        color="grey.200"
        bgColor="dark.100"
        variant="secondary"
        borderColor="dark.100"
        leftIcon={<AttachmentIcon />}
        onClick={redirectToWalletLink}
      >
        Fuel Wallet
      </Button>
    ),
  };

  return (
    <SigninContainer>
      <DrawerConnector
        isOpen={connectors.drawer.isOpen}
        onClose={connectors.drawer.onClose}
        onSelect={connectors.select}
        connectors={connectors.items}
      />
      <Box textAlign="center" mb={2}>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          bgGradient="linear(to-r, brand.500, brand.800)"
          bgClip="text"
        >
          Hey!
        </Text>
      </Box>
      <Box textAlign="start" mb={5} maxW={305}>
        <Text color="white" fontWeight="bold">
          {pageSections.description}
        </Text>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        my={5}
      >
        {pageSections.action}
      </Box>
    </SigninContainer>
  );
};

export { SigninPage };
