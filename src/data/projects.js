// Optional fields: demo (live URL), image (path under public/projects/).
export const projects = [
  {
    title: 'TF2 Match Analytics Platform',
    outcome:
      'CQRS backend that ingests TF2 match logs, publishes domain events and materialises 10+ read-model projections for match, player and tournament queries, covered by 130+ pytest tests.',
    tags: ['Python', 'FastAPI', 'RabbitMQ', 'PostgreSQL', 'Node.js', 'JWT'],
    repo: 'https://github.com/n4ver/logdashboard'
  },
  {
    title: 'E-sports Stream Dashboard',
    outcome:
      'Flask REST API and Vue SPA that ingests logs.tf match data and drives live-stream overlays for grassroots Team Fortress 2 broadcasts.',
    tags: ['Python', 'Flask', 'Vue', 'Vercel'],
    repo: 'https://github.com/n4ver/N4TV',
    demo: 'https://n4-tv.vercel.app'
  },
  {
    title: 'Hitman',
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
