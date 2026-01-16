# Data Model: Todo In-Memory CLI

## Entities

### Task
Represents a single todo item.

| Field | Type | Required | Description | Constraints |
|-------|------|----------|-------------|-------------|
| `id` | `int` | Yes | Unique identifier | Positive integer, Auto-increment |
| `description` | `str` | Yes | The content of the task | Non-empty string |
| `status` | `TaskStatus` | Yes | Completion state | Pending or Completed |

### Enums

#### TaskStatus
- `PENDING`: Task is active.
- `COMPLETED`: Task is done.

## Validation Rules
- **Description**: Must not be empty or whitespace only.
- **ID**: Must be unique within the current session.

## State Transitions
- **Create**: `New Task` -> `PENDING`
- **Complete**: `PENDING` -> `COMPLETED`
- **Reopen**: `COMPLETED` -> `PENDING`
- **Delete**: Any -> `Removed` (Gone)
