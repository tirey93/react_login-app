import { useState } from "react";
import { useAuth } from "../components/AuthProvider";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const auth = useAuth();
  const handleSubmitEvent = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
        auth!.loginAction(input.username, input.password);
        return;
    }
    alert("please provide a valid input");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmitEvent}>
      <div className="form_control">
        <label htmlFor="user-name">Name:</label>
        <input
          type="text"
          id="user-name"
          name="username"
          placeholder="example"
          aria-describedby="user-name"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-name" className="sr-only">
          Please enter a valid username.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-password" className="sr-only">
          your password should be more than 6 character
        </div>
      </div>
      <button className="btn-submit">Submit</button>
    </form>
  );
};

export default Login;
