import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ChatPage from "../components/chatPage";
import SignupPage from "../pages/SignInUpPage";

export default function Index() {
  const { user } = useSelector((state) => state.auth);
console.log(user);
  return (
    <Routes>
      {user ? (
        <Route path="/home" element={<ChatPage />} />
      ) : (
        <Route path="/" element={<SignupPage />} />
      )}
      <Route path="*" element={<SignupPage />} />
    </Routes>
  );
}
