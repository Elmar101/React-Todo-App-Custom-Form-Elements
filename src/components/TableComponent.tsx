import { useEffect, useState, type FC } from "react";

interface IUser {
  name: string;
  sname: string;
  id: string;
}

interface IProps {
  onEditRow: (user: IUser) => void;
  tableData: IUser[];
}

const TableComponent: FC<IProps> = ({ onEditRow, tableData }) => {
  const [data, setData] = useState<IUser[]>(tableData);

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const onDeleteRow = (id: string) => {
    setData((prevState) => prevState.filter((user) => user.id !== id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Ad</th>
          <th>Soyad</th>
          <th>Əməliyyatlar</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={3} className="no-data">Məlumat yoxdur</td>
          </tr>
        ) : (
          data.map(({ name, sname, id }, index) => (
            <tr key={index}>
              <td>{name}</td>
              <td>{sname}</td>
              <td>
                <button onClick={() => onDeleteRow(id)}>Sil</button>
                <button onClick={() => onEditRow({ name, sname, id })}>Düzəliş et</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TableComponent;
