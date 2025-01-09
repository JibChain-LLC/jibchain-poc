interface RouteTree {
  slug: string;
  auth?: boolean;
  org?: boolean;
  children?: Record<string, RouteTree>;
}

type NestedKeysWithParent<T, P extends string = ''> = T extends object
  ? {
      [K in keyof T]: K extends 'slug' | 'org' | 'auth'
        ? never
        : K extends 'children'
          ? NestedKeysWithParent<T[K], P>
          : K extends string
            ? `${P}${K}` | NestedKeysWithParent<T[K], `${P}${K}.`>
            : never;
    }[keyof T]
  : never;

const ROUTE_TREE = {
  slug: '',
  children: {
    JOIN: { slug: 'join', auth: false, org: false },
    GET_STARTED: { slug: 'getting-started', auth: true, org: false },
    LOGIN: { slug: 'login' },
    SIGNUP: { slug: 'signup' },
    LOGOUT: { slug: 'logout', auth: true },
    CONFIRM: { slug: 'confirm' },
    SUPERUSER: { slug: 'superuser', auth: true, org: false },
    DASH: { slug: 'dashboard', auth: true, org: true },
    ORG: {
      slug: 'organization',
      auth: true,
      org: true,
      children: {
        CREATE: {
          slug: 'create',
          auth: true,
          org: false
        }
      }
    },
    RISKS: {
      slug: 'risk-alerts',
      auth: true,
      org: true,
      children: {
        ITEM: {
          slug: '*',
          auth: true,
          org: true
        }
      }
    },
    SUPP: {
      slug: 'suppliers',
      auth: true,
      org: true
    },
    USER: {
      slug: 'user',
      auth: true,
      org: false,
      children: {
        BILLING: {
          slug: 'billing',
          auth: true,
          org: true
        },
        NOTIFY: {
          slug: 'notifications',
          auth: true
        },
        ORG: {
          slug: 'organization',
          auth: true,
          org: true
        }
      }
    }
  }
} satisfies RouteTree;

type RouteKey = NestedKeysWithParent<typeof ROUTE_TREE>;
type FlatRouteTree<T> = Record<RouteKey, T>;

const flattenTree = (
  tree: RouteTree,
  map: Record<string, Required<Omit<RouteTree, 'children'>>> = {},
  path: string[] = [],
  parents: string[] = []
) => {
  const items = Object.entries(tree.children ?? []);
  for (const [name, subtree] of items) {
    const { slug, auth = false, org = false, children } = subtree;
    map[[...parents, name].join('.')] = {
      slug: ['', ...path, slug].join('/'),
      auth,
      org
    };
    if (children)
      flattenTree(subtree, map, [...path, slug], [...parents, name]);
  }

  return map;
};

export const FLAT_ROUTE_TREE = Object.freeze(
  flattenTree(ROUTE_TREE)
) as FlatRouteTree<Required<Omit<RouteTree, 'children'>>>;

export const ROUTE_MAP = Object.freeze(
  Object.entries(FLAT_ROUTE_TREE).reduce((acc, curr) => {
    const [name, props] = curr;
    return { ...acc, [name]: props.slug };
  }, {})
) as FlatRouteTree<string>;
