// Mainnet
export const PROTOCOL = {
  MANTIS: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  LP_PROVIDER: "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
  LP: "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9",
  ROUTER: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  DATA_PROVIDER: "0x057835Ad21a177dbdd3090bB1CAE03EaCF78Fc6d",
}

export const TOKEN_LIST = ['AAVE', 'BAL', 'BAT', 'BUSD', 'CRV', 'DAI', 'ENJ', 'KNC', 'LINK', 'MANA', 'MKR', 'REN', 'SNX', 'SUSD', 'TUSD', 'UNI', 'WETH', 'YFI', 'ZRX'];

export const TOKENS = {
  TUSD: {
    underlyingAsset: '0x0000000000085d4780b73119b644ae5ecd22b376',
    baseLTVasCollateral: '7500',
    aToken: '0x101cc05f4a51c0319f570d5e146a8c625198e636',
    sToken: '0x7f38d60d94652072b2c44a18c0e14a481ec3c0dd',
    vToken: '0x01c0eb1f8c6f1c1bf74ae028697ce7aa2a8b0e92'
  },
  GUSD: {
    underlyingAsset: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
    baseLTVasCollateral: '0',
    aToken: '0xd37ee7e4f452c6638c96536e68090de8cbcdb583',
    sToken: '0xf8ac64ec6ff8e0028b37eb89772d21865321bce0',
    vToken: '0x279af5b99540c1a3a7e3cdd326e19659401ef99e'
  },
  YFI: {
    underlyingAsset: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
    baseLTVasCollateral: '4000',
    aToken: '0x5165d24277cd063f5ac44efd447b27025e888f37',
    sToken: '0xca823f78c2dd38993284bb42ba9b14152082f7bd',
    vToken: '0x7ebd09022be45ad993baa1cec61166fcc8644d97'
  },
  BAT: {
    underlyingAsset: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
    baseLTVasCollateral: '7000',
    aToken: '0x05ec93c0365baaeabf7aeffb0972ea7ecdd39cf1',
    sToken: '0x277f8676facf4daa5a6ea38ba511b7f65aa02f9f',
    vToken: '0xfc218a6dfe6901cb34b1a5281fc6f1b8e7e56877'
  },
  MANA: {
    underlyingAsset: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
    baseLTVasCollateral: '6000',
    aToken: '0xa685a61171bb30d4072b338c80cb7b2c865c873e',
    sToken: '0xd86c74ea2224f4b8591560652b50035e4e5c0a3b',
    vToken: '0x0a68976301e46ca6ce7410db28883e309ea0d352'
  },
  UNI: {
    underlyingAsset: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    baseLTVasCollateral: '6000',
    aToken: '0xb9d7cb55f463405cdfbe4e90a6d2df01c2b92bf1',
    sToken: '0xd939f7430dc8d5a427f156de1012a56c18acb6aa',
    vToken: '0x5bdb050a92cadccfcdcccbfc17204a1c9cc0ab73'
  },
  WBTC: {
    underlyingAsset: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    baseLTVasCollateral: '7000',
    aToken: '0x9ff58f4ffb29fa2266ab25e75e2a8b3503311656',
    sToken: '0x51b039b9afe64b78758f8ef091211b5387ea717c',
    vToken: '0x9c39809dec7f95f5e0713634a4d0701329b3b4d2'
  },
  REN: {
    underlyingAsset: '0x408e41876cccdc0f92210600ef50372656052a38',
    baseLTVasCollateral: '5500',
    aToken: '0xcc12abe4ff81c9378d670de1b57f8e0dd228d77a',
    sToken: '0x3356ec1efa75d9d150da1ec7d944d9edf73703b7',
    vToken: '0xcd9d82d33bd737de215cdac57fe2f7f04df77fe0'
  },
  BUSD: {
    underlyingAsset: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
    baseLTVasCollateral: '0',
    aToken: '0xa361718326c15715591c299427c62086f69923d9',
    sToken: '0x4a7a63909a72d268b1d8a93a9395d098688e0e5c',
    vToken: '0xba429f7011c9fa04cdd46a2da24dc0ff0ac6099c'
  },
  LINK: {
    underlyingAsset: '0x514910771af9ca656af840dff83e8264ecf986ca',
    baseLTVasCollateral: '7000',
    aToken: '0xa06bc25b5805d5f8d82847d191cb4af5a3e873e0',
    sToken: '0xfb4aec4cc858f2539ebd3d37f2a43eae5b15b98a',
    vToken: '0x0b8f12b1788bfde65aa1ca52e3e9f3ba401be16d'
  },
  SUSD: {
    underlyingAsset: '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
    baseLTVasCollateral: '0',
    aToken: '0x6c5024cd4f8a59110119c56f8933403a539555eb',
    sToken: '0x30b0f7324fedf89d8eff397275f8983397efe4af',
    vToken: '0xdc6a3ab17299d9c2a412b0e0a4c1f55446ae0817'
  },
  DAI: {
    underlyingAsset: '0x6b175474e89094c44da98b954eedeac495271d0f',
    baseLTVasCollateral: '7500',
    aToken: '0x028171bca77440897b824ca71d1c56cac55b68a3',
    sToken: '0x778a13d3eeb110a4f7bb6529f99c000119a08e92',
    vToken: '0x6c3c78838c761c6ac7be9f59fe808ea2a6e4379d'
  },
  AAVE: {
    underlyingAsset: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
    baseLTVasCollateral: '5000',
    aToken: '0xffc97d72e13e01096502cb8eb52dee56f74dad7b',
    sToken: '0x079d6a3e844bcecf5720478a718edb6575362c5f',
    vToken: '0xf7dba49d571745d9d7fcb56225b05bea803ebf3c'
  },
  MKR: {
    underlyingAsset: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
    baseLTVasCollateral: '6000',
    aToken: '0xc713e5e149d5d0715dcd1c156a020976e7e56b88',
    sToken: '0xc01c8e4b12a89456a9fd4e4e75b72546bf53f0b5',
    vToken: '0xba728ead5e496be00dcf66f650b6d7758ecb50f8'
  },
  USDC: {
    underlyingAsset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    baseLTVasCollateral: '8000',
    aToken: '0xbcca60bb61934080951369a648fb03df4f96263c',
    sToken: '0xe4922afab0bbadd8ab2a88e0c79d884ad337fca6',
    vToken: '0x619beb58998ed2278e08620f97007e1116d5d25b'
  },
  BAL: {
    underlyingAsset: '0xba100000625a3754423978a60c9317c58a424e3d',
    baseLTVasCollateral: '5500',
    aToken: '0x272f97b7a56a387ae942350bbc7df5700f8a4576',
    sToken: '0xe569d31590307d05da3812964f1edd551d665a0b',
    vToken: '0x13210d4fe0d5402bd7ecbc4b5bc5cfca3b71adb0'
  },
  SNX: {
    underlyingAsset: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    baseLTVasCollateral: '1500',
    aToken: '0x35f6b052c598d933d69a4eec4d04c73a191fe6c2',
    sToken: '0x8575c8ae70bdb71606a53aea1c6789cb0fbf3166',
    vToken: '0x267eb8cf715455517f9bd5834aeae3cea1ebdbd8'
  },
  WETH: {
    underlyingAsset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    baseLTVasCollateral: '8000',
    aToken: '0x030ba81f1c18d280636f32af80b9aad02cf0854e',
    sToken: '0x4e977830ba4bd783c0bb7f15d3e243f73ff57121',
    vToken: '0xf63b34710400cad3e044cffdcab00a0f32e33ecf'
  },
  CRV: {
    underlyingAsset: '0xd533a949740bb3306d119cc777fa900ba034cd52',
    baseLTVasCollateral: '4000',
    aToken: '0x8dae6cb04688c62d939ed9b68d32bc62e49970b1',
    sToken: '0x9288059a74f589c919c7cf1db433251cdfeb874b',
    vToken: '0x00ad8ebf64f141f1c81e9f8f792d3d1631c6c684'
  },
  USDT: {
    underlyingAsset: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    baseLTVasCollateral: '0',
    aToken: '0x3ed3b47dd13ec9a98b44e6204a523e766b225811',
    sToken: '0xe91d55ab2240594855abd11b3faae801fd4c4687',
    vToken: '0x531842cebbdd378f8ee36d171d6cc9c4fcf475ec'
  },
  KNC: {
    underlyingAsset: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
    baseLTVasCollateral: '6000',
    aToken: '0x39c6b3e42d6a679d7d776778fe880bc9487c2eda',
    sToken: '0x9915dfb872778b2890a117da1f35f335eb06b54f',
    vToken: '0x6b05d1c608015ccb8e205a690cb86773a96f39f1'
  },
  ZRX: {
    underlyingAsset: '0xe41d2489571d322189246dafa5ebde1f4699f498',
    baseLTVasCollateral: '6000',
    aToken: '0xdf7ff54aacacbff42dfe29dd6144a69b629f8c9e',
    sToken: '0x071b4323a24e73a5afeebe34118cd21b8faaf7c3',
    vToken: '0x85791d117a392097590bded3bd5abb8d5a20491a'
  },
  ENJ: {
    underlyingAsset: '0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c',
    baseLTVasCollateral: '5500',
    aToken: '0xac6df26a590f08dcc95d5a4705ae8abbc88509ef',
    sToken: '0x943dcca156b5312aa24c1a08769d67fece4ac14c',
    vToken: '0x38995f292a6e31b78203254fe1cdd5ca1010a446'
  }
};