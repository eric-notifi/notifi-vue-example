<script lang="ts">
import {
  NotifiSubscriptionCard,
  NotifiContext,
} from "@notifi-network/notifi-react-card";
import { applyReactInVue, applyPureReactInVue } from "veaury";
import { ref } from "vue";

import useWalletConnect from "./composables/useWalletConnect";
import { arrayify } from "ethers/lib/utils";

import { getAccount, signMessage as wagmiSignMessage } from "@wagmi/core";

const { connect } = useWalletConnect();
const account = ref("");

const connectWalletConnect = async () => {
  await connect();
  const accounts = await getAccount();
  console.log(accounts);
  account.value = accounts.address ?? "";
};

const signMessage = async (message: Uint8Array) => {
  const stringMessage = new TextDecoder("utf-8").decode(message);
  const result = await wagmiSignMessage({ message: stringMessage });
  console.log(result);
  return arrayify(result);
};

export default {
  components: {
    Card: applyPureReactInVue(NotifiSubscriptionCard),
    Context: applyReactInVue(NotifiContext),
  },
  data() {
    return {
      account,
    };
  },
  methods: {
    connectWalletConnect,
    signMessage,
  },
};
</script>

<template>
  <main>
    <Context
      v-if="account"
      dappAddress="testimpl"
      env="Production"
      :walletPublicKey="account"
      walletBlockchain="ETHEREUM"
      :signMessage="signMessage"
    >
      <Card cardId="7fa9505a96064ed6b91ba2d14a9732de" :darkMode="true" />
    </Context>
    <button @click="connectWalletConnect">Connect</button>
    <div>Account: {{ account }}</div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
