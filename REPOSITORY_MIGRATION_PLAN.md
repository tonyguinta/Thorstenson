# Repository Separation Implementation Plan

## **Overview**
Separate the current monorepo into three focused repositories while maintaining all functionality and deployment capabilities. This plan ensures clean business separation while preserving development momentum.

## **Implementation Strategy: Phased Migration**
**Total Time**: ~2 hours  
**Risk Level**: Low (current deployment remains live during migration)  
**Rollback**: Full rollback possible at any stage

---

## **Phase 1: Create Shared Components Repository** ⏱️ *30 minutes*
**Goal**: Extract shared components foundation for future reuse between Thorstenson businesses

### **Tasks:**

#### **1A: Create thorstenson-shared-components Repository** *(10 mins)*
- [ ] Create new GitHub repository: `github.com/tonyguinta/thorstenson-shared-components`
- [ ] Initialize with README, .gitignore (Node.js template)
- [ ] Set up basic npm package structure:
  ```bash
  npm init -y
  # Update package.json name to @thorstenson/shared-components
  ```

#### **1B: Migrate Documentation and Architecture** *(15 mins)*
- [ ] Copy `/shared-components/` contents to new repository root
- [ ] Update all documentation links to reflect new repository structure
- [ ] Create initial package.json with proper scope and metadata
- [ ] Add TypeScript configuration for component development

#### **1C: Set Up Development Foundation** *(5 mins)*
- [ ] Add basic build configuration (TypeScript, ESLint)
- [ ] Create component directory structure:
  ```
  src/
  ├── booking-system/
  ├── payment-processing/
  ├── admin-dashboard/
  └── customer-management/
  ```
- [ ] Push initial commit to establish repository

### **✅ Phase 1 Success Criteria:**
- [ ] New repository created and accessible
- [ ] Documentation migrated and links updated
- [ ] Package structure ready for component development
- [ ] TypeScript and build configuration working

**Status**: ⬜ Not Started | 🚧 In Progress | ✅ Complete  
**Notes**: 

---

## **Phase 2: Extract Thorstenson Guide Repository** ⏱️ *45 minutes*
**Goal**: Create clean fishing guide business repository with full deployment capability

### **Tasks:**

#### **2A: Create thorstenson-guide Repository** *(10 mins)*
- [ ] Create new GitHub repository: `github.com/tonyguinta/thorstenson-guide`
- [ ] Initialize empty repository (no initial commits)
- [ ] Prepare for git history migration

#### **2B: Migrate Git History with Business-Specific Commits** *(25 mins)*
```bash
# Clone current repository
git clone https://github.com/tonyguinta/Thorstenson.git temp-thorstenson
cd temp-thorstenson

# Filter git history to thorstenson-guide directory only
git filter-branch --prune-empty --subdirectory-filter thorstenson-guide

# Clean up and prepare for push
git remote remove origin
git remote add origin https://github.com/tonyguinta/thorstenson-guide.git

# Push clean history
git push -u origin main
git push origin staging
```

#### **2C: Update Repository Configuration** *(10 mins)*
- [ ] Update package.json project name and repository links
- [ ] Fix any relative paths that pointed to parent directory
- [ ] Update README.md with new repository context
- [ ] Ensure all development commands work from repository root

### **✅ Phase 2 Success Criteria:**
- [ ] New repository contains only guide business code
- [ ] Git history preserved for guide-specific commits
- [ ] All development commands work correctly
- [ ] Documentation updated for standalone repository

**Status**: ⬜ Not Started | 🚧 In Progress | ✅ Complete  
**Notes**: 

---

## **Phase 3: Update Vercel Deployment** ⏱️ *30 minutes*
**Goal**: Migrate Vercel deployment to new repository without downtime

### **Tasks:**

#### **3A: Create New Vercel Project** *(15 mins)*
- [ ] Create new Vercel project connected to `thorstenson-guide` repository
- [ ] Configure build settings (auto-detected Next.js should work)
- [ ] Set up environment variables (if any)
- [ ] Deploy to staging URL first for testing

#### **3B: Test Deployment and Domain Migration** *(10 mins)*
- [ ] Verify staging deployment works correctly
- [ ] Test all pages and functionality
- [ ] Update domain `thorstenson.guide` to point to new Vercel project
- [ ] Verify production deployment successful

#### **3C: Clean Up Old Deployment** *(5 mins)*
- [ ] Remove domain from old Vercel project
- [ ] Keep old project temporarily for rollback capability
- [ ] Update any webhooks or integrations pointing to old deployment

