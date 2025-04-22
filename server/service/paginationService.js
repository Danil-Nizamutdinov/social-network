class PaginationService {
  calculatePagination(page, limit) {
    const parsedPage = Number(page) || 1;
    const parsedLimit = Number(limit) || 9;
    const offset = parsedPage * parsedLimit - parsedLimit;

    return { parsedPage, parsedLimit, offset };
  }

  async calculateTotalPages(model, itemsPerPage, whereConditions = {}) {
    const count = await model.count({ where: whereConditions });
    return Math.ceil(count / itemsPerPage);
  }
}

module.exports = new PaginationService();
