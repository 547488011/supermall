
module: {
  rules: [{
    test: /\.css$/,
    loader:'px2vw-view-loader',
      query:{
        viewportWidth: 750,
        viewportUnit: 'vw',
        minPixelValue:1,
        decimal:3
      }
  }]
}