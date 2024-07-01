import { Link } from 'react-router-dom';
import { useState } from 'react';

interface HeaderProps {
    isAuthenticated: string | null | undefined;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
    const handleLogout = () => {
        localStorage.removeItem('rsv_token');
        localStorage.removeItem('rsv_token_type');
        window.location.href = '/signin';
    };

    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="mr-4 hidden md:flex">
                    <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
                        <img className="aspect-square h-full w-full" alt="mets" src="https://ramselvinbucketaws.s3.amazonaws.com/assets/icons/mets.png"></img>
                    </span> 
                    <a className="ml-6 mr-6 flex items-center space-x-2" href="/">                        
                        <span className="hidden font-bold sm:inline-block">ramselvin app</span>
                    </a>
                    <nav className="flex items-center gap-4 text-sm lg:gap-6">
                        {isAuthenticated ? (
                            <>
                                <Link className="transition-colors hover:text-foreground text-foreground" to="/articles">Articles</Link>
                                <Link className="transition-colors hover:text-foreground/80 text-foreground" to="/information">Information</Link>
                                <Link className="transition-colors hover:text-foreground/80 text-foreground" to="/load">Load Data</Link>
                                <button className="transition-colors hover:text-foreground/80 text-foreground" onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>                               
                                <Link className="transition-colors hover:text-foreground/80 text-foreground" to="/profile">Profile</Link>
                            </>
                        )}
                    </nav>
                </div> 


                <div className="md:hidden flex items-center">
                    <button 
                        className="transition-colors hover:text-foreground/80 text-foreground"
                        onClick={() => setShowMenu(!showMenu)}
                        aria-label="Toggle Menu"
                    >
                        Menu
                    </button>
                </div>
                {showMenu && (
                    <div className="md:hidden absolute right-4 top-16 mt-2 bg-white rounded-lg shadow-lg p-2">
                        <div className="flex flex-col gap-2">
                            {isAuthenticated ? (
                                <>
                                    <Link className="transition-colors hover:text-foreground text-foreground" to="/articles">Articles</Link>
                                    <Link className="transition-colors hover:text-foreground/80 text-foreground" to="/information">Information</Link>
                                    <button className="transition-colors hover:text-foreground/80 text-foreground" onClick={handleLogout}>Logout</button>
                                </>
                            ) : (
                                <Link className="transition-colors hover:text-foreground/80 text-foreground" to="/profile">Profile</Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;
