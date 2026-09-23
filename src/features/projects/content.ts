/**
 * Facts and media for the five project experiences.
 *
 * Every claim below is checked against the project's repository or is visible
 * in its real screenshots. Every image is a real capture (or a crop of one)
 * generated into `public/work/` from the originals in `public/projects/` and
 * `src/assets/projects/`. Compositions live in each experience component;
 * nothing here decides layout.
 */

export type Media = {
  /** path under /work without extension, e.g. `finevo/overview` */
  src: string;
  w: number;
  h: number;
  alt: string;
  /** a narrower `-1100` variant exists */
  small?: boolean;
};

export type Repo = { label: string; href: string };

export type ProjectMeta = {
  id: 'finevo' | 'facel' | 'realstate' | 'artemis' | 'linkup';
  number: string;
  name: string;
  /** name used by the repository when it differs from the product name */
  alias?: string;
  field: string;
  tone: 'light' | 'dark';
  /** base colour of the world, used by the header and the hand-off bands */
  surface: string;
  stack: string[];
  repos: Repo[];
};

export const projects: ProjectMeta[] = [
  {
    id: 'finevo',
    number: '01',
    name: 'Finevo',
    field: 'Personal finance',
    tone: 'dark',
    surface: '#0b1511',
    stack: ['ASP.NET Core', 'EF Core', 'React', 'TypeScript', 'Tailwind CSS'],
    repos: [
      { label: 'Frontend', href: 'https://github.com/homerportes/FinevoFrontend' },
      { label: 'Backend', href: 'https://github.com/homerportes/FinevoApp' },
    ],
  },
  {
    id: 'facel',
    number: '02',
    name: 'FacEl',
    field: 'Electronic invoicing · Dominican Republic',
    tone: 'light',
    surface: '#e8e7e2',
    stack: ['NestJS', 'Next.js', 'PostgreSQL', 'TypeScript', 'xml-crypto'],
    repos: [{ label: 'Repository', href: 'https://github.com/homerportes/FacturacionElectronica' }],
  },
  {
    id: 'realstate',
    number: '03',
    name: 'RealStateApp',
    field: 'Real estate · Three roles',
    tone: 'light',
    surface: '#ece4d8',
    stack: ['ASP.NET Core', 'EF Core', 'MediatR', 'SignalR', 'SQL Server'],
    repos: [{ label: 'Repository', href: 'https://github.com/homerportes/RealStateApps' }],
  },
  {
    id: 'artemis',
    number: '04',
    name: 'Artemis Banking',
    alias: 'BankingApp',
    field: 'Banking · Customer, teller, administration',
    tone: 'dark',
    surface: '#090e18',
    stack: ['ASP.NET Core', 'Web API', 'EF Core', 'Azure Functions', 'SQL Server'],
    repos: [{ label: 'Repository', href: 'https://github.com/homerportes/BankingApp' }],
  },
  {
    id: 'linkup',
    number: '05',
    name: 'LinkUp',
    alias: 'DHomerNetwork',
    field: 'Social network · with Battleship inside',
    tone: 'dark',
    surface: '#1d2fd6',
    stack: ['ASP.NET Core MVC', 'EF Core', 'SQL Server', 'Identity'],
    repos: [{ label: 'Repository', href: 'https://github.com/homerportes/DHomerNetwork' }],
  },
];

export const projectById = Object.fromEntries(projects.map((p) => [p.id, p])) as Record<
  ProjectMeta['id'],
  ProjectMeta
>;

const m = (src: string, w: number, h: number, alt: string, small = true): Media => ({
  src,
  w,
  h,
  alt,
  small,
});

