export default function Modal() {
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "red",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      Ini Modal
    </div>
  );
}
