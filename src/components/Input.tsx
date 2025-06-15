import { useState, type ComponentProps, type FC } from 'react';

interface IState {
  error: string;
}

export interface IChangeParams {
  name: ComponentProps<'input'>['name'];
  value: ComponentProps<'input'>['value'];
}
interface IProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  label?: string;
  onChange?: (params: IChangeParams) => void;
  isError?: boolean;
}
export const Input: FC<IProps> = ({ label, isError=false, onChange, ...rest }) => {
  const [state, setState] = useState<IState>({ error: '' });
  const onBlurInput: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event?.target;
    if (!value && isError) {
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
    } else if (!value && isError) {
      setState((prevState) => ({
        ...prevState,
        error: `${name[0].toUpperCase() + name.slice(1)} is Required`,
      }));
    }
    onChange?.({ name, value });
  };

  return (
    <>
      <div>
        <label> {label} : </label>
        <input {...rest} onBlur={onBlurInput} onChange={onChangeInput} />
      </div>
      {(state?.error && isError) && <div className='error'>{state?.error}</div>}
    </>
  );
};
