import { Query } from "mongoose";

class APIFeatures {
  query: Query<any[], any>;
  queryString: Record<string, any>;
  pagination: {
    currentPage: number;
    limit: number;
    totalProducts: number;
    totalPages: number;
    nextPage: number | null;
    previousPage: number | null;
  } | undefined;

  constructor(query: Query<any[], any>, queryString: Record<string, any>) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };

    delete queryObj.page;
    delete queryObj.limit;
    delete queryObj.sort;
    delete queryObj.keyword;
    delete queryObj.search;

    this.query = this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort
        .split(",")
        .join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  search(searchFields: string[]) {
    const rawKeyword = (
      this.queryString.keyword ||
      this.queryString.search ||
      ""
    ).toString().trim();

    if (rawKeyword) {
      const orConditions: any[] = [];

      // 1. Direct regex match on each individual field
      searchFields.forEach((field) => {
        orConditions.push({
          [field]: {
            $regex: rawKeyword,
            $options: "i",
          },
        });
      });

      // 2. Full-name concatenation check if firstName and lastName are present
      if (searchFields.includes("firstName") && searchFields.includes("lastName")) {
        // "firstName lastName"
        orConditions.push({
          $expr: {
            $regexMatch: {
              input: { $concat: ["$firstName", " ", "$lastName"] },
              regex: rawKeyword,
              options: "i",
            },
          },
        });

        // "lastName firstName"
        orConditions.push({
          $expr: {
            $regexMatch: {
              input: { $concat: ["$lastName", " ", "$firstName"] },
              regex: rawKeyword,
              options: "i",
            },
          },
        });

        // "firstNamelastName" without space (e.g. for handle or username style)
        orConditions.push({
          $expr: {
            $regexMatch: {
              input: { $concat: ["$firstName", "$lastName"] },
              regex: rawKeyword,
              options: "i",
            },
          },
        });
      }

      // 3. Multi-word token matching (e.g. "John Doe" matches firstName: "John" AND lastName: "Doe")
      const tokens = rawKeyword.split(/\s+/).filter(Boolean);
      if (tokens.length >= 2) {
        orConditions.push({
          $and: tokens.map((token: string) => ({
            $or: searchFields.map((field: string) => ({
              [field]: {
                $regex: token,
                $options: "i",
              },
            })),
          })),
        });
      }

      this.query = this.query.find({ $or: orConditions });
    }

    return this;
  }

  async paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;

    const totalProducts = await this.query.clone().countDocuments();

    const totalPages = Math.ceil(totalProducts / limit);

    const nextPage =
      page < totalPages
        ? page + 1
        : null;

    const previousPage =
      page > 1
        ? page - 1
        : null;

    this.query = this.query
      .skip(skip)
      .limit(limit);

    this.pagination = {
      currentPage: page,
      limit,
      totalProducts,
      totalPages,
      nextPage,
      previousPage,
    };

    return this;
  }
}

export default APIFeatures;