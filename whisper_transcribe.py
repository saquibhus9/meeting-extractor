# whisper_transcribe.py
import whisper

def transcribe_audio(audio_path):
    model = whisper.load_model("base")  # or 'small', 'medium', 'large'
    result = model.transcribe(audio_path)
    return result['text']
if __name__ == "__main__":
    text = transcribe_audio("ample_meeting.mp3")
    print(text)
