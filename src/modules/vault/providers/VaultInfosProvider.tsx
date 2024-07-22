import React, { createContext, useContext } from 'react';
import { UseVaultDetailsReturn, useVaultDetails } from '../hooks';

import { useGetParams } from '@/modules';

export type IVaultInfoContext = UseVaultDetailsReturn | null;

const VaultInfosContext = createContext<IVaultInfoContext>(null);

const VaultInfosProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    vaultPageParams: { vaultId, workspaceId },
  } = useGetParams();

  const vaultDetails: IVaultInfoContext = useVaultDetails({
    byMonth: true,
    vaultId: vaultId ?? '',
    workspaceId: workspaceId ?? '',
  });

  return (
    <VaultInfosContext.Provider value={vaultDetails}>
      {children}
    </VaultInfosContext.Provider>
  );
};

const useVaultInfosContext = () => {
  const context = useContext(VaultInfosContext);
  if (!context) {
    throw new Error(
      'useVaultInfosContext must be used within VaultInfosProvider',
    );
  }

  return context;
};

export { VaultInfosProvider, useVaultInfosContext };
