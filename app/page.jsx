import LikeButton from "@/like-button.jsx";

function Header({ title }) {
  return <div>{title ? title : "Default title"}</div>;
}

export default function HomePage() {
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];

  return (
    <>
      <Header title="React" />
      <Header title="A new title" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <LikeButton />
    </>
  );
}
