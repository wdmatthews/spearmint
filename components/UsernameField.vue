<template>
  <v-text-field
    ref="field"
    label="Username"
    outlined
    :counter="maxLength"
    :rules="rules"
    :value="value"
    @input="$emit('input', $event)"
    @keydown="submitForm"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data: vm => ({
    maxLength: 50,
    rules: [
      v => !!v || 'Required',
      v => !v || v.length < vm.maxLength || `Max of ${vm.maxLength} characters`,
    ],
  }),
  methods: {
    resetValidation() {
      this.$refs.field?.resetValidation()
    },
    submitForm(event) {
      if (event && event.key === 'Enter') {
        this.$emit('submit')
      }
    },
  },
}
</script>
