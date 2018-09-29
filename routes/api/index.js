/* previous book code
const router = require("express").Router();
const bookRoutes = require("./books");

// Book routes
router.use("/books", bookRoutes);

module.exports = router;
*/

const router = require("express").Router();
const bookRoutes = require("./books");
const articleRoutes = require("./article");


// Book routes
router.use("/books", bookRoutes);
router.use("/article", bookRoutes);


module.exports = router;