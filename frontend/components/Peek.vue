<template>
  <div class="wrap center">
    <div :class="['peek', `peek-${name}`]">
      <a class="name is-size-5-mobile is-unselectable" :href="`/#${name}`">{{
        name
      }}</a>
      <div class="path"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Peek',
  props: {
    name: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.name {
  padding-bottom: 1rem;
}
.peek {
  font-family: 'Bebas';
  text-align: center;
  position: absolute;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: opacity 750ms linear;
  opacity: 1;
  bottom: -2rem;
  &.is-unfocused {
    opacity: 0;
  }
}

.wrap {
  display: flex;
  justify-content: center;
}

.path {
  background: #4f4f4f;
  width: 1px;
  height: 5rem;
}

a.name:hover {
  color: #ffffff;
}

@media (max-height: 800px) {
  .peek {
    display: none;
  }
}
</style>
