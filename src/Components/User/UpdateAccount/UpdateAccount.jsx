import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import userService from "../../../Services/userService";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router";
import SuccessMessage from "../../SuccessMessage/SuccessMessage";
import { useUser } from "../../../Contexts/AuthProvider";
export default function UpdateAccount() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, dirtyFields, isValid },
    trigger,
    setValue,
  } = useForm();
  const { login, logout } = useUser();
  const navigate = useNavigate();
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { email, username, oldPassword, newPassword, confirmNewPassword } =
    watch();
  useEffect(() => {
    userService.getLoggedInUser().then((user) => {
      user.json().then((data) => {
        if (data.statusCode && data.statusCode !== 200) {
          navigate("/login");
        }
        setValue("username", data.username);
        setValue("email", data.email);
        trigger();
      });
    });
  }, []);
  useEffect(() => {
    if (dirtyFields.email) {
      trigger("email");
    }
    if (dirtyFields.username) {
      trigger("username");
    }
    trigger("oldPassword");
    trigger("newPassword");
    trigger("confirmNewPassword");
  }, [
    email,
    username,
    confirmNewPassword,
    newPassword,
    oldPassword,
    dirtyFields,
    trigger,
  ]);
  const handleBlur = async (fieldName) => {
    await trigger(fieldName);
  };
  const onSubmit = (data) => {
    userService.updateAccount(data).then((response) => {
      response.json().then((data) => {
        if (data.statusCode && data.statusCode !== 200) {
          setApiErrorMessage(data.message);
        } else {
          setSuccessMessage("Account updated successfully!");
          userService
            .isAuthenticated()
            .then((data) => {
              login(data);
            })
            .catch(() => {
              logout();
            });
          setApiErrorMessage("");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        }
      });
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="flex justify-center items-center h-screen bg-gray-800">
        <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4">
          <div className="mb-4">
            <p className="text-gray-400">Update Profile</p>
            <h2 className="text-xl font-bold text-white">
              Update your account information
            </h2>
          </div>
          <div>
            <input
              {...register("username", { required: "Username is required" })}
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="text"
              placeholder="Username"
              onBlur={() => handleBlur("username")}
            />
            {errors.username && (
              <div className="mt-4">
                <ErrorMessage errorMessage={errors.username.message} />
              </div>
            )}
          </div>
          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email",
                },
              })}
              onBlur={() => handleBlur("email")}
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="text"
              placeholder="Email"
            />
            {errors.email && (
              <div className="mt-4">
                <ErrorMessage errorMessage={errors.email.message} />
              </div>
            )}
          </div>
          <div>
            <input
              {...register("oldPassword", {
                required:
                  !oldPassword &&
                  (newPassword || confirmNewPassword) &&
                  "Old password is required if setting a new password",
              })}
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="password"
              placeholder="Old Password"
            />
          </div>
          {errors.oldPassword && (
            <div className="mt-4">
              <ErrorMessage errorMessage={errors.oldPassword.message} />
            </div>
          )}
          <div>
            <input
              {...register("newPassword", {
                required: oldPassword ? "New Password is required" : false,
              })}
              onBlur={() => handleBlur("newPassword")}
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="password"
              placeholder="New Password"
            />
          </div>
          {errors.newPassword && (
            <div className="mt-4">
              <ErrorMessage errorMessage={errors.newPassword.message} />
            </div>
          )}
          <div>
            <input
              {...register("confirmNewPassword", {
                required: newPassword ? "Confirm Password is required" : false,
                validate: (value) =>
                  !newPassword ||
                  value === newPassword ||
                  "Passwords do not match",
              })}
              className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600"
              type="password"
              placeholder="New Password Confirmation"
            />
          </div>
          {errors.confirmNewPassword && (
            <div className="mt-4">
              <ErrorMessage errorMessage={errors.confirmNewPassword.message} />
            </div>
          )}
          {apiErrorMessage && (
            <div className="mt-4">
              {<ErrorMessage errorMessage={apiErrorMessage} />}
            </div>
          )}
          {successMessage && (
            <SuccessMessage
              successMessageHeader={"Success!"}
              successMessageContent={successMessage}
            />
          )}
          <div>
            <button
              type="submit"
              disabled={!isValid}
              className="w-full py-4 rounded text-sm font-bold transition duration-200 text-gray-50 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
            >
              Update Profile
            </button>
          </div>
        </div>
      </section>
    </form>
  );
}
