import auditLogModel from "./auditLog.model";

export interface IGetAuditLogsParams {
  page?: number;
  limit?: number;
  search?: string;
  method?: string;
  statusCode?: string;
}

export const getAuditLogsService = async (params: IGetAuditLogsParams) => {
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const skip = (page - 1) * limit;

  const filterQuery: any = {};

  if (params.search) {
    const searchRegex = new RegExp(params.search, "i");
    filterQuery.$or = [
      { userEmail: searchRegex },
      { userName: searchRegex },
      { endpoint: searchRegex },
      { ip: searchRegex },
    ];
  }

  if (params.method && params.method !== "all") {
    filterQuery.method = params.method.toUpperCase();
  }

  if (params.statusCode && params.statusCode !== "all") {
    if (params.statusCode === "2xx") {
      filterQuery.statusCode = { $gte: 200, $lt: 300 };
    } else if (params.statusCode === "4xx") {
      filterQuery.statusCode = { $gte: 400, $lt: 500 };
    } else if (params.statusCode === "5xx") {
      filterQuery.statusCode = { $gte: 500 };
    }
  }

  const [logs, totalLogs] = await Promise.all([
    auditLogModel.find(filterQuery).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    auditLogModel.countDocuments(filterQuery),
  ]);

  const totalPages = Math.ceil(totalLogs / limit) || 1;
  const nextPage = page < totalPages ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;

  return {
    status: "success",
    results: logs.length,
    pagination: {
      currentPage: page,
      limit,
      totalLogs,
      totalProducts: totalLogs,
      totalPages,
      nextPage,
      previousPage,
    },
    data: logs,
  };
};

export const clearAuditLogsService = async () => {
  await auditLogModel.deleteMany({});
  return { status: "success", message: "All activity audit logs cleared successfully" };
};
