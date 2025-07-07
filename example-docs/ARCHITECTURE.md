# BuildCraftPro Architecture Guide

## Project Overview

BuildCraftPro is a fullstack SaaS application for general contractors to manage projects, clients, and invoices. The application features comprehensive cost tracking with subproject management, real-time calculations, and a professional construction industry design system.

**Stack:**
- Frontend: React + TypeScript + Tailwind CSS + Vite
- Backend: FastAPI + SQLAlchemy + Pydantic + SQLite
- Auth: JWT-based authentication (no OAuth)
- Key Libraries: TanStack Table, React Hook Form, Axios

## Architecture Overview

### Core Data Hierarchy
- **User** → **Clients** → **Projects** → **Subprojects** → **Cost Items**
- **Projects** contain **Tasks** and **Invoices**
- **Subprojects** contain four cost categories: Materials, Labor, Permits, Other Costs
- Real-time cost calculations cascade from items → subprojects → projects

### Backend Structure (`backend/app/`)
- `api/` - FastAPI routers by feature (auth.py, clients.py, projects.py, etc.)
- `models/models.py` - All SQLAlchemy models in single file
- `schemas/schemas.py` - All Pydantic schemas in single file  
- `core/` - Security, deps, configuration
- `db/database.py` - SQLAlchemy connection and session management

### Frontend Structure (`frontend/src/`)
- `api/client.ts` - All API calls via axios in single file
- `pages/` - Route-level components (Dashboard.tsx, Clients.tsx, etc.)
- `components/` - Reusable UI components (Layout.tsx, LoadingSpinner.tsx)
- `context/AuthContext.tsx` - JWT authentication state management

### Database Patterns
- **Local Development**: SQLite (automatically created at `backend/buildcraftpro.db`)
- **Production**: PostgreSQL on Railway with managed hosting
- All models include `id`, `created_at` fields
- Foreign key relationships: `owner_id`, `client_id`, `project_id`
- Cascade deletes for data integrity
- Proper indexing on user/project relationships

**Database Setup:**
- Development uses SQLite - no setup required, created automatically
- Production uses PostgreSQL - configured via Railway environment variables
- DATABASE_URL environment variable switches between SQLite and PostgreSQL
- Models are database-agnostic via SQLAlchemy ORM

**Database Reset:**
For development database issues, see `DATABASE_RESET_GUIDE.md` for step-by-step reset procedures.

## Database Migrations (Alembic)

This project uses Alembic for database schema migrations, providing version control for database changes.

**Migration Commands:**
```bash
# Create new migration (auto-generate from model changes)
./venv/bin/python -m alembic revision --autogenerate -m "Description of changes"

# Apply all pending migrations
./venv/bin/python -m alembic upgrade head

# Check current migration status
./venv/bin/python -m alembic current

# Check if database is up to date
./venv/bin/python -m alembic check

# Rollback to previous migration
./venv/bin/python -m alembic downgrade -1

# Rollback to specific revision
./venv/bin/python -m alembic downgrade <revision_id>

# View migration history
./venv/bin/python -m alembic history
```

**Migration Workflow:**
1. **Modify models** in `backend/app/models/models.py`
2. **Generate migration**: `alembic revision --autogenerate -m "Add new feature"`
3. **Review migration file** in `backend/alembic/versions/` for accuracy
4. **Test locally**: `alembic upgrade head` to apply changes
5. **Commit migration file** along with model changes
6. **Deploy**: Railway automatically runs `alembic upgrade head` on deployment

**Production Deployment:**
- Railway runs `alembic upgrade head` before starting the server (configured in `railway.toml` and `Procfile`)
- Migrations are applied automatically on every deployment
- Zero-downtime migrations for additive changes (new columns, tables)
- Breaking changes require coordination with application code

**Migration Best Practices:**
- Always review auto-generated migrations before committing
- Test migrations locally before deploying
- Use descriptive migration messages
- Never edit existing migration files (create new ones instead)
- Keep migrations small and focused on single changes
- Consider data migration needs for complex schema changes

**Rollback Strategy:**
- Local development: Use `alembic downgrade` commands freely
- Production: Coordinate rollbacks with application deployments
- Always test rollback procedures in staging first
- Document any manual data fixes needed for rollbacks

## Standard Model Structure

```python
class Project(Base):
    __tablename__ = "projects"
    
    # Required fields for all models
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Business fields
    title = Column(String, index=True, nullable=False)
    description = Column(Text)
    
    # Foreign key relationships
    owner_id = Column(Integer, ForeignKey("users.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    
    # Relationships (back_populates for bidirectional)
    owner = relationship("User", back_populates="projects")
    client = relationship("Client", back_populates="projects")
    subprojects = relationship("Subproject", back_populates="project", cascade="all, delete-orphan")
```

## Authentication Flow
1. User registers/logs in → receives JWT token
2. JWT stored in localStorage 
3. Axios interceptor adds JWT to all API requests
4. Backend validates JWT on protected routes via `get_current_user`
5. Frontend redirects to login if JWT invalid/expired

## Development URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000  
- API Documentation: http://localhost:8000/docs
- Demo Reset: http://localhost:3000/demo-reset (hidden admin route, 1 req/min rate limit)
- Database: SQLite file at `backend/buildcraftpro.db` (local dev only)

## Production Deployment
- Frontend: Vercel (configured via `vercel.json`)
- Backend: Railway (configured via `railway.toml` and `Procfile`)
- Database: PostgreSQL managed by Railway
- Environment variables managed via Railway dashboard