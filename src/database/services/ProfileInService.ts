import Profile from "../models/Profile"; // Import your Profile model
import { Request, Response } from "express";

const ITEMS_PER_PAGE = 10;

export const getPaginatedProfiles = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * ITEMS_PER_PAGE;

    const profiles = await Profile.findAll({
      limit: ITEMS_PER_PAGE,
      offset: offset,
    });

    res.json({ page, profiles });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve profiles", error });
  }
};
