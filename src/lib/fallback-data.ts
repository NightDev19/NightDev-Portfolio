import type { Project } from '@/features/projects/types'
import type { Skill } from '@/features/skills/types'
import type { Experience } from '@/features/experience/types'
import type { BlogPost } from '@/features/blog/types'

// Fallback data used when Supabase is not configured or unreachable.
// This ensures the portfolio always displays content.

export const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'Project Chameleon',
    slug: 'project-chameleon',
    description:
      'A desktop application built with Avalonia UI and .NET 8 featuring authentication, RBAC sidebar permissions, dashboard cards, device info, sensor pages, profile management, notifications, activity log, SQLite database with EF Core migrations, and responsive layout improvements.',
    tech_stack: ['Avalonia UI', '.NET 8', 'C#', 'SQLite', 'EF Core', 'MVVM', 'CommunityToolkit.Mvvm'],
    github_url: 'https://github.com/sherwintajan/project-chameleon',
    demo_url: null,
    image_url: null,
    featured: true,
    published: true,
    created_at: '2024-06-15T00:00:00Z',
    updated_at: '2024-06-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Docker Learning Project',
    slug: 'docker-learning-project',
    description:
      'A full-stack Docker setup demonstrating containerized frontend, backend FastAPI, MongoDB, Docker Compose orchestration, environment variable management, startup order control, container networking, and volume usage for persistent data.',
    tech_stack: ['Docker', 'Docker Compose', 'FastAPI', 'MongoDB', 'Python', 'Container Networking'],
    github_url: 'https://github.com/sherwintajan/docker-learning',
    demo_url: null,
    image_url: null,
    featured: true,
    published: true,
    created_at: '2024-03-10T00:00:00Z',
    updated_at: '2024-03-10T00:00:00Z',
  },
  {
    id: '3',
    title: 'Node.js OAuth Project',
    slug: 'nodejs-oauth-project',
    description:
      'Authentication experiment implementing Google OAuth and GitHub OAuth strategies using Node.js, Express, and Appwrite as the backend authentication service.',
    tech_stack: ['Node.js', 'Express', 'Appwrite', 'Google OAuth', 'GitHub OAuth'],
    github_url: 'https://github.com/sherwintajan/nodejs-oauth',
    demo_url: null,
    image_url: null,
    featured: false,
    published: true,
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
  },
]

