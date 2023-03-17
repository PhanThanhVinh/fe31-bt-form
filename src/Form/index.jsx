import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import * as S from "./styles";
export function RegisterForm() {
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [userList, setUserList] = useState([]);

  const handleChange = (e, key) => {
    setFormData({
      ...formData,

      [key]: e.target.value,
    });
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    let errorList = {};
    let isValid = true;
    if (!regexEmail.test(formData.email) || !formData.email) {
      errorList = {
        ...errorList,
        email: "Email chưa hợp lệ!!!",
      };
      isValid = false;
    }
    if (!regexPassword.test(formData.password) || !formData.password) {
      errorList = {
        ...errorList,
        password:
          "Mật khẩu phải có 8 kí tự, bao gồm chữ hoa, chữ thường và kí tự đặc biệt!!!",
      };
      isValid = false;
    }
    if (
      formData.password !== formData.confirmPassword ||
      !formData.confirmPassword
    ) {
      errorList = {
        ...errorList,
        confirmPassword: "Mật khẩu và Xác nhận mật khẩu không khớp",
      };
      isValid = false;
    }
    setErrors(errorList);
    if (isValid) {
      setUserList([
        ...userList,
        {
          email: formData.email,
          password: formData.password,
        },
      ]);
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }

  const renderUserList = () => {
    return userList.map((item, index) => {
      return (
        <div key={index}>
          <h2 style={{ color: "red" }}>Email:{item.email}</h2>
          <h3 style={{ color: "red" }}>Password:{item.password}</h3>
        </div>
      );
    });
  };

  return (
    <S.styleForm>
      <S.styleFormUser>
        <S.styleTitle>REGISTER</S.styleTitle>
        <div>
          <label>Email:</label>
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange(e, "email")}
          />
        </div>
        <div style={{ color: "red" }}>{errors.email}</div>
        <div>
          <label>Password:</label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleChange(e, "password")}
          />
        </div>
        <div style={{ color: "red" }}>{errors.password}</div>
        <div>
          <label>Confirm Password:</label>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => handleChange(e, "confirmPassword")}
          />
        </div>
        <div style={{ color: "red" }}>{errors.confirmPassword}</div>
        <Button type="primary" block onClick={handleSubmit}>
          Đăng kí
        </Button>
      </S.styleFormUser>
      <div>{renderUserList()}</div>
    </S.styleForm>
  );
}
export default RegisterForm;
