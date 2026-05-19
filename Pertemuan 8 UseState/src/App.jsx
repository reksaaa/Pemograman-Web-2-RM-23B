import { useState } from "react";
import Modal from "./Modal";

export default function App() {
  const [number, setNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);

  function increase() {
    setNumber(number + 1);
  }

  function decrease() {
    if (number <= 0) {
      return;
    }
    setNumber(number - 1);
  }

  return (
    <main>
      <h1>Ini Angka : {number}</h1>
      <div>
        <button
          style={{ fontSize: "10px", marginRight: "10px" }}
          onClick={increase}
        >
          Tambah
        </button>
        <button
          style={{ fontSize: "10px", marginLeft: "10px" }}
          onClick={decrease}
        >
          Kurang
        </button>

        <button
          style={{ fontSize: "10px", marginLeft: "10px" }}
          onClick={() => setShowModal(!showModal)}
        >
          Show Modal
        </button>

        {showModal && <Modal />}
      </div>
    </main>
  );
}
