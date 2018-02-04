module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'IFrameReact',
      externals: {
        react: 'React'
      }
    }
  }
}
