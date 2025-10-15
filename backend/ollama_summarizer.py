import requests

def summarize_text(transcript):
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "mistral",
        "prompt": f"Summarize the following meeting transcript:\n{transcript}",
        "stream": False
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(url, headers=headers, json=payload)
    return response.json()["response"]
