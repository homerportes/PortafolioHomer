import type { ProjectMeta } from './content';

/**
 * The case file behind each project world: what it solves, what was built and
 * the engineering that the screenshots cannot show. Opened from the scene rail
 * ("About …") so the chapters stay short and the depth is one click away.
 */
export type ProjectBrief = {
  /** one sentence, the project in plain words */
  summary: string;
  problem: string;
  built: string[];
  engineering: { title: string; body: string }[];
  architecture: string[];
};

export const briefs: Record<ProjectMeta['id'], ProjectBrief> = {
  finevo: {
    summary:
      'Finevo brings financial activity into one place so people can understand their money, organise it and decide what to do next.',
    problem:
      'Money information arrives scattered: bank notices in Gmail, spreadsheets, cash noted by hand. Each source has its own shape, so none of it adds up to a clear picture of where the money goes.',
    built: [
      'Import from Gmail, Excel / CSV and manual entry, normalised into one transaction model',
      'A period overview: total spending, spending by category, uncategorised items, budgets needing attention and a recommended next action',
      'A transaction workspace with filters by source, category and date, and in-place categorisation',
      'Monthly budgets per category, measured against real spending',
      'An advisor marketplace: discovery by specialty, profiles and consultation pricing',
      'Private client–advisor messaging inside the platform',
    ],
    engineering: [
      {
        title: 'One financial language',
        body: 'Every input is normalised into the same record (date, description, amount, currency, category, type and source), so the overview, budgets and recommendations never care where a transaction came from.',
      },
      {
        title: 'The server decides who you are',
        body: 'Financial data is never fetched by a UserId sent from the frontend. The user is resolved from trusted authentication claims, so one account cannot ask for another account’s money.',
      },
      {
        title: 'Hardened sign-in',
        body: 'JWT sessions and Google sign-in over OIDC, protected with PKCE, state and nonce against code interception, CSRF and replay.',
      },
    ],
    architecture: ['ASP.NET Core API', 'Entity Framework Core', 'React + TypeScript', 'Tailwind CSS', 'JWT', 'Google OIDC (PKCE, state, nonce)'],
  },

  facel: {
    summary:
      'A multi-company electronic invoicing platform built around the Dominican Republic’s e-CF rules, with deterministic documents, official validation, digital signatures and a security-first architecture.',
    problem:
      'Issuing e-CF for the DGII is not a form: every document must follow the official schema, be signed with the company’s certificate, use the right e-NCF sequence and stay exactly recoverable for audits, for many companies that must never see each other’s data.',
    built: [
      'The full fiscal workflow for E31, E32, E33, E34, E41, E43, E44, E45 and E46',
      'Deterministic XML generation and exact monetary calculation in a pure TypeScript fiscal core',
      'Validation against DGII’s official XSD by an independent, self-contained .NET 9 validator',
      'XMLDSig signatures (RSA-SHA256, X.509) with certificate custody and key rotation',
      'e-NCF sequence management inside the fiscal transaction, with idempotent operations',
      'Immutable fiscal artifacts in S3-compatible storage and PDFs derived from them',
      'A Next.js workspace for multiple companies, with RBAC and tenant isolation',
    ],
    engineering: [
      {
        title: 'Fail closed',
        body: 'E47 (payments abroad) is deliberately disabled in production: DGII’s documentation contradicts itself, and the system refuses to emit a fiscal document it cannot prove correct.',
      },
      {
        title: 'Reproducible to the byte',
        body: 'The same input always produces the same XML. Issued documents are stored immutably, so any receipt can be recovered exactly as it was issued; the PDF is derived from that record, never the other way round.',
      },
      {
        title: 'No duplicate fiscal results',
        body: 'Idempotency controls and transactional sequence handling keep a repeated operation from creating a duplicate or inconsistent fiscal result.',
      },
      {
        title: 'Tested like infrastructure',
        body: 'Unit and integration tests on a real PostgreSQL, Docker runtime, concurrency, tenant-isolation and security tests, fiscal golden files, independent XSD validation, signature verification and dependency-failure tests.',
      },
    ],
    architecture: [
      'Modular monolith · Clean Architecture',
      'NestJS + TypeScript',
      'Next.js + React',
      'PostgreSQL (transactional authority)',
      'Better Auth · RBAC · multi-tenancy',
      'Redis (distributed rate limiting)',
      'S3 / MinIO',
      '.NET 9 XSD validator',
      'Docker · GitHub Actions · backup & restore',
    ],
  },

  realstate: {
    summary:
      'A full-stack real-estate platform connecting clients, agents and administrators through property discovery, offers, communication and property management.',
    problem:
      'A listings site stops at the photo. Buying or renting also means comparing, negotiating, talking to an agent and keeping the catalogue up to date, with each role allowed to do different things.',
    built: [
      'Search by code, type, price, bedrooms, bathrooms and location, with favourites',
      'Listing detail with gallery, facts, upgrades, price, sale type and agent',
      'Offers with a lifecycle: pending, accepted, rejected',
      'Client–agent chat tied to each property',
      'An agent workspace to publish, edit and change the status of their properties',
      'Administration: metrics, users, agents, admins, developers and the catalogues of property types, sale types and upgrades',
    ],
    engineering: [
      {
        title: 'Onion Architecture + CQRS',
        body: 'Domain, Application, Infrastructure and API layers, with use cases as MediatR commands and queries, so business rules stay independent of the web and the database.',
      },
      {
        title: 'Three roles, one system',
        body: 'ASP.NET Core Identity and JWT separate what clients, agents and administrators can see and do, across both the MVC app and the Web API.',
      },
      {
        title: 'Built to be changed',
        body: 'AutoMapper at the boundaries, centralised error handling, Swagger for the API, and unit plus integration tests over the domain and the endpoints.',
      },
    ],
    architecture: ['ASP.NET Core MVC + Web API', 'Onion Architecture', 'CQRS · MediatR', 'Entity Framework Core', 'Identity · JWT', 'AutoMapper · Swagger', 'SQL Server'],
  },

  artemis: {
    summary:
      'An online banking platform built around real financial business rules: accounts, loans, cards, transfers and role-based banking operations.',
    problem:
      'A bank is rules more than screens: a transfer needs funds, a card has a limit, a loan has an amortisation schedule, and a customer, a teller and an administrator may each do very different things with the same account.',
    built: [
      'Savings accounts, loans and credit cards per customer',
      'Transfers, beneficiary payments, cash advances, deposits and withdrawals',
      'Loans with amounts, terms, rates, instalments and payment progress',
      'Partial and full loan payments and outstanding-debt control',
      'Credit cards with limits, debt, status, expiry and payments',
      'A teller desk and an administration area with transaction metrics',
    ],
    engineering: [
      {
        title: 'Business rules first',
        body: 'Operations are validated before money moves: balances, card limits, outstanding debt and loan state. Loans follow amortisation rules instead of storing static figures.',
      },
      {
        title: 'Roles with boundaries',
        body: 'Customer, teller and administrator each get their own workflows and permitted operations; a teller confirmation states holder, account, amount and resulting balance before it commits.',
      },
      {
        title: 'The API owns the bank',
        body: 'Financial operations live behind a Web API, independent of the MVC interface, so the rules are enforced in one place whatever the client.',
      },
    ],
    architecture: ['ASP.NET Core MVC', 'ASP.NET Core Web API', 'Entity Framework Core', 'Azure Functions', 'SQL Server', 'Role-based access'],
  },

  linkup: {
    summary:
      'A social platform where people publish, discuss and build connections, with multiplayer Battleship built into the same application.',
    problem:
      'A social network is a graph of people and permissions: who sees which post, who is a friend, who can reply to what. LinkUp puts a multiplayer game on top of that same graph.',
    built: [
      'Registration with email activation and editable profiles',
      'A personalised feed from your own posts and your friends’',
      'Posts with text, images and YouTube videos; likes and dislikes',
      'Threaded comments with replies',
      'Friends: discovery, sent and pending requests, accept, reject',
      'Multiplayer Battleship with turns, rule validation, hits and misses, match state, history and statistics',
    ],
    engineering: [
      {
        title: 'One graph, two uses',
        body: 'The same friendship model decides what appears in the feed and who you play against, so the game is part of the network rather than a separate demo.',
      },
      {
        title: 'Rules, not just a board',
        body: 'Battleship manages turns, validates every attack against the rules and each board, and keeps match state, history and statistics for every game.',
      },
      {
        title: 'Layered on purpose',
        body: 'Onion Architecture with generic repositories, DTOs, ViewModels and AutoMapper; Entity Framework Core code-first and ASP.NET Core Identity for accounts.',
      },
    ],
    architecture: ['ASP.NET Core MVC', 'Onion Architecture', 'Entity Framework Core (code-first)', 'Generic repositories · DTOs', 'AutoMapper', 'ASP.NET Core Identity', 'SQL Server'],
  },
};
