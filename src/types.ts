import {
  type ValueExpression,
  type createSqlTokenSqlFragment,
} from 'slonik';

export type NamedParameterValues = {
  [key: string]: ValueExpression,
};

export type PrimitiveValueExpression = ReturnType<typeof createSqlTokenSqlFragment>['values'][number];
