import * as d3 from 'd3';

export function dualBarcode(element, data, {
  parentLabelKey = 'p_label',
  parentValueKey = 'parent_value',
  domain = [0, d3.max(data, d => d[parentValueKey])],
  height = 40,
  width = 600,
  line_height = 32,
  stroke_width = 1,
  stroke = '#0077B7',
  stroke_parent = '#ccc',
  margin = { top: 15, right: 30, bottom: 0, left: 5 },
} = {}) {

  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain(domain)
    .range([0, w]);

  const svg = d3.select(element)
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const sel = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  data.forEach(d => {
    const group = sel.append('g')
      .attr('transform', `translate(0, ${data.indexOf(d) * (line_height + 10)})`);

    group.selectAll('line')
      .data(d3.range(d[parentValueKey]))
      .join('line')
      .attr('x1', d => xScale(d))
      .attr('x2', d => xScale(d))
      .attr('y1', 0)
      .attr('y2', line_height)
      .attr('stroke-width', stroke_width)
      .attr('stroke', i => {
        if ((i + 1) <= d.child_value) {
          return stroke;
        } else {
          return stroke_parent;
        }
      });

    group.append('text')
      .attr('x', xScale(d.child_value - 1))
      .attr('y', -2)
      .attr('font-size', '11px')
      .attr('text-anchor', 'end')
      .attr('fill', stroke)
      .text(d.child_value);

    group.append('text')
      .attr('x', xScale(d[parentValueKey - 1]))
      .attr('y', -2)
      .attr('font-size', '11px')
      .attr('text-anchor', 'end')
      .attr('fill', '#888')
      .text(d[parentValueKey]);
  });

  return svg.node();
}
