import { Button, InputBase, Paper, Typography } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  REGISTER_ERROR,
  REGISTER_SUCCESSFUL,
  emailRegex,
  errEmail,
  errPassword,
  errUserName,
  passwordRegex,
} from "../constants/regex";

export const SignupPage = () => {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async (data) => {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: data.userName,
        email: data.email,
        password: data.password,
      }),
    });

    if (response.ok) {
      setMessage(REGISTER_SUCCESSFUL);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      return true;
    } else {
      setMessage(REGISTER_ERROR);
      return false;
    }
  };
  return (
    <PageContainer>
      <FormContainer onSubmit={handleSubmit(handleSignup)}>
        <Typography gutterBottom variant="h6" component="div">
          Signup
        </Typography>
        <LinkContainer>
          <LinkTitle>Already have an account? </LinkTitle>
          <Link to="/login">Login</Link>
        </LinkContainer>
        <InputAndErrorContainer>
          <Paper
            component="div"
            sx={{
              p: "5px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <StyledInputBase
              placeholder="Name"
              type="text"
              fullWidth
              {...register("userName", {
                required: true,
              })}
            />
          </Paper>
          {errors.userName && <ErrorText>{errUserName}</ErrorText>}
        </InputAndErrorContainer>
        <InputAndErrorContainer>
          <Paper
            component="div"
            sx={{
              p: "5px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <StyledInputBase
              placeholder="email"
              type="email"
              fullWidth
              {...register("email", {
                required: true,
                pattern: emailRegex,
              })}
            />
          </Paper>
          {errors.email && <ErrorText>{errEmail}</ErrorText>}
        </InputAndErrorContainer>
        <InputAndErrorContainer>
          <Paper
            component="div"
            sx={{
              p: "5px 4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <StyledInputBase
              placeholder="password"
              type="password"
              fullWidth
              {...register("password", {
                required: true,
                pattern: passwordRegex,
              })}
            />
          </Paper>
          {errors.password && <ErrorText>{errPassword}</ErrorText>}
        </InputAndErrorContainer>
        <ButtonContainer>
          <Button variant="outlined" type="submit">
            register
          </Button>
        </ButtonContainer>
        {message && <SignupMessage>{message}</SignupMessage>}
      </FormContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  width: 20%;
  display: flex;
  flex-direction: column;
  border: 0.5px solid #808896;
  margin-top: 100px;
  padding: 40px 60px;
  font-family: "Varela", sans-serif;
`;

const LinkTitle = styled.div`
  margin-right: 10px;
`;

const LinkContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const InputAndErrorContainer = styled.div`
  margin-bottom: 10px;
`;

const StyledInputBase = styled(InputBase)`
  font-size: 13px;
`;

const ErrorText = styled.span`
  font-size: 0.9rem;
  color: #8f2220;
`;
const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const SignupMessage = styled.div`
  color: #7e7c0a;
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-item: center;
`;
