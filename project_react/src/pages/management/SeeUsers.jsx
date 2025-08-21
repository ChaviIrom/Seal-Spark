import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from '../../redux/action/usersAction';
import "../../styles/seeUsers.css"; 

export default function SeeUsers() {
  const dispatch = useDispatch();
  const { users = [] } = useSelector((state) => state.users || {});

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="usersContainer">
      <div className="usersBox">
        <h2>רשימת משתמשים</h2>
        {users.length === 0 ? (
          <p>אין משתמשים להצגה</p>
        ) : (
          <table className="usersTable">
            <thead>
              <tr>
                <th>שם</th>
                <th>אימייל</th>
                <th>כתובת</th>
                <th>תפקיד</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
