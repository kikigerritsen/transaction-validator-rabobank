async function getData() {
  const res = await fetch("http://localhost:1337/");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <main>{data.message}</main>;
}
