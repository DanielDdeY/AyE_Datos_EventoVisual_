/**
 * ============================================================
 * TaskFlow — Project Management System (Front-End)
 * ============================================================
 * 
 * Architecture Notes for Backend Integration:
 * - All data operations go through the DataService object
 * - Replace DataService methods with API calls (fetch/axios)
 * - Auth currently uses localStorage; replace with JWT tokens
 * - Each page renderer is isolated; easy to convert to React/Vue
 * - Mock data structure mirrors typical REST API responses
 * ============================================================
 */

// ============================================================
// 1. MOCK DATA — Replace with API endpoints
// ============================================================
const MOCK_DATA = {
  currentUser: {
    id: 'usr-1',
    name: 'Aaron Anca',
    email: 'aaron_anca@gmail.com',
    role: 'Project Manager',
    department: 'Operations',
    avatar: 'AM',
    avatarColor: '#4f46e5'
  },

  workspaces: [
    { id: 'ws-1', name: 'TaskFlow Core', description: 'Main product development workspace', icon: '🚀', members: 12, areas: ['Frontend', 'Backend', 'Mobile', 'DevOps'] },
    { id: 'ws-2', name: 'Marketing Hub', description: 'Campaign planning and content creation', icon: '📣', members: 8, areas: ['Content', 'Social Media', 'SEO', 'Analytics'] },
    { id: 'ws-3', name: 'Internal Tools', description: 'Company internal tooling and automation', icon: '⚙️', members: 5, areas: ['Automation', 'Infrastructure', 'Security'] }
  ],

  users: [
    { id: 'usr-1', name: 'Aaron Anca', email: 'aaron_anca@gmail.com', role: 'Project Manager', department: 'Operations', avatarColor: '#4f46e5', status: 'online' },
    { id: 'usr-2', name: 'Carlos Rivera', email: 'carlos@taskflow.io', role: 'Senior Developer', department: 'Engineering', avatarColor: '#0ea5e9', status: 'online' },
    { id: 'usr-3', name: 'Sofia Nakamura', email: 'sofia@taskflow.io', role: 'UI Designer', department: 'Design', avatarColor: '#ec4899', status: 'online' },
    { id: 'usr-4', name: 'Diego Fernández', email: 'diego@taskflow.io', role: 'Backend Developer', department: 'Engineering', avatarColor: '#10b981', status: 'away' },
    { id: 'usr-5', name: 'María Torres', email: 'maria@taskflow.io', role: 'HR Manager', department: 'Human Resources', avatarColor: '#f59e0b', status: 'offline' },
    { id: 'usr-6', name: 'Andrés López', email: 'andres@taskflow.io', role: 'QA Engineer', department: 'Engineering', avatarColor: '#8b5cf6', status: 'online' },
    { id: 'usr-7', name: 'Laura Chen', email: 'laura@taskflow.io', role: 'Content Strategist', department: 'Marketing', avatarColor: '#ef4444', status: 'online' },
    { id: 'usr-8', name: 'Roberto Vega', email: 'roberto@taskflow.io', role: 'DevOps Engineer', department: 'Engineering', avatarColor: '#14b8a6', status: 'away' },
    { id: 'usr-9', name: 'Isabella Ruiz', email: 'isabella@taskflow.io', role: 'UX Researcher', department: 'Design', avatarColor: '#f97316', status: 'online' },
    { id: 'usr-10', name: 'Fernando Herrera', email: 'fernando@taskflow.io', role: 'Tech Lead', department: 'Engineering', avatarColor: '#6366f1', status: 'online' },
    { id: 'usr-11', name: 'Camila Gómez', email: 'camila@taskflow.io', role: 'Social Media Manager', department: 'Marketing', avatarColor: '#d946ef', status: 'offline' },
    { id: 'usr-12', name: 'Javier Morales', email: 'javier@taskflow.io', role: 'Recruiter', department: 'Human Resources', avatarColor: '#0891b2', status: 'online' },
    { id: 'usr-13', name: 'Ana Domínguez', email: 'ana@taskflow.io', role: 'Graphic Designer', department: 'Design', avatarColor: '#059669', status: 'away' },
    { id: 'usr-14', name: 'Pablo Castillo', email: 'pablo@taskflow.io', role: 'SEO Specialist', department: 'Marketing', avatarColor: '#dc2626', status: 'online' },
    { id: 'usr-15', name: 'Lucía Méndez', email: 'lucia@taskflow.io', role: 'Operations Analyst', department: 'Operations', avatarColor: '#7c3aed', status: 'online' }
  ],

  tasks: [
    { id: 't-1', title: 'Redesign dashboard layout', description: 'Update the main dashboard with new design system components and improved data visualization.', priority: 'critical', status: 'progress', area: 'Frontend', workspace: 'ws-1', assignee: 'usr-3', dueDate: '2025-02-15', createdAt: '2025-01-20', completedAt: null },
    { id: 't-2', title: 'Implement user authentication API', description: 'Build JWT-based authentication endpoints with refresh token support.', priority: 'critical', status: 'progress', area: 'Backend', workspace: 'ws-1', assignee: 'usr-4', dueDate: '2025-02-10', createdAt: '2025-01-18', completedAt: null },
    { id: 't-3', title: 'Write unit tests for payment module', description: 'Cover all payment processing functions with comprehensive test suites.', priority: 'high', status: 'todo', area: 'Backend', workspace: 'ws-1', assignee: 'usr-6', dueDate: '2025-02-20', createdAt: '2025-01-22', completedAt: null },
    { id: 't-4', title: 'Create social media content calendar', description: 'Plan and schedule content for all platforms for Q1 2025.', priority: 'medium', status: 'progress', area: 'Social Media', workspace: 'ws-2', assignee: 'usr-11', dueDate: '2025-02-05', createdAt: '2025-01-15', completedAt: null },
    { id: 't-5', title: 'Set up CI/CD pipeline', description: 'Configure automated build, test, and deployment pipeline using GitHub Actions.', priority: 'high', status: 'review', area: 'DevOps', workspace: 'ws-1', assignee: 'usr-8', dueDate: '2025-02-08', createdAt: '2025-01-19', completedAt: null },
    { id: 't-6', title: 'Conduct user research interviews', description: 'Interview 10 users about the new onboarding flow and document findings.', priority: 'medium', status: 'completed', area: 'Frontend', workspace: 'ws-1', assignee: 'usr-9', dueDate: '2025-01-30', createdAt: '2025-01-10', completedAt: '2025-01-28' },
    { id: 't-7', title: 'Optimize database queries', description: 'Improve performance of slow-running queries in the reporting module.', priority: 'high', status: 'todo', area: 'Backend', workspace: 'ws-1', assignee: 'usr-10', dueDate: '2025-02-18', createdAt: '2025-01-25', completedAt: null },
    { id: 't-8', title: 'Design email templates', description: 'Create responsive HTML email templates for notifications and marketing.', priority: 'low', status: 'todo', area: 'Content', workspace: 'ws-2', assignee: 'usr-7', dueDate: '2025-03-01', createdAt: '2025-01-26', completedAt: null },
    { id: 't-9', title: 'Update employee handbook', description: 'Review and update company policies and procedures documentation.', priority: 'low', status: 'completed', area: 'Operations', workspace: 'ws-3', assignee: 'usr-5', dueDate: '2025-01-25', createdAt: '2025-01-05', completedAt: '2025-01-23' },
    { id: 't-10', title: 'Build notification system', description: 'Develop real-time notification system using WebSockets.', priority: 'critical', status: 'todo', area: 'Backend', workspace: 'ws-1', assignee: 'usr-2', dueDate: '2025-02-12', createdAt: '2025-01-21', completedAt: null },
    { id: 't-11', title: 'Create brand style guide', description: 'Document brand colors, typography, imagery, and usage guidelines.', priority: 'medium', status: 'completed', area: 'Content', workspace: 'ws-2', assignee: 'usr-13', dueDate: '2025-01-20', createdAt: '2025-01-02', completedAt: '2025-01-18' },
    { id: 't-12', title: 'Implement search functionality', description: 'Add full-text search across tasks, users, and workspaces with filters.', priority: 'high', status: 'progress', area: 'Frontend', workspace: 'ws-1', assignee: 'usr-2', dueDate: '2025-02-22', createdAt: '2025-01-24', completedAt: null },
    { id: 't-13', title: 'Security audit for API', description: 'Perform comprehensive security review and penetration testing.', priority: 'critical', status: 'todo', area: 'Security', workspace: 'ws-3', assignee: 'usr-8', dueDate: '2025-02-05', createdAt: '2025-01-15', completedAt: null },
    { id: 't-14', title: 'Onboarding flow redesign', description: 'Redesign the new user onboarding experience based on research findings.', priority: 'high', status: 'todo', area: 'Frontend', workspace: 'ws-1', assignee: 'usr-3', dueDate: '2025-02-25', createdAt: '2025-01-28', completedAt: null },
    { id: 't-15', title: 'SEO performance report', description: 'Analyze organic search performance and create recommendations report.', priority: 'medium', status: 'completed', area: 'SEO', workspace: 'ws-2', assignee: 'usr-14', dueDate: '2025-01-31', createdAt: '2025-01-12', completedAt: '2025-01-29' },
    { id: 't-16', title: 'Automate deployment scripts', description: 'Create shell scripts for automated deployment to staging and production.', priority: 'medium', status: 'completed', area: 'Automation', workspace: 'ws-3', assignee: 'usr-8', dueDate: '2025-01-22', createdAt: '2025-01-08', completedAt: '2025-01-20' },
    { id: 't-17', title: 'Mobile responsive fixes', description: 'Fix layout issues on mobile devices across all major pages.', priority: 'high', status: 'review', area: 'Mobile', workspace: 'ws-1', assignee: 'usr-2', dueDate: '2025-02-03', createdAt: '2025-01-23', completedAt: null },
    { id: 't-18', title: 'Plan team building event', description: 'Organize quarterly team building activity and coordinate logistics.', priority: 'low', status: 'todo', area: 'Operations', workspace: 'ws-3', assignee: 'usr-5', dueDate: '2025-03-15', createdAt: '2025-01-27', completedAt: null },
    { id: 't-19', title: 'Update API documentation', description: 'Review and update Swagger/OpenAPI docs for all endpoints.', priority: 'medium', status: 'progress', area: 'Backend', workspace: 'ws-1', assignee: 'usr-4', dueDate: '2025-02-14', createdAt: '2025-01-20', completedAt: null },
    { id: 't-20', title: 'Recruit senior designer', description: 'Source, interview, and onboard a new senior product designer.', priority: 'medium', status: 'progress', area: 'Operations', workspace: 'ws-3', assignee: 'usr-12', dueDate: '2025-02-28', createdAt: '2025-01-10', completedAt: null }
  ],

  departments: ['Engineering', 'Design', 'Marketing', 'Human Resources', 'Operations'],

  roles: {
    'Engineering': ['Senior Developer', 'Backend Developer', 'QA Engineer', 'DevOps Engineer', 'Tech Lead'],
    'Design': ['UI Designer', 'UX Researcher', 'Graphic Designer'],
    'Marketing': ['Content Strategist', 'Social Media Manager', 'SEO Specialist'],
    'Human Resources': ['HR Manager', 'Recruiter'],
    'Operations': ['Project Manager', 'Operations Analyst']
  }
};


