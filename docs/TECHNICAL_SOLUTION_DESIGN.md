# Technical Solution Design

**Project Name:** "Aura" - The Intelligent Writing Partner
**Version:** 1.0 (MVP)
**Date:** October 8, 2025
**Author:** Senior AI Engineer

---

### 2.1. System Architecture Overview

The Aura system is designed as a scalable, cloud-native application with a client-server architecture. The client is a browser extension responsible for text capture and rendering, while the backend is a multi-stage microservice pipeline designed to optimize for accuracy, latency, and cost.

The data flow is as follows:
1.  **Client-Side Extension** captures user text and sends it to the API Gateway.
2.  **API Gateway** authenticates the request and routes it to the Triage Service.
3.  **Triage Service** handles common, simple errors with rule-based systems. Unresolved text is passed to the Correction Service.
4.  **Correction Service (MVP)** calls a commercial LLM API to get corrections.
5.  **Explanation Service** is triggered on-demand by the user, calling a powerful LLM with a structured prompt to generate learning content.
6.  **Data Logging Service** asynchronously captures all interactions for future analysis and model training.

### 2.2. Component Deep Dive 🔧

#### 2.2.1. Client-Side: Browser Extension

* **Platform:** Google Chrome
* **Tech Stack:** JavaScript/TypeScript, React for UI components (pop-ups, dashboard).
* **Text Capture:** Utilize `MutationObserver` API and event listeners on `contenteditable` elements and text fields to monitor changes in text content efficiently.
* **Trigger Logic:** A debounce mechanism will be implemented to send text chunks to the backend only after a user pauses typing (e.g., 1.5s delay) or completes a sentence, minimizing API calls.
* **Rendering:** Detected errors will be highlighted using custom HTML `<span>` tags injected into the DOM. Correction tooltips will be rendered as lightweight React components.
* **State Management:** Local storage will be used to cache session tokens and user settings.

#### 2.2.2. Backend Services

The backend will be built as a set of containerized microservices, managed by Kubernetes for scalability.

* **API Gateway**
    * **Technology:** AWS API Gateway or a self-hosted Nginx instance.
    * **Responsibilities:**
        * **Authentication:** Validate JWTs provided by the client.
        * **Rate Limiting:** Prevent abuse and manage costs.
        * **Request Routing:** Direct traffic to the appropriate downstream service.

* **Triage Service**
    * **Technology:** Python (FastAPI) service running a highly optimized instance of LanguageTool.
    * **Logic:** The service will maintain a set of fast, rule-based checks for high-frequency, low-complexity errors (e.g., common typos, A/An confusion, basic punctuation). It will return corrections for these and pass the remaining text to the next service. This is the primary cost and latency optimization layer.

* **Correction Service (The "Grammar Guru" - MVP)**
    * **Technology:** Python (FastAPI) service.
    * **Logic:** For the MVP, this service will act as a proxy to a commercial LLM. It will construct a prompt with the input text, instructing the model to return only the corrected version.
    * **API Choice:** We will start with a cost-effective, high-performance model like **Google's Gemini 1.5 Flash** or **Claude 3.5 Sonnet**.
    * **API Contract (Output):**
        ```json
        {
          "corrections": [
            {
              "original_text": "teh",
              "corrected_text": "the",
              "offset": 10,
              "length": 3,
              "error_type": "TYPO"
            }
          ]
        }
        ```

* **Explanation Service (The "Creative Teacher")**
    * **Technology:** Python (FastAPI) service.
    * **Logic:** This service is triggered only when a user requests an explanation. It will use a more powerful (and expensive) model like **Gemini 1.5 Pro** or **GPT-4o** to ensure high-quality, creative, and coherent explanations.
    * **Prompting Strategy:** It will use the detailed, structured JSON prompt strategy to ensure reliable, parsable output.

#### 2.2.3. Data & Persistence

* **Primary Database:**
    * **Technology:** PostgreSQL on AWS RDS.
    * **Schema:** Will store user account information, preferences, and metadata related to their interactions.
* **Interaction Logging:**
    * **Technology:** A dedicated logging service will stream interaction events (error type, suggestion accepted/rejected, user ID) to a scalable data pipeline (e.g., AWS Kinesis Firehose).
    * **Storage:** This raw data will be stored cheaply and durably in an **AWS S3** data lake. This data is the foundation of our future fine-tuning efforts and the "Data Flywheel." All personally identifiable information (PII) will be stripped before logging.

### 2.3. Security & Privacy

* **Authentication:** Client-server communication will be secured using JWTs, obtained via a standard email/password or OAuth 2.0 login flow.
* **Data in Transit:** All communication will be over HTTPS/TLS.
* **Data at Rest:** User data in the primary database will be encrypted.
* **Privacy:** All processed text and interaction logs will be anonymized and disassociated from user identities. Our privacy policy will be transparent about what data we collect and why, in compliance with GDPR and CCPA.

### 2.4. DevOps & Infrastructure

* **Infrastructure:** Deployed on AWS.
* **Containerization:** All backend services will be packaged as Docker containers.
* **Orchestration:** We will use Amazon EKS (Elastic Kubernetes Service) to manage and scale our containerized services.
* **CI/CD:** A CI/CD pipeline using GitHub Actions will be established for automated testing, building, and deploying of both the extension and backend services.