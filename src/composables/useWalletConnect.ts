import { ref } from "vue";
import { Web3Modal } from "@web3modal/html";
import { configureChains, createConfig } from "@wagmi/core";
import { arbitrum, mainnet, polygon } from "@wagmi/core/chains";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";

const PROJECT_ID = import.meta.env.VITE_APP_CONNECT_KEY;
const chains = [arbitrum, mainnet, polygon];
const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId: PROJECT_ID }),
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId: PROJECT_ID, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export default function () {
  const web3modal = ref<Web3Modal | undefined>(undefined);

  const connect = async () => {
    web3modal.value = new Web3Modal({ projectId: PROJECT_ID }, ethereumClient);
    web3modal.value?.openModal();
  };

  return {
    connect,
  };
}
