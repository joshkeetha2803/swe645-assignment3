#Team Members: Joshitha Keetha (G01575681) & Bhuvitha Tummala (G01576792)
#Course: SWE 645
#Purpose: Defines the container environment and build steps for the FastAPI backend.

FROM python:3.10-slim

# Setting the working directory inside the container to /app

WORKDIR /app
COPY requirements.txt .

# Installing the Python dependencies without caching to save space

RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# Exposing port 8000 for the backend API access

EXPOSE 8000

# Command to start the FastAPI server when the container runs

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]