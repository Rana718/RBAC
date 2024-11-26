import { useState } from "react";
import { api } from "../services/api";

type Props = {
    adminEmail: string;
    onClose: () => void;
};

export default function AddUserModel({ adminEmail, onClose }: Props) {
    const [isLoading, setLoding] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
        permissions: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        setLoding(true);
        const { username, email, password, role, permissions } = formData;
        api.post("/admin/user", {
            admin_email: adminEmail,
            user_email: email,
            username,
            user_password: password,
            role,
            permissions: permissions.split(",").map((perm) => perm.trim()),
        })
            .then(() => {
                onClose()
                setLoding(false);
            })
            .catch((err) => {
                console.log(err)
                setLoding(false);
            });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                <h2 className="text-xl font-bold mb-4">Add User</h2>
                <div className="space-y-4">
                    {["username", "email", "password", "role", "permissions"].map((field) => (
                        <input
                            key={field}
                            name={field}
                            placeholder={field}
                            value={(formData as any)[field]}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded"
                        />
                    ))}
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
