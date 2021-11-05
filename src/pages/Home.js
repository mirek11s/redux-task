import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, loadUsers } from "../redux/actions";
import { useHistory } from "react-router-dom";

import classes from "./Home.module.css";

const Home = () => {
  let dispatch = useDispatch();
  let history = useHistory();

  //destructuring the users from root-reducer.js
  const { users } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div align="center" className={classes.userlist}>
      {users &&
        users.map((user) => (
          <ul
            key={user.id}
            className={classes.user}
            onDoubleClick={() => history.push(`/editUser/${user.id}`)}
          >
            <header>
              <h3>{user.name}</h3>
            </header>
            <h4>{user.email}</h4>
            <h4>{user.address["city"]}</h4>
            <h4>{user.phone}</h4>
            <h4>{user.website}</h4>
            <h4>{user.company["name"]}</h4>
            <button onClick={() => handleDelete(user.id)}>Delete User</button>
          </ul>
        ))}
    </div>
  );
};

export default Home;
