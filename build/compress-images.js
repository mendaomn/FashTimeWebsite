const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

imagemin(['src/client/images/raw/**/*.{jpg,jpeg,png,svg}'], 'src/client/images/optimized/', {
  plugins: [
      imageminJpegtran(),
      imageminPngquant({quality: '65-80'}),
  ]
}).then(files => {
  console.log(files.map(x => x.path))
});
