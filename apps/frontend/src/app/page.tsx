"use client";

export default function Home() {
  async function test() {
    try {
      const response = await fetch('http://localhost:5000')
      const data = await response.json();
      console.log(JSON.stringify(data));
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={test}>Fetcg</button>
    </main>
  )
}
