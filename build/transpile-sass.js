const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const inPath = path.join(__dirname, '..', 'src', 'client', 'styles');
const outPath = path.join(__dirname, '..', 'dist');
const files = [
  {
    in: path.join(inPath, 'home.core.scss'),
    out: path.join(outPath, 'views', 'inlines', 'home.core.css')
  }, {
    in: path.join(inPath, 'home.later.scss'),
    out: path.join(outPath, 'client', 'styles', 'home.later.css')
  }, {
    in: path.join(inPath, 'prodotti.core.scss'),
    out: path.join(outPath, 'views', 'inlines', 'prodotti.core.css')
  }, {
    in: path.join(inPath, 'prodotti.later.scss'),
    out: path.join(outPath, 'client', 'styles', 'prodotti.later.css')
  }, {
    in: path.join(inPath, 'prodotto.core.scss'),
    out: path.join(outPath, 'views', 'inlines', 'prodotto.core.css')
  }, {
    in: path.join(inPath, 'prodotto.later.scss'),
    out: path.join(outPath, 'client', 'styles', 'prodotto.later.css')
  }
];

const CleanCSS = require('clean-css');
const sass = require('node-sass');
files.forEach(file => {
  sass.render({
    file: file.in
  }, (err, result) => {
    if (err) {
      throw err;
    }

    mkdirp(path.dirname(file.out), err => {
      if (err) {
        throw err;
      }

      const output = new CleanCSS().minify(result.css);
      fs.writeFile(file.out, output.styles, 'utf-8');
    });
  });
});
