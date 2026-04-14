import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { registerUser } from "../../features/auth/authSlice";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validation = (): boolean => {
    const newErrors: FormErrors = {};
    const mailRegex = /^[^\s@]+@(gmail|chatbot)\.(com|in|ai)$/;

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must br atleast 2 charectors";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    } else if (!mailRegex.test(form.email)) {
      newErrors.email = "Enter valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Password do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation()) return;

    const result = await dispatch(
      registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    );

    if (registerUser.fulfilled.match(result)) {
      setSuccess(true);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate("/login"), 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div
          className="text-center rounded-2xl p-10"
          style={{
            background: "rgba(15,15,25,0.8)",
            border: "1px solid rgba(139,92,246,0.2)",
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.3)",
            }}
          >
            <i className="fa-solid fa-check"></i>
          </div>
          <h2 className="text-white font-bold text-xl mb-1">
            Account created!
          </h2>
          <p className="text-slate-500 text-sm">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md mx-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Create account
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Join your AI workspace today
          </p>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{
            background: "rgba(15, 15, 25, 0.8)",
            border: "1px solid rgba(139,92,246,0.15)",
            backdropFilter: "blur(12px)",
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              error={errors.name}
              onchange={handleChange}
            />

            <Input
              label="Email address"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              error={errors.email}
              onchange={handleChange}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Min. 6 characters"
              value={form.password}
              error={errors.password}
              onchange={handleChange}
            />

            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              value={form.confirmPassword}
              error={errors.confirmPassword}
              onchange={handleChange}
            />

            <Button
              type="submit"
              isLoading={loading}
              loadingText="Creating account..."
              className="mt-2"
            >
              Create account
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-slate-600 text-xs">or</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
