import { fn } from '@storybook/test';
import { createSVG } from './Testd3';

export default {
  title: 'Example/Testd3',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: (args) => createSVG(args),
  argTypes: {
    backgroundColor: { control: 'color'},
    label: { control: 'text' },
    onClick: { action: 'onClick' },
    primary: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
args: {
    backgroundColor: 'red',
    label: 'TESTsvg',
},
};

export const Secondary = {
args: {
    backgroundColor: 'yellow',
    label: 'TESTsvg',
},
};
