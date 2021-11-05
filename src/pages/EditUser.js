import React, { useState, useEffect } from "react";

import { TextField, Button, makeStyles } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser, updateUser } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
}));

const EditUser = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });

  const [error, setError] = useState("");

  //destructuring the id so we pass it to the Edit page (name, email and etc)
  let { id } = useParams();
  const { user } = useSelector((state) => state.data);

  let history = useHistory();
  let dispatch = useDispatch();

  const { name, email, phone, address, website, company } = state;

  //taken from actions.js for the editing the id
  useEffect(() => {
    dispatch(getSingleUser(id));
  }, []);

  //if user is there, set the new state with the values to be populated in the Edit form fields
  //data now shows in the Edit From
  useEffect(() => {
    if (user) {
      setState({ ...user });
    }
  }, [user]);

  //on every keystroke it will store the value
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !email || !phone || !website || !company) {
      setError("Please don't leave empty fields.");
    } else {
      dispatch(updateUser(state, id));
      history.push("/");
      setError("");
    }
  };

  return (
    <div align="center">
      <Button
        style={{ width: "100px", marginTop: "20px" }}
        variant="contained"
        color="secondary"
        onClick={() => {
          history.push("/");
        }}
      >
        Go Back
      </Button>

      <h2>Edit User</h2>

      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-basic"
          label="Name"
          value={name || ""}
          name="name"
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Email"
          value={email || ""}
          name="email"
          type="email"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Address"
          value={address || ""}
          name="address"
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          id="standard-basic"
          label="Phone"
          value={phone || ""}
          name="phone"
          type="text"
          onChange={handleInputChange}
        />
        <br />

        <TextField
          id="standard-basic"
          label="Website"
          value={website || ""}
          name="website"
          type="text"
          onChange={handleInputChange}
        />

        <br />

        <TextField
          id="standard-basic"
          label="Company"
          value={company || ""}
          name="company"
          type="text"
          onChange={handleInputChange}
        />

        <br />

        <Button
          style={{ width: "100px" }}
          variant="contained"
          color="primary"
          type="submit"
          onChange={handleInputChange}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