export const fallbackSkills: Skill[] = [
  // Frontend
  { id: '1', name: 'React', category: 'Frontend', level: 'Intermediate', icon: null, order_index: 1, created_at: '' },
  { id: '2', name: 'Next.js', category: 'Frontend', level: 'Intermediate', icon: null, order_index: 2, created_at: '' },
  { id: '3', name: 'Vue 3', category: 'Frontend', level: 'Beginner', icon: null, order_index: 3, created_at: '' },
  { id: '4', name: 'TypeScript', category: 'Frontend', level: 'Intermediate', icon: null, order_index: 4, created_at: '' },
  { id: '5', name: 'JavaScript', category: 'Frontend', level: 'Intermediate', icon: null, order_index: 5, created_at: '' },
  { id: '6', name: 'Tailwind CSS', category: 'Frontend', level: 'Intermediate', icon: null, order_index: 6, created_at: '' },
  { id: '7', name: 'Responsive UI', category: 'Frontend', level: 'Intermediate', icon: null, order_index: 7, created_at: '' },
  { id: '8', name: 'UI/UX Improvement', category: 'Frontend', level: 'Intermediate', icon: null, order_index: 8, created_at: '' },
  // Backend
  { id: '9', name: 'Python', category: 'Backend', level: 'Intermediate', icon: null, order_index: 9, created_at: '' },
  { id: '10', name: 'FastAPI', category: 'Backend', level: 'Intermediate', icon: null, order_index: 10, created_at: '' },
  { id: '11', name: 'Django', category: 'Backend', level: 'Beginner', icon: null, order_index: 11, created_at: '' },
  { id: '12', name: 'Node.js', category: 'Backend', level: 'Intermediate', icon: null, order_index: 12, created_at: '' },
  { id: '13', name: 'Express', category: 'Backend', level: 'Intermediate', icon: null, order_index: 13, created_at: '' },
  { id: '14', name: 'C#', category: 'Backend', level: 'Intermediate', icon: null, order_index: 14, created_at: '' },
  { id: '15', name: '.NET 8', category: 'Backend', level: 'Intermediate', icon: null, order_index: 15, created_at: '' },
  { id: '16', name: 'ASP.NET Core', category: 'Backend', level: 'Beginner', icon: null, order_index: 16, created_at: '' },
  // Desktop Development
  { id: '17', name: 'Avalonia UI', category: 'Desktop Development', level: 'Intermediate', icon: null, order_index: 17, created_at: '' },
  { id: '34', name: '.NET MAUI', category: 'Desktop Development', level: 'Intermediate', icon: null, order_index: 22, created_at: '' },
  { id: '35', name: 'shadcn/ui', category: 'Frontend', level: 'Intermediate', icon: null, order_index: 9, created_at: '' },
  { id: '18', name: 'MVVM', category: 'Desktop Development', level: 'Intermediate', icon: null, order_index: 18, created_at: '' },
  { id: '19', name: 'CommunityToolkit.Mvvm', category: 'Desktop Development', level: 'Intermediate', icon: null, order_index: 19, created_at: '' },
  { id: '20', name: 'SQLite', category: 'Desktop Development', level: 'Intermediate', icon: null, order_index: 20, created_at: '' },
  { id: '21', name: 'Entity Framework Core', category: 'Desktop Development', level: 'Intermediate', icon: null, order_index: 21, created_at: '' },
  // Databases
  { id: '22', name: 'Supabase', category: 'Databases', level: 'Intermediate', icon: null, order_index: 22, created_at: '' },
  { id: '23', name: 'PostgreSQL', category: 'Databases', level: 'Intermediate', icon: null, order_index: 23, created_at: '' },
  { id: '24', name: 'MongoDB', category: 'Databases', level: 'Beginner', icon: null, order_index: 24, created_at: '' },
  { id: '25', name: 'Redis', category: 'Databases', level: 'Beginner', icon: null, order_index: 25, created_at: '' },
  // DevOps & Tools
  { id: '26', name: 'Docker', category: 'DevOps & Tools', level: 'Intermediate', icon: null, order_index: 26, created_at: '' },
  { id: '27', name: 'Docker Compose', category: 'DevOps & Tools', level: 'Intermediate', icon: null, order_index: 27, created_at: '' },
  { id: '28', name: 'Git', category: 'DevOps & Tools', level: 'Intermediate', icon: null, order_index: 28, created_at: '' },
  { id: '29', name: 'GitHub', category: 'DevOps & Tools', level: 'Intermediate', icon: null, order_index: 29, created_at: '' },
  { id: '30', name: 'Linux Fedora', category: 'DevOps & Tools', level: 'Intermediate', icon: null, order_index: 30, created_at: '' },
  { id: '31', name: 'VS Code', category: 'DevOps & Tools', level: 'Advanced', icon: null, order_index: 31, created_at: '' },
  { id: '32', name: 'Zed', category: 'DevOps & Tools', level: 'Beginner', icon: null, order_index: 32, created_at: '' },
  { id: '33', name: 'Postman', category: 'DevOps & Tools', level: 'Intermediate', icon: null, order_index: 33, created_at: '' },
]

export const fallbackExperiences: Experience[] = [
  {
    id: '1',
    title: 'Mid Software Engineer',
    organization: 'Code Fusion IT Solutions',
    description:
      'Maintained and enhanced a University Library Information Management System (LIMS) using React.js, Python, and PostgreSQL, improving system reliability and usability for students and faculty. Developed cross-platform desktop applications for IoT projects using .NET MAUI and Avalonia, enabling real-time device monitoring and data visualization. Designed and integrated RESTful APIs to support seamless communication between frontend applications, backend services, and connected devices. Collaborated with cross-functional teams to develop, optimize, and troubleshoot full-stack features, improving application performance and maintainability.',
    tech_stack: ['React.js', 'Python', 'PostgreSQL', '.NET MAUI', 'Avalonia', 'RESTful APIs', 'Docker'],
    start_date: '2025-07-01',
    end_date: '2026-05-01',
    current: false,
    order_index: 1,
    created_at: '',
  },
  {
    id: '2',
    title: 'Junior Software Engineer',
    organization: 'Innocore Systems Solutions',
    description:
      'Maintained and enhanced a school monitoring system using Next.js, Tailwind CSS, Supabase, Framer Motion, and shadcn/ui, supporting attendance tracking, grade management, RFID security, and reporting features. Developed and maintained the company website, implementing responsive and user-friendly interfaces to improve user experience and accessibility. Collaborated with backend developers to integrate APIs, implement new features, and resolve technical issues across the application stack. Optimized frontend components and application workflows, improving performance, maintainability, and overall user experience.',
    tech_stack: ['Next.js', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'shadcn/ui', 'RESTful APIs'],
    start_date: '2025-05-01',
    end_date: '2025-10-01',
    current: false,
    order_index: 2,
    created_at: '',
  },
  {
    id: '3',
    title: 'Secondary Teacher',
    organization: 'Tanauan City Academy',
    description:
      'Delivered Senior High School Computer Programming I–IV courses, covering Python programming, web development, SQL databases, and computer hardware fundamentals. Developed instructional materials and practical programming exercises to strengthen students\' technical and problem-solving skills. Provided technical support to faculty members by troubleshooting network connectivity, software installations, and classroom technology issues. Guided students in hands-on projects involving programming, database management, and web application development.',
    tech_stack: ['Python', 'Web Development', 'SQL', 'Computer Hardware', 'Teaching'],
    start_date: '2025-05-01',
    end_date: '2025-10-01',
    current: false,
    order_index: 3,
    created_at: '',
  },
]

