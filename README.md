# Todo In-Memory CLI

A simple, in-memory command-line todo application written in Python 3.13+.

## Prerequisites

- Python 3.13+
- [uv](https://github.com/astral-sh/uv) (Recommended for dependency management)

## Setup

1.  **Clone the repository**.
2.  **Install dependencies** using `uv`:

    ```bash
    uv venv
    uv pip install pytest pylint
    ```

    Or using standard pip:

    ```bash
    python -m venv .venv
    # Windows
    .venv\Scripts\activate
    # Linux/Mac
    source .venv/bin/activate
    
    pip install pytest pylint
    ```

## Running the Application

To start the application:

```bash
# Assuming venv is active
python src/main.py
```

## Running Tests

To run the test suite:

```bash
pytest
```

## Usage

Once the application is running, you can use the following commands:

-   `add <description>`: Add a new task.
-   `list`: View all tasks.
-   `update <id> <new_description>`: Update a task's description.
-   `delete <id>`: Delete a task.
-   `complete <id>`: Mark a task as complete.
-   `incomplete <id>`: Mark a task as pending.
-   `exit`: Exit the application.
