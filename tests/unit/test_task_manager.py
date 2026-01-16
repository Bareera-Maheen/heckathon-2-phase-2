import pytest
from src.services.task_manager import TaskManager
from src.models.task import TaskStatus

def test_add_task():
    manager = TaskManager()
    task = manager.add_task("Buy milk")
    assert task.id == 1
    assert task.description == "Buy milk"
    assert task.status == TaskStatus.PENDING
    assert len(manager.tasks) == 1
    
    task2 = manager.add_task("Walk dog")
    assert task2.id == 2
    assert len(manager.tasks) == 2

def test_get_all_tasks():
    manager = TaskManager()
    manager.add_task("Task 1")
    manager.add_task("Task 2")
    tasks = manager.get_all_tasks()
    assert len(tasks) == 2
    assert tasks[0].description == "Task 1"
    assert tasks[1].description == "Task 2"

def test_complete_task():
    manager = TaskManager()
    task = manager.add_task("Buy milk")
    manager.complete_task(task.id)
    assert task.status == TaskStatus.COMPLETED

def test_reopen_task():
    manager = TaskManager()
    task = manager.add_task("Buy milk")
    manager.complete_task(task.id)
    manager.reopen_task(task.id)
    assert task.status == TaskStatus.PENDING

def test_complete_task_not_found():
    manager = TaskManager()
    with pytest.raises(ValueError, match="Task 999 not found"):
        manager.complete_task(999)

def test_update_task():
    manager = TaskManager()
    task = manager.add_task("Buy milk")
    manager.update_task(task.id, "Buy almond milk")
    assert task.description == "Buy almond milk"

def test_delete_task():
    manager = TaskManager()
    task = manager.add_task("Buy milk")
    manager.delete_task(task.id)
    assert len(manager.tasks) == 0
    with pytest.raises(ValueError):
        manager.complete_task(task.id)
