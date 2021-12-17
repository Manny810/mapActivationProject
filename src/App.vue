<template>
  <div>
    <router-view v-bind:showActivation="showActivation">
    </router-view>
  </div>
</template>

<script>
    import { eventBus } from "./main";

    export default {
        name: "app",
        components: {},
        data() {
            return {
            showActivation: true,
            };
        },
        created: function() {
            eventBus.$on("button-pressed", (response) => {
              this.showActivation = response; 
            });
        },
        computed: {},
        methods: {},
    };
</script>

<style></style>