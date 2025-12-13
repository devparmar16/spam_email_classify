# Enron Spam Classification Model

## 📌 Overview

This project implements a **Spam Classification Model** trained on the **Enron Email Dataset**. The goal is to automatically classify emails as **Spam** or **Ham (Not Spam)** using machine learning techniques and natural language processing (NLP).

The model demonstrates an end-to-end ML pipeline including data preprocessing, feature extraction, model training, evaluation, and prediction.

---

## 🧠 Problem Statement

Email spam remains a major challenge in digital communication. This project addresses the problem by learning patterns from historical email data and predicting whether an unseen email is spam or legitimate.

---

## 📂 Dataset

* **Dataset Name:** Enron Spam Dataset
* **Source:** Enron Corporation email corpus
* **Classes:**

  * `spam`
  * `ham`

The dataset contains thousands of real-world emails labeled accordingly, making it suitable for supervised learning.

---

## ⚙️ Tech Stack

* **Language:** Python
* **Libraries & Tools:**

  * NumPy
  * Pandas
  * Scikit-learn
  * NLTK / spaCy (for NLP)
  * Matplotlib / Seaborn (for visualization)

---

## 🔄 Workflow

### 1️⃣ Data Preprocessing

* Removal of null and duplicate entries
* Lowercasing text
* Removal of punctuation and special characters
* Tokenization
* Stopword removal
* Stemming / Lemmatization

### 2️⃣ Feature Extraction

* Bag of Words (BoW) / TF-IDF Vectorization
* Conversion of text data into numerical vectors

### 3️⃣ Model Training

The following algorithms were experimented with:

* Naive Bayes
* Logistic Regression
* Support Vector Machine (SVM)

The best-performing model was selected based on evaluation metrics.

### 4️⃣ Model Evaluation

Evaluation metrics used:

* Accuracy
* Precision
* Recall
* F1-score
* Confusion Matrix

### 5️⃣ Prediction

The trained model can classify new/unseen emails as **Spam** or **Ham**.

---

## 📊 Results

* Achieved high accuracy on test data
* Naive Bayes performed particularly well for text classification
* TF-IDF features improved model performance compared to raw counts

---

## 🚀 How to Run the Project

### 🔧 Prerequisites

* Node.js & npm
* Python 3.8+
* pip

---

### 📥 Installation & Setup

#### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

---

#### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on the local development server (usually `http://localhost:5173`).

---

#### 3️⃣ Backend Setup

Open a new terminal window:

```bash
cd backend
pip install -r requirements.txt
python main.py
```

The backend server will start and load the trained spam classification model.

---

### 🔄 Application Flow

* User enters email text in the frontend UI
* Frontend sends the text to the backend API
* Backend loads the `.pkl` model and performs prediction
* Result (**Spam / Ham**) is returned and displayed in the UI

---

## 📁 Project Structure

```
├── frontend/
│   └── (frontend files for UI / testing)
│
├── backend/
│   ├── main.py              # Backend application entry point
│   ├── spam_model.pkl       # Trained spam classification model
│   └── requirements.txt     # Backend dependencies
│
└── README.md
```

---

## 🔮 Future Improvements

* Deep learning using LSTM / Transformers
* Hyperparameter tuning with GridSearchCV
* Deployment as a REST API
* Real-time email filtering integration

---

## 👨‍💻 Author

Developed as part of a machine learning project to demonstrate practical NLP and classification skills.

