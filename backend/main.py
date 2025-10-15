from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from whisper_transcriber import transcribe_audio
from ollama_summarizer import summarize_text
import tempfile

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or use your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/transcribe/")
async def transcribe(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio:
        temp_audio.write(await file.read())
        temp_path = temp_audio.name

    transcript = transcribe_audio(temp_path)
    summary = summarize_text(transcript)

    return {
        "transcript": transcript,
        "summary": summary
    }