// ============================================================
// 2. DATA SERVICE — Swap these methods with API calls
// ============================================================
const DataService = {
  // Auth
  login(email, password) {
    // TODO: Replace with POST /api/auth/login
    const user = MOCK_DATA.users.find(u => u.email === email);
    if (user) {
      const token = 'mock-jwt-' + Date.now();
      localStorage.setItem('tf_auth', JSON.stringify({ token, userId: user.id }));
      return { success: true, user, token };
    }
    // Fallback: allow any email with password "demo123"
    if (password === 'demo123') {
      const token = 'mock-jwt-' + Date.now();
      localStorage.setItem('tf_auth', JSON.stringify({ token, userId: MOCK_DATA.currentUser.id }));
      return { success: true, user: MOCK_DATA.currentUser, token };
    }
    return { success: false, error: 'Invalid email or password' };
  },

  register(data) {
    // TODO: Replace with POST /api/auth/register
    const newUser = {
      id: 'usr-' + Date.now(),
      name: data.name,
      email: data.email,
      role: data.role,
      department: data.department,
      avatarColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
      status: 'online'
    };
    return { success: true, user: newUser };
  },

  logout() {
    localStorage.removeItem('tf_auth');
  },

  getCurrentUser() {
    // TODO: Replace with GET /api/auth/me
    return MOCK_DATA.currentUser;
  },

  // Tasks
  getTasks(filters = {}) {
    // TODO: Replace with GET /api/tasks?filters...
    let tasks = [...MOCK_DATA.tasks];
    if (filters.status) tasks = tasks.filter(t => t.status === filters.status);
    if (filters.priority) tasks = tasks.filter(t => t.priority === filters.priority);
    if (filters.area) tasks = tasks.filter(t => t.area === filters.area);
    if (filters.assignee) tasks = tasks.filter(t => t.assignee === filters.assignee);
    if (filters.workspace) tasks = tasks.filter(t => t.workspace === filters.workspace);
    if (filters.search) {
      const s = filters.search.toLowerCase();
      tasks = tasks.filter(t => t.title.toLowerCase().includes(s) || t.description.toLowerCase().includes(s));
    }
    return tasks;
  },

  getTaskById(id) {
    // TODO: Replace with GET /api/tasks/:id
    return MOCK_DATA.tasks.find(t => t.id === id);
  },

  createTask(data) {
    // TODO: Replace with POST /api/tasks
    const task = { id: 't-' + Date.now(), ...data, createdAt: new Date().toISOString().split('T')[0], completedAt: null };
    MOCK_DATA.tasks.push(task);
    return { success: true, task };
  },

  updateTask(id, data) {
    // TODO: Replace with PUT /api/tasks/:id
    const idx = MOCK_DATA.tasks.findIndex(t => t.id === id);
    if (idx >= 0) {
      MOCK_DATA.tasks[idx] = { ...MOCK_DATA.tasks[idx], ...data };
      return { success: true, task: MOCK_DATA.tasks[idx] };
    }
    return { success: false };
  },

  deleteTask(id) {
    // TODO: Replace with DELETE /api/tasks/:id
    MOCK_DATA.tasks = MOCK_DATA.tasks.filter(t => t.id !== id);
    return { success: true };
  },

  // Users
  getUsers(filters = {}) {
    // TODO: Replace with GET /api/users?filters...
    let users = [...MOCK_DATA.users];
    if (filters.department) users = users.filter(u => u.department === filters.department);
    if (filters.role) users = users.filter(u => u.role === filters.role);
    if (filters.search) {
      const s = filters.search.toLowerCase();
      users = users.filter(u => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s));
    }
    return users;
  },

  getUserById(id) {
    // TODO: Replace with GET /api/users/:id
    return MOCK_DATA.users.find(u => u.id === id);
  },

  // Workspaces
  getWorkspaces() {
    // TODO: Replace with GET /api/workspaces
    return MOCK_DATA.workspaces;
  },

  getWorkspaceById(id) {
    // TODO: Replace with GET /api/workspaces/:id
    return MOCK_DATA.workspaces.find(w => w.id === id);
  },

  getDepartments() {
    return MOCK_DATA.departments;
  },

  getRoles(department) {
    return department ? (MOCK_DATA.roles[department] || []) : MOCK_DATA.roles;
  },

  getAllAreas() {
    const areas = new Set();
    MOCK_DATA.workspaces.forEach(w => w.areas.forEach(a => areas.add(a)));
    return [...areas].sort();
  }
};


