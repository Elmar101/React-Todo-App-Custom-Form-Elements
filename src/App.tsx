import { useState } from 'react';
import './App.css';
import { Input, type IChangeParams } from './components/Input';

interface IUser {
  name: string;
  sname: string;
  id: string;
}
interface IState {
  user: IUser;
  tableData?: IUser[];
}

const defaultUser: IUser = {
  name: '',
  sname: '',
  id: ''
};
function App() {
  const [state, setState] = useState<IState>({
    user: defaultUser,
    tableData: []
  });

  const onChangeInput = ({ name, value }: IChangeParams) => {
    setState(prevState => ({
      ...prevState,
      user: { ...prevState.user, [name as string]: value }
    }))
  }

  const onSubmitForm = () => {
    const findedUser = state.tableData?.find(user=> user.id ===state.user.id);
    setState((prevState) => ({
      ...prevState,
      tableData: findedUser 
        ?  prevState.tableData?.map(item=>{
          if(item.id === findedUser.id) return state.user
          return item;
        })
        : [{...state.user, id: new Date().toISOString()+Math.random()}, ...prevState?.tableData!],
      user: defaultUser,
    }))
  }

  const onCancelForm = () => {
    const findedUser = state.tableData?.find(user => user.id === state.user.id)!
    setState((prevState)=>({
      ...prevState,
      user: findedUser,
    }))
  }

  const onDeleteRow = (id: string) => {
    setState(prevState=>({
      ...prevState,
      tableData: prevState.tableData?.filter(user=>user.id !== id)
    }))
  }

  const onEditRow = ({name, sname, id}: IUser ) => {
    setState((prevState)=>({
      ...prevState,
      user: {name, sname, id}
    }))
  }

  return (
    <div>
      <form>
        <div>
          <Input
            value={state.user.name}
            name="name"
            label="Name"
            onChange={onChangeInput}
            isError
          />
        </div>

        <br />
        <div>
          <Input
            value={state.user.sname}
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
      <br />
      <br />


      

      <table>
        <thead>
          <th>name</th>
          <th>sname</th>
          <th>actions</th>
        </thead>
        <tbody>
          {
            state.tableData?.length === 0 ? 
              <tr>
                <td colSpan={3} className='no-data'>NO DATA</td>
              </tr>: 
              state.tableData?.map(({ name, sname, id }, index) => (
              <tr key={index}>
                <td>{name}</td>
                <td>{sname}</td>
                <td>
                  <button onClick={()=> onDeleteRow(id)}>Delete</button>
                  <button onClick={()=> onEditRow({name, sname, id})}>Edit</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
