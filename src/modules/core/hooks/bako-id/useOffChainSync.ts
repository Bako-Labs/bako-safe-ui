import { OffChainSync } from '@bako-id/sdk';
import { useCallback, useEffect, useState } from 'react';

import { HandleUtils } from '@/utils';

import {
  AddressUtils,
  OffChainSyncCache,
  OffChainSyncInstance,
  Optional,
} from '../../utils';
import { useSyncData } from './useSyncData';

const useOffChainSync = (networkUrl: string) => {
  const [offChainSync, setOffChainSync] =
    useState<Optional<OffChainSync>>(undefined);

  useSyncData(offChainSync);

  const getHandleFromResolver = useCallback(
    (resolver: string): Optional<string> => {
      if (AddressUtils.isValid(resolver)) {
        const cachedHandle =
          OffChainSyncCache.getCachedHandleFromResolver(resolver);
        if (cachedHandle) return HandleUtils.toHandle(cachedHandle);

        const handle = offChainSync?.getDomain(resolver);
        if (handle) {
          OffChainSyncCache.updateCache(handle, resolver);
          return HandleUtils.toHandle(handle);
        }

        return undefined;
      }

      return undefined;
    },
    [offChainSync],
  );

  const getResolverFromHandle = useCallback(
    (handle: string): Optional<string> => {
      if (HandleUtils.isValidHandle(handle)) {
        const _handle = HandleUtils.fromHandle(handle);

        const cachedResolver =
          OffChainSyncCache.getCachedResolverFromHandle(_handle);
        if (cachedResolver) return cachedResolver;

        const resolver = offChainSync?.getResolver(_handle);
        if (resolver) {
          OffChainSyncCache.updateCache(_handle, resolver);
          return resolver;
        }

        return undefined;
      }

      return undefined;
    },
    [offChainSync],
  );

  useEffect(() => {
    const initOffChainSync = async () => {
      const { instance } = await OffChainSyncInstance.create(networkUrl);
      setOffChainSync(instance);
    };

    initOffChainSync();
  }, [networkUrl]);

  return {
    instance: offChainSync,
    handlers: {
      getHandleFromResolver,
      getResolverFromHandle,
    },
  };
};

export { useOffChainSync };
