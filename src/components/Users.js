import React from "react";
import { Link } from "react-router-dom";

//유저의 이름을 넣었을때 상세정보를 제공하는 구성
const Users = ({ users }) => {
  if (!users) return <p>해당 사용자가 없습니다.</p>;
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
