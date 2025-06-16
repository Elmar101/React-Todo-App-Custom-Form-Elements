import { useEffect, useState, type FC } from "react";
import { Input, type IChangeParams } from "./ui/Input";

interface IUser {
  name: string;
  sname: string;
  id: string;
}

const defaultUser: IUser = {
  name: '',
  sname: '',
  id: ''
};

interface IProps {
  onSubmit: (user: IUser) => void;
  selectedUser?: IUser;
}

const FormComponent: FC<IProps> = ({ onSubmit, selectedUser }) => {
  const [user, setUser] = useState<IUser>(defaultUser);

  useEffect(() => {
    if (selectedUser && selectedUser.id) setUser(selectedUser);
  }, [selectedUser]);

  const onChangeInput = ({ name, value }: IChangeParams) => {
    setUser((prevState) => ({
      ...prevState,
      [name as string]: value,
    }));
  };

  const onSubmitForm = () => {
    onSubmit({
      ...user,
      id: user.id || new Date().toISOString() + Math.random(),
    });
    setUser(defaultUser);
  };

  const onCancelForm = () => {
    setUser(selectedUser!); 
  };

  return (
    <form>
      <div>
        <Input
          value={user.name}
          name="name"
          label="Ad"
          onChange={onChangeInput}
          isError={false}
        />
      </div>
      <br />
      <div>
        <Input
          value={user.sname}
          label="Soyad"
          name="sname"
          onChange={onChangeInput}
          isError={false}
        />
      </div>
      <br />
      <button type="button" onClick={onSubmitForm}>Yadda saxla</button>
      <button type="button" onClick={onCancelForm}>İmtina et</button>
    </form>
  );
};

export default FormComponent;
