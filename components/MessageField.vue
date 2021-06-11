<template>
  <v-textarea
    ref="field"
    outlined
    auto-grow
    rows="1"
    hint="Shift + Enter to add a new line"
    :label="label"
    :counter="maxLength"
    :rules="rules"
    :value="value"
    @input="$emit('input', $event)"
    @keydown="submitForm"
  />
</template>

<script>
import messageValidation from '@/assets/js/validation/message.js'
import validationRules from '@/assets/js/validation/rules.js'

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'Message',
    },
    additionalRules: {
      type: Array,
      default: () => [],
    },
  },
  data: vm => ({
    maxLength: messageValidation.maxLength,
    rules: [
      validationRules.required,
      validationRules.maxLength(messageValidation.maxLength),
      ...vm.additionalRules,
    ],
  }),
  methods: {
    resetValidation() {
      this.$refs.field?.resetValidation()
    },
    submitForm(event) {
      if (event && event.key === 'Enter' && !event.shiftKey
        && this.$refs.field.$refs.input.selectionEnd === this.value.length) {
        event.preventDefault()
        this.$emit('submit')
      }
    },
  },
}
</script>
