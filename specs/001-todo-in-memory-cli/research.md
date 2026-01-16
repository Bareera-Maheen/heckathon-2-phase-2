# Research: Todo In-Memory CLI

**Status**: Complete
**Date**: 2026-01-11

## Decisions

### 1. CLI Loop Implementation
- **Decision**: Use a simple `while True:` loop with `input()` and `print()` from the Python standard library.
- **Rationale**: Meets the "Minimal Dependencies" and "Ephemeral CLI" constitutional requirements. `argparse` is better for one-off commands, but this is an interactive session app. `cmd` module is an option but might be overkill for this simple scope. Custom loop offers full control over the UI/UX.
- **Alternatives Considered**: 
    - `cmd` module: Good, but less flexible for custom prompting/formatting without override.
    - `click`/`typer`: External dependencies, violates "Minimal Dependencies" preference for this simple scope.

### 2. Data Structure
- **Decision**: `List[Task]` where `Task` is a Python dataclass.
- **Rationale**: `dataclass` provides type safety, clean syntax, and easy mutability for updates. List order is preserved naturally.
- **Alternatives Considered**: 
    - Dictionary `Dict[int, Task]`: O(1) lookups, but ordering for "List All" requires sorting or extra management. Since n is small (in-memory), O(n) lookup in a list is negligible.
    - Raw Dictionaries: Less type safety, harder to maintain.

### 3. ID Generation
- **Decision**: Simple counter variable in `TaskManager` service.
- **Rationale**: Sufficient for session-based lifetime. No need for UUIDs.

## Unresolved Items (Resolved)
- None. Requirements are clear and standard.
