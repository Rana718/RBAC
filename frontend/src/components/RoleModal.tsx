import React from "react";
import { Role } from "../types";

interface RoleModalProps {
  showModal: boolean;
  role: Omit<Role, "_id"> & { _id?: string }; 
  isEditing: boolean; 
  onClose: () => void;
  onSave: () => void;
  onRoleChange: (name: string) => void;
  onPermissionToggle: (permission: string) => void;
}

const RoleModal: React.FC<RoleModalProps> = ({
  showModal,
  role,
  isEditing,
  onClose,
  onSave,
  onRoleChange,
  onPermissionToggle,
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
            {isEditing ? "Edit Role" : "Add New Role"}
          </h3>
          <div className="mt-2 px-7 py-3">
            <input
              type="text"
              placeholder="Role Name"
              className="mt-2 p-2 w-full border rounded"
              value={role.name}
              onChange={(e) => onRoleChange(e.target.value)}
              disabled={isEditing}
            />
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Permissions:
              </h4>
              <div className="space-y-2">
                {["read", "write", "delete"].map((permission) => (
                  <label key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={role.permissions.includes(permission)}
                      onChange={() => onPermissionToggle(permission)}
                      className="mr-2"
                    />
                    {permission}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="items-center px-4 py-3 text-center">
            <button
              onClick={onSave}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {isEditing ? "Save Changes" : "Add Role"}
            </button>
            <button
              onClick={onClose}
              className="ml-3 px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleModal;
