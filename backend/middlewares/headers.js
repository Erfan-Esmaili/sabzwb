// middlewares/headers.js (پیشنهاد)
exports.setHeaders = (req, res, next) => {
  // اگر می‌خواهی محدود کنی، مقدار '*' را به آدرس دامنهٔ فرانت تغییر بده
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // اگر از کوکی یا credentials استفاده می‌کنی، از این خط استفاده کن و Origin را '*' نگذار
  // res.setHeader("Access-Control-Allow-Credentials", "true");

  // Preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
};
