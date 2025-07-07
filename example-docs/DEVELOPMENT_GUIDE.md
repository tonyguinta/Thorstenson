# Development Guide

## Development Commands

### Quick Start
```bash
# Automated setup
python3 setup.py

# Start backend server (includes hot reload)
python3 run.py

# Start frontend (in separate terminal)
cd frontend
npm run dev
```

### Manual Setup
```bash
# Backend
cd backend
python3 -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Frontend
cd frontend
npm install
npm run dev
```

### Development Commands
```bash
# Frontend
npm run build          # TypeScript compilation + Vite build
npm run lint           # ESLint checking
npm run lint:strict    # ESLint with zero warnings
npm run lint:fix       # Auto-fix ESLint issues
npm run type-check     # TypeScript type checking
npm run test           # Run tests in watch mode (development)
npm run test:run       # Run tests once (CI/production)
npm run test:ui        # Run tests with UI dashboard
npm run test:coverage  # Run tests with coverage report
npm run pre-commit     # Type check + lint + test (used in git hooks)

# Feature-specific tests
npm test -- discount-reason-core.test.tsx  # Run discount reason tests (11 tests)
npm test -- markup-inheritance.test.tsx    # Run markup system tests (9 tests)

# Backend
# Run with hot reload using uvicorn directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Database testing (from backend directory)
python3 -c "from app.db.database import engine; from app.models.models import Base; Base.metadata.create_all(bind=engine); print('Database connection successful')"
```

**IMPORTANT**: Always use `python3` instead of `python` on this system. The `python` command is not available.

**IMPORTANT**: Do NOT start backend/frontend servers via tools to avoid port conflicts. The user prefers to restart servers manually when needed. Simply request restart when required.

**VIRTUAL ENVIRONMENT**: Always use the virtual environment for Python package management:
```bash
# CORRECT: Use venv/bin/pip directly (after ensuring pip is installed)
venv/bin/pip install package_name
venv/bin/pip uninstall package_name

# ALTERNATIVE: Use python -m pip if venv/bin/pip doesn't exist  
venv/bin/python -m pip install package_name

# INCORRECT: Don't use system pip or source activation for pip commands
pip install package_name  # Wrong - uses system pip
source venv/bin/activate && pip install package_name  # Unreliable activation
```

**Virtual Environment Setup Issue**: If `venv/bin/pip` doesn't exist, run:
```bash
venv/bin/python -m ensurepip --upgrade
venv/bin/python -m pip install --upgrade pip
```

## Naming Conventions

### Backend Naming (Python)
- **Variables/Functions**: `snake_case` - `current_user`, `create_client()`, `project_count`
- **Classes**: `PascalCase` - `User`, `Client`, `Project`, `MaterialEntry`
- **Models**: Singular nouns - `User`, `Client`, `Project` (tables auto-pluralized)
- **Foreign Keys**: `owner_id`, `client_id`, `project_id`, `subproject_id`
- **Relationships**: `owner`, `client`, `projects`, `tasks`
- **Constants**: `UPPER_SNAKE_CASE` - `PROJECT_STATUS_COMPLETED`, `DEFAULT_PAGE_SIZE`

### Frontend Naming (TypeScript/React)
- **Variables/Functions**: `camelCase` - `clientList`, `handleSubmit`, `isLoading`
- **Components**: `PascalCase` - `Dashboard`, `ClientModal`, `LoadingSpinner`
- **Interfaces**: `PascalCase` - `ClientFormProps`, `ApiResponse<T>`
- **Files**: `PascalCase.tsx` - `Dashboard.tsx`, `ClientModal.tsx`

### API Naming
- **Endpoints**: Plural nouns with RESTful patterns
  - `/clients/`, `/projects/`, `/subprojects/`
  - `GET /clients/`, `POST /clients/`, `PUT /clients/{id}`
  - Nested: `/projects/{id}/subprojects/`, `/subprojects/{id}/materials/`

### Database Naming
- **Tables**: Automatically pluralized - `users`, `clients`, `projects`, `material_entries`
- **Columns**: `snake_case` - `full_name`, `company_name`, `created_at`
- **Booleans**: `is_active`, `is_completed`, `is_tax_exempt`
- **Timestamps**: `created_at`, `updated_at`, `due_date`

### Schema Naming (Pydantic)
- **Pattern**: Base + Action - `ClientCreate`, `ClientUpdate`, `ClientResponse`
- **Descriptive**: `ProjectDetail`, `InvoiceList`, `UserProfile`
- **Requests**: `LoginRequest`, `RegisterRequest`
- **Responses**: `TokenResponse`, `UserResponse`

## API Development Patterns

### Standard Route Pattern
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.deps import get_db, get_current_user
from app.models.models import User, Client
from app.schemas.schemas import ClientCreate, ClientResponse

router = APIRouter()

