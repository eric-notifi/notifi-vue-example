<script lang="ts">
// import HelloWorld from "./components/HelloWorld.vue";
// import TheWelcome from "./components/TheWelcome.vue";
import { NotifiSubscriptionCard, NotifiContext } from "@notifi-network/notifi-react-card";
import { applyReactInVue, applyPureReactInVue } from "veaury";

export default {
  components: {
    Card: applyPureReactInVue(NotifiSubscriptionCard),
    Context: applyReactInVue(NotifiContext),
  },
};
</script>

<template>
  <main>
    <TheWelcome />
    <Context> <Card /> </Context>
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
