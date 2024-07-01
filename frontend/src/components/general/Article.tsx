import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../app/header';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';
import { BASE_URL_API } from '@/constants/url';

interface Article {
    _id: string;
    author?: string;
    title?: string;
    description?: string;
    url?: string;
    urlToImage?: string;
    publishedAt?: string;
}

interface ProtectedRouteProps {
    token: string | null | undefined;
}

const isImageURL = (url: string): boolean => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const urlExtension = url.split('.').pop()?.toLowerCase();
    return !!urlExtension && allowedExtensions.includes(urlExtension);
};

const Article: React.FC<ProtectedRouteProps> = ({ token }) => {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`${BASE_URL_API}articles`);
                if (response.data.error === false) {
                    setArticles(response.data.data);
                } else {
                    console.error('Error fetching articles:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    const handleCardClick = (url?: string) => {
        if (url) {
            window.open(url, '_blank');
        }
    };

    return (
        <>
            <Header isAuthenticated={token} />
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    {articles.length === 0 ? (
                        <Card className="xl:col-span-4" x-chunk="dashboard-01-chunk-4">
                            <CardHeader>
                                <CardTitle>No hay artículos disponibles</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    No hay artículos registrados actualmente. Por favor, carga los datos desde la sección correspondiente.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        articles.map((article) => (
                            <Card
                                key={article._id}
                                className="xl:col-span-4 cursor-pointer"
                                x-chunk="dashboard-01-chunk-4"
                                onClick={() => handleCardClick(article.url)}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle></CardTitle>
                                    </CardHeader>
                                    <CardContent className="grid gap-8">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-12 w-12 sm:h-16 sm:w-16 rounded-none overflow-hidden">
                                                {article.urlToImage && isImageURL(article.urlToImage) ? (
                                                    <AvatarImage src={article.urlToImage} alt="Avatar" />
                                                ) : (
                                                    <AvatarFallback className="h-12 w-12 sm:h-16 sm:w-16 rounded-none overflow-hidden">{'Not img'}</AvatarFallback>
                                                )}
                                            </Avatar>
                                            <div className="grid gap-1">
                                                <p className="text-sm font-medium leading-none">Title: {article.title || 'No title'}</p>
                                                <p className="text-sm text-muted-foreground">Author: {article.author || 'No author'}</p>
                                                <p className="text-sm text-muted-foreground">Description: {article.description || 'No description'}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Article;
