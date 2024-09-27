import { useQuery } from '@tanstack/react-query';

import { PredicateAndWorkspace } from '@/modules/vault';
import { useWorkspaceContext } from '@/modules/workspace/WorkspaceProvider';

import { createVault } from './createVault';
import { instantiateVault } from './instantiateVault';
import { useBakoSafeMutation } from './utils';

const VAULT_QUERY_KEYS = {
  DEFAULT: ['bakosafe', 'vault'],
  VAULT: (id: string) => [...VAULT_QUERY_KEYS.DEFAULT, id],
};

interface UseCreateBakoSafeVaultParams {
  onSuccess: (data: PredicateAndWorkspace) => void;
  onError: () => void;
}

interface UseCreateBakoSafeVaultPayload {
  name: string;
  description: string;
  addresses: string[];
  minSigners: number;
}

interface IUseBakoSafeVault {
  provider: string;
  address: string;
  id: string;
}

const useBakoSafeVault = async ({ address, id }: IUseBakoSafeVault) => {
  const { authDetails } = useWorkspaceContext();
  const { data, ...rest } = useQuery({
    queryKey: [
      ...VAULT_QUERY_KEYS.VAULT(id),
      authDetails.userInfos.workspace?.id,
    ],
    queryFn: async () => {
      const vault = await instantiateVault({
        predicateAddress: address,
      });
      return vault;
    },
    enabled: !!id,
  });
  console.log({ data });
  // const { data, ...rest } = useBakoSafeQuery(
  //   [...VAULT_QUERY_KEYS.VAULT(id), authDetails.userInfos.workspace?.id],
  //   async () => {
  //     const vault = await instantiateVault({
  //       predicateAddress: address,
  //     });
  //     return vault;
  //   },
  //   {
  //     enabled: !!id,
  //   },
  // );
  return {
    vault: data,
    ...rest,
  };
};

const useCreateBakoSafeVault = (params?: UseCreateBakoSafeVaultParams) => {
  const { mutate, ...mutation } = useBakoSafeMutation<
    PredicateAndWorkspace,
    unknown,
    UseCreateBakoSafeVaultPayload
  >(
    VAULT_QUERY_KEYS.DEFAULT,
    async ({ minSigners, addresses }) => {
      try {
        const newVault = await createVault({
          minSigners,
          signers: addresses,
        });

        return newVault;
      } catch (e) {
        console.log('[ERROR_ON_VAULT_CREATE]', e);
        throw e;
      }
    },
    {
      onError: params?.onError,
      onSuccess: params?.onSuccess,
    },
  );

  return {
    create: mutate,
    ...mutation,
  };
};

export { useBakoSafeVault, useCreateBakoSafeVault };
