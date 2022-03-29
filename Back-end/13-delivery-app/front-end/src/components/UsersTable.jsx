import React, { useContext, useEffect, useState } from 'react';
import CustomerContext from '../context/customer/CustomerContext';
import { requestAllUsers, requestDeleteUser } from '../helpers';

function UsersTable() {
  const [users, setUsers] = useState([]);
  const { user: { token } } = useContext(CustomerContext);

  useEffect(() => {
    async function usersRequisition() {
      const data = await requestAllUsers(token);

      setUsers([...data]);
    }
    usersRequisition();
  }, [users, token]);

  const deleteUser = async (id) => {
    await requestDeleteUser(id, token);
    const data = await requestAllUsers(token);
    setUsers(data);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nº</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Tipo</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, name, email, role }, index) => (
          <tr key={ id }>
            <td
              data-testid={ `admin_manage__element-user-table-item-number-${id}` }
            >
              {index + 1}
            </td>

            <td
              data-testid={ `admin_manage__element-user-table-name-${id}` }
            >
              {name}
            </td>

            <td
              data-testid={ `admin_manage__element-user-table-email-${id}` }
            >
              {email}
            </td>

            <td
              data-testid={ `admin_manage__element-user-table-role-${id}` }
            >
              {role}
            </td>

            <td>
              <button
                type="button"
                data-testid={ `admin_manage__element-user-table-remove-${id}` }
                onClick={ () => deleteUser(id) }
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UsersTable;
