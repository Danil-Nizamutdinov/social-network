const cron = require("node-cron");
const { TempUser } = require("../models/models");
const { Op } = require("sequelize");

class CronService {
  init() {
    this.cleanupTempUsers();
  }

  cleanupTempUsers() {
    cron.schedule("* * * * *", async () => {
      try {
        const result = await TempUser.destroy({
          where: {
            codeExpires: {
              [Op.lt]: new Date(),
            },
          },
        });

        if (result > 0) {
          console.log(`Удалено ${result} просроченных TempUser`);
        }
      } catch (error) {
        console.error("Ошибка очистки TempUser:", error);
      }
    });
  }
}

module.exports = new CronService();
