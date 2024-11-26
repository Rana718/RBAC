import React from "react";
import { Role, User } from "../types";
import { userSchema, UserFormData } from "../schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UserModalProps {
  showModal: boolean;
  user: Omit<User, "_id"> & { _id?: string };
  roles: Role[];
  isEditing: boolean;
  onClose: () => void;
  onSave: (data: UserFormData) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  showModal,
  user,
  roles,
  isEditing,
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user,
  });

  React.useEffect(() => {
    if (showModal) {
      reset(user);
    }
  }, [showModal, user, reset]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {isEditing ? "Edit User" : "Add New User"}
          </h3>
          <form onSubmit={handleSubmit(onSave)} className="mt-2 px-7 py-3">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
                className={`mt-2 p-2 w-full border rounded ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 text-left">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`mt-2 p-2 w-full border rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 text-left">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <select
                {...register("role")}
                className={`mt-2 p-2 w-full border rounded ${
                  errors.role ? "border-red-500" : "border-gray-300"
                }`}
              >
                {roles.map((role) => (
                  <option key={role._id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-1 text-left">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <select
                {...register("status")}
                className={`mt-2 p-2 w-full border rounded ${
                  errors.status ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-xs mt-1 text-left">
                  {errors.status.message}
                </p>
              )}
            </div>

            <div className="items-center px-4 py-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {isEditing ? "Save Changes" : "Add User"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="ml-3 px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