// ============================================================
// 3. STATE MANAGEMENT
// ============================================================
const State = {
  currentPage: 'dashboard',
  sidebarOpen: false,
  sidebarCollapsed: false,
  user: null,
  filters: {},
  taskFilters: { status: '', priority: '', area: '', search: '' },
  staffFilters: { department: '', role: '', search: '' }
};


// ============================================================
// 4. UTILITY FUNCTIONS
// ============================================================
const Utils = {
  getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  },

  formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  },

  daysUntil(dateStr) {
    if (!dateStr) return Infinity;
    const now = new Date();
    now.setHours(0,0,0,0);
    const due = new Date(dateStr + 'T00:00:00');
    return Math.ceil((due - now) / (1000 * 60 * 60 * 24));
  },

  priorityLabel(p) {
    const map = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' };
    return map[p] || p;
  },

  statusLabel(s) {
    const map = { todo: 'To Do', progress: 'In Progress', review: 'In Review', completed: 'Completed', cancelled: 'Cancelled' };
    return map[s] || s;
  },

  statusIcon(s) {
    const map = { todo: 'circle', progress: 'loader', review: 'eye', completed: 'check-circle-2', cancelled: 'x-circle' };
    return map[s] || 'circle';
  }
};


// ============================================================
// 5. TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const colors = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-amber-500'
  };
  const icons = { success: 'check-circle-2', error: 'alert-circle', info: 'info', warning: 'alert-triangle' };

  const toast = document.createElement('div');
  toast.className = `${colors[type]} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slide-right text-sm font-medium min-w-[280px]`;
  toast.innerHTML = `<i data-lucide="${icons[type]}" class="w-5 h-5 flex-shrink-0"></i><span>${message}</span>`;
  container.appendChild(toast);
  lucide.createIcons({ nodes: [toast] });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}


// ============================================================
// 6. MODAL SYSTEM
// ============================================================
function openModal(content) {
  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('modal-content');
  modal.innerHTML = content;
  overlay.classList.remove('hidden');
  overlay.classList.add('flex');
  lucide.createIcons({ nodes: [modal] });
  // Close on overlay click
  overlay.onclick = (e) => { if (e.target === overlay) closeModal(); };
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.add('hidden');
  overlay.classList.remove('flex');
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });


// ============================================================
// 7. ROUTER
// ============================================================
function navigate(page) {
  State.currentPage = page;
  renderApp();
  window.scrollTo(0, 0);
  // Close mobile sidebar on navigation
  State.sidebarOpen = false;
}

window.addEventListener('hashchange', () => {
  const page = location.hash.slice(1) || 'dashboard';
  if (!State.user && !['login', 'register'].includes(page)) {
    navigate('login');
    return;
  }
  navigate(page);
});


// ============================================================
// 8. AUTH PAGES
// ============================================================
function renderLoginPage() {
  return `
    <div class="auth-bg flex items-center justify-center p-4">
      <div class="w-full max-w-md animate-fade-in">
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 mb-4">
            <i data-lucide="layers" class="w-6 h-6 text-white"></i>
            <span class="text-white font-bold text-xl">TaskFlow</span>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">Welcome back</h1>
          <p class="text-indigo-200">Sign in to your workspace</p>
        </div>
        <div class="bg-white rounded-2xl shadow-2xl p-8">
          <form id="login-form" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input type="email" id="login-email" class="form-input" placeholder="you@company.com" value="" required>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <input type="password" id="login-password" class="form-input" placeholder="Enter your password" value="" required>
            </div>
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center gap-2 text-slate-600">
                <input type="checkbox" class="rounded border-slate-300 text-brand-600 focus:ring-brand-500" checked>
                Remember me
              </label>
              <a href="#" class="text-brand-600 hover:text-brand-700 font-medium">Forgot password?</a>
            </div>
            <button type="submit" class="btn-primary w-full py-3 text-base">Sign In</button>
            <div id="login-error" class="text-red-500 text-sm text-center hidden"></div>
          </form>
          <div class="mt-6 pt-6 border-t border-slate-100 text-center">
            <p class="text-slate-500 text-sm">Don't have an account? <a href="#" onclick="navigate('register'); return false;" class="text-brand-600 hover:text-brand-700 font-semibold">Create one</a></p>
          </div>
          <div class="mt-4 p-3 bg-indigo-50 rounded-lg text-xs text-indigo-700 text-center">
            <strong>Demo:</strong> Use any email with password <code class="bg-indigo-100 px-1.5 py-0.5 rounded font-mono">demo123</code>
          </div>
        </div>
      </div>
    </div>`;
}

