import { useOktaAuth } from "@okta/okta-react";

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center" as const,
    width: "320px",
  },
  title: {
    marginBottom: "10px",
  },
  subtitle: {
    marginBottom: "25px",
    color: "#666",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.2s",
  },
};

export default function Home() {
  const { oktaAuth } = useOktaAuth();

  const login = async () => {
    await oktaAuth.signInWithRedirect({
      prompt: "login",
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome 👋</h1>
        <p style={styles.subtitle}>Login to access your dashboard</p>

        <button style={styles.button} onClick={login}>
          Login with Okta
        </button>
      </div>
    </div>
  );
}
