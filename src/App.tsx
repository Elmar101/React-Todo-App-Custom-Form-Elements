import { useState } from 'react';
import './App.css';
import FormComponent from './components/FormComponent';
import TableComponent from './components/TableComponent';

interface IUser {
  name: string;
  sname: string;
  id: string;
}

interface IState {
  user: IUser;
  tableData: IUser[];
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

  const onSubmitForm = (user: IUser) => {
    setState((prevState) => {
      const isEdit = prevState.tableData.some(item => item.id === user.id);
      const updatedTableData = isEdit
        ? prevState.tableData.map(item => item.id === user.id ? user : item)
        : [...prevState.tableData, user];

      return {
        ...prevState,
        tableData: updatedTableData,
        user: defaultUser,
      };
    });
  };

  const onEditRow = (user: IUser) => {
    setState((prevState) => ({
      ...prevState,
      user,
    }));
  };

  return (
    <div>
      <div className='formcomponent'>
        <FormComponent onSubmit={onSubmitForm}  selectedUser={state.user} />
      </div>
      <TableComponent onEditRow={onEditRow} tableData={state.tableData} />
    </div>
  );
}

export default App;
