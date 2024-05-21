import * as d3 from 'd3';

export const createSVG = ({
  backgroundColor,
}) => {
  const svg = document.createElement('div');
  
  d3.select(svg).append('svg')
    .attr('width', 300)
    .attr('height', 300)
    .style('background-color', backgroundColor)

  return svg;
};