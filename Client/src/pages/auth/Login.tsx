import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { loginUser } from "../../features/auth/authSlice";

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, accessToken, user } = useAppSelector(
    (state) => state.auth,
  );

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const mailRegex = /^[^\s@]+@(gmail|chatbot)\.(com|in|ai)$/;

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    } else if (!mailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (accessToken && user) {
      const userRoles = user?.roles || [];
      const isUserRole = userRoles.includes("user");

      if (isUserRole) {
        navigate("/userDashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [accessToken, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Welcome back
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Sign in to continue to your AI workspace
          </p>
        </div>

        {/* Form card */}
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
              placeholder="Enter your password"
              value={form.password}
              error={errors.password || error || undefined}
              onchange={handleChange}
            />

            <Button
              type="submit"
              isLoading={loading}
              loadingText="Signing in..."
              className="mt-2"
            >
              Sign in
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-slate-600 text-xs">or</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
