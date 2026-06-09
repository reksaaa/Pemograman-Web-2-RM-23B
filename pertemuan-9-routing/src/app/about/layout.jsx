import "./about.css";

export default function AboutLayout({ children }) {
  return (
    <div className="about-layout">
      <h1>Ini Halaman Layout About</h1>
      {children}
    </div>
  );
}
