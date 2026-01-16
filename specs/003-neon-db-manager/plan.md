# Plan: Neon Serverless Postgres Manager

## Goal
Implement a service to manage Neon.tech database branches and connection strings for development workflows.

## Proposed Architecture
- **Service Layer (`src/services/neon_client.py`)**: Handles API communication with Neon.tech using `httpx`.
- **Model Layer (`src/models/neon.py`)**: Defines Pydantic models for Branches, Projects, and Connection Strings.
- **Utility (`src/utils/neon_config.py`)**: Manages Neon API keys and Project IDs from environment variables.

## Key Decisions
- **API over CLI**: Use the Neon REST API directly instead of `neonctl` to avoid external dependency requirements for the user.
- **Pooling by Default**: All returned connection strings will automatically target the `.pooler` endpoint.
- **Async First**: Use `httpx` for asynchronous API calls to prevent blocking the main CLI/Service flow.

## Risks & Mitigations
- **API Limits**: Implement basic error handling for rate limits.
- **Secrets Management**: Ensure `NEON_API_KEY` is never logged and only read from `.env`.
