<template>
  <v-text-field
    ref="field"
    label="Username"
    outlined
    :counter="maxLength"
    :rules="rules"
    :value="value"
    @input="$emit('input', $event)"
    @keyup="submitForm"
  />
</template>

<script>
import usernameValidation from '@/assets/js/validation/username.js'
import validationRules from '@/assets/js/validation/rules.js'

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data: vm => ({
    maxLength: usernameValidation.maxLength,
    rules: [
      validationRules.required,
      validationRules.maxLength(usernameValidation.maxLength),
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
