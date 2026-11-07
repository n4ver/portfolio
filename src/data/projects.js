// Optional fields: role, dates, highlights (bullets), featured (full-width card),
// demo (live URL), image (path under public/projects/).
export const projects = [
  {
    title: 'nav.tf, TF2 Match Analytics Platform',
    role: 'Solo developer',
    image: '/projects/nav-tf-portfolio.png',
    dates: 'Apr 2026 – Present',
    featured: true,
    outcome:
      'Full-stack platform that ingests competitive TF2 match logs from logs.tf and matcha.tf, computes per-class player ratings, and serves leaderboards, match stats and player careers through a Vue dashboard. Live in production.',
    highlights: [
      'Architecture: CQRS command and query services on separate PostgreSQL databases; 11 read-model projections serve the dashboard without touching the write model',
      'Reliability: transactional outbox with ordered relay, exponential backoff and a Postgres advisory lock; idempotent RabbitMQ consumers claim each event ID in-transaction, retry in order, and park failures in a dead-letter queue',
      'Ratings: per-class z-score ratings against computed benchmarks; rebuilds are debounced so a burst of ingested matches triggers one global rescore, not one per event',
      'Access: Steam OpenID login issuing JWTs with PLAYER/ADMIN roles guarding all write endpoints; 29 paths documented in OpenAPI',
      'Delivery: 400+ automated tests (220+ pytest backend, plus Vitest and Jest), GitHub Actions CI, deployed on GCP Compute Engine behind Caddy via Workload Identity Federation'
    ],
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'RabbitMQ', 'Vue 3', 'Node.js', 'Docker', 'GCP', 'GitHub Actions'],
    repo: 'https://github.com/n4ver/nav.tf',
    demo: 'https://nav.n4ver.xyz'
  },
  {
    title: 'Tao, Downloaded Files Manager',
    role: 'Solo developer',
    dates: 'Oct 2026 - Present',
    outcome: 'Rust-based Windows utility that automatically organizes Downloads using configurable rules, background monitoring and reversible file operations.',
    highlights: [
      'Automation: Background filesystem watcher with periodic rescans',
      'Rules: TOML-based filtering by extension, patterns, size, age and source',
      'Reliability: SQLite logging, undo support and overwrite protection', 
      'Windows integration: System tray interface, startup registration, Win32 APIs'
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