function renderRegisterPage() {
  const depts = DataService.getDepartments();
  return `
    <div class="auth-bg flex items-center justify-center p-4">
      <div class="w-full max-w-md animate-fade-in">
        <div class="text-center mb-8">
          <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 mb-4">
            <i data-lucide="layers" class="w-6 h-6 text-white"></i>
            <span class="text-white font-bold text-xl">TaskFlow</span>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">Create account</h1>
          <p class="text-indigo-200">Join your team's workspace</p>
        </div>
        <div class="bg-white rounded-2xl shadow-2xl p-8">
          <form id="register-form" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <input type="text" id="reg-name" class="form-input" placeholder="John Doe" required>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <input type="email" id="reg-email" class="form-input" placeholder="you@company.com" required>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <input type="password" id="reg-password" class="form-input" placeholder="Min 8 characters" required minlength="8">
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password</label>
              <input type="password" id="reg-confirm" class="form-input" placeholder="Repeat your password" required>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Department</label>
                <select id="reg-dept" class="form-input" required>
                  <option value="">Select...</option>
                  ${depts.map(d => `<option value="${d}">${d}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">Role</label>
                <select id="reg-role" class="form-input" required>
                  <option value="">Select...</option>
                </select>
              </div>
            </div>
            <button type="submit" class="btn-primary w-full py-3 text-base">Create Account</button>
            <div id="register-error" class="text-red-500 text-sm text-center hidden"></div>
          </form>
          <div class="mt-6 pt-6 border-t border-slate-100 text-center">
            <p class="text-slate-500 text-sm">Already have an account? <a href="#" onclick="navigate('login'); return false;" class="text-brand-600 hover:text-brand-700 font-semibold">Sign in</a></p>
          </div>
        </div>
      </div>
    </div>`;
}


// ============================================================
// 9. APP LAYOUT (Sidebar + Topbar + Content)
// ============================================================
function renderAppLayout(content) {
  const user = State.user;
  const navItems = [
    { id: 'dashboard', icon: 'layout-dashboard', label: 'Dashboard' },
    { id: 'tasks', icon: 'list-checks', label: 'My Tasks' },
    { id: 'completed', icon: 'check-circle-2', label: 'Completed' },
    { id: 'workspaces', icon: 'building-2', label: 'Workspaces' },
    { id: 'staff', icon: 'users', label: 'Staff' },
  ];

  return `
    <!-- Mobile Overlay -->
    <div id="mobile-overlay" class="mobile-overlay hidden" onclick="State.sidebarOpen=false;renderApp()"></div>

    <!-- Sidebar -->
    <aside id="sidebar" class="sidebar ${State.sidebarCollapsed ? 'collapsed' : ''} ${State.sidebarOpen ? 'mobile-open' : ''} fixed left-0 top-0 h-screen bg-white border-r border-slate-200 flex flex-col z-50">
      <!-- Logo -->
      <div class="flex items-center gap-3 px-5 py-5 border-b border-slate-100">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center flex-shrink-0">
          <i data-lucide="layers" class="w-5 h-5 text-white"></i>
        </div>
        <span class="sidebar-header-text text-lg font-bold text-slate-800">TaskFlow</span>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p class="px-3 mb-2 text-[0.68rem] font-bold uppercase tracking-wider text-slate-400 sidebar-label">Main Menu</p>
        ${navItems.map(item => `
          <a href="#${item.id}" class="nav-item ${State.currentPage === item.id ? 'active' : ''}" onclick="navigate('${item.id}'); return false;">
            <i data-lucide="${item.icon}" class="w-[20px] h-[20px] flex-shrink-0"></i>
            <span class="sidebar-label">${item.label}</span>
          </a>
        `).join('')}
      </nav>

      <!-- User Section -->
      <div class="border-t border-slate-100 px-3 py-4">
        <div class="flex items-center gap-3 px-3 py-2">
          <div class="avatar" style="background:${user.avatarColor || '#4f46e5'}">${Utils.getInitials(user.name)}</div>
          <div class="sidebar-label flex-1 min-w-0">
            <p class="text-sm font-semibold text-slate-800 truncate">${user.name}</p>
            <p class="text-xs text-slate-500 truncate">${user.role}</p>
          </div>
        </div>
        <div class="flex gap-1 mt-2 sidebar-label">
          <button onclick="navigate('profile')" class="flex-1 btn-secondary text-xs py-2 px-3"><i data-lucide="user" class="w-3.5 h-3.5"></i> Profile</button>
          <button onclick="handleLogout()" class="flex-1 btn-secondary text-xs py-2 px-3 text-red-500 hover:bg-red-50 border-red-100"><i data-lucide="log-out" class="w-3.5 h-3.5"></i> Logout</button>
        </div>
      </div>
    </aside>

    <!-- Main Area -->
    <div class="transition-all duration-300 ${State.sidebarCollapsed ? 'ml-[72px]' : 'ml-[260px]'} max-md:ml-0">
      <!-- Top Bar -->
      <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200" style="height:var(--topbar-height)">
        <div class="flex items-center justify-between h-full px-4 md:px-6">
          <div class="flex items-center gap-3">
            <button onclick="toggleSidebar()" class="p-2 rounded-lg hover:bg-slate-100 transition-colors md:hidden">
              <i data-lucide="menu" class="w-5 h-5 text-slate-600"></i>
            </button>
            <button onclick="toggleCollapse()" class="p-2 rounded-lg hover:bg-slate-100 transition-colors hidden md:block">
              <i data-lucide="${State.sidebarCollapsed ? 'panel-left-open' : 'panel-left-close'}" class="w-5 h-5 text-slate-600"></i>
            </button>
            <div class="relative hidden sm:block">
              <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i>
              <input type="text" id="global-search" class="form-input pl-9 py-2 text-sm w-64" placeholder="Search tasks, people..." value="${State.taskFilters.search || ''}" onkeyup="handleGlobalSearch(event)">
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button class="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <i data-lucide="bell" class="w-5 h-5 text-slate-600"></i>
              <span class="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div class="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200">
              <div class="avatar" style="background:${user.avatarColor || '#4f46e5'}">${Utils.getInitials(user.name)}</div>
              <div>
                <p class="text-sm font-semibold text-slate-800 leading-tight">${user.name}</p>
                <p class="text-xs text-slate-500">${user.department}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4 md:p-6 lg:p-8 min-h-[calc(100vh-64px)]">
        ${content}
      </main>
    </div>`;
}


// ============================================================
// 10. PAGE RENDERERS
// ============================================================

// --- Dashboard ---
function renderDashboard() {
  const allTasks = DataService.getTasks();
  const myTasks = DataService.getTasks({ assignee: State.user.id });
  const todoCount = allTasks.filter(t => t.status === 'todo').length;
  const progressCount = allTasks.filter(t => t.status === 'progress').length;
  const completedCount = allTasks.filter(t => t.status === 'completed').length;
  const overdueTasks = allTasks.filter(t => t.status !== 'completed' && t.status !== 'cancelled' && Utils.daysUntil(t.dueDate) < 0);

  const recentTasks = [...allTasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return `
    <div class="animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-slate-900">Good ${getGreeting()}, ${State.user.name.split(' ')[0]} 👋</h1>
          <p class="text-slate-500 mt-1">Here's what's happening in your workspace today.</p>
        </div>
        <button onclick="openCreateTaskModal()" class="btn-primary"><i data-lucide="plus" class="w-4 h-4"></i> New Task</button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="card-hover bg-white rounded-xl p-5 border border-slate-200 animate-fade-in stagger-1">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-xl stat-gradient-1 flex items-center justify-center"><i data-lucide="list-todo" class="w-5 h-5 text-white"></i></div>
            <span class="text-xs font-medium text-slate-400 uppercase">Total</span>
          </div>
          <p class="text-3xl font-bold text-slate-900">${allTasks.length}</p>
          <p class="text-sm text-slate-500 mt-1">All tasks</p>
        </div>
        <div class="card-hover bg-white rounded-xl p-5 border border-slate-200 animate-fade-in stagger-2">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-xl stat-gradient-2 flex items-center justify-center"><i data-lucide="loader" class="w-5 h-5 text-white"></i></div>
            <span class="text-xs font-medium text-slate-400 uppercase">Active</span>
          </div>
          <p class="text-3xl font-bold text-slate-900">${progressCount}</p>
          <p class="text-sm text-slate-500 mt-1">In progress</p>
        </div>
        <div class="card-hover bg-white rounded-xl p-5 border border-slate-200 animate-fade-in stagger-3">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-xl stat-gradient-3 flex items-center justify-center"><i data-lucide="check-circle-2" class="w-5 h-5 text-white"></i></div>
            <span class="text-xs font-medium text-slate-400 uppercase">Done</span>
          </div>
          <p class="text-3xl font-bold text-slate-900">${completedCount}</p>
          <p class="text-sm text-slate-500 mt-1">Completed</p>
        </div>
        <div class="card-hover bg-white rounded-xl p-5 border border-slate-200 animate-fade-in stagger-4">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-xl stat-gradient-4 flex items-center justify-center"><i data-lucide="alert-triangle" class="w-5 h-5 text-white"></i></div>
            <span class="text-xs font-medium text-slate-400 uppercase">Overdue</span>
          </div>
          <p class="text-3xl font-bold text-slate-900">${overdueTasks.length}</p>
          <p class="text-sm text-slate-500 mt-1">Need attention</p>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Recent Tasks -->
        <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 class="font-bold text-slate-900">Recent Tasks</h2>
            <a href="#tasks" onclick="navigate('tasks'); return false;" class="text-sm text-brand-600 hover:text-brand-700 font-semibold">View all</a>
          </div>
          <div class="divide-y divide-slate-100">
            ${recentTasks.map(t => renderTaskRow(t)).join('')}
          </div>
        </div>

        <!-- Quick Info -->
        <div class="space-y-6">
          <!-- Priority Breakdown -->
          <div class="bg-white rounded-xl border border-slate-200 p-5">
            <h3 class="font-bold text-slate-900 mb-4">Priority Breakdown</h3>
            ${renderPriorityBars(allTasks)}
          </div>

          <!-- Overdue Alert -->
          ${overdueTasks.length > 0 ? `
          <div class="bg-red-50 border border-red-200 rounded-xl p-5">
            <div class="flex items-center gap-2 mb-2">
              <i data-lucide="alert-triangle" class="w-5 h-5 text-red-500"></i>
              <h3 class="font-bold text-red-800">Overdue Tasks</h3>
            </div>
            <p class="text-sm text-red-700 mb-3">${overdueTasks.length} task${overdueTasks.length > 1 ? 's' : ''} past their deadline</p>
            ${overdueTasks.slice(0, 3).map(t => `
              <div class="flex items-center gap-2 text-sm text-red-700 mb-1">
                <span class="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                <span class="truncate">${t.title}</span>
              </div>
            `).join('')}
          </div>` : ''}

          <!-- Workspace Quick Access -->
          <div class="bg-white rounded-xl border border-slate-200 p-5">
            <h3 class="font-bold text-slate-900 mb-4">Workspaces</h3>
            ${DataService.getWorkspaces().map(w => `
              <div class="flex items-center gap-3 py-2 cursor-pointer hover:bg-slate-50 -mx-2 px-2 rounded-lg transition-colors" onclick="navigate('workspaces')">
                <span class="text-xl">${w.icon}</span>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-slate-800 truncate">${w.name}</p>
                  <p class="text-xs text-slate-500">${w.members} members</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

function renderPriorityBars(tasks) {
  const priorities = ['critical', 'high', 'medium', 'low'];
  const colors = { critical: 'bg-red-500', high: 'bg-orange-500', medium: 'bg-amber-400', low: 'bg-green-500' };
  const total = tasks.length || 1;
  return priorities.map(p => {
    const count = tasks.filter(t => t.priority === p).length;
    const pct = Math.round((count / total) * 100);
    return `
      <div class="flex items-center gap-3 mb-3">
        <span class="text-xs font-semibold w-16 text-slate-600 capitalize">${p}</span>
        <div class="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div class="${colors[p]} h-full rounded-full transition-all duration-500" style="width:${pct}%"></div>
        </div>
        <span class="text-xs font-bold text-slate-700 w-8 text-right">${count}</span>
      </div>`;
  }).join('');
}

function renderTaskRow(task) {
  const user = DataService.getUserById(task.assignee);
  const days = Utils.daysUntil(task.dueDate);
  const isOverdue = days < 0 && task.status !== 'completed' && task.status !== 'cancelled';
  return `
    <div class="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors cursor-pointer" onclick="openTaskDetail('${task.id}')">
      <i data-lucide="${Utils.statusIcon(task.status)}" class="w-5 h-5 flex-shrink-0 ${task.status === 'completed' ? 'text-emerald-500' : task.status === 'progress' ? 'text-blue-500' : task.status === 'review' ? 'text-purple-500' : 'text-slate-400'}"></i>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-slate-800 truncate ${task.status === 'completed' ? 'line-through text-slate-400' : ''}">${task.title}</p>
        <div class="flex items-center gap-2 mt-0.5">
          <span class="badge priority-${task.priority} text-[0.65rem] py-0.5 px-2">${Utils.priorityLabel(task.priority)}</span>
          <span class="text-xs text-slate-400">${task.area}</span>
        </div>
      </div>
      <div class="text-right flex-shrink-0 hidden sm:block">
        ${user ? `<p class="text-xs text-slate-500">${user.name.split(' ')[0]}</p>` : ''}
        <p class="text-xs ${isOverdue ? 'text-red-500 font-semibold' : 'text-slate-400'}">${isOverdue ? 'Overdue' : Utils.formatDate(task.dueDate)}</p>
      </div>
    </div>`;
}


// --- My Tasks Page ---
function renderTasksPage() {
  const filters = State.taskFilters;
  const tasks = DataService.getTasks({
    ...filters,
    assignee: filters.status === 'completed' ? undefined : State.user.id,
    status: filters.status === 'completed' ? 'completed' : (filters.status || undefined)
  });

  // If no personal filter, show all assigned + unassigned
  const displayTasks = filters.status || filters.priority || filters.area || filters.search 
    ? tasks 
    : DataService.getTasks({ assignee: State.user.id, search: filters.search });

  const allAreas = DataService.getAllAreas();
  const statusTabs = [
    { id: '', label: 'All', icon: 'layers' },
    { id: 'todo', label: 'To Do', icon: 'circle' },
    { id: 'progress', label: 'In Progress', icon: 'loader' },
    { id: 'review', label: 'In Review', icon: 'eye' },
    { id: 'completed', label: 'Completed', icon: 'check-circle-2' }
  ];

  return `
    <div class="animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">My Tasks</h1>
          <p class="text-slate-500 text-sm mt-1">${displayTasks.length} task${displayTasks.length !== 1 ? 's' : ''} found</p>
        </div>
        <button onclick="openCreateTaskModal()" class="btn-primary"><i data-lucide="plus" class="w-4 h-4"></i> New Task</button>
      </div>

      <!-- Status Tabs -->
      <div class="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
        ${statusTabs.map(tab => `
          <button onclick="State.taskFilters.status='${tab.id}'; renderApp();" class="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filters.status === tab.id ? 'bg-brand-600 text-white shadow-md shadow-brand-200' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
            <i data-lucide="${tab.icon}" class="w-4 h-4"></i> ${tab.label}
          </button>
        `).join('')}
      </div>

      <!-- Filters Bar -->
      <div class="flex flex-wrap gap-3 mb-6">
        <select onchange="State.taskFilters.priority=this.value; renderApp();" class="form-input py-2 text-sm w-auto">
          <option value="">All Priorities</option>
          <option value="critical" ${filters.priority === 'critical' ? 'selected' : ''}>Critical</option>
          <option value="high" ${filters.priority === 'high' ? 'selected' : ''}>High</option>
          <option value="medium" ${filters.priority === 'medium' ? 'selected' : ''}>Medium</option>
          <option value="low" ${filters.priority === 'low' ? 'selected' : ''}>Low</option>
        </select>
        <select onchange="State.taskFilters.area=this.value; renderApp();" class="form-input py-2 text-sm w-auto">
          <option value="">All Areas</option>
          ${allAreas.map(a => `<option value="${a}" ${filters.area === a ? 'selected' : ''}>${a}</option>`).join('')}
        </select>
        <input type="text" placeholder="Search tasks..." class="form-input py-2 text-sm w-auto sm:w-48" value="${filters.search || ''}" onkeyup="State.taskFilters.search=this.value; renderApp();">
        ${(filters.priority || filters.area || filters.search || filters.status) ? `<button onclick="State.taskFilters={status:'',priority:'',area:'',search:''}; renderApp();" class="text-sm text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1"><i data-lucide="x" class="w-4 h-4"></i> Clear</button>` : ''}
      </div>

      <!-- Task List -->
      ${displayTasks.length > 0 ? `
        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
          ${displayTasks.map((t, i) => `<div class="animate-fade-in stagger-${Math.min(i+1, 6)}">${renderTaskRow(t)}</div>`).join('')}
        </div>
      ` : `
        <div class="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <i data-lucide="inbox" class="w-12 h-12 text-slate-300 mx-auto mb-3"></i>
          <p class="text-slate-500 font-medium">No tasks found</p>
          <p class="text-sm text-slate-400 mt-1">Try adjusting your filters or create a new task</p>
        </div>
      `}
    </div>`;
}


// --- Completed Tasks Page ---
function renderCompletedPage() {
  const completed = DataService.getTasks({ status: 'completed' }).sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

  return `
    <div class="animate-fade-in">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-slate-900">Completed Tasks</h1>
        <p class="text-slate-500 text-sm mt-1">${completed.length} tasks completed</p>
      </div>

      ${completed.length > 0 ? `
        <div class="space-y-3">
          ${completed.map((t, i) => {
            const user = DataService.getUserById(t.assignee);
            return `
            <div class="card-hover bg-white rounded-xl border border-slate-200 p-4 animate-fade-in stagger-${Math.min(i+1, 6)}" onclick="openTaskDetail('${t.id}')">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i data-lucide="check" class="w-4 h-4 text-emerald-600"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-slate-700 line-through">${t.title}</p>
                  <div class="flex flex-wrap items-center gap-2 mt-2">
                    <span class="badge priority-${t.priority} text-[0.65rem] py-0.5 px-2">${Utils.priorityLabel(t.priority)}</span>
                    <span class="text-xs text-slate-400">${t.area}</span>
                    <span class="text-xs text-slate-400">•</span>
                    ${user ? `<span class="text-xs text-slate-500">${user.name}</span>` : ''}
                    <span class="text-xs text-slate-400">•</span>
                    <span class="text-xs text-emerald-600 font-medium">Completed ${Utils.formatDate(t.completedAt)}</span>
                  </div>
                </div>
              </div>
            </div>`;
          }).join('')}
        </div>
      ` : `
        <div class="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <i data-lucide="trophy" class="w-12 h-12 text-slate-300 mx-auto mb-3"></i>
          <p class="text-slate-500 font-medium">No completed tasks yet</p>
          <p class="text-sm text-slate-400 mt-1">Tasks you complete will appear here</p>
        </div>
      `}
    </div>`;
}


// --- Workspaces Page ---
function renderWorkspacesPage() {
  const workspaces = DataService.getWorkspaces();

  return `
    <div class="animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Workspaces</h1>
          <p class="text-slate-500 text-sm mt-1">Manage your team workspaces</p>
        </div>
        <button onclick="showToast('Create workspace feature coming soon!', 'info')" class="btn-primary"><i data-lucide="plus" class="w-4 h-4"></i> New Workspace</button>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${workspaces.map((w, i) => {
          const wsTasks = DataService.getTasks({ workspace: w.id });
          const activeTasks = wsTasks.filter(t => t.status !== 'completed' && t.status !== 'cancelled').length;
          const completedWs = wsTasks.filter(t => t.status === 'completed').length;
          return `
          <div class="card-hover bg-white rounded-xl border border-slate-200 overflow-hidden animate-fade-in stagger-${i+1}">
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <span class="text-3xl">${w.icon}</span>
                <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                  <i data-lucide="more-horizontal" class="w-4 h-4 text-slate-400"></i>
                </button>
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-1">${w.name}</h3>
              <p class="text-sm text-slate-500 mb-4">${w.description}</p>
              <div class="flex items-center gap-4 text-sm">
                <div class="flex items-center gap-1.5 text-slate-600">
                  <i data-lucide="users" class="w-4 h-4"></i>
                  <span>${w.members}</span>
                </div>
                <div class="flex items-center gap-1.5 text-blue-600">
                  <i data-lucide="list-checks" class="w-4 h-4"></i>
                  <span>${activeTasks} active</span>
                </div>
                <div class="flex items-center gap-1.5 text-emerald-600">
                  <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                  <span>${completedWs}</span>
                </div>
              </div>
            </div>
            <div class="border-t border-slate-100 px-6 py-3 bg-slate-50/50">
              <div class="flex flex-wrap gap-1.5">
                ${w.areas.map(a => `<span class="badge bg-slate-100 text-slate-600 text-[0.65rem] py-0.5 px-2">${a}</span>`).join('')}
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}


// --- Staff Directory Page ---
function renderStaffPage() {
  const filters = State.staffFilters;
  const departments = DataService.getDepartments();
  let users = DataService.getUsers(filters);

  // Group by department if no specific filter
  const grouped = {};
  if (!filters.department && !filters.role && !filters.search) {
    departments.forEach(d => {
      const deptUsers = users.filter(u => u.department === d);
      if (deptUsers.length > 0) grouped[d] = deptUsers;
    });
  }

  const statusDots = { online: 'bg-emerald-400', away: 'bg-amber-400', offline: 'bg-slate-300' };
  const statusLabels = { online: 'Online', away: 'Away', offline: 'Offline' };

  const deptIcons = {
    'Engineering': 'code-2',
    'Design': 'palette',
    'Marketing': 'megaphone',
    'Human Resources': 'heart-handshake',
    'Operations': 'settings-2'
  };

  return `
    <div class="animate-fade-in">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Staff Directory</h1>
          <p class="text-slate-500 text-sm mt-1">${users.length} team members</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-3 mb-6">
        <select onchange="State.staffFilters.department=this.value; renderApp();" class="form-input py-2 text-sm w-auto">
          <option value="">All Departments</option>
          ${departments.map(d => `<option value="${d}" ${filters.department === d ? 'selected' : ''}>${d}</option>`).join('')}
        </select>
        <select id="role-filter" onchange="State.staffFilters.role=this.value; renderApp();" class="form-input py-2 text-sm w-auto">
          <option value="">All Roles</option>
          ${filters.department ? DataService.getRoles(filters.department).map(r => `<option value="${r}" ${filters.role === r ? 'selected' : ''}>${r}</option>`).join('') : Object.values(MOCK_DATA.roles).flat().filter((v,i,a) => a.indexOf(v) === i).map(r => `<option value="${r}" ${filters.role === r ? 'selected' : ''}>${r}</option>`).join('')}
        </select>
        <input type="text" placeholder="Search people..." class="form-input py-2 text-sm w-auto sm:w-48" value="${filters.search || ''}" onkeyup="State.staffFilters.search=this.value; renderApp();">
        ${Object.values(filters).some(v => v) ? `<button onclick="State.staffFilters={department:'',role:'',search:''}; renderApp();" class="text-sm text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1"><i data-lucide="x" class="w-4 h-4"></i> Clear</button>` : ''}
      </div>

      <!-- Staff Grid or Grouped View -->
      ${!filters.department && !filters.role && !filters.search ? `
        <!-- Grouped by Department -->
        ${Object.entries(grouped).map(([dept, deptUsers], gi) => `
          <div class="mb-8 animate-fade-in stagger-${Math.min(gi+1, 4)}">
            <div class="flex items-center gap-2 mb-4">
              <i data-lucide="${deptIcons[dept] || 'users'}" class="w-5 h-5 text-brand-500"></i>
              <h2 class="text-lg font-bold text-slate-900">${dept}</h2>
              <span class="badge bg-slate-100 text-slate-600 text-[0.65rem] py-0.5 px-2">${deptUsers.length}</span>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              ${deptUsers.map(u => renderStaffCard(u, statusDots, statusLabels)).join('')}
            </div>
          </div>
        `).join('')}
      ` : `
        <!-- Flat Grid (filtered) -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${users.map((u, i) => `<div class="animate-fade-in stagger-${Math.min(i+1, 6)}">${renderStaffCard(u, statusDots, statusLabels)}</div>`).join('')}
        </div>
        ${users.length === 0 ? `
          <div class="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <i data-lucide="user-x" class="w-12 h-12 text-slate-300 mx-auto mb-3"></i>
            <p class="text-slate-500 font-medium">No staff members found</p>
          </div>` : ''}
      `}
    </div>`;
}

function renderStaffCard(user, statusDots, statusLabels) {
  return `
    <div class="card-hover bg-white rounded-xl border border-slate-200 p-4">
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="avatar w-11 h-11 text-sm" style="background:${user.avatarColor}">${Utils.getInitials(user.name)}</div>
          <span class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 ${statusDots[user.status]} rounded-full border-2 border-white ${user.status === 'online' ? 'animate-pulse-dot' : ''}"></span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-slate-800 truncate">${user.name}</p>
          <p class="text-xs text-slate-500 truncate">${user.role}</p>
        </div>
        <span class="badge ${user.status === 'online' ? 'bg-emerald-50 text-emerald-700' : user.status === 'away' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'} text-[0.6rem] py-0.5 px-1.5">${statusLabels[user.status]}</span>
      </div>
      <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs text-slate-400">${user.department}</span>
        <div class="flex gap-1">
          <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors" title="Send message">
            <i data-lucide="mail" class="w-3.5 h-3.5 text-slate-400"></i>
          </button>
          <button class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors" title="View profile">
            <i data-lucide="external-link" class="w-3.5 h-3.5 text-slate-400"></i>
          </button>
        </div>
      </div>
    </div>`;
}


// ============================================================
// 11. MODALS
// ============================================================
function openTaskDetail(taskId) {
  const task = DataService.getTaskById(taskId);
  if (!task) return;
  const user = DataService.getUserById(task.assignee);
  const ws = DataService.getWorkspaceById(task.workspace);
  const days = Utils.daysUntil(task.dueDate);
  const isOverdue = days < 0 && task.status !== 'completed' && task.status !== 'cancelled';

  openModal(`
    <div class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-2">
          <span class="badge priority-${task.priority}">${Utils.priorityLabel(task.priority)}</span>
          <span class="badge status-${task.status}">${Utils.statusLabel(task.status)}</span>
        </div>
        <button onclick="closeModal()" class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
          <i data-lucide="x" class="w-5 h-5 text-slate-400"></i>
        </button>
      </div>

      <h2 class="text-xl font-bold text-slate-900 mb-2 ${task.status === 'completed' ? 'line-through text-slate-400' : ''}">${task.title}</h2>

      <div class="flex flex-wrap gap-4 text-sm text-slate-500 mb-6">
        <div class="flex items-center gap-1.5">
          <i data-lucide="map-pin" class="w-4 h-4"></i>
          <span>${task.area}</span>
        </div>
        <div class="flex items-center gap-1.5">
          <i data-lucide="building-2" class="w-4 h-4"></i>
          <span>${ws ? ws.name : '—'}</span>
        </div>
        <div class="flex items-center gap-1.5 ${isOverdue ? 'text-red-500 font-semibold' : ''}">
          <i data-lucide="calendar" class="w-4 h-4"></i>
          <span>${isOverdue ? 'Overdue — ' : ''}${Utils.formatDate(task.dueDate)}</span>
        </div>
      </div>

      <div class="bg-slate-50 rounded-xl p-4 mb-6">
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Description</h3>
        <p class="text-sm text-slate-600 leading-relaxed">${task.description}</p>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-slate-50 rounded-xl p-4">
          <p class="text-xs text-slate-500 mb-1">Assignee</p>
          <div class="flex items-center gap-2">
            ${user ? `<div class="avatar w-7 h-7 text-[0.6rem]" style="background:${user.avatarColor}">${Utils.getInitials(user.name)}</div><span class="text-sm font-medium text-slate-800">${user.name}</span>` : '<span class="text-sm text-slate-400">Unassigned</span>'}
          </div>
        </div>
        <div class="bg-slate-50 rounded-xl p-4">
          <p class="text-xs text-slate-500 mb-1">Created</p>
          <p class="text-sm font-medium text-slate-800">${Utils.formatDate(task.createdAt)}</p>
        </div>
      </div>

      <!-- Status Change -->
      ${task.status !== 'completed' ? `
      <div class="mb-6">
        <p class="text-sm font-semibold text-slate-700 mb-2">Update Status</p>
        <div class="flex flex-wrap gap-2">
          ${['todo', 'progress', 'review', 'completed'].map(s => `
            <button onclick="handleStatusChange('${task.id}', '${s}')" class="badge status-${s} cursor-pointer hover:opacity-80 transition-opacity text-xs py-1.5 px-3 ${task.status === s ? 'ring-2 ring-offset-1 ring-brand-400' : ''}">${Utils.statusLabel(s)}</button>
          `).join('')}
        </div>
      </div>` : ''}

      <!-- Actions -->
      <div class="flex gap-3 pt-4 border-t border-slate-100">
        ${task.status !== 'completed' ? `<button onclick="handleStatusChange('${task.id}', 'completed'); closeModal();" class="btn-primary flex-1"><i data-lucide="check" class="w-4 h-4"></i> Mark Complete</button>` : `<button onclick="handleStatusChange('${task.id}', 'todo'); closeModal();" class="btn-secondary flex-1"><i data-lucide="rotate-ccw" class="w-4 h-4"></i> Reopen</button>`}
        <button onclick="handleDeleteTask('${task.id}')" class="btn-danger px-4"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </div>
    </div>`);
}

function openCreateTaskModal() {
  const areas = DataService.getAllAreas();
  const workspaces = DataService.getWorkspaces();
  const users = DataService.getUsers();

  openModal(`
    <div class="p-6">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-xl font-bold text-slate-900">Create New Task</h2>
        <button onclick="closeModal()" class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
          <i data-lucide="x" class="w-5 h-5 text-slate-400"></i>
        </button>
      </div>

      <form id="create-task-form" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">Title</label>
          <input type="text" id="ct-title" class="form-input" placeholder="Enter task title" required>
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
          <textarea id="ct-desc" class="form-input" rows="3" placeholder="Describe the task..." required></textarea>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Priority</label>
            <select id="ct-priority" class="form-input" required>
              <option value="low">Low</option>
              <option value="medium" selected>Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Area</label>
            <select id="ct-area" class="form-input" required>
              ${areas.map(a => `<option value="${a}">${a}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Workspace</label>
            <select id="ct-workspace" class="form-input" required>
              ${workspaces.map(w => `<option value="${w.id}">${w.icon} ${w.name}</option>`).join('')}
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Assignee</label>
            <select id="ct-assignee" class="form-input" required>
              ${users.map(u => `<option value="${u.id}" ${u.id === State.user.id ? 'selected' : ''}>${u.name}</option>`).join('')}
            </select>
          </div>
        </div>
        <div>
          <label class="block text-sm font-semibold text-slate-700 mb-1.5">Due Date</label>
          <input type="date" id="ct-due" class="form-input" required>
        </div>
        <button type="submit" class="btn-primary w-full py-3">Create Task</button>
      </form>
    </div>`);
}


// ============================================================
// 12. EVENT HANDLERS
// ============================================================
function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const result = DataService.login(email, password);
  if (result.success) {
    State.user = result.user;
    showToast('Welcome back, ' + result.user.name.split(' ')[0] + '!', 'success');
    navigate('dashboard');
  } else {
    const errorEl = document.getElementById('login-error');
    errorEl.textContent = result.error;
    errorEl.classList.remove('hidden');
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const confirm = document.getElementById('reg-confirm').value;
  const dept = document.getElementById('reg-dept').value;
  const role = document.getElementById('reg-role').value;

  if (password !== confirm) {
    const errorEl = document.getElementById('register-error');
    errorEl.textContent = 'Passwords do not match';
    errorEl.classList.remove('hidden');
    return;
  }

  const result = DataService.register({ name, email, password, department: dept, role });
  if (result.success) {
    showToast('Account created successfully! Please sign in.', 'success');
    navigate('login');
  }
}

function handleLogout() {
  DataService.logout();
  State.user = null;
  showToast('Signed out successfully', 'info');
  navigate('login');
}

function handleStatusChange(taskId, newStatus) {
  const updates = { status: newStatus };
  if (newStatus === 'completed') updates.completedAt = new Date().toISOString().split('T')[0];
  else updates.completedAt = null;
  DataService.updateTask(taskId, updates);
  showToast('Task status updated!', 'success');
  openTaskDetail(taskId);
  // Re-render the page underneath
  setTimeout(() => renderApp(), 100);
}

function handleDeleteTask(taskId) {
  DataService.deleteTask(taskId);
  closeModal();
  showToast('Task deleted', 'info');
  renderApp();
}

function handleCreateTask(e) {
  e.preventDefault();
  const task = {
    title: document.getElementById('ct-title').value,
    description: document.getElementById('ct-desc').value,
    priority: document.getElementById('ct-priority').value,
    status: 'todo',
    area: document.getElementById('ct-area').value,
    workspace: document.getElementById('ct-workspace').value,
    assignee: document.getElementById('ct-assignee').value,
    dueDate: document.getElementById('ct-due').value
  };
  DataService.createTask(task);
  closeModal();
  showToast('Task created successfully!', 'success');
  renderApp();
}

function handleGlobalSearch(e) {
  if (e.key === 'Enter') {
    State.taskFilters.search = e.target.value;
    navigate('tasks');
  }
}

function toggleSidebar() {
  State.sidebarOpen = !State.sidebarOpen;
  renderApp();
}

function toggleCollapse() {
  State.sidebarCollapsed = !State.sidebarCollapsed;
  renderApp();
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
}


// ============================================================
// 13. MAIN RENDER
// ============================================================
function renderApp() {
  const app = document.getElementById('app');
  const auth = localStorage.getItem('tf_auth');

  if (!State.user && auth) {
    const parsed = JSON.parse(auth);
    State.user = DataService.getCurrentUser();
  }

  // Auth pages
  if (!State.user || State.currentPage === 'login' || State.currentPage === 'register') {
    if (!State.user && State.currentPage !== 'register') {
      app.innerHTML = renderLoginPage();
    } else if (State.currentPage === 'register') {
      app.innerHTML = renderRegisterPage();
    } else {
      app.innerHTML = renderLoginPage();
    }
    lucide.createIcons();
    bindAuthEvents();
    return;
  }

  // Authenticated pages
  let content = '';
  switch (State.currentPage) {
    case 'dashboard': content = renderDashboard(); break;
    case 'tasks': content = renderTasksPage(); break;
    case 'completed': content = renderCompletedPage(); break;
    case 'workspaces': content = renderWorkspacesPage(); break;
    case 'staff': content = renderStaffPage(); break;
    default: content = renderDashboard();
  }

  app.innerHTML = renderAppLayout(content);
  lucide.createIcons();
  bindAppEvents();
}

function bindAuthEvents() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
    // Dynamic role dropdown based on department
    const deptSelect = document.getElementById('reg-dept');
    if (deptSelect) {
      deptSelect.addEventListener('change', (e) => {
        const roles = DataService.getRoles(e.target.value);
        const roleSelect = document.getElementById('reg-role');
        roleSelect.innerHTML = '<option value="">Select...</option>' + roles.map(r => `<option value="${r}">${r}</option>`).join('');
      });
    }
  }
}

function bindAppEvents() {
  const createForm = document.getElementById('create-task-form');
  if (createForm) createForm.addEventListener('submit', handleCreateTask);
}


// ============================================================
// 14. INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Check hash for initial route
  const hash = location.hash.slice(1);
  if (hash) State.currentPage = hash;
  
  // Initial render
  renderApp();

  // Set default date for task creation
  document.addEventListener('click', (e) => {
    const dueInput = document.getElementById('ct-due');
    if (dueInput && !dueInput.value) {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      dueInput.value = d.toISOString().split('T')[0];
    }
  });
});