import {
  ethPlorer,
  ETHTokenExplorer,
  SecureWalletName,
  InsecureWalletName,
  gasPriceDefaults
} from 'config/data';
import {
  ETH_DEFAULT,
  ETH_TREZOR,
  ETH_LEDGER,
  ETC_LEDGER,
  ETC_TREZOR,
  ETH_TESTNET,
  EXP_DEFAULT,
  UBQ_DEFAULT,
  XBO_DEFAULT
} from 'config/dpaths';
import { ConfigAction } from 'actions/config';
import { StaticNetworkIds, StaticNetworkConfig, BlockExplorerConfig } from 'types/network';

export type State = { [key in StaticNetworkIds]: StaticNetworkConfig };

// Must be a website that follows the ethplorer convention of /tx/[hash] and
// address/[address] to generate the correct functions.
// TODO: put this in utils / libs
export function makeExplorer(name: string, origin: string): BlockExplorerConfig {
  return {
    name,
    origin,
    txUrl: hash => `${origin}/tx/${hash}`,
    addressUrl: address => `${origin}/address/${address}`,
    blockUrl: blockNum => `${origin}/block/${blockNum}`
  };
}

const testnetDefaultGasPrice = {
  min: 0.1,
  max: 40,
  initial: 4
};

export const INITIAL_STATE: State = {
  ETH: {
    name: 'ETH',
    unit: 'ETH',
    chainId: 1,
    isCustom: false,
    color: '#007896',
    blockExplorer: makeExplorer('Etherscan', 'https://etherscan.io'),
    tokenExplorer: {
      name: ethPlorer,
      address: ETHTokenExplorer
    },
    tokens: require('config/tokens/eth.json'),
    contracts: require('config/contracts/eth.json'),
    dPathFormats: {
      [SecureWalletName.TREZOR]: ETH_TREZOR,
      [SecureWalletName.LEDGER_NANO_S]: ETH_LEDGER,
      [InsecureWalletName.MNEMONIC_PHRASE]: ETH_DEFAULT
    },
    gasPriceSettings: gasPriceDefaults,
    shouldEstimateGasPrice: true
  },
  Ropsten: {
    name: 'Ropsten',
    unit: 'ETH',
    chainId: 3,
    isCustom: false,
    color: '#adc101',
    blockExplorer: makeExplorer('Etherscan', 'https://ropsten.etherscan.io'),
    tokens: require('config/tokens/ropsten.json'),
    contracts: require('config/contracts/ropsten.json'),
    isTestnet: true,
    dPathFormats: {
      [SecureWalletName.TREZOR]: ETH_TESTNET,
      [SecureWalletName.LEDGER_NANO_S]: ETH_TESTNET,
      [InsecureWalletName.MNEMONIC_PHRASE]: ETH_TESTNET
    },
    gasPriceSettings: testnetDefaultGasPrice
  },
  Kovan: {
    name: 'Kovan',
    unit: 'ETH',
    chainId: 42,
    isCustom: false,
    color: '#adc101',
    blockExplorer: makeExplorer('Etherscan', 'https://kovan.etherscan.io'),
    tokens: require('config/tokens/ropsten.json'),
    contracts: require('config/contracts/ropsten.json'),
    isTestnet: true,
    dPathFormats: {
      [SecureWalletName.TREZOR]: ETH_TESTNET,
      [SecureWalletName.LEDGER_NANO_S]: ETH_TESTNET,
      [InsecureWalletName.MNEMONIC_PHRASE]: ETH_TESTNET
    },
    gasPriceSettings: testnetDefaultGasPrice
  },
  Rinkeby: {
    name: 'Rinkeby',
    unit: 'ETH',
    chainId: 4,
    isCustom: false,
    color: '#adc101',
    blockExplorer: makeExplorer('Etherscan', 'https://rinkeby.etherscan.io'),
    tokens: require('config/tokens/rinkeby.json'),
    contracts: require('config/contracts/rinkeby.json'),
    isTestnet: true,
    dPathFormats: {
      [SecureWalletName.TREZOR]: ETH_TESTNET,
      [SecureWalletName.LEDGER_NANO_S]: ETH_TESTNET,
      [InsecureWalletName.MNEMONIC_PHRASE]: ETH_TESTNET
    },
    gasPriceSettings: testnetDefaultGasPrice
  },
  ETC: {
    name: 'ETC',
    unit: 'ETC',
    chainId: 61,
    isCustom: false,
    color: '#669073',
    blockExplorer: makeExplorer('GasTracker', 'https://gastracker.io'),
    tokens: require('config/tokens/etc.json'),
    contracts: require('config/contracts/etc.json'),
    dPathFormats: {
      [SecureWalletName.TREZOR]: ETC_TREZOR,
      [SecureWalletName.LEDGER_NANO_S]: ETC_LEDGER,
      [InsecureWalletName.MNEMONIC_PHRASE]: ETC_TREZOR
    },
    gasPriceSettings: {
      min: 0.1,
      max: 10,
      initial: 1
    }
  },
  UBQ: {
    name: 'UBQ',
    unit: 'UBQ',
    chainId: 8,
    isCustom: false,
    color: '#b37aff',
    blockExplorer: makeExplorer('Ubiqscan', 'https://ubiqscan.io/en'),
    tokens: require('config/tokens/ubq.json'),
    contracts: require('config/contracts/ubq.json'),
    dPathFormats: {
      [SecureWalletName.TREZOR]: UBQ_DEFAULT,
      [SecureWalletName.LEDGER_NANO_S]: UBQ_DEFAULT,
      [InsecureWalletName.MNEMONIC_PHRASE]: UBQ_DEFAULT
    },
    gasPriceSettings: {
      min: 1,
      max: 60,
      initial: 20
    }
  },
  EXP: {
    name: 'EXP',
    unit: 'EXP',
    chainId: 2,
    isCustom: false,
    color: '#673ab7',
    blockExplorer: makeExplorer('Gander', 'https://www.gander.tech'),
    tokens: require('config/tokens/exp.json'),
    contracts: require('config/contracts/exp.json'),
    dPathFormats: {
      [SecureWalletName.TREZOR]: EXP_DEFAULT,
      [SecureWalletName.LEDGER_NANO_S]: EXP_DEFAULT,
      [InsecureWalletName.MNEMONIC_PHRASE]: EXP_DEFAULT
    },
    gasPriceSettings: {
      min: 0.1,
      max: 20,
      initial: 2
    }
  },
  XBO: {
    name: 'XBO',
    unit: 'XBO',
    chainId: 0,
    isCustom: false,
    color: '#0000ff',
    blockExplorer: makeExplorer('Ubiqscan', 'http://www.boltscan.com'),
    tokens: require('config/tokens/xbo.json'),
    contracts: require('config/contracts/xbo.json'),
    dPathFormats: {
      [SecureWalletName.TREZOR]: XBO_DEFAULT,
      [SecureWalletName.LEDGER_NANO_S]: XBO_DEFAULT,
      [InsecureWalletName.MNEMONIC_PHRASE]: XBO_DEFAULT
    },
    gasPriceSettings: {
      min: 0.1,
      max: 10,
      initial: 1
    }
  },
};

export const staticNetworks = (state: State = INITIAL_STATE, action: ConfigAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
