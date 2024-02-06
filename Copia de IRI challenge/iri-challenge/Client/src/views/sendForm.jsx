// import React, { useState } from 'react';
// import Swal from 'sweetalert2';
// import axios from 'axios';

// const sendForm = () => {
//   const [studentName, setStudentName] = useState('');
//   const [hoursMet, setHoursMet] = useState('');
//   const [progressDescription, setProgressDescription] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       setIsLoading(true);

//       const response = await axios.post('http://localhost:3000/sendForm', {
//         studentName,
//         hoursMet,
//         progressDescription,
//       });

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
//           title: 'Form data sent successfully',
//         });
//       } else {
//         Swal.fire({
//           title: 'Failed to send form data',
//           text: 'Oopss...',
//           icon: 'error',
//         });
//       }
//     } catch (error) {
//       console.error('Error sending form data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex mt-[150px] justify-center h-[60vh]  ">
//       <div className="max-w-md w-full p-4 bg-white hover:shadow-xl shadow-lg rounded-md">
//         <h2 className="text-2xl font-bold text-center mb-4">Send Information</h2>
//         <form onSubmit={handleFormSubmit}>
//           <div className="mb-4">
//             <label htmlFor="studentName" className="block text-sm font-medium text-gray-600">
//               Student's Name
//             </label>
//             <input
//               onChange={(e) => setStudentName(e.target.value)}
//               type="text"
//               id="studentName"
//               name="studentName"
//               className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="hoursMet" className="block text-sm font-medium text-gray-600">
//               Hours Met
//             </label>
//             <input
//               onChange={(e) => setHoursMet(e.target.value)}
//               type="number"
//               id="hoursMet"
//               name="hoursMet"
//               className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="progressDescription" className="block text-sm font-medium text-gray-600">
//               Progress Description
//             </label>
//             <textarea
//               onChange={(e) => setProgressDescription(e.target.value)}
//               id="progressDescription"
//               name="progressDescription"
//               rows="5"
//               className="mt-1 p-2 w-full border max-h-20 rounded-md focus:outline-none focus:border-blue-500"
//               required
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-blue-500 text-white mt-8 p-2 rounded-md hover:bg-blue-600"
//           >
//             {isLoading ? 'Sending...' : 'Send Information'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default sendForm;

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const SendForm = () => {
  const [studentName, setStudentName] = useState('');
  const [hoursMet, setHoursMet] = useState('');
  const [progressDescription, setProgressDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);

      const response = await axios.post('http://localhost:3000/sendForm', {
        studentName,
        hoursMet,
        progressDescription,
      });

      if (response.data.success) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Thank you, data sent successfully',
        });
        setStudentName('');
        setHoursMet('');
        setProgressDescription('');
      } else {
        Swal.fire({
          title: 'Failed to send form data',
          text: 'Oops...',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error sending form data:', error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while submitting the form',
        icon: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex mt-[150px] justify-center h-[60vh]  ">
      <div className="max-w-md w-full p-4 bg-white hover:shadow-xl shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Send Information</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
             <label htmlFor="studentName" className="block text-sm font-medium text-gray-600">
               Student's Name
             </label>
             <input
              onChange={(event) => setStudentName(event.target.value)}
              type="text"
              id="studentName"
              name="studentName"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hoursMet" className="block text-sm font-medium text-gray-600">
              Hours Met
            </label>
            <input
              onChange={(event) => setHoursMet(event.target.value)}
              type="number"
              id="hoursMet"
              name="hoursMet"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="progressDescription" className="block text-sm font-medium text-gray-600">
              Progress Description
            </label>
            <textarea
              onChange={(event) => setProgressDescription(event.target.value)}
              id="progressDescription"
              name="progressDescription"
              rows="5"
              className="mt-1 p-2 w-full border max-h-20 rounded-md focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white mt-8 p-2 rounded-md hover:bg-blue-600"
          >
            {isLoading ? 'Sending...' : 'Send Information'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendForm;
