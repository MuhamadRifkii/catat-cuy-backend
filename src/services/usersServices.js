const db = require("../models");
const Users = db.users;

class UsersService {
  async getUsers({ page, limit } = { page: 1, limit: 10 }) {
    const queryParams = {
      offset: (page - 1) * limit,
      limit: limit,
    };

    const countUsers = await Users.count();
    const totalPage = Math.ceil(countUsers / limit) || parseInt(page);

    const users = await Users.findAll(queryParams);
    return {
      data: users,
      meta: {
        page: parseInt(page),
        totalPage: totalPage !== Infinity ? totalPage : parseInt(page),
        totalData: countUsers,
        totalDataOnPage: users.length,
      },
    };
  }
}

module.exports = UsersService;
