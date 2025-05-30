import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  contributors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contributor",
    },
  ],
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  trashed: {
    type: Boolean,
    default: false,
  },
});

const Board = mongoose.model("Board", boardSchema);

async function get(id) {
  try {
    const board = await Board.findById(id);
    return board;
  } catch (error) {
    throw new Error(`Error finding board with id ${id}: ${error.message}`);
  }
}

async function getAll(filter = {}) {
  try {
    const boards = await Board.find(filter);
    return boards;
  } catch (error) {
    throw new Error(
      `Error fetching boards for user with id ${owner_id}: ${error.message}`,
    );
  }
}

async function create(boardData) {
  try {
    const { title, description, owner, contributors, tasks, createdAt } =
      boardData;
    const board = new Board({
      title,
      description,
      owner,
      contributors,
      tasks,
      createdAt: createdAt || Date.now(),
    });
    await board.save();
    return board._id;
  } catch (error) {
    throw new Error(`Error creating board: ${error.message}`);
  }
}

async function update(id, updateData) {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    await updatedBoard.save();
    console.log(updatedBoard);
    return updatedBoard;
  } catch (error) {
    throw new Error(`Error updating board with id ${id}: ${error.message}`);
  }
}

async function remove(id) {
  try {
    const deletedBoard = await Board.findByIdAndDelete(id);
    return deletedBoard;
  } catch (error) {
    throw new Error(`Error deleting board with id ${id}: ${error.message}`);
  }
}

export default {
  get,
  getAll,
  create,
  update,
  remove,
};
