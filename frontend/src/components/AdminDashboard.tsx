import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { deleteUser, setUsers } from "../redux/userSlice";
import { logoutAdmin } from "../redux/adminSlice";
import { useNavigate } from "react-router-dom";
import UserFormModel from "./UserFormModel";
import type { User } from '../../types';
import { motion } from "framer-motion";
import AddUserModel from "./AddUserModel";

export default function AdminDashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.users.users);
    const adminEmail = useSelector((state: RootState) => state.admin.email);
    const navigate = useNavigate();
    const [showModel, setShowModel] = useState(false);
    const [showAddModel, setShowAddModel] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!adminEmail) {
            navigate('/signin');
            return;
        }

        api.post('/admin/getusers', { email: adminEmail }).then(res => {
            dispatch(setUsers(res.data));
        }).catch(err => console.log(err));

        console.log(users);
    }, [adminEmail, navigate, dispatch, showAddModel, selectedUser]);

    const handleDelete = (userEmail: string) => {
        setIsLoading(true);
        api.delete('/admin/user', {
            data: { admin_email: adminEmail, user_email: userEmail }
        })
            .then(() => {
                setIsLoading(false);
                dispatch(deleteUser(users.find(user => user.email === userEmail)!.id));
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false);
            });
    };

    const handleUpdate = (user: User) => {
        setSelectedUser(user);
        setShowModel(true);
    };

    const handleAddUser = () => {
        setShowAddModel(true);
    };

    const handleLogout = () => {
        dispatch(logoutAdmin());
        navigate('/signin');
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <motion.h1
                className="text-2xl font-bold mb-6 text-center text-gray-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Admin Dashboard
            </motion.h1>

            <div className="flex justify-between items-center mb-2 p-4 rounded">
                <button onClick={handleAddUser} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Add User
                </button>

                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Logout
                </button>
            </div>



            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">Username</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Role</th>
                            <th className="px-4 py-2 text-left">Permissions</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>

                    <motion.tbody
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, staggerChildren: 0.1 }}
                        className="divide-y divide-gray-200"
                    >
                        {users.map(user => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="hover:bg-gray-50"
                            >
                                <td className="border px-4 py-2">{user.username}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.role}</td>
                                <td className="border px-4 py-2">
                                    {Array.isArray(user.permissions) && user.permissions.length > 0
                                        ? user.permissions.join(', ')
                                        : "No Permissions"}
                                </td>

                                <td className="border px-4 py-2 text-center space-x-4">
                                    {isLoading && (
                                        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => handleUpdate(user)} disabled={isLoading}
                                        className="text-blue-500 font-semibold hover:underline"
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() => handleDelete(user.email)} disabled={isLoading}
                                        className="text-red-500 font-semibold hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </table>
            </div>

            {showModel && selectedUser && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                >
                    <UserFormModel user={selectedUser} onClose={() => setShowModel(false)} />
                </motion.div>
            )}

            {showAddModel && adminEmail && (
                <AddUserModel
                    adminEmail={adminEmail}
                    onClose={() => setShowAddModel(false)}
                />
            )}

        </div>
    );
}
