import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!subject.trim() && !content.trim()) {
      setError("Please enter at least subject or content.");
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content }),
      });

      if (!resp.ok) throw new Error(`API error: ${resp.status}`);

      const data = await resp.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to call API. Check console / backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.title}>Spam Mail Detector</h1>
          <p style={styles.subtitle}>
            Enter email <strong>subject</strong> and <strong>body</strong>.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Subject</label>
              <input
                style={styles.input}
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject..."
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Content</label>
              <textarea
                style={styles.textarea}
                rows={7}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter email content here..."
              />
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <button style={styles.button} type="submit" disabled={loading}>
              {loading ? "Analyzing..." : "Check Spam"}
            </button>
          </form>

          {result && (
            <div style={styles.resultCard}>
              <h2 style={styles.resultTitle}>
                Result:{" "}
                <span
                  style={{
                    ...styles.badge,
                    backgroundColor:
                      result.label === "spam" ? "#e11d48" : "#22c55e",
                  }}
                >
                  {result.label.toUpperCase()}
                </span>
              </h2>

              <p style={styles.resultText}>
                <strong>Spam Probability:</strong>{" "}
                {(result.prob_spam * 100).toFixed(2)}%
              </p>
              <p style={styles.resultText}>
                <strong>Ham Probability:</strong>{" "}
                {(result.prob_ham * 100).toFixed(2)}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    background: "linear-gradient(to bottom right, #0f172a, #1e293b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
  },

  wrapper: {
    width: "100%",
    maxWidth: "650px",
    display: "flex",
    justifyContent: "center",
  },

  card: {
    width: "100%",
    background: "rgba(2, 6, 23, 0.85)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "32px",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#e2e8f0",
    boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
  },

  title: {
    fontSize: "1.9rem",
    marginBottom: "0.25rem",
    textAlign: "center",
  },

  subtitle: {
    fontSize: "0.95rem",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#94a3b8",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },

  field: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    marginBottom: "0.3rem",
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#cbd5e1",
  },

  input: {
    padding: "0.7rem 1rem",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#e2e8f0",
    fontSize: "1rem",
  },

  textarea: {
    padding: "0.7rem 1rem",
    borderRadius: "8px",
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#e2e8f0",
    fontSize: "1rem",
    resize: "vertical",
  },

  button: {
    marginTop: "0.5rem",
    padding: "0.85rem 1rem",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(to right, #6366f1, #ec4899)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "1rem",
    textAlign: "center",
  },

  error: {
    color: "#fecaca",
    background: "#450a0a",
    borderRadius: "8px",
    padding: "0.6rem 1rem",
    fontSize: "0.85rem",
  },

  resultCard: {
    marginTop: "2rem",
    padding: "1.2rem 1.5rem",
    borderRadius: "14px",
    background: "rgba(2, 6, 23, 0.85)",
    border: "1px solid #334155",
  },

  resultTitle: {
    marginBottom: "0.75rem",
    fontSize: "1.3rem",
    textAlign: "center",
  },

  badge: {
    padding: "0.3rem 0.8rem",
    borderRadius: "999px",
    fontSize: "0.85rem",
    color: "#fff",
  },

  resultText: {
    fontSize: "1rem",
    marginTop: "0.3rem",
    textAlign: "center",
  },
};

export default App;
