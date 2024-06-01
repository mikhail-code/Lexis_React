import { FC } from "react";
import { SVGProps } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";

const XIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const LoginModalWindow: FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const loginOrEmail = form.elements.namedItem("loginOrEmail")?.value;
    const password = form.elements.namedItem("password")?.value;
    dispatch(login({ loginOrEmail, password }));
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950 relative">
      <button
        className="absolute top-4 right-4 rounded-full focus:outline-none"
        onClick={handleClose}
      >
        <XIcon className="w-5 h-5" />
        <span className="sr-only">Close</span>
      </button>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in to your account to continue.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="loginOrEmail">Login or Email</label>
            <input
              className="bg-gray-100"
              id="loginOrEmail"
              placeholder="Login or Email"
              required
              type="text"
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="bg-gray-100"
              id="password"
              placeholder="Password"
              required
              type="password"
            />
          </div>
          <button className="w-full border border-yellow-500" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModalWindow;
