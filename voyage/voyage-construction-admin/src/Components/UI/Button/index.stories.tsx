/* eslint-disable react/function-component-definition */
import React from "react";
import { Story, Meta } from "@storybook/react";

// component
import Button from "./index";

// type
import { ButtonProps } from "./Button.types";

export default {
  title: "Core/Button",
  component: Button,
  argTypes: {},
} as Meta<typeof Button>;

const Template: Story<ButtonProps> = (args: any) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  varient: "primary",
  disabled: false,
  buttonLabel: "Primary",
  handleClick: () => {},
};
export const Secondary = Template.bind({});
Secondary.args = {
  varient: "secondary",
  disabled: false,
  buttonLabel: "Secondary",
};
export const Small = Template.bind({});
Small.args = {
  varient: "primary",
  disabled: false,
  buttonLabel: "Small",
  size: "small",
};
export const Medium = Template.bind({});
Medium.args = {
  varient: "primary",
  disabled: false,
  buttonLabel: "Medium",
  size: "medium",
};
export const Large = Template.bind({});
Large.args = {
  varient: "primary",
  disabled: false,
  buttonLabel: "Large",
  size: "large",
};
export const Disable = Template.bind({});
Disable.args = {
  varient: "primary",
  disabled: true,
  buttonLabel: "Disable",
};
