import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  HStack,
  Icon,
  VStack,
} from '@chakra-ui/react';

import { HomeIcon } from '@/components';
import { Pages } from '@/modules/core';
import { useTemplateStore } from '@/modules/template/store';
import { useVaultDetails } from '@/modules/vault/hooks';

import { SettingsOverview } from '../../components/SettingsOverview';

const VaultSettingsPage = () => {
  const { vault, store, navigate } = useVaultDetails();
  const { setTemplateFormInitial } = useTemplateStore();

  if (!vault) return null;

  return (
    <Box w="full">
      <HStack mb={8} w="full" justifyContent="space-between">
        <Breadcrumb>
          <BreadcrumbItem>
            <Icon mr={2} as={HomeIcon} fontSize="sm" color="grey.200" />
            <BreadcrumbLink
              fontSize="sm"
              color="grey.200"
              fontWeight="semibold"
              href={Pages.home()}
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink
              fontSize="sm"
              color="grey.200"
              fontWeight="semibold"
              href="#"
            >
              Settings
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink
              fontSize="sm"
              color="grey.200"
              fontWeight="semibold"
              href={Pages.detailsVault({ vaultId: vault.id! })}
            >
              {vault.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Button
          variant="secondary"
          bgColor="dark.100"
          border="none"
          onClick={() => {
            setTemplateFormInitial({
              minSigners: vault.minSigners!,
              addresses:
                vault.signers! && vault.signers.map((signer) => signer.address),
            });
            navigate(Pages.createTemplate());
          }}
        >
          Set as template
        </Button>
      </HStack>

      <VStack mb={14} alignItems="flex-start" w="100%" spacing={5}>
        <SettingsOverview vault={vault} store={store} />
      </VStack>
    </Box>
  );
};

export { VaultSettingsPage };