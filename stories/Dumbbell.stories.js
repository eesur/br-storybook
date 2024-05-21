import { dumbbell } from './Dumbbell';

export default {
  title: 'Dumbbell',
};

const Template = (args) => {
  const container = document.createElement('div');
  container.style.width = args.width + args.margin.left + args.margin.right + 'px';
  container.style.height = args.height + args.margin.top + args.margin.bottom + 'px';
  dumbbell(container, args.data, args);
  return container;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Group A',
  pairLabels: ['Parent', 'Child'],
  valueKey: 'values',
  labelKey: 'label',
  pairFill: ['#0b3536', '#0098d8'],
  width: 230,
  height: 300,
  radius: [8, 8],
  margin: { left: 60, top: 20, right: 60, bottom: 40 },
  yDomain: [0, 100],
  bgdCol: '#efefef',
  lineCol: '#f54123',
  bgdLineCol: '#bfbabe',
  circleTextFill: '#efefef',
  titleCol: '#555',
  subTitleCol: '#888',
  data: [
    {
      label: '2020',
      values: [12.6, 34.5],
    },
    {
      label: '2021',
      values: [62.6, 22.9],
    },
    {
      label: '2022',
      values: [92.6, 86.1],
    },
  ],
};

// Additional stories can be created by altering the args

export const HighValues = Template.bind({});
HighValues.args = {
  ...Default.args,
  data: [
    {
      label: '2020',
      values: [85, 90],
    },
    {
      label: '2021',
      values: [75, 80],
    },
    {
      label: '2022',
      values: [95, 100],
    },
  ],
};

export const LowValues = Template.bind({});
LowValues.args = {
  ...Default.args,
  data: [
    {
      label: '2020',
      values: [10, 20],
    },
    {
      label: '2021',
      values: [5, 15],
    },
    {
      label: '2022',
      values: [0, 5],
    },
  ],
};
