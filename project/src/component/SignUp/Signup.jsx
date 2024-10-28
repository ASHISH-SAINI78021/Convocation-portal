
import Form from './Form';

const Login = () => {
  return (
    <div
      className="flex items-center justify-center w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/GoldenJubilee.jpg')` }}
    >
      <div className="bg-white shadow-lg rounded-3xl my-4">
        <Form />
      </div>
    </div>
  );
};

export default Login;
