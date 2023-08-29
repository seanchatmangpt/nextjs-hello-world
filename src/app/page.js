import Image from "next/image";

const quotes = [
  "The greatest glory in living lies not in never falling, but in rising every time we fall. -Nelson Mandela",
  "The way to get started is to quit talking and begin doing. -Walt Disney",
  "Your time is limited, don't waste it living someone else's life. -Steve Jobs",
  "Don't judge each day by the harvest you reap but by the seeds that you plant. -Robert Louis Stevenson",
  "The future belongs to those who believe in the beauty of their dreams. -Eleanor Roosevelt",
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto px-4 h-full">
        <main className="text-center mt-20">
          <h1 className="text-6xl font-bold">
            Welcome to{" "}
            <a className="text-blue-600" href="https://chiefofstaffgpt.com">
              ChiefOfStaffGPT!
            </a>
          </h1>

          <p className="mt-3 text-2xl">
            We help you manage your executive office more effectively.
          </p>

          <section className="mt-10">
            <h2 className="text-4xl font-bold">Inspirational Quotes</h2>
            <div className="mt-6 text-lg">
              {quotes.map((quote, index) => (
                <div key={index} className="my-4">
                  <q className="italic">{quote}</q>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="absolute bottom-0 w-full h-20 flex items-center justify-center">
          <a
            className="flex items-center justify-center"
            href="https://openai.com"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </footer>
      </div>
    </main>
  );
}
