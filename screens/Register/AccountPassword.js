import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { InputTextComponent, RegisterComponent } from "../../components";
import { API_URL } from "../../api/config";
import ApiService from "../../api/APIService";
import {
  setToken,
  setEmail,
  setLogin,
  setUsername,
} from "../../redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";

const AccountPassword = ({ route }) => {
  const [password, setPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const dispatch = useDispatch();

  const addToken = (new_token) => dispatch(setToken({ new_token }));
  const addEmail = (new_email) => dispatch(setEmail({ new_email }));
  const addUsername = (new_username) => dispatch(setUsername({ new_username }));
  const addLogin = (isLogin) => dispatch(setLogin({ isLogin }));

  const name = route.params?.name;
  const email = route.params?.email;

  const postToLoginAPI = (navigation) => {
    ApiService.post(API_URL + "signup", {
      email: email,
      password: password,
      // username: name,
    }).then(function (response) {
      addToken(response.data.token);
      addEmail(response.data.data.email);
      // addUsername(response.data.data.username);
      addLogin("true");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    });
  };
  const clearPassword = () => {
    setPassword("");
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  return (
    <RegisterComponent
      title={"Choose a password"}
      subtitle={
        "Create a password with at least 6 characters. It should be something others couldn't guess."
      }
      titleBtn={"Next"}
      navigationText={"terms"}
    >
      <InputTextComponent
        label={"Password"}
        value={password}
        onChangeText={setPassword}
        isFocused={passwordFocused}
        clear={password !== ""}
        clearFunction={clearPassword}
        onFocus={handlePasswordFocus}
        isFlex={true}
      />
    </RegisterComponent>
  );
};

const styles = StyleSheet.create({});

export default AccountPassword;
