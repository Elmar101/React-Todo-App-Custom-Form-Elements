import { useState, type ComponentProps, type FC } from 'react';

interface IState {
  error: string;
}

interface IChangeParams {
  name: ComponentProps<'input'>['name'];
  value: ComponentProps<'input'>['value'];
}
interface IProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  label?: string;
  onChange?: (params: IChangeParams) => void;
}
export const Input: FC<IProps> = ({ label, onChange, ...rest }) => {
  const [state, setState] = useState<IState>({ error: '' });
  const onBlurInput: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event?.target;
    if (!value) {
      setState((prevState) => ({
        ...prevState,
        error: `${name[0].toUpperCase() + name.slice(1)} is Required`,
      }));
    }
  };

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event?.target;
    if (state?.error && value) {
      setState((prevState) => ({
        ...prevState,
        error: '',
      }));
    } else if (!value) {
      setState((prevState) => ({
        ...prevState,
        error: `${name[0].toUpperCase() + name.slice(1)} is Required`,
      }));
    }
    onChange?.({ name, value });
  };

  return (
    <>
      <label> {label} : </label>
      <input {...rest} onBlur={onBlurInput} onChange={onChangeInput} />
      {state?.error && <i>{state?.error}</i>}
    </>
  );
};
