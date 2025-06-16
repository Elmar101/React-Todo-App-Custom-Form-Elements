import { useState } from 'react';
import './App.css';
import FormComponent from './components/FormComonent';

interface IUser {
  name: string;
  sname: string;
  id: string;
}

interface IState {
  user: IUser;
  tableData?: IUser[];
  selectedUser?: IUser
}

const defaultUser: IUser = {
  name: '',
  sname: '',
  id: ''
};
function App() {
  const [state, setState] = useState<IState>({
    user: defaultUser,
    tableData: [],
  });

  const onSubmitForm = (user: IUser) => {
    const findedUser = state.tableData?.find(item=> item.id === user.id);
    setState((prevState) => ({
      ...prevState,
      tableData: findedUser 
        ?  prevState.tableData?.map(item=>{
          if(item.id === findedUser.id) return user
          return item;
        })
        : [{...user, id: new Date().toISOString()+Math.random()}, ...prevState?.tableData!],
      user: defaultUser,
    }))
  }

  const onCancelForm = () => {
    const findedUser = state.tableData?.find(user => user.id === state.user.id)!
    setState((prevState)=>({
      ...prevState,
      user: findedUser ?? defaultUser,
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
      selectedUser: {name, sname, id}
    }))
  }

  return (
    <div>
      <br />
      <br />

     <FormComponent onSubmit={onSubmitForm} onCancel={onCancelForm} selectedUser={state.selectedUser}/>
      

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
