import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';
import { API } from '../../const';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error('All fields are required');
      return;
    }

    setLoading(true);
    try {
      let response = await fetch(`${API}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        response = await response.json();
        if (response.success) {
          const res= await fetch(`${API}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              setAuth({ ...auth, token: data.token });
              localStorage.setItem('auth', JSON.stringify({ token: data.token }));
              navigate('/dashboard/main');
            } else {
              toast.error(data.message);
            }

          }

          // setAuth({ ...auth, token: response.token });
          // localStorage.setItem('auth', JSON.stringify({ token: response.token }));
          // navigate('/');
        } else {
          toast.error(response.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    window.location.href = `${API}/api/v1/auth/google`;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
       <div className="flex flex-col items-center mb-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/7/75/National_Institute_of_Technology%2C_Kurukshetra_Logo.png"
          alt="College Logo"
          className="w-20 h-20 mb-2"
        />
        <h2 className="text-2xl font-bold text-navy-800">NIT Kurukshetra</h2>
      </div>
      <h1 className="text-3xl font-semibold text-center text-navy-800">
        19th Convocation Registration
      </h1>
      {/* <p className="text-gray-600 text-center mt-2 mb-6">
        Sign up to continue
      </p> */}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-md bg-[#C21717] text-white font-semibold hover:bg-[#C21720] transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>

        <button
          type="button"
          onClick={handleGoogle}
          className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center gap-2 mt-4 hover:bg-gray-100 transition-all"
          disabled={loading}
        >
                    <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Sign up with Google
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            className="text-[#C21717] font-medium hover:underline"
            onClick={() => navigate('/')}
            disabled={loading}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Form;
