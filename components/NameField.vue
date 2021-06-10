<template>
  <v-text-field
    ref="field"
    label="Name"
    outlined
    :counter="maxLength"
    :rules="rules"
    :value="value"
    @input="$emit('input', $event)"
    @keydown="submitForm"
  />
</template>

<script>
import nameValidation from '@/assets/js/validation/name.js'
import validationRules from '@/assets/js/validation/rules.js'

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data: vm => ({
    maxLength: nameValidation.maxLength,
    rules: [
      validationRules.required,
      validationRules.maxLength(nameValidation.maxLength),
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
