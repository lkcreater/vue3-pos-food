<template>
  <transition name="slide-up-down">
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
$height-trans-slide-updown-start: 0px;
$height-trans-slide-updown-end: 155px;

.slide-up-down-enter-active,
.slide-up-down-leave-active {
  transition: all 0.5s ease;
}

.slide-up-down-enter-from{
  opacity: 0;
  height: $height-trans-slide-updown-start;
}
.slide-up-down-enter-to{
  opacity: 1;
  height: $height-trans-slide-updown-end;
}


.slide-up-down-leave-from {
  opacity: 1;
  height: $height-trans-slide-updown-end;
}
.slide-up-down-leave-to {
  opacity: 0;
  height: $height-trans-slide-updown-start;
}

</style>
