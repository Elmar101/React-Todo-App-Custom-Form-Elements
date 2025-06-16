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
    onSubmit:(user: IUser)=> void
    onCancel:()=> void
    selectedUser?: IUser
}
const FormComponent:FC<IProps> = ({onSubmit, onCancel, selectedUser}) => {
    const [user, setUser] = useState<IUser>(defaultUser);

    useEffect(()=>{
    const hasSelectedUser = selectedUser && Object.values(selectedUser!).filter(Boolean)
        if(hasSelectedUser) setUser(selectedUser)
    },[selectedUser]);

    const onChangeInput = ({ name, value }: IChangeParams) => {
        console.log({name, value})
        setUser(prevState => ({
          ...prevState,
         [name as string]: value 
        }))
    }

    const onSubmitForm = () =>{
        onSubmit(user)
        setUser(defaultUser)
    }

    const onCancelForm = () => {
        onCancel()
    }

    return <form>
        <div>
            <Input
                value={user.name}
                name="name"
                label="Name"
                onChange={onChangeInput}
                isError
            />
        </div>

        <br />
        <div>
            <Input
                value={user.sname}
                label="SName"
                name="sname"
                onChange={onChangeInput}
                isError
            />
        </div>

        <br />
        <button type='button' onClick={onSubmitForm}> SAVE FORM </button>
        <button type='button' onClick={onCancelForm}> Cancel FORM </button>
    </form>
}

export default FormComponent;