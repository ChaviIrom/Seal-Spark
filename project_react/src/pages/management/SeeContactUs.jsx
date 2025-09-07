import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContact } from '../../redux/actions/contactUsAction'; // תוודאי שזה הנתיב הנכון
import '../../styles/seeUsers.css'; // אפשר להשתמש באותו עיצוב כמו משתמשים

export default function SeeContactUs() {
  const dispatch = useDispatch();
  const { contactUs = [] } = useSelector((state) => state.contactUs || {});

  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  return (
    <div className="usersContainer">
      <div className="usersBox">
        <h2 style={{ fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" }}>
          פניות ליצירת קשר
        </h2>
        {contactUs.length === 0 ? (
          <p style={{ fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif" }}>
            אין פניות להצגה
          </p>
        ) : (
          <table className="usersTable">
            <thead>
              <tr>
                <th>שם</th>
                <th>מספר טלפון</th>
              </tr>
            </thead>
            <tbody>
              {contactUs.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
