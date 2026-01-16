# CLI Menu Contracts

## Overview
This defines the interactive menu-driven interface for the application.

## Main Menu
The application displays the following menu on startup and after each operation:

```text
=== Todo Menu ===
1. Add Task
2. List Tasks
3. Update Task
4. Delete Task
5. Mark Complete
6. Mark Incomplete
7. Exit
=================
Select an option: 
```

## Operations

### 1. Add Task
- **Prompt**: `Enter task description: `
- **Input**: String description
- **Output Success**: "Task <id> added."
- **Output Error**: "Error: Description cannot be empty."

### 2. List Tasks
- **Input**: None (Triggered by menu selection 2)
- **Output**: Table/List of tasks: `[<status>] <id>: <description>`
    - Example: `[ ] 1: Buy milk`
    - Example: `[x] 2: Walk dog`

### 3. Update Task
- **Prompt 1**: `Enter task ID: `
- **Prompt 2**: `Enter new description: `
- **Output Success**: "Task <id> updated."
- **Output Error**: "Error: Task <id> not found." | "Error: Invalid ID format."

### 4. Delete Task
- **Prompt**: `Enter task ID: `
- **Output Success**: "Task <id> deleted."
- **Output Error**: "Error: Task <id> not found."

### 5. Mark Complete
- **Prompt**: `Enter task ID: `
- **Output Success**: "Task <id> marked as completed."
- **Output Error**: "Error: Task <id> not found."

### 6. Mark Incomplete
- **Prompt**: `Enter task ID: `
- **Output Success**: "Task <id> marked as pending."
- **Output Error**: "Error: Task <id> not found."

### 7. Exit
- **Output**: "Goodbye!" -> Program terminates.