import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout, loginSuccess } from "../store/authSlice";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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

  const fetchOrders = async () => {
    try {
      let res = await axios.get("http://localhost:5000/api/order/all", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Logout API error (ignored):", error);
    }

    dispatch(logout());
    navigate("/login");
  };

  /* ================= PROFILE UPDATE ================= */
  const handleProfileUpdate = async () => {
    console.log("click");

    try {
      const res = await axios.patch(
        "http://localhost:5000/api/auth/profile-update",
        { name, email, phone },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);

      // update redux + localStorage
      // dispatch(
      //   loginSuccess({
      //     user: res.data.user,
      //     token,
      //   })
      // );

      setIsEditing(false);
      // alert("Profile updated successfully");
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

  useEffect(() => {
    fetchOrders();
  }, []);

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
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone"
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
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
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
                <section className=" w-full">
                  <div className="p-4">
                    <div className="max-w-screen-lg mx-auto">
                      <div className="border-b border-gray-300 pb-4">
                        <div className="flex items-center flex-wrap gap-4">
                          <h3 className="text-2xl font-semibold text-slate-900">
                            Order History
                          </h3>
                          <div className="ml-auto">
                            <select className="appearance-none cursor-pointer bg-white border border-gray-300 outline-0 px-4 py-2 text-slate-900 rounded-md text-[15px]">
                              <option>All orders</option>
                              <option>Completed</option>
                              <option>Processing</option>
                              <option>Cancelled</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="divide-y divide-gray-300 mt-6">
                        {orders.map((order, i) => (
                          <div>
                            <div className="grid grid-cols-5 max-md:grid-cols-2 items-start justify-between gap-6 py-4">
                              <div className="md:col-span-2 flex items-start gap-4 max-sm:flex-col">
                                <div>
                                  <h6 className="text-[15px] font-semibold text-slate-900">
                                    {order?.item?.name}
                                  </h6>
                                  <div className="mt-2">
                                    <p className="text-[15px] text-slate-500 font-medium">
                                      Order ID:{" "}
                                      <span className="ml-1 text-slate-900">
                                        # {order?._id.slice(0, 5)}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h6 className="text-[15px] font-medium text-slate-500">
                                  Date
                                </h6>
                                <p className="text-[15px] text-slate-900 font-medium mt-2">
                                  {order?.updatedAt}
                                </p>
                              </div>
                              <div>
                                <h6 className="text-[15px] font-medium text-slate-500">
                                  Status
                                </h6>
                                <p className="bg-green-100 text-[13px] font-medium text-green-600 mt-2 inline-block rounded-md py-1.5 px-3">
                                  {order?.delivaryStatus}
                                </p>
                              </div>
                              <div className="md:ml-auto">
                                <h6 className="text-[15px] font-medium text-slate-500">
                                  Price
                                </h6>
                                <p className="text-[15px] text-slate-900 font-medium mt-2">
                                  BDT {order?.grandTotal}
                                </p>
                              </div>
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-8">
                                {order?.items?.map((item, i) => (
                                  <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-100 p-1 rounded-md overflow-hidden">
                                      <img
                                        src={item?.item?.images?.[0]}
                                        alt="Product"
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                    <div>
                                      <p className="text-[15px] font-medium text-slate-900">
                                        {item?.item?.name}
                                      </p>
                                      <p className="text-xs text-slate-600 mt-1">
                                        Qty: {item?.quantity}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Profile;
