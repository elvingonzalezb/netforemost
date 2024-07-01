import axios from 'axios';
import { useToast } from "@/components/ui/use-toast"
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BASE_URL_AUTH } from '@/constants/url';

const AuthLogin = () => {
  const [authLoginForm, setAuthLoginForm] = useState({
    password: '',
    username: '',
  });

  const navigate = useNavigate();
  const { toast } = useToast()

  const onChangeForm = (tag: string, e: ChangeEvent<HTMLInputElement>) => {
    setAuthLoginForm({ ...authLoginForm, [tag]: e.target.value });
  };

  const onSubmitHandler = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await axios
    .post(`${BASE_URL_AUTH}login`, authLoginForm)
    .then((response) => {   
      console.log(response.data.token);
      localStorage.setItem('rsv_token', response.data.token);
      localStorage.setItem('rsv_token_type', response.data.token_type);    
      toast({title: response.data.detail});
      navigate('/');
      window.location.href = '/';
    }) 
    .catch((error) => { 
      console.log(error.response.data.detail);    
      toast({title: error.response.data.detail});
    }); 
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome to ramselvin app</h1>
            <p className="text-balance text-muted-foreground">
              Login to your account!
            </p>
          </div>
          <form onSubmit={onSubmitHandler} name='login-form' className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="netforemost1234"
                value={authLoginForm.username}
                onChange={(e) => onChangeForm('username', e)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>                
              </div>
              <Input
                id="password"
                type="password"
                placeholder="netforemost1234"
                value={authLoginForm.password}
                onChange={(e) => onChangeForm('password', e)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link className="underline" to={'/signup'}>Signup</Link>
          </div>
          <div className="mt-4 text-center text-sm">           
            <Link className="underline" to={'/forgot'}>
                  Forgot your password?
            </Link>  
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block h-screen"></div>
    </div>
  );
};

export default AuthLogin;
