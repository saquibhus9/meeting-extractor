import requests

def extract_meeting_insights(transcript):
    url = "http://localhost:11434/api/generate"
    headers = {"Content-Type": "application/json"}

    payload = {
        "model": "mistral",  # You can also use "llama2", "gemma", etc. if installed
        "prompt": f"You are a helpful assistant that summarizes meeting transcripts.\n\nSummarize the key insights from this transcript:\n\n{transcript}",
        "stream": False
    }

    response = requests.post(url, headers=headers, json=payload)
    result = response.json()

    return result["response"]
