import type {
  ValueExpression,
  createSqlTokenSqlFragment,
} from 'slonik';

export type NamedParameterValuesType = {
  [key: string]: ValueExpression,
};

export type PrimitiveValueExpressionType = ReturnType<typeof createSqlTokenSqlFragment>['values'][number];
