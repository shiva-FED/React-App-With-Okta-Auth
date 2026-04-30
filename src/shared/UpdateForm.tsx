import { type CSSProperties } from "react";
import type { User } from "../types/user";

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "fit-content",
    // background: "#f5f7fa",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    width: "320px",
  },
  title: {
    marginBottom: "20px",
    textAlign: "center",
  },
  field: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "5px",
    fontSize: "14px",
    color: "#555",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

type updateProfileProps = {
    user: User,
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    updateProfile: () => void;
}

export default function UpdateForm({user, setUser, updateProfile}: updateProfileProps) {

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>User Profile</h2>

        <div style={styles.field}>
          <label style={styles.label}>Name</label>
          <input
            style={styles.input}
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            style={{
              ...styles.input,
              background: "#eee",
              cursor: "not-allowed",
            }}
            value={user.email}
            disabled
          />
        </div>

        <button style={styles.button} onClick={updateProfile}>
          Update Profile
        </button>
      </div>
    </div>
  );
}
