const router = require("express").Router();
const subscribeRoutes = require("./subscribe.routes");
const marketingRoutes = require("./marketing.routes");
const contactusRoutes = require("./contactus.routes");
const clientRoutes = require("./client.routes");

module.exports = router;

// API routes (group routing modules here - no empty lines between)
router.use("/api/subscribe", subscribeRoutes);
router.use("/api/marketing", marketingRoutes);
router.use("/api/contact-us", contactusRoutes);

// API error handlers (API routes must be registered before this)
useAPIErrorHandlers(router);

// register client routes
router.use(clientRoutes);

function useAPIErrorHandlers(router) {
  // Handle API 404
  router.use("/api/*", (req, res, next) => {
    res.sendStatus(404);
  });

  // Handle API 500
  router.use((err, req, res, next) => {
    // If the error object doesn't exists
    if (!err) {
      return next();
    }

    // Log it
    console.error(err.stack);

    // Redirect to error page
    res.sendStatus(500);
  });
}
