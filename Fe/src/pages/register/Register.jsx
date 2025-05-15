import { Link, useNavigate } from "react-router-dom";
import "./register.scss";
import { useForm } from "react-hook-form";
import { registerApi } from '../../api/auth';
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading } from "../../features/loadingSlice";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();


  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    await registerApi(data)
      .then(res => {
        navigate('/login')
        dispatch(setLoading(false));
        toast.success(res.data);
    })
      .catch(err => {
        dispatch(setLoading(false));
        toast.error(err.data);
    });
  };
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="text"
                {...register("username", { required: "Username is required" })}
                placeholder="Username"
              />
              {errors.username && (
                <p className="error">{errors.username.message}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Name"
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
