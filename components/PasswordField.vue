<template>
  <v-text-field
    ref="field"
    type="password"
    outlined
    :label="label"
    :counter="maxLength"
    :rules="rules"
    :value="value"
    @input="$emit('input', $event)"
    @keyup="submitForm"
  />
</template>

<script>
import passwordValidation from '@/assets/js/validation/password.js'
import validationRules from '@/assets/js/validation/rules.js'

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'Password',
    },
    additionalRules: {
      type: Array,
      default: () => [],
    },
  },
  data: vm => ({
    maxLength: passwordValidation.maxLength,
    rules: [
      validationRules.required,
      validationRules.minLength(passwordValidation.minLength),
      validationRules.maxLength(passwordValidation.maxLength),
      ...vm.additionalRules,
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
