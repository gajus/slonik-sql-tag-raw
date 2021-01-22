import type {
  ValueExpressionType,
  createSqlTokenSqlFragment,
} from 'slonik';

export type NamedParameterValuesType = {
  [key: string]: ValueExpressionType,
};

export type PrimitiveValueExpressionType = ReturnType<typeof createSqlTokenSqlFragment>['values'][number];
