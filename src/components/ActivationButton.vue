<template>
  <div>
    <form id="activation-button">
      <h2>Activation Button</h2>
      <div v-if="showActivation">
      <input
        type="submit"
        value="Hide Activation"
        v-on:click.prevent="toggleActivation"
      />
      </div>
      <div v-else>
        <input
            type="submit"
            value="Show Activation"
            v-on:click.prevent="toggleActivation"
        />
        </div>
    </form>
  </div>
</template>

<script>
import { eventBus } from "../main";

export default {
  name: "ActivationButton",
  props: ["showActivation"],
  components: {
  },
  data() {
    return {
    };
  },
  computed: {},
  methods: {
    toggleActivation() {
        this.showActivation = !this.showActivation; 
        eventBus.$emit("button-pressed", this.showActivation);
    },
  },
};
</script>

<style></style>