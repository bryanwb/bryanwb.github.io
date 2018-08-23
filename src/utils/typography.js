import Typography from 'typography';
import themeBootstrap from 'typography-theme-bootstrap';



themeBootstrap.googleFonts = [
  {
    name: 'Roboto',
    styles: [
      '700',
      '400',
      '400i'
    ]
  }
];

themeBootstrap.bodyFontFamily = ['Roboto'];
themeBootstrap.headerFontFamily = ['Roboto'];

const typography = new Typography(themeBootstrap);

export default typography;
