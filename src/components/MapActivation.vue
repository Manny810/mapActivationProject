<template>
  <div>
      <h2>Map Activation Component</h2>
      <img :class="annotator_image_small" :src="image" ref="image" 
                @load="draw_initial_contents" tabindex='1' @keyup.esc="emit('esc')" />
        <canvas class="annotator_canvas" ref="canvas" @keyup.esc="emit('esc')" tabindex='2' 
                @mouseover="hover(true)" @mouseleave="hover(false)" />
  </div>
</template>

<script>
//import axios from "axios";
//import { eventBus } from "../main";

export default {
  name: "MapActivation",
  props: ["image", "array", "showActivation"],
  watch: {
      showActivation: function(){
          if (this.showActivation){
              this.drawActivation(); 
          } else { 
              this.clearActivation(); 
          }
      }
  }, 
  data() {
    return {};
  },
  created: function() {
  },
  methods: { 
    draw_initial_contents(){
        //let paper = this.paper;
        let img = this.$refs.image; 
        let cnv = this.$refs.canvas;


        // size of element outside
        cnv.height = img.height;
        cnv.width = img.width;
        var activation = this.generateArrayImage(this.array, img.width, img.height); 
        var ctx = cnv.getContext('2d')
        var idata = ctx.createImageData(cnv.width, cnv.height); 
        idata.data.set(activation); 
        ctx.putImageData(idata, 0, 0);  
    }, 
    clearActivation(){
        let cnv = this.$refs.canvas; 
        var ctx = cnv.getContext('2d'); 
        var img = ctx.createImageData(cnv.width, cnv.height); 
        for (var i = 0; i < img.data.length; i++){
            img.data[i] = 0; 
        }
        ctx.putImageData(img, 0, 0); 
    }, 
    drawActivation(){
        let img = this.$refs.image;
        let cnv = this.$refs.canvas; 
        var activation = this.generateArrayImage(this.array, img.width, img.height); 
        var ctx = cnv.getContext('2d')
        var idata = ctx.createImageData(cnv.width, cnv.height); 
        idata.data.set(activation); 
        ctx.putImageData(idata, 0, 0); 
    }, 
    generateArrayImage(array, width, height){
        var array_width = array[0].length, 
        array_height = array.length; 
        var data = new Uint8ClampedArray(width * height * 4);  
        for (var x = 0; x < width; x++){
            for (var y = 0; y < height; y++){
                var pos = (y * width + x) * 4; 
                var array_x = Math.floor(width / array_width); 
                var array_y = Math.floor(height / array_height); 
                var temp = array[Math.floor(y/array_y)][Math.floor(x / array_x)]
                data[pos] = 255; // Set the color to red
                data[pos + 1] = 0;
                data[pos + 2] = 0; 
                data[pos + 3] = parseInt(temp * 255); 
            }
        }
        var image = document.createElement("img");
        image.src = data; 
        return data; 
    },

  },
};
</script>

<style scoped>
.annotator_image {
    /* max-width:100%; */
    /* max-height:100%; */
    /* display:inline; */
    position:relative;
    object-fit:none; /* never rescale up */ 
}
.annotator_image_small {
  width: auto !important;
  height: auto !important;
  max-height: 200px;
  /*max-width: 400px; */
  object-fit: scale-down; /* never rescale up */ 
}
.annotator_canvas {
    /* border:0px solid #d3d3d3; */
    /* max-width:100%;*/
    /* max-height:100%; */
    position:absolute; left:44px;
    /* display:;  */
    /* for now not showing it to try to fix centering issue...*/
}
</style>