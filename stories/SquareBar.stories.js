import { squareBar } from './SquareBar';
import * as d3 from 'd3';

export default {
  title: 'SquareBar',
};

const Template = (args) => {
  const container = document.createElement('div');
  container.style.width = args.width + 'px';
  container.style.height = args.height + 'px';
  const selection = d3.select(container);
  squareBar(args.data, { ...args, bind: selection });
  return container;
};

export const Default = Template.bind({});
Default.args = {
  data: [
    {
      value: 45,
      label: 'T1',
      targetDir: 'above',
      target: 40
    },
    {
      value: 13,
      label: 'T2',
      targetDir: 'above',
      target: 15
    },
    {
      value: 20,
      label: 'T3',
      targetDir: 'above',
      target: 15
    },
    {
      value: 30,
      label: 'T4',
      targetDir: 'above',
      target: 35
    },
    {
      value: 15,
      label: 'T5',
      targetDir: 'above',
      target: 15
    }
  ],
  barWidth: 50,
  barHeight: 50,
  spacing: 2.2,
  width: 600,
  height: 70,
  valueFontSize: '14px',
  labelFontSize: '14px'
};

export const BelowTarget = Template.bind({});
BelowTarget.args = {
  data: [
    {
      value: 20,
      label: 'Test 1',
      targetDir: 'above',
      target: 25
    }
  ],
  barWidth: 100,
  barHeight: 100,
  spacing: 2.2,
  width: 150,
  height: 120,
  valueFontSize: '24px',
  labelFontSize: '24px'
};

export const AboveTarget = Template.bind({});
AboveTarget.args = {
  data: [
    {
      value: 40,
      label: 'Test 2',
      targetDir: 'above',
      target: 25
    }
  ],
  barWidth: 100,
  barHeight: 100,
  spacing: 2.2,
  width: 150,
  height: 120,
  valueFontSize: '24px',
  labelFontSize: '24px'
};

export const MultipleBars = Template.bind({});
MultipleBars.args = {
  data: [
    {
      value: 45,
      label: 'T1',
      targetDir: 'above',
      target: 40
    },
    {
      value: 13,
      label: 'T2',
      targetDir: 'above',
      target: 15
    },
    {
      value: 20,
      label: 'T3',
      targetDir: 'above',
      target: 15
    },
    {
      value: 30,
      label: 'T4',
      targetDir: 'above',
      target: 35
    },
    {
      value: 15,
      label: 'T5',
      targetDir: 'above',
      target: 15
    }
  ],
  barWidth: 100,
  barHeight: 100,
  spacing: 2.2,
  width: 600,
  height: 120,
  valueFontSize: '14px',
  labelFontSize: '14px'
};
