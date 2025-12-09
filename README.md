# RideShare Driver eKYC Workflow Configuration (JSON-Based)

This repository contains a **JSON-based workflow configuration** for a RideShare-style **driver eKYC (electronic Know Your Customer)** process.

The goal of this project is to model a real-world driver onboarding flow using **low-code principles** – where the onboarding logic is driven by configuration (JSON) instead of hard-coded steps.

---

##  Overview

This workflow covers the core stages of driver verification:

1. **Phone OTP verification**
2. **Basic profile data collection** (name, DOB, email, PAN)
3. **Driving license upload**
4. **Selfie capture & verification (conceptual)**
5. **Manual review routes** for failure scenarios
6. **Final approval / exit of workflow**

All of this is defined in a single JSON file using:

- `steps` → each stage of the workflow  
- `moduleId` → which UI/functional module should handle the step  
- `inputs` → configuration for each step  
- `transitions` → how the workflow moves on success / failure

---

##  Structure

Depending on how you organized the repo, your main file will look like:

```text
.
├── rideshare_ekyc_workflow.json   # Main workflow configuration file
└── README.md
