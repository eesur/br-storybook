import * as d3 from 'd3';
import _ from 'lodash';

export function dotTileV1(element, data, {
  title = null,
  w = 300, 
  h = 150,
  radius = 15, 
  startAtZero = true, 
  xPadding = 20, 
  bgdCol = '#e4f1e6',
  lineCol = '#688e70',
  circleFill = '#f59994',
  circleTextFill = bgdCol, 
  titleCol = '#394437', 
  titlePadding = 25, 
  offsetHeight = h + titlePadding 
} = {}) {

  const min = (startAtZero) ? 0 : d3.min(data, d => d.value);
  const max = d3.max(data, d => d.value);

  const xScale = d3.scaleLinear()
    .domain([min, max * 1.1])
    .range([xPadding, w - (xPadding * 2)]);

  const svg = d3.select(element)
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  svg.append('rect')
    .attr('width', w)
    .attr('height', h)
    .attr('rx', 20)
    .attr('fill', bgdCol);

  if (title !== null) {
    svg.append('text')
      .attr('y', titlePadding)
      .attr('x', w / 2)
      .attr('text-anchor', 'middle')
      .style('fill', titleCol)
      .text(title);
  }

  svg.append('line')
    .attr('x1', xPadding)
    .attr('y1', offsetHeight / 2)
    .attr('x2', w - xPadding)
    .attr('y2', offsetHeight / 2)
    .attr('stroke', lineCol)
    .attr('stroke-dasharray', 2);

  const join = svg.selectAll('g')
    .data(_.sortBy(data, d => d.value)) 
    .join('g')
    .attr('transform', (d, i) => {
      return `translate(${xScale(d.value)}, ${offsetHeight / 2})`;
    });

  join.append('circle')
    .attr('fill', circleFill)
    .attr('r', radius)
    .style('opacity', 0.9);

  join.append('text')
    .style('fill', circleTextFill)
    .style('font-weight', '800')
    .attr('text-anchor', 'middle')
    .attr('y', 5)
    .text(d => d.label);

  join.append('text')
    .attr('text-anchor', 'middle')
    .style('font-size', '11px')
    .attr('y', (d, i) => (i % 2 === 0) ? 30 : -22)
    .text(d => d.value);
}
