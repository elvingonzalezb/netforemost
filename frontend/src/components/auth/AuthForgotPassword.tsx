import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BASE_URL_AUTH } from '@/constants/url';

const AuthForgotPassword = () => { 
  const [authForgotPasswordForm, setAuthForgotPasswordForm] = useState({ 
    email: '',
    new_password: '',
  });

  // Handle form changes
  const onChangeForm = (tag: string, e: ChangeEvent<HTMLInputElement>) => { 
    setAuthForgotPasswordForm({ ...authForgotPasswordForm, [tag]: e.target.value });
  }; 

  // Handle form submission
  const onSubmitHandler = async (e: { preventDefault: () => void; }) => { 
    e.preventDefault(); 
    await axios 
      .post(`${BASE_URL_AUTH}forgot-password`, authForgotPasswordForm) 
      .then((response) => { 
        toast.success(response.data.detail); 
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      }) 
      .catch((error) => { 
        toast.error(error.response.data.detail); 
      }); 
  }; 

  return ( 
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className='text-3xl font-bold'>Forgot your password?</h1>
            <p className='text-balance text-muted-foreground'>
              Now update your password account!
            </p>
          </div>
          <form onSubmit={onSubmitHandler} name='forgot-password-form' className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={authForgotPasswordForm.email}
                onChange={(e) => onChangeForm('email', e)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new_password">New Password</Label>
              <Input
                id="new_password"
                type="password"
                placeholder="New Password"
                value={authForgotPasswordForm.new_password}
                onChange={(e) => onChangeForm('new_password', e)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Update Password
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

export default AuthForgotPassword;