export const media = {
  finevo: {
    marketing: m('finevo/marketing', 1919, 957, 'Finevo landing page: “Tus finanzas te muestran qué pasó. Finevo te muestra qué sigue.”'),
    normalization: m('finevo/normalization', 1919, 965, 'Finevo normalization: Gmail, Excel/CSV and manual entries become one normalized record'),
    overview: m('finevo/overview', 1689, 968, 'Finevo monthly overview with total spending, spending by category and recent movements'),
    budgets: m('finevo/budgets', 1919, 964, 'Finevo budgets: totals, September budgets and categories without a budget'),
    advisors: m('finevo/advisors', 1919, 962, 'Finevo advisor directory filtered by specialty'),
    messages: m('finevo/messages', 1919, 965, 'Finevo private messages between a client and an advisor'),
    messagesPhone: m('finevo/messages-phone', 390, 844, 'Finevo private messages on a phone', false),
    advisorsPhone: m('finevo/advisors-phone', 390, 844, 'Finevo advisor directory on a phone', false),
    overviewPhone: m('finevo/overview-phone', 390, 1643, 'Finevo overview on a phone', false),
  },
  facel: {
    ecf31: m('facel/ecf31', 1191, 944, 'FacEl sample e-CF 31 electronic tax-credit invoice, e-NCF E310000000001, marked demo environment', false),
    ecf33: m('facel/ecf33', 1191, 944, 'FacEl sample e-CF 33 electronic debit note, marked demo environment', false),
    seal: m('facel/ecf31-seal', 375, 261, 'QR code, security code YvUuo1 and digital signature date from the sample e-CF 31', false),
  },
  realstate: {
    house: m('realestate/house', 631, 316, 'Listing photo of house YLK590 from RealStateApp', false),
    search: m('realestate/search', 1912, 1011, 'RealStateApp property search with filters and listing cards'),
    detail: m('realestate/detail', 1913, 1003, 'RealStateApp listing detail with photos, facts, offers, messages and agent contact'),
    offers: m('realestate/offers', 402, 462, 'An offer of RD$25,000.00 marked pending, and the listing message thread', false),
    chatClient: m('realestate/chat-client', 707, 732, 'Client side of the property conversation for listing YLK590', false),
    chatAgent: m('realestate/chat-agent', 879, 759, 'Agent side of the same conversation with a typing indicator', false),
    agentProperties: m('realestate/agent-properties', 1916, 1002, 'Agent workspace listing the agent’s properties and their status'),
    admin: m('realestate/admin', 1915, 1003, 'RealStateApp administrator dashboard with the maintenance menu open'),
  },
  artemis: {
    accounts: m('artemis/accounts', 1916, 937, 'Artemis Banking customer accounts with balances and loans'),
    transfer: m('artemis/transfer', 1915, 937, 'Artemis Banking transfer form with the transactions menu open'),
    teller: m('artemis/teller', 1917, 948, 'Artemis Banking teller panel with daily statistics and quick operations'),
    deposit: m('artemis/deposit-withdrawal', 1917, 941, 'Artemis Banking deposit confirmation'),
    withdrawal: m('artemis/withdrawal-confirmation', 1918, 936, 'Artemis Banking withdrawal confirmation with current and final balance'),
    admin: m('artemis/admin-dashboard', 1917, 942, 'Artemis Banking administration panel'),
    cards: m('artemis/cards', 1906, 943, 'Artemis Banking credit card management table'),
  },
  linkup: {
    feed: m('linkup/feed', 1918, 977, 'LinkUp feed with a photo post by Homer Portes'),
    comments: m('linkup/comments', 1918, 982, 'LinkUp post with nested comment replies'),
    profile: m('linkup/profile', 1916, 973, 'LinkUp member profile with posts and friends count'),
    requests: m('linkup/friend-requests', 1918, 981, 'LinkUp pending and sent friend requests'),
    board: m('linkup/game-board', 1912, 932, 'LinkUp Battleship attack board against Homer Portes'),
    opponent: m('linkup/opponent-board', 1892, 917, 'LinkUp Battleship attack board with hits and game statistics'),
    history: m('linkup/game-history', 1918, 987, 'LinkUp Battleship game history'),
  },
} satisfies Record<string, Record<string, Media>>;
