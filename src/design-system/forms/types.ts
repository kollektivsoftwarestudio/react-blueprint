export type BaseFormProps<T extends string = string> = {
  /**
   * `error` takes an error message and displays it.
   */
  error?: string;
  /**
   * `label` will render a label, make sure to pass an id to your control for a11y.
   */
  label?: React.ReactNode | string | null;
  /**
   *  `name` connects the label to the control within FormControl.
   */
  name: T;
  /**
   * `isRequired` adds a required indicator to the label and passes it to the control.
   */
  isRequired?: boolean;
};
