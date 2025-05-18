import { http, HttpResponse, delay } from 'msw'
import { setupWorker } from 'msw/browser'

// Sample data
let categories = [
  { id: 1, name: 'Technology', createdAt: '2023-01-15T12:00:00Z' },
  { id: 2, name: 'Business', createdAt: '2023-01-20T14:30:00Z' },
  { id: 3, name: 'Education', createdAt: '2023-02-05T09:15:00Z' },
]

let modules = [
  { id: 1, name: 'Web Development', categoryId: 1, createdAt: '2023-03-10T11:20:00Z' },
  { id: 2, name: 'Mobile Apps', categoryId: 1, createdAt: '2023-03-15T16:45:00Z' },
  { id: 3, name: 'Marketing', categoryId: 2, createdAt: '2023-04-02T13:10:00Z' },
  { id: 4, name: 'Online Courses', categoryId: 3, createdAt: '2023-04-10T10:30:00Z' },
]

let contents = [
  { 
    id: 1, 
    title: 'React Fundamentals', 
    description: 'Learn the basics of React',
    moduleId: 1,
    status: 'active',
    createdAt: '2023-05-05T14:20:00Z' 
  },
  { 
    id: 2, 
    title: 'Flutter for Beginners', 
    description: 'Getting started with Flutter development',
    moduleId: 2,
    status: 'active',
    createdAt: '2023-05-12T11:15:00Z' 
  },
]

let todos = [
  {
    id: 1,
    title: 'Complete React Tutorial',
    description: 'Finish the React fundamentals course',
    category: 'Learning',
    tags: ['programming', 'web'],
    status: 'in_progress',
    priority: 'high',
    dueDate: '2025-05-20T00:00:00Z',
    notes: ['Started chapter 1', 'Need to review hooks'],
    createdAt: '2025-05-17T10:00:00Z',
    completedAt: null
  }
]

// API handlers
export const handlers = [
  // Existing handlers...

  // Todos API
  http.get('/api/todos', async ({ request }) => {
    await delay(500)
    const url = new URL(request.url)
    const searchTerm = url.searchParams.get('search')?.toLowerCase()
    const category = url.searchParams.get('category')
    const status = url.searchParams.get('status')
    const startDate = url.searchParams.get('startDate')
    const endDate = url.searchParams.get('endDate')
    
    let filteredTodos = [...todos]
    
    if (searchTerm) {
      filteredTodos = filteredTodos.filter(todo => 
        todo.title.toLowerCase().includes(searchTerm) ||
        todo.description.toLowerCase().includes(searchTerm) ||
        todo.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }
    
    if (category) {
      filteredTodos = filteredTodos.filter(todo => todo.category === category)
    }
    
    if (status) {
      filteredTodos = filteredTodos.filter(todo => todo.status === status)
    }
    
    if (startDate && endDate) {
      filteredTodos = filteredTodos.filter(todo => {
        const todoDate = new Date(todo.dueDate)
        return todoDate >= new Date(startDate) && todoDate <= new Date(endDate)
      })
    }
    
    return HttpResponse.json(filteredTodos)
  }),
  
  http.get('/api/todos/:id', async ({ params }) => {
    await delay(300)
    const { id } = params
    const todo = todos.find(t => t.id === Number(id))
    
    if (!todo) {
      return new HttpResponse(null, { status: 404 })
    }
    
    return HttpResponse.json(todo)
  }),
  
  http.post('/api/todos', async ({ request }) => {
    await delay(500)
    const newTodo = await request.json()
    const id = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1
    
    const createdTodo = { 
      ...newTodo, 
      id,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    
    todos.push(createdTodo)
    return HttpResponse.json(createdTodo, { status: 201 })
  }),
  
  http.put('/api/todos/:id', async ({ params, request }) => {
    await delay(500)
    const { id } = params
    const updates = await request.json()
    
    const index = todos.findIndex(t => t.id === Number(id))
    if (index === -1) {
      return new HttpResponse(null, { status: 404 })
    }
    
    // If the todo is being marked as complete
    if (updates.status === 'completed' && todos[index].status !== 'completed') {
      updates.completedAt = new Date().toISOString()
    }
    
    todos[index] = { ...todos[index], ...updates }
    return HttpResponse.json(todos[index])
  }),
  
  http.delete('/api/todos/:id', async ({ params }) => {
    await delay(500)
    const { id } = params
    
    const index = todos.findIndex(t => t.id === Number(id))
    if (index === -1) {
      return new HttpResponse(null, { status: 404 })
    }
    
    todos = todos.filter(t => t.id !== Number(id))
    return new HttpResponse(null, { status: 204 })
  }),
  
  http.post('/api/todos/:id/notes', async ({ params, request }) => {
    await delay(300)
    const { id } = params
    const { note } = await request.json()
    
    const todo = todos.find(t => t.id === Number(id))
    if (!todo) {
      return new HttpResponse(null, { status: 404 })
    }
    
    todo.notes.push(note)
    return HttpResponse.json(todo)
  })
]

// Setup MSW
export function setupMockAPI() {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    const worker = setupWorker(...handlers)
    worker.start({ onUnhandledRequest: 'bypass' })
    return worker
  }
  return null
}