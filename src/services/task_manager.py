from typing import List, Optional
from src.models.task import Task, TaskStatus
from src.utils.validators import validate_description

class TaskManager:
    """Manages the list of tasks."""
    
    def __init__(self):
        self.tasks: List[Task] = []
        self._counter: int = 1

    def add_task(self, description: str) -> Task:
        """Adds a new task with the given description."""
        valid_desc = validate_description(description)
        task = Task(id=self._counter, description=valid_desc)
        self.tasks.append(task)
        self._counter += 1
        return task

    def get_all_tasks(self) -> List[Task]:
        """Returns all tasks."""
        return self.tasks

    def _find_task(self, task_id: int) -> Task:
        """Helper to find a task by ID."""
        for task in self.tasks:
            if task.id == task_id:
                return task
        raise ValueError(f"Task {task_id} not found.")

    def complete_task(self, task_id: int):
        """Marks a task as completed."""
        task = self._find_task(task_id)
        task.status = TaskStatus.COMPLETED

    def reopen_task(self, task_id: int):
        """Marks a task as pending."""
        task = self._find_task(task_id)
        task.status = TaskStatus.PENDING

    def update_task(self, task_id: int, new_description: str):
        """Updates the description of a task."""
        valid_desc = validate_description(new_description)
        task = self._find_task(task_id)
        task.description = valid_desc

    def delete_task(self, task_id: int):
        """Deletes a task."""
        task = self._find_task(task_id)
        self.tasks.remove(task)