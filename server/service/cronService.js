const cron = require("node-cron");
const { TempUser } = require("../models/models");
const { Op } = require("sequelize");

class CronService {
  init() {
    this.cleanupTempUsers();
    this.cleanupLoginAttempts();
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

  cleanupLoginAttempts() {
    cron.schedule("0 0 * * *", async () => {
      // Каждый день в полночь
      try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const result = await LoginAttempt.destroy({
          where: {
            [Op.and]: [
              { blockedUntil: null }, // Не заблокированные
              { lastAttempt: { [Op.lt]: twentyFourHoursAgo } }, // Старые попытки
              { attemptCount: { [Op.gt]: 0 } }, // Были попытки
            ],
          },
        });

        if (result > 0) {
          console.log(`Очищено ${result} старых LoginAttempt`);
        }
      } catch (error) {
        console.error("Ошибка очистки LoginAttempt:", error);
      }
    });
  }
}

module.exports = new CronService();
