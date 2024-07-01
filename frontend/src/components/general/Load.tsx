import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Header from "../app/header";
import { BASE_URL_API } from '@/constants/url';

interface ProtectedRouteProps {
    token: string | null | undefined;
}

const Load: React.FC<ProtectedRouteProps> = ({ token }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const storedLoading = localStorage.getItem('loading');
        const storedMessage = localStorage.getItem('message');
        
        if (storedLoading === 'true') {
            setLoading(true);
        }
        
        if (storedMessage) {
            setMessage(storedMessage);

            setTimeout(() => {
                setMessage('');
                localStorage.removeItem('message');
            }, 5000);
        }
    }, []);

    const handleLoadData = async () => {
        try {
            setLoading(true);
            localStorage.setItem('loading', 'true');

            // TODO Simulate a 10 second delay
            await new Promise(resolve => setTimeout(resolve, 10000));

            const response = await axios.post(`${BASE_URL_API}articles/load`);
            if (response.data.error === false) {
                setMessage(response.data.message); 
            } else {
                setMessage(`Error: ${response.data.message}`);
            }
        } catch (error) {
            //@ts-ignore
            setMessage(`Error to load articles: ${error.message}`);
        } finally {
            setLoading(false);
            localStorage.setItem('loading', 'false');
            localStorage.setItem('message', message);
       
            setTimeout(() => {
                setMessage('');
                localStorage.removeItem('message');
            }, 5000);
        }
    };

    return ( 
        <>
            <Header isAuthenticated={token} />
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card className="xl:col-span-4" x-chunk="dashboard-01-chunk-4">
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Procesar</CardTitle>
                                <CardDescription>
                                    Ejecución de lectura y registro de artículos
                                </CardDescription>
                            </div>               
                        </CardHeader>
                        <CardContent>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleLoadData}
                                disabled={loading}
                            >
                                {loading ? 'Cargando los artículos...' : 'Cargar'}
                            </button>
                            {message && (
                                <div className={`mt-4 text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                                    {message}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>             
    );
};

export default Load;
