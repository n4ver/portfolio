// Optional fields: role, dates, highlights (bullets), featured (full-width card),
// demo (live URL), image (path under public/projects/).
export const projects = [
  {
    title: 'nav.tf, TF2 Match Analytics Platform',
    role: 'Solo developer',
    dates: 'Apr 2026 – Present',
    // featured: true,
    outcome:
      'CQRS backend that ingests TF2 match logs and serves match, player and tournament queries from 10+ read-model projections.',
    highlights: [
      'Architecture: CQRS microservices with PostgreSQL read models and RabbitMQ event-driven communication',
      'Event pipeline: RabbitMQ domain events with an outbox and idempotent consumers',
      'Access: Steam OpenID + JWT role-based auth behind OpenAPI-documented REST APIs',
      'Quality: 130+ pytest tests across services'
    ],
    tags: ['Python', 'FastAPI', 'RabbitMQ', 'PostgreSQL', 'Node.js', 'JWT', 'Docker'],
    repo: 'https://github.com/n4ver/logdashboard'
  },
  {
    title: 'Tao, Downloaded Files Manager',
    role: 'Solo developer',
    dates: 'Oct 2026 - Present',
    outcome: 'Rust-based Windows file manager that automatically organizes the Downloads folder using configurable rules.',
    highlights: [
      'Automation: Background filesystem watcher with event-driven sorting, periodic rescans and automatic configuration reloads',
      'Rules engine: Configurable TOML rules supporting extensions, glob patterns, regex, file age, size and download source',
      'Reliability: SQLite transaction journal with crash recovery, undo support and protection against file overwrites', 
      'Windows integration: System tray interface, startup registration, Win32 APIs and concurrent event-driven architecture'
    ],
    tags: ['Rust', 'SQLite'],
    repo: 'https://github.com/n4ver/Tao'
  },
  {
    title: 'N4TV, E-sports Stream Dashboard',
    role: 'Solo developer',
    dates: 'Jan 2026 – Feb 2026',
    outcome:
      'Flask REST API and Vue SPA that ingests logs.tf match data and drives live-stream overlays for grassroots Team Fortress 2 broadcasts.',
    tags: ['Python', 'Flask', 'Vue', 'Vercel'],
    repo: 'https://github.com/n4ver/N4TV',
    demo: 'https://n4-tv.vercel.app'
  },
  {
    title: 'Hitman',
    role: 'Solo developer',
    dates: 'Jul 2026 – Present',
    outcome: 'Tauri desktop app that automates custom Team Fortress 2 hitsound management with a real-time preview UI.',
    tags: ['Rust', 'Tauri'],
    repo: 'https://github.com/n4ver/hitman'
  }
]

export const coursework = [
  {
    title: 'Unity Horror Game',
    outcome: 'First-person horror game with an inventory system, event triggers and state management.',
    tags: ['Unity', 'C#'],
    repo: 'https://github.com/n4ver/IM2073_horrorgame'
  },
  {
    title: 'E-Bookshop Website',
    outcome: 'Normalised many-to-many database schema, using PreparedStatements to prevent SQL injection.',
    tags: ['Java', 'MySQL', 'Tomcat'],
    repo: 'https://github.com/n4ver/IM2073_WebProject'
  }
]
