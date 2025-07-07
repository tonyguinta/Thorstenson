# Troubleshooting Guide

## Common Issues & Solutions

### Trailing Slash API Issue (HTTPS/HTTP Mixed Content)

**Problem**: Adding trailing slashes to certain API endpoints causes server redirects from HTTPS to HTTP in production, resulting in mixed content errors.

**Root Cause**: Server configuration redirects `/projects/{id}/` to `/projects/{id}` using HTTP instead of HTTPS.

**Solution**: Remove trailing slashes from these specific endpoints:
- `projectsApi.getById`: Use `/projects/${id}` not `/projects/${id}/`
- `subprojectsApi.getById`: Use `/subprojects/${id}` not `/subprojects/${id}/`

**Fix Applied**: 
- Commit 01e03ea (original fix)
- Commit e9e83f2 (reapplied after reintroduction)

**Prevention**: When adding new API endpoints, avoid trailing slashes on resource-specific GET requests. Use trailing slashes only for collection endpoints (e.g., `/projects/`, `/clients/`).

### Vercel Secret Reference Error

**Problem**: Vercel deployment fails with error: `Environment Variable "VITE_API_URL" references Secret "vite_api_url", which does not exist.`

**Root Cause**: Invalid `vercel.json` configuration contains `build.env` section referencing non-existent secrets using `@secret_name` syntax.

**Example of problematic `vercel.json`:**
```json
{
  "build": {
    "env": {
      "VITE_API_URL": "@vite_api_url"
    }
  }
}
```

**Solution**: Remove the `build.env` section from `vercel.json` and rely on environment variables set through Vercel dashboard instead.

**Correct `vercel.json`:**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Environment variables should be set via:**
- Vercel Dashboard → Settings → Environment Variables
- Not hardcoded in `vercel.json` with secret references

**Fix Applied**: 
- Commit 2950034 (removed invalid secret reference from vercel.json)
- This issue occurred in both production and staging setups

**Prevention**: Don't use `@secret_name` syntax in `vercel.json` unless the secret actually exists. Use Vercel dashboard for environment variable management instead.

## Migration Issues & Solutions

**Issue: Alembic not installed during Railway deployment**
- **Cause**: Railway was using root `requirements.txt` instead of `backend/requirements.txt`
- **Solution**: Add alembic to root `requirements.txt` file (Railway auto-detects this file)
- **Lesson**: Check which requirements.txt file Railway actually uses for pip install

**Issue: Migration files with duplicate dependencies**
- **Cause**: Multiple migration files or incorrect `down_revision` references
- **Solution**: Keep only one migration file per feature, ensure proper dependency chain
- **Fix**: Set `down_revision = None` for base migrations, delete duplicate files

**Issue: Migration marked as applied but not executed**
- **Cause**: Using `alembic stamp head` instead of `alembic upgrade head`
- **Solution**: 
  1. Delete record from `alembic_version` table manually if needed
  2. Use `alembic upgrade head` to actually execute the migration
- **Debugging**: Check alembic_version table to see current migration state

**Issue: Index already exists errors in auto-generated migrations**
- **Cause**: Alembic auto-generates index creation for existing indexes
- **Solution**: Remove index creation/deletion commands from migration files
- **Prevention**: Review auto-generated migrations carefully before committing

**Railway Deployment Requirements:**
- **Alembic must be in root requirements.txt** (not just backend/requirements.txt)
- **Use full PATH in railway.toml**: `PATH=/opt/venv/bin:$PATH alembic upgrade head`
- **Railway startup command runs in container root**, so `cd backend` is required
- **Migration runs before server starts**, ensuring schema is updated before app launch

## Database Issues

### Database Schema Management
**CRITICAL: Always maintain database-model consistency**
- When adding database columns via SQLAlchemy models, plan rollback strategy first
- If reverting model changes, ALWAYS revert database schema simultaneously
- Test database changes in isolation before deploying
- Document any manual schema changes needed for deployment

**Schema Change Process:**
1. Add/modify SQLAlchemy models
2. Test locally with fresh database
3. Deploy to staging and verify schema consistency
4. Test staging thoroughly before production
5. If reverting: remove columns from database AND models together

### Database Recovery Procedures
If database schema becomes inconsistent with models:
1. Identify orphaned columns in database logs
2. Create one-time cleanup script to remove orphaned columns
3. Integrate cleanup into deployment startup (run once)
4. Verify environment health after cleanup
5. Remove cleanup scripts from startup commands

**Example cleanup pattern:**
```python
# One-time database cleanup script
def cleanup_database():
    with engine.connect() as conn:
        conn.execute(text("ALTER TABLE projects DROP COLUMN IF EXISTS orphaned_column;"))
        conn.commit()
```

## Development Issues

### Error Diagnosis Best Practices
- **Backend 500 errors can appear as CORS issues in frontend**
- Always check backend logs first when frontend shows CORS errors
- Database connection errors often manifest as CORS-like symptoms
- Verify backend health endpoints before investigating frontend networking

### Deployment Pipeline Discipline
**NEVER skip the staging test step**
1. **Local** → Test all changes locally first
2. **Staging** → Deploy and test thoroughly in staging environment
3. **Production** → Only deploy after staging verification

**When user says "pause" or "test first" - ACTUALLY PAUSE**
- Don't implement new features without explicit approval
- Don't merge to production without staging verification
- Don't deploy to both environments simultaneously

## Railway CLI Commands (Production Debugging)

For comprehensive Railway CLI commands, see [RAILWAY_CLI_REFERENCE.md](RAILWAY_CLI_REFERENCE.md).

**Quick Database Debugging:**
```bash
# Railway debugging commands
railway logs --deployment          # Check for migration errors
railway variables                  # Verify DATABASE_URL and other env vars
railway connect                    # Connect to PostgreSQL shell
railway redeploy                   # Force redeploy if needed

# In PostgreSQL shell (via railway connect):
\d projects                        # Check table structure
\d company_settings                # Check company settings table
SELECT * FROM alembic_version;     # Check current migration state
DELETE FROM alembic_version WHERE version_num = 'revision_id';  # Reset migration state if needed
```