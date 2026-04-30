import { useEffect, useState, type CSSProperties } from "react";
import { type User } from "../../types/user";
import { oktaAuth } from "../../auth/oktaConfig";
import { getUsers, deleteuser, updateUser } from "../../services/userService";
import UpdateForm from "../../shared/updateForm";

const baseButton: CSSProperties = {
  border: "none",
  color: "#fff",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "20px"
}

const styles: { [key: string]: CSSProperties } = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "20px",
    minHeight: "100vh",
    minWidth: "100vw",
  },
  heading: {
    marginBottom: "20px",
  },
  cardWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divSection: {
    marginRight: "20px",
  },
  name: {
    margin: 0,
  },
  email: {
    margin: 0,
    color: "#555",
    fontSize: "14px",
  },
  deleteBtn: {
    ...baseButton,
    background: "#ff4d4f"
  },
  button: {
    ...baseButton,
    background: "#4CAF50"
  },
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    const res = await getUsers();
    const filteredData = res?.data?.filter(
      (user: User) => user.role === "user",
    );
    setUsers(filteredData);
  };

  useEffect(() => {
    fetchUsers();
    window.addEventListener("focus", fetchUsers);

    return () => window.removeEventListener("focus", fetchUsers);
  }, []);

  const updateProfile = async () => {
    if (!selectedUser) return;

    await updateUser(selectedUser.id, selectedUser);

    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? selectedUser : u)),
    );

    setShowModal(false);
  };

  const deleteUser = async (id: number) => {
    await deleteuser(id);
    fetchUsers();
  };

  const signOut = () => {
    oktaAuth.signOut();
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={signOut}>
        Sign Out
      </button>
      <h2 style={styles.heading}>Admin Dashboard</h2>

      <div style={styles.cardWrapper}>
        {users.map((u) => (
          <div key={u.id} style={styles.card}>
            <div style={styles.divSection}>
              <h3 style={styles.name}>{u.name}</h3>
              <p style={styles.email}>{u.email}</p>
            </div>

            <button style={styles.deleteBtn} onClick={() => deleteUser(u.id)}>
              Delete
            </button>
            <button
              style={styles.button}
              onClick={() => {
                setSelectedUser(u);
                setShowModal(true);
              }}
            >
              Edit
            </button>
          </div>
        ))}

        {showModal && selectedUser && (
          <div style={styles.modalOverlay}>
            <div className="modal">
              <UpdateForm
                user={selectedUser}
                setUser={setSelectedUser}
                updateProfile={updateProfile}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
