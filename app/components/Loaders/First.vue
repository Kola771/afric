<template>
  <div>
    <div class="flex items-center justify-center mt-4">
        <span class="loader"></span>
    </div>
  </div>
</template>

<style scoped>
.loader {
  width: 32px;
  height: 32px;
  border: 5px solid #69798b;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>