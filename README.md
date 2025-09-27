# React + Vite

## set up and run: 
-- first clone the repo: git clone https://github.com/hemuk4631/dynamic-task-board-hemant71994
-- go to project root: cd dynamic-task-board-hemant71994
-- install the packages: npm i
-- run the project: npm run dev

## <----- real-time architecture and data flow:----->
-- I used firebase realtime database which store the task board structure like columns, tasks and taskIds and it reflects the changes instantly in realtime.
-- It renders the UI with the the inital data and handle the drag and drop interaction and syncs the state with firebase.
-- User DnD Kit for drang and dorp.
-- User can add, delete, update the columns.
-- User can add, delete, edit, move the tasks within or accross the columns all the functions are handled in TaskBoardProvider Context.
### data structure
{
    "boards": {
      "board1": {
        "columns": {
          "col1": { "id": "col1", "title": "To Do", "taskIds": ["t1", "t2"] },
          "col2": { "id": "col2", "title": "In Progress", "taskIds": ["t3"] },
          "col3": { "id": "col3", "title": "Done", "taskIds": ["t4"] }
        },
        "columnOrder": ["col1", "col2", "col3"]
      }
    },
    "tasks": {
      "t1": { "id": "t1", "title": "tital1", "description": "description1", "createdAt": "2025-09-26T10:00:00Z", "updatedAt": "2025-09-26T10:00:00Z" },
      "t2": { "id": "t2", "title": "tital2", "description": "description2", "createdAt": "2025-09-26T10:05:00Z", "updatedAt": "2025-09-26T10:05:00Z" },
      "t3": { "id": "t3", "title": "tital3", "description": "description3", "createdAt": "2025-09-26T10:10:00Z", "updatedAt": "2025-09-26T10:10:00Z" },
      "t4": { "id": "t4", "title": "tital4", "description": "description4", "createdAt": "2025-09-26T10:15:00Z", "updatedAt": "2025-09-26T10:15:00Z" }
    },
    "users": {
      "user1": { "id": "user1", "name": "Hemant", "online": true },
      "user2": { "id": "user2", "name": "Vishal", "online": true },
      "user3": { "id": "user3", "name": "Rajat", "online": false }
    }
  }

  # <------ Tradeoffs or limitations----->
  # Pros
  -- Realtime database sync.
  -- firebase listeners keep local state consistent.
  -- adding things are so smooth.
  # limitation
-- Performance: Firebase realtime db works well for small and medium scale but on the large scale board may cause performance issue due to full snapshot update.
-- No offline working.
-- cross column drag and drop should be fixed.

