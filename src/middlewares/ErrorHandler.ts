import { Request, Response, NextFunction } from "express";

export async function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!err.name) {
    console.error(err);
  }

  if (err.name === "invalid.input") {
    res.status(401).json({ message: "Invalid Input" });
  } else if (err.name === "not.found") {
    res.status(404).json({ message: "Stuff you looking for doesn't exist" });
  } else if (err.name === "bad.login") {
    res.status(401).json({ message: "Invalid email or password" });
  } else if (err.name === "already.matched") {
    res
      .status(401)
      .json({ message: "You are already matched with this person" });
  } else if (err.name === "please.login" || err.name === "JsonWebTokenError") {
    res.status(401).json({
      message: "You must login first",
    });
  } else if (err.name === "forbidden") {
    res.status(403).json({
      message: "You don't have permission to do this action",
    });
  } else if (err.name === "bad.login") {
    res.status(401).json({ message: "Invalid email or password" });
  } else if (err.name === "cannot.apply") {
    res.status(401).json({ message: err.message });
  } else if (err.name === "no.quota") {
    res.status(403).json({
      message: "You are out of swiping quota",
    });
  } else if (
    err.name === "SequelizeUniqueConstraintError" ||
    err.name === "SequelizeValidationError"
  ) {
    res.status(401).json({
      message: err.message,
    });
  } else {
    res.status(500).json({ message: "Something is wrong with the server" });
  }
}
