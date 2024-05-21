import * as d3 from 'd3';

export function squareBar(data, {
  bind = null,
  margin = { top: 30, right: 0, bottom: 10, left: 20 },
  barWidth = 50,
  barHeight = barWidth,
  spacing = 2.2, 
  width = data.length * (barWidth * spacing), 
  height = barHeight + 20,
  valueFormat = '.1f',
  stroke = 'none',
  strokeWidth = 0,
  opacity = 1,
  labelFontSize = '14px',
  valueFontSize = '14px',
  axisMarkerFontSize = '11px',
  axisFontSize = '11px',
  xAxis = [0, 50],
  valueKey = 'value',
  targetKey = 'target', 
  targetDir = 'targetDir',
  labelKey = 'label',
  barBgd = '#ccc',
  axisMarkerFill = '#ccc',
  barFill = '#2166ac',
  barFillBelow = '#b2182b',
  labelFill = '#fff',
  markerFill = '#454545',
  showMarker = true,
  showPctAxis = true
} = {}) {

  const w = width + margin.left + margin.right;
  const h = height + margin.top + margin.bottom;

  bind.selectAll('div').remove();
  const divContainer = bind.append('div')
    .attr('class', 'bars-wrap clearfix');
  const svgContainer = divContainer.append('div')
    .attr('class', 'svg-container');

  const yScale = d3.scaleLinear()
    .domain(xAxis)
    .range([barHeight, 0]);

  const svg = svgContainer.append('svg')
    .attr('width', w)
    .attr('height', h)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);  

  const group = svg.selectAll('g')
    .data(data)
    .join('g')
    .attr('class', (d, i) => 'bar-group g-' + i)
    .attr('transform', (d, i) => `translate(${i * (barWidth * spacing)}, 0)`);

  group.append('rect')
    .attr('class', 'bar bar-bgd')
    .attr('height', barHeight)
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', barWidth)
    .style('fill', barBgd)
    .style('opacity', opacity)
    .style('pointer-events', 'none');

  group.append('rect')
    .attr('class', 'bar bar-top')
    .attr('height', d => barHeight - yScale(d[valueKey]))
    .attr('x', 0)
    .attr('y', d => yScale(d[valueKey]))
    .attr('width', barWidth)
    .style('fill', d => {
      if (d[targetDir] === 'above' && d[valueKey] >= d[targetKey]) {
        return barFill;
      } else if (d[targetDir] === 'above' && d[valueKey] < d[targetKey]) {
        return barFillBelow;
      } else if (d[targetDir] === 'below' && d[valueKey] > d[targetKey]) {
        return barFillBelow;
      } else if (d[targetDir] === 'below' && d[valueKey] <= d[targetKey]) {
        return barFill;
      }
    })
    .style('opacity', opacity)
    .style('pointer-events', 'none');

  if (showMarker) {
    group.append('line')
      .attr('class', 'marker bar-marker-top')
      .attr('x1', barWidth)
      .attr('x2', barWidth + 5)
      .attr('y1', d => yScale(d[targetKey]))
      .attr('y2', d => yScale(d[targetKey]))
      .style('fill', 'none')
      .style('stroke', markerFill)
      .style('stroke-width', 1)
      .style('opacity', 0.7);

    group.append('text')
      .attr('class', 'labels sqbar-label')
      .attr('y', d => yScale(d[targetKey]))
      .attr('x', barWidth + 15)
      .attr('dx', -10)
      .attr('dy', 3)
      .style('font-size', axisMarkerFontSize)
      .style('letter-spacing', '1px')
      .style('fill', markerFill)
      .style('pointer-events', 'none')
      .style('text-anchor', 'right')
      .text(d => d[targetKey] + '%');
  }

  if (showPctAxis) {
    group.call(axisMarker, xAxis[0], axisMarkerFill);
    group.call(axisMarker, xAxis[1], axisMarkerFill);
  }

  group.append('text')
    .attr('class', 'sqbar-label')
    .attr('y', barHeight)
    .attr('x', barWidth / 2)
    .attr('dx', 0)
    .attr('dy', barHeight * -0.1)
    .style('font-size', valueFontSize)
    .style('fill', labelFill)
    .style('pointer-events', 'none')
    .style('text-anchor', 'middle')
    .text(d => d[valueKey] + '%');

  group.append('text')
    .attr('class', 'sqbar-title')
    .attr('y', -15)
    .attr('x', barWidth / 2)
    .attr('dx', 0)
    .attr('dy', 0)
    .style('font-size', labelFontSize)
    .style('fill', '#ccc')
    .style('text-anchor', 'middle')
    .text(d => d[labelKey]);

  function axisMarker(selection, value, col) {
    selection.append('line')
      .attr('class', 'sqbar-marker-top')
      .attr('x1', 0)
      .attr('x2', -3)
      .attr('y1', yScale(value))
      .attr('y2', yScale(value))
      .style('fill', 'none')
      .style('stroke', col)
      .style('stroke-width', 1)
      .style('opacity', 0.7);

    selection.append('text')
      .attr('class', 'sqbar-label')
      .attr('y', yScale(value))
      .attr('x', -5)
      .attr('dx', 0)
      .attr('dy', 3)
      .style('font-size', axisFontSize)
      .style('fill', col)
      .style('text-anchor', 'end')
      .text(value);
  }

  return svg.node();
}
