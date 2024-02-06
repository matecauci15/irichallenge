// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const Form = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       setIsLoading(true);
//       const response = await axios.post(
//         'http://localhost:3000/login',
//         { email, password },
//         { withCredentials: true }
//     );

//       if (response.data.success) {
//         const Toast = Swal.mixin({
//           toast: true,
//           position: 'top-end',
//           showConfirmButton: false,
//           timer: 1000,
//           timerProgressBar: true,
//           didOpen: (toast) => {
//             toast.addEventListener('mouseleave', Swal.resumeTimer);
//           },
//         });
//         Toast.fire({
//           icon: 'success',
//           title: 'Login successful',
//         });
//         window.location.href = '/cargar-informacion';
//       } else {
//         Swal.fire({
//           title: 'User not found',
//           text: 'Oopss...',
//           icon: 'error',
//         });
//       }
//     } catch (error) {
//       console.error('Error al enviar formulario:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex mt-[150px] justify-center h-[50vh]  ">
//       <div className="max-w-md w-full p-4 bg-white hover:shadow-xl shadow-lg rounded-md">
//         <h2 className="text-2xl font-bold text-center mb-4">Log In</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-600">
//               Email
//             </label>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               id="email"
//               name="email"
//               className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-medium text-gray-600">
//               Password
//             </label>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               id="password"
//               name="password"
//               className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-blue-500 text-white mt-8 p-2 rounded-md hover:bg-blue-600"
//           >
//             {isLoading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Form;

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const response = await axios.post('http://localhost:3000/authenticate', { email, password });

      if (response.data.success) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Login successful',
        });

        window.location.href = response.data.redirectTo;
        setEmail('');
        setPassword('');
      } else {
        Swal.fire({
          title: 'Authentication failed',
          text: 'Oopss...',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex mt-[150px] justify-center h-[50vh]  ">
      <div className="max-w-md w-full p-4 bg-white hover:shadow-xl shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white mt-8 p-2 rounded-md hover:bg-blue-600"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
