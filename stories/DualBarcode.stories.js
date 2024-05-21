import { dualBarcode } from './DualBarcode';

export default {
  title: 'DualBarcode',
};

const Template = (args) => {
  const container = document.createElement('div');
  container.style.width = args.width + 'px';
  container.style.height = (args.height + 10) * args.data.length + 'px';
  dualBarcode(container, args.data, args);
  return container;
};

export const Default = Template.bind({});
Default.args = {
  parentLabelKey: 'p_label',
  parentValueKey: 'parent_value',
  domain: [0, 159],
  height: 40,
  width: 600,
  line_height: 32,
  stroke_width: 1,
  stroke: '#0077B7',
  stroke_parent: '#ccc',
  margin: { top: 15, right: 30, bottom: 0, left: 5 },
  data: [
    { parent_value: 159, child_value: 22 },
    { parent_value: 159, child_value: 77 },
    { parent_value: 159, child_value: 60 },
  ],
};

// Additional stories can be created by altering the args

export const HighValues = Template.bind({});
HighValues.args = {
  ...Default.args,
  data: [
    { parent_value: 159, child_value: 120 },
    { parent_value: 159, child_value: 130 },
    { parent_value: 159, child_value: 140 },
  ],
};

export const LowValues = Template.bind({});
LowValues.args = {
  ...Default.args,
  data: [
    { parent_value: 159, child_value: 5 },
    { parent_value: 159, child_value: 10 },
    { parent_value: 159, child_value: 15 },
  ],
};
