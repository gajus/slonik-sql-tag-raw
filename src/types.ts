import type {
  ValueExpression,
  createSqlTokenSqlFragment,
} from 'slonik';

export type NamedParameterValues = {
  [key: string]: ValueExpression,
};

export type PrimitiveValueExpression = ReturnType<typeof createSqlTokenSqlFragment>['values'][number];
