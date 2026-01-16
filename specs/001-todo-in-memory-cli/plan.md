# Implementation Plan: Todo In-Memory CLI

**Branch**: `001-todo-in-memory-cli` | **Date**: 2026-01-11 | **Spec**: [specs/001-todo-in-memory-cli/spec.md](../spec.md)
**Input**: Feature specification from `specs/001-todo-in-memory-cli/spec.md`

## Summary

Phase I of the Todo In-Memory Python Console Application will deliver a functional CLI tool for managing tasks. It features a REPL loop for user interaction, in-memory list storage using Python's native structures, and core CRUD operations (Add, List, Update, Delete, Toggle Status) as defined in the functional specification. The system is ephemeral, resetting state on exit.

## Technical Context

**Language/Version**: Python 3.13+
**Primary Dependencies**: 
- Standard Library only (preferred)
- `typing` for strict type hints
- `pytest` for testing
**Storage**: In-Memory (List of Dictionaries/Objects). No persistence.
**Testing**: `pytest` for unit and integration testing.
**Target Platform**: Linux (WSL 2) / Cross-platform CLI.
**Project Type**: Single CLI application.
**Performance Goals**: Instant response (<100ms) for all operations.
**Constraints**: 
- No external database.
- No files for data storage.
- Crash-proof user input handling.
**Scale/Scope**: Single user, session-based storage.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Agentic-First**: Plan relies on AI-driven implementation tasks.
- [x] **Ephemeral CLI**: Design is strictly in-memory and CLI-based.
- [x] **Modern Python**: Specifies Python 3.13+ and type hints.
- [x] **Spec-Driven**: Implementation strictly follows `spec.md`.
- [x] **Definition of Done**: Tasks will include testing and linting.

## Project Structure

### Documentation (this feature)

```text
specs/001-todo-in-memory-cli/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── contracts/           # Phase 1 output (CLI Command Defs)
```

### Source Code (repository root)

```text
src/
├── main.py              # Entry point
├── models/
│   └── task.py          # Task entity definition
├── services/
│   └── task_manager.py  # Business logic (CRUD)
├── ui/
│   └── cli.py           # Input handling and Output formatting
└── utils/
    └── validators.py    # Input validation helpers

tests/
├── unit/
│   ├── test_task.py
│   └── test_task_manager.py
└── integration/
    └── test_cli_flow.py
```

**Structure Decision**: Modular Single-Project Structure. Separating UI (CLI), Logic (Service), and Data (Models) ensures separation of concerns and testability, adhering to Clean Code principles.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None      | N/A        | N/A                                 |
