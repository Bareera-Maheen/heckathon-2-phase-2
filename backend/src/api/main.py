from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
from src.services.task_manager import TaskManager
from src.models.task import Task, TaskStatus
from src.database import get_db, engine
from src.models import sql_task

# Create Tables
sql_task.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo API", version="0.1.0")

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TaskCreate(BaseModel):
    description: str

class TaskUpdate(BaseModel):
    description: str

@app.get("/tasks", response_model=List[Task])
def get_tasks(db: Session = Depends(get_db)):
    manager = TaskManager(db)
    return manager.get_all_tasks()

@app.post("/tasks", response_model=Task, status_code=status.HTTP_201_CREATED)
def create_task(task_in: TaskCreate, db: Session = Depends(get_db)):
    manager = TaskManager(db)
    try:
        return manager.add_task(task_in.description)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/tasks/{task_id}", response_model=Task)
def get_task(task_id: int, db: Session = Depends(get_db)):
    manager = TaskManager(db)
    try:
        # We need to expose a find method or use the internal one (not ideal)
        # For now, let's just filter
        tasks = manager.get_all_tasks()
        for task in tasks:
            if task.id == task_id:
                return task
        raise ValueError("Task not found")
    except ValueError:
        raise HTTPException(status_code=404, detail="Task not found")

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task_in: TaskUpdate, db: Session = Depends(get_db)):
    manager = TaskManager(db)
    try:
        manager.update_task(task_id, task_in.description)
        return get_task(task_id, db)
    except ValueError as e:
         raise HTTPException(status_code=404, detail=str(e))

@app.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    manager = TaskManager(db)
    try:
        manager.delete_task(task_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.post("/tasks/{task_id}/complete", response_model=Task)
def complete_task(task_id: int, db: Session = Depends(get_db)):
    manager = TaskManager(db)
    try:
        manager.complete_task(task_id)
        return get_task(task_id, db)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.post("/tasks/{task_id}/reopen", response_model=Task)
def reopen_task(task_id: int, db: Session = Depends(get_db)):
    manager = TaskManager(db)
    try:
        manager.reopen_task(task_id)
        return get_task(task_id, db)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
