import {
  getUpdates,
  getOneUpdate,
  updateUpdate,
  createUpdate,
  deleteUpdate,
} from "./handlers/update";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./modules/middleware";
import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";

const router = Router();

/**
 * Product
 */

router.get("/product", getProducts);
router.get("/product/:id", getOneProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  "/product",
  [body("name").isString(), handleInputErrors],
  createProduct
);
router.delete("/product/:id", deleteProduct);

/**
 * Update
 */

router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);
router.put(
  "/update/:id",
  [
    body("title").optional(),
    body("body").optional(),
    body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]).optional(),
    body("version").optional(),
    handleInputErrors,
  ],
  updateUpdate
);
router.post(
  "/update",
  [
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("productId").exists().isString(),
    handleInputErrors,
  ],
  createUpdate
);
router.delete("/update/:id", deleteUpdate);

/**
 * Update Point
 */

router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {});
router.put(
  "/updatepoint/:id",
  [
    body("name").optional().isString(),
    body("description").optional().isString(),
    handleInputErrors,
  ],
  (req, res) => {}
);
router.post(
  "/updatepoint",
  [
    body("name").isString(),
    body("description").isString(),
    body("updateId").exists().isString(),
    handleInputErrors,
  ],
  (req, res) => {}
);
router.delete("/updatepoint/:id", (req, res) => {});

router.use((err, req, res, next) => {
  console.log(err);
  res.json({ message: "in router handler" });
});

export default router;
