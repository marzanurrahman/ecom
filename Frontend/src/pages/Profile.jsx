import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout, loginSuccess } from "../store/authSlice";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  // Load user data into form
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("Logout API error (ignored):", error);
    }

    dispatch(logout());
    navigate("/login");
  };

  /* ================= PROFILE UPDATE ================= */
  const handleProfileUpdate = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/profile-update",
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update redux + localStorage
      dispatch(
        loginSuccess({
          user: res.data.user,
          token,
        })
      );

      setIsEditing(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Profile update failed");
    }
  };

  /* ================= PASSWORD UPDATE ================= */
  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/auth/update-password",
        {
          oldPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");

      alert("Password updated successfully");
    } catch (error) {
      console.error(error);
      alert("Password update failed");
    }
  };

  return (
    <main className="py-12 min-h-[70vh]">
      <Container>
        <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4">

            {/* LEFT MENU */}
            <div className="md:col-span-1 p-6 bg-gray-50 border-r border-gray-200">
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
                      activeTab === "profile"
                        ? "bg-slate-900 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    My Profile
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium ${
                      activeTab === "orders"
                        ? "bg-slate-900 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    Orders
                  </button>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>

            {/* RIGHT CONTENT */}
            <div className="md:col-span-3 p-6">
              {activeTab === "profile" && (
                <>
                  <h2 className="text-xl font-semibold mb-4">My Profile</h2>

                  {!isEditing ? (
                    <>
                      <p>Name{user?.name}</p>
                      <p>Email{user?.email}</p>

                      <button
                        onClick={() => setIsEditing(true)}
                        className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-md"
                      >
                        Update Profile
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="space-y-4 max-w-md">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Name"
                          className="w-full border px-3 py-2 rounded"
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          className="w-full border px-3 py-2 rounded"
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={handleProfileUpdate}
                            className="px-4 py-2 bg-slate-900 text-white rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 border rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>

                      {/* PASSWORD UPDATE */}
                      <div className="mt-10 max-w-md">
                        <h3 className="font-semibold mb-3">Update Password</h3>

                        <input
                          type="password"
                          placeholder="Old Password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          className="w-full border px-3 py-2 rounded mb-3"
                        />
                        <input
                          type="password"
                          placeholder="New Password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full border px-3 py-2 rounded mb-3"
                        />
                        <input
                          type="password"
                          placeholder="Confirm New Password"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          className="w-full border px-3 py-2 rounded mb-4"
                        />

                        <button
                          onClick={handlePasswordUpdate}
                          className="px-4 py-2 bg-slate-900 text-white rounded"
                        >
                          Update Password
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}

              {activeTab === "orders" && (
                <p className="text-gray-500">You have no orders yet.</p>
              )}
            </div>

          </div>
        </div>
      </Container>
    </main>
  );
};

export default Profile;
