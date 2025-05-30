import { Router } from "express";
import boardController from "../controllers/board.js";

const router = Router();

// GET endpoints:
// /board/fetch/:id -> Gets a board by id
// /board/fetch?query=<query_params> -> Gets boards based on search query
router.get("/fetch/:id", boardController.fetchBoards);
router.get("/fetch", boardController.fetchBoards);

// POST endpoints:
// /board/create -> Creates a board
// /board/update/:id -> Updates a board by id
// /board/trash/:id -> Moves a board to trash
// /board/restore/:id -> Restores a board from trash
router.post("/create", boardController.createBoard);
router.post("/update/:id", boardController.updateBoard);

// DELETE endpoint:
// /board/delete/:id -> Deletes a board by id
router.delete("/delete/:id", boardController.deleteBoard);

export default router;
