import React, { useEffect } from "react";
import { connect } from "react-redux";
import Users from "../components/Users";
import { getUsers } from "../modules/users";

const UserContainers = (users, getUsers) => {
  //컴포넌트가 마운트 되고 나서 호출
  useEffect(() => {
    if (users) return; //users가 이미 유효하다면 요청안함
    getUsers();
  }, [getUsers, users]);

  return <Users users={users} />;
};

export default connect(
  (state) => ({
    users: state.users.users,
  }),
  { getUsers }
)(UserContainers);
