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
    in: path.join(inPath, 'about.core.scss'),
    out: path.join(inPath, 'about.core.css')
  }, {
    in: path.join(inPath, 'team.core.scss'),
    out: path.join(inPath, 'team.core.css')
  }, {
    in: path.join(inPath, 'hw.core.scss'),
    out: path.join(inPath, 'hw.core.css')
  }, {
    in: path.join(inPath, 'mobile.core.scss'),
    out: path.join(inPath, 'mobile.core.css')
  }, {
    in: path.join(inPath, 'business.core.scss'),
    out: path.join(inPath, 'business.core.css')
  }
  , {
    in: path.join(inPath, 'privacy.core.scss'),
    out: path.join(inPath, 'privacy.core.css')
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
