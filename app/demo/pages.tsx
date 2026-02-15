
export default function DemoPage() {
  const demoBookmarks = [
    { title: "Google", url: "https://google.com" },
    { title: "YouTube", url: "https://youtube.com" },
    { title: "GitHub", url: "https://github.com" },
  ];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Demo Bookmarks</h1>
      <ul className="space-y-2">
        {demoBookmarks.map((bm, i) => (
          <li key={i} className="border p-4 rounded-md">
            <a
              href={bm.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {bm.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