export const fallbackBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Docker Compose',
    slug: 'getting-started-with-docker-compose',
    excerpt:
      'A practical guide to understanding Docker Compose for multi-container applications, covering service definition, networking, volumes, and environment configuration.',
    content:
      '# Getting Started with Docker Compose\n\nDocker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application\'s services, networks, and volumes.\n\n## Why Docker Compose?\n\nWhen building full-stack applications, you typically need multiple services running together — a frontend, a backend API, a database, and perhaps a cache. Managing these individually with Docker commands becomes tedious and error-prone. Docker Compose solves this by letting you define your entire stack in a single `docker-compose.yml` file.\n\n## Core Concepts\n\n### Services\nEach service in your Compose file represents a container. You specify the image to use, ports to expose, environment variables, and dependencies on other services.\n\n### Networks\nCompose creates a default network for your application, allowing services to communicate using their service names as hostnames. You can also define custom networks for more control.\n\n### Volumes\nVolumes provide persistent storage for your containers. Without volumes, data is lost when a container is removed. Define volumes in your Compose file to persist database data, uploaded files, and more.\n\n## Key Takeaways\n\n- Use `depends_on` to control startup order\n- Use environment variables for configuration\n- Use volumes for data persistence\n- Services communicate using service names as hostnames\n\nDocker Compose simplifies the development workflow and makes it easy to share your project setup with other developers.',
    tags: ['Docker', 'Docker Compose', 'DevOps', 'Containers'],
    published: true,
    created_at: '2024-04-10T00:00:00Z',
    updated_at: '2024-04-10T00:00:00Z',
  },
  {
    id: '2',
    title: 'Understanding RBAC in Desktop Applications',
    slug: 'understanding-rbac-in-desktop-apps',
    excerpt:
      'Exploring how Role-Based Access Control works in desktop applications using .NET 8 and Avalonia UI, including permission management and sidebar navigation control.',
    content:
      '# Understanding RBAC in Desktop Applications\n\nRole-Based Access Control (RBAC) is a method of restricting system access based on the roles of individual users. In desktop applications, RBAC is crucial for managing what features and data different users can access.\n\n## Why RBAC Matters\n\nIn any application with multiple user types — administrators, managers, regular users — you need a reliable way to control who can see and do what. Without RBAC, every user has the same level of access, which is both a security risk and a usability problem.\n\n## Implementing RBAC in .NET 8\n\n### Role Definition\nStart by defining your roles and their associated permissions. Each role should have a clear set of allowed actions.\n\n### Permission Assignment\nMap permissions to roles. For example, an Admin role might have full access, while a Viewer role can only read data.\n\n### UI Adaptation\nThe sidebar and navigation should adapt based on the user\'s role. In Avalonia UI, you can bind visibility of menu items to the user\'s permission set.\n\n### Backend Enforcement\nNever rely solely on UI hiding for security. Always verify permissions on the backend before executing sensitive operations.\n\n## Practical Example\n\nIn Project Chameleon, I implemented RBAC by:\n1. Defining roles (Admin, Manager, User, Viewer)\n2. Creating a permission mapping system\n3. Binding sidebar items to permission checks\n4. Enforcing permissions on data access and API calls\n\nThis approach ensures that users only see and access what they are authorized to, both in the UI and in the data layer.',
    tags: ['RBAC', '.NET 8', 'Avalonia UI', 'C#', 'Authentication'],
    published: true,
    created_at: '2024-05-01T00:00:00Z',
    updated_at: '2024-05-01T00:00:00Z',
  },
]
