import { useEffect, useState } from "react";

export default function Effect() {
  const [count, setCount] = useState(0);
  const [rupiah, setRupiah] = useState(0);

  useEffect(() => {
    setRupiah(count * 18000);
  }, [count]);

  return (
    <>
      <h1>Dollar : {count}</h1>
      <h2>Rupiah : {rupiah}</h2>
      <button onClick={() => setCount(count + 1)}>Tambah</button>
      <button onClick={() => setCount(count - 1)}>Kurang</button>
    </>
  );
}
