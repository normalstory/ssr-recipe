//+saga

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import User from "../components/User";
import { Preloader } from "../lib/PreloadContext";
import { getUser } from "../modules/users";

const UserContainers = ({ id }) => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.id === parseInt(id, 10)) return; //사용자가 존재하고 id가 일치하면 요청안함
    dispatch(getUser(id));
  }, [dispatch, id, user]); //id가 바뀔때 새로 요청

  //컨테이너 유효성검사 후 return null을 해야하는 경우, null대신 Preloader
  if (!user) {
    return <Preloader resolve={() => dispatch(getUser(id))} />;
  }

  return <User user={user} />;
};

export default UserContainers;
