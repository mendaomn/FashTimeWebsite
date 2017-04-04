const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const inPath = path.join(__dirname, '..', 'src', 'client', 'styles');
const outPath = path.join(__dirname, '..', 'dist');
const files = [
  {
    in: path.join(inPath, 'home.core.scss'),
    out: path.join(inPath, 'home.core.css')
  }, {
    in: path.join(inPath, 'home.later.scss'),
    out: path.join(outPath, 'client', 'styles', 'home.later.css')
  }, {
    in: path.join(inPath, 'about.core.scss'),
    out: path.join(inPath, 'about.core.css')
  }, {
    in: path.join(inPath, 'about.later.scss'),
    out: path.join(outPath, 'client', 'styles', 'about.later.css')
  }, {
    in: path.join(inPath, 'team.core.scss'),
    out: path.join(inPath, 'team.core.css')
  }, {
    in: path.join(inPath, 'hw.core.scss'),
    out: path.join(inPath, 'hw.core.css')
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
