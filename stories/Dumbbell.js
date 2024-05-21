import * as d3 from 'd3';

export function dumbbell(element, data, {
  title = null,
  pairLabels = null,
  valueKey = 'values',
  labelKey = 'label',
  pairFill = ['#0b3536', '#0098d8'],
  width = 230,
  height = 300,
  radius = [8, 8],
  margin = { left: 60, top: 20, right: 60, bottom: 40 },
  yDomain = [0, 100],
  bgdCol = '#efefef',
  lineCol = '#f54123',
  bgdLineCol = '#bfbabe',
  circleTextFill = bgdCol,
  titleCol = '#555',
  subTitleCol = '#888',
} = {}) {

  const values = data.map(d => [d[valueKey][0], d[valueKey][1]]).flat();

  const w = width + (margin.left + margin.right);
  const h = height + (margin.top + margin.bottom);

  const min = (yDomain) ? yDomain[0] : d3.min(values);
  const max = (yDomain) ? yDomain[1] : d3.max(values);

  const yScale = d3.scaleLinear()
    .domain([min, max])
    .range([h - margin.bottom, margin.top]);
  const xScale = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([margin.left, w - margin.right]);

  const svg = d3.select(element)
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  svg.append('rect')
    .attr('width', w)
    .attr('height', h)
    .attr('rx', 10)
    .attr('fill', bgdCol);

  svg.append('text')
    .attr('class', 'title')
    .attr('y', margin.top)
    .attr('x', w / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', '13px')
    .style('fill', titleCol)
    .style('line-height', '160%')
    .text(title);

  const join = svg.selectAll('g')
    .data(data)
    .join('g')
    .attr('transform', (d, i) => {
      return `translate(${xScale(i)}, ${margin.top})`;
    });

  join.append('line')
    .attr('x1', 0)
    .attr('y1', margin.top)
    .attr('x2', 0)
    .attr('y2', height)
    .attr('stroke', bgdLineCol)
    .attr('stroke-dasharray', 2);

  join.append('line')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', d => yScale(d[valueKey][0]))
    .attr('y2', d => yScale(d[valueKey][1]))
    .attr('stroke', lineCol)
    .attr('stroke-width', 4);

  join.append('text')
    .attr('text-anchor', 'start')
    .style('font-size', '11px')
    .style('fill', d3.rgb(lineCol).darker(1))
    .attr('dy', 4)
    .attr('y', d => {
      const diff = d[valueKey][0] - d[valueKey][1];
      if (diff >= 0) {
        return yScale(d[valueKey][0] - (diff / 2));
      } else {
        return yScale(d[valueKey][1] + (diff / 2));
      }
    })
    .attr('dx', 12)
    .text(d => {
      const diff = d[valueKey][0] - d[valueKey][1];
      if (diff > 0) {
        return `+${diff}`;
      } else {
        return `${diff}`;
      }
    });

  renderCircles(join, 0);
  renderCircles(join, 1);

  function renderCircles(sel, index) {
    sel.append('circle')
      .attr('fill', pairFill[index])
      .attr('r', radius[index])
      .attr('stroke', bgdCol)
      .attr('stroke-width', 1)
      .attr('cy', d => yScale(d[valueKey][index]));
    
    sel.append('text')
      .attr('text-anchor', 'end')
      .style('font-size', '11px')
      .attr('dy', 4)
      .attr('y', d => yScale(d[valueKey][index]))
      .attr('dx', -14)
      .text((d, i) => (i === 0) ? `${d[valueKey][index]}%` : d[valueKey][index]);
  }

  join.append('text')
    .attr('text-anchor', 'middle')
    .style('font-size', '11px')
    .attr('dy', 3)
    .attr('y', h - margin.bottom)
    .style('fill', subTitleCol)
    .text(d => d[labelKey]);
  
  return svg.node();
}
