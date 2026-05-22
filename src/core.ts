
import { Database } from "bun:sqlite";


const db = new Database("database.sqlite")

db.run(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT NOT NULL
  )
`)

const querySelectItems = db.prepare("SELECT * FROM items")
const queryInsertItem = db.prepare("INSERT INTO items (title) VALUES (?)")
const queryDeleteItem = db.prepare("DELETE FROM items WHERE id = ?")
const queryUpdateItem = db.prepare("UPDATE items SET title = ? WHERE id = ?")


// class Item_ {
//   public title: string
//   constructor(title: string) {
//     this.title = title
//   }
// }

export class Item {
  constructor(
    public id: number,
    public title: string
  ) {}
}

export class TodoList {
  private items: Item[] = []

  addItem(item: Item) {
    this.items.push(item)
    queryInsertItem.run(item.title)
  }

  removeItem(id: number) {
  this.items = this.items.filter(item => item.id !== id)
  queryDeleteItem.run(id)
}

  updateItem(id: number, newTitle: string) {
  const item = this.items.find(item => item.id === id)

  if (item) {
    item.title = newTitle
    queryUpdateItem.run(newTitle, id)
  }
}

  getItems() {
    const items = querySelectItems.all()
    return items
  }

  saveToDatabase() {
    this.items.forEach(item => {
      queryInsertItem.run(item.title)
    })
  }
}

