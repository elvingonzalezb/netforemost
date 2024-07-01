import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Header from "../app/header";

interface ProtectedRouteProps {
    token: string | null | undefined;
}

const notifications = [
    {
        title: "Repositorio público",
        description: "Respositorio con toda la arquitectura realizada",
        url: "https://github.com/elvingonzalezb/netforemost"
    },
    {
        title: "Información general",
        description: "Wiki con información general",
        url: "https://github.com/elvingonzalezb/netforemost/wiki/Information"
    }
]

const Information: React.FC<ProtectedRouteProps> = ({ token }) => {
    return ( 
        <>
            <Header isAuthenticated={token} />
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <Card className="xl:col-span-4" x-chunk="dashboard-01-chunk-4">
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Información General</CardTitle>
                                    <CardDescription>
                                    Prueba de backend en NodeJS - Empresa NetForemost
                                    </CardDescription>
                            </div>               
                        </CardHeader>

                        <CardContent>
                            <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead>Descripción</TableHead>                                 
                                </TableRow>
                                </TableHeader>
                                <TableBody>                              
                                    {notifications.map((notification, index) => (
                                        <TableRow>
                                            <TableCell>
                                                <div key={index} className="font-medium">{notification.title}</div>
                                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                                        <a href={notification.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                            {notification.title}
                                                        </a>
                                                    </div>                                        
                                            </TableCell>
                                        </TableRow>  
                                    ))}                                                   
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>             
    );
};

export default Information;