### **✅ Phase 3 Success Criteria:**
- [ ] New Vercel project deployed successfully
- [ ] Domain migration completed without downtime
- [ ] All website functionality working correctly
- [ ] Old deployment available for rollback if needed

**Status**: ⬜ Not Started | 🚧 In Progress | ✅ Complete  
**Notes**: 

---

## **Phase 4: Repository Cleanup and Documentation** ⏱️ *15 minutes*
**Goal**: Finalize repository structure and update all documentation

### **Tasks:**

#### **4A: Update Local Development Workflow** *(5 mins)*
- [ ] Clone new thorstenson-guide repository for development
- [ ] Update local git remotes and branches
- [ ] Test development workflow with `npm run dev`

#### **4B: Update Documentation Cross-References** *(5 mins)*
- [ ] Update all README files with correct repository links
- [ ] Fix any broken links between repositories
- [ ] Update CLAUDE.md files with new repository context

#### **4C: Archive or Clean Original Repository** *(5 mins)*
- [ ] Add notice to original repository about migration
- [ ] Archive original repository or keep for reference
- [ ] Update any external links or bookmarks

### **✅ Phase 4 Success Criteria:**
- [ ] Local development workflow functional
- [ ] All documentation links working correctly
- [ ] Original repository properly archived
- [ ] Migration completely functional

**Status**: ⬜ Not Started | 🚧 In Progress | ✅ Complete  
**Notes**: 

---

## **Final Repository Structure**

### **thorstenson-guide** (Production)
```
github.com/tonyguinta/thorstenson-guide
├── src/app/                    # Next.js fishing guide website
├── src/components/             # Guide-specific components
├── CLAUDE.md                   # Guide business AI context
├── README.md                   # Guide business documentation
└── INSTAGRAM_BEHOLD_INTEGRATION.md
```

### **thorstenson-shared-components** (Component Library)
```
github.com/tonyguinta/thorstenson-shared-components
├── src/                        # Component implementations
├── docs/                       # Component documentation
├── FEATURE_PLANNING.md         # Strategic roadmap
├── BOOKING_SYSTEM_ARCHITECTURE.md
└── README.md                   # Component library overview
```

### **Original Repository** (Archived)
```
github.com/tonyguinta/Thorstenson (archived)
└── README.md                   # Migration notice and links
```

---

## **Rollback Plan**
If any issues arise during migration:

1. **Vercel Rollback**: Restore domain to original project (< 5 minutes)
2. **Development Rollback**: Continue using original repository structure
3. **Repository Cleanup**: Remove new repositories if needed
4. **Full Recovery**: Original deployment remains functional throughout process

## **Benefits After Migration**

### **Development Benefits**
- **Clean Focus**: Guide development without multi-business complexity
- **Independent Deployment**: Dedicated Vercel project for fishing guide
- **Clear Git History**: Business-specific commits in business repository
- **Future Scalability**: Ready for contracting business addition

### **Business Benefits**
- **Professional Presentation**: Clean, focused repository for client demos
- **Component Foundation**: Shared components ready for reuse
- **Strategic Flexibility**: Easy to pivot or expand business model
- **Licensing Preparation**: Clean component library for future opportunities

---

## **Migration Tracking**

### **Overall Progress**
- [ ] **Phase 1**: Create Shared Components Repository
- [ ] **Phase 2**: Extract Thorstenson Guide Repository  
- [ ] **Phase 3**: Update Vercel Deployment
- [ ] **Phase 4**: Repository Cleanup and Documentation

### **Key Decisions Made**
- ✅ Separate repositories for clean business separation
- ✅ Keep shared components under Thorstenson umbrella initially
- ✅ Preserve git history for guide business commits
- ✅ Maintain deployment uptime throughout migration

### **Post-Migration Actions**
- [ ] Update local development environment
- [ ] Test complete development workflow
- [ ] Begin Instagram integration implementation
- [ ] Plan contracting business repository creation

---

**CRITICAL SUCCESS FACTORS:**
- Maintain current deployment throughout migration
- Preserve all git history for guide business
- Test deployment thoroughly before domain migration
- Keep rollback capability at every stage

**STATUS**: 📋 Planning Phase  
**NEXT STEP**: Begin Phase 1 - Create Shared Components Repository 🚀

---

## **Migration Log**

### **Session Date**: [Date]
**Phase**: [Current Phase]  
**Status**: [Progress Update]  
**Issues Encountered**: [Any problems]  
**Resolutions**: [How issues were solved]  
**Next Steps**: [What to do next]

---

**Last Updated**: [Date]  
**Updated By**: [Name]  
**Current Status**: [Overall progress]