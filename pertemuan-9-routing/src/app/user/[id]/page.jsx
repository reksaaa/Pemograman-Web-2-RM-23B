export default async function SingleUser({ params }) {
  const data = await params;
  return (
    <div>
      <h1>Ini adalah halaman user dengan id : {data.id}</h1>
    </div>
  );
}
