import React, { useState, useEffect } from "react";
import { Role } from "../types";
import { api } from "../services/api";
import RoleModal from "./RoleModal";
import { FiEdit2, FiTrash2, FiUserPlus, FiShield } from "react-icons/fi";
import { toast } from "react-toastify";

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<
    Omit<Role, "_id"> & { _id?: string }
  >({
    name: "",
    permissions: [],
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const data = await api.getRoles();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch roles",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setCurrentRole({ name: "", permissions: [], description: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (role: Role) => {
    setCurrentRole(role);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (isEditing && currentRole._id) {
        const updatedRole = await api.updateRole(currentRole._id, currentRole);
        setRoles(
          roles.map((role) =>
            role._id === currentRole._id ? updatedRole : role,
          ),
        );
        toast.success("Role updated successfully");
      } else {
        const newRole = await api.createRole(currentRole);
        setRoles([...roles, newRole]);
        toast.success("New role created successfully");
      }
      setShowModal(false);
      setCurrentRole({ name: "", permissions: [], description: "" });
    } catch (error) {
      console.error("Error saving role:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save role",
      );
    }
  };

  const deleteRole = async (id: string) => {
    try {
      await api.deleteRole(id);
      setRoles(roles.filter((role) => role._id !== id));
      toast.success("Role deleted successfully");
    } catch (error) {
      console.error("Error deleting role:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete role",
      );
    }
  };

  const handleRoleNameChange = (name: string) => {
    setCurrentRole({ ...currentRole, name });
  };

  const togglePermission = (permission: string) => {
    setCurrentRole({
      ...currentRole,
      permissions: currentRole.permissions.includes(permission)
        ? currentRole.permissions.filter((p) => p !== permission)
        : [...currentRole.permissions, permission],
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <FiShield className="mr-2 text-blue-500" />
            Role Management
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage roles and their permissions
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 ease-in-out shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
        >
          <FiUserPlus className="mr-2" />
          Add New Role
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div
            key={role._id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100"
          >
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">
                  {role.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(role)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                    title="Edit role"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteRole(role._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                    title="Delete role"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Permissions:
              </h4>
              <div className="flex flex-wrap gap-2">
                {role.permissions.length > 0 ? (
                  role.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium capitalize transition-colors duration-150 hover:bg-blue-100"
                    >
                      {permission}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400 italic">
                    No permissions assigned
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {roles.length === 0 && (
        <div className="text-center py-12">
          <FiShield className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No roles</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new role
          </p>
          <div className="mt-6">
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
            >
              <FiUserPlus className="mr-2" />
              Add New Role
            </button>
          </div>
        </div>
      )}

      <RoleModal
        showModal={showModal}
        role={currentRole}
        isEditing={isEditing}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        onRoleChange={handleRoleNameChange}
        onPermissionToggle={togglePermission}
      />
    </div>
  );
};

export default RoleManagement;
