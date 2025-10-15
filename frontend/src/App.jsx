import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/transcribe/", formData);
      console.log("✅ Backend response:", response.data);
      setTranscript(response.data.transcript);
      setSummary(response.data.summary);
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("Upload failed. Check backend server and console for errors.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm py-6 px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-700">🧠 AI Meeting Summarizer</h1>
          <nav className="space-x-6 text-base text-gray-600">
            <a href="#features" className="hover:text-green-600">Features</a>
            <a href="#how-it-works" className="hover:text-green-600">How It Works</a>
            <a href="#footer" className="hover:text-green-600">About</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">AI Audio Summarizer</h2>
          <p className="text-lg text-gray-600">
            Looking for a way to condense audio content effortlessly? Our free audio summarizer transforms long recordings into clear, concise summaries, making it easier than ever to grasp essential information quickly.
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-12 px-6 text-center">
        <div className="max-w-xl mx-auto border border-dashed border-gray-300 p-6 rounded-lg bg-white shadow-sm">
          <p className="text-gray-600 mb-2">Drag and drop a file to summarize</p>
          <input
            type="file"
            accept=".mp3,.wav,.mp4,.mpeg,.mpga,.m4a,.webm"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          <button
            onClick={handleUpload}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Summarize Audio
          </button>
          {loading && <p className="text-green-600 mt-3">Processing... ⏳</p>}
        </div>
      </section>

      {/* Output Section */}
      {transcript && (
        <section className="max-w-5xl mx-auto py-8 px-6">
          <h3 className="text-2xl font-bold text-green-700 mb-4">📝 Transcript</h3>
          <p className="whitespace-pre-wrap bg-gray-100 p-4 rounded text-gray-800 shadow-inner">{transcript}</p>
        </section>
      )}

      {summary && (
        <section className="max-w-5xl mx-auto py-8 px-6">
          <h3 className="text-2xl font-bold text-green-700 mb-4">📋 Summary</h3>
          <p className="whitespace-pre-wrap bg-green-50 p-4 rounded text-gray-800 shadow-inner">{summary}</p>
        </section>
      )}

      {/* Feature Highlights */}
      <section id="features" className="bg-gray-50 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h4 className="text-xl font-bold mb-2">Audio to Text Converter</h4>
            <p>Effortlessly convert audio to text with precise timestamps. Enjoy online and free usage.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h4 className="text-xl font-bold mb-2">Multiple Languages</h4>
            <p>Transform audio into text in multiple languages, promoting global accessibility and clarity.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h4 className="text-xl font-bold mb-2">Various File Formats</h4>
            <p>Easily upload MP3, MP4, WAV, WEBM, and more. Wide support for seamless transcription.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h4 className="text-xl font-bold mb-2">High Accuracy</h4>
            <p>Advanced models ensure high-quality transcripts by eliminating noise and irrelevant content.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h4 className="text-xl font-bold mb-2">Enhanced Privacy</h4>
            <p>100% local and secure—your data never leaves your device. SSL protected and private.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h4 className="text-xl font-bold mb-2">Real-Time Summarization</h4>
            <p>Generate summaries as you upload, perfect for meetings, lectures, or podcasts.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">⚙️ How It Works</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 text-lg">
            <li>Upload your audio file (.mp3, .wav, etc.).</li>
            <li>Whisper AI transcribes speech to text with timestamps.</li>
            <li>Mistral LLM summarizes the text using Ollama.</li>
            <li>Results are shown in real-time below the upload section.</li>
          </ol>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-gray-800 text-gray-300 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-lg font-bold mb-2">🧠 AI Summarizer</h5>
            <p>Your all-in-one AI tool to convert speech to text and generate meeting summaries instantly.</p>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-2">Features</h5>
            <ul className="space-y-1 text-sm">
              <li>Audio to Text</li>
              <li>Real-Time Summary</li>
              <li>Multilingual Support</li>
              <li>Secure & Private</li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-2">Resources</h5>
            <ul className="space-y-1 text-sm">
              <li>How It Works</li>
              <li>About Project</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-2">Connect</h5>
            <ul className="space-y-1 text-sm">
              <li>GitHub</li>
              <li>LinkedIn</li>
              <li>Portfolio</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-8">© 2025 AI Meeting Summarizer. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default App;
