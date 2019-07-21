<template>
  <div class="field">
    <div class="control">
      <input
        class="input is-shadowless is-size-7"
        type="text"
        :placeholder="placeholder"
        :name="name"
      />
    </div>
    <label class="label is-size-7">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'TextForm',
  props: {
    name: {
      required: true,
      type: String
    },
    placeholder: {
      required: false,
      type: String,
      default: ''
    },
    label: {
      required: true,
      type: String
    }
  }
}
</script>

<style lang="scss">
input.input {
  border-left: none;
  border-top: none;
  border-right: none;
  border-radius: 0;
  &:focus {
    color: #ffffff;
  }
}
label.label {
  font-weight: normal;
}
</style>
