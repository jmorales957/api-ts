import { Aggregate, Document, Model } from 'mongoose';

import { PaginatedResult, PaginationParams } from '../../../../application/entities/common/Pagination';

export async function paginate<T extends Document>(
  model: Model<T>,
  pipeline: Aggregate<any[]>,
  options: PaginationParams
): Promise<PaginatedResult<T>> {
  const { page, limit, sort } = options;
  const skip = (page - 1) * limit;

  const pipelineObject = pipeline.pipeline();
  const [results, totalResults] = await Promise.all([
    model
      .aggregate(pipelineObject)
      .collation({ locale: 'en', strength: 2 }) // Optional: set collation to handle sorting with different languages
      .sort(sort)
      .skip(skip)
      .limit(Number(limit)),
    model.aggregate(pipelineObject).count('total')
  ]);

  const totalPages = totalResults.length > 0 ? Math.ceil(totalResults[0].total / limit) : 0;

  return {
    page,
    pages: totalPages,
    total: totalResults.length > 0 ? totalResults[0].total : 0,
    limit: limit,
    results
  };
}
