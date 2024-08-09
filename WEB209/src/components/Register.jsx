import { useState } from 'react';
import {
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    mail: '', // Changed from email to mail
    phone: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook for redirection

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users/register', formData);
      if (response.status === 200) {
        setMessage(response.data.messages);
        // Redirect to login page
        navigate('/login');
      }
    } catch (error) {
      setMessage('Registration failed. Please try again.');
      console.error("Error:", error.message);
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>
          <form onSubmit={handleSubmit}>
            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Register</p>
            </div>

            <MDBInput wrapperClass='mb-4' label='Name' id='name' type='text' size="lg" value={formData.name} onChange={handleChange} />
            <MDBInput wrapperClass='mb-4' label='Email address' id='mail' type='email' size="lg" value={formData.mail} onChange={handleChange} />
            <MDBInput wrapperClass='mb-4' label='Phone' id='phone' type='number' size="lg" value={formData.phone} onChange={handleChange} />
            <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" value={formData.password} onChange={handleChange} />

            <div className='text-center text-md-start mt-4 pt-2'>
              <MDBBtn className="mb-0 px-5" size='lg' type='submit'>Register</MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <Link to={`/login`} className="">Log In</Link></p>
            </div>
          </form>
          {message && <p className="mt-3">{message}</p>}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
