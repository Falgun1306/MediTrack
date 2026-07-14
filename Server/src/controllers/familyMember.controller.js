import familyMember from "../models/FamilyMember.model.js";
import Medicine from "../models/medicine.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";

export const addFamilyMember = asyncHandler(async (req, res, next) => {
    const { name, relation, age } = req.body;

    if (!name || !relation || !age) {
        return next(new errorHandler("All fields are required", 400));
    }
    
    const FamilyMember = await familyMember.create({
        userId: req.user._id,
        name,
        relation,
        age,
    });

    res
        .status(201)
        .json({
            success: true,
            message: "Member created successfully",
            responseData: {
                FamilyMember,
            }
        });

});

export const getFamilyMemerByID = asyncHandler(async (req, res, next) => {
    const { memberid } = req.params;
    const userId = req.user._id;

    const member = await familyMember.findOne({
        _id: memberid,
        userId
    });

    if (!member) {
        return next(new errorHandler("Member does not exist", 404));
    }

    console.log(member);


    res.status(200).json({
        success: true,
        member
    })
});

export const getAllFamilyMemers = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const Members = await familyMember.find({ userId: userId })

    if (!Members || Members.length === 0) {
        return next(new errorHandler("No member found for this user", 404));
    }

    res.status(200).json({
        success: true,
        Members,
    });
});

export const updateFamilyMember = asyncHandler(async (req, res, next) => {
    const { memberid } = req.params;
    const userId = req.user._id;

    const member = await familyMember.findOne({
        _id: memberid,
        userId
    });

    if (!member) {
        return next(new errorHandler("Member does not exist", 404));
    }

    const updatedMember = await familyMember.findByIdAndUpdate(
        memberid,
        req.body,
        {
            new: true, // return updated document
            runValidators: true
        }
    )

    res.status(200).json({
        success: true,
        member: updatedMember
    })
});

export const deleteMember = asyncHandler(async (req, res, next) => {
    const { memberid } = req.params;
    const userId = req.user._id;

    const member = await familyMember.findOne({
        _id: memberid,
        userId
    });

    if (!member) {
        return next(new errorHandler("Member does not exist", 404));
    }

    const deleted = await familyMember.findByIdAndDelete(
        memberid,
        req.body,
    )

    res.status(200).json({
        success: true,
        member: deleted
    })
})