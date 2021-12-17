<template>
  <div>

    <div>
      <header>
        <h1> Database Project </h1>
      </header>
      <MapActivation 
      v-bind:image="image"
      v-bind:array="array"
      v-bind:showActivation="showActivation"/> 
      <ActivationButton 
      v-bind:showActivation="showActivation"/>
    </div>
  </div>
</template>

<script>

import MapActivation from "../components/MapActivation.vue"
import ActivationButton from "../components/ActivationButton.vue"


export default {
  name: "Main",
  props: ["showActivation"],
  components: {
    MapActivation,
    ActivationButton,
  },
  data() {
    return {
      image: "https://i0.wp.com/mrandmrsluxe.com/wp-content/uploads/2016/01/maenam-beach.jpg?w=960&ssl=0",
      array: [[ 0.0192,  0.0356,  0.0410,  0.0400,  0.0602,  0.0529,  0.0288,  0.0226],
        [ 0.0701,  0.1066,  0.0758,  0.1684,  0.2329,  0.1734,  0.0548, 0.0079],
        [ 0.4039,  0.3442,  0.2985,  0.4299,  0.4599,  0.3703,  0.3247,  0.1484],
        [ 0.3438,  0.6135,  0.5804,  0.6942,  0.6756,  0.7170,  0.4882,  0.2876],
        [ 0.3814,  0.5397,  0.7328,  0.9786,  0.9612,  0.9915,  0.5383,  0.2697],
        [ 0.2746,  0.5117,  0.7075,  0.8290,  0.8114,  1.0000,  0.6823,  0.2720],
        [ 0.1528,  0.2867,  0.4074,  0.5121,  0.4112,  0.5046,  0.3711,  0.2733],
        [ 0.1093,  0.1832,  0.2955,  0.2872,  0.2942,  0.3031,  0.2773,  0.1989]],
    };
  },
  computed: {},
  methods: {},
};
</script>

<style>
header {
  text-align: center;
}
</style>