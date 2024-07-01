import axios from 'axios';
import { toast } from 'react-toastify';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BASE_URL_AUTH } from '@/constants/url';

const AuthRegister = () => {
  const options = [ 
    { value: '', label: 'Select option' }, 
    { value: 'MALE', label: 'Male' }, 
    { value: 'FEMALE', label: 'Female' }, 
  ]; 

  const navigate = useNavigate(); 

  // Form Register
  const [authFormRegister, setAuthFormRegister] = useState({ 
    name: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
    sexo: '',
  }); 

  // Handle changes form
  const onChangeForm = (label: any, e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAuthFormRegister({ ...authFormRegister, [label]: e.target.value });   
  };

  // Handle submit
  const onSubmitHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); 
    // Post to register API
    await axios
      .post(`${BASE_URL_AUTH}register`, authFormRegister)
      .then((response) => {       
        navigate('/signin');
        toast.success(response.data.detail);         
        setTimeout(() => { 
          window.location.reload(); 
        }, 1000);
      }) 
      .catch((error) => { 
        console.log(error);    
        toast.error(error.response.data.detail); 
      }); 
  }; 

  // Return
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-balance text-muted-foreground">
              Welcome to ramselvin app!
            </p>
          </div>
          <form onSubmit={onSubmitHandler} name='register-form' className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                value={authFormRegister.name}
                onChange={(e) => onChangeForm('name', e)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sexo">Gender</Label>
              <select
                id="sexo"
                value={authFormRegister.sexo}
                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none focus:ring-yellow-400"
                onChange={(e) => onChangeForm('sexo', e)}
              >
                {options.map((data) => (
                  <option key={data.value} value={data.value} disabled={data.value === ''}>
                    {data.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={authFormRegister.username}
                onChange={(e) => onChangeForm('username', e)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                type="number"
                placeholder="Phone number"
                value={authFormRegister.phone_number}
                onChange={(e) => onChangeForm('phone_number', e)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={authFormRegister.email}
                onChange={(e) => onChangeForm('email', e)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={authFormRegister.password}
                onChange={(e) => onChangeForm('password', e)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link className="underline" to={'/signin'}>
              Sign In
            </Link>         
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block h-screen"></div>
    </div>
  );
}

// Export
export default AuthRegister;
