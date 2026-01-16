# Tasks: Neon Serverless Postgres Manager

## Phase 1: Setup & Models
- [ ] Create `src/models/neon.py` with `NeonBranch` and `NeonProject` models.
- [ ] Define `NeonConnectionConfig` to parse and format connection strings.

## Phase 2: Core Service Implementation
- [ ] Implement `NeonClient` in `src/services/neon_client.py`.
- [ ] Method: `list_branches(project_id: str)`.
- [ ] Method: `create_branch(project_id: str, branch_name: str, parent_id: str = None)`.
- [ ] Method: `delete_branch(project_id: str, branch_id: str)`.
- [ ] Method: `get_connection_string(project_id: str, branch_id: str)`.

## Phase 3: CLI Integration
- [ ] Add `db` command group to `src/ui/cli.py`.
- [ ] Implement `db branch create <name>` command.
- [ ] Implement `db branch list` command.

## Phase 4: Verification
- [ ] Mock tests for API calls in `tests/unit/test_neon_client.py`.
- [ ] Integration test (optional/manual) with a test API key.
