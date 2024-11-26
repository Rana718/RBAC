import { useState } from "react";
import { api } from "../services/api";

type Props = {
    adminEmail: string;
    onClose: () => void;
};

export default function AddUserModel({ adminEmail, onClose }: Props) {
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
        const { username, email, password, role, permissions } = formData;
        api.post("/admin/user", {
            admin_email: adminEmail,
            user_email: email,
            username,
            user_password: password,
            role,
            permissions: permissions.split(",").map((perm) => perm.trim()),
        })
            .then(() => onClose())
            .catch((err) => console.log(err));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
