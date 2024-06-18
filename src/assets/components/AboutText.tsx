const LexisDescription: React.FC = () => {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">About <strong>Lexis</strong></h1>
        <p className="mb-2">
          <strong>Lexis</strong> (from Greek “λέξις” - "word") is a lightweight app designed to help people learn new languages. Accepting that learning a language is largely about remembering words, Lexis aims to make this process as simple and enjoyable as possible.
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Search and translate words and phrases.</li>
          <li>Keep new words in your own dictionaries.</li>
          <li>Create a library of specified dictionaries.</li>
          <li>Discover community-created collections.</li>
          <li>Study your words and track your progress.</li>
          <li>Get awards and share your achievements.</li>
          <li>Enjoy learning on-the-go with our mobile version.</li>
          <li>Learn comfortably any time with dark mode.</li>
        </ul>
        {/* Additional space below all text */}
        <div className="my-4">
          <p><strong>Lexis</strong> was built as a student project by Michael Shalom. During development, the following technologies were used:</p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Backend:</strong> Express.js (Vite), Postgres</li>
            <li><strong>Frontend:</strong> React, Typescript, Tailwind</li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default LexisDescription;
  