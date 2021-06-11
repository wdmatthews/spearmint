<template>
  <v-text-field
    ref="field"
    label="Name"
    outlined
    :hint="hint"
    :persistent-hint="!!hint"
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
    hint: {
      type: String,
      default: '',
    },
    additionalRules: {
      type: Array,
      default: () => [],
    },
  },
  data: vm => ({
    maxLength: nameValidation.maxLength,
    rules: [
      validationRules.required,
      validationRules.maxLength(nameValidation.maxLength),
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
