export default {
  required: v => !!v || 'Required',
  maxLength: (length) => {
    return v => !v || v.length <= length || `${length} characters maximum`
  },
  minLength: (length) => {
    return v => !v || v.length >= length || `${length} characters minimum`
  },
}
