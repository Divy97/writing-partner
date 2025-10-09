# Project Scope Document (PSD)

**Project Name:** "Aura" - The Intelligent Writing Partner
**Version:** 1.0 (MVP)
**Date:** October 8, 2025
**Author:** Senior AI Engineer

---

### 1.1. Project Overview

**Aura** is a browser extension designed to be an intelligent writing partner. Unlike existing tools that merely correct mistakes, Aura's core mission is to actively improve the user's English writing proficiency over time. It achieves this by providing real-time corrections, context-aware explanations, and personalized feedback, effectively acting as an ever-present writing coach integrated into the user's daily workflow.

The vision is to create a new category of tool that bridges the gap between passive correction (like Grammarly) and active learning (like Duolingo), creating a seamless "learn-while-doing" experience.

### 1.2. Problem Statement

Non-native English speakers and professionals in communication-heavy roles rely on grammar checkers to avoid errors. However, these tools create a dependency cycle; they fix the symptom (the mistake) but do not address the root cause (the gap in knowledge). Users make the same mistakes repeatedly because they never learn the underlying principles. There is a clear, unmet need for a tool that not only corrects but also educates in a non-intrusive, contextual, and personalized manner.

### 1.3. Objectives & Success Metrics 🎯

The primary objective of the MVP is to **validate the core hypothesis that users will engage with and benefit from a learn-while-doing writing tool.**

* **Objective 1: Achieve User Adoption & Habit Formation.**
    * **Metric:** Achieve 1,000 Weekly Active Users (WAU) within 3 months of public launch.
    * **Metric:** Achieve a 28-day user retention rate of 15% or higher.
* **Objective 2: Validate the Efficacy of the Learning Model.**
    * **Metric:** At least 30% of active users must voluntarily engage with a "Level 2" explanation feature more than 3 times a week.
    * **Metric:** The user acceptance rate for suggestions should be above 85%, indicating the quality of our corrections.
* **Objective 3: Establish a Baseline for the Data Flywheel.**
    * **Metric:** Successfully log and categorize 1,000,000 user interactions (corrections accepted/rejected) within the first 3 months to serve as the foundational dataset for future model fine-tuning.

### 1.4. Target Audience (MVP)

Our initial target audience is the **non-native English-speaking professional working in the technology sector.** This includes software developers, product managers, data scientists, and technical writers.

**Why this niche?**
* **High Need:** They write frequently (code comments, documentation, pull requests, emails, Slack messages).
* **High Stakes:** Clarity and precision in their writing are critical for their work.
* **Tech Savvy:** They are early adopters of new productivity tools.
* **Specific Lexicon:** Their domain-specific language provides a focused area for our models to excel.

### 1.5. Features & Functionality (In-Scope for MVP) 🚀

The MVP will deliver a browser extension (initially for Google Chrome) that includes the following core features, based on our three-level intervention model:

* **Level 1: Frictionless Correction**
    * Real-time scanning of text in web-based text fields.
    * Visual indication (e.g., underlining) of grammatical errors and typos.
    * A simple, on-hover or on-click tooltip that displays the corrected text.
    * A one-click "Accept" button to apply the correction instantly.

* **Level 2: Unobtrusive Nudge (The Learning Component)**
    * Within the correction tooltip, a secondary, subtle "Explain" or "Why?" button.
    * On-click, this button reveals a concise, AI-generated explanation of the grammatical rule.
    * The explanation will be accompanied by two contextually relevant, correct examples, also AI-generated.
    * The interaction is entirely user-initiated to avoid disrupting workflow.

* **Level 3: The Deep Dive (Asynchronous Review)**
    * A basic user dashboard accessible via the extension icon.
    * The dashboard will track and display simple statistics (e.g., number of corrections this week).
    * A personalized "Weekly Digest" email will be sent to users, summarizing their common error types and highlighting one specific area for improvement.

* **Onboarding & Settings**
    * A simple, first-time user onboarding flow explaining the three levels of interaction.
    * A settings page allowing the user to log in/out and manage their weekly digest subscription.

### 1.6. Out-of-Scope for MVP ⛔

To ensure focus and a timely launch, the following features will **not** be included in the MVP:

* **Advanced AI Features:** Context & Tone analysis, style suggestions, plagiarism detection.
* **Platform Expansion:** Support for browsers other than Chrome (e.g., Firefox, Safari), desktop applications, or mobile keyboards.
* **Full Customization:** Advanced user settings to disable specific grammar rules.
* **Collaboration Features:** Team accounts, style guides.
* **Multi-language Support:** The tool will be for English language correction only.
* **Custom Fine-Tuned Models:** The MVP will rely on commercial, off-the-shelf LLM APIs to validate the user experience before investing in our own models.

### 1.7. Assumptions & Dependencies

* **Assumption:** Users will grant the necessary permissions for the extension to read and process text from their browser.
* **Assumption:** Users will consent to the anonymous logging of their interactions (accept/reject) to improve the service.
* **Dependency:** The availability and performance of third-party LLM APIs (e.g., Google AI Platform, OpenAI).
* **Dependency:** The project is dependent on the approval and publishing timelines of the Google Chrome Web Store.