import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const TopMenu: React.FC = () => {
    const { userInfo, isAuthenticated, logout } = useAuth();

    return (
        <>
            {isAuthenticated ? (
                <nav className="flex flex-row items-center justify-between p-4 bg-gray-800 space">
                    <div>
                        <ul className="flex space-x-4">
                            <li className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">
                                <Link to="/tickets" className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">Tickets</Link>
                            </li>
                            <li className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">
                                <Link to="/create-ticket" className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">Criar Ticket</Link>
                            </li>
                            <li className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">
                                <button onClick={() => logout()}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="flex space-x-4">
                            <li className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">
                                <Link to="/profile" className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">
                                    {userInfo.name}
                                </Link>
                            </li>

                        </ul>
                    </div>
                </nav>
            ) : (
                <>
                </>
            )}
        </>
    );
};

export default TopMenu;
