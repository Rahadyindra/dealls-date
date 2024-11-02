import { Request, Response, NextFunction } from "express";

export async function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (err.name === "invalid") {
    res.status(401).json({ message: "Invalid Input" });
  } else if (err.name === "notFound" || err.name === "BSONError") {
    res.status(404).json({ message: "Stuff you looking for doesn't exist" });
  } else if (err.name === "bad.login") {
    res.status(401).json({ message: "Invalid email or password" });
  } else if (err.name === "please.login" || err.name === "JsonWebTokenError") {
    res.status(401).json({
      message: "You must login first",
    });
  } else if (err.name === "forbidden") {
    res.status(403).json({
      msg: "You don't have permission to do this action",
    });
  } else if (err.name === "no.quota") {
    res.status(403).json({
      msg: "You are out of swiping quota",
    });
  } else {
    res.status(500).json({ message: "Something is wrong with the server" });
  }
}
