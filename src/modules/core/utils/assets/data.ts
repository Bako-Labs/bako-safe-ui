import { Asset, AssetMap } from './types.ts';

const NativeAssetId =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

const assetsList: Asset[] = [
  {
    name: 'Etherum',
    slug: 'ETH',
    assetId: NativeAssetId,
  },
  // {
  //     name: 'Dai',
  //     slug: 'DAI',
  //     assetId: '0x0d9be25f6bef5c945ce44db64b33da9235fbf1a9f690298698d899ad550abae1',
  // },
  // {
  //     name: 'sEther',
  //     slug: 'sETH',
  //     assetId: '0x1bdeed96ee1e5eca0bd1d7eeeb51d03b0202c1faf764fec1b276ba27d5d61d89',
  // },
];

const assetsMap: AssetMap = assetsList.reduce((previousValue, currentValue) => {
  return {
    ...previousValue,
    [currentValue.assetId]: {
      name: currentValue.name,
      slug: currentValue.slug,
    },
  };
}, {});

export { assetsList, assetsMap, NativeAssetId };