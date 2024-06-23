import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage('');

    try {
      const response = await axios.post(
        'https://site--marvel-backend--6jkf28t7mc47.code.run/signup',
        {
          email: email.trim(),
          username: username.trim(),
          password,
        }
      );

      if (response.data && response.data.token) {
        handleToken(response.data.token);

        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('Cet email est déjà utilisé');
      } else if (
        error.response &&
        error.response.data.message === 'Missing parameters'
      ) {
        setErrorMessage('Veuillez remplir tous les champs');
      } else {
        console.error(error);
        setErrorMessage("Une erreur s'est produite");
      }
    }
  };

  return (
    <main className=' flex flex-row justify-center align-middle mt-24'>
      <form
        onSubmit={handleSubmit}
        className=' flex flex-col justify-center align-middle   p-4 rounded 
        mt-8 space-y-2 '
      >
        <label htmlFor='username'>First name</label>
        <input
          type='text'
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          value={username}
          className='appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
          className='appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
          className='appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
        />

        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          value={confirmPassword}
          className='appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
        />

        <button className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
          S'inscrire
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </main>
  );
};

export default Signup;
