# main.py
from whisper_transcribe import transcribe_audio
from gpt_extractor import extract_meeting_insights

def run_pipeline(audio_file):
    print("Transcribing...")
    transcript = transcribe_audio(audio_file)

    print("\nExtracting insights from transcript...")
    output = extract_meeting_insights(transcript)

    print("\n✅ Meeting Summary:")
    print(output)

if __name__ == "__main__":
    run_pipeline("ample_meeting.mp3")
