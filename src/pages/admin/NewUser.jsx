import { useState } from "react";
import { addUser } from "../../api/users";
import DashboardLayout from "../../layout/DashboardLayout";
import "./newUser.css";
import { useDispatch } from "react-redux";
import useAxios from "../../hooks/useAxios";

const NewUser = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    isAdmin: "false",
  });

  const dispatch = useDispatch();
  const [api] = useAxios();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addUser(api, user, dispatch, () => {
      setUser({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        isAdmin: "false",
      });
    });
  };

  return (
    <DashboardLayout>
      <div className="newUser">
        <h1 className="newUserTitle">New User</h1>
        <form className="newUserForm" onSubmit={onSubmit}>
          <div className="newUserItem">
            <label>Username</label>
            <input
              name="username"
              value={user.username}
              onChange={handleChange}
              type="text"
              placeholder="john"
            />
          </div>
          <div className="newUserItem">
            <label>First Name</label>
            <input
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              type="text"
              placeholder="John Smith"
            />
          </div>
          <div className="newUserItem">
            <label>Last Name</label>
            <input
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              type="text"
              placeholder="John Smith"
            />
          </div>
          <div className="newUserItem">
            <label>Email</label>
            <input
              name="email"
              value={user.email}
              onChange={handleChange}
              type="email"
              placeholder="john@gmail.com"
            />
          </div>
          <div className="newUserItem">
            <label>Password</label>
            <input
              name="password"
              value={user.password}
              onChange={handleChange}
              type="password"
              placeholder="password"
            />
          </div>
          <div className="newUserItem">
            <label>Is Admin</label>
            <div className="newUserGender">
              <input
                name="isAdmin"
                value={user.isAdmin}
                onChange={handleChange}
                type="radio"
                id="true"
              />
              <label htmlFor="true">True</label>
              <input
                type="radio"
                name="isAdmin"
                value={user.isAdmin}
                onChange={handleChange}
                id="false"
              />
              <label htmlFor="false">False</label>
            </div>
          </div>
          <button className="newUserButton">Create</button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default NewUser;
