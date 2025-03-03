module.exports = {
  // ... other webpack configurations ...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
