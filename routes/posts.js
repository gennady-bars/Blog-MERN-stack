const express = require("express");
const passport = require("passport");
const router = express.Router();

const Posts = require("../models/posts");
const Comments = require("../models/comments");

const apiError = "Ошибка при запросе к API";

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find()
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "name"
        }
      })
      .sort({ date: -1 });
    return res.json(posts);
  } catch (e) {
    const errors = { error: apiError };
    return res.status(400).json(errors);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Posts.findOne({ _id: req.params.id })
      .populate({
        path: "author",
        select: "name"
      })
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "name"
        }
      });

    if (post) {
      return res.json(post);
    } else {
      const errors = { error: "Пост не найден" };
      return res.status(404).json(errors);
    }
  } catch (err) {
    const errors = { error: "Ошибка при запросе к API" };
    return res.status(400).json(errors);
  }
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    let newPost = new Posts({
      title: req.body.title,
      text: req.body.text,
      author: req.user
    });

    try {
      newPost = await newPost.save();
      return res.json(newPost);
    } catch (err) {
      const errors = { error: "Ошибка при создании поста" };
      return res.status(400).json(errors);
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let post = await Posts.findOne({ _id: req.params.id });

      if (post) {
        if (post.author._id.toString() !== req.user._id.toString()) {
          const errors = {
            error: "У вас нет прав на редактирование этого поста"
          };
          return res.status(404).json({ errors });
        }

        post = await Posts.findOneAndUpdate(
          {
            _id: post._id
          },
          {
            $set: {
              title: req.body.title,
              text: req.body.text
            }
          },
          {
            new: true
          }
        );

        return res.json(post);
      } else {
        const errors = { error: "Пост не найден" };
        return res.status(404).json({ errors });
      }
    } catch (e) {
      const errors = { error: apiError };
      return res.status(404).json({ errors });
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const post = await Posts.findOne({ _id: req.params.id });

    if (post) {
      if (post.author._id.toString() === req.user._id.toString()) {
        await Posts.findOneAndDelete({ _id: req.params.id });
        return res.json(post);
      } else {
        return res.json({ error: "Нет прав на удаление поста" });
      }
    } else {
      return res.json({ error: "Пост не найден" });
    }
  }
);

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { text } = req.body;

    let newComment = new Comments({
      text,
      author: req.user._id
    });

    newComment = await newComment.save();

    const post = await Posts.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { comments: newComment } },
      { new: true }
    );

    const comment = await Comments.findOneAndUpdate(
      {
        _id: newComment._id
      },
      {
        $set: { post }
      },
      {
        new: true
      }
    );

    const newPost = await Posts.findOne({ _id: req.params.id })
      .populate({
        path: "author",
        select: "name"
      })
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "name"
        }
      });

    return res.json(newPost);
  }
);

router.delete(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const comment = await Comments.findOne({
      _id: req.params.id
    });

    if (comment) {
      if (comment.author._id.toString() == req.user._id) {
        await Comments.findOneAndDelete({ _id: req.params.id });

        await Posts.findOneAndUpdate(
          { _id: comment.post },
          { $pull: { comments: req.params.id } }
        );

        const newPost = await Posts.findOne({ _id: comment.post })
          .populate({
            path: "author",
            select: "name"
          })
          .populate({
            path: "comments",
            populate: {
              path: "author",
              select: "name"
            }
          });

        return res.json(newPost);
      } else {
        return res.json({
          error: "You don't have permissions on deleteing this comment"
        });
      }
    } else {
      return res.json({ error: "Comment not found" });
    }
  }
);

module.exports = router;
