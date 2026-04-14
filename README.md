# Resume Parsing & Job Matching System (Rule-Based)
## Overview
This project implements a rule-based Resume Parsing and Job Matching System without using any LLMs or generative AI.

It extracts structured information from:

Resumes
Job Descriptions (JDs)

And computes a matching score based on skill overlap.

## Important Constraint
This project strictly follows the rule:

❌ No use of:

OpenAI / ChatGPT APIs
Google Gemini
Anthropic Claude
Any AI-based parsing service

✅ Only used:

Regex
Rule-based parsing
String matching

## Features
Extracts:

Name
Skills
Years of Experience

## Job Description Parsing
Extracts:

Salary (e.g., 12 LPA, ₹10,00,000)
Years of Experience (or detects Fresher)
Required Skills
Optional Skills
About Role (summary)

## Skill Matching
Compares JD skills with resume skills
Marks each skill as present or not

## Matching Score
Formula used:

Matching Score = (Matched JD Skills / Total JD Skills) × 100


## Project Structure
mini_ats/ │── backend/ │ ├── src/ │ │ ├── config/ │ │ ├── parser/ │ │ ├── matcher/ │ │ ├── server.js │ │ └── ... │ ├── package.json │ └── .env │ │── .github/workflows/ │ └── node.yml │ │── README.md


## Setup Instructions

### 1. Clone Repository
git clone https://github.com/your-username/mini_ats.git cd mini_ats/backend

### 2. Install Dependencies
npm install

### 3. Setup Environment Variables
Create a .env file inside backend/:
PORT=5000
MONGO_URI=your_mongodb_connection_string

### 4. Run the Server
npm run dev
Server runs on:
http://localhost:5000

### 5. Run CI (Github Actions)
Add MONGO_URI in repository secrets
Push code → CI runs automatically

## Input Example
### Resume (simplified)
John Doe
Skills: Java, Spring Boot, MySQL
Experience: 3 years
### Job Description
Role: Backend Developer
Required Skills: Java, Spring Boot, Kafka
Optional Skills: Docker
Salary: 12 LPA
Experience: 2+ years

## Sample Output JSON
{ "name": "John Doe", "salary": "12 LPA", "yearOfExperience": 3, "resumeSkills": ["Java", "Spring Boot", "MySQL"], "matchingJobs": [ { "jobId": "JD001", "role": "Backend Developer", "aboutRole": "Responsible for backend development.", "skillsAnalysis": [ { "skill": "Java", "presentInResume": true }, { "skill": "Spring Boot", "presentInResume": true }, { "skill": "Kafka", "presentInResume": false } ], "matchingScore": 66.67 } ] }

### Matching Logic Example
JD Skills: 3
Matched: 2
Score = (2 / 3) × 100 = 66.67

### Key Design Decisions
Used predefined skill dictionary for consistent extraction
Applied case-insensitive matching
Used regex patterns for salary and experience
Modular structure:
!.Parser
2.Matcher
3.Config

### Limitations
Skill extraction depends on predefined list
Complex resume formats (PDF layouts) may require preprocessing
Experience calculation from dates is basic