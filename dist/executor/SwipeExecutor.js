"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatedProfilesExecute = paginatedProfilesExecute;
exports.swipeExecuteProcessor = swipeExecuteProcessor;
exports.matchedProfileExecute = matchedProfileExecute;
exports.unmatchExecuteProcessor = unmatchExecuteProcessor;
const SwipeInService_1 = __importDefault(require("../database/services/SwipeInService"));
const User_1 = __importDefault(require("../database/models/User"));
const ProfileInService_1 = __importDefault(require("../database/services/ProfileInService"));
const Swipe_1 = __importDefault(require("../database/models/Swipe"));
const Profile_1 = __importDefault(require("../database/models/Profile"));
function paginatedProfilesExecute(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            validateQuota(req, res, next);
            const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                throw { name: "forbidden" };
            }
            const page = req.body.page || 1;
            const profiles = yield ProfileInService_1.default.pagingProfileForTodayByUserId(userId, page);
            res.status(200).json({ page, profiles });
        }
        catch (err) {
            next(err);
        }
    });
}
function swipeExecuteProcessor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
            const { like, profileId } = req.body;
            if (!userId) {
                throw { name: "forbidden" };
            }
            const profile = yield Profile_1.default.findByPk(profileId);
            if (!profile) {
                throw { name: "not.found" };
            }
            if (profile.userId === userId) {
                throw { name: "invalid.input" };
            }
            const userProfile = yield ProfileInService_1.default.findByUserId(userId);
            if (!userProfile) {
                throw { name: "not.found" };
            }
            const profilesMatched = yield ProfileInService_1.default.findAllProfileMatchedByUserId(userId, userProfile === null || userProfile === void 0 ? void 0 : userProfile.id);
            const isProfileAlreadyMatched = profilesMatched.some((matchedProfile) => {
                return matchedProfile.id === profileId;
            });
            if (isProfileAlreadyMatched) {
                throw { name: "already.matched" };
            }
            const latestSwipes = yield SwipeInService_1.default.findAllByUserIdAndProfileId(userId, profileId);
            if (latestSwipes && latestSwipes.length > 0) {
                const swipeIds = latestSwipes.map((swipe) => swipe.id);
                yield Swipe_1.default.update({ latest: false }, { where: { id: swipeIds } });
            }
            if (like == undefined || !profileId) {
                throw { name: "invalid.input" };
            }
            yield Swipe_1.default.create({
                userId,
                profileId,
                like,
                latest: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const likeOrPass = like ? "liked" : "passed";
            res.status(201).json({
                message: `You ${likeOrPass} ${profile.displayName}`,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function matchedProfileExecute(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                throw { name: "forbidden" };
            }
            const profile = yield ProfileInService_1.default.findByUserId(userId);
            if (!profile) {
                throw { name: "forbidden" };
            }
            const profilesMatched = yield ProfileInService_1.default.findAllProfileMatchedByUserId(userId, profile === null || profile === void 0 ? void 0 : profile.id);
            res.status(200).json(profilesMatched);
        }
        catch (err) {
            next(err);
        }
    });
}
function unmatchExecuteProcessor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                throw { name: "forbidden" };
            }
            const profileId = req.body.profileId;
            if (!profileId) {
                throw { name: "invalid.input" };
            }
            const swipe = yield SwipeInService_1.default.findByUserIdAndProfileId(userId, profileId);
            if (!swipe) {
                throw { name: "not.found" };
            }
            yield swipe.update({ latest: false });
            res
                .status(201)
                .json({ message: `Sucessfully umatched ${(_b = swipe.profile) === null || _b === void 0 ? void 0 : _b.displayName}` });
        }
        catch (err) {
            next(err);
        }
    });
}
function validateQuota(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                throw { name: "forbidden" };
            }
            const swipes = (yield SwipeInService_1.default.countSizeSwipedToday(userId)) || 0;
            const user = yield User_1.default.findByPk(userId);
            if (!user) {
                throw { name: "forbidden" };
            }
            if (swipes >= 10 &&
                !((_b = user.userPremiumPackages) === null || _b === void 0 ? void 0 : _b.premiumPackage.noSwipeQuota)) {
                throw { name: "no.quota" };
            }
        }
        catch (err) {
            next(err);
        }
    });
}
