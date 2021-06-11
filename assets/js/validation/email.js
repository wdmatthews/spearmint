export default {
  pattern: v => !v || /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/.test(v) || 'Must be in the format: username@example.com',
}
