import { dotTileV1 } from './DotTile';

export default {
  title: 'DotTile',
};

const Template = (args) => {
  const container = document.createElement('div');
  container.style.width = args.w + 'px';
  container.style.height = args.h + 'px';
  dotTileV1(container, args.data, args);
  return container;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Engagement',
  w: 300,
  h: 150,
  radius: 15,
  startAtZero: true,
  xPadding: 20,
  bgdCol: '#e4f1e6',
  lineCol: '#688e70',
  circleFill: '#f59994',
  circleTextFill: '#e4f1e6',
  titleCol: '#394437',
  titlePadding: 25,
  offsetHeight: 175,
  data: [
    { label: 'X', title: 'Group X', value: 2.4 },
    { label: 'Y', title: 'Group Y', value: 44.6 },
    { label: 'Z', title: 'Group Z', value: 36.6 }
  ]
};

// Additional stories can be created by altering the args

export const HighValues = Template.bind({});
HighValues.args = {
  ...Default.args,
  data: [
    { label: 'A', title: 'Group A', value: 88.8 },
    { label: 'B', title: 'Group B', value: 75.5 },
    { label: 'C', title: 'Group C', value: 60.3 }
  ]
};

export const LowValues = Template.bind({});
LowValues.args = {
  ...Default.args,
  data: [
    { label: 'D', title: 'Group D', value: 1.2 },
    { label: 'E', title: 'Group E', value: 0.8 },
    { label: 'F', title: 'Group F', value: 0.3 }
  ]
};
