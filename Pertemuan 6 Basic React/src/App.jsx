export default function App() {
  const name = "Reksa Ariansyah";
  const age = 17;

  const date = new Date();
  let greeting;

  const currentTime = date.getHours();

  const customStyle = {
    color: "",
  };

  if (currentTime < 12) {
    greeting = "Good morning";
    customStyle.color = "red";
  } else if (currentTime < 18) {
    greeting = "Good afternoon";
    customStyle.color = "orange";
  } else {
    greeting = "Good night";
    customStyle.color = "blue";
  }

  const books = [
    {
      title: "Project Hail Mary",
      author: "Andy Weir",
      image:
        "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1764703833i/54493401.jpg",
    },
    {
      title: "Dune",
      author: "Frank Herbert",
      image:
        "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg",
    },
    {
      title: "The Martian",
      author: "Andy Weir",
      image:
        "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1413706054i/18007564.jpg",
    },
    {
      title: "The Silent Parade",
      author: "Keigo Higashino",
      image:
        "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1618689060i/56269004.jpg",
    },
  ];

  function show() {
    alert(`Halo nama saya ${name}, umur saya ${age} tahun`);
  }

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <h1 className="heading">Perkenalan diri</h1>
        <h1 style={customStyle}>{greeting}</h1>
      </div>
      <h2>Halo Saya {name}</h2>
      <h2>Umur Saya {age} tahun</h2>
      <h3>Book Favorite</h3>
      <ul>
        {books.map((b) => {
          return (
            <div key={b.title}>
              <img src={b.image} alt="" width={150} height={200} />

              <li>
                {b.title} by {b.author}
              </li>
            </div>
          );
        })}
      </ul>

      {age < 18 ? <p>Anda belum cukup umur</p> : <p>Anda sudah cukup umur</p>}

      <button onClick={show}> Info lengkap</button>
    </>
  );
}