@router.post("/clients/", response_model=ClientResponse)
def create_client(
    client: ClientCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Validate user ownership and business logic
    new_client = Client(**client.dict(), owner_id=current_user.id)
    db.add(new_client)
    db.commit()
    db.refresh(new_client)
    return new_client

@router.get("/clients/", response_model=List[ClientResponse])
def get_clients(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Client).filter(Client.owner_id == current_user.id).all()
```

### Error Handling
```python
# Use HTTPException for API errors
if not client:
    raise HTTPException(status_code=404, detail="Client not found")

# Validate ownership
if client.owner_id != current_user.id:
    raise HTTPException(status_code=403, detail="Access denied")
```

## Frontend Development Patterns

### Standard Component Pattern
```tsx
import { useState, useEffect } from 'react'
import { LoadingSpinner } from '../components/LoadingSpinner'

interface Props {
  // Define props with TypeScript interfaces
}

const ComponentName = ({ prop1, prop2 }: Props) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await clientsApi.getAll()
        setData(response.data)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Page Title</h1>
      <button className="btn-accent">Call to Action</button>
    </div>
  )
}

export default ComponentName
```

### API Integration Pattern
```tsx
// In src/api/client.ts
export const clientsApi = {
  getAll: () => api.get('/clients/'),
  getById: (id: number) => api.get(`/clients/${id}`),
  create: (data: ClientCreate) => api.post('/clients/', data),
  update: (id: number, data: ClientUpdate) => api.put(`/clients/${id}`, data),
  delete: (id: number) => api.delete(`/clients/${id}`)
}
```

### Cost Calculation Pattern with Debouncing
```tsx
const useCostCalculations = (items) => {
  const [totalCost, setTotalCost] = useState(0)
  
  // Debounced calculation (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      const total = items.reduce((sum, item) => {
        return sum + (parseFloat(item.quantity || 0) * parseFloat(item.unit_cost || 0))
      }, 0)
      setTotalCost(total)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [items])
  
  return { totalCost }
}
```

### Schema Patterns
```python
class ClientCreate(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class ClientResponse(BaseModel):
    id: int
    name: str
    email: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True  # Updated for Pydantic v2
```

## Development Best Practices

### Do These Things
- **Right-align all numeric columns** in tables (currency, quantities, calculations)
- Use **TanStack Table** for complex editable data tables
- Use **React Hook Form** for form validation and state management
- Apply **300ms debouncing** for real-time cost calculations
- Implement **proper loading states** and error boundaries
- Use **TypeScript interfaces** for all props and data structures
- Follow **BuildCraftPro design system** consistently
- Include `id`, `created_at` fields in all database models
- Use **proper foreign key relationships** with cascade deletes
- Validate **user ownership** in all API endpoints
- Use **HTTPException** for API errors with appropriate status codes

### Avoid These Patterns
```python
# Bad: Unclear abbreviations
def get_cli(): pass
def create_proj(): pass

# Bad: Non-descriptive names
def process(): pass
def handle(): pass

# Good: Descriptive names
def get_client_by_id(client_id: int): pass
def create_project_with_validation(project_data: ProjectCreate): pass
```

```tsx
// Bad: Unclear component names
const Comp = () => { }
const Thing = () => { }

// Bad: Non-descriptive variables
const data = await api.get()
const result = process(input)

// Good: Clear naming
const ClientList = () => { }
const ProjectModal = () => { }
const clientsData = await clientsApi.getAll()
const calculatedTotal = calculateProjectTotal(items)
```

### File Organization Rules
- **Backend**: Single `models.py` and `schemas.py` files (split when >15 models or 500 lines)
- **Frontend**: Single `client.ts` file for all API calls
- **Components**: One component per file, named with PascalCase
- **Pages**: Match route structure, named with PascalCase

## Testing and Quality

### Current Testing Status
- **Backend**: pytest + pytest-asyncio setup complete with 62 comprehensive tests (22 demo + 36 markup + 4 other)
- **Frontend**: Vitest + React Testing Library setup complete with 61 comprehensive tests (18 demo + 43 other)

### Testing Requirements
**MANDATORY: All new code must include unit tests**
- **Backend**: pytest tests required for all new functions and API endpoints
- **Frontend**: Vitest + React Testing Library tests required for all new components and utilities
- **Test Coverage**: Aim for comprehensive coverage of business logic and edge cases
- **Test-First Approach**: Write tests alongside or before implementation

## Following Conventions
When making changes to files, first understand the file's code conventions. Mimic code style, use existing libraries and utilities, and follow existing patterns.
- NEVER assume that a given library is available, even if it is well known. Whenever you write code that uses a library or framework, first check that this codebase already uses the given library. For example, you might look at neighboring files, or check the package.json (or cargo.toml, and so on depending on the language).
- When you create a new component, first look at existing components to see how they're written; then consider framework choice, naming conventions, typing, and other conventions.
- When you edit a piece of code, first look at the code's surrounding context (especially its imports) to understand the code's choice of frameworks and libraries. Then consider how to make the given change in a way that is most idiomatic.
- Always follow security best practices. Never introduce code that exposes or logs secrets and keys. Never commit secrets or keys to the repository.

## Code Style
- IMPORTANT: DO NOT ADD ***ANY*** COMMENTS unless asked