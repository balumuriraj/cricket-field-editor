import Container from "./components/Container";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen w-full h-full">
      <h1 className="">Title</h1>
      <main className="flex flex-1  relative justify-center items-center w-full h-full">
        <Container />
      </main>
    </div>
  );
}
