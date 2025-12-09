

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import re


MODEL_PATH = "enron_spam_nb_model.pkl"
model = joblib.load(MODEL_PATH)


def clean_text(t: str) -> str:
    t = str(t).lower()
    t = re.sub(r"http\S+|www\S+", " URL ", t)  
    t = re.sub(r"[^a-zA-Z0-9\s]", " ", t)      
    t = re.sub(r"\s+", " ", t).strip()
    return t




app = FastAPI(title="Spam Mail Detector API")


origins = [
    "http://localhost:3000",
    "http://localhost:5173", 
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "https://spamemailfrontend.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EmailRequest(BaseModel):
    subject: str
    content: str  # body of email

class EmailResponse(BaseModel):
    label: str          # "spam" or "ham"
    prob_spam: float
    prob_ham: float


@app.post("/predict", response_model=EmailResponse)
def predict_spam(email: EmailRequest):
   
    combined = (email.subject or "") + " " + (email.content or "")
    cleaned = clean_text(combined)

  
    probs = model.predict_proba([cleaned])[0]
    prob_ham = float(probs[0])
    prob_spam = float(probs[1])

    label = "spam" if prob_spam >= 0.5 else "ham"

    return EmailResponse(
        label=label,
        prob_spam=prob_spam,
        prob_ham=prob_ham,
    )
