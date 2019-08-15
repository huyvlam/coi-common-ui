const path = require('path');
const partials = [
  '_background.scss',
  '_border.scss',
  '_box-shadow.scss',
  '_cisco-sans.scss',
  '_device.scss',
  '_font.scss',
  '_function.scss',
  '_logo.scss',
  '_margin.scss',
  '_offset.scss',
  '_padding.scss',
  '_text-color.scss'
];

module.exports = partials.map(file => path.resolve(__dirname, 'util/' + file));
