# React + Vite

##### set up and run 
# first clone the repo
git clone https://github.com/hemuk4631/dynamic-task-board-hemant71994
# go to project root
cd dynamic-task-board-hemant71994
# install the packages
npm i
# run the project
npm run dev

## Tools (libraries and packages)
   # firebase realtime db
   # tailwind css
   #  DnD Kit for drang and dorp.
   # moment for date and time formatting.
   # uuid for random unique id genaration.



## <----- real-time architecture and data flow:----->
-- I used firebase realtime database which store the task board structure like columns, tasks, taskIds and presence.
-- It renders the UI with the the inital data and handle the drag and drop interaction and syncs the state with firebase .
-- User can add, delete, update the columns from the buttons and icons provide and filling the data what they want to add.
-- User can add, delete, edit, move the tasks within or accross the columns all the functions are handled in TaskBoardProvider Context.
--  All the actions will be reflecte to the firebase db instantly on submission and ui with updated data will be re-render.
And updates are visible to all connected users instantly because because all users are connected to the 'Centralized realtie db'.
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
    "presence": {
    'usr-1': {
    userId: 'usr-1',
    online: true,
    lastSeen: '2025-09-27T10:33:05.751Z'
    },
    'usr-2': {
    userId: 'usr-2',
    online: false,
    lastSeen: '2025-10-27T10:33:05.751Z'
    },
    },
    "tasks": {
      "t1": { "id": "t1", "title": "tital1", "description": "description1", "createdAt": "2025-09-26T10:00:00Z", "updatedAt": "2025-09-26T10:00:00Z" },
      "t2": { "id": "t2", "title": "tital2", "description": "description2", "createdAt": "2025-09-26T10:05:00Z", "updatedAt": "2025-09-26T10:05:00Z" }
    },
  }
## Data flow
client user action from board----> firebase realtime db updates on cloud ---> realtieme sync pushes the change ---> auto update the data to all the clients listen to the node.


  # <------ Tradeoffs or limitations----->
  # Pros
  -- Realtime database sync.
  -- Updates in the board will reflect immedietly to all the users in realtime whithout manually refreshing the page.
  -- whenever the update will happen in firebase realtime db it will rerender the page autometically with updated data.
  -- firebase listeners keep local state consistent.
  -- adding things are so smooth.
  -- I tried to give an UI which at least workable and enabled some dark modes styles which will prevent the UI from looking weared in dark mode.
  
  # limitation
-- Performance: Firebase realtime db works well for small and medium scale but on the large scale board may cause performance issue due to full snapshot update.
-- I could not manage to do a bonus feature which allows every client to see who is currently editing and and see their edits when they are editing like live video.
I think for this it has to hit too many request at each point to look smooth frame by frame when dragging or editing.
-- I think i have to work more on these realtime techniques and also have to explore beyound the firebase db to implement the functionslies like in figma and trello which are actually too good.

-- No offline working.

