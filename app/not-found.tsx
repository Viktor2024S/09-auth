// app/not-found.tsx
import Link from "next/link";
import { Metadata } from "next";

/*
.notfound {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  font-family: sans-serif;
  padding: 20px;
  background-color: #f8f8f8;
  color: #333;
}

.title {
  font-size: 3em;
  color: #e74c3c;
  margin-bottom: 10px;
}

.description {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.link:hover {
  background-color: #0056b3;
}
*/

export const metadata: Metadata = {
  title: "NoteHub - Page Not Found",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "NoteHub - Page Not Found",
    description: "Sorry, the page you are looking for does not exist.",
    url: "https://09-auth-pi.vercel.app/notes",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
    type: "website",
  },
};

export default function NotFound() {
  return (
    <html lang="en">
      {" "}
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            textAlign: "center",
            fontFamily: "sans-serif",
            padding: "20px",
            backgroundColor: "#f8f8f8",
            color: "#333",
          }}
        >
          <h1
            style={{
              fontSize: "3em",
              color: "#e74c3c",
              marginBottom: "10px",
            }}
          >
            404 - Page Not Found
          </h1>
          <p
            style={{
              fontSize: "1.2em",
              marginBottom: "20px",
            }}
          >
            Sorry, the page you are looking for does not exist.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
          >
            Go back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
