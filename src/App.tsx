import { useState } from 'react';
import './App.css';
import { Input } from './components/Input';

interface IUser {
  name: string;
  sname: string;
}
interface IState {
  user: IUser;
  table?: IUser[];
  error?: {
    name?: string;
    sname?: string;
  };
}

const defaultUser: IUser = {
  name: '',
  sname: '',
};
function App() {
  const [state, setState] = useState<IState>({
    user: defaultUser,
  });

  return (
    <div>
      <form>
        <div>
          <Input
            name="name"
            label="Name"
            onChange={({ name, value }) => {
              console.log({ name, value });
            }}
          />
        </div>

        <br />
        <div>
          <Input
            label="SName"
            name="sname"
            onChange={({ name, value }) => {
              console.log({ name, value });
            }}
          />
        </div>

        <br />
        <button> SAVE FORM </button>
      </form>
      <br />
      <br />

      <table>
        <thead>
          <th>name</th>
          <th>sname</th>
        </thead>
        <tbody>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
