type ActionStatus<O> = { ok: O };

export type SuccessRes<D = void> = ActionStatus<true> & {
  status: 200;
} & (undefined extends D ? { data?: D } : { data: D });

export type ErrorRes = ActionStatus<false> & {
  status: 400 | 401 | 403 | 500;
  message: string;
};

/**
 * Response shape from any given server action
 */
export type ActionRes<D = undefined> = ErrorRes | SuccessRes<D>;

export interface PaginationOpts {
  limit?: number;
  offset?: number;
}
