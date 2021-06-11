<template>
  <v-text-field
    ref="field"
    label="Email"
    outlined
    :disabled="disabled"
    :hint="hint"
    :persistent-hint="hint && disabled"
    :rules="disabled ? [] : rules"
    :value="value"
    @input="$emit('input', $event)"
    @keydown="submitForm"
  />
</template>

<script>
import emailValidation from '@/assets/js/validation/email.js'
import validationRules from '@/assets/js/validation/rules.js'

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
      default: '',
    },
  },
  data: vm => ({
    rules: [
      validationRules.required,
      emailValidation.pattern,
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
