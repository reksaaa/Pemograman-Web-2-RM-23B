import { contacts } from "./contact";

function Card(props) {
  return (
    <div>
      <h2 className="my-style">{props.name}</h2>
      <img src={props.img} width={200} height={200} />
      <p>{props.phone}</p>
      <p>{props.email}</p>
    </div>
  );
}

export default function App() {
  return (
    <main>
      <h1>My Contact</h1>
      {contacts.map((contact) => (
        <Card
          key={contact.name}
          name={contact.name}
          img={contact.img}
          phone={contact.phone}
          email={contact.email}
        />
      ))}
      <input id="fname" placeholder="Enter your firstname" />
    </main>
  );
}